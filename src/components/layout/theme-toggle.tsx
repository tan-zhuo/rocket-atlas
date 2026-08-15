"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("atlas-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

/**
 * 真实主题存在于 <html data-theme> 上（由内联脚本在首屏前写入），
 * 这里用 useSyncExternalStore 订阅它，而不是在 effect 里同步一份副本——
 * 这样服务端渲染与首帧一致，也不会产生级联渲染。
 */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function readTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = React.useSyncExternalStore(
    subscribeTheme,
    readTheme,
    () => "dark" as const,
  );

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("atlas-theme", next);
    } catch {
      /* 隐私模式下忽略 */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "切换到浅色主题" : "切换到深色主题"}
      className={cn(
        "grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-elevated hover:text-fg",
        className,
      )}
    >
      {theme === "dark" ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </button>
  );
}
