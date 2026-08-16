import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * 不禁止带查询串的 URL：全站每一页都有自指的 canonical，
 * 参数化重复交给 canonical 处理就够了。用 Disallow 挡住反而
 * 会让爬虫读不到那个 canonical 标签。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
