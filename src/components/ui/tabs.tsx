"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useHash } from "@/lib/client-hooks";

export interface TabDef {
  id: string;
  label: string;
  /** 右上角小计数，如「5」 */
  hint?: string;
}

/**
 * 受控 Tab 容器。
 * panels 与 tabs 按索引对应；panels 里的内容可以是服务端渲染好的 React 节点，
 * 因此详情页的长文与表格不会被打包进客户端 bundle。
 *
 * syncHash 打开时，当前 tab 由 URL hash 派生（而不是用 effect 去同步），
 * 这样直接打开 /rocket/xxx#design 就能落到对应分区。
 */
export function Tabs({
  tabs,
  panels,
  initial,
  className,
  syncHash = false,
}: {
  tabs: TabDef[];
  panels: React.ReactNode[];
  initial?: string;
  className?: string;
  syncHash?: boolean;
}) {
  const hash = useHash();
  const [override, setOverride] = React.useState<string | null>(null);

  const fromHash = syncHash && tabs.some((t) => t.id === hash) ? hash : null;
  const active = override ?? fromHash ?? initial ?? tabs[0]?.id;

  function select(id: string) {
    setOverride(id);
    if (syncHash) history.replaceState(null, "", `#${id}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = tabs.findIndex((t) => t.id === active);
    if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length].id);
    if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length].id);
  }

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.id === active),
  );

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="内容分区"
        onKeyDown={onKeyDown}
        className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-border-base px-1"
      >
        {tabs.map((t, i) => {
          const on = i === activeIndex;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(t.id)}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors",
                on ? "text-fg" : "text-fg-subtle hover:text-fg-muted",
              )}
            >
              {t.label}
              {t.hint ? (
                <span className="ml-1.5 text-[11px] text-fg-subtle tabular">{t.hint}</span>
              ) : null}
              {on ? (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
              ) : null}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={i !== activeIndex}
          className="pt-6"
        >
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
