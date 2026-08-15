"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AnatomyPart } from "@/data/engine-anatomy";

/**
 * 泵压式液体火箭发动机剖面图。
 *
 * 画的是燃气发生器循环的典型构型（它零件最全，其余循环都是它的增减）。
 * 每个部件是一个可点击的图元，选中后右侧给出「它为什么存在」。
 * 尺寸不按比例——这是一张示意图，目的是说清连接关系，不是复原某台具体发动机。
 */

const W = 460;
const H = 560;

/** 燃烧室 / 喉部 / 喷管的轮廓半径 */
const CX = 230;
const R_CHAMBER = 46;
const R_THROAT = 17;
const R_EXIT = 104;
const Y_CHAMBER_TOP = 250;
const Y_CHAMBER_BOTTOM = 320;
const Y_THROAT = 352;
const Y_EXIT = 520;

/** 钟形喷管外形：喉部到出口的一段抛物线 */
function bellPath(sign: 1 | -1) {
  const x0 = CX + sign * R_THROAT;
  const x1 = CX + sign * R_EXIT;
  const cx = CX + sign * (R_EXIT * 0.92);
  const cy = Y_THROAT + (Y_EXIT - Y_THROAT) * 0.42;
  return `M ${x0} ${Y_THROAT} Q ${cx} ${cy} ${x1} ${Y_EXIT}`;
}

export function AnatomyDiagram({
  parts,
  hint,
  className,
}: {
  parts: AnatomyPart[];
  hint: string;
  className?: string;
}) {
  const [active, setActive] = React.useState<string>("chamber");
  const current = parts.find((p) => p.id === active) ?? parts[0];

  const hit = (id: string) => ({
    onClick: () => setActive(id),
    onMouseEnter: () => setActive(id),
    className: cn(
      "cursor-pointer transition-opacity",
      active && active !== id ? "opacity-45" : "opacity-100",
    ),
    role: "button" as const,
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") setActive(id);
    },
  });

  const metal = "var(--fg-subtle)";
  const hot = "#e0704a";
  const fuel = "#4fd1ff";
  const ox = "#7ee787";

  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]", className)}>
      <figure className="rounded-xl border border-border-base bg-bg-sunken p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={hint}>
          {/* ── 万向节 ─────────────────────────── */}
          <g {...hit("gimbal")}>
            <rect x={CX - 26} y={26} width={52} height={16} rx={4} fill={metal} />
            <circle cx={CX} cy={52} r={12} fill="none" stroke={metal} strokeWidth={5} />
            <line x1={CX} y1={64} x2={CX} y2={86} stroke={metal} strokeWidth={6} />
          </g>

          {/* ── 推进剂入口与主阀 ───────────────── */}
          <g {...hit("valves")}>
            <path
              d={`M 92 60 H 150 V 96`}
              fill="none"
              stroke={fuel}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <path
              d={`M 368 60 H 310 V 96`}
              fill="none"
              stroke={ox}
              strokeWidth={7}
              strokeLinecap="round"
            />
            <circle cx={150} cy={78} r={9} fill="var(--panel)" stroke={fuel} strokeWidth={4} />
            <circle cx={310} cy={78} r={9} fill="var(--panel)" stroke={ox} strokeWidth={4} />
          </g>

          {/* ── 涡轮泵 ─────────────────────────── */}
          <g {...hit("pumps")}>
            <circle cx={150} cy={122} r={26} fill="var(--panel)" stroke={fuel} strokeWidth={5} />
            <circle cx={310} cy={122} r={26} fill="var(--panel)" stroke={ox} strokeWidth={5} />
            <line x1={176} y1={122} x2={202} y2={122} stroke={metal} strokeWidth={5} />
            <line x1={284} y1={122} x2={258} y2={122} stroke={metal} strokeWidth={5} />
          </g>

          {/* ── 涡轮 ───────────────────────────── */}
          <g {...hit("turbine")}>
            <rect x={CX - 28} y={104} width={56} height={36} rx={5} fill="var(--panel)" stroke={hot} strokeWidth={4} />
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1={CX - 20 + i * 13}
                y1={108}
                x2={CX - 20 + i * 13}
                y2={136}
                stroke={hot}
                strokeWidth={2.5}
              />
            ))}
          </g>

          {/* ── 燃气发生器 ─────────────────────── */}
          <g {...hit("gas-generator")}>
            <rect x={CX - 22} y={158} width={44} height={30} rx={5} fill={hot} fillOpacity={0.25} stroke={hot} strokeWidth={3.5} />
            <line x1={CX} y1={140} x2={CX} y2={158} stroke={hot} strokeWidth={4} />
            <line x1={168} y1={148} x2={CX - 22} y2={168} stroke={fuel} strokeWidth={3} />
            <line x1={292} y1={148} x2={CX + 22} y2={168} stroke={ox} strokeWidth={3} />
          </g>

          {/* ── 涡轮排气 ───────────────────────── */}
          <g {...hit("exhaust")}>
            <path
              d={`M ${CX + 28} 122 H 392 V 470`}
              fill="none"
              stroke={hot}
              strokeWidth={4}
              strokeDasharray="7 5"
            />
            <path d="M 386 462 L 392 480 L 398 462 Z" fill={hot} />
          </g>

          {/* ── 主推进剂下行管 ─────────────────── */}
          <path d={`M 150 148 V 236 H ${CX - 34}`} fill="none" stroke={fuel} strokeWidth={5} />
          <path d={`M 310 148 V 236 H ${CX + 34}`} fill="none" stroke={ox} strokeWidth={5} />

          {/* ── 喷注器 ─────────────────────────── */}
          <g {...hit("injector")}>
            <rect x={CX - R_CHAMBER} y={236} width={R_CHAMBER * 2} height={16} rx={3} fill={metal} />
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={i}
                x1={CX - R_CHAMBER + 8 + i * 10}
                y1={252}
                x2={CX - R_CHAMBER + 8 + i * 10}
                y2={262}
                stroke={metal}
                strokeWidth={2}
              />
            ))}
          </g>

          {/* ── 燃烧室 ─────────────────────────── */}
          <g {...hit("chamber")}>
            <path
              d={`M ${CX - R_CHAMBER} ${Y_CHAMBER_TOP} V ${Y_CHAMBER_BOTTOM} L ${CX - R_THROAT} ${Y_THROAT}
                  L ${CX + R_THROAT} ${Y_THROAT} L ${CX + R_CHAMBER} ${Y_CHAMBER_BOTTOM} V ${Y_CHAMBER_TOP} Z`}
              fill={hot}
              fillOpacity={0.16}
              stroke={metal}
              strokeWidth={4}
            />
          </g>

          {/* ── 再生冷却夹套 ───────────────────── */}
          <g {...hit("cooling")}>
            {[-1, 1].map((sign) => (
              <path
                key={sign}
                d={`M ${CX + sign * (R_CHAMBER + 9)} ${Y_CHAMBER_TOP}
                    V ${Y_CHAMBER_BOTTOM}
                    L ${CX + sign * (R_THROAT + 8)} ${Y_THROAT}`}
                fill="none"
                stroke={fuel}
                strokeWidth={3}
              />
            ))}
            {[-1, 1].map((sign) => (
              <path
                key={`b${sign}`}
                d={bellPath(sign as 1 | -1)}
                fill="none"
                stroke={fuel}
                strokeWidth={2.5}
                transform={`translate(${sign * 9} 0)`}
                opacity={0.65}
              />
            ))}
          </g>

          {/* ── 喉部 ───────────────────────────── */}
          <g {...hit("throat")}>
            <line
              x1={CX - R_THROAT}
              y1={Y_THROAT}
              x2={CX + R_THROAT}
              y2={Y_THROAT}
              stroke={hot}
              strokeWidth={5}
            />
            <circle cx={CX} cy={Y_THROAT} r={4} fill={hot} />
          </g>

          {/* ── 喷管扩张段 ─────────────────────── */}
          <g {...hit("nozzle")}>
            <path d={bellPath(-1)} fill="none" stroke={metal} strokeWidth={4} />
            <path d={bellPath(1)} fill="none" stroke={metal} strokeWidth={4} />
            <line
              x1={CX - R_EXIT}
              y1={Y_EXIT}
              x2={CX + R_EXIT}
              y2={Y_EXIT}
              stroke={metal}
              strokeWidth={3}
              strokeDasharray="6 5"
            />
          </g>

          {/* 尺寸提示：扩张比 */}
          <text
            x={CX}
            y={Y_EXIT + 22}
            textAnchor="middle"
            className="fill-[var(--fg-subtle)] text-[11px]"
          >
            Ae / At
          </text>
        </svg>
        <figcaption className="mt-1 text-center text-[11px] text-fg-subtle">{hint}</figcaption>
      </figure>

      {/* 说明区 */}
      <div>
        <div className="flex flex-wrap gap-1.5">
          {parts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={cn(
                "rounded-md border px-2 py-1 text-[12px] transition-colors",
                p.id === active
                  ? "border-accent/45 bg-accent-soft text-accent"
                  : "border-border-base text-fg-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <article className="mt-4 rounded-xl border border-border-base bg-panel p-5">
          <h3 className="text-[17px] font-semibold text-fg">{current.name}</h3>
          <p className="mt-1.5 text-[13px] text-fg-muted">{current.role}</p>
          <p className="mt-3.5 text-[14px] leading-relaxed text-fg-muted">
            <Inline text={current.body} />
          </p>
        </article>
      </div>
    </div>
  );
}

/** 只处理 **加粗** */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
