import type { Metadata } from "next";
import { ENGINES } from "@/data/engines-index";
import { getRocket } from "@/data/rockets";
import { toEngineSummary } from "@/lib/engine-summary";
import { EngineBrowser } from "@/components/engine/engine-browser";
import { L } from "@/components/ui/link";
import { ArrowRight, Wrench } from "lucide-react";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";
import { itemListJsonLd, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = await getServerDict();
  return pageMeta({ lang, path: "/engines", title: t.engines.title, description: t.engines.lead });
}

export default async function EnginesPage() {
  const lang = await getLang();
  const t = await getServerDict();

  const rocketName = (slug: string) => {
    const r = getRocket(slug);
    return r ? localizeRocket(r, lang).nameZh : slug;
  };
  const engines = ENGINES.map((e) => toEngineSummary(e, lang, rocketName));

  const nodes = [
    itemListJsonLd(
      lang,
      ENGINES.map((e) => ({
        name: lang === "en" ? e.detail.displayEn : e.detail.displayZh,
        path: `/engine/${e.slug}`,
      })),
    ),
  ];

  return (
    <>
      <JsonLd nodes={nodes} />
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.engines.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.engines.lead}</p>
      </header>

      {/* 原理讲解入口：目录回答「有哪些」，讲解回答「怎么工作」 */}
      <L
        href="/engines/anatomy"
        className="group mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-accent/30 bg-accent-soft/40 p-5 transition-colors hover:border-accent"
      >
        <Wrench className="size-5 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-fg group-hover:text-accent">
            {t.engines.howItWorks}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
            {t.engines.howItWorksDesc}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-accent">
          {t.engines.howItWorksCta}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </L>

      <EngineBrowser engines={engines} />
    </div>
    </>
  );
}
