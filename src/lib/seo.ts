import type { Metadata } from "next";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";

/**
 * 站点级 SEO 工具。
 *
 * 这里解决的核心问题是**每一页都要声明自己的 canonical 与 hreflang**。
 * Next 的 metadata 是逐字段继承的：只要根 layout 写了 `alternates`，
 * 所有子页面在没有覆盖时都会继承它——于是 293 个页面全部把
 * canonical 指向首页，搜索引擎会把它们当成重复内容整批丢掉。
 * 所以每个 `generateMetadata` 都必须显式调用 `pageMeta()`。
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocket-atlas.example"
).replace(/\/$/, "");

export const SITE_NAME = "RocketAtlas";
export const AUTHOR_NAME = "tanzhuo";
export const AUTHOR_URL = "https://tanzhuo.xyz";
export const REPO_URL = "https://github.com/tan-zhuo/rocket-atlas";

/** hreflang 用的语言标签：zh → zh-Hans */
function hreflang(l: Locale) {
  return LOCALE_META[l].htmlLang;
}

/** `/rocket/saturn-v` → `https://…/zh/rocket/saturn-v` */
export function absUrl(lang: Locale, path = ""): string {
  // 空串与 "/" 都表示语言首页——不能落到 `/${path}` 那一支，
  // 否则会生成 `/zh/`，与实际服务的 `/zh` 差一个尾斜杠
  const clean = path === "" || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${lang}${clean}`;
}

/**
 * 一页的 canonical + hreflang。
 *
 * x-default 指向中文版：`/` 会重定向到 `/zh`，所以它才是「语言未匹配时」
 * 真正会落到的地址。
 */
export function alternatesFor(lang: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[hreflang(l)] = absUrl(l, path);
  languages["x-default"] = absUrl("zh", path);
  return { canonical: absUrl(lang, path), languages };
}

export interface PageMetaInput {
  lang: Locale;
  /** 不含语言前缀的路径，如 `/rocket/saturn-v` */
  path?: string;
  title: string;
  description: string;
  /** 列表页与首页用 website，内容页用 article */
  type?: "website" | "article";
  /** 覆盖 OG 图片；缺省时由该路由段的 opengraph-image 自动接管 */
  images?: string[];
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * 页面级 metadata 的统一出口：canonical / hreflang / OG / Twitter 一次给全。
 * 只返回需要覆盖的字段，其余（metadataBase、siteName、模板标题）继承根 layout。
 */
export function pageMeta({
  lang,
  path = "",
  title,
  description,
  type = "website",
  images,
  keywords,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absUrl(lang, path);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: alternatesFor(lang, path),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: hreflang(lang),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ── 结构化数据 ───────────────────────────────────────────────────
 * 只声明页面上确实存在的东西。没有真实发布日期就不写 datePublished，
 * 没有 `?q=` 搜索路由就不写 SearchAction——伪造结构化数据会被降权。
 */

type Json = Record<string, unknown>;

export function organizationJsonLd(): Json {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [REPO_URL, AUTHOR_URL],
    founder: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL },
  };
}

export function websiteJsonLd(lang: Locale, description: string): Json {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: absUrl(lang),
    description,
    inLanguage: hreflang(lang),
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** 面包屑：数组顺序即层级，最后一项是当前页 */
export function breadcrumbJsonLd(
  lang: Locale,
  items: { name: string; path?: string }[],
): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path !== undefined ? { item: absUrl(lang, it.path) } : {}),
    })),
  };
}

export function techArticleJsonLd({
  lang,
  path,
  headline,
  description,
  image,
  about,
}: {
  lang: Locale;
  path: string;
  headline: string;
  description: string;
  image?: string;
  about?: string;
}): Json {
  return {
    "@type": "TechArticle",
    "@id": `${absUrl(lang, path)}#article`,
    headline,
    description,
    inLanguage: hreflang(lang),
    mainEntityOfPage: absUrl(lang, path),
    ...(image ? { image } : {}),
    ...(about ? { about: { "@type": "Thing", name: about } } : {}),
    author: { "@type": "Person", name: AUTHOR_NAME, url: AUTHOR_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    license: REPO_URL,
  };
}

/**
 * 设计权衡那一栏本来就是问答式的，直接映射成 FAQPage。
 * 答案里有 Markdown 与 KaTeX，先剥成纯文本再交给搜索引擎。
 */
export function faqJsonLd(qa: { question: string; answer: string }[]): Json | null {
  if (qa.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.question,
      acceptedAnswer: { "@type": "Answer", text: stripMarkdown(x.answer) },
    })),
  };
}

export function itemListJsonLd(
  lang: Locale,
  items: { name: string; path: string }[],
): Json {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absUrl(lang, it.path),
    })),
  };
}

/** 把 Markdown + KaTeX 压成一段可读的纯文本，供结构化数据使用 */
export function stripMarkdown(md: string, max = 1200): string {
  const text = md
    .replace(/\$\$[\s\S]*?\$\$/g, " ") // 块级公式
    .replace(/\$[^$\n]*\$/g, " ") // 行内公式
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^\s*\|.*\|\s*$/gm, " ") // 表格整行去掉
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]/g, "")
    .replace(/^\s*[-+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** 打包成一个 @graph，页面只需要插一个 script */
export function jsonLdGraph(nodes: (Json | null)[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  });
}
