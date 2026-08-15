import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { LabClient, type LabEntry } from "@/components/viewer/lab-client";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerDict();
  return { title: t.lab.title, description: t.lab.lead };
}

export default async function LabPage() {
  const lang = await getLang();
  const t = await getServerDict();
  const entries: LabEntry[] = ROCKETS.map((raw) => localizeRocket(raw, lang)).map((r) => ({
    slug: r.slug,
    nameZh: r.nameZh,
    name: r.name,
    countryZh: r.countryZh,
    height: r.height,
    geometry: r.geometry,
  }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.lab.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.lab.lead}</p>
      </header>

      <LabClient entries={entries} />
    </div>
  );
}
