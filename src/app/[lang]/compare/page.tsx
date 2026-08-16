import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { toSummary } from "@/lib/summary";
import { CompareBoard } from "@/components/compare/compare-board";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = await getServerDict();
  return pageMeta({ lang, path: "/compare", title: t.compare.title, description: t.compare.lead });
}

export default async function ComparePage() {
  const lang = await getLang();
  const t = await getServerDict();
  const rockets = ROCKETS.map((r) => toSummary(localizeRocket(r, lang)));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.compare.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.compare.lead}</p>
      </header>

      <CompareBoard rockets={rockets} />
    </div>
  );
}
