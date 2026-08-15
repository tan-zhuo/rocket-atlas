"use client";

import * as React from "react";
import type { EngineSummary } from "@/lib/engine-summary";
import { useI18n } from "@/i18n/provider";
import { CYCLE_LABEL } from "@/i18n/terms";
import { cn } from "@/lib/utils";

/**
 * 室压 × 真空比冲散点图。
 *
 * 这张图的信息量在于聚类：同一动力循环的发动机会挤在相近的区域，
 * 膨胀循环在左上（低压高比冲）、燃气发生器在中部、分级燃烧在右上、固体在左下。
 * 换句话说，**循环基本决定了一台发动机能站在哪个区间**，这是本站
 * 「推进剂与动力循环」专题最直观的一张证据图。
 */

const CYCLE_COLOR: Record<string, string> = {
  "gas-generator": "#f0a04b",
  "staged-combustion": "#4fd1ff",
  "full-flow-staged-combustion": "#e0457b",
  expander: "#5fd68a",
  "electric-pump": "#c792ea",
  "pressure-fed": "#9aa4b6",
  solid: "#8a94a8",
  "hybrid-unknown": "#6b7488",
};

const W = 720;
const H = 380;
const PAD = { l: 54, r: 16, t: 16, b: 40 };

export function EngineChart({
  engines,
  onPick,
}: {
  engines: EngineSummary[];
  onPick?: (slug: string) => void;
}) {
  const { t, lang } = useI18n();
  const cycleLabel = CYCLE_LABEL[lang];
  const [hover, setHover] = React.useState<string | null>(null);

  const pts = engines.filter(
    (e) => typeof e.chamberPressure === "number" && typeof e.ispVacuum === "number",
  );
  if (pts.length === 0) return null;

  const xs = pts.map((e) => e.chamberPressure!);
  const ys = pts.map((e) => e.ispVacuum!);
  const xMax = Math.max(...xs) * 1.08;
  const yMin = Math.min(...ys) - 20;
  const yMax = Math.max(...ys) + 20;

  const px = (v: number) => PAD.l + (v / xMax) * (W - PAD.l - PAD.r);
  const py = (v: number) => H - PAD.b - ((v - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const xTicks = [0, 100, 200, 300].filter((v) => v <= xMax);
  const yTicks = [200, 250, 300, 350, 400, 450].filter((v) => v >= yMin && v <= yMax);
  const cycles = Array.from(new Set(pts.map((e) => e.cycle)));
  const active = pts.find((e) => e.slug === hover);

  return (
    <figure className="rounded-xl border border-border-base bg-panel p-4">
      <figcaption className="mb-1">
        <p className="text-[14px] font-semibold text-fg">{t.engines.chartTitle}</p>
        <p className="mt-1 max-w-3xl text-[12px] leading-relaxed text-fg-muted">
          {t.engines.chartDesc}
        </p>
      </figcaption>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-3 h-auto w-full min-w-[560px] max-w-[820px]"
          role="img"
          aria-label={t.engines.chartTitle}
        >
          {/* 网格 */}
          {yTicks.map((v) => (
            <g key={`y${v}`}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={py(v)}
                y2={py(v)}
                stroke="var(--border)"
                strokeDasharray="3 4"
              />
              <text
                x={PAD.l - 8}
                y={py(v) + 4}
                textAnchor="end"
                className="fill-[var(--fg-subtle)] text-[10px]"
              >
                {v}
              </text>
            </g>
          ))}
          {xTicks.map((v) => (
            <g key={`x${v}`}>
              <line
                x1={px(v)}
                x2={px(v)}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="var(--border)"
                strokeDasharray="3 4"
              />
              <text
                x={px(v)}
                y={H - PAD.b + 16}
                textAnchor="middle"
                className="fill-[var(--fg-subtle)] text-[10px]"
              >
                {v}
              </text>
            </g>
          ))}

          {/* 轴标题 */}
          <text
            x={(W + PAD.l) / 2}
            y={H - 6}
            textAnchor="middle"
            className="fill-[var(--fg-muted)] text-[11px]"
          >
            {t.engines.chartX}
          </text>
          <text
            transform={`rotate(-90 14 ${H / 2})`}
            x={14}
            y={H / 2}
            textAnchor="middle"
            className="fill-[var(--fg-muted)] text-[11px]"
          >
            {t.engines.chartY}
          </text>

          {/* 点 */}
          {pts.map((e) => {
            const on = hover === e.slug;
            return (
              <g key={e.slug}>
                <circle
                  cx={px(e.chamberPressure!)}
                  cy={py(e.ispVacuum!)}
                  r={on ? 7 : 5}
                  fill={CYCLE_COLOR[e.cycle] ?? "#888"}
                  fillOpacity={hover && !on ? 0.25 : 0.9}
                  stroke="var(--panel)"
                  strokeWidth={1.5}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHover(e.slug)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onPick?.(e.slug)}
                />
                {on ? (
                  <text
                    x={px(e.chamberPressure!) + 10}
                    y={py(e.ispVacuum!) - 8}
                    className="fill-[var(--fg)] text-[11px] font-medium"
                  >
                    {e.name}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 图例 */}
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {cycles.map((c) => (
          <span key={c} className="flex items-center gap-1.5 text-[11px] text-fg-subtle">
            <span
              className="size-2 rounded-full"
              style={{ background: CYCLE_COLOR[c] ?? "#888" }}
              aria-hidden
            />
            {cycleLabel[c]}
          </span>
        ))}
      </div>

      <p
        className={cn(
          "mt-2 text-[11px] tabular",
          active ? "text-fg-muted" : "text-transparent select-none",
        )}
      >
        {active
          ? `${active.name} · ${active.chamberPressure} bar · ${active.ispVacuum} s · ${cycleLabel[active.cycle]}`
          : "—"}
      </p>
    </figure>
  );
}
