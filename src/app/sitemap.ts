import type { MetadataRoute } from "next";
import { ROCKETS } from "@/data/rockets";
import { FAMILIES } from "@/data/families";
import { PRINCIPLES } from "@/data/principles";
import { LOCALES } from "@/i18n/config";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocket-atlas.example";

/** 每条路径都给出两种语言，并用 alternates 互相声明，避免被判为重复内容 */
function entry(path: string, changeFrequency: "weekly" | "monthly", priority: number) {
  return LOCALES.map((lang) => ({
    url: `${BASE}/${lang}${path}`,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l === "zh" ? "zh-Hans" : l, `${BASE}/${l}${path}`]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/rockets", "/compare", "/principles", "/timeline", "/lab", "/about"];

  return [
    ...staticRoutes.flatMap((p) => entry(p, "weekly", p === "" ? 1 : 0.8)),
    ...ROCKETS.flatMap((r) => entry(`/rocket/${r.slug}`, "monthly", 0.9)),
    ...FAMILIES.flatMap((f) => entry(`/family/${f.slug}`, "monthly", 0.6)),
    ...PRINCIPLES.flatMap((p) => entry(`/principles/${p.slug}`, "monthly", 0.7)),
  ];
}
