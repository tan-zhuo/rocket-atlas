import type { Metadata } from "next";
import { ENGINES } from "@/data/engines-index";
import { getRocket } from "@/data/rockets";
import { toEngineSummary } from "@/lib/engine-summary";
import { EngineBrowser } from "@/components/engine/engine-browser";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerDict();
  return { title: t.engines.title, description: t.engines.lead };
}

export default async function EnginesPage() {
  const lang = await getLang();
  const t = await getServerDict();

  const rocketName = (slug: string) => {
    const r = getRocket(slug);
    return r ? localizeRocket(r, lang).nameZh : slug;
  };
  const engines = ENGINES.map((e) => toEngineSummary(e, lang, rocketName));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.engines.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.engines.lead}</p>
      </header>

      <EngineBrowser engines={engines} />
    </div>
  );
}
