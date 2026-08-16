import { L } from "@/components/ui/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, ExternalLink } from "lucide-react";
import { PRINCIPLES, getPrinciple } from "@/data/principles";
import { getRocket } from "@/data/rockets";
import { Markdown } from "@/components/md/markdown";
import { Silhouette } from "@/components/rocket/silhouette";
import { Badge } from "@/components/ui/badge";
import { meters, year } from "@/lib/utils";
import { getLang, getServerDict } from "@/i18n/server";
import { localizePrinciple, localizeRocket } from "@/i18n/localize";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, pageMeta, stripMarkdown, techArticleJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return PRINCIPLES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/principles/[slug]">,
): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const raw = getPrinciple(slug);
  if (!raw) return { title: "404" };
  const locale = lang === "en" ? "en" : "zh";
  const p = localizePrinciple(raw, locale);
  return pageMeta({
    lang: locale,
    path: `/principles/${p.slug}`,
    title: p.title,
    description: p.summary,
    type: "article",
  });
}

export default async function PrinciplePage(props: PageProps<"/[lang]/principles/[slug]">) {
  const { slug } = await props.params;
  const lang = await getLang();
  const t = await getServerDict();
  const raw = getPrinciple(slug);
  if (!raw) notFound();
  const p = localizePrinciple(raw, lang);

  const examples = p.examples
    .map((e) => {
      const rk = getRocket(e.slug);
      return { ...e, rocket: rk ? localizeRocket(rk, lang) : undefined };
    })
    .filter((e) => e.rocket);

  const idx = PRINCIPLES.findIndex((x) => x.slug === p.slug);
  const prev = PRINCIPLES[idx - 1] ? localizePrinciple(PRINCIPLES[idx - 1], lang) : undefined;
  const next = PRINCIPLES[idx + 1] ? localizePrinciple(PRINCIPLES[idx + 1], lang) : undefined;

  const path = `/principles/${p.slug}`;
  const nodes = [
    breadcrumbJsonLd(lang, [
      { name: t.nav.principles, path: "/principles" },
      { name: p.title },
    ]),
    {
      ...techArticleJsonLd({
        lang,
        path,
        headline: p.title,
        description: p.summary,
        about: p.title,
      }),
      articleSection: t.nav.principles,
      wordCount: stripMarkdown(p.body, 1_000_000).length,
      timeRequired: `PT${p.readingMinutes}M`,
    },
  ];

  return (
    <>
      <JsonLd nodes={nodes} />
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <nav
          aria-label={t.common.breadcrumb}
          className="flex items-center gap-1.5 text-[12px] text-fg-subtle"
        >
          <L href="/principles" className="hover:text-accent">
            {t.principles.title}
          </L>
          <ChevronRight className="size-3" />
          <span className="text-fg-muted">{p.title}</span>
        </nav>

        <div className="mt-8 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="min-w-0">
            <header className="border-b border-border-base pb-8">
              <div className="flex items-center gap-3 text-[12px] text-fg-subtle">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {p.readingMinutes} {t.common.minutes}
                </span>
                <span>{p.titleEn}</span>
              </div>
              <h1 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight text-fg">
                {p.title}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
                {p.summary}
              </p>
            </header>

            <Markdown className="mt-8">{p.body}</Markdown>

            {/* 典型案例 */}
            <section className="mt-14 border-t border-border-base pt-8">
              <h2 className="text-[20px] font-semibold tracking-tight text-fg">
                {t.principles.appliedIn}
              </h2>
              <div className="mt-5 space-y-3">
                {examples.map((e) => (
                  <L
                    key={e.slug}
                    href={`/rocket/${e.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-border-base bg-panel p-4 transition-colors hover:border-accent"
                  >
                    <div className="grid h-16 w-12 shrink-0 place-items-center">
                      <Silhouette
                        geometry={e.rocket!.geometry}
                        mode="outline"
                        className="h-16 w-auto text-fg-subtle group-hover:text-accent"
                        title={e.rocket!.nameZh}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-medium text-fg group-hover:text-accent">
                        {e.rocket!.nameZh}
                        <span className="ml-2 text-[11px] font-normal text-fg-subtle">
                          {e.rocket!.countryZh} · {year(e.rocket!.firstFlight)} ·{" "}
                          {meters(e.rocket!.height)}
                        </span>
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{e.why}</p>
                    </div>
                  </L>
                ))}
              </div>
            </section>

            {/* 上下篇 */}
            <nav className="mt-12 flex flex-wrap gap-4 border-t border-border-base pt-6">
              {prev ? (
                <L
                  href={`/principles/${prev.slug}`}
                  className="flex-1 rounded-xl border border-border-base p-4 hover:border-accent"
                >
                  <span className="text-[11px] text-fg-subtle">{t.principles.prev}</span>
                  <p className="mt-1 text-[14px] font-medium text-fg">{prev.title}</p>
                </L>
              ) : null}
              {next ? (
                <L
                  href={`/principles/${next.slug}`}
                  className="flex-1 rounded-xl border border-border-base p-4 text-right hover:border-accent"
                >
                  <span className="text-[11px] text-fg-subtle">{t.principles.next}</span>
                  <p className="mt-1 text-[14px] font-medium text-fg">{next.title}</p>
                </L>
              ) : null}
            </nav>
          </article>

          {/* 侧栏：来源 */}
          <aside className="mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                {t.principles.references}
              </p>
              <ul className="mt-3 space-y-3">
                {p.sources.map((s) => (
                  <li key={s.url + s.title}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-border-base bg-panel p-3"
                    >
                      <span className="flex items-start gap-1.5 text-[13px] text-fg group-hover:text-accent">
                        {s.title}
                        <ExternalLink className="mt-0.5 size-3 shrink-0" />
                      </span>
                      {s.publisher ? (
                        <span className="mt-1 block text-[11px] text-fg-subtle">
                          {s.publisher}
                        </span>
                      ) : null}
                      {s.note ? (
                        <span className="mt-1.5 block text-[11px] leading-relaxed text-fg-muted">
                          {s.note}
                        </span>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-lg border border-border-base bg-bg-sunken p-3">
                <Badge tone="neutral">{t.principles.formulaNote}</Badge>
                <p className="mt-2 text-[11px] leading-relaxed text-fg-muted">
                  {t.principles.formulaNoteBody}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
