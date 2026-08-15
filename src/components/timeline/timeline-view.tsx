"use client";

import { L } from "@/components/ui/link";
import * as React from "react";
import type { TimelineEvent } from "@/data/types";
import { TIMELINE_KIND_META } from "@/data/timeline";
import { useI18n } from "@/i18n/provider";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { cn, dateZh } from "@/lib/utils";

type Kind = TimelineEvent["kind"];

export function TimelineView({ events }: { events: TimelineEvent[] }) {
  const [kinds, setKinds] = React.useState<Kind[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const { t } = useI18n();

  const allCountries = React.useMemo(
    () => Array.from(new Set(events.map((e) => e.countryZh))).sort(),
    [events],
  );

  const filtered = events.filter(
    (e) =>
      (kinds.length === 0 || kinds.includes(e.kind)) &&
      (countries.length === 0 || countries.includes(e.countryZh)),
  );

  const decades = React.useMemo(() => {
    const map = new Map<number, TimelineEvent[]>();
    for (const e of filtered) {
      const d = Math.floor(Number(e.date.slice(0, 4)) / 10) * 10;
      if (!map.has(d)) map.set(d, []);
      map.get(d)!.push(e);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [filtered]);

  function toggleKind(k: Kind) {
    setKinds((v) => (v.includes(k) ? v.filter((x) => x !== k) : [...v, k]));
  }
  function toggleCountry(c: string) {
    setCountries((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 rounded-xl border border-border-base bg-panel p-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{t.timeline.eventType}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(Object.keys(TIMELINE_KIND_META) as Kind[]).map((k) => (
              <Chip key={k} on={kinds.includes(k)} onClick={() => toggleKind(k)}>
                {t.timeline.kinds[k]}
              </Chip>
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{t.timeline.country}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {allCountries.map((c) => (
              <Chip key={c} on={countries.includes(c)} onClick={() => toggleCountry(c)}>
                <Flag country={c} flagClassName="h-2.5 w-[15px]" className="mr-1.5 align-middle" />
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-fg-subtle tabular">
        {t.timeline.count(filtered.length, events.length)}
      </p>

      <div className="mt-8">
        {decades.map(([decade, list]) => (
          <section key={decade} className="relative">
            <div className="sticky top-16 z-10 -mx-1 bg-bg/90 px-1 py-2 backdrop-blur">
              <h2 className="text-[13px] font-semibold text-fg-subtle tabular">
                {decade}s
                <span className="ml-2 font-normal text-fg-subtle">
                  {t.timeline.eventsIn(list.length)}
                </span>
              </h2>
            </div>

            <ol className="ml-2 border-l border-border-strong pb-6">
              {list.map((e) => {
                const meta = TIMELINE_KIND_META[e.kind];
                const body = (
                  <div className="rounded-xl border border-border-base bg-panel p-4 transition-colors hover:border-accent">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-[12px] text-fg-subtle tabular">{dateZh(e.date)}</span>
                      <Badge tone={meta.tone}>{t.timeline.kinds[e.kind]}</Badge>
                      <span className="flex items-center gap-1.5 rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted">
                        <Flag country={e.countryZh} flagClassName="h-2.5 w-[15px]" />
                        {e.countryZh}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[15px] font-semibold text-fg">{e.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{e.note}</p>
                    {e.rocket ? (
                      <span className="mt-2.5 inline-block text-[12px] text-accent">
                        {t.timeline.viewRocket}
                      </span>
                    ) : null}
                  </div>
                );
                return (
                  <li key={`${e.date}-${e.title}`} className="relative mb-4 pl-6">
                    <span
                      className={cn(
                        "absolute -left-[5px] top-5 size-2.5 rounded-full border-2 border-bg",
                        e.kind === "loss"
                          ? "bg-[var(--danger)]"
                          : e.kind === "milestone"
                            ? "bg-accent"
                            : "bg-border-strong",
                      )}
                    />
                    {e.rocket ? <L href={`/rocket/${e.rocket}`}>{body}</L> : body}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
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
