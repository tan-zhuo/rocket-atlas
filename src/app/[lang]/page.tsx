import { L } from "@/components/ui/link";
import { ArrowRight, Boxes, Layers, Telescope } from "lucide-react";
import { ROCKETS, FEATURED_SLUGS, getRockets, atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { TIMELINE_SORTED, TIMELINE_KIND_META } from "@/data/timeline";
import { toSummary } from "@/lib/summary";
import { RocketCard } from "@/components/rocket/rocket-card";
import { Silhouette } from "@/components/rocket/silhouette";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { HeroMount } from "@/components/viewer/hero-mount";
import { dateZh, mass, meters, num } from "@/lib/utils";
import { getLang, getServerDict } from "@/i18n/server";
import { localizePrinciple, localizeRocket, localizeTimeline } from "@/i18n/localize";

const SCALE_ROW = ["v-2", "electron", "falcon-9", "long-march-5", "saturn-v", "starship"];
const HERO_ROW = ["saturn-v", "starship", "falcon-9", "long-march-5", "ariane-5"];

export default async function Home() {
  const lang = await getLang();
  const t = await getServerDict();
  const stats = atlasStats();
  const featured = getRockets(FEATURED_SLUGS).map((r) => toSummary(localizeRocket(r, lang)));
  const scaleRockets = getRockets(SCALE_ROW).map((r) => localizeRocket(r, lang));
  const principles = PRINCIPLES.map((p) => localizePrinciple(p, lang));
  const countries = Array.from(
    new Set(ROCKETS.map((r) => localizeRocket(r, lang).countryZh)),
  );
  const tallest = Math.max(...scaleRockets.map((r) => r.height));
  const pxPerMeter = 250 / tallest;
  const recent = localizeTimeline([...TIMELINE_SORTED].reverse().slice(0, 6), lang);
  const heroItems = getRockets(HERO_ROW)
    .map((r) => localizeRocket(r, lang))
    .map((r) => ({
    slug: r.slug,
    nameZh: r.nameZh,
    name: r.name,
      height: r.height,
      mass: r.mass,
      geometry: r.geometry,
    }));

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border-base">
        <div className="grid-backdrop absolute inset-0 opacity-70" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(70% 55% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
            <div className="max-w-3xl">
            <h1 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl">
              {t.home.heroTitleA}
              <br className="hidden sm:block" />
              {t.home.heroTitleB}
              <span className="text-accent">{t.home.heroAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base">
              {t.home.heroLead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <L
                href="/rockets"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                {t.home.ctaExplore}
                <ArrowRight className="size-4" />
              </L>
              <L
                href="/compare"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 text-[14px] font-medium text-fg transition-colors hover:border-accent"
              >
                <Boxes className="size-4" />
                {t.home.ctaCompare}
              </L>
              <L
                href="/principles/staging-and-rocket-equation"
                className="inline-flex h-11 items-center gap-2 px-2 text-[14px] text-fg-muted transition-colors hover:text-accent"
              >
                <Telescope className="size-4" />
                {t.home.ctaPrinciples}
              </L>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              <HeroStat label={t.common.models} value={num(stats.rockets)} />
              <HeroStat label={t.spec.country} value={num(stats.countries)} />
              <HeroStat label={t.common.yearRange} value={`${stats.span.from}–${stats.span.to}`} />
              <HeroStat label={t.common.citations} value={num(stats.sources)} />
            </dl>
            </div>

            {/* 3D 展示位：与详情页查看器共用几何、材质与环境光照 */}
            <HeroMount items={heroItems} />
          </div>
        </div>
      </section>

      {/* ── 等比尺寸对比 ────────────────────────────────────── */}
      <section className="border-b border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
          <SectionHead
            eyebrow={t.home.scaleEyebrow}
            title={t.home.scaleTitle}
            desc={t.home.scaleDesc}
          />
          <div className="hide-scrollbar mt-8 flex items-end gap-8 overflow-x-auto pb-2">
            {scaleRockets.map((r) => (
              <L
                key={r.slug}
                href={`/rocket/${r.slug}`}
                className="group flex shrink-0 flex-col items-center"
              >
                <Silhouette
                  geometry={r.geometry}
                  scale={pxPerMeter}
                  className="text-fg-subtle transition-colors group-hover:text-accent"
                  mode="outline"
                  title={`${r.nameZh}（${meters(r.height)}）`}
                />
                <p className="mt-3 whitespace-nowrap text-[12px] font-medium text-fg group-hover:text-accent">
                  {r.nameZh}
                </p>
                <p className="whitespace-nowrap text-[11px] text-fg-subtle tabular">
                  {meters(r.height)} · {mass(r.mass)}
                </p>
              </L>
            ))}
          </div>
        </div>
      </section>

      {/* ── 精选火箭 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHead
            eyebrow={t.home.featuredEyebrow}
            title={t.home.featuredTitle}
            desc={t.home.featuredDesc}
          />
          <L
            href="/rockets"
            className="hidden shrink-0 items-center gap-1.5 text-[13px] text-fg-muted hover:text-accent sm:flex"
          >
            {t.home.featuredAll}
            <ArrowRight className="size-3.5" />
          </L>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((r) => (
            <RocketCard key={r.slug} r={r} />
          ))}
        </div>
      </section>

      {/* ── 知识分层 ────────────────────────────────────────── */}
      <section className="border-y border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <SectionHead
            eyebrow={t.home.methodEyebrow}
            title={t.home.methodTitle}
            desc={t.home.methodDesc}
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <LayerCard
              n="01"
              title={t.home.layer1}
              desc={t.home.layer1Desc}
              tag={t.home.layer1Tag}
            />
            <LayerCard
              n="02"
              title={t.home.layer2}
              desc={t.home.layer2Desc}
              tag={t.home.layer2Tag}
            />
            <LayerCard
              n="03"
              title={t.home.layer3}
              desc={t.home.layer3Desc}
              tag={t.home.layer3Tag}
              accent
            />
          </div>
        </div>
      </section>

      {/* ── 原理专题 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <SectionHead
          eyebrow={t.home.principlesEyebrow}
          title={t.home.principlesTitle}
          desc={t.home.principlesDesc}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {principles.map((p) => (
            <L
              key={p.slug}
              href={`/principles/${p.slug}`}
              className="group flex flex-col rounded-xl border border-border-base bg-panel p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-2 text-[11px] text-fg-subtle">
                <Layers className="size-3.5" />
                {p.readingMinutes} {t.common.minutes} · {p.examples.length} {t.common.cases}
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-fg group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-fg-muted">{p.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-accent">
                {t.common.readMore}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </L>
          ))}
        </div>
      </section>

      {/* ── 时间线摘要 ──────────────────────────────────────── */}
      <section className="border-t border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHead eyebrow={t.home.timelineEyebrow} title={t.home.timelineTitle} />
            <L
              href="/timeline"
              className="flex shrink-0 items-center gap-1.5 text-[13px] text-fg-muted hover:text-accent"
            >
              {t.home.timelineAll}
              <ArrowRight className="size-3.5" />
            </L>
          </div>
          <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-border-base">
            {recent.map((e) => {
              const meta = TIMELINE_KIND_META[e.kind];
              const inner = (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-panel px-4 py-3.5 transition-colors hover:bg-bg-elevated">
                  <span className="w-24 shrink-0 text-[12px] text-fg-subtle tabular">
                    {dateZh(e.date, lang)}
                  </span>
                  <Badge tone={meta.tone} className="shrink-0">
                    {t.timeline.kinds[e.kind]}
                  </Badge>
                  <span className="text-[14px] font-medium text-fg">{e.title}</span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-fg-muted">
                    {e.note}
                  </span>
                </div>
              );
              return (
                <li key={`${e.date}-${e.title}`}>
                  {e.rocket ? <L href={`/rocket/${e.rocket}`}>{inner}</L> : inner}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 快速入口 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <SectionHead eyebrow={t.home.quickEyebrow} title={t.home.quickTitle} />
        <div className="mt-6 flex flex-wrap gap-2">
          {countries.map((c) => (
            <QuickLink key={c} href="/rockets">
              <Flag country={c} flagClassName="h-2.5 w-[15px]" className="mr-1.5 align-middle" />
              {c}
            </QuickLink>
          ))}
          <QuickLink href="/rockets">{t.home.quickReusable}</QuickLink>
          <QuickLink href="/rockets">{t.home.quickHumanRated}</QuickLink>
          <QuickLink href="/compare">{t.home.quickSize}</QuickLink>
        </div>
      </section>
    </>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-fg tabular">{value}</dd>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-fg sm:text-[28px]">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{desc}</p> : null}
    </div>
  );
}

function LayerCard({
  n,
  title,
  desc,
  tag,
  accent,
}: {
  n: string;
  title: string;
  desc: string;
  tag: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-panel p-6 ${
        accent ? "border-accent/40" : "border-border-base"
      }`}
    >
      <span className="font-mono text-[11px] text-fg-subtle">{n}</span>
      <h3 className={`mt-2 text-lg font-semibold ${accent ? "text-accent" : "text-fg"}`}>
        {title}
      </h3>
      <p className="mt-2.5 text-[13px] leading-relaxed text-fg-muted">{desc}</p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.1em] text-fg-subtle">{tag}</p>
    </div>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <L
      href={href}
      className="rounded-md border border-border-base bg-panel px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </L>
  );
}
