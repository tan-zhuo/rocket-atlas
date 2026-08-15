import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { toSummary } from "@/lib/summary";
import { filterOptionsFrom } from "@/lib/filters";
import { RocketBrowser } from "@/components/rocket/rocket-browser";

export const metadata: Metadata = {
  title: "全部火箭",
  description:
    "按国家、状态、推进剂、级数、年代与可回收性筛选全球运载火箭，支持卡片与表格两种视图，可勾选进入并排对比。",
};

export default function RocketsPage() {
  const summaries = ROCKETS.map(toSummary);
  const options = filterOptionsFrom(summaries);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">火箭百科</h1>
        <p className="mt-2.5 max-w-3xl text-[14px] leading-relaxed text-fg-muted">
          目前收录 {summaries.length} 个型号，覆盖从 1942 年的 V-2 到在研的星舰。
          每个型号页包含 3D 结构、分级参数、设计权衡问答与来源标注。
          勾选卡片右上角的「+」可加入对比（最多 4 个）。
        </p>
      </header>

      <RocketBrowser rockets={summaries} options={options} />
    </div>
  );
}
