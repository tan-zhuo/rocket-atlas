import type { Metadata } from "next";
import { TIMELINE_SORTED } from "@/data/timeline";
import { TimelineView } from "@/components/timeline/timeline-view";

export const metadata: Metadata = {
  title: "发展时间线",
  description:
    "从 1926 年戈达德的第一枚液体火箭到今天的塔臂捕获助推器——全球运载火箭发展史上的关键节点、型号首飞与重大失败。",
};

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">全球运载火箭发展时间线</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
          我们刻意把<span className="text-fg">重大失败</span>与里程碑并列——
          运载火箭的技术演进有相当一部分是由事故调查报告推动的，
          略去失败就看不懂后续设计为什么会那样改。
        </p>
      </header>

      <TimelineView events={TIMELINE_SORTED} />
    </div>
  );
}
