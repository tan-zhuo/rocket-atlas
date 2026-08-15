"use client";

import dynamic from "next/dynamic";
import type { EngineModelSpec } from "@/data/engine-geometry";
import type { AnatomyPart } from "@/data/engine-anatomy";
import { cn } from "@/lib/utils";

/** three.js 走动态导入，不参与 SSR */
const EngineViewer = dynamic(() => import("./engine-viewer").then((m) => m.EngineViewer), {
  ssr: false,
  loading: () => (
    <div
      className="h-[420px] animate-pulse rounded-xl border border-border-base"
      style={{ background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))" }}
    />
  ),
});

export function EngineViewerMount({
  spec,
  parts,
  name,
  className,
}: {
  spec: EngineModelSpec;
  parts: AnatomyPart[];
  name: string;
  className?: string;
}) {
  return <EngineViewer spec={spec} parts={parts} name={name} className={cn(className)} />;
}
