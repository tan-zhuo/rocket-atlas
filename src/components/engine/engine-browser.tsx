"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { L } from "@/components/ui/link";
import { Flame } from "lucide-react";
import type { EngineSummary, EngineSortKey } from "@/lib/engine-summary";
import {
  EMPTY_ENGINE_FILTERS,
  applyEngineFilters,
  engineFilterOptions,
  type EngineFilters,
} from "@/lib/engine-summary";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";
import { CYCLE_LABEL, PROPELLANT_LABEL } from "@/i18n/terms";
import { Flag } from "@/components/ui/flag";
import { EngineChart } from "./engine-chart";
import { cn, force } from "@/lib/utils";

const SORTS: EngineSortKey[] = ["thrust", "isp", "pressure", "name"];

export function EngineBrowser({ engines }: { engines: EngineSummary[] }) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [filters, setFilters] = React.useState<EngineFilters>(EMPTY_ENGINE_FILTERS);

  const options = React.useMemo(() => engineFilterOptions(engines), [engines]);
  const results = React.useMemo(() => applyEngineFilters(engines, filters), [engines, filters]);
  const cycleLabel = CYCLE_LABEL[lang];
  const propLabel = PROPELLANT_LABEL[lang];

  function toggle<T>(list: T[], v: T): T[] {
    return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  }
  const sortLabel: Record<EngineSortKey, string> = {
    thrust: t.engines.sortThrust,
    isp: t.engines.sortIsp,
    pressure: t.engines.sortPressure,
    name: t.engines.sortName,
  };

  return (
    <div>
      <EngineChart engines={results} onPick={(slug) => router.push(localePath(lang, `/engine/${slug}`))} />

      {/* 筛选 */}
      <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-4">
        <Group title={t.engines.filterCycle}>
          {options.cycles.map((c) => (
            <Chip
              key={c}
              on={filters.cycles.includes(c)}
              onClick={() => setFilters((f) => ({ ...f, cycles: toggle(f.cycles, c) }))}
            >
              {cycleLabel[c]}
            </Chip>
          ))}
        </Group>

        <Group title={t.engines.filterPropellant}>
          {options.propellants.map((p) => (
            <Chip
              key={p}
              on={filters.propellants.includes(p)}
              onClick={() => setFilters((f) => ({ ...f, propellants: toggle(f.propellants, p) }))}
            >
              <span
                className="mr-1.5 inline-block size-1.5 rounded-full align-middle"
                style={{ background: propLabel[p].color }}
                aria-hidden
              />
              {propLabel[p].short}
            </Chip>
          ))}
        </Group>

        <Group title={t.engines.filterCountry}>
          {options.countries.map((c) => (
            <Chip
              key={c}
              on={filters.countries.includes(c)}
              onClick={() => setFilters((f) => ({ ...f, countries: toggle(f.countries, c) }))}
            >
              <Flag country={c} flagClassName="h-2.5 w-[15px]" className="mr-1.5 align-middle" />
              {c}
            </Chip>
          ))}
        </Group>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="text-[12px] text-fg-subtle tabular">
          {t.engines.count(results.length, engines.length)}
        </p>
        <select
          value={filters.sort}
          onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as EngineSortKey }))}
          aria-label={t.list.sortBy("")}
          className="ml-auto h-9 rounded-md border border-border-base bg-bg-elevated px-2.5 text-[13px] text-fg-muted outline-none focus:border-accent"
        >
          {SORTS.map((k) => (
            <option key={k} value={k}>
              {t.list.sortBy(sortLabel[k])}
            </option>
          ))}
        </select>
        {(filters.cycles.length || filters.propellants.length || filters.countries.length) > 0 ? (
          <button
            type="button"
            onClick={() => setFilters(EMPTY_ENGINE_FILTERS)}
            className="text-[12px] text-accent hover:underline"
          >
            {t.common.reset}
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-border-base py-16 text-center text-sm text-fg-muted">
          {t.engines.empty}
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((e) => (
            <EngineCard key={e.slug} e={e} />
          ))}
        </div>
      )}
    </div>
  );
}

function EngineCard({ e }: { e: EngineSummary }) {
  const { t, lang } = useI18n();
  const cycleLabel = CYCLE_LABEL[lang];
  const propLabel = PROPELLANT_LABEL[lang];

  return (
    <L
      href={`/engine/${e.slug}`}
      className="group flex flex-col rounded-xl border border-border-base bg-panel p-4 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-fg group-hover:text-accent">
            {e.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-fg-subtle">
            <Flag country={e.country} flagClassName="h-2.5 w-[15px]" />
            {e.maker ?? e.country}
            {e.since ? ` · ${e.since}` : ""}
          </p>
        </div>
        <span
          className="flex shrink-0 items-center gap-1 rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted"
          title={cycleLabel[e.cycle]}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: propLabel[e.propellant].color }}
            aria-hidden
          />
          {propLabel[e.propellant].short}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-fg-muted">{cycleLabel[e.cycle]}</p>

      {e.summary ? (
        <p className="mt-2.5 line-clamp-2 text-[12px] leading-relaxed text-fg-muted">{e.summary}</p>
      ) : null}

      <dl className="mt-3.5 grid grid-cols-3 gap-2 border-t border-border-base pt-3 text-center">
        <Stat label={t.engines.thrustLabel} value={force(e.thrust)} />
        <Stat label={t.spec.ispVac} value={e.ispVacuum ? `${e.ispVacuum} s` : t.common.na} />
        <Stat
          label={t.spec.chamberPressure}
          value={e.chamberPressure ? `${e.chamberPressure} bar` : t.common.na}
        />
      </dl>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-fg-subtle">
        <Flame className="size-3 shrink-0" />
        {t.engines.usedBy}: {e.rockets.map((r) => r.name).join(" / ")}
      </p>
    </L>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="truncate text-[10px] text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 text-[13px] text-fg tabular">{value}</dd>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
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
