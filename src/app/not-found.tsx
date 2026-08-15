import Link from "next/link";
import { ROCKETS } from "@/data/rockets";

export default function NotFound() {
  const suggestions = ROCKETS.slice(-4).reverse();

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-[13px] text-accent">404 · 未入轨</p>
      <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-fg">
        这个页面不在轨道上
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
        你要找的型号可能尚未收录，或者链接已经变化。
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/rockets"
          className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          浏览全部火箭
        </Link>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-[13px] font-medium text-fg hover:border-accent"
        >
          回到首页
        </Link>
      </div>

      <div className="mt-12 w-full">
        <p className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">最近加入</p>
        <ul className="mt-3 space-y-px overflow-hidden rounded-xl border border-border-base text-left">
          {suggestions.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/rocket/${r.slug}`}
                className="flex items-baseline justify-between bg-panel px-4 py-3 hover:bg-bg-elevated"
              >
                <span className="text-[14px] text-fg">{r.nameZh}</span>
                <span className="text-[11px] text-fg-subtle tabular">
                  {r.countryZh} · {r.firstFlight.slice(0, 4)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
