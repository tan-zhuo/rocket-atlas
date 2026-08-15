import type { Metadata } from "next";
import { L } from "@/components/ui/link";
import { ExternalLink, ShieldCheck, TriangleAlert, Boxes } from "lucide-react";
import { ROCKETS, atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { Badge } from "@/components/ui/badge";
import { unique } from "@/lib/utils";
import { getLang, getServerDict } from "@/i18n/server";
import { ABOUT_COPY } from "@/i18n/about-copy";

export async function generateMetadata(): Promise<Metadata> {
  const c = ABOUT_COPY[await getLang()];
  return { title: c.title, description: c.metaDescription };
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = await getServerDict();
  const c = ABOUT_COPY[lang];
  const stats = atlasStats();

  // 汇总全站来源，按发布方归并
  const allSources = [
    ...ROCKETS.flatMap((r) => r.sources),
    ...PRINCIPLES.flatMap((p) => p.sources),
  ];
  const publishers = unique(allSources.map((s) => s.publisher ?? "—")).sort();
  const highCount = allSources.filter((s) => s.confidence === "high").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight text-fg">{c.title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{c.lead}</p>

      <dl className="mt-8 grid grid-cols-2 gap-6 rounded-xl border border-border-base bg-panel p-6 sm:grid-cols-4">
        <Stat label={c.stats.models} value={String(stats.rockets)} />
        <Stat label={c.stats.principles} value={String(PRINCIPLES.length)} />
        <Stat label={c.stats.citations} value={String(allSources.length)} />
        <Stat label={c.stats.primary} value={String(highCount)} />
      </dl>

      <Section title={c.method.title}>
        <p>{c.method.intro}</p>
        <ol className="my-4 space-y-3">
          {c.method.layers.map((l) => (
            <Layer key={l.name} n={l.name} desc={l.desc} />
          ))}
        </ol>
        <p>{c.method.outro}</p>
      </Section>

      <Section title={c.sources.title}>
        <p>{c.sources.intro}</p>
        <div className="my-5 space-y-3">
          {c.sources.levels.map((lv) => (
            <ConfRow key={lv.label} tone={lv.tone} label={lv.label} desc={lv.desc} />
          ))}
        </div>
        <p>{c.sources.rulesIntro}</p>
        <ul className="my-4 space-y-2">
          {c.sources.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>

      <Section title={c.model.title} icon={<Boxes className="size-4" />}>
        <p>{c.model.intro}</p>
        <ul className="my-4 space-y-2">
          <li>{c.model.trusted}</li>
          <li>{c.model.schematic}</li>
        </ul>
        <p>{c.model.outro}</p>
      </Section>

      <Section title={c.scope.title}>
        <p>{c.scope.intro}</p>
        <ul className="my-4 space-y-2">
          {c.scope.excluded.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>{c.scope.outro}</p>
      </Section>

      <Section title={c.publishers.title}>
        <div className="my-4 flex flex-wrap gap-1.5">
          {publishers.map((p) => (
            <Badge key={p}>{p}</Badge>
          ))}
        </div>
        <p className="flex items-start gap-2 text-[13px] text-fg-subtle">
          <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
          {c.publishers.note}
        </p>
      </Section>

      <Section title={c.contribute.title}>
        <p>{c.contribute.body}</p>
        <p className="mt-3">{c.contribute.welcome}</p>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-border-base pt-8">
        <L
          href="/rockets"
          className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          {c.ctaBrowse}
        </L>
        <L
          href="/principles"
          className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-[13px] font-medium text-fg hover:border-accent"
        >
          {c.ctaPrinciples}
        </L>
      </div>

      <p className="mt-8 text-[12px] leading-relaxed text-fg-subtle">{t.footer.disclaimer}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-fg tabular">{value}</dd>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-border-base pt-8">
      <h2 className="flex items-center gap-2 text-[20px] font-semibold tracking-tight text-fg">
        {icon}
        {title}
      </h2>
      <div className="prose-atlas mt-4 max-w-none text-[14px]">{children}</div>
    </section>
  );
}

function Layer({ n, desc }: { n: string; desc: string }) {
  return (
    <li className="rounded-lg border border-border-base bg-panel px-4 py-3">
      <span className="text-[13px] font-semibold text-fg">{n}</span>
      <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{desc}</p>
    </li>
  );
}

function ConfRow({
  tone,
  label,
  desc,
}: {
  tone: "ok" | "warn" | "danger";
  label: string;
  desc: string;
}) {
  const Icon = tone === "ok" ? ShieldCheck : TriangleAlert;
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border-base bg-panel px-4 py-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
      <div>
        <Badge tone={tone}>{label}</Badge>
        <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{desc}</p>
      </div>
    </div>
  );
}
