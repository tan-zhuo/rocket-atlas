import Link from "next/link";
import { ArrowRight, Boxes, Layers, Telescope } from "lucide-react";
import { ROCKETS, FEATURED_SLUGS, getRockets, atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { TIMELINE_SORTED, TIMELINE_KIND_META } from "@/data/timeline";
import { toSummary } from "@/lib/summary";
import { RocketCard } from "@/components/rocket/rocket-card";
import { Silhouette } from "@/components/rocket/silhouette";
import { Badge } from "@/components/ui/badge";
import { Flag } from "@/components/ui/flag";
import { HeroMount } from "@/components/viewer/hero-mount";
import { dateZh, mass, meters, num } from "@/lib/utils";

const SCALE_ROW = ["v-2", "electron", "falcon-9", "long-march-5", "saturn-v", "starship"];
const HERO_ROW = ["saturn-v", "starship", "falcon-9", "long-march-5", "ariane-5"];

export default function Home() {
  const stats = atlasStats();
  const featured = getRockets(FEATURED_SLUGS).map(toSummary);
  const scaleRockets = getRockets(SCALE_ROW);
  const tallest = Math.max(...scaleRockets.map((r) => r.height));
  const pxPerMeter = 250 / tallest;
  const recent = [...TIMELINE_SORTED].reverse().slice(0, 6);
  const heroItems = getRockets(HERO_ROW).map((r) => ({
    slug: r.slug,
    nameZh: r.nameZh,
    name: r.name,
    height: r.height,
    mass: r.mass,
    geometry: r.geometry,
  }));

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border-base">
        <div className="grid-backdrop absolute inset-0 opacity-70" aria-hidden />
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(70% 55% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
            <div className="max-w-3xl">
            <h1 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl">
              看得见结构，
              <br className="hidden sm:block" />
              也讲得清
              <span className="text-accent">为什么这样设计</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fg-muted sm:text-base">
              从 V-2 到星舰，把散落在 NASA 技术报告、用户手册与官方白皮书里的公开信息，
              整理成可检索、可对比、可交互的知识体系。每一枚火箭都有 3D 结构、分级参数，
              以及一组「为什么不是别的方案」的设计权衡问答。
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/rockets"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-[14px] font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                探索全部火箭
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/compare"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 text-[14px] font-medium text-fg transition-colors hover:border-accent"
              >
                <Boxes className="size-4" />
                并排对比
              </Link>
              <Link
                href="/principles/staging-and-rocket-equation"
                className="inline-flex h-11 items-center gap-2 px-2 text-[14px] text-fg-muted transition-colors hover:text-accent"
              >
                <Telescope className="size-4" />
                从火箭方程读起
              </Link>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              <HeroStat label="收录型号" value={num(stats.rockets)} />
              <HeroStat label="国家 / 地区" value={num(stats.countries)} />
              <HeroStat label="覆盖年代" value={`${stats.span.from}–${stats.span.to}`} />
              <HeroStat label="来源引用" value={num(stats.sources)} />
            </dl>
            </div>

            {/* 3D 展示位：与详情页查看器共用几何、材质与环境光照 */}
            <HeroMount items={heroItems} />
          </div>
        </div>
      </section>

      {/* ── 等比尺寸对比 ────────────────────────────────────── */}
      <section className="border-b border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6">
          <SectionHead
            eyebrow="同一刻度"
            title="它们真实的大小差距"
            desc="所有剪影使用同一份参数化几何、同一个 y 轴刻度绘制——与 3D 查看器完全一致的数据源。"
          />
          <div className="hide-scrollbar mt-8 flex items-end gap-8 overflow-x-auto pb-2">
            {scaleRockets.map((r) => (
              <Link
                key={r.slug}
                href={`/rocket/${r.slug}`}
                className="group flex shrink-0 flex-col items-center"
              >
                <Silhouette
                  geometry={r.geometry}
                  scale={pxPerMeter}
                  className="text-fg-subtle transition-colors group-hover:text-accent"
                  mode="outline"
                  title={`${r.nameZh}（${meters(r.height)}）`}
                />
                <p className="mt-3 whitespace-nowrap text-[12px] font-medium text-fg group-hover:text-accent">
                  {r.nameZh}
                </p>
                <p className="whitespace-nowrap text-[11px] text-fg-subtle tabular">
                  {meters(r.height)} · {mass(r.mass)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 精选火箭 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHead
            eyebrow="精选"
            title="从这几枚开始"
            desc="它们分别代表了不同年代、不同国家对同一组工程问题给出的不同答案。"
          />
          <Link
            href="/rockets"
            className="hidden shrink-0 items-center gap-1.5 text-[13px] text-fg-muted hover:text-accent sm:flex"
          >
            全部 {stats.rockets} 个型号
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((r) => (
            <RocketCard key={r.slug} r={r} />
          ))}
        </div>
      </section>

      {/* ── 知识分层 ────────────────────────────────────────── */}
      <section className="border-y border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <SectionHead
            eyebrow="方法"
            title="每一页都分三层组织"
            desc="参数堆砌解决不了「为什么」。我们把每个型号的内容拆成事实、架构、原理三层，3D 负责把架构层变得可见。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <LayerCard
              n="01"
              title="事实层"
              desc="名称、国家、首飞、级数、推进剂、推力、载荷能力、发射记录。每一条关键参数都标注来源与置信度。"
              tag="快速查阅与对比"
            />
            <LayerCard
              n="02"
              title="架构层"
              desc="总体布局、分级逻辑、发动机配置、结构特点、回收方案。用可旋转、可爆炸、可点击的 3D 呈现。"
              tag="理解「怎么组装」"
            />
            <LayerCard
              n="03"
              title="原理层"
              desc="为什么选这种推进剂与循环、为什么这样分级、结构与热管理的权衡、演进路径与同代对比。"
              tag="理解「为什么这样设计」"
              accent
            />
          </div>
        </div>
      </section>

      {/* ── 原理专题 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <SectionHead
          eyebrow="原理专题"
          title="横向切面：一个问题，所有火箭"
          desc="与其在每个型号页重复解释同一件事，不如把共通的原理抽出来单独讲透，再链回具体型号。"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <Link
              key={p.slug}
              href={`/principles/${p.slug}`}
              className="group flex flex-col rounded-xl border border-border-base bg-panel p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-2 text-[11px] text-fg-subtle">
                <Layers className="size-3.5" />
                约 {p.readingMinutes} 分钟 · {p.examples.length} 个案例
              </div>
              <h3 className="mt-3 text-[15px] font-semibold text-fg group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-fg-muted">{p.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-accent">
                阅读
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 时间线摘要 ──────────────────────────────────────── */}
      <section className="border-t border-border-base bg-bg-sunken">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <SectionHead eyebrow="时间线" title="最近的关键节点" />
            <Link
              href="/timeline"
              className="flex shrink-0 items-center gap-1.5 text-[13px] text-fg-muted hover:text-accent"
            >
              完整时间线
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-border-base">
            {recent.map((e) => {
              const meta = TIMELINE_KIND_META[e.kind];
              const inner = (
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 bg-panel px-4 py-3.5 transition-colors hover:bg-bg-elevated">
                  <span className="w-24 shrink-0 text-[12px] text-fg-subtle tabular">
                    {dateZh(e.date)}
                  </span>
                  <Badge tone={meta.tone} className="shrink-0">
                    {meta.label}
                  </Badge>
                  <span className="text-[14px] font-medium text-fg">{e.title}</span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-fg-muted">
                    {e.note}
                  </span>
                </div>
              );
              return (
                <li key={`${e.date}-${e.title}`}>
                  {e.rocket ? <Link href={`/rocket/${e.rocket}`}>{inner}</Link> : inner}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── 快速入口 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
        <SectionHead eyebrow="快速入口" title="按你关心的维度切进去" />
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ...new Set(ROCKETS.map((r) => r.countryZh)),
          ].map((c) => (
            <QuickLink key={c} href="/rockets">
              <Flag country={c} flagClassName="h-2.5 w-[15px]" className="mr-1.5 align-middle" />
              {c}
            </QuickLink>
          ))}
          <QuickLink href="/rockets">可回收火箭</QuickLink>
          <QuickLink href="/rockets">载人火箭</QuickLink>
          <QuickLink href="/compare">尺寸对比</QuickLink>
        </div>
      </section>
    </>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-fg tabular">{value}</dd>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[24px] font-semibold tracking-tight text-fg sm:text-[28px]">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{desc}</p> : null}
    </div>
  );
}

function LayerCard({
  n,
  title,
  desc,
  tag,
  accent,
}: {
  n: string;
  title: string;
  desc: string;
  tag: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-panel p-6 ${
        accent ? "border-accent/40" : "border-border-base"
      }`}
    >
      <span className="font-mono text-[11px] text-fg-subtle">{n}</span>
      <h3 className={`mt-2 text-lg font-semibold ${accent ? "text-accent" : "text-fg"}`}>
        {title}
      </h3>
      <p className="mt-2.5 text-[13px] leading-relaxed text-fg-muted">{desc}</p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.1em] text-fg-subtle">{tag}</p>
    </div>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-md border border-border-base bg-panel px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </Link>
  );
}
