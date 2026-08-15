import Link from "next/link";
import { ExternalLink, Flame, ShieldCheck, TriangleAlert } from "lucide-react";
import type { Rocket, Source, Stage } from "@/data/types";
import { Card, CardBody, CardHeader, CardTitle, SpecRow } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/md/markdown";
import { PROPELLANT_META } from "@/lib/filters";
import { dateZh, force, mass, meters, num } from "@/lib/utils";

/* ── 概览 ─────────────────────────────────────────────── */

export function OverviewTab({ r }: { r: Rocket }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0">
        <p className="text-[15px] leading-relaxed text-fg">{r.description}</p>
        <h3 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          历史背景
        </h3>
        <Markdown className="mt-4">{r.history}</Markdown>
      </div>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>关键里程碑</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3.5">
            {r.milestones.map((m) => (
              <div key={`${m.date}-${m.title}`} className="border-l border-border-strong pl-3">
                <p className="text-[11px] text-fg-subtle tabular">{dateZh(m.date)}</p>
                <p className="mt-0.5 text-[13px] font-medium text-fg">{m.title}</p>
                {m.note ? (
                  <p className="mt-1 text-[12px] leading-relaxed text-fg-muted">{m.note}</p>
                ) : null}
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>标签</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-1.5">
            {r.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </CardBody>
        </Card>
      </aside>
    </div>
  );
}

/* ── 设计逻辑 ─────────────────────────────────────────── */

export async function DesignTab({ r }: { r: Rocket }) {
  return (
    <div className="max-w-[74ch]">
      <div className="rounded-xl border border-accent/30 bg-accent-soft/40 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          设计总纲
        </p>
        <Markdown className="mt-3">{r.designPhilosophy}</Markdown>
      </div>

      <h3 className="mt-12 text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
        设计权衡 · {r.tradeoffs.length} 个问题
      </h3>

      <div className="mt-5 space-y-10">
        {r.tradeoffs.map((t, i) => (
          <section key={t.question}>
            <h4 className="flex gap-3 text-[17px] font-semibold leading-snug tracking-tight text-fg">
              <span className="mt-0.5 shrink-0 font-mono text-[13px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t.question}
            </h4>
            <Markdown className="mt-3 pl-0 sm:pl-8">{t.answer}</Markdown>
          </section>
        ))}
      </div>

      {r.contemporaries ? (
        <section className="mt-14 border-t border-border-base pt-8">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            与同时代火箭的对比思考
          </h3>
          <Markdown className="mt-4">{r.contemporaries}</Markdown>
        </section>
      ) : null}

      {r.principles.length ? (
        <section className="mt-12 rounded-xl border border-border-base bg-bg-sunken p-5">
          <p className="text-[12px] text-fg-muted">相关原理专题</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {r.principles.map((p) => (
              <Link
                key={p}
                href={`/principles/${p}`}
                className="rounded-md border border-border-base bg-panel px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
              >
                {PRINCIPLE_TITLES[p] ?? p} →
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

const PRINCIPLE_TITLES: Record<string, string> = {
  "staging-and-rocket-equation": "火箭方程与分级优化",
  "propellants-and-cycles": "推进剂与动力循环",
  reusability: "可回收技术的演进与经济学",
  "structures-and-materials": "结构与材料",
  "guidance-and-control": "制导、导航与控制概览",
};

/* ── 技术规格 ─────────────────────────────────────────── */

export function SpecsTab({ r }: { r: Rocket }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>总体</CardTitle>
          </CardHeader>
          <CardBody>
            <dl>
              <SpecRow label="全长" value={meters(r.height)} />
              <SpecRow label="芯级直径" value={meters(r.diameter)} />
              {r.span && r.span !== r.diameter ? (
                <SpecRow label="最大横向尺寸" value={meters(r.span)} />
              ) : null}
              <SpecRow label="起飞质量" value={mass(r.mass)} />
              <SpecRow label="级数" value={`${r.stageCount} 级`} />
              <SpecRow
                label="长细比"
                value={num(r.height / r.diameter, 1)}
                sub="全长 / 芯级直径"
              />
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>运载能力</CardTitle>
          </CardHeader>
          <CardBody>
            <dl>
              <SpecRow label="近地轨道 LEO" value={r.payloadLEO ? mass(r.payloadLEO) : "—"} />
              <SpecRow label="同步转移 GTO" value={r.payloadGTO ? mass(r.payloadGTO) : "—"} />
              <SpecRow label="太阳同步 SSO" value={r.payloadSSO ? mass(r.payloadSSO) : "—"} />
              <SpecRow label="地月转移 TLI" value={r.payloadTLI ? mass(r.payloadTLI) : "—"} />
              <SpecRow
                label="载荷比"
                value={r.payloadLEO ? `${num((r.payloadLEO / r.mass) * 100, 2)}%` : "—"}
                sub="LEO 载荷 / 起飞质量"
              />
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>运行</CardTitle>
          </CardHeader>
          <CardBody>
            <dl>
              <SpecRow label="首飞" value={dateZh(r.firstFlight)} />
              <SpecRow label="末次飞行" value={r.lastFlight ? dateZh(r.lastFlight) : "仍在服役"} />
              <SpecRow label="研制 / 运营" value={r.agency.join("、")} />
              <SpecRow label="可回收" value={r.reusable ? "是" : "否"} />
              <SpecRow label="载人认证" value={r.humanRated ? "是" : "否"} />
            </dl>
            {r.reuseNote ? (
              <p className="mt-3 text-[12px] leading-relaxed text-fg-subtle">{r.reuseNote}</p>
            ) : null}
          </CardBody>
        </Card>
      </div>

      <div className="space-y-4">
        {r.stages.map((s) => (
          <StageCard key={s.name} s={s} />
        ))}
      </div>
    </div>
  );
}

function StageCard({ s }: { s: Stage }) {
  const meta = PROPELLANT_META[s.propellant];
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="size-2.5 rounded-full"
            style={{ background: meta.color }}
            aria-hidden
          />
          <div>
            <p className="text-[14px] font-semibold normal-case tracking-normal text-fg">
              {s.nameZh}
            </p>
            <p className="text-[11px] font-normal normal-case tracking-normal text-fg-subtle">
              {s.name} · {s.propellantZh}
            </p>
          </div>
        </div>
        {s.reusable ? <Badge tone="accent">可回收</Badge> : null}
      </CardHeader>
      <CardBody className="grid gap-6 md:grid-cols-2">
        <dl>
          <SpecRow label="海平面推力" value={force(s.thrustSeaLevel)} />
          <SpecRow label="真空推力" value={force(s.thrustVacuum)} />
          <SpecRow label="工作时间" value={s.burnTime ? `${num(s.burnTime)} s` : "—"} />
          <SpecRow label="干质量" value={mass(s.dryMass)} />
          <SpecRow label="推进剂质量" value={mass(s.propellantMass)} />
          {s.dryMass && s.propellantMass ? (
            <SpecRow
              label="结构系数 ε"
              value={num(s.dryMass / (s.dryMass + s.propellantMass), 3)}
              sub="干质量 / 总质量"
            />
          ) : null}
          <SpecRow label="直径 × 长度" value={`${meters(s.diameter)} × ${meters(s.height)}`} />
        </dl>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
            发动机
          </p>
          <div className="mt-3 space-y-3">
            {s.engines.map((e) => (
              <div
                key={e.name}
                className="rounded-lg border border-border-base bg-bg-sunken px-3.5 py-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13px] font-medium text-fg">
                    {e.name}
                    <span className="ml-1.5 text-fg-subtle tabular">×{e.count}</span>
                  </p>
                  <p className="text-[11px] text-fg-subtle">{e.cycleZh}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-fg-muted tabular">
                  <span>单台推力 {force(e.thrust)}</span>
                  {e.ispSeaLevel ? <span>Isp(SL) {e.ispSeaLevel} s</span> : null}
                  {e.ispVacuum ? <span>Isp(vac) {e.ispVacuum} s</span> : null}
                </div>
                {e.note ? (
                  <p className="mt-2 text-[12px] leading-relaxed text-fg-subtle">{e.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </CardBody>
      {s.note ? (
        <div className="border-t border-border-base px-5 py-3 text-[12px] leading-relaxed text-fg-muted">
          {s.note}
        </div>
      ) : null}
    </Card>
  );
}

/* ── 发射历史 ─────────────────────────────────────────── */

export function LaunchesTab({ r }: { r: Rocket }) {
  const l = r.launches;
  if (!l) {
    return (
      <p className="text-[14px] text-fg-muted">
        本型号尚无系统整理的发射统计。可参考「数据来源」中的公开记录。
      </p>
    );
  }
  const rate = (l.success / l.total) * 100;

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>发射统计</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-fg tabular">{num(rate, 1)}%</span>
            <span className="text-[12px] text-fg-subtle">成功率</span>
          </div>
          <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-bg-sunken">
            <span
              className="bg-[var(--ok)]"
              style={{ width: `${(l.success / l.total) * 100}%` }}
            />
            <span
              className="bg-[var(--warn)]"
              style={{ width: `${((l.partial ?? 0) / l.total) * 100}%` }}
            />
            <span
              className="bg-[var(--danger)]"
              style={{ width: `${(l.failure / l.total) * 100}%` }}
            />
          </div>
          <dl className="mt-4">
            <SpecRow label="总发射次数" value={num(l.total)} />
            <SpecRow label="成功" value={num(l.success)} />
            {l.partial ? <SpecRow label="部分成功" value={num(l.partial)} /> : null}
            <SpecRow label="失败" value={num(l.failure)} />
            <SpecRow label="统计截止" value={dateZh(l.asOf)} />
          </dl>
          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-fg-subtle">
            <TriangleAlert className="mt-px size-3 shrink-0" />
            不同来源对「部分失败」的判定口径不一致，统计结果可能有 ±1–2 次差异。
          </p>
        </CardBody>
      </Card>

      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          重要任务
        </h3>
        <ol className="mt-4 space-y-px overflow-hidden rounded-xl border border-border-base">
          {l.notable.map((n) => (
            <li key={`${n.date}-${n.name}`} className="bg-panel px-4 py-3.5">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[12px] text-fg-subtle tabular">{dateZh(n.date)}</span>
                <span className="text-[14px] font-medium text-fg">{n.name}</span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{n.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── 演进与家族 ───────────────────────────────────────── */

export function FamilyTab({
  r,
  related,
}: {
  r: Rocket;
  related: { slug: string; nameZh: string; name: string; description: string }[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          衍生型号与构型
        </h3>
        <ul className="mt-4 space-y-px overflow-hidden rounded-xl border border-border-base">
          {r.variants.map((v) => (
            <li key={v.name} className="bg-panel px-4 py-3.5">
              <div className="flex items-center gap-2">
                <Flame className="size-3.5 shrink-0 text-fg-subtle" />
                {v.slug ? (
                  <Link
                    href={`/rocket/${v.slug}`}
                    className="text-[14px] font-medium text-fg hover:text-accent"
                  >
                    {v.name}
                  </Link>
                ) : (
                  <span className="text-[14px] font-medium text-fg">{v.name}</span>
                )}
              </div>
              <p className="mt-1 pl-5 text-[13px] leading-relaxed text-fg-muted">{v.note}</p>
            </li>
          ))}
        </ul>

        <Link
          href={`/family/${r.family}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-accent hover:underline"
        >
          查看完整家族谱系 →
        </Link>
      </div>

      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          相关型号
        </h3>
        <div className="mt-4 space-y-3">
          {related.map((o) => (
            <Link
              key={o.slug}
              href={`/rocket/${o.slug}`}
              className="block rounded-xl border border-border-base bg-panel p-4 transition-colors hover:border-accent"
            >
              <p className="text-[14px] font-medium text-fg">
                {o.nameZh}
                <span className="ml-2 text-[11px] text-fg-subtle">{o.name}</span>
              </p>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-fg-muted">
                {o.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 数据来源 ─────────────────────────────────────────── */

const CONFIDENCE_META = {
  high: { label: "高置信度", tone: "ok" as const, desc: "一手文件或官方发布" },
  medium: { label: "中置信度", tone: "warn" as const, desc: "汇总性来源，口径可能有差异" },
  low: { label: "低置信度", tone: "danger" as const, desc: "报道或推算，仅供参考" },
};

export function SourcesTab({ sources, modelNote }: { sources: Source[]; modelNote: string }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-start gap-2.5 rounded-xl border border-border-base bg-bg-sunken p-4">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
        <p className="text-[13px] leading-relaxed text-fg-muted">
          本站所有内容均基于公开来源整理。设计逻辑部分是对公开资料的解读与归纳，
          标注为「基于公开信息」；不同来源在质量、推力等参数上常有 ±5% 的口径差异，
          我们优先采用官方用户手册与技术报告。
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {sources.map((s, i) => {
          const c = CONFIDENCE_META[s.confidence];
          return (
            <li key={s.url + i} className="rounded-xl border border-border-base bg-panel p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-fg hover:text-accent"
                  >
                    {s.title}
                    <ExternalLink className="size-3 shrink-0" />
                  </a>
                  {s.publisher ? (
                    <p className="mt-0.5 text-[12px] text-fg-subtle">{s.publisher}</p>
                  ) : null}
                </div>
                <Badge tone={c.tone} className="shrink-0">
                  {c.label}
                </Badge>
              </div>
              {s.note ? (
                <p className="mt-2 text-[12px] leading-relaxed text-fg-muted">{s.note}</p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <section className="mt-8 rounded-xl border border-border-base bg-bg-sunken p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          3D 模型说明
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{modelNote}</p>
      </section>
    </div>
  );
}
