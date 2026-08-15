/**
 * 站点语言配置。
 *
 * 路由形态：/zh/... 与 /en/...，中文为默认语言（`/` 由 next.config 重定向到 /zh）。
 * 选择 URL 前缀而不是 cookie/Accept-Language 自动切换，是因为本站的内容
 * 需要能被稳定地分享与索引——同一条链接对所有人应该是同一种语言。
 */

export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";

export const LOCALE_META: Record<Locale, { label: string; htmlLang: string; short: string }> = {
  zh: { label: "简体中文", htmlLang: "zh-Hans", short: "中" },
  en: { label: "English", htmlLang: "en", short: "EN" },
};

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** 给内部链接加上语言前缀：`/rockets` → `/en/rockets` */
export function localePath(lang: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** 把当前路径切换到另一种语言，保留其余部分 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) {
    parts[0] = next;
    return `/${parts.join("/")}`;
  }
  return localePath(next, pathname);
}
