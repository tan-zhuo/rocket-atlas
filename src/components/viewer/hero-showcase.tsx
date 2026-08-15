"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei";
import type { RocketGeometry } from "@/data/types";
import { RocketModel } from "./rocket-model";
import { StudioEnvironment } from "./environment";
import { cn, mass, meters } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

export interface ShowcaseItem {
  slug: string;
  nameZh: string;
  name: string;
  height: number;
  mass: number;
  geometry: RocketGeometry;
}

const FOV = 34;

function fitDistance(size: number) {
  return (size * 1.1) / (2 * Math.tan((FOV / 2) * (Math.PI / 180)));
}

/** 换火箭时把相机平滑地推到新的取景距离 */
function Framing({ height }: { height: number }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as
    | { target: THREE.Vector3; update: () => void }
    | null;

  const target = React.useMemo(() => {
    const d = fitDistance(height);
    return new THREE.Vector3(0.34, 0.14, 0.93).normalize().multiplyScalar(d);
  }, [height]);

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 3);
    camera.position.lerp(target, k);
    if (controls?.target) {
      controls.target.lerp(new THREE.Vector3(0, 0, 0), k);
      controls.update();
    }
  });
  return null;
}

/**
 * 首页的 3D 展示位。
 *
 * 与详情页查看器共用同一套几何、材质与环境光照，但去掉了爆炸视图、
 * 预设视角这些操作性控件——首页只需要「一眼看出这是真的 3D，可以拖」。
 */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const { t } = useI18n();
  const [idx, setIdx] = React.useState(0);
  const current = items[idx];

  // 无人操作时缓慢自转；用户一旦拖动就停下，避免和输入打架
  const [spin, setSpin] = React.useState(true);

  return (
    <div className="flex flex-col">
      <div
        className="relative h-[340px] overflow-hidden rounded-2xl border border-border-base sm:h-[420px] lg:h-[520px]"
        style={{ background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))" }}
      >
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          onPointerDown={() => setSpin(false)}
        >
          <PerspectiveCamera
            makeDefault
            fov={FOV}
            near={current.height * 0.005}
            far={current.height * 40}
            position={[
              fitDistance(current.height) * 0.34,
              fitDistance(current.height) * 0.14,
              fitDistance(current.height) * 0.93,
            ]}
          />
          <Environment resolution={128} frames={1}>
            <StudioEnvironment />
          </Environment>
          <ambientLight intensity={0.22} />
          <directionalLight
            position={[current.height, current.height * 1.3, current.height * 0.8]}
            intensity={1.6}
          />
          <directionalLight
            position={[-current.height, current.height * 0.3, -current.height * 0.6]}
            intensity={0.5}
            color="#8fb6ff"
          />

          <React.Suspense fallback={null}>
            <RocketModel
              key={current.slug}
              geometry={current.geometry}
              explode={0}
              selectedId={null}
              onSelect={() => {}}
              onHover={() => {}}
              spin={spin}
            />
            <ContactShadows
              position={[0, -current.geometry.totalHeight / 2 - 0.05, 0]}
              opacity={0.38}
              scale={current.geometry.maxRadius * 10}
              blur={2.6}
              far={current.height * 0.3}
            />
          </React.Suspense>

          <Framing height={current.height} />
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>

        <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-fg">{current.nameZh}</p>
            <p className="text-[11px] text-fg-subtle tabular">
              {current.name} · {meters(current.height)} · {mass(current.mass)}
            </p>
          </div>
          <p className="text-[10px] text-fg-subtle">{t.home.dragToRotate}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => {
              setIdx(i);
              setSpin(true);
            }}
            className={cn(
              "rounded-md border px-2.5 py-1 text-[12px] transition-colors",
              i === idx
                ? "border-accent/45 bg-accent-soft text-accent"
                : "border-border-base text-fg-muted hover:border-border-strong hover:text-fg",
            )}
          >
            {it.nameZh}
          </button>
        ))}
      </div>
    </div>
  );
}
