"use client";

import * as React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { RocketGeometry, RocketPart } from "@/data/types";
import { GROUP_COLOR, explodeOffset } from "@/data/geometry";

/**
 * 参数化几何 → three.js 网格。
 *
 * 每个 RocketPart 变成一个可点击的 group：
 *   - 位置由 bottom/height 决定（火箭底部 y=0）
 *   - cluster 表示绕轴周向阵列（助推器、尾翼、栅格舵）
 *   - 爆炸视图对每个 group 施加轴向/径向偏移，并做插值动画
 */

const SEG = 48;

function ogivePoints(radius: number, height: number, n = 14) {
  // 冯·卡门式头锥的简化轮廓：r(y) = R * sqrt(1 - (y/H)^2) 的钝化版本
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const r = radius * Math.pow(Math.cos((t * Math.PI) / 2), 0.62);
    pts.push(new THREE.Vector2(Math.max(r, 0.001), t * height));
  }
  return pts;
}

/** 尾翼/襟翼的后掠三角剖面 */
function finShape(len: number, height: number, sweep = 0.55) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(len, 0);
  s.lineTo(len * sweep * 0.35, height);
  s.lineTo(0, height * 0.92);
  s.closePath();
  return s;
}

/** 部件材质：颜色/高亮/淡出全部由 props 派生，交给 R3F 自己 diff。 */
function Mat({
  color,
  selected,
  dimmed,
}: {
  color: string;
  selected: boolean;
  dimmed: boolean;
}) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.55}
      roughness={0.42}
      emissive={color}
      emissiveIntensity={selected ? 0.34 : 0.1}
      transparent={dimmed}
      opacity={dimmed ? 0.26 : 1}
    />
  );
}

function PartMesh({
  part,
  color,
  selected,
  dimmed,
}: {
  part: RocketPart;
  color: string;
  selected: boolean;
  dimmed: boolean;
}) {
  const mat = <Mat color={color} selected={selected} dimmed={dimmed} />;

  const h = part.height;
  const r = part.radius;
  const rt = part.radiusTop ?? r;

  switch (part.shape) {
    case "cylinder":
      return (
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[r, r, h, SEG, 1]} />
          {mat}
        </mesh>
      );

    case "frustum":
      return (
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[rt, r, h, SEG, 1]} />
          {mat}
        </mesh>
      );

    case "cone":
      return (
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[r * 0.02, r, h, SEG, 1]} />
          {mat}
        </mesh>
      );

    case "capsule":
      return (
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[r * 0.34, r, h, SEG, 1]} />
          {mat}
        </mesh>
      );

    case "ogive":
      return (
        <mesh>
          <latheGeometry args={[ogivePoints(r, h), SEG]} />
          {mat}
        </mesh>
      );

    case "engines": {
      const n = part.nozzles;
      const count = n?.count ?? 1;
      const bell = n?.bellRadius ?? r * 0.35;
      const bh = Math.min(n?.bellHeight ?? h, h);
      const ring = n?.ringRadius ?? 0;
      const positions: [number, number][] = [];
      if (count === 1 || ring === 0) {
        positions.push([0, 0]);
        for (let i = 1; i < count; i++) {
          const a = (i / (count - 1 || 1)) * Math.PI * 2;
          positions.push([Math.cos(a) * bell * 1.6, Math.sin(a) * bell * 1.6]);
        }
      } else if (count <= 9) {
        // 中心 1 + 外圈
        const outer = count % 2 === 1 ? count - 1 : count;
        if (count % 2 === 1) positions.push([0, 0]);
        for (let i = 0; i < outer; i++) {
          const a = (i / outer) * Math.PI * 2 + Math.PI / outer;
          positions.push([Math.cos(a) * ring, Math.sin(a) * ring]);
        }
      } else {
        // 多圈布局（Super Heavy 的 3 + 10 + 20）
        const rings = [
          { n: 3, r: ring * 0.28 },
          { n: 10, r: ring * 0.62 },
          { n: count - 13, r: ring },
        ];
        for (const rr of rings) {
          for (let i = 0; i < rr.n; i++) {
            const a = (i / rr.n) * Math.PI * 2;
            positions.push([Math.cos(a) * rr.r, Math.sin(a) * rr.r]);
          }
        }
      }
      return (
        <group>
          {/* 发动机安装底盘 */}
          <mesh position={[0, h - bh / 2, 0]}>
            <cylinderGeometry args={[r * 0.96, r * 0.9, Math.max(h - bh, 0.05), SEG, 1]} />
            {mat}
          </mesh>
          {positions.map(([px, pz], i) => (
            <mesh key={i} position={[px, bh / 2, pz]}>
              <cylinderGeometry args={[bell, bell * 0.34, bh, 20, 1, true]} />
              {mat}
            </mesh>
          ))}
        </group>
      );
    }

    case "fins":
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <extrudeGeometry
            args={[finShape(r, h), { depth: Math.max(r * 0.1, 0.08), bevelEnabled: false }]}
          />
          {mat}
        </mesh>
      );

    case "flap":
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <extrudeGeometry
            args={[finShape(r, h, 0.9), { depth: Math.max(r * 0.08, 0.1), bevelEnabled: false }]}
          />
          {mat}
        </mesh>
      );

    case "gridfins":
      return (
        <mesh position={[r / 2, h / 2, 0]}>
          <boxGeometry args={[r, h, r * 0.12]} />
          {mat}
        </mesh>
      );

    case "tower": {
      const legs = 4;
      return (
        <group>
          <mesh position={[0, h * 0.78, 0]}>
            <cylinderGeometry args={[r * 0.75, r * 0.62, h * 0.44, 20, 1]} />
            {mat}
          </mesh>
          {Array.from({ length: legs }).map((_, i) => {
            const a = (i / legs) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * r * 0.4, h * 0.28, Math.sin(a) * r * 0.4]}
                rotation={[0, -a, 0.13]}
                castShadow
              >
                <cylinderGeometry args={[r * 0.07, r * 0.07, h * 0.56, 8, 1]} />
                {mat}
              </mesh>
            );
          })}
        </group>
      );
    }

    default:
      return (
        <mesh position={[0, h / 2, 0]}>
          <cylinderGeometry args={[r, r, h, SEG, 1]} />
          {mat}
        </mesh>
      );
  }
}

/** 一个部件（含周向阵列）+ 爆炸偏移动画 */
function Part({
  part,
  totalHeight,
  explode,
  selectedId,
  onSelect,
  onHover,
}: {
  part: RocketPart;
  totalHeight: number;
  explode: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  const ref = React.useRef<THREE.Group>(null);
  const target = React.useRef({ axial: 0, radial: 0 });

  const selected = selectedId === part.id;
  const dimmed = Boolean(selectedId) && !selected;
  const color = part.color ?? GROUP_COLOR[part.group];

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const { axial, radial } = explodeOffset(part.group, totalHeight, explode);
    target.current.axial += (axial - target.current.axial) * Math.min(1, dt * 6);
    target.current.radial += (radial - target.current.radial) * Math.min(1, dt * 6);
    g.position.y = part.bottom + target.current.axial;
  });

  const instances = part.cluster
    ? Array.from({ length: part.cluster.count }, (_, i) => i)
    : [0];

  return (
    <group
      ref={ref}
      position={[0, part.bottom, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(part.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(part.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {instances.map((i) => {
        const c = part.cluster;
        const angle = c ? (i / c.count) * Math.PI * 2 + ((c.phase ?? 0) * Math.PI) / 180 : 0;
        const off = c ? c.offset : 0;
        return (
          <ClusterInstance
            key={i}
            angle={angle}
            offset={off}
            group={part.group}
            totalHeight={totalHeight}
            explode={explode}
          >
            <PartMesh part={part} color={color} selected={selected} dimmed={dimmed} />
          </ClusterInstance>
        );
      })}
    </group>
  );
}

/** 周向阵列中的一个实例：处理绕轴位置与助推器的径向分离 */
function ClusterInstance({
  angle,
  offset,
  group,
  totalHeight,
  explode,
  children,
}: {
  angle: number;
  offset: number;
  group: RocketPart["group"];
  totalHeight: number;
  explode: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<THREE.Group>(null);
  const cur = React.useRef(0);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const { radial } = explodeOffset(group, totalHeight, explode);
    cur.current += (radial - cur.current) * Math.min(1, dt * 6);
    const d = offset + cur.current;
    g.position.x = Math.cos(angle) * d;
    g.position.z = Math.sin(angle) * d;
  });

  return (
    <group ref={ref} position={[Math.cos(angle) * offset, 0, Math.sin(angle) * offset]}>
      <group rotation={[0, -angle, 0]}>{children}</group>
    </group>
  );
}

export function RocketModel({
  geometry,
  explode,
  selectedId,
  onSelect,
  onHover,
  spin,
}: {
  geometry: RocketGeometry;
  explode: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  spin: boolean;
}) {
  const root = React.useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (spin && root.current) root.current.rotation.y += dt * 0.16;
  });

  return (
    <group ref={root} position={[0, -geometry.totalHeight / 2, 0]}>
      {geometry.parts.map((p) => (
        <Part
          key={p.id}
          part={p}
          totalHeight={geometry.totalHeight}
          explode={explode}
          selectedId={selectedId}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </group>
  );
}
