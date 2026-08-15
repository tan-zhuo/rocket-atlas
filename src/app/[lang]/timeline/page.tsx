import type { Metadata } from "next";
import { TIMELINE_SORTED } from "@/data/timeline";
import { TimelineView } from "@/components/timeline/timeline-view";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeTimeline } from "@/i18n/localize";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerDict();
  return { title: t.timeline.title, description: t.timeline.lead };
}

export default async function TimelinePage() {
  const lang = await getLang();
  const t = await getServerDict();
  const events = localizeTimeline(TIMELINE_SORTED, lang);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.timeline.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.timeline.lead}</p>
      </header>

      <TimelineView events={events} />
    </div>
  );
}
