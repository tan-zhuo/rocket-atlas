import type { MetadataRoute } from "next";
import { ROCKETS } from "@/data/rockets";
import { FAMILIES } from "@/data/families";
import { PRINCIPLES } from "@/data/principles";
import { ENGINES } from "@/data/engines-index";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

/**
 * 每条路径都给出两种语言，并用 alternates 互相声明，避免被判为重复内容。
 *
 * 刻意不写 lastModified：站点没有真实的逐页修改时间，
 * 用构建时间戳会让每次部署都宣称「全站都改了」，反而浪费爬取预算。
 */
function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_META[l].htmlLang] = `${SITE_URL}/${l}${path}`;
  languages["x-default"] = `${SITE_URL}/zh${path}`;

  return LOCALES.map((lang: Locale) => ({
    url: `${SITE_URL}/${lang}${path}`,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: [string, number][] = [
    ["", 1],
    ["/rockets", 0.9],
    ["/engines", 0.9],
    ["/engines/anatomy", 0.8],
    ["/principles", 0.8],
    ["/compare", 0.7],
    ["/timeline", 0.7],
    ["/lab", 0.6],
    ["/about", 0.5],
  ];

  return [
    ...staticRoutes.flatMap(([p, pr]) => entry(p, "weekly", pr)),
    ...ROCKETS.flatMap((r) => entry(`/rocket/${r.slug}`, "monthly", 0.9)),
    ...ENGINES.flatMap((e) => entry(`/engine/${e.slug}`, "monthly", 0.7)),
    ...PRINCIPLES.flatMap((p) => entry(`/principles/${p.slug}`, "monthly", 0.7)),
    ...FAMILIES.flatMap((f) => entry(`/family/${f.slug}`, "monthly", 0.6)),
  ];
}
