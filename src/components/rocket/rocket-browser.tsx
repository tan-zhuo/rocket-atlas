"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutGrid, Table2, SlidersHorizontal, X, Search } from "lucide-react";
import type { RocketSummary } from "@/lib/summary";
import type { RocketStatus } from "@/data/types";
import {
  EMPTY_FILTERS,
  PROPELLANT_META,
  SORT_META,
  activeFilterCount,
  applyFilters,
  toggle,
  type FilterOptions,
  type FilterState,
  type SortKey,
} from "@/lib/filters";
import { STATUS_META, StatusBadge } from "@/components/ui/badge";
import { RocketCard } from "./rocket-card";
import { CompareToggle } from "./compare-toggle";
import { cn, mass as fmtMass, meters, year } from "@/lib/utils";

const STATUS_ORDER: RocketStatus[] = ["active", "development", "retired", "cancelled"];

export function RocketBrowser({
  rockets,
  options,
  initialQuery = "",
}: {
  rockets: RocketSummary[];
  options: FilterOptions;
  initialQuery?: string;
}) {
  const [filters, setFilters] = React.useState<FilterState>({
    ...EMPTY_FILTERS,
    q: initialQuery,
  });
  const [view, setView] = React.useState<"cards" | "table">("cards");
  const [panelOpen, setPanelOpen] = React.useState(false);

  const results = React.useMemo(() => applyFilters(rockets, filters), [rockets, filters]);
  const activeCount = activeFilterCount(filters);

  function patch(p: Partial<FilterState>) {
    setFilters((f) => ({ ...f, ...p }));
  }

  return (
    <div className="lg:grid lg:grid-cols-[236px_1fr] lg:gap-8">
      {/* 筛选栏 */}
      <aside
        className={cn(
          "lg:sticky lg:top-20 lg:block lg:h-fit",
          panelOpen ? "block" : "hidden",
        )}
      >
        <div className="rounded-xl border border-border-base bg-panel p-4 lg:border-0 lg:bg-transparent lg:p-0">
          <div className="flex items-center justify-between lg:hidden">
            <p className="text-sm font-medium text-fg">筛选</p>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="收起筛选"
              className="text-fg-subtle"
            >
              <X className="size-4" />
            </button>
          </div>

          <FilterGroup title="国家 / 地区">
            {options.countries.map((c) => (
              <Chip
                key={c}
                on={filters.countries.includes(c)}
                onClick={() => patch({ countries: toggle(filters.countries, c) })}
              >
                {c}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="状态">
            {STATUS_ORDER.filter((s) => rockets.some((r) => r.status === s)).map((s) => (
              <Chip
                key={s}
                on={filters.status.includes(s)}
                onClick={() => patch({ status: toggle(filters.status, s) })}
              >
                {STATUS_META[s].label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="推进剂">
            {options.propellants.map((p) => (
              <Chip
                key={p}
                on={filters.propellants.includes(p)}
                onClick={() => patch({ propellants: toggle(filters.propellants, p) })}
              >
                <span
                  className="mr-1.5 inline-block size-1.5 rounded-full align-middle"
                  style={{ background: PROPELLANT_META[p].color }}
                  aria-hidden
                />
                {PROPELLANT_META[p].short}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="级数">
            {options.stageCounts.map((n) => (
              <Chip
                key={n}
                on={filters.stageCounts.includes(n)}
                onClick={() => patch({ stageCounts: toggle(filters.stageCounts, n) })}
              >
                {n} 级
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="首飞年代">
            {options.decades.map((d) => (
              <Chip
                key={d}
                on={filters.decades.includes(d)}
                onClick={() => patch({ decades: toggle(filters.decades, d) })}
              >
                {d}s
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup title="特性">
            <Chip
              on={filters.reusableOnly}
              onClick={() => patch({ reusableOnly: !filters.reusableOnly })}
            >
              可回收
            </Chip>
            <Chip
              on={filters.humanRatedOnly}
              onClick={() => patch({ humanRatedOnly: !filters.humanRatedOnly })}
            >
              载人
            </Chip>
          </FilterGroup>

          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => setFilters({ ...EMPTY_FILTERS, q: filters.q })}
              className="mt-5 text-[12px] text-accent hover:underline"
            >
              清除全部筛选（{activeCount}）
            </button>
          ) : null}
        </div>
      </aside>

      {/* 结果区 */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-fg-subtle" />
            <input
              value={filters.q}
              onChange={(e) => patch({ q: e.target.value })}
              placeholder="搜索名称、国家、发动机、标签…"
              aria-label="搜索火箭"
              className="h-9 w-full rounded-md border border-border-base bg-bg-elevated pl-9 pr-3 text-[13px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-accent"
            />
          </div>

          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            className="flex h-9 items-center gap-2 rounded-md border border-border-base px-3 text-[13px] text-fg-muted lg:hidden"
          >
            <SlidersHorizontal className="size-3.5" />
            筛选
            {activeCount ? (
              <span className="rounded-full bg-accent px-1.5 text-[10px] text-accent-fg tabular">
                {activeCount}
              </span>
            ) : null}
          </button>

          <select
            value={filters.sort}
            onChange={(e) => patch({ sort: e.target.value as SortKey })}
            aria-label="排序方式"
            className="h-9 rounded-md border border-border-base bg-bg-elevated px-2.5 text-[13px] text-fg-muted outline-none focus:border-accent"
          >
            {(Object.keys(SORT_META) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                按{SORT_META[k]}
              </option>
            ))}
          </select>

          <div className="flex h-9 items-center rounded-md border border-border-base p-0.5">
            <ViewBtn on={view === "cards"} onClick={() => setView("cards")} label="卡片视图">
              <LayoutGrid className="size-3.5" />
            </ViewBtn>
            <ViewBtn on={view === "table"} onClick={() => setView("table")} label="表格视图">
              <Table2 className="size-3.5" />
            </ViewBtn>
          </div>
        </div>

        <p className="mt-3 text-[12px] text-fg-subtle tabular">
          {results.length} / {rockets.length} 个型号
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border-base py-16 text-center">
            <p className="text-sm text-fg-muted">没有符合条件的火箭</p>
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="mt-2 text-[13px] text-accent hover:underline"
            >
              重置筛选条件
            </button>
          </div>
        ) : view === "cards" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <RocketCard key={r.slug} r={r} />
            ))}
          </div>
        ) : (
          <ResultTable rows={results} />
        )}
      </div>
    </div>
  );
}

function ResultTable({ rows }: { rows: RocketSummary[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-border-base">
      <table className="w-full min-w-[760px] border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border-base bg-bg-sunken text-left text-[11px] uppercase tracking-wider text-fg-subtle">
            <th className="px-3 py-2.5 font-medium">型号</th>
            <th className="px-3 py-2.5 font-medium">国家</th>
            <th className="px-3 py-2.5 font-medium">状态</th>
            <th className="px-3 py-2.5 text-right font-medium">首飞</th>
            <th className="px-3 py-2.5 text-right font-medium">高度</th>
            <th className="px-3 py-2.5 text-right font-medium">起飞质量</th>
            <th className="px-3 py-2.5 text-right font-medium">LEO 载荷</th>
            <th className="px-3 py-2.5 text-right font-medium">级数</th>
            <th className="w-10 px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.slug} className="border-b border-border-base/70 last:border-0 hover:bg-bg-elevated">
              <td className="px-3 py-2.5">
                <Link href={`/rocket/${r.slug}`} className="font-medium text-fg hover:text-accent">
                  {r.nameZh}
                </Link>
                <span className="ml-2 text-[11px] text-fg-subtle">{r.name}</span>
              </td>
              <td className="px-3 py-2.5 text-fg-muted">{r.countryZh}</td>
              <td className="px-3 py-2.5">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-3 py-2.5 text-right text-fg-muted tabular">
                {year(r.firstFlight)}
              </td>
              <td className="px-3 py-2.5 text-right text-fg-muted tabular">{meters(r.height)}</td>
              <td className="px-3 py-2.5 text-right text-fg-muted tabular">{fmtMass(r.mass)}</td>
              <td className="px-3 py-2.5 text-right text-fg tabular">
                {r.payloadLEO ? fmtMass(r.payloadLEO) : "—"}
              </td>
              <td className="px-3 py-2.5 text-right text-fg-muted tabular">{r.stageCount}</td>
              <td className="px-3 py-2.5">
                <CompareToggle slug={r.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cn(
        "rounded-md border px-2 py-1 text-[12px] transition-colors",
        on
          ? "border-accent/45 bg-accent-soft text-accent"
          : "border-border-base text-fg-muted hover:border-border-strong hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function ViewBtn({
  on,
  onClick,
  label,
  children,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded",
        on ? "bg-bg-elevated text-fg" : "text-fg-subtle hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}
