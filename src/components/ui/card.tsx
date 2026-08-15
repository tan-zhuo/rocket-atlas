import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border border-border-base bg-panel", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border-base px-5 py-3.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-5 py-4", className)} {...props} />;
}

/** 参数条目：左标签右数值，等宽数字对齐 */
export function SpecRow({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-border-base/70 py-2 last:border-0",
        className,
      )}
    >
      <dt className="text-[13px] text-fg-muted">{label}</dt>
      <dd className="text-right">
        <span className="tabular text-[13px] text-fg">{value}</span>
        {sub ? <span className="ml-2 text-[11px] text-fg-subtle">{sub}</span> : null}
      </dd>
    </div>
  );
}
