"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { RocketStatus } from "@/data/types";
import { useI18n } from "@/i18n/provider";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "border-border-base bg-bg-elevated text-fg-muted",
        accent: "border-accent/35 bg-accent-soft text-accent",
        data: "border-data/30 bg-data-soft text-data",
        ok: "border-transparent bg-[color-mix(in_srgb,var(--ok)_16%,transparent)] text-[var(--ok)]",
        warn: "border-transparent bg-[color-mix(in_srgb,var(--warn)_16%,transparent)] text-[var(--warn)]",
        danger:
          "border-transparent bg-[color-mix(in_srgb,var(--danger)_16%,transparent)] text-[var(--danger)]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export const STATUS_TONE: Record<RocketStatus, "ok" | "neutral" | "warn" | "danger"> = {
  active: "ok",
  retired: "neutral",
  development: "warn",
  cancelled: "danger",
};

export function StatusBadge({ status, className }: { status: RocketStatus; className?: string }) {
  const { t } = useI18n();
  const tone = STATUS_TONE[status];
  return (
    <Badge tone={tone} className={className}>
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-current"
        style={{ boxShadow: "0 0 0 3px color-mix(in srgb, currentColor 20%, transparent)" }}
      />
      {t.status[status]}
    </Badge>
  );
}
