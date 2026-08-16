import type { RocketGeometry, RocketPart } from "@/data/types";
import { partFinish } from "@/data/geometry";

/**
 * 把参数化几何渲染成一段 SVG 字符串，供 OG 图使用。
 *
 * 为什么不复用 `<Silhouette>` 组件：OG 图走的是 satori，它只认
 * 一小部分 JSX 与 CSS，直接塞 React 组件风险很大。生成 SVG 字符串
 * 再以 data URI 交给 `<img>`，由 resvg 光栅化，是最稳的路径——
 * 而且几何数据是同一份，比例仍然可信。
 */

function esc(n: number) {
  return Number.isFinite(n) ? Number(n.toFixed(3)) : 0;
}

function shapeSvg(p: RocketPart, x: number): string {
  const f = partFinish(p);
  const attrs = `fill="${f.color}" stroke="rgba(0,0,0,0.3)" stroke-width="0.04"`;
  const y0 = p.bottom;
  const y1 = p.bottom + p.height;
  const r = p.radius;
  const rt = p.radiusTop ?? p.radius;

  switch (p.shape) {
    case "cylinder":
      return `<rect x="${esc(x - r)}" y="${esc(y0)}" width="${esc(r * 2)}" height="${esc(p.height)}" ${attrs}/>`;

    case "frustum":
    case "cone": {
      const top = p.shape === "cone" ? 0.001 : rt;
      return `<polygon points="${esc(x - r)},${esc(y0)} ${esc(x + r)},${esc(y0)} ${esc(x + top)},${esc(y1)} ${esc(x - top)},${esc(y1)}" ${attrs}/>`;
    }

    case "ogive":
      return `<path d="M ${esc(x - r)} ${esc(y0)} L ${esc(x + r)} ${esc(y0)} Q ${esc(x + r)} ${esc(y0 + p.height * 0.72)} ${esc(x)} ${esc(y1)} Q ${esc(x - r)} ${esc(y0 + p.height * 0.72)} ${esc(x - r)} ${esc(y0)} Z" ${attrs}/>`;

    case "capsule":
      return `<polygon points="${esc(x - r)},${esc(y0)} ${esc(x + r)},${esc(y0)} ${esc(x + r * 0.34)},${esc(y1)} ${esc(x - r * 0.34)},${esc(y1)}" ${attrs}/>`;

    case "engines": {
      const n = p.nozzles;
      const bell = n?.bellRadius ?? r * 0.4;
      const bh = Math.min(n?.bellHeight ?? p.height, p.height);
      const ring = n?.ringRadius ?? 0;
      const xs = ring > 0 ? [x - ring, x + ring, ...((n?.count ?? 1) % 2 ? [x] : [])] : [x];
      return xs
        .map(
          (cx) =>
            `<polygon points="${esc(cx - bell * 0.42)},${esc(y1)} ${esc(cx + bell * 0.42)},${esc(y1)} ${esc(cx + bell)},${esc(y1 - bh)} ${esc(cx - bell)},${esc(y1 - bh)}" ${attrs}/>`,
        )
        .join("");
    }

    case "fins":
      return (
        `<polygon points="${esc(x)},${esc(y0)} ${esc(x - r)},${esc(y0)} ${esc(x)},${esc(y1)}" ${attrs}/>` +
        `<polygon points="${esc(x)},${esc(y0)} ${esc(x + r)},${esc(y0)} ${esc(x)},${esc(y1)}" ${attrs}/>`
      );

    case "gridfins":
      return (
        `<rect x="${esc(x - r)}" y="${esc(y0)}" width="${esc(r)}" height="${esc(p.height)}" ${attrs}/>` +
        `<rect x="${esc(x)}" y="${esc(y0)}" width="${esc(r)}" height="${esc(p.height)}" ${attrs}/>`
      );

    case "flap":
      return (
        `<polygon points="${esc(x)},${esc(y0)} ${esc(x - r)},${esc(y1)} ${esc(x)},${esc(y1)}" ${attrs}/>` +
        `<polygon points="${esc(x)},${esc(y0)} ${esc(x + r)},${esc(y1)} ${esc(x)},${esc(y1)}" ${attrs}/>`
      );

    case "tower":
      return (
        `<rect x="${esc(x - r * 0.28)}" y="${esc(y0)}" width="${esc(r * 0.56)}" height="${esc(p.height)}" ${attrs}/>` +
        `<polygon points="${esc(x - r)},${esc(y0)} ${esc(x + r)},${esc(y0)} ${esc(x + r * 0.28)},${esc(y0 + p.height * 0.3)} ${esc(x - r * 0.28)},${esc(y0 + p.height * 0.3)}" ${attrs}/>`
      );

    default:
      return `<rect x="${esc(x - r)}" y="${esc(y0)}" width="${esc(r * 2)}" height="${esc(p.height)}" ${attrs}/>`;
  }
}

/** 生成等比侧视剪影的 SVG 字符串（y 轴向上，整体翻转一次） */
export function silhouetteSvg(geometry: RocketGeometry, pxHeight: number): string {
  const h = geometry.totalHeight;
  const w = Math.max(geometry.maxRadius * 2, h * 0.12);
  const pad = w * 0.08;
  const vbW = w + pad * 2;

  // 先画外侧的助推器与尾翼，再画芯级
  const ordered = [...geometry.parts].sort(
    (a, b) => (b.cluster ? b.cluster.offset : 0) - (a.cluster ? a.cluster.offset : 0),
  );

  const body = ordered
    .map((p) => {
      const offsets = p.cluster ? [-p.cluster.offset, p.cluster.offset] : [0];
      return offsets.map((o) => shapeSvg(p, o)).join("");
    })
    .join("");

  const pxWidth = Math.round((vbW / h) * pxHeight);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${pxWidth}" height="${Math.round(pxHeight)}" ` +
    `viewBox="${esc(-w / 2 - pad)} 0 ${esc(vbW)} ${esc(h)}" preserveAspectRatio="xMidYMax meet">` +
    `<g transform="translate(0 ${esc(h)}) scale(1 -1)">${body}</g></svg>`
  );
}

/** satori 只接受 data URI，这里统一编码 */
export function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/* ── 发动机侧视轮廓 ─────────────────────────────────────────────
 * 与 3D 模型共用同一份物理反算出来的尺寸（喉部面积 = 推力/(Cf·Pc)，
 * 出口半径按扩张比放大），所以卡片上的钟形比例也是可信的。
 */
export function engineProfileSvg(
  spec: {
    chamberRadius: number;
    chamberLength: number;
    convergeLength: number;
    throatRadius: number;
    exitRadius: number;
    nozzleLength: number;
    chambers: number;
    chamberOffset: number;
  },
  bell: [number, number][],
  converge: [number, number][],
  pxHeight: number,
): string {
  const { chamberRadius: Rc, chamberLength: Lc, exitRadius: Re, nozzleLength: Ln } = spec;
  // 两条母线用的是同一个「喉部 = 0」的轴：收缩段 y ∈ [-Lconv, 0]，钟形段 y ∈ [0, Ln]。
  // SVG 的 y 向下，所以整体平移 topY，让燃烧室顶端落在 0、喷口落在 totalY。
  const topY = Lc + spec.convergeLength;
  const totalY = topY + Ln;
  // 多室时两侧的钟形口也要算进去，否则宽的喷管会被视口切掉
  const halfW =
    Math.max(Re, Rc) + (spec.chambers > 1 ? Math.abs(spec.chamberOffset) : 0);

  const right: [number, number][] = [
    [Rc, 0],
    [Rc, Lc],
    ...converge.map(([r, y]) => [r, y + topY] as [number, number]),
    ...bell.map(([r, y]) => [r, y + topY] as [number, number]),
  ];
  const left = [...right].reverse().map(([r, y]) => [-r, y] as [number, number]);
  const pts = [...right, ...left].map(([r, y]) => `${esc(r)},${esc(y)}`).join(" ");

  const offsets =
    spec.chambers > 1 ? [-spec.chamberOffset, spec.chamberOffset] : [0];

  const bodies = offsets
    .map(
      (o) =>
        `<g transform="translate(${esc(o)} 0)"><polygon points="${pts}" fill="#c3cad6" stroke="#7d8798" stroke-width="${esc(halfW * 0.012)}"/></g>`,
    )
    .join("");

  const vbW = halfW * 2.2;
  const pxWidth = Math.round((vbW / totalY) * pxHeight);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${pxWidth}" height="${Math.round(pxHeight)}" ` +
    `viewBox="${esc(-vbW / 2)} 0 ${esc(vbW)} ${esc(totalY)}" preserveAspectRatio="xMidYMax meet">` +
    `${bodies}</svg>`
  );
}
