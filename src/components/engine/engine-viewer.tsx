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
import { Maximize2, Minimize2, RotateCw, Scissors, X, Info } from "lucide-react";
import type { EngineModelSpec } from "@/data/engine-geometry";
import type { AnatomyPart } from "@/data/engine-anatomy";
import { EngineModel, type EnginePartId } from "./engine-model";
import { StudioEnvironment } from "@/components/viewer/environment";
import { Inline } from "./anatomy-diagram";
import { useI18n } from "@/i18n/provider";
import { cn, num } from "@/lib/utils";

const FOV = 36;

function fit(size: number) {
  return (size * 1.25) / (2 * Math.tan((FOV / 2) * (Math.PI / 180)));
}

/** 相机取景：按模型全长自适应，切换发动机时平滑过渡 */
function Framing({ length }: { length: number }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as
    | { target: THREE.Vector3; update: () => void }
    | null;
  const target = React.useMemo(
    () => new THREE.Vector3(0.55, 0.16, 0.82).normalize().multiplyScalar(fit(length)),
    [length],
  );
  const first = React.useRef(true);

  useFrame((_, dt) => {
    const k = first.current ? 1 : Math.min(1, dt * 3);
    camera.position.lerp(target, k);
    if (controls?.target) {
      controls.target.lerp(new THREE.Vector3(0, 0, 0), k);
      controls.update();
    }
    first.current = false;
  });
  return null;
}

/** 比例尺：贴着模型画一根标注了长度的横杆 */
function ScaleBar({ spec }: { spec: EngineModelSpec }) {
  const nice = [0.1, 0.2, 0.5, 1, 2, 5];
  const target = spec.totalLength / 3;
  const len = nice.reduce((a, b) => (Math.abs(b - target) < Math.abs(a - target) ? b : a), nice[0]);
  const x = spec.maxRadius * 1.35;
  const y = -spec.totalLength * 0.5;

  return (
    <group position={[x, y, 0]}>
      <mesh position={[0, len / 2, 0]}>
        <boxGeometry args={[spec.maxRadius * 0.02, len, spec.maxRadius * 0.02]} />
        <meshStandardMaterial color="#ff7a2f" roughness={0.6} />
      </mesh>
      <Html position={[0, len + spec.totalLength * 0.03, 0]} center distanceFactor={spec.totalLength * 0.9}>
        <span className="whitespace-nowrap rounded bg-black/55 px-1.5 py-0.5 text-[11px] text-white">
          {len < 1 ? `${len * 100} cm` : `${len} m`}
        </span>
      </Html>
    </group>
  );
}

export function EngineViewer({
  spec,
  parts,
  name,
  className,
}: {
  spec: EngineModelSpec;
  parts: AnatomyPart[];
  name: string;
  className?: string;
}) {
  const { t } = useI18n();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [hover, setHover] = React.useState<EnginePartId | null>(null);
  const [spin, setSpin] = React.useState(true);
  const [cutaway, setCutaway] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const current = parts.find((p) => p.id === selected) ?? null;
  const hovered = parts.find((p) => p.id === hover) ?? null;

  React.useEffect(() => {
    function onFs() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  async function toggleFullscreen() {
    if (!wrapRef.current) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await wrapRef.current.requestFullscreen().catch(() => setFullscreen(false));
  }

  const d = spec.derivedFrom;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border-base",
        fullscreen ? "h-screen rounded-none" : "",
        className,
      )}
      style={{ background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))" }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border-base/60 px-3 py-2">
        <p className="truncate text-[12px] text-fg-muted">{name}</p>
        <div className="flex items-center gap-1">
          <IconBtn
            label={t.engineViewer.cutaway}
            active={cutaway}
            onClick={() => setCutaway((v) => !v)}
          >
            <Scissors className="size-3.5" />
          </IconBtn>
          <IconBtn
            label={spin ? t.viewer.stopRotate : t.viewer.autoRotate}
            active={spin}
            onClick={() => setSpin((v) => !v)}
          >
            <RotateCw className="size-3.5" />
          </IconBtn>
          <IconBtn
            label={fullscreen ? t.viewer.exitFullscreen : t.viewer.fullscreen}
            onClick={toggleFullscreen}
          >
            {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
          </IconBtn>
        </div>
      </div>

      <div className="relative min-h-[360px] flex-1">
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance", localClippingEnabled: true }}
          onPointerMissed={() => setSelected(null)}
          className="!absolute inset-0"
        >
          <PerspectiveCamera
            makeDefault
            fov={FOV}
            near={spec.totalLength * 0.004}
            far={spec.totalLength * 40}
            position={[fit(spec.totalLength) * 0.55, fit(spec.totalLength) * 0.16, fit(spec.totalLength) * 0.82]}
          />
          <Environment resolution={128} frames={1}>
            <StudioEnvironment />
          </Environment>
          <ambientLight intensity={0.24} />
          <directionalLight
            position={[spec.totalLength, spec.totalLength * 1.4, spec.totalLength * 0.8]}
            intensity={1.7}
          />
          <directionalLight
            position={[-spec.totalLength, spec.totalLength * 0.3, -spec.totalLength * 0.7]}
            intensity={0.55}
            color="#8fb6ff"
          />

          <React.Suspense fallback={null}>
            <EngineModel
              spec={spec}
              selected={selected}
              onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
              onHover={setHover}
              spin={spin}
              cutaway={cutaway}
            />
            <ScaleBar spec={spec} />
            <ContactShadows
              position={[0, -spec.totalLength * 0.68, 0]}
              opacity={0.4}
              scale={spec.maxRadius * 8}
              blur={2.4}
              far={spec.totalLength * 0.4}
            />
          </React.Suspense>

          <Framing length={spec.totalLength} />
          <OrbitControls
            makeDefault
            enablePan
            enableDamping
            dampingFactor={0.08}
            minDistance={spec.maxRadius * 1.2}
            maxDistance={fit(spec.totalLength) * 2.6}
          />
        </Canvas>

        {hovered && !current ? (
          <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-border-base bg-panel/90 px-2.5 py-1.5 text-[12px] text-fg backdrop-blur">
            {hovered.name}
            <span className="ml-2 text-fg-subtle">{t.viewer.clickForInfo}</span>
          </div>
        ) : null}

        {current ? (
          <div className="absolute inset-x-3 bottom-3 max-h-[54%] overflow-y-auto rounded-lg border border-border-strong bg-panel/95 p-4 shadow-xl backdrop-blur md:left-auto md:right-3 md:w-96">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-fg">{current.name}</h4>
                <p className="mt-0.5 text-[12px] text-fg-subtle">{current.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={t.viewer.closePart}
                className="shrink-0 text-fg-subtle hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
              <Inline text={current.body} />
            </p>
          </div>
        ) : null}

        <div className="pointer-events-none absolute bottom-3 left-3 flex max-w-[52%] items-start gap-1.5 text-[10px] leading-snug text-fg-subtle">
          <Info className="mt-px size-3 shrink-0" />
          <span>{t.engineViewer.derivedNote}</span>
        </div>
      </div>

      {/* 反算出来的尺寸，明确写出来 */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 border-t border-border-base/60 px-3 py-2.5 sm:grid-cols-4">
        <Metric label={t.engineViewer.throatDia} value={`${num(spec.throatRadius * 200, 1)} cm`} />
        <Metric label={t.engineViewer.exitDia} value={`${num(spec.exitRadius * 2, 2)} m`} />
        <Metric label={t.engineViewer.nozzleLength} value={`${num(spec.nozzleLength, 2)} m`} />
        <Metric label={t.engineViewer.expansionRatio} value={`${num(d.expansionRatio, 0)} : 1`} />
      </dl>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="truncate text-[10px] text-fg-subtle">{label}</dt>
      <dd className="text-[12px] text-fg tabular">{value}</dd>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={cn(
        "grid size-7 place-items-center rounded transition-colors",
        active ? "bg-accent-soft text-accent" : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
