"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { SearchDialog } from "./search-dialog";
import type { SearchDoc } from "@/lib/search-index";
import { useCompare } from "@/lib/store";
import { useHydrated } from "@/lib/client-hooks";

const NAV = [
  { href: "/rockets", label: "火箭百科" },
  { href: "/compare", label: "对比" },
  { href: "/principles", label: "原理专题" },
  { href: "/timeline", label: "时间线" },
  { href: "/lab", label: "3D 实验室" },
  { href: "/about", label: "关于" },
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
  // 菜单的展开状态绑定在「哪个页面上展开的」，导航到新页面时自动收起，
  // 不需要一个监听 pathname 的 effect。
  const [openOn, setOpenOn] = React.useState<string | null>(null);
  const menuOpen = openOn === pathname;

  function isActive(href: string) {
    if (href === "/rockets") return pathname.startsWith("/rocket");
    if (href === "/principles") return pathname.startsWith("/principles");
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-base bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-fg">
            运载火箭图谱
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center rounded-md px-3 py-1.5 text-[13px] transition-colors",
                isActive(n.href)
                  ? "bg-bg-elevated text-fg"
                  : "text-fg-muted hover:bg-bg-elevated hover:text-fg",
              )}
            >
              {n.label}
              {n.href === "/compare" ? <CompareBadge /> : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchDialog docs={docs} />
          <ThemeToggle />
          <Link
            href="/compare"
            aria-label="对比工具"
            className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg lg:hidden"
          >
            <GitCompare className="size-4" />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
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
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2.5 text-sm",
                isActive(n.href) ? "text-accent" : "text-fg-muted",
              )}
            >
              {n.label}
              {n.href === "/compare" ? <CompareBadge /> : null}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-accent" aria-hidden fill="none">
      <path
        d="M12 2c2.6 2.7 4 6.2 4 10v4.2l2 2.6V21l-3.2-1.4h-5.6L6 21v-2.2l2-2.6V12c0-3.8 1.4-7.3 4-10Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="12" cy="9.4" r="1.6" className="fill-bg" />
    </svg>
  );
}
