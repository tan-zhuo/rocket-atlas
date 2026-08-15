"use client";

import { L } from "@/components/ui/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu, X, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";
import type { SearchDoc } from "@/lib/search-index";
import { useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/client-hooks";
import { useI18n } from "@/i18n/provider";
import { LanguageToggle } from "./language-toggle";

const NAV: {
  href: string;
  key: "rockets" | "engines" | "compare" | "principles" | "timeline" | "lab" | "about";
}[] = [
  { href: "/rockets", key: "rockets" },
  { href: "/engines", key: "engines" },
  { href: "/compare", key: "compare" },
  { href: "/principles", key: "principles" },
  { href: "/timeline", key: "timeline" },
  { href: "/lab", key: "lab" },
  { href: "/about", key: "about" },
];

function CompareBadge() {
  const count = useCompare((s) => s.slugs.length);
  const hydrated = useHydrated();
  if (!hydrated || count === 0) return null;
  return (
    <span className="ml-1 rounded-full bg-accent px-1.5 py-px text-[10px] font-semibold text-accent-fg tabular">
      {count}
    </span>
  );
}

export function SiteHeader({ docs }: { docs: SearchDoc[] }) {
  const pathname = usePathname();
  const { t } = useI18n();
  // 菜单的展开状态绑定在「哪个页面上展开的」，导航到新页面时自动收起，
  // 不需要一个监听 pathname 的 effect。
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const menuOpen = openOn === pathname;

  // pathname 带语言前缀（/en/rockets），比较时先剥掉第一段
  function isActive(href: string) {
    const rest = "/" + pathname.split("/").filter(Boolean).slice(1).join("/");
    if (href === "/rockets") return rest === "/rockets" || rest.startsWith("/rocket/");
    if (href === "/engines") return rest.startsWith("/engine");
    if (href === "/principles") return rest.startsWith("/principles");
    return rest === href || rest.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-base bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <L href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-fg">{t.brand}</span>
        </L>

        <nav className="ml-4 hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <L
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-[13px] transition-colors",
                isActive(n.href)
                  ? "bg-bg-elevated text-fg"
                  : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
              )}
            >
              {t.nav[n.key]}
              {n.href === "/compare" ? <CompareBadge /> : null}
            </L>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog docs={docs} />
          <LanguageToggle />
          <ThemeToggle />
          <L
            href="/compare"
            aria-label={t.nav.compare}
            className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg lg:hidden"
          >
            <GitCompare className="size-4" />
          </L>
          <button
            type="button"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setOpenOn(menuOpen ? null : pathname)}
            className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-border-base bg-panel px-4 py-2 lg:hidden">
          {NAV.map((n) => (
            <L
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2.5 text-sm",
                isActive(n.href) ? "text-accent" : "text-fg-muted",
              )}
            >
              {t.nav[n.key]}
              {n.href === "/compare" ? <CompareBadge /> : null}
            </L>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

/**
 * 标志：一个「A」，同时是一副钟形喷管的母线——两条向下张开的曲线加一道横杆。
 * 这两件事恰好是站名（Atlas）和站的内容（火箭）的交集，
 * 而且在 16 px 的浏览器标签里依然认得出来。
 */
function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden fill="none">
      <rect width="32" height="32" rx="7" className="fill-accent" />
      <g
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M16 5.2 C 13.6 12.4 11 19 7.4 26" />
        <path d="M16 5.2 C 18.4 12.4 21 19 24.6 26" />
        <path d="M10.6 19.4 H 21.4" />
      </g>
    </svg>
  );
}
