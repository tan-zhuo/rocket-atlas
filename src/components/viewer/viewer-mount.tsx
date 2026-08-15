"use client";

import dynamic from "next/dynamic";
import type { RocketGeometry } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * 3D 查看器的按需挂载点。
 * three.js + R3F 约 600 KB，只在详情页 / 实验室页加载，且不参与 SSR。
 */
const RocketViewer = dynamic(
  () => import("./rocket-viewer").then((m) => m.RocketViewer),
  {
    ssr: false,
    loading: () => <ViewerSkeleton />,
  },
);

export function ViewerMount({
  geometry,
  name,
  className,
}: {
  geometry: RocketGeometry;
  name: string;
  className?: string;
}) {
  return <RocketViewer geometry={geometry} name={name} className={className} />;
}

function ViewerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid min-h-[460px] place-items-center rounded-xl border border-border-base",
        className,
      )}
      style={{ background: "linear-gradient(180deg, var(--viewer-bg-a), var(--viewer-bg-b))" }}
    >
      <div className="flex flex-col items-center gap-3 text-fg-subtle">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-pulse rounded-full bg-accent"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </div>
        <p className="text-[12px]">3D</p>
      </div>
    </div>
  );
}
