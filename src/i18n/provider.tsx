"use client";

import * as React from "react";
import type { Locale } from "./config";
import { getDict, type Dict } from "./dict";

/**
 * 客户端组件的语言上下文。
 * 服务端组件不需要它——它们直接用 next/root-params 读 lang（见 server.ts）。
 */
const I18nContext = React.createContext<{ lang: Locale; t: Dict } | null>(null);

/**
 * 只把 `lang` 跨越服务端/客户端边界传递，字典在客户端本地取。
 * 字典里有 `(n) => string` 这样的插值函数，无法作为 RSC props 序列化。
 */
export function I18nProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ lang, t: getDict(lang) }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n 必须在 <I18nProvider> 内使用");
  return ctx;
}
