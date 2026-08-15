import { L } from "@/components/ui/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ROCKETS, getRocket, getRockets } from "@/data/rockets";
import { getFamily } from "@/data/families";
import { StatusBadge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { Tabs } from "@/components/ui/tabs";
import { ViewerMount } from "@/components/viewer/viewer-mount";
import { CompareToggle } from "@/components/rocket/compare-toggle";
import {
  DesignTab,
  FamilyTab,
  LaunchesTab,
  OverviewTab,
  PropulsionTab,
  SourcesTab,
  SpecsTab,
} from "@/components/rocket/detail-sections";
import { dateZh, mass, meters, num } from "@/lib/utils";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeFamily, localizeRocket } from "@/i18n/localize";

export function generateStaticParams() {
  return ROCKETS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/rocket/[slug]">,
): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const raw = getRocket(slug);
  if (!raw) return { title: "404" };
  const r = localizeRocket(raw, lang === "en" ? "en" : "zh");
  return {
    title: `${r.nameZh} ${r.name}`,
    description: r.description,
    openGraph: {
      title: `${r.nameZh}（${r.name}）`,
      description: r.description,
      type: "article",
    },
  };
}

export default async function RocketPage(props: PageProps<"/[lang]/rocket/[slug]">) {
  const { slug } = await props.params;
  const lang = await getLang();
  const t = await getServerDict();
  const raw = getRocket(slug);
  if (!raw) notFound();

  const r = localizeRocket(raw, lang);
  const familyRaw = getFamily(r.family);
  const family = familyRaw ? localizeFamily(familyRaw, lang) : undefined;
  const related = getRockets(r.relatedRockets)
    .map((o) => localizeRocket(o, lang))
    .map((o) => ({
      slug: o.slug,
      nameZh: o.nameZh,
      name: o.name,
      description: o.description,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${r.name} / ${r.nameZh}`,
    description: r.description,
    category: "Launch vehicle",
    brand: { "@type": "Organization", name: r.agency[0] ?? r.countryZh },
    countryOfOrigin: r.countryZh,
    releaseDate: r.firstFlight,
    additionalProperty: [
      { "@type": "PropertyValue", name: "全长", value: `${r.height} m` },
      { "@type": "PropertyValue", name: "起飞质量", value: `${r.mass} kg` },
      { "@type": "PropertyValue", name: "级数", value: r.stageCount },
      ...(r.payloadLEO
        ? [{ "@type": "PropertyValue", name: "LEO 载荷", value: `${r.payloadLEO} kg` }]
        : []),
    ],
  };

  const tabs = [
    { id: "overview", label: t.detail.tabs.overview },
    { id: "design", label: t.detail.tabs.design, hint: `${r.tradeoffs.length}` },
    { id: "propulsion", label: t.detail.tabs.propulsion },
    { id: "specs", label: t.detail.tabs.specs },
    { id: "launches", label: t.detail.tabs.launches },
    { id: "family", label: t.detail.tabs.family },
    { id: "sources", label: t.detail.tabs.sources, hint: `${r.sources.length}` },
  ];

  const panels = [
    <OverviewTab key="o" r={r} t={t} />,
    <DesignTab key="d" r={r} lang={lang} t={t} />,
    <PropulsionTab key="p" r={r} lang={lang} t={t} />,
    <SpecsTab key="s" r={r} lang={lang} t={t} />,
    <LaunchesTab key="l" r={r} lang={lang} t={t} />,
    <FamilyTab key="f" r={r} related={related} t={t} />,
    <SourcesTab key="src" sources={r.sources} modelNote={r.geometry.modelNote} t={t} />,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {/* 面包屑 + 标题 */}
        <nav
          aria-label={t.common.breadcrumb}
          className="flex items-center gap-1.5 text-[12px] text-fg-subtle"
        >
          <L href="/rockets" className="hover:text-accent">
            {t.nav.rockets}
          </L>
          <ChevronRight className="size-3" />
          {family ? (
            <>
              <L href={`/family/${family.slug}`} className="hover:text-accent">
                {family.nameZh}
              </L>
              <ChevronRight className="size-3" />
            </>
          ) : null}
          <span className="text-fg-muted">{r.nameZh}</span>
        </nav>

        <header className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[30px] font-semibold tracking-tight text-fg">{r.nameZh}</h1>
              <StatusBadge status={r.status} />
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[14px] text-fg-muted">
              <span>{r.name}</span>
              <span aria-hidden>·</span>
              <Flag country={r.countryZh} withName />
              <span aria-hidden>·</span>
              <span>{r.agency.join(" / ")}</span>
            </p>
          </div>
          <CompareToggle slug={r.slug} variant="button" />
        </header>

        {/* 双栏：左 3D、右内容 */}
        <div className="mt-7 gap-8 lg:grid lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,540px)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6.5rem)]">
            <ViewerMount geometry={r.geometry} name={r.nameZh} className="h-[460px] lg:h-full" />
          </div>

          <div className="mt-8 min-w-0 lg:mt-0">
            {/* 快速参数条 */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-base bg-border-base sm:grid-cols-3 lg:grid-cols-6">
              <QuickSpec label={t.spec.height} value={meters(r.height)} />
              <QuickSpec label={t.spec.diameter} value={meters(r.diameter)} />
              <QuickSpec label={t.spec.mass} value={mass(r.mass)} />
              <QuickSpec
                label={t.spec.payloadLEO}
                value={r.payloadLEO ? mass(r.payloadLEO) : t.common.na}
              />
              <QuickSpec label={t.spec.stageCount} value={`${r.stageCount}`} />
              <QuickSpec label={t.spec.firstFlight} value={r.firstFlight.slice(0, 4)} />
            </dl>

            <p className="mt-3 text-[11px] text-fg-subtle">
              {t.spec.firstFlight} {dateZh(r.firstFlight, lang)}
              {r.lastFlight
                ? ` · ${t.spec.lastFlight} ${dateZh(r.lastFlight, lang)}`
                : ` · ${t.spec.inService}`}
              {r.payloadLEO
                ? ` · ${t.spec.payloadRatio} ${num((r.payloadLEO / r.mass) * 100, 2)}%`
                : ""}
            </p>

            <Tabs className="mt-7" tabs={tabs} panels={panels} syncHash />
          </div>
        </div>
      </div>
    </>
  );
}

function QuickSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-panel px-3.5 py-3">
      <dt className="text-[10px] uppercase tracking-[0.1em] text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium text-fg tabular">{value}</dd>
    </div>
  );
}
