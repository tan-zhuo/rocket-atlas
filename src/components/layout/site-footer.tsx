import Link from "next/link";
import { Globe } from "lucide-react";
import { atlasStats } from "@/data/rockets";
import { PRINCIPLES } from "@/data/principles";
import { FAMILIES } from "@/data/families";

const REPO_URL = "https://github.com/tan-zhuo/rocket-atlas";

/** GitHub 标识（lucide 已移除该品牌图标，这里内联官方 mark 路径） */
function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

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

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="https://tanzhuo.xyz"
                target="_blank"
                rel="noopener noreferrer me"
                className="flex items-center gap-1.5 text-[12px] text-fg-muted transition-colors hover:text-accent"
              >
                <Globe className="size-3.5" />
                作者 tanzhuo.xyz
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-fg-muted transition-colors hover:text-accent"
              >
                <GithubMark className="size-3.5" />
                开源代码
              </a>
            </div>
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
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted hover:text-accent"
            >
              github.com/tan-zhuo/rocket-atlas
            </a>
            <Link href="/about" className="text-fg-muted hover:text-accent">
              数据来源与方法说明 →
            </Link>
          </div>
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
