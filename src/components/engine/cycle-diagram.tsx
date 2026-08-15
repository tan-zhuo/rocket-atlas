"use client";

import * as React from "react";
import type { DiagramCycle } from "@/data/engine-anatomy";
import { cn } from "@/lib/utils";

/**
 * 动力循环流程图。
 *
 * 六种循环的差别可以压缩成一个问题：**驱动泵的能量从哪来，用完的燃气去哪儿。**
 * 所以这张图只画四类连线——燃料、氧化剂、热燃气、电力——外加一条虚线表示「排掉」。
 * 看懂一张图的关键是看热燃气那条线的终点：进燃烧室（闭式）还是排出箭外（开式）。
 */

type Tone = "fuel" | "ox" | "hot" | "power";

const TONE: Record<Tone, string> = {
  fuel: "#4fd1ff",
  ox: "#7ee787",
  hot: "#e0704a",
  power: "#c792ea",
};

interface NodeSpec {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone: Tone;
  /** 圆角矩形还是圆形 */
  round?: boolean;
}

interface EdgeSpec {
  d: string;
  tone: Tone;
  dashed?: boolean;
}

export interface CycleLabels {
  fuel: string;
  ox: string;
  pump: string;
  turbine: string;
  gg: string;
  preburner: string;
  preburnerFuel: string;
  preburnerOx: string;
  chamber: string;
  battery: string;
  motor: string;
  helium: string;
  dump: string;
  jacket: string;
}

const W = 320;
const H = 250;

/** 公共节点：贮箱与燃烧室 */
function common(l: CycleLabels) {
  return {
    fuelTank: { x: 14, y: 8, w: 84, h: 24, label: l.fuel, tone: "fuel" as Tone },
    oxTank: { x: 222, y: 8, w: 84, h: 24, label: l.ox, tone: "ox" as Tone },
    chamber: { x: 122, y: 176, w: 76, h: 28, label: l.chamber, tone: "hot" as Tone },
  };
}

function layout(cycle: DiagramCycle, l: CycleLabels): { nodes: NodeSpec[]; edges: EdgeSpec[] } {
  const c = common(l);
  const chamberTop = c.chamber.y;

  switch (cycle) {
    case "gas-generator":
      return {
        nodes: [
          c.fuelTank,
          c.oxTank,
          { x: 26, y: 62, w: 60, h: 24, label: l.pump, tone: "fuel", round: true },
          { x: 234, y: 62, w: 60, h: 24, label: l.pump, tone: "ox", round: true },
          { x: 128, y: 62, w: 64, h: 24, label: l.turbine, tone: "hot" },
          { x: 124, y: 114, w: 72, h: 24, label: l.gg, tone: "hot" },
          c.chamber,
        ],
        edges: [
          { d: "M 56 32 V 62", tone: "fuel" },
          { d: "M 264 32 V 62", tone: "ox" },
          { d: `M 56 86 V ${chamberTop - 12} H 140 V ${chamberTop}`, tone: "fuel" },
          { d: `M 264 86 V ${chamberTop - 12} H 180 V ${chamberTop}`, tone: "ox" },
          { d: "M 70 96 H 132 V 114", tone: "fuel" },
          { d: "M 250 96 H 188 V 114", tone: "ox" },
          { d: "M 160 114 V 86", tone: "hot" },
          { d: "M 192 74 H 300 V 232", tone: "hot", dashed: true },
        ],
      };

    case "staged-combustion":
      return {
        nodes: [
          c.fuelTank,
          c.oxTank,
          { x: 26, y: 62, w: 60, h: 24, label: l.pump, tone: "fuel", round: true },
          { x: 234, y: 62, w: 60, h: 24, label: l.pump, tone: "ox", round: true },
          { x: 124, y: 62, w: 72, h: 24, label: l.preburner, tone: "hot" },
          { x: 128, y: 116, w: 64, h: 24, label: l.turbine, tone: "hot" },
          c.chamber,
        ],
        edges: [
          { d: "M 56 32 V 62", tone: "fuel" },
          { d: "M 264 32 V 62", tone: "ox" },
          { d: "M 86 74 H 124", tone: "fuel" },
          { d: "M 234 74 H 196", tone: "ox" },
          { d: `M 56 86 V ${chamberTop - 12} H 130 V ${chamberTop}`, tone: "fuel" },
          { d: "M 160 86 V 116", tone: "hot" },
          { d: `M 160 140 V ${chamberTop}`, tone: "hot" },
        ],
      };

    case "full-flow-staged-combustion":
      return {
        nodes: [
          c.fuelTank,
          c.oxTank,
          { x: 20, y: 58, w: 54, h: 22, label: l.pump, tone: "fuel", round: true },
          { x: 246, y: 58, w: 54, h: 22, label: l.pump, tone: "ox", round: true },
          { x: 8, y: 100, w: 96, h: 26, label: l.preburnerFuel, tone: "hot" },
          { x: 216, y: 100, w: 96, h: 26, label: l.preburnerOx, tone: "hot" },
          { x: 24, y: 140, w: 46, h: 22, label: l.turbine, tone: "hot" },
          { x: 250, y: 140, w: 46, h: 22, label: l.turbine, tone: "hot" },
          c.chamber,
        ],
        edges: [
          { d: "M 47 32 V 58", tone: "fuel" },
          { d: "M 273 32 V 58", tone: "ox" },
          { d: "M 47 80 V 100", tone: "fuel" },
          { d: "M 273 80 V 100", tone: "ox" },
          { d: "M 104 108 H 216", tone: "ox" },
          { d: "M 216 118 H 104", tone: "fuel" },
          { d: "M 47 126 V 140", tone: "hot" },
          { d: "M 273 126 V 140", tone: "hot" },
          { d: `M 47 162 V ${chamberTop + 6} H 122`, tone: "hot" },
          { d: `M 273 162 V ${chamberTop + 6} H 198`, tone: "hot" },
        ],
      };

    case "expander":
      return {
        nodes: [
          c.fuelTank,
          c.oxTank,
          { x: 26, y: 62, w: 60, h: 24, label: l.pump, tone: "fuel", round: true },
          { x: 234, y: 62, w: 60, h: 24, label: l.pump, tone: "ox", round: true },
          { x: 124, y: 108, w: 72, h: 24, label: l.turbine, tone: "hot" },
          { x: 16, y: 140, w: 78, h: 22, label: l.jacket, tone: "fuel" },
          c.chamber,
        ],
        edges: [
          { d: "M 56 32 V 62", tone: "fuel" },
          { d: "M 264 32 V 62", tone: "ox" },
          { d: "M 56 86 V 140", tone: "fuel" },
          { d: `M 94 151 H 108 V ${chamberTop + 24}`, tone: "fuel" },
          { d: "M 60 140 V 120 H 124", tone: "hot" },
          { d: `M 160 132 V ${chamberTop}`, tone: "hot" },
          { d: `M 264 86 V ${chamberTop - 12} H 190 V ${chamberTop}`, tone: "ox" },
        ],
      };

    case "electric-pump":
      return {
        nodes: [
          c.fuelTank,
          c.oxTank,
          { x: 122, y: 56, w: 76, h: 26, label: l.battery, tone: "power" },
          { x: 22, y: 104, w: 64, h: 24, label: l.motor, tone: "power", round: true },
          { x: 234, y: 104, w: 64, h: 24, label: l.motor, tone: "power", round: true },
          c.chamber,
        ],
        edges: [
          { d: "M 122 69 H 86 V 104", tone: "power" },
          { d: "M 198 69 H 234 V 104", tone: "power" },
          { d: "M 54 32 V 104", tone: "fuel" },
          { d: "M 266 32 V 104", tone: "ox" },
          { d: `M 54 128 V ${chamberTop - 12} H 138 V ${chamberTop}`, tone: "fuel" },
          { d: `M 266 128 V ${chamberTop - 12} H 182 V ${chamberTop}`, tone: "ox" },
        ],
      };

    case "pressure-fed":
    default:
      return {
        nodes: [
          { x: 122, y: 8, w: 76, h: 24, label: l.helium, tone: "power" },
          { x: 14, y: 62, w: 84, h: 26, label: l.fuel, tone: "fuel" },
          { x: 222, y: 62, w: 84, h: 26, label: l.ox, tone: "ox" },
          c.chamber,
        ],
        edges: [
          { d: "M 122 20 H 56 V 62", tone: "power" },
          { d: "M 198 20 H 264 V 62", tone: "power" },
          { d: `M 56 88 V ${chamberTop - 12} H 138 V ${chamberTop}`, tone: "fuel" },
          { d: `M 264 88 V ${chamberTop - 12} H 182 V ${chamberTop}`, tone: "ox" },
        ],
      };
  }
}

export function CycleDiagram({
  cycle,
  labels,
  className,
}: {
  cycle: DiagramCycle;
  labels: CycleLabels;
  className?: string;
}) {
  const { nodes, edges } = layout(cycle, labels);
  const chamber = nodes[nodes.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={labels.chamber}
    >
      {edges.map((e, i) => (
        <path
          key={i}
          d={e.d}
          fill="none"
          stroke={TONE[e.tone]}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={e.dashed ? "6 5" : undefined}
          opacity={e.dashed ? 0.75 : 0.9}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height={n.h}
            rx={n.round ? n.h / 2 : 5}
            fill="var(--panel)"
            stroke={TONE[n.tone]}
            strokeWidth={2}
          />
          <text
            x={n.x + n.w / 2}
            y={n.y + n.h / 2 + 4}
            textAnchor="middle"
            className="fill-[var(--fg-muted)] text-[10px]"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* 喷管 */}
      <path
        d={`M ${chamber.x + 6} ${chamber.y + chamber.h}
            L ${chamber.x - 14} ${H - 12}
            L ${chamber.x + chamber.w + 14} ${H - 12}
            L ${chamber.x + chamber.w - 6} ${chamber.y + chamber.h} Z`}
        fill={TONE.hot}
        fillOpacity={0.12}
        stroke={TONE.hot}
        strokeWidth={2}
      />

      {/* 排出标注 */}
      {cycle === "gas-generator" ? (
        <text x={300} y={244} textAnchor="middle" className="fill-[var(--fg-subtle)] text-[10px]">
          {labels.dump}
        </text>
      ) : null}
    </svg>
  );
}

/** 图例：四类连线的含义 */
export function CycleLegend({ labels, className }: { labels: CycleLabels; className?: string }) {
  const items: [Tone, string][] = [
    ["fuel", labels.fuel],
    ["ox", labels.ox],
    ["hot", labels.turbine],
    ["power", labels.battery],
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5", className)}>
      {items.map(([tone, label]) => (
        <span key={tone} className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
          <span className="h-0.5 w-4 rounded" style={{ background: TONE[tone] }} aria-hidden />
          {label}
        </span>
      ))}
    </div>
  );
}
