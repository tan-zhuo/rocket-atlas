import type { MetadataRoute } from "next";
import { ROCKETS } from "@/data/rockets";
import { FAMILIES } from "@/data/families";
import { PRINCIPLES } from "@/data/principles";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocket-atlas.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/rockets", "/compare", "/principles", "/timeline", "/lab", "/about"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...ROCKETS.map((r) => ({
      url: `${BASE}/rocket/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...FAMILIES.map((f) => ({
      url: `${BASE}/family/${f.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...PRINCIPLES.map((p) => ({
      url: `${BASE}/principles/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
