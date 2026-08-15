import type { Metadata } from "next";
import { L } from "@/components/ui/link";
import { ChevronRight } from "lucide-react";
import { ANATOMY_COPY, CYCLE_ORDER } from "@/data/engine-anatomy";
import { ENGINES } from "@/data/engines-index";
import { AnatomyDiagram, Inline } from "@/components/engine/anatomy-diagram";
import { CycleDiagram, CycleLegend } from "@/components/engine/cycle-diagram";
import { getLang, getServerDict } from "@/i18n/server";
import { CYCLE_LABEL } from "@/i18n/terms";

export async function generateMetadata(): Promise<Metadata> {
  const c = ANATOMY_COPY[await getLang()];
  return { title: c.title, description: c.lead };
}

export default async function EngineAnatomyPage() {
  const lang = await getLang();
  const t = await getServerDict();
  const c = ANATOMY_COPY[lang];
  const cycleLabel = CYCLE_LABEL[lang];

  // 每种循环列出本站收录的代表型号，把原理和具体发动机接上
  const examples = new Map<string, { slug: string; name: string }[]>();
  for (const e of ENGINES) {
    const list = examples.get(e.spec.cycle) ?? [];
    if (list.length < 3) {
      list.push({ slug: e.slug, name: lang === "en" ? e.detail.displayEn : e.detail.displayZh });
    }
    examples.set(e.spec.cycle, list);
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
      <nav
        aria-label={t.common.breadcrumb}
        className="flex items-center gap-1.5 text-[12px] text-fg-subtle"
      >
        <L href="/engines" className="hover:text-accent">
          {t.engines.breadcrumb}
        </L>
        <ChevronRight className="size-3" />
        <span className="text-fg-muted">{c.title}</span>
      </nav>

      <header className="mt-3 max-w-3xl">
        <h1 className="text-[30px] font-semibold tracking-tight text-fg">{c.title}</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{c.lead}</p>
      </header>

      {/* ── 结构剖面 ─────────────────────────────── */}
      <section className="mt-12 border-t border-border-base pt-8">
        <h2 className="text-[22px] font-semibold tracking-tight text-fg">{c.sectionAnatomy}</h2>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-fg-muted">{c.anatomyLead}</p>
        <AnatomyDiagram parts={c.parts} hint={c.hint} className="mt-6" />
      </section>

      {/* ── 六种循环 ─────────────────────────────── */}
      <section className="mt-14 border-t border-border-base pt-8">
        <h2 className="text-[22px] font-semibold tracking-tight text-fg">{c.sectionCycles}</h2>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
          <Inline text={c.cyclesLead} />
        </p>
        <CycleLegend labels={c.nodes} className="mt-4" />

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {CYCLE_ORDER.map((cycle) => (
            <article key={cycle} className="rounded-xl border border-border-base bg-panel p-4">
              <h3 className="text-[15px] font-semibold text-fg">{cycleLabel[cycle]}</h3>
              <div className="mt-3 rounded-lg border border-border-base bg-bg-sunken p-2">
                <CycleDiagram cycle={cycle} labels={c.nodes} />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                {c.cycleNote[cycle]}
              </p>
              {examples.get(cycle)?.length ? (
                <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-fg-subtle">
                  {t.principles.examples}
                  {examples.get(cycle)!.map((x) => (
                    <L
                      key={x.slug}
                      href={`/engine/${x.slug}`}
                      className="rounded border border-border-base px-1.5 py-0.5 text-fg-muted hover:border-accent hover:text-accent"
                    >
                      {x.name}
                    </L>
                  ))}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* ── 关键概念 ─────────────────────────────── */}
      <section className="mt-14 border-t border-border-base pt-8">
        <h2 className="text-[22px] font-semibold tracking-tight text-fg">{c.sectionConcepts}</h2>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
          {c.conceptsLead}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {c.concepts.map((x) => (
            <article key={x.id} className="rounded-xl border border-border-base bg-panel p-5">
              <h3 className="text-[15px] font-semibold text-fg">{x.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                <Inline text={x.body} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-border-base pt-8">
        <L
          href="/engines"
          className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          {c.toCatalogue}
        </L>
        <L
          href="/principles/propellants-and-cycles"
          className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-[13px] font-medium text-fg hover:border-accent"
        >
          {t.detail.relatedPrinciples}
        </L>
      </div>
    </div>
  );
}
