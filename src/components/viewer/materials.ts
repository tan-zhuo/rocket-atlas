"use client";

import * as THREE from "three";
import type { RocketPart } from "@/data/types";
import { partFinish, type FinishSpec } from "@/data/geometry";

/**
 * 程序化表面贴图。
 *
 * 真实箭体的视觉信息几乎全部来自三样东西：
 *   1) 表面处理（漆 / 裸金属 / 泡沫绝热层 / 隔热瓦）→ PBR 参数，见 geometry.ts 的 FINISH
 *   2) 结构留下的痕迹（贮箱环缝、蒙皮桁条、喷管冷却管）→ 这里画成细微的明暗线
 *   3) 涂装标识（滚动标识、色带、字样、隔热瓦分布）→ livery
 *
 * 三者叠在一张 canvas 上生成 CanvasTexture，避免引入任何外部贴图资源。
 * 贴图按「外观特征」缓存，同一枚火箭上的同类部件共用一张。
 */

const cache = new Map<string, THREE.Texture>();

const TEX_W = 512;
const TEX_H = 512;

function hex(c: string) {
  return new THREE.Color(c);
}

/** 在基色上做明暗微调，用于画缝线与污渍 */
function shade(base: string, k: number) {
  const c = hex(base);
  if (k >= 0) c.lerp(new THREE.Color("#ffffff"), k);
  else c.lerp(new THREE.Color("#000000"), -k);
  return `#${c.getHexString()}`;
}

function key(part: RocketPart, spec: FinishSpec) {
  return [
    part.finish ?? "auto",
    spec.color,
    part.shape,
    Math.round(part.height),
    Math.round(part.radius * 10),
    part.livery ? JSON.stringify(part.livery) : "-",
  ].join("|");
}

/** 贮箱环缝：间距按真实箭体的段高（约 2–3 m）换算到 v 方向 */
function drawRingSeams(
  ctx: CanvasRenderingContext2D,
  base: string,
  heightM: number,
  strength = 1,
) {
  const rings = Math.max(2, Math.min(28, Math.round(heightM / 2.6)));
  ctx.lineWidth = 2;
  for (let i = 1; i < rings; i++) {
    const y = (i / rings) * TEX_H;
    ctx.strokeStyle = shade(base, -0.1 * strength);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(TEX_W, y);
    ctx.stroke();
    ctx.strokeStyle = shade(base, 0.07 * strength);
    ctx.beginPath();
    ctx.moveTo(0, y + 2);
    ctx.lineTo(TEX_W, y + 2);
    ctx.stroke();
  }
}

/** 蒙皮桁条 / 喷管冷却管：竖向细线 */
function drawStringers(
  ctx: CanvasRenderingContext2D,
  base: string,
  count: number,
  strength = 1,
) {
  ctx.lineWidth = 1.5;
  for (let i = 0; i < count; i++) {
    const x = (i / count) * TEX_W;
    ctx.strokeStyle = shade(base, -0.055 * strength);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, TEX_H);
    ctx.stroke();
  }
}

/**
 * 象限式滚动标识：地面光学跟踪靠它判读箭体滚转角，
 * 所以图案必须在任何方位角上都不对称——这就是土星五号那身黑白块的由来。
 */
function drawRollPattern(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color;
  const bandH = TEX_H * 0.16;
  const rows = [0.06, 0.44, 0.78];
  rows.forEach((r, ri) => {
    const y = r * TEX_H;
    for (let q = 0; q < 4; q++) {
      // 每行错开一个象限，保证不同滚转角看到的图案不同
      if ((q + ri) % 2 === 0) continue;
      ctx.fillRect((q / 4) * TEX_W, y, TEX_W / 4, bandH);
    }
  });
}

function drawChecker(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color;
  const n = 4;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if ((i + j) % 2) continue;
      ctx.fillRect((i / n) * TEX_W, (j / n) * TEX_H, TEX_W / n, TEX_H / n);
    }
  }
}

/**
 * 隔热瓦：只覆盖迎风面（u 的一半），这正是「腹部朝下再入」的可视化证据。
 */
function drawTiles(ctx: CanvasRenderingContext2D, color: string) {
  const u0 = TEX_W * 0.2;
  const u1 = TEX_W * 0.8;
  ctx.fillStyle = color;
  ctx.fillRect(u0, 0, u1 - u0, TEX_H);

  // 瓦缝
  const cols = 26;
  const rows = 34;
  ctx.strokeStyle = shade(color, 0.16);
  ctx.lineWidth = 1;
  for (let i = 0; i <= cols; i++) {
    const x = u0 + ((u1 - u0) * i) / cols;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, TEX_H);
    ctx.stroke();
  }
  for (let j = 0; j <= rows; j++) {
    const y = (TEX_H * j) / rows;
    // 六边形排布的近似：奇数行整体错开半格
    const off = j % 2 ? (u1 - u0) / cols / 2 : 0;
    ctx.beginPath();
    ctx.moveTo(u0 + off, y);
    ctx.lineTo(u1, y);
    ctx.stroke();
  }
  // 边缘过渡，避免瓦区边界像贴纸
  const grad = ctx.createLinearGradient(u0 - 18, 0, u0 + 18, 0);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = grad;
  ctx.fillRect(u0 - 18, 0, 36, TEX_H);
}

function drawText(ctx: CanvasRenderingContext2D, text: string, color: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `bold ${Math.round(TEX_H * 0.085)}px "Helvetica Neue", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // 两个相对的方位角各写一次
  [0.25, 0.75].forEach((u) => {
    ctx.fillText(text, u * TEX_W, TEX_H * 0.3);
  });
  ctx.restore();
}

export function surfaceTexture(part: RocketPart): THREE.Texture | null {
  const spec = partFinish(part);
  const k = key(part, spec);
  const cached = cache.get(k);
  if (cached) return cached;

  // 桁架与挤出体（尾翼/襟翼/栅格舵）的 UV 不是规则的柱面展开，贴图会拉花
  if (part.shape === "tower" || part.shape === "fins" || part.shape === "flap" || part.shape === "gridfins")
    return null;

  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = spec.color;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  const finish = part.finish ?? "";

  // ── 结构痕迹 ────────────────────────────────────────────
  if (part.shape === "cylinder" || part.shape === "frustum") {
    drawRingSeams(ctx, spec.color, part.height, finish === "insulation-foam" ? 0.5 : 1);
    if (finish === "bare-metal" || finish === "stainless" || finish === "carbon") {
      drawStringers(ctx, spec.color, 48, 0.8);
    }
  }
  if (part.shape === "engines") {
    // 再生冷却管束 / 喷管加强环
    drawStringers(ctx, spec.color, 72, 1.2);
    drawRingSeams(ctx, spec.color, part.height * 3, 0.6);
  }
  if (finish === "insulation-foam" || finish === "scorched") {
    // 泡沫喷涂的斑驳感
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * TEX_W;
      const y = Math.random() * TEX_H;
      const r = 6 + Math.random() * 26;
      ctx.fillStyle = shade(spec.color, (Math.random() - 0.5) * 0.16);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  if (finish === "scorched") {
    // 氢焰从底部向上燎黑
    const grad = ctx.createLinearGradient(0, TEX_H, 0, TEX_H * 0.25);
    grad.addColorStop(0, "rgba(20,14,10,0.72)");
    grad.addColorStop(1, "rgba(20,14,10,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, TEX_W, TEX_H);
  }

  // ── 涂装标识 ────────────────────────────────────────────
  const lv = part.livery;
  if (lv) {
    const c = lv.color ?? "#15171c";
    if (lv.kind === "roll-pattern") drawRollPattern(ctx, c);
    if (lv.kind === "checker") drawChecker(ctx, c);
    if (lv.kind === "tiles") drawTiles(ctx, lv.color ?? "#24272e");
    if (lv.kind === "bands" && lv.bands) {
      for (const b of lv.bands) {
        ctx.fillStyle = b.color;
        const y0 = (1 - b.to) * TEX_H;
        ctx.fillRect(0, y0, TEX_W, (b.to - b.from) * TEX_H);
      }
    }
    if (lv.kind === "text" && lv.text) drawText(ctx, lv.text, c);
  }

  // 极轻微的模糊：把图案的硬边高频压掉一点。
  // 圆柱侧影处 u 方向被压缩上百倍，硬边在采样不足时会摩尔纹化成条码状条纹。
  if (lv) {
    ctx.filter = "blur(0.7px)";
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = "none";
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  // 圆柱侧影处 u 方向被极度压缩，各向异性过滤不足会出现条纹摩尔纹
  tex.anisotropy = 16;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  cache.set(k, tex);
  return tex;
}

export function disposeTextureCache() {
  for (const t of cache.values()) t.dispose();
  cache.clear();
}
