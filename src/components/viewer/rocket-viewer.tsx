"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  Environment,
  Html,
} from "@react-three/drei";
import {
  Maximize2,
  Minimize2,
  RotateCw,
  Layers,
  Boxes,
  X,
  Info,
  Ruler,
} from "lucide-react";
import type { RocketGeometry, RocketPart } from "@/data/types";
import { GROUP_COLOR } from "@/data/geometry";
import { RocketModel } from "./rocket-model";
import { StudioEnvironment } from "./environment";
import { Silhouette } from "@/components/rocket/silhouette";
import { cn, meters } from "@/lib/utils";
import { useHydrated, useMediaQuery } from "@/lib/client-hooks";

const GROUP_LABEL: Record<RocketPart["group"], string> = {
  payload: "载荷 / 整流罩",
  "stage-3": "三级",
  "stage-2": "二级",
  "stage-1": "一级",
  core: "芯级",
  booster: "助推器",
};

type PresetId = "full" | "engines" | "upper" | "nose";

const PRESETS: { id: PresetId; label: string }[] = [
  { id: "full", label: "整体" },
  { id: "engines", label: "发动机段" },
  { id: "upper", label: "上面级" },
  { id: "nose", label: "整流罩" },
];

const FOV = 38;
/** 竖直方向要装下 `size` 米所需的相机距离（留 12% 余量） */
function fitDistance(size: number) {
  return (size * 1.12) / (2 * Math.tan((FOV / 2) * (Math.PI / 180)));
}

function presetTarget(id: PresetId, h: number, maxR: number) {
  const span = Math.max(maxR * 2.4, 4);
  switch (id) {
    case "engines":
      return { y: -h / 2 + span * 0.35, dist: fitDistance(span) };
    case "upper":
      return { y: h * 0.12, dist: fitDistance(Math.max(h * 0.4, span)) };
    case "nose":
      return { y: h / 2 - span * 0.3, dist: fitDistance(span) };
    case "full":
    default:
      return { y: 0, dist: fitDistance(Math.max(h, span)) };
  }
}

/** 相机相对目标点的方向（略微俯视的 3/4 视角） */
const VIEW_DIR = new THREE.Vector3(0.52, 0.20, 0.83).normalize();

function cameraPosition(y: number, dist: number) {
  return new THREE.Vector3().copy(VIEW_DIR).multiplyScalar(dist).add(new THREE.Vector3(0, y, 0));
}

/**
 * 预设视角切换：用逐帧插值而不是直接写 camera，
 * 这样动画平滑，且收敛后立刻交还控制权给 OrbitControls。
 */
function CameraRig({
  preset,
  height,
  radius,
  explode,
}: {
  preset: PresetId;
  height: number;
  radius: number;
  /** 爆炸视图会把整体尺寸撑大，取景要跟着退远 */
  explode: number;
}) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as
    | { target: THREE.Vector3; update: () => void }
    | null;

  // 爆炸展开后总包络约放大到 1.45 倍（轴向 0.275H + 径向 0.09H）
  const spread = 1 + explode * 0.45;

  const desired = React.useMemo(() => {
    const { y, dist } = presetTarget(preset, height, radius);
    return {
      pos: cameraPosition(y, dist * spread),
      target: new THREE.Vector3(0, y, 0),
    };
  }, [preset, height, radius, spread]);

  const lastKey = React.useRef<string | null>(null);
  const animating = React.useRef(true);

  useFrame((_, dt) => {
    const key = `${preset}:${spread.toFixed(2)}`;
    if (lastKey.current !== key) {
      lastKey.current = key;
      animating.current = true;
    }
    if (!animating.current) return;
    const k = Math.min(1, dt * 4);
    camera.position.lerp(desired.pos, k);
    if (controls?.target) {
      controls.target.lerp(desired.target, k);
      controls.update();
    }
    if (camera.position.distanceTo(desired.pos) < height * 0.005) animating.current = false;
  });

  return null;
}

export function RocketViewer({
  geometry: geo,
  name,
  className,
}: {
  geometry: RocketGeometry;
  name: string;
  className?: string;
}) {
  const [explode, setExplode] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [hoverId, setHoverId] = React.useState<string | null>(null);
  const [spin, setSpin] = React.useState(true);
  const [preset, setPreset] = React.useState<PresetId>("full");
  const [fullscreen, setFullscreen] = React.useState(false);
  // 小屏默认降级为等比剪影（避免在低端设备上跑 3D），用户可以手动切回来。
  const ready = useHydrated();
  const isSmall = useMediaQuery("(max-width: 640px)");
  const [modeOverride, setModeOverride] = React.useState<"3d" | "2d" | null>(null);
  const mode: "3d" | "2d" = modeOverride ?? (isSmall ? "2d" : "3d");
  const setMode = setModeOverride;
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const selected = geo.parts.find((p) => p.id === selectedId) ?? null;
  const hovered = geo.parts.find((p) => p.id === hoverId) ?? null;

  React.useEffect(() => {
    function onFsChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  async function toggleFullscreen() {
    if (!wrapRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await wrapRef.current.requestFullscreen().catch(() => setFullscreen(false));
  }

  const usedGroups = Array.from(new Set(geo.parts.map((p) => p.group)));

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border-base",
        fullscreen ? "h-screen rounded-none" : "",
        className,
      )}
      style={{
        background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))",
      }}
    >
      {/* 顶部工具条 */}
      <div className="flex items-center justify-between gap-2 border-b border-border-base/60 px-3 py-2">
        <div className="flex items-center gap-1">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setMode("3d");
                setPreset(p.id);
              }}
              className={cn(
                "rounded px-2 py-1 text-[12px] transition-colors",
                mode === "3d" && preset === p.id
                  ? "bg-accent-soft text-accent"
                  : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <IconBtn
            label={mode === "3d" ? "切换到等比剪影" : "切换到 3D"}
            active={mode === "2d"}
            onClick={() => setMode(mode === "3d" ? "2d" : "3d")}
          >
            <Ruler className="size-3.5" />
          </IconBtn>
          <IconBtn
            label={spin ? "停止自动旋转" : "自动旋转"}
            active={spin}
            onClick={() => setSpin((v) => !v)}
            disabled={mode === "2d"}
          >
            <RotateCw className="size-3.5" />
          </IconBtn>
          <IconBtn label={fullscreen ? "退出全屏" : "全屏"} onClick={toggleFullscreen}>
            {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </IconBtn>
        </div>
      </div>

      {/* 主视区 */}
      <div className="relative min-h-[380px] flex-1">
        {mode === "3d" && ready ? (
          <Canvas
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onPointerMissed={() => setSelectedId(null)}
            className="!absolute inset-0"
          >
            <PerspectiveCamera
              makeDefault
              fov={FOV}
              near={geo.totalHeight * 0.005}
              far={geo.totalHeight * 40}
              position={cameraPosition(0, fitDistance(geo.totalHeight)).toArray()}
            />
            <CameraRig
              preset={preset}
              height={geo.totalHeight}
              radius={geo.maxRadius}
              explode={explode}
            />
            <Environment resolution={128} frames={1}>
              <StudioEnvironment />
            </Environment>
            <ambientLight intensity={0.22} />
            <directionalLight
              position={[geo.totalHeight, geo.totalHeight * 1.4, geo.totalHeight * 0.8]}
              intensity={1.7}
            />
            <directionalLight
              position={[-geo.totalHeight, geo.totalHeight * 0.3, -geo.totalHeight * 0.6]}
              intensity={0.55}
              color="#8fb6ff"
            />

            <React.Suspense fallback={<Loader />}>
              <RocketModel
                geometry={geo}
                explode={explode}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId((cur) => (cur === id ? null : id))}
                onHover={setHoverId}
                spin={spin}
              />
              <ScaleReference height={geo.totalHeight} radius={geo.maxRadius} />
              <ContactShadows
                position={[0, -geo.totalHeight / 2 - 0.05, 0]}
                opacity={0.42}
                scale={geo.maxRadius * 9}
                blur={2.4}
                far={geo.totalHeight * 0.3}
              />
            </React.Suspense>

            <OrbitControls
              makeDefault
              enablePan
              enableDamping
              dampingFactor={0.08}
              minDistance={geo.maxRadius * 1.5}
              maxDistance={fitDistance(geo.totalHeight) * 2.4}
              target={[0, 0, 0]}
            />
          </Canvas>
        ) : null}

        {mode === "2d" ? (
          <div className="absolute inset-0 flex items-end justify-center p-6">
            <Silhouette
              geometry={geo}
              className="h-full max-h-full w-auto text-fg-muted"
              title={`${name} 等比侧视剪影`}
            />
          </div>
        ) : null}

        {/* 悬停提示 */}
        {hovered && !selected && mode === "3d" ? (
          <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-border-base bg-panel/90 px-2.5 py-1.5 text-[12px] text-fg backdrop-blur">
            {hovered.name}
            <span className="ml-2 text-fg-subtle">点击查看说明</span>
          </div>
        ) : null}

        {/* 部件信息卡片 */}
        {selected ? (
          <div className="absolute inset-x-3 bottom-3 max-h-[52%] overflow-y-auto rounded-lg border border-border-strong bg-panel/95 p-4 shadow-xl backdrop-blur md:left-auto md:right-3 md:w-80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
                  {GROUP_LABEL[selected.group]}
                </p>
                <h4 className="mt-0.5 text-sm font-semibold text-fg">{selected.name}</h4>
                {selected.nameEn ? (
                  <p className="text-[11px] text-fg-subtle">{selected.nameEn}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="关闭部件说明"
                className="shrink-0 text-fg-subtle hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>
            <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-fg-subtle">
              <span className="tabular">高度 {meters(selected.height)}</span>
              <span className="tabular">直径 {meters(selected.radius * 2)}</span>
              <span className="tabular">距底 {meters(selected.bottom)}</span>
              {selected.cluster ? (
                <span className="tabular">数量 ×{selected.cluster.count}</span>
              ) : null}
            </dl>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
              {selected.description}
            </p>
          </div>
        ) : null}

        {/* 精度标注 */}
        <div className="pointer-events-none absolute bottom-3 left-3 flex max-w-[46%] items-start gap-1.5 text-[10px] leading-snug text-fg-subtle">
          <Info className="mt-px size-3 shrink-0" />
          <span>
            {geo.fidelity === "schematic" ? "示意模型" : "细节模型"} ·{" "}
            {geo.modelNote.slice(0, 64)}
            {geo.modelNote.length > 64 ? "…" : ""}
          </span>
        </div>
      </div>

      {/* 底部控制条 */}
      <div className="border-t border-border-base/60 px-3 py-2.5">
        <div className="flex items-center gap-3">
          <Boxes className="size-3.5 shrink-0 text-fg-subtle" />
          <label htmlFor="explode" className="shrink-0 text-[12px] text-fg-muted">
            爆炸视图
          </label>
          <input
            id="explode"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={explode}
            disabled={mode === "2d"}
            onChange={(e) => setExplode(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border-strong accent-[var(--accent)] disabled:opacity-40"
          />
          <span className="w-9 shrink-0 text-right text-[11px] text-fg-subtle tabular">
            {Math.round(explode * 100)}%
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Layers className="size-3.5 text-fg-subtle" />
          {usedGroups.map((g) => (
            <span key={g} className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
              <span
                className="size-2 rounded-[2px]"
                style={{ background: GROUP_COLOR[g] }}
                aria-hidden
              />
              {GROUP_LABEL[g]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      disabled={disabled}
      className={cn(
        "grid size-7 place-items-center rounded transition-colors disabled:opacity-35",
        active ? "bg-accent-soft text-accent" : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 rounded-md border border-border-base bg-panel/90 px-3 py-2 text-[12px] text-fg-muted backdrop-blur">
        <span className="size-2 animate-pulse rounded-full bg-accent" />
        正在构建几何…
      </div>
    </Html>
  );
}

/** 高度参考：地面网格 + 一个 1.8 m 人形比例尺 */
function ScaleReference({ height, radius }: { height: number; radius: number }) {
  const y0 = -height / 2;
  const person = 1.8;
  return (
    <group>
      <gridHelper
        args={[radius * 14, 14, "#5c6678", "#3b424f"]}
        position={[0, y0 - 0.02, 0]}
      />
      <mesh position={[radius * 2.2, y0 + person / 2, 0]}>
        <capsuleGeometry args={[person * 0.14, person * 0.62, 4, 10]} />
        <meshStandardMaterial color="#ff7a2f" roughness={0.7} metalness={0.05} />
      </mesh>
      <Html
        position={[radius * 2.2, y0 + person * 1.35, 0]}
        center
        distanceFactor={height * 0.55}
      >
        <span className="whitespace-nowrap rounded bg-black/55 px-1.5 py-0.5 text-[11px] text-white">
          1.8 m
        </span>
      </Html>
    </group>
  );
}
