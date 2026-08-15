import type { Metadata } from "next";
import Link from "next/link";
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

export function generateStaticParams() {
  return ROCKETS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata(props: PageProps<"/rocket/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const r = getRocket(slug);
  if (!r) return { title: "未找到该火箭" };
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

export default async function RocketPage(props: PageProps<"/rocket/[slug]">) {
  const { slug } = await props.params;
  const r = getRocket(slug);
  if (!r) notFound();

  const family = getFamily(r.family);
  const related = getRockets(r.relatedRockets).map((o) => ({
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
    { id: "overview", label: "概览" },
    { id: "design", label: "设计逻辑", hint: `${r.tradeoffs.length}` },
    { id: "propulsion", label: "动力系统" },
    { id: "specs", label: "技术规格" },
    { id: "launches", label: "发射历史" },
    { id: "family", label: "演进与家族" },
    { id: "sources", label: "数据来源", hint: `${r.sources.length}` },
  ];

  const panels = [
    <OverviewTab key="o" r={r} />,
    <DesignTab key="d" r={r} />,
    <PropulsionTab key="p" r={r} />,
    <SpecsTab key="s" r={r} />,
    <LaunchesTab key="l" r={r} />,
    <FamilyTab key="f" r={r} related={related} />,
    <SourcesTab key="src" sources={r.sources} modelNote={r.geometry.modelNote} />,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {/* 面包屑 + 标题 */}
        <nav aria-label="面包屑" className="flex items-center gap-1.5 text-[12px] text-fg-subtle">
          <Link href="/rockets" className="hover:text-accent">
            火箭百科
          </Link>
          <ChevronRight className="size-3" />
          {family ? (
            <>
              <Link href={`/family/${family.slug}`} className="hover:text-accent">
                {family.nameZh}
              </Link>
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
              <QuickSpec label="全长" value={meters(r.height)} />
              <QuickSpec label="直径" value={meters(r.diameter)} />
              <QuickSpec label="起飞质量" value={mass(r.mass)} />
              <QuickSpec
                label="LEO 载荷"
                value={r.payloadLEO ? mass(r.payloadLEO) : "—"}
              />
              <QuickSpec label="级数" value={`${r.stageCount}`} />
              <QuickSpec label="首飞" value={r.firstFlight.slice(0, 4)} />
            </dl>

            <p className="mt-3 text-[11px] text-fg-subtle">
              首飞 {dateZh(r.firstFlight)}
              {r.lastFlight ? ` · 末次飞行 ${dateZh(r.lastFlight)}` : " · 现役"}
              {r.payloadLEO
                ? ` · 载荷比 ${num((r.payloadLEO / r.mass) * 100, 2)}%`
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
