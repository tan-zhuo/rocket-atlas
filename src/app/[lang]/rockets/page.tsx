import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { toSummary } from "@/lib/summary";
import { filterOptionsFrom } from "@/lib/filters";
import { RocketBrowser } from "@/components/rocket/rocket-browser";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerDict();
  return { title: t.list.title, description: t.list.lead(ROCKETS.length) };
}

export default async function RocketsPage() {
  const lang = await getLang();
  const t = await getServerDict();
  const summaries = ROCKETS.map((r) => toSummary(localizeRocket(r, lang)));
  const options = filterOptionsFrom(summaries);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.list.title}</h1>
        <p className="mt-2.5 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
          {t.list.lead(summaries.length)}
        </p>
      </header>

      <RocketBrowser rockets={summaries} options={options} />
    </div>
  );
}
