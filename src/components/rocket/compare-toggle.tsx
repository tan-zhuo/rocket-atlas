"use client";

import * as React from "react";
import { Check, GitCompare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAX_COMPARE, useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/client-hooks";

/**
 * 加入/移出对比。列表卡片用 icon 形态，详情页用 button 形态。
 * 用 mounted 门控避免 localStorage 持久化状态导致的 hydration 不一致。
 */
export function CompareToggle({
  slug,
  variant = "icon",
  className,
}: {
  slug: string;
  variant?: "icon" | "button";
  className?: string;
}) {
  const slugs = useCompare((s) => s.slugs);
  const toggle = useCompare((s) => s.toggle);
  const mounted = useHydrated();

  const selected = mounted && slugs.includes(slug);
  const full = mounted && !selected && slugs.length >= MAX_COMPARE;

  const label = selected ? "已在对比中" : full ? `最多对比 ${MAX_COMPARE} 个` : "加入对比";

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        disabled={full}
        title={label}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[13px] font-medium transition-colors disabled:opacity-45",
          selected
            ? "border-accent/40 bg-accent-soft text-accent"
            : "border-border-strong text-fg hover:border-accent",
          className,
        )}
      >
        {selected ? <Check className="size-3.5" /> : <GitCompare className="size-3.5" />}
        {selected ? "已加入对比" : "加入对比"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      disabled={full}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-7 place-items-center rounded-md border transition-colors disabled:opacity-35",
        selected
          ? "border-accent/40 bg-accent-soft text-accent"
          : "border-border-base bg-panel/80 text-fg-subtle hover:border-accent hover:text-accent",
        className,
      )}
    >
      {selected ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
    </button>
  );
}
