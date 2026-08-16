import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { THEME_INIT_SCRIPT } from "@/components/layout/theme-toggle";
import { buildSearchIndex } from "@/lib/search-index";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";
import { JsonLd } from "@/components/seo/json-ld";
import { AUTHOR_NAME, AUTHOR_URL, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "zh";
  const zh = locale === "zh";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: zh
        ? "RocketAtlas · 火箭为什么长成这样"
        : "RocketAtlas · Why rockets look the way they do",
      template: "%s · RocketAtlas",
    },
    description: zh
      ? "把每一枚运载火箭与它的发动机拆开：可交互 3D 结构、逐级参数、设计权衡问答与原理专题。全部内容基于可查证的公开资料。"
      : "Every launch vehicle and engine taken apart: interactive 3D structure, stage-by-stage numbers, design trade-off Q&A and principle deep-dives — all built from verifiable public sources.",
    keywords: zh
      ? ["运载火箭", "航天", "3D", "百科", "火箭方程", "可回收火箭", "推进剂"]
      : ["launch vehicle", "rocket", "spaceflight", "3D", "rocket equation", "reusability", "propellant"],
    // 这里**故意不写 alternates**：Next 的 metadata 逐字段继承，
    // 在 layout 上声明 canonical 会让所有子页面都指向首页。
    // canonical / hreflang 一律由各页的 pageMeta() 负责。
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    creator: AUTHOR_NAME,
    publisher: SITE_NAME,
    category: zh ? "航天" : "Spaceflight",
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].htmlLang,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image" },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const docs = buildSearchIndex(lang);
  const zh = lang === "zh";
  const siteDescription = zh
    ? "把每一枚运载火箭与它的发动机拆开：可交互 3D 结构、逐级参数、设计权衡问答与原理专题。"
    : "Every launch vehicle and engine taken apart: interactive 3D structure, stage-by-stage numbers, design trade-off Q&A and principle deep-dives.";

  return (
    <html
      lang={LOCALE_META[lang].htmlLang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd nodes={[organizationJsonLd(), websiteJsonLd(lang, siteDescription)]} />
      </head>
      <body className="flex min-h-full flex-col">
        <I18nProvider lang={lang}>
          <SiteHeader docs={docs} />
          <main className="flex-1">{props.children}</main>
          <SiteFooter />
        </I18nProvider>
      </body>
    </html>
  );
}
