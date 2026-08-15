"use client";

import { L } from "@/components/ui/link";
import * as React from "react";
import type { RocketGeometry } from "@/data/types";
import { ViewerMount } from "./viewer-mount";
import { Silhouette } from "@/components/rocket/silhouette";
import { cn, meters } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

export interface LabEntry {
  slug: string;
  nameZh: string;
  name: string;
  countryZh: string;
  height: number;
  geometry: RocketGeometry;
}

export function LabClient({ entries }: { entries: LabEntry[] }) {
  const { t } = useI18n();
  const [active, setActive] = React.useState(entries[0]?.slug);
  const current = entries.find((e) => e.slug === active) ?? entries[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-20 lg:h-fit">
        <p className="flex items-baseline justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          {t.lab.pick}
          <span className="tabular font-normal tracking-normal">{entries.length}</span>
        </p>
        {/* 小屏横向滑动、隐藏滚动条；大屏是一列独立滚动的长列表——
            型号已经三十多个，不能再逼着人滚整页去够底下那几个。 */}
        <div
          className={cn(
            "hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2",
            "lg:thin-scrollbar lg:max-h-[calc(100dvh-9rem)] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0 lg:pr-1.5",
          )}
        >
          {entries.map((e) => (
            <button
              key={e.slug}
              type="button"
              onClick={() => setActive(e.slug)}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors lg:w-full",
                e.slug === current.slug
                  ? "border-accent bg-accent-soft"
                  : "border-border-base bg-panel hover:border-border-strong",
              )}
            >
              <Silhouette
                geometry={e.geometry}
                mode="outline"
                className={cn(
                  "h-9 w-6 shrink-0",
                  e.slug === current.slug ? "text-accent" : "text-fg-subtle",
                )}
                title={e.nameZh}
              />
              <span className="min-w-0">
                <span
                  className={cn(
                    "block whitespace-nowrap text-[13px] font-medium lg:truncate",
                    e.slug === current.slug ? "text-accent" : "text-fg",
                  )}
                >
                  {e.nameZh}
                </span>
                <span className="block whitespace-nowrap text-[10px] text-fg-subtle tabular lg:truncate">
                  {e.countryZh} · {meters(e.height)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        <ViewerMount
          key={current.slug}
          geometry={current.geometry}
          name={current.nameZh}
          className="h-[70vh] min-h-[520px]"
        />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <h2 className="text-[18px] font-semibold text-fg">{current.nameZh}</h2>
            <p className="text-[12px] text-fg-subtle">{current.name}</p>
          </div>
          <L
            href={`/rocket/${current.slug}`}
            className="text-[13px] text-accent hover:underline"
          >
            {t.lab.fullPage}
          </L>
        </div>
        <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-fg-subtle">
          {current.geometry.modelNote}
        </p>
      </div>
    </div>
  );
}
