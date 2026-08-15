"use client";

import dynamic from "next/dynamic";
import type { ShowcaseItem } from "./hero-showcase";

/**
 * 首页 3D 展示位的挂载点。
 * three.js 走动态导入，不参与 SSR，也不阻塞首屏 LCP。
 */
const HeroShowcase = dynamic(() => import("./hero-showcase").then((m) => m.HeroShowcase), {
  ssr: false,
  loading: () => (
    <div
      className="h-[340px] animate-pulse rounded-2xl border border-border-base sm:h-[420px] lg:h-[520px]"
      style={{ background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))" }}
    />
  ),
});

export function HeroMount({ items }: { items: ShowcaseItem[] }) {
  return <HeroShowcase items={items} />;
}
