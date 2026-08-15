"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { EngineModelSpec } from "@/data/engine-geometry";
import { bellProfile, convergeProfile } from "@/data/engine-geometry";

/**
 * 参数化发动机 3D 模型。
 *
 * 喷管与燃烧室的母线直接由 engine-geometry.ts 反算出来（推力/室压→喉部，
 * 扩张比→出口），所以主体比例是可信的；涡轮泵、预燃室、管路按与喉部半径
 * 成比例的经验值布置，说明的是连接关系而不是具体外形。
 *
 * 坐标：喉部在 y=0，燃烧室在 +y，喷管向 −y 展开。
 */

export type EnginePartId =
  | "gimbal"
  | "valves"
  | "pumps"
  | "turbine"
  | "gas-generator"
  | "injector"
  | "chamber"
  | "cooling"
  | "throat"
  | "nozzle"
  | "exhaust";

interface PartProps {
  id: EnginePartId;
  selected: string | null;
  onSelect: (id: EnginePartId) => void;
  onHover: (id: EnginePartId | null) => void;
  children: React.ReactNode;
}

function Part({ id, selected, onSelect, onHover, children }: PartProps) {
  const dimmed = Boolean(selected) && selected !== id;
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
      }}
      onPointerOut={() => onHover(null)}
      userData={{ dimmed }}
    >
      {children}
    </group>
  );
}

/** 金属材质：按部件角色区分冷热与材质感 */
function Mat({
  tone,
  dimmed,
  selected,
  clip,
  side,
}: {
  tone: "steel" | "copper" | "hot" | "dark" | "insul" | "battery";
  dimmed: boolean;
  selected: boolean;
  clip?: THREE.Plane[];
  side?: THREE.Side;
}) {
  const preset = {
    steel: { color: "#b7bfcc", metalness: 0.92, roughness: 0.28 },
    copper: { color: "#a86a45", metalness: 0.95, roughness: 0.3 },
    hot: { color: "#8d6552", metalness: 0.75, roughness: 0.45 },
    dark: { color: "#4a505c", metalness: 0.85, roughness: 0.4 },
    insul: { color: "#c9cdd6", metalness: 0.1, roughness: 0.8 },
    battery: { color: "#3d4250", metalness: 0.3, roughness: 0.6 },
  }[tone];

  return (
    <meshPhysicalMaterial
      color={preset.color}
      metalness={preset.metalness}
      roughness={preset.roughness}
      envMapIntensity={1.2}
      emissive="#ff7a2f"
      emissiveIntensity={selected ? 0.22 : 0}
      transparent={dimmed}
      opacity={dimmed ? 0.22 : 1}
      depthWrite={!dimmed}
      clippingPlanes={clip}
      side={side ?? THREE.FrontSide}
    />
  );
}

/** 单个推力室：燃烧室 + 收缩段 + 喷管，含冷却管束 */
function ThrustChamber({
  s,
  selected,
  onSelect,
  onHover,
  clip,
}: {
  s: EngineModelSpec;
  selected: string | null;
  onSelect: (id: EnginePartId) => void;
  onHover: (id: EnginePartId | null) => void;
  clip?: THREE.Plane[];
}) {
  const bell = React.useMemo(
    () => bellProfile(s.throatRadius, s.exitRadius, s.nozzleLength),
    [s.throatRadius, s.exitRadius, s.nozzleLength],
  );
  const converge = React.useMemo(
    () => convergeProfile(s.chamberRadius, s.throatRadius, s.convergeLength),
    [s.chamberRadius, s.throatRadius, s.convergeLength],
  );

  // Lathe 需要 Vector2(半径, 高度)；喷管朝 −y，所以轴向取负
  const bellPts = React.useMemo(
    () => bell.map(([r, y]) => new THREE.Vector2(r, -y)),
    [bell],
  );
  const convPts = React.useMemo(
    () => converge.map(([r, y]) => new THREE.Vector2(r, -y)),
    [converge],
  );

  const dim = (id: string) => Boolean(selected) && selected !== id;
  const extLen = s.nozzleLength * s.extensionFraction;

  return (
    <group>
      {/* 燃烧室圆柱 */}
      <Part id="chamber" selected={selected} onSelect={onSelect} onHover={onHover}>
        <mesh position={[0, s.convergeLength + s.chamberLength / 2, 0]}>
          <cylinderGeometry
            args={[s.chamberRadius, s.chamberRadius, s.chamberLength, 40, 1, true]}
          />
          <Mat tone="steel" dimmed={dim("chamber")} selected={selected === "chamber"} clip={clip} side={THREE.DoubleSide} />
        </mesh>
      </Part>

      {/* 收缩段 */}
      <Part id="chamber" selected={selected} onSelect={onSelect} onHover={onHover}>
        <mesh>
          <latheGeometry args={[convPts, 40]} />
          <Mat tone="steel" dimmed={dim("chamber")} selected={selected === "chamber"} clip={clip} side={THREE.DoubleSide} />
        </mesh>
      </Part>

      {/* 喉部加强环 */}
      <Part id="throat" selected={selected} onSelect={onSelect} onHover={onHover}>
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[s.throatRadius * 1.08, s.throatRadius * 0.12, 10, 32]} />
          <Mat tone="hot" dimmed={dim("throat")} selected={selected === "throat"} clip={clip} />
        </mesh>
      </Part>

      {/* 喷管扩张段 */}
      <Part id="nozzle" selected={selected} onSelect={onSelect} onHover={onHover}>
        <mesh>
          <latheGeometry args={[bellPts, 48]} />
          <Mat
            tone={s.solid ? "insul" : "copper"}
            dimmed={dim("nozzle")}
            selected={selected === "nozzle"}
            clip={clip}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* 出口加强环 */}
        <mesh position={[0, -s.nozzleLength, 0]}>
          <torusGeometry args={[s.exitRadius, s.exitRadius * 0.02, 8, 48]} />
          <Mat tone="steel" dimmed={dim("nozzle")} selected={selected === "nozzle"} clip={clip} />
        </mesh>
        {/* 可展开 / 辐射冷却延伸段：用一圈颜色不同的环带标出 */}
        {extLen > 0 ? (
          <mesh position={[0, -(s.nozzleLength - extLen), 0]}>
            <torusGeometry args={[s.exitRadius * 0.62, s.exitRadius * 0.015, 8, 48]} />
            <Mat tone="dark" dimmed={dim("nozzle")} selected={selected === "nozzle"} clip={clip} />
          </mesh>
        ) : null}
      </Part>

      {/* 再生冷却管束：沿喷管母线布一圈细管 */}
      {!s.solid ? (
        <Part id="cooling" selected={selected} onSelect={onSelect} onHover={onHover}>
          <CoolingTubes spec={s} bell={bell} dimmed={dim("cooling")} selected={selected === "cooling"} clip={clip} />
        </Part>
      ) : null}
    </group>
  );
}

/** 冷却管束：把母线偏置一点后用 TubeGeometry 沿周向复制若干根 */
function CoolingTubes({
  spec,
  bell,
  dimmed,
  selected,
  clip,
}: {
  spec: EngineModelSpec;
  bell: [number, number][];
  dimmed: boolean;
  selected: boolean;
  clip?: THREE.Plane[];
}) {
  const count = 28;
  const tubeR = spec.throatRadius * 0.05;

  const curve = React.useMemo(() => {
    const pts = bell.map(([r, y]) => new THREE.Vector3(r + tubeR * 0.9, -y, 0));
    return new THREE.CatmullRomCurve3(pts);
  }, [bell, tubeR]);

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} rotation={[0, (i / count) * Math.PI * 2, 0]}>
          <tubeGeometry args={[curve, 20, tubeR, 6, false]} />
          <Mat tone="copper" dimmed={dimmed} selected={selected} clip={clip} />
        </mesh>
      ))}
    </group>
  );
}

/** 一段管路：两点之间的圆管 */
function Duct({
  from,
  to,
  mid,
  radius,
  tone,
  dimmed,
  selected,
  clip,
}: {
  from: [number, number, number];
  to: [number, number, number];
  /** 显式中间控制点；不给时在两点之间向外侧鼓一点 */
  mid?: [number, number, number];
  radius: number;
  tone: "steel" | "dark" | "hot";
  dimmed: boolean;
  selected: boolean;
  clip?: THREE.Plane[];
}) {
  const geo = React.useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const m = mid
      ? new THREE.Vector3(...mid)
      : (() => {
          const v = a.clone().lerp(b, 0.5);
          v.x *= 1.15;
          v.z *= 1.15;
          return v;
        })();
    return new THREE.CatmullRomCurve3([a, m, b]);
  }, [from, to, mid]);

  return (
    <mesh>
      <tubeGeometry args={[geo, 16, radius, 10, false]} />
      <Mat tone={tone} dimmed={dimmed} selected={selected} clip={clip} />
    </mesh>
  );
}

export function EngineModel({
  spec,
  selected,
  onSelect,
  onHover,
  spin,
  cutaway,
}: {
  spec: EngineModelSpec;
  selected: string | null;
  onSelect: (id: EnginePartId) => void;
  onHover: (id: EnginePartId | null) => void;
  spin: boolean;
  cutaway: boolean;
}) {
  const root = React.useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin && root.current) root.current.rotation.y += dt * 0.22;
  });

  const clip = React.useMemo(
    () => (cutaway ? [new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)] : undefined),
    [cutaway],
  );

  const s = spec;
  const dim = (id: string) => Boolean(selected) && selected !== id;
  const R = s.chamberRadius;
  const topY = s.convergeLength + s.chamberLength;

  // 多室发动机：主室绕轴周向排布
  const chamberAngles = Array.from({ length: s.chambers }, (_, i) =>
    s.chambers > 1 ? (i / s.chambers) * Math.PI * 2 + Math.PI / 4 : 0,
  );

  return (
    <group ref={root} position={[0, s.totalLength * 0.32, 0]}>
      {/* ── 推力室（可能有多个） ─────────────── */}
      {chamberAngles.map((a, i) => (
        <group
          key={i}
          position={[Math.cos(a) * s.chamberOffset, 0, Math.sin(a) * s.chamberOffset]}
        >
          <ThrustChamber s={s} selected={selected} onSelect={onSelect} onHover={onHover} clip={clip} />
        </group>
      ))}

      {/* ── 游动喷管 ─────────────────────────── */}
      {Array.from({ length: s.verniers }).map((_, i) => {
        const a = (i / Math.max(s.verniers, 1)) * Math.PI * 2;
        const d = s.chamberOffset + s.chamberRadius * 1.9;
        const vr = s.throatRadius * 0.42;
        return (
          <group key={`v${i}`} position={[Math.cos(a) * d, -s.nozzleLength * 0.35, Math.sin(a) * d]}>
            <mesh>
              <cylinderGeometry args={[vr * 2.4, vr, s.nozzleLength * 0.45, 16, 1, true]} />
              <Mat tone="dark" dimmed={dim("nozzle")} selected={false} clip={clip} side={THREE.DoubleSide} />
            </mesh>
          </group>
        );
      })}

      {/* ── 喷注器圆顶 ───────────────────────── */}
      {!s.solid ? (
        <Part id="injector" selected={selected} onSelect={onSelect} onHover={onHover}>
          {chamberAngles.map((a, i) => (
            <mesh
              key={i}
              position={[
                Math.cos(a) * s.chamberOffset,
                topY + R * 0.35,
                Math.sin(a) * s.chamberOffset,
              ]}
            >
              <sphereGeometry args={[R * 1.02, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <Mat tone="dark" dimmed={dim("injector")} selected={selected === "injector"} clip={clip} />
            </mesh>
          ))}
        </Part>
      ) : null}

      {/* ── 涡轮泵 ───────────────────────────── */}
      {s.hasTurbopump ? (
        <>
          <Part id="pumps" selected={selected} onSelect={onSelect} onHover={onHover}>
            {[-1, 1].map((sign) => (
              <group key={sign} position={[sign * R * 1.75, topY + R * 0.5, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[R * 0.62, R * 0.62, R * 0.72, 24]} />
                  <Mat tone="steel" dimmed={dim("pumps")} selected={selected === "pumps"} clip={clip} />
                </mesh>
                <mesh position={[0, R * 0.5, 0]}>
                  <cylinderGeometry args={[R * 0.28, R * 0.34, R * 0.55, 20]} />
                  <Mat tone="steel" dimmed={dim("pumps")} selected={selected === "pumps"} clip={clip} />
                </mesh>
              </group>
            ))}
          </Part>

          <Part id="turbine" selected={selected} onSelect={onSelect} onHover={onHover}>
            <mesh position={[0, topY + R * 1.35, 0]}>
              <cylinderGeometry args={[R * 0.5, R * 0.5, R * 0.5, 24]} />
              <Mat tone="hot" dimmed={dim("turbine")} selected={selected === "turbine"} clip={clip} />
            </mesh>
          </Part>

          {/* 泵到燃烧室的输送管 */}
          {[-1, 1].map((sign) => (
            <Duct
              key={`d${sign}`}
              from={[sign * R * 1.75, topY + R * 0.2, 0]}
              to={[sign * R * 0.72, topY - R * 0.3, 0]}
              radius={R * 0.16}
              tone="steel"
              dimmed={dim("valves")}
              selected={selected === "valves"}
              clip={clip}
            />
          ))}
        </>
      ) : null}

      {/* ── 预燃室 / 燃气发生器 ───────────────── */}
      {Array.from({ length: s.preburners }).map((_, i) => {
        const sign = s.preburners === 2 ? (i === 0 ? -1 : 1) : 0;
        return (
          <Part key={`pb${i}`} id="gas-generator" selected={selected} onSelect={onSelect} onHover={onHover}>
            <mesh position={[sign * R * 1.05, topY + R * 1.95, 0]}>
              <cylinderGeometry args={[R * 0.34, R * 0.34, R * 0.6, 20]} />
              <Mat tone="hot" dimmed={dim("gas-generator")} selected={selected === "gas-generator"} clip={clip} />
            </mesh>
          </Part>
        );
      })}

      {/* ── 涡轮排气管（开式循环）：贴着每个推力室的钟形外壁下行 ── */}
      {s.hasDumpDuct ? (
        <Part id="exhaust" selected={selected} onSelect={onSelect} onHover={onHover}>
          {chamberAngles.map((a, i) => {
            const cxx = Math.cos(a) * s.chamberOffset;
            const czz = Math.sin(a) * s.chamberOffset;
            // 沿远离轴线的一侧下行，避免多室时管路互相穿插
            const dirX = s.chambers > 1 ? Math.cos(a) : 1;
            const dirZ = s.chambers > 1 ? Math.sin(a) : 0;
            return (
              <Duct
                key={`ex${i}`}
                from={[cxx + dirX * R * 0.85, topY + R * 1.2, czz + dirZ * R * 0.85]}
                mid={[
                  cxx + dirX * s.exitRadius * 0.95,
                  -s.nozzleLength * 0.35,
                  czz + dirZ * s.exitRadius * 0.95,
                ]}
                to={[
                  cxx + dirX * s.exitRadius * 0.98,
                  -s.nozzleLength * 0.92,
                  czz + dirZ * s.exitRadius * 0.98,
                ]}
                radius={s.throatRadius * 0.18}
                tone="dark"
                dimmed={dim("exhaust")}
                selected={selected === "exhaust"}
                clip={clip}
              />
            );
          })}
        </Part>
      ) : null}

      {/* ── 膨胀循环回流总管 ─────────────────── */}
      {s.hasExpanderManifold ? (
        <Part id="cooling" selected={selected} onSelect={onSelect} onHover={onHover}>
          <mesh position={[0, topY * 0.05, 0]}>
            <torusGeometry args={[s.chamberRadius * 1.25, s.chamberRadius * 0.11, 10, 32]} />
            <Mat tone="steel" dimmed={dim("cooling")} selected={selected === "cooling"} clip={clip} />
          </mesh>
        </Part>
      ) : null}

      {/* ── 电泵循环的电池组 ─────────────────── */}
      {s.hasBattery ? (
        <Part id="pumps" selected={selected} onSelect={onSelect} onHover={onHover}>
          {[-1, 1].map((sign) => (
            <mesh key={sign} position={[sign * R * 1.9, topY + R * 1.5, 0]}>
              <boxGeometry args={[R * 0.9, R * 1.1, R * 0.7]} />
              <Mat tone="battery" dimmed={dim("pumps")} selected={selected === "pumps"} clip={clip} />
            </mesh>
          ))}
        </Part>
      ) : null}

      {/* ── 万向节与推进剂主阀 ───────────────── */}
      {s.hasGimbal ? (
        <>
          <Part id="gimbal" selected={selected} onSelect={onSelect} onHover={onHover}>
            <mesh position={[0, topY + R * 2.45, 0]}>
              <torusGeometry args={[R * 0.55, R * 0.13, 10, 28]} />
              <Mat tone="dark" dimmed={dim("gimbal")} selected={selected === "gimbal"} clip={clip} />
            </mesh>
            <mesh position={[0, topY + R * 2.75, 0]}>
              <boxGeometry args={[R * 1.5, R * 0.22, R * 0.6]} />
              <Mat tone="dark" dimmed={dim("gimbal")} selected={selected === "gimbal"} clip={clip} />
            </mesh>
          </Part>

          <Part id="valves" selected={selected} onSelect={onSelect} onHover={onHover}>
            {[-1, 1].map((sign) => (
              <mesh key={sign} position={[sign * R * 1.75, topY + R * 1.35, 0]}>
                <cylinderGeometry args={[R * 0.24, R * 0.24, R * 0.42, 16]} />
                <Mat tone="steel" dimmed={dim("valves")} selected={selected === "valves"} clip={clip} />
              </mesh>
            ))}
          </Part>
        </>
      ) : null}

      {/* ── 固体发动机：药柱壳体 ─────────────── */}
      {s.solid ? (
        <Part id="chamber" selected={selected} onSelect={onSelect} onHover={onHover}>
          <mesh position={[0, topY + s.chamberLength * 0.5, 0]}>
            <capsuleGeometry args={[s.chamberRadius, s.chamberLength, 6, 28]} />
            <Mat tone="insul" dimmed={dim("chamber")} selected={selected === "chamber"} clip={clip} />
          </mesh>
        </Part>
      ) : null}
    </group>
  );
}
