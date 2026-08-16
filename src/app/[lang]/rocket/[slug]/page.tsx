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
import { EngineLinks } from "@/components/rocket/engine-links";
import { enginesOfRocket } from "@/data/engines-index";
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
import { JsonLd } from "@/components/seo/json-ld";
import {
  absUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMeta,
  stripMarkdown,
  techArticleJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return ROCKETS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/rocket/[slug]">,
): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const raw = getRocket(slug);
  if (!raw) return { title: "404" };
  const locale = lang === "en" ? "en" : "zh";
  const r = localizeRocket(raw, locale);
  const title = locale === "en" ? r.nameZh : `${r.nameZh} ${r.name}`;
  return pageMeta({
    lang: locale,
    path: `/rocket/${r.slug}`,
    title,
    description: r.description,
    type: "article",
    keywords: [r.nameZh, r.name, r.countryZh, ...r.tags],
  });
}

export default async function RocketPage(props: PageProps<"/[lang]/rocket/[slug]">) {
  const { slug } = await props.params;
  const lang = await getLang();
  const t = await getServerDict();
  const raw = getRocket(slug);
  if (!raw) notFound();

  const r = localizeRocket(raw, lang);
  const engines = enginesOfRocket(r.slug);
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

  const path = `/rocket/${r.slug}`;
  const vehicle = {
    "@type": "Product",
    "@id": `${absUrl(lang, path)}#vehicle`,
    name: `${r.nameZh} / ${r.name}`,
    description: r.description,
    category: lang === "en" ? "Launch vehicle" : "运载火箭",
    brand: { "@type": "Organization", name: r.agency[0] ?? r.countryZh },
    countryOfOrigin: r.countryZh,
    releaseDate: r.firstFlight,
    additionalProperty: [
      { "@type": "PropertyValue", name: t.spec.height, value: `${r.height} m` },
      { "@type": "PropertyValue", name: t.spec.mass, value: `${r.mass} kg` },
      { "@type": "PropertyValue", name: t.spec.stageCount, value: r.stageCount },
      ...(r.payloadLEO
        ? [{ "@type": "PropertyValue", name: "LEO", value: `${r.payloadLEO} kg` }]
        : []),
      ...(r.payloadGTO
        ? [{ "@type": "PropertyValue", name: "GTO", value: `${r.payloadGTO} kg` }]
        : []),
    ],
  };

  const crumbs = [
    { name: t.nav.rockets, path: "/rockets" },
    ...(family ? [{ name: family.nameZh, path: `/family/${family.slug}` }] : []),
    { name: r.nameZh },
  ];

  const nodes = [
    breadcrumbJsonLd(lang, crumbs),
    techArticleJsonLd({
      lang,
      path,
      headline: `${r.nameZh}（${r.name}）`,
      description: stripMarkdown(r.designPhilosophy, 300),
      image: `${absUrl(lang, path)}/opengraph-image`,
      about: r.nameZh,
    }),
    vehicle,
    // 「设计逻辑」本来就是问答式的，直接映射成 FAQPage
    faqJsonLd(r.tradeoffs),
  ];

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
    <OverviewTab key="o" r={r} lang={lang} t={t} />,
    <DesignTab key="d" r={r} lang={lang} t={t} />,
    <PropulsionTab key="p" r={r} lang={lang} t={t} />,
    <SpecsTab key="s" r={r} lang={lang} t={t} />,
    <LaunchesTab key="l" r={r} lang={lang} t={t} />,
    <FamilyTab key="f" r={r} related={related} t={t} />,
    <SourcesTab key="src" sources={r.sources} modelNote={r.geometry.modelNote} t={t} />,
  ];

  return (
    <>
      <JsonLd nodes={nodes} />

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

            <EngineLinks engines={engines} lang={lang} t={t} className="mt-5" />

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
