import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Dot } from "lucide-react";
import { FAMILIES, getFamily } from "@/data/families";
import { getRockets } from "@/data/rockets";
import { toSummary } from "@/lib/summary";
import { RocketCard } from "@/components/rocket/rocket-card";
import { Markdown } from "@/components/md/markdown";
import { Flag } from "@/components/ui/flag";

export function generateStaticParams() {
  return FAMILIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: PageProps<"/family/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const f = getFamily(slug);
  if (!f) return { title: "未找到该家族" };
  return {
    title: `${f.nameZh} 家族`,
    description: f.summary.split("\n")[0].slice(0, 150),
  };
}

export default async function FamilyPage(props: PageProps<"/family/[slug]">) {
  const { slug } = await props.params;
  const f = getFamily(slug);
  if (!f) notFound();

  const members = getRockets(f.members).map(toSummary);
  const related = f.related.map(getFamily).filter(Boolean);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <nav aria-label="面包屑" className="flex items-center gap-1.5 text-[12px] text-fg-subtle">
        <Link href="/rockets" className="hover:text-accent">
          火箭百科
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-fg-muted">{f.nameZh}</span>
      </nav>

      <header className="mt-4 max-w-3xl">
        <h1 className="text-[30px] font-semibold tracking-tight text-fg">{f.nameZh}</h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[14px] text-fg-muted">
          <span>{f.name}</span>
          <span aria-hidden>·</span>
          <Flag country={f.countryZh} withName />
        </p>
      </header>

      <div className="mt-8 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <Markdown>{f.summary}</Markdown>

          <section className="mt-12">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
              谱系
            </h2>
            <ol className="mt-5 border-l border-border-strong">
              {f.lineage.map((l) => (
                <li key={l.name} className="relative pb-7 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent" />
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    {l.slug ? (
                      <Link
                        href={`/rocket/${l.slug}`}
                        className="text-[15px] font-semibold text-fg hover:text-accent"
                      >
                        {l.name}
                      </Link>
                    ) : (
                      <span className="text-[15px] font-semibold text-fg">{l.name}</span>
                    )}
                    <span className="text-[12px] text-fg-subtle tabular">{l.years}</span>
                    {l.slug ? (
                      <span className="rounded border border-accent/30 bg-accent-soft px-1.5 py-0.5 text-[10px] text-accent">
                        本站收录
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{l.note}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-20 space-y-6">
            {members.length ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                  本站收录的成员
                </p>
                <div className="mt-3 space-y-4">
                  {members.map((r) => (
                    <RocketCard key={r.slug} r={r} />
                  ))}
                </div>
              </div>
            ) : null}

            {related.length ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
                  相关家族
                </p>
                <ul className="mt-3 space-y-1.5">
                  {related.map((o) => (
                    <li key={o!.slug}>
                      <Link
                        href={`/family/${o!.slug}`}
                        className="flex items-center text-[13px] text-fg-muted hover:text-accent"
                      >
                        <Dot className="size-4 shrink-0" />
                        {o!.nameZh}
                        <Flag
                          country={o!.countryZh}
                          flagClassName="h-2.5 w-[15px]"
                          className="ml-1.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
