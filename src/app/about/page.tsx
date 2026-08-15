import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck, TriangleAlert, Boxes } from "lucide-react";
import { ROCKETS, atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { Badge } from "@/components/ui/badge";
import { unique } from "@/lib/utils";

export const metadata: Metadata = {
  title: "关于与数据来源",
  description:
    "本站的内容方法、数据来源策略、置信度标注规则、3D 模型的精度声明与覆盖范围边界。",
};

export default function AboutPage() {
  const stats = atlasStats();

  // 汇总全站来源，按发布方归并
  const allSources = [...ROCKETS.flatMap((r) => r.sources), ...PRINCIPLES.flatMap((p) => p.sources)];
  const publishers = unique(allSources.map((s) => s.publisher ?? "其它")).sort();
  const highCount = allSources.filter((s) => s.confidence === "high").length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-[30px] font-semibold tracking-tight text-fg">关于本站</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
        运载火箭图谱是一个<span className="text-fg">公开知识驱动</span>
        的运载火箭系统化可视化教育平台。它的目标不是收集最多的参数，
        而是把散落在 NASA 技术报告、发射服务用户手册、官方白皮书与事故调查报告里的公开信息，
        整理成能回答「为什么这样设计」的知识结构。
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-6 rounded-xl border border-border-base bg-panel p-6 sm:grid-cols-4">
        <Stat label="收录型号" value={String(stats.rockets)} />
        <Stat label="原理专题" value={String(PRINCIPLES.length)} />
        <Stat label="来源引用" value={String(allSources.length)} />
        <Stat label="一手来源" value={String(highCount)} />
      </dl>

      <Section title="内容方法：三层结构">
        <p>每个型号页的内容都按同一套结构组织，避免变成参数堆砌：</p>
        <ol className="my-4 space-y-3">
          <Layer
            n="事实层"
            desc="名称、国家、机构、首飞、级数、推进剂、推力、载荷能力、发射记录。这一层追求可核对——每一条关键参数都能追溯到具体来源。"
          />
          <Layer
            n="架构层"
            desc="总体布局、分级逻辑、发动机配置、结构特点、回收方案。这一层由 3D 查看器承担：可旋转、可爆炸、可点击每个部件读说明。"
          />
          <Layer
            n="原理层"
            desc="为什么选这种推进剂与循环、为什么这样分级、结构与热管理的权衡、与同时代型号的对比。这一层是解读，明确标注为「基于公开信息的分析」。"
          />
        </ol>
        <p>
          第三层是本站最花力气的部分，也是最需要读者保持批判的部分——
          它是对公开资料的归纳与推理，不是官方结论。
        </p>
      </Section>

      <Section title="来源策略与置信度">
        <p>我们对来源做三级标注，直接显示在每个型号页的「数据来源」标签下：</p>
        <div className="my-5 space-y-3">
          <ConfRow
            tone="ok"
            label="高置信度"
            desc="发射服务用户手册、NASA/ESA 技术报告、官方事故调查报告、制造方发布的规格页。"
          />
          <ConfRow
            tone="warn"
            label="中置信度"
            desc="维基百科等汇总性来源、行业媒体报道。这类来源在质量、推力等参数上常有 ±5% 的口径差异。"
          />
          <ConfRow
            tone="danger"
            label="低置信度"
            desc="未经证实的报道或由公开信息反推的估算值，仅作参考。"
          />
        </div>
        <p>几条具体的取舍规则：</p>
        <ul className="my-4 space-y-2">
          <li>官方用户手册优先于任何二手汇总。</li>
          <li>
            当不同来源冲突时，我们采用官方值并在来源备注里写明差异范围
            （例如 Saturn V 的 LEO 载荷在 118–140 t 之间取决于是否计入 S-IVB 剩余推进剂）。
          </li>
          <li>发射统计标注截止日期；「部分失败」的判定口径各家不同，可能有 ±1–2 次差异。</li>
          <li>在研型号（如星舰）的质量与运力多为公开估算，制造方未正式发布完整数据。</li>
        </ul>
      </Section>

      <Section title="3D 模型的精度声明" icon={<Boxes className="size-4" />}>
        <p>
          本站<span className="text-fg">不使用也不生成任何非公开的工程图纸或高精度 CAD</span>。
          所有 3D 模型都是<span className="text-fg">参数化示意模型</span>：
          用一组带真实尺寸的回转体与周向阵列，按公开的总高、直径、分段长度、发动机数量与布局复原外形。
        </p>
        <ul className="my-4 space-y-2">
          <li>
            <span className="text-fg">可信的部分：</span>
            各级长度与直径的比例、发动机数量与排布、助推器构型、整流罩尺寸。
          </li>
          <li>
            <span className="text-fg">示意的部分：</span>
            表面细节（管路、蒙皮桁条、涂装标识）、内部结构、局部曲面过渡。
          </li>
        </ul>
        <p>
          每个查看器右下角都标注了该模型的复原依据。同一份几何数据同时驱动 3D 与 2D 等比剪影，
          所以对比页的尺寸比较是可信的。
        </p>
      </Section>

      <Section title="覆盖范围与边界">
        <p>当前收录以「有轨道发射记录的运载火箭 + 对技术演进有决定性意义的历史型号」为准。明确不做：</p>
        <ul className="my-4 space-y-2">
          <li>弹道导弹、战术导弹与纯探空火箭（除非对运载技术演进有重大意义，如 V-2）。</li>
          <li>未公开的工程细节、内部图纸的推测性重建。</li>
          <li>实时发射追踪（这类信息有更专业的现成服务）。</li>
        </ul>
        <p>
          内容与代码分离：所有型号数据都是结构化的 TypeScript 对象，
          新增一枚火箭只需要增加一个数据文件，3D、剪影、筛选、对比、搜索会自动适配。
        </p>
      </Section>

      <Section title="引用的主要来源方">
        <div className="my-4 flex flex-wrap gap-1.5">
          {publishers.map((p) => (
            <Badge key={p}>{p}</Badge>
          ))}
        </div>
        <p className="flex items-start gap-2 text-[13px] text-fg-subtle">
          <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
          完整的逐条引用列表在每个型号页的「数据来源」标签与每篇专题的侧栏中。
        </p>
      </Section>

      <Section title="纠错与贡献">
        <p>
          如果你发现参数错误、来源失效，或者认为某段设计逻辑的解读有问题——
          尤其是原理层的分析——欢迎指出。数据文件结构清晰，一条修正通常只涉及一个字段和一条来源备注。
        </p>
        <p className="mt-3">
          我们特别欢迎两类贡献：<span className="text-fg">带一手来源的参数修正</span>，
          以及<span className="text-fg">对设计权衡的不同解读</span>——后者往往比前者更有价值。
        </p>
      </Section>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-border-base pt-8">
        <Link
          href="/rockets"
          className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          浏览全部火箭
        </Link>
        <Link
          href="/principles"
          className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-[13px] font-medium text-fg hover:border-accent"
        >
          阅读原理专题
        </Link>
      </div>
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
