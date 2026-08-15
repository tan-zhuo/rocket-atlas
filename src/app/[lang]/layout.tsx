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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocket-atlas.example";

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
    alternates: {
      canonical: `/${locale}`,
      languages: { "zh-Hans": "/zh", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: LOCALE_META[locale].htmlLang,
      siteName: "RocketAtlas",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const docs = buildSearchIndex(lang);

  return (
    <html
      lang={LOCALE_META[lang].htmlLang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
