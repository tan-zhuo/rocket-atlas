import { lang as langParam } from "next/root-params";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";
import { getDict, type Dict } from "./dict";

/**
 * 服务端组件读取当前语言。
 * `[lang]` 位于根布局之前，因此是「根参数」，任何服务端组件都能直接读，
 * 不需要一层层往下传 props。
 */
export async function getLang(): Promise<Locale> {
  const v = await langParam();
  return v && isLocale(v) ? v : DEFAULT_LOCALE;
}

export async function getServerDict(): Promise<Dict> {
  return getDict(await getLang());
}

export type { Dict };
