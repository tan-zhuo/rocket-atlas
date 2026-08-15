"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { LOCALES, LOCALE_META, switchLocalePath } from "@/i18n/config";

/**
 * 语言切换。切换时保留当前路径（/en/rocket/saturn-v ↔ /zh/rocket/saturn-v），
 * 因为两种语言的路由结构完全一致，读者不会被弹回首页。
 */
export function LanguageToggle({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, t } = useI18n();
  const [open, setOpen] = React.useState(false);

  function pick(next: (typeof LOCALES)[number]) {
    setOpen(false);
    if (next === lang) return;
    router.push(switchLocalePath(pathname, next));
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.nav.language}
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-md px-2 text-[12px] text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg"
      >
        <Languages className="size-4" />
        <span className="tabular">{LOCALE_META[lang].short}</span>
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            role="presentation"
          />
          <ul className="absolute right-0 z-50 mt-1 w-36 overflow-hidden rounded-lg border border-border-strong bg-panel py-1 shadow-xl">
            {LOCALES.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => pick(l)}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-2 text-left text-[13px]",
                    l === lang ? "bg-accent-soft text-accent" : "text-fg-muted hover:bg-bg-elevated",
                  )}
                >
                  {LOCALE_META[l].label}
                  <span className="text-[10px] tabular">{LOCALE_META[l].short}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
