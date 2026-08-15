"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchDocs, type SearchDoc } from "@/lib/search-index";

const KIND_LABEL: Record<SearchDoc["kind"], string> = {
  rocket: "火箭",
  family: "家族",
  principle: "专题",
};

export function SearchDialog({ docs }: { docs: SearchDoc[] }) {
  // 查询词与光标位置放在同一份状态里：改查询词时光标自然回到 0，
  // 不需要额外的同步 effect。
  const [{ open, q, cursor }, setState] = React.useState({
    open: false,
    q: "",
    cursor: 0,
  });
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => searchDocs(docs, q), [docs, q]);

  const openDialog = React.useCallback(
    () => setState({ open: true, q: "", cursor: 0 }),
    [],
  );
  const closeDialog = React.useCallback(
    () => setState({ open: false, q: "", cursor: 0 }),
    [],
  );

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setState((s) => (s.open ? { open: false, q: "", cursor: 0 } : { open: true, q: "", cursor: 0 }));
      }
      if (e.key === "Escape") setState((s) => (s.open ? { open: false, q: "", cursor: 0 } : s));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => clearTimeout(t);
  }, [open]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setState((s) => ({ ...s, cursor: Math.min(s.cursor + 1, results.length - 1) }));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setState((s) => ({ ...s, cursor: Math.max(s.cursor - 1, 0) }));
    }
    if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      closeDialog();
      router.push(results[cursor].href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="flex h-9 items-center gap-2 rounded-md border border-border-base bg-bg-elevated px-2.5 text-[13px] text-fg-subtle transition-colors hover:border-border-strong hover:text-fg-muted sm:w-56 sm:justify-between"
      >
        <span className="flex items-center gap-2">
          <Search className="size-3.5" />
          <span className="hidden sm:inline">搜索火箭、发动机…</span>
        </span>
        <kbd className="hidden rounded border border-border-base bg-bg px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={closeDialog}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="全站搜索"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border-strong bg-panel shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border-base px-4">
              <Search className="size-4 shrink-0 text-fg-subtle" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setState((s) => ({ ...s, q: e.target.value, cursor: 0 }))}
                onKeyDown={onInputKey}
                placeholder="火箭名、发动机、国家、家族…"
                className="h-12 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-subtle"
              />
              <button
                type="button"
                onClick={closeDialog}
                aria-label="关闭搜索"
                className="shrink-0 text-fg-subtle hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>

            {q && results.length === 0 ? (
              <p className="px-4 py-8 text-center text-[13px] text-fg-subtle">
                没有匹配「{q}」的结果
              </p>
            ) : null}

            {results.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1.5">
                {results.map((d, i) => (
                  <li key={`${d.kind}-${d.slug}`}>
                    <Link
                      href={d.href}
                      onClick={closeDialog}
                      onMouseEnter={() => setState((s) => ({ ...s, cursor: i }))}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 text-sm",
                        i === cursor ? "bg-accent-soft" : "",
                      )}
                    >
                      <span className="w-9 shrink-0 rounded border border-border-base px-1 py-0.5 text-center text-[10px] text-fg-subtle">
                        {KIND_LABEL[d.kind]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-fg">{d.title}</span>
                        <span className="block truncate text-[11px] text-fg-subtle">
                          {d.subtitle}
                        </span>
                      </span>
                      {i === cursor ? (
                        <CornerDownLeft className="size-3.5 shrink-0 text-fg-subtle" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {!q ? (
              <p className="px-4 py-6 text-center text-[12px] text-fg-subtle">
                输入关键词开始搜索 · ↑↓ 选择 · Enter 打开
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
