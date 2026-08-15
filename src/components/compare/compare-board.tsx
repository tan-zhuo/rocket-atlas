"use client";

import { L } from "@/components/ui/link";
import * as React from "react";
import { Plus, X, RotateCcw } from "lucide-react";
import type { RocketSummary } from "@/lib/summary";
import { MAX_COMPARE, useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/client-hooks";
import { Silhouette } from "@/components/rocket/silhouette";
import { StatusBadge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Check } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { PROPELLANT_LABEL } from "@/i18n/terms";
import type { Dict } from "@/i18n/dict";
import { cn, force, mass, meters, num, year } from "@/lib/utils";

const SERIES_COLOR = ["#ff7a2f", "#4fd1ff", "#5fd68a", "#c792ea"];

interface Metric {
  key: string;
  label: string;
  unit: string;
  get: (r: RocketSummary) => number | undefined;
  fmt: (v: number) => string;
  /** 说明这个指标为什么值得看 */
  note?: string;
}

function buildMetrics(t: Dict): Metric[] {
  return [
    { key: "height", label: t.spec.height, unit: "m", get: (r) => r.height, fmt: (v) => meters(v) },
    {
      key: "diameter",
      label: t.spec.diameter,
      unit: "m",
      get: (r) => r.diameter,
      fmt: (v) => meters(v),
    },
    { key: "mass", label: t.spec.mass, unit: "kg", get: (r) => r.mass, fmt: (v) => mass(v) },
    {
      key: "thrust",
      label: t.spec.liftoffThrust,
      unit: "kN",
      get: (r) => r.liftoffThrust || undefined,
      fmt: (v) => force(v),
    },
    {
      key: "twr",
      label: t.spec.twr,
      unit: "",
      get: (r) => (r.liftoffThrust ? (r.liftoffThrust * 1000) / (r.mass * 9.81) : undefined),
      fmt: (v) => num(v, 2),
      note: t.spec.twrNote,
    },
    {
      key: "leo",
      label: t.spec.payloadLEO,
      unit: "kg",
      get: (r) => r.payloadLEO,
      fmt: (v) => mass(v),
    },
    {
      key: "gto",
      label: t.spec.payloadGTO,
      unit: "kg",
      get: (r) => r.payloadGTO,
      fmt: (v) => mass(v),
    },
    {
      key: "ratio",
      label: t.spec.payloadRatio,
      unit: "%",
      get: (r) => (r.payloadLEO ? (r.payloadLEO / r.mass) * 100 : undefined),
      fmt: (v) => `${num(v, 2)}%`,
      note: t.spec.payloadRatioNote,
    },
    {
      key: "success",
      label: t.spec.successRate,
      unit: "%",
      get: (r) =>
        r.launches && r.launches.total ? (r.launches.success / r.launches.total) * 100 : undefined,
      fmt: (v) => `${num(v, 1)}%`,
    },
  ];
}

export function CompareBoard({ rockets }: { rockets: RocketSummary[] }) {
  const slugs = useCompare((s) => s.slugs);
  const removeSlug = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const setSlugs = useCompare((s) => s.set);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const mounted = useHydrated();
  const { t, lang } = useI18n();
  const P = PROPELLANT_LABEL[lang];
  const METRICS = React.useMemo(() => buildMetrics(t), [t]);

  const byId = React.useMemo(
    () => new Map(rockets.map((r) => [r.slug, r])),
    [rockets],
  );
  const selected = mounted
    ? slugs.map((s) => byId.get(s)).filter((r): r is RocketSummary => Boolean(r))
    : [];

  if (!mounted) {
    return <div className="h-72 animate-pulse rounded-xl border border-border-base bg-panel" />;
  }

  if (selected.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-base py-16 text-center">
        <p className="text-sm text-fg-muted">{t.compare.empty}</p>
        <p className="mx-auto mt-2 max-w-md text-[13px] text-fg-subtle">
{t.compare.emptyHint}
        </p>
        <div className="mt-5">
          <PresetButtons onPick={setSlugs} />
        </div>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="mt-5 inline-flex h-9 items-center gap-2 rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          <Plus className="size-3.5" />
          {t.compare.pick}
        </button>
        {pickerOpen ? (
          <Picker rockets={rockets} selected={slugs} onClose={() => setPickerOpen(false)} />
        ) : null}
      </div>
    );
  }

  const maxHeight = Math.max(...selected.map((r) => r.geometry.totalHeight));
  const pxPerMeter = 300 / maxHeight;

  return (
    <div>
      {/* 已选列表 */}
      <div className="flex flex-wrap items-center gap-2">
        {selected.map((r, i) => (
          <span
            key={r.slug}
            className="flex items-center gap-2 rounded-md border border-border-base bg-panel py-1 pl-2.5 pr-1.5 text-[13px]"
          >
            <span
              className="size-2 rounded-full"
              style={{ background: SERIES_COLOR[i] }}
              aria-hidden
            />
            {r.nameZh}
            <button
              type="button"
              onClick={() => removeSlug(r.slug)}
              aria-label={t.compare.remove(r.nameZh)}
              className="text-fg-subtle hover:text-danger"
            >
              <X className="size-3.5" />
            </button>
          </span>
        ))}
        {selected.length < MAX_COMPARE ? (
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-border-strong px-2.5 text-[13px] text-fg-muted hover:border-accent hover:text-accent"
          >
            <Plus className="size-3.5" />
            {t.common.add}
          </button>
        ) : null}
        <button
          type="button"
          onClick={clear}
          className="ml-auto flex h-8 items-center gap-1.5 px-2 text-[12px] text-fg-subtle hover:text-fg"
        >
          <RotateCcw className="size-3" />
          {t.common.clear}
        </button>
      </div>

      {pickerOpen ? (
        <Picker rockets={rockets} selected={slugs} onClose={() => setPickerOpen(false)} />
      ) : null}

      {/* 等比剪影 */}
      <section className="mt-8">
        <SectionTitle
          title={t.compare.scaleTitle}
          desc={t.compare.scaleDesc}
        />
        <div className="mt-5 overflow-x-auto rounded-xl border border-border-base bg-bg-sunken p-6">
          <div className="flex min-h-[320px] items-end justify-around gap-8">
            {selected.map((r, i) => (
              <div
                key={r.slug}
                className="flex shrink-0 flex-col items-center"
                style={{ color: SERIES_COLOR[i] }}
              >
                <Silhouette
                  geometry={r.geometry}
                  scale={pxPerMeter}
                  mode="outline"
                  title={`${r.nameZh} ${meters(r.height)}`}
                />
                <p
                  className="mt-3 whitespace-nowrap text-[13px] font-medium"
                  style={{ color: SERIES_COLOR[i] }}
                >
                  {r.nameZh}
                </p>
                <p className="whitespace-nowrap text-[11px] text-fg-subtle tabular">
                  {meters(r.height)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 指标条形对比 */}
      <section className="mt-10">
        <SectionTitle
          title={t.compare.metricsTitle}
          desc={t.compare.metricsDesc}
        />
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {METRICS.map((m) => {
            const values = selected.map((r) => m.get(r));
            const max = Math.max(...values.map((v) => v ?? 0));
            if (max <= 0) return null;
            return (
              <div key={m.key} className="rounded-xl border border-border-base bg-panel p-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[13px] font-medium text-fg">{m.label}</p>
                  {m.note ? (
                    <p className="text-[10px] text-fg-subtle">{m.note}</p>
                  ) : null}
                </div>
                <div className="mt-3 space-y-2">
                  {selected.map((r, i) => {
                    const v = m.get(r);
                    return (
                      <div key={r.slug} className="flex items-center gap-2">
                        <span className="w-20 shrink-0 truncate text-[11px] text-fg-muted">
                          {r.nameZh}
                        </span>
                        <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-bg-sunken">
                          <span
                            className="block h-full rounded-full transition-[width] duration-500"
                            style={{
                              width: v ? `${Math.max((v / max) * 100, 2)}%` : "0%",
                              background: SERIES_COLOR[i],
                            }}
                          />
                        </span>
                        <span className="w-16 shrink-0 text-right text-[11px] text-fg tabular">
                          {v === undefined ? "—" : m.fmt(v)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 参数表 */}
      <section className="mt-10">
        <SectionTitle title={t.compare.tableTitle} />
        <div className="mt-5 overflow-x-auto rounded-xl border border-border-base">
          <table className="w-full min-w-[640px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-border-base bg-bg-sunken">
                <th className="w-36 px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-fg-subtle" />
                {selected.map((r, i) => (
                  <th key={r.slug} className="px-4 py-3 text-left">
                    <L
                      href={`/rocket/${r.slug}`}
                      className="font-medium hover:underline"
                      style={{ color: SERIES_COLOR[i] }}
                    >
                      {r.nameZh}
                    </L>
                    <span className="mt-1 block text-[11px] font-normal text-fg-subtle">
                      {r.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <Row
                label={t.spec.country}
                cells={selected.map((r) => (
                  <Flag key={r.slug} country={r.countryZh} withName />
                ))}
              />
              <Row
                label="状态"
                cells={selected.map((r) => <StatusBadge key={r.slug} status={r.status} />)}
              />
              <Row label={t.spec.firstFlight} cells={selected.map((r) => year(r.firstFlight))} />
              <Row
                label={t.spec.stageCount}
                cells={selected.map((r) => `${r.stageCount}`)}
              />
              <Row
                label={t.list.propellant}
                cells={selected.map((r) => (
                  <span key={r.slug} className="flex flex-wrap gap-1">
                    {r.propellants.map((p) => (
                      <span
                        key={p}
                        className="rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted"
                      >
                        {P[p].short}
                      </span>
                    ))}
                  </span>
                ))}
              />
              <Row
                label={t.spec.reusable}
                cells={selected.map((r) => (r.reusable ? t.spec.yes : t.spec.no))}
              />
              <Row
                label={t.spec.humanRated}
                cells={selected.map((r) => (r.humanRated ? t.spec.yes : t.spec.no))}
              />
              <Row
                label={t.spec.launches}
                cells={selected.map((r) => (r.launches ? num(r.launches.total) : t.common.na))}
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* 设计哲学并置 */}
      <section className="mt-10">
        <SectionTitle
          title={t.compare.philosophyTitle}
          desc={t.compare.philosophyDesc}
        />
        <div
          className={cn(
            "mt-5 grid gap-4",
            selected.length >= 3 ? "lg:grid-cols-3" : "sm:grid-cols-2",
          )}
        >
          {selected.map((r, i) => (
            <article
              key={r.slug}
              className="rounded-xl border border-border-base bg-panel p-5"
              style={{ borderTopColor: SERIES_COLOR[i], borderTopWidth: 2 }}
            >
              <h3 className="text-[15px] font-semibold text-fg">{r.nameZh}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">{r.designLead}</p>
              <L
                href={`/rocket/${r.slug}#design`}
                className="mt-4 inline-block text-[12px] text-accent hover:underline"
              >
                {t.compare.fullDesign}
              </L>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ label, cells }: { label: string; cells: React.ReactNode[] }) {
  return (
    <tr className="border-b border-border-base/70 last:border-0">
      <th className="px-4 py-2.5 text-left text-[12px] font-normal text-fg-subtle">{label}</th>
      {cells.map((c, i) => (
        <td key={i} className="px-4 py-2.5 text-fg tabular">
          {c}
        </td>
      ))}
    </tr>
  );
}

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold tracking-tight text-fg">{title}</h2>
      {desc ? <p className="mt-1 text-[13px] text-fg-muted">{desc}</p> : null}
    </div>
  );
}

const PRESETS: { label: Record<"zh" | "en", string>; slugs: string[] }[] = [
  {
    label: { zh: "三代重型对比", en: "Three generations of heavy lift" },
    slugs: ["saturn-v", "delta-iv-heavy", "starship"],
  },
  {
    label: { zh: "可回收 vs 一次性", en: "Reusable vs expendable" },
    slugs: ["falcon-9", "ariane-5", "vulcan-centaur"],
  },
  {
    label: { zh: "中国现役", en: "China, in service" },
    slugs: ["long-march-5", "long-march-2f", "zhuque-2"],
  },
  {
    label: { zh: "载人火箭", en: "Human-rated vehicles" },
    slugs: ["saturn-v", "soyuz-2", "long-march-2f", "falcon-9"],
  },
];

function PresetButtons({ onPick }: { onPick: (slugs: string[]) => void }) {
  const { lang } = useI18n();
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.label.en}
          type="button"
          onClick={() => onPick(p.slugs)}
          className="rounded-md border border-border-base bg-panel px-3 py-1.5 text-[12px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
        >
          {p.label[lang]}
        </button>
      ))}
    </div>
  );
}

function Picker({
  rockets,
  selected,
  onClose,
}: {
  rockets: RocketSummary[];
  selected: string[];
  onClose: () => void;
}) {
  const toggle = useCompare((s) => s.toggle);
  const { t } = useI18n();
  const [q, setQ] = React.useState("");
  const list = rockets.filter(
    (r) =>
      !q ||
      `${r.nameZh}${r.name}${r.countryZh}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="选择火箭"
        className="w-full max-w-md overflow-hidden rounded-xl border border-border-strong bg-panel shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border-base px-4">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.compare.searchPlaceholder}
            className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
          />
          <button type="button" onClick={onClose} aria-label={t.common.close} className="text-fg-subtle">
            <X className="size-4" />
          </button>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto py-1">
          {list.map((r) => {
            const on = selected.includes(r.slug);
            const full = !on && selected.length >= MAX_COMPARE;
            return (
              <li key={r.slug}>
                <button
                  type="button"
                  disabled={full}
                  onClick={() => toggle(r.slug)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm disabled:opacity-40",
                    on ? "bg-accent-soft" : "hover:bg-bg-elevated",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded border",
                      on ? "border-accent bg-accent text-accent-fg" : "border-border-strong",
                    )}
                  >
                    {on ? <Check className="size-3" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-fg">{r.nameZh}</span>
                    <span className="block truncate text-[11px] text-fg-subtle">
                      {r.name} · {r.countryZh} · {year(r.firstFlight)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border-base px-4 py-2.5 text-[11px] text-fg-subtle">
          {t.compare.selected(selected.length, MAX_COMPARE)}
        </div>
      </div>
    </div>
  );
}
