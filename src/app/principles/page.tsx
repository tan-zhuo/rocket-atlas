import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PRINCIPLES } from "@/data/principles";
import { getRocket } from "@/data/rockets";

export const metadata: Metadata = {
  title: "原理专题",
  description:
    "火箭方程与分级优化、推进剂与动力循环、可回收技术的经济学、结构与材料、制导导航控制——运载火箭设计中反复出现的核心权衡。",
};

export default function PrinciplesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">原理专题</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
          与其在每个型号页重复解释同一件事，不如把共通的原理抽出来单独讲透。
          每篇专题都以「为什么会这样」而不是「它是什么」为主线，并在末尾链接到应用了该原理的具体火箭。
        </p>
      </header>

      <div className="mt-10 space-y-4">
        {PRINCIPLES.map((p, i) => (
          <Link
            key={p.slug}
            href={`/principles/${p.slug}`}
            className="group block rounded-xl border border-border-base bg-panel p-6 transition-colors hover:border-accent"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 text-[11px] text-fg-subtle">
                  <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />约 {p.readingMinutes} 分钟
                  </span>
                  <span>{p.titleEn}</span>
                </div>
                <h2 className="mt-2 text-[19px] font-semibold tracking-tight text-fg group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2.5 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
                  {p.summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[11px] text-fg-subtle">
                  <span>典型案例：</span>
                  {p.examples.map((e) => {
                    const r = getRocket(e.slug);
                    return r ? (
                      <span
                        key={e.slug}
                        className="rounded border border-border-base px-1.5 py-0.5 text-fg-muted"
                      >
                        {r.nameZh}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
              <ArrowRight className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
