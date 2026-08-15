import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { L } from "@/components/ui/link";
import { Check, ChevronRight, Minus } from "lucide-react";
import { ENGINES, getEngine } from "@/data/engines-index";
import { getEngineDetail } from "@/data/engines";
import { getRocket } from "@/data/rockets";
import { Card, CardBody, CardHeader, CardTitle, SpecRow } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Silhouette } from "@/components/rocket/silhouette";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";
import { CYCLE_EXPLAIN, CYCLE_LABEL, PROPELLANT_LABEL, PROPELLANT_TRADEOFF } from "@/i18n/terms";
import { ANATOMY_COPY, type DiagramCycle } from "@/data/engine-anatomy";
import { CycleDiagram } from "@/components/engine/cycle-diagram";
import { force, meters, num, year } from "@/lib/utils";

export function generateStaticParams() {
  return ENGINES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/engine/[slug]">,
): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const e = getEngine(slug);
  if (!e) return { title: "404" };
  const en = lang === "en";
  const d = getEngineDetail(e.key, en ? "en" : "zh") ?? e.detail;
  return {
    title: en ? e.detail.displayEn : e.detail.displayZh,
    description: d.summary,
  };
}

export default async function EnginePage(props: PageProps<"/[lang]/engine/[slug]">) {
  const { slug } = await props.params;
  const lang = await getLang();
  const t = await getServerDict();
  const entry = getEngine(slug);
  if (!entry) notFound();

  const d = getEngineDetail(entry.key, lang) ?? entry.detail;
  const spec = entry.spec;
  const name = lang === "en" ? entry.detail.displayEn : entry.detail.displayZh;
  const country = lang === "en" ? entry.detail.country : entry.detail.countryZh;
  const cycleLabel = CYCLE_LABEL[lang][spec.cycle];
  const anatomy = ANATOMY_COPY[lang];
  // 固体与未公开循环没有泵系统流程图可画
  const diagramCycle: DiagramCycle | null =
    spec.cycle === "solid" || spec.cycle === "hybrid-unknown" ? null : spec.cycle;
  const propLabel = PROPELLANT_LABEL[lang][spec.propellant];

  // 装在哪些火箭上：带级名与台数
  const usedOn = entry.usage.map((u) => {
    const raw = getRocket(u.rocketSlug)!;
    const r = localizeRocket(raw, lang);
    return {
      slug: r.slug,
      rocketName: r.nameZh,
      stageName: r.stages[u.stageIndex]?.nameZh ?? "",
      count: u.count,
      height: r.height,
      firstFlight: r.firstFlight,
      geometry: r.geometry,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    category: "Rocket engine",
    description: d.summary,
    brand: { "@type": "Organization", name: d.maker ?? country },
    countryOfOrigin: country,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
        <nav
          aria-label={t.common.breadcrumb}
          className="flex items-center gap-1.5 text-[12px] text-fg-subtle"
        >
          <L href="/engines" className="hover:text-accent">
            {t.engines.breadcrumb}
          </L>
          <ChevronRight className="size-3" />
          <span className="text-fg-muted">{name}</span>
        </nav>

        <header className="mt-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[30px] font-semibold tracking-tight text-fg">{name}</h1>
            <Badge tone="data">{cycleLabel}</Badge>
            <Badge tone="neutral">
              <span
                className="size-1.5 rounded-full"
                style={{ background: propLabel.color }}
                aria-hidden
              />
              {propLabel.short}
            </Badge>
          </div>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[14px] text-fg-muted">
            <Flag country={country} withName />
            {d.maker ? (
              <>
                <span aria-hidden>·</span>
                <span>{d.maker}</span>
              </>
            ) : null}
            {d.since ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {t.engines.firstFlight} {d.since}
                </span>
              </>
            ) : null}
          </p>
          {d.summary ? (
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-fg">{d.summary}</p>
          ) : null}
        </header>

        {/* 关键参数 */}
        <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-base bg-border-base sm:grid-cols-4">
          <Quick label={t.engines.thrustLabel} value={force(spec.thrust)} />
          <Quick
            label={t.spec.ispVac}
            value={spec.ispVacuum ? `${spec.ispVacuum} s` : t.common.na}
          />
          <Quick
            label={t.spec.chamberPressure}
            value={d.chamberPressure ? `${d.chamberPressure} bar` : t.common.na}
          />
          <Quick label={t.engines.vehicleCount} value={String(entry.rockets.length)} />
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            {/* 换来了什么 / 代价是什么 */}
            {d.pros?.length ? (
              <section>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--ok)]">
                  {t.detail.pros}
                </h2>
                <ul className="mt-3 space-y-2">
                  {d.pros.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[14px] leading-relaxed text-fg-muted">
                      <Check className="mt-1 size-3.5 shrink-0 text-[var(--ok)]" />
                      <Inline text={x} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {d.cons?.length ? (
              <section>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--warn)]">
                  {t.detail.cons}
                </h2>
                <ul className="mt-3 space-y-2">
                  {d.cons.map((x) => (
                    <li key={x} className="flex gap-2.5 text-[14px] leading-relaxed text-fg-muted">
                      <Minus className="mt-1 size-3.5 shrink-0 text-[var(--warn)]" />
                      <Inline text={x} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {/* 循环与推进剂解释 */}
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border-base bg-bg-sunken p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                  {t.engines.cycleSection}
                </p>
                <p className="mt-1.5 text-[14px] font-medium text-fg">{cycleLabel}</p>
                {diagramCycle ? (
                  <div className="mt-2.5 rounded-lg border border-border-base bg-panel p-2">
                    <CycleDiagram cycle={diagramCycle} labels={anatomy.nodes} />
                  </div>
                ) : null}
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                  {CYCLE_EXPLAIN[lang][spec.cycle]}
                </p>
                <L
                  href="/engines/anatomy"
                  className="mt-2.5 inline-block text-[12px] text-accent hover:underline"
                >
                  {t.engines.howItWorksCta} →
                </L>
              </div>
              <div className="rounded-xl border border-border-base bg-bg-sunken p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                  {t.engines.propellantSection}
                </p>
                <p className="mt-1.5 text-[14px] font-medium text-fg">{propLabel.label}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                  {PROPELLANT_TRADEOFF[lang][spec.propellant]}
                </p>
              </div>
            </section>

            {/* 装在哪些火箭上 */}
            <section>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                {t.engines.relatedRockets}
              </h2>
              <div className="mt-4 space-y-3">
                {usedOn.map((u) => (
                  <L
                    key={`${u.slug}-${u.stageName}`}
                    href={`/rocket/${u.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-border-base bg-panel p-4 transition-colors hover:border-accent"
                  >
                    <div className="grid h-20 w-14 shrink-0 place-items-center">
                      <Silhouette
                        geometry={u.geometry}
                        mode="outline"
                        className="h-20 w-auto text-fg-subtle group-hover:text-accent"
                        title={u.rocketName}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-fg group-hover:text-accent">
                        {u.rocketName}
                        <span className="ml-2 text-[11px] font-normal text-fg-subtle">
                          {year(u.firstFlight)} · {meters(u.height)}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[12px] text-fg-muted">
                        {u.stageName} · ×{u.count}
                      </p>
                    </div>
                  </L>
                ))}
              </div>
            </section>
          </div>

          {/* 侧栏：完整参数 */}
          <aside>
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardHeader>
                  <CardTitle>{t.detail.tabs.specs}</CardTitle>
                </CardHeader>
                <CardBody>
                  <dl>
                    <SpecRow label={t.engines.thrustLabel} value={force(spec.thrust)} />
                    {spec.thrustSeaLevel ? (
                      <SpecRow label={t.spec.thrustSL} value={force(spec.thrustSeaLevel)} />
                    ) : null}
                    {spec.thrustVacuum ? (
                      <SpecRow label={t.spec.thrustVac} value={force(spec.thrustVacuum)} />
                    ) : null}
                    {spec.ispSeaLevel ? (
                      <SpecRow label={t.spec.ispSL} value={`${spec.ispSeaLevel} s`} />
                    ) : null}
                    {spec.ispVacuum ? (
                      <SpecRow label={t.spec.ispVac} value={`${spec.ispVacuum} s`} />
                    ) : null}
                    {d.chamberPressure ? (
                      <SpecRow
                        label={t.spec.chamberPressure}
                        value={`${d.chamberPressure} bar`}
                        sub={t.spec.chamberPressureNote}
                      />
                    ) : null}
                    {spec.ispSeaLevel && spec.ispVacuum ? (
                      <SpecRow
                        label="Isp Δ"
                        value={`+${num(spec.ispVacuum - spec.ispSeaLevel)} s`}
                        sub={lang === "en" ? "vacuum vs sea level" : "真空相对海平面"}
                      />
                    ) : null}
                  </dl>
                </CardBody>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{t.engines.propellantSection}</CardTitle>
                </CardHeader>
                <CardBody>
                  <dl>
                    <SpecRow label={t.detail.fuel} value={d.fuel} />
                    <SpecRow label={t.detail.oxidizer} value={d.oxidizer} />
                    {d.mixtureRatio ? (
                      <SpecRow label={t.detail.mixtureRatio} value={d.mixtureRatio} />
                    ) : null}
                    {d.maker ? <SpecRow label={t.engines.maker} value={d.maker} /> : null}
                    {d.since ? <SpecRow label={t.engines.since} value={String(d.since)} /> : null}
                  </dl>
                </CardBody>
              </Card>

              <L
                href="/engines"
                className="mt-4 inline-block text-[13px] text-accent hover:underline"
              >
                ← {t.engines.backToList}
              </L>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Quick({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-3.5 py-3">
      <dt className="truncate text-[10px] uppercase tracking-[0.1em] text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium text-fg tabular">{value}</dd>
    </div>
  );
}

/** 只处理 **加粗** */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}
