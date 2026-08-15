import Link from "next/link";
import { atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { FAMILIES } from "@/data/families";

export function SiteFooter() {
  const stats = atlasStats();

  return (
    <footer className="mt-20 border-t border-border-base bg-bg-sunken">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-fg">运载火箭图谱</p>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-fg-muted">
              一个公开知识驱动的运载火箭可视化教育平台。我们不只罗列参数，更试图讲清楚
              <span className="text-fg">「为什么这样设计」</span>。
            </p>
            <p className="mt-4 text-[12px] text-fg-subtle tabular">
              {stats.rockets} 个型号 · {stats.countries} 个国家/地区 · {stats.sources} 条来源引用
            </p>
          </div>

          <FooterCol
            title="浏览"
            links={[
              { href: "/rockets", label: "全部火箭" },
              { href: "/compare", label: "对比工具" },
              { href: "/timeline", label: "发展时间线" },
              { href: "/principles", label: "原理专题" },
              { href: "/lab", label: "3D 实验室" },
            ]}
          />

          <FooterCol
            title="原理专题"
            links={PRINCIPLES.slice(0, 5).map((p) => ({
              href: `/principles/${p.slug}`,
              label: p.title,
            }))}
          />

          <FooterCol
            title="火箭家族"
            links={FAMILIES.slice(0, 5).map((f) => ({
              href: `/family/${f.slug}`,
              label: f.nameZh,
            }))}
          />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-base pt-6 text-[12px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl leading-relaxed">
            全部内容基于公开来源整理，关键参数均标注出处与置信度。3D 模型为按公开尺寸复原的
            <span className="text-fg-muted">示意模型</span>，不代表真实工程图纸。
          </p>
          <Link href="/about" className="shrink-0 text-fg-muted hover:text-accent">
            数据来源与方法说明 →
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[13px] text-fg-muted hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
