import { ROCKETS } from "@/data/rockets";
import { FAMILIES } from "@/data/families";
import { PRINCIPLES } from "@/data/principles";
import type { Locale } from "@/i18n/config";
import { localizeFamily, localizePrinciple, localizeRocket } from "@/i18n/localize";
import { ENGINES } from "@/data/engines-index";
import { getEngineDetail } from "@/data/engines";

export interface SearchDoc {
  kind: "rocket" | "engine" | "family" | "principle";
  slug: string;
  title: string;
  subtitle: string;
  /** 用于匹配的小写关键词串 */
  terms: string;
  href: string;
}

/**
 * 全站搜索索引 —— 只包含标题级信息，不含正文。
 * 在服务端构建、以 props 传给客户端搜索框，避免把上百 KB 的长文打进 bundle。
 */
export function buildSearchIndex(lang: Locale = "zh"): SearchDoc[] {
  const rockets: SearchDoc[] = ROCKETS.map((raw) => localizeRocket(raw, lang)).map((r) => ({
    kind: "rocket",
    slug: r.slug,
    title: r.nameZh,
    subtitle: `${r.name} · ${r.countryZh} · ${r.firstFlight.slice(0, 4)}`,
    terms: [
      r.name,
      r.nameZh,
      r.slug,
      r.countryZh,
      r.country,
      ...r.agency,
      ...r.tags,
      ...r.stages.flatMap((s) => s.engines.map((e) => `${e.name} ${e.nameZh ?? ""}`)),
    ]
      .join(" ")
      .toLowerCase(),
    href: `/${lang}/rocket/${r.slug}`,
  }));

  const families: SearchDoc[] = FAMILIES.map((raw) => localizeFamily(raw, lang)).map((f) => ({
    kind: "family",
    slug: f.slug,
    title: f.nameZh,
    subtitle:
      lang === "zh"
        ? `家族 · ${f.countryZh} · ${f.lineage.length} 个型号`
        : `Family · ${f.countryZh} · ${f.lineage.length} vehicles`,
    terms: [f.name, f.nameZh, f.slug, f.countryZh, ...f.lineage.map((l) => l.name)]
      .join(" ")
      .toLowerCase(),
    href: `/${lang}/family/${f.slug}`,
  }));

  const principles: SearchDoc[] = PRINCIPLES.map((raw) => localizePrinciple(raw, lang)).map((p) => ({
    kind: "principle",
    slug: p.slug,
    title: p.title,
    subtitle:
      lang === "zh"
        ? `原理专题 · 约 ${p.readingMinutes} 分钟`
        : `Principle · ${p.readingMinutes} min read`,
    terms: [p.title, p.titleEn, p.slug, p.summary].join(" ").toLowerCase(),
    href: `/${lang}/principles/${p.slug}`,
  }));

  const engines: SearchDoc[] = ENGINES.map((e) => {
    const d = getEngineDetail(e.key, lang) ?? e.detail;
    const name = lang === "en" ? e.detail.displayEn : e.detail.displayZh;
    return {
      kind: "engine" as const,
      slug: e.slug,
      title: name,
      subtitle:
        lang === "zh"
          ? `发动机 · ${e.detail.countryZh} · ${d.maker ?? ""}`
          : `Engine · ${e.detail.country} · ${d.maker ?? ""}`,
      terms: [e.key, e.detail.displayZh, e.detail.displayEn, e.slug, d.maker ?? "", d.fuel]
        .join(" ")
        .toLowerCase(),
      href: `/${lang}/engine/${e.slug}`,
    };
  });

  return [...rockets, ...engines, ...families, ...principles];
}

export function searchDocs(docs: SearchDoc[], q: string, limit = 8): SearchDoc[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const scored = docs
    .map((d) => {
      const title = d.title.toLowerCase();
      let score = 0;
      if (title === needle) score = 100;
      else if (title.startsWith(needle)) score = 80;
      else if (title.includes(needle)) score = 60;
      else if (d.terms.includes(needle)) score = 30;
      // 型号页优先于家族/专题
      if (score && d.kind === "rocket") score += 5;
      return { d, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.d);
}
