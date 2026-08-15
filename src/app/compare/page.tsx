import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { toSummary } from "@/lib/summary";
import { CompareBoard } from "@/components/compare/compare-board";

export const metadata: Metadata = {
  title: "对比工具",
  description:
    "并排对比最多 4 枚运载火箭：等比尺寸剪影、关键性能条形图、规格对照表与设计哲学并置。",
};

export default function ComparePage() {
  const rockets = ROCKETS.map(toSummary);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">对比工具</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
          把 2–4 枚火箭放在同一把尺子下。尺寸剪影与 3D 查看器使用同一份参数化几何，
          性能条形图按每个指标独立归一化——注意载荷比这类<span className="text-fg">比值型</span>
          指标，它比绝对运力更能说明设计效率。
        </p>
      </header>

      <CompareBoard rockets={rockets} />
    </div>
  );
}
