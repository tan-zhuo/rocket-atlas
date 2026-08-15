"use client";

import { L } from "@/components/ui/link";
import { Users, Recycle } from "lucide-react";
import type { RocketSummary } from "@/lib/summary";
import { StatusBadge } from "@/components/ui/badge";
import { Silhouette } from "./silhouette";
import { CompareToggle } from "./compare-toggle";
import { Flag } from "@/components/ui/flag";
import { useI18n } from "@/i18n/provider";
import { PROPELLANT_LABEL } from "@/i18n/terms";
import { cn, mass as fmtMass, meters, year } from "@/lib/utils";

export function RocketCard({ r, className }: { r: RocketSummary; className?: string }) {
  const { t, lang } = useI18n();
  const P = PROPELLANT_LABEL[lang];
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border-base bg-panel transition-colors hover:border-border-strong",
        className,
      )}
    >
      <div className="absolute right-2.5 top-2.5 z-10">
        <CompareToggle slug={r.slug} />
      </div>

      <L href={`/rocket/${r.slug}`} className="flex flex-1 flex-col">
        <div
          className="relative flex h-44 items-end justify-center overflow-hidden px-6 pb-3 pt-6"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--viewer-bg-a) 82%, transparent), var(--panel))",
          }}
        >
          <Silhouette
            geometry={r.geometry}
            className="h-full w-auto max-w-[80%] opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
            title={r.nameZh}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-fg-subtle tabular">
            {meters(r.height)}
          </span>
        </div>

        <div className="flex flex-1 flex-col border-t border-border-base p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold text-fg group-hover:text-accent">
                {r.nameZh}
              </h3>
              <p className="truncate text-[11px] text-fg-subtle">{r.name}</p>
            </div>
            <StatusBadge status={r.status} className="shrink-0" />
          </div>

          <p className="mt-2.5 line-clamp-2 text-[12px] leading-relaxed text-fg-muted">
            {r.description}
          </p>

          <dl className="mt-3.5 grid grid-cols-3 gap-2 border-t border-border-base pt-3 text-center">
            <Stat label={t.spec.firstFlight} value={year(r.firstFlight)} />
            <Stat
              label={t.spec.payloadLEO}
              value={r.payloadLEO ? fmtMass(r.payloadLEO) : t.common.na}
            />
            <Stat label={t.spec.mass} value={fmtMass(r.mass)} />
          </dl>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1.5 rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted">
              <Flag country={r.countryZh} flagClassName="h-2.5 w-[15px]" />
              {r.countryZh}
            </span>
            {r.propellants.slice(0, 3).map((p) => (
              <span
                key={p}
                className="flex items-center gap-1 rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: P[p].color }}
                  aria-hidden
                />
                {P[p].short}
              </span>
            ))}
            {r.reusable ? (
              <span className="flex items-center gap-1 rounded border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-[10px] text-accent">
                <Recycle className="size-2.5" />
                {t.list.reusable}
              </span>
            ) : null}
            {r.humanRated ? (
              <span className="flex items-center gap-1 rounded border border-border-base px-1.5 py-0.5 text-[10px] text-fg-muted">
                <Users className="size-2.5" />
                {t.list.humanRated}
              </span>
            ) : null}
          </div>
        </div>
      </L>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 text-[13px] text-fg tabular">{value}</dd>
    </div>
  );
}
