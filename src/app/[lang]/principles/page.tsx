import { L } from "@/components/ui/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { PRINCIPLES } from "@/data/principles";
import { getRocket } from "@/data/rockets";
import { getLang, getServerDict } from "@/i18n/server";
import { localizePrinciple, localizeRocket } from "@/i18n/localize";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerDict();
  return { title: t.principles.title, description: t.principles.lead };
}

export default async function PrinciplesPage() {
  const lang = await getLang();
  const t = await getServerDict();
  const principles = PRINCIPLES.map((p) => localizePrinciple(p, lang));
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">{t.principles.title}</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">{t.principles.lead}</p>
      </header>

      <div className="mt-10 space-y-4">
        {principles.map((p, i) => (
          <L
            key={p.slug}
            href={`/principles/${p.slug}`}
            className="group block rounded-xl border border-border-base bg-panel p-6 transition-colors hover:border-accent"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 text-[11px] text-fg-subtle">
                  <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {p.readingMinutes} {t.common.minutes}
                  </span>
                  <span>{p.titleEn}</span>
                </div>
                <h2 className="mt-2 text-[19px] font-semibold tracking-tight text-fg group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2.5 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-fg-subtle">
                  <span>{t.principles.examples}</span>
                  {p.examples.map((e) => {
                    const raw = getRocket(e.slug);
                    const r = raw ? localizeRocket(raw, lang) : undefined;
                    return r ? (
                      <span
                        key={e.slug}
                        className="rounded border border-border-base px-1.5 py-0.5 text-fg-muted"
                      >
                        {r.nameZh}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          </L>
        ))}
      </div>
    </div>
  );
}
