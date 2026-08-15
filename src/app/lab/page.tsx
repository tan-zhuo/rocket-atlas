import type { Metadata } from "next";
import { ROCKETS } from "@/data/rockets";
import { LabClient, type LabEntry } from "@/components/viewer/lab-client";

export const metadata: Metadata = {
  title: "3D 实验室",
  description:
    "在一个页面里自由切换所有参数化 3D 模型：旋转、缩放、爆炸视图、点击部件读设计说明。",
};

export default function LabPage() {
  const entries: LabEntry[] = ROCKETS.map((r) => ({
    slug: r.slug,
    nameZh: r.nameZh,
    name: r.name,
    countryZh: r.countryZh,
    height: r.height,
    geometry: r.geometry,
  }));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">3D 实验室</h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-fg-muted">
          所有模型在一个页面里自由切换。拖拽旋转、滚轮缩放、拉动滑块展开爆炸视图，
          点击任意部件读它的设计说明。橙色人形是 1.8 m 比例尺——
          它比任何数字都更能说明这些东西到底有多大。
        </p>
      </header>

      <LabClient entries={entries} />
    </div>
  );
}
