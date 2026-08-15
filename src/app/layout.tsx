import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { THEME_INIT_SCRIPT } from "@/components/layout/theme-toggle";
import { buildSearchIndex } from "@/lib/search-index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rocket-atlas.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "运载火箭图谱 · 全球运载火箭百科",
    template: "%s · 运载火箭图谱",
  },
  description:
    "系统化、可视化、可交互的运载火箭公开知识平台。3D 结构、设计逻辑、横向对比与原理专题——不只讲「是什么」，更讲清楚「为什么这样设计」。",
  keywords: ["运载火箭", "航天", "3D", "百科", "火箭方程", "可回收火箭", "推进剂"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "运载火箭图谱",
    title: "运载火箭图谱 · 全球运载火箭百科",
    description:
      "3D 交互 + 设计逻辑讲解的运载火箭知识平台，覆盖从 V-2 到 Starship 的关键型号。",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const docs = buildSearchIndex();

  return (
    <html
      lang="zh-Hans"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader docs={docs} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
