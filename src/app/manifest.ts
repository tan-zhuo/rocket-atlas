import type { MetadataRoute } from "next";

/**
 * Web App Manifest。
 * 主要是为了移动端「添加到主屏幕」时有正确的名字与图标；
 * 它同时也是搜索引擎判断站点身份的一个信号。
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RocketAtlas · 火箭为什么长成这样",
    short_name: "RocketAtlas",
    description:
      "把每一枚运载火箭与它的发动机拆开：可交互 3D 结构、逐级参数、设计权衡问答与原理专题。",
    start_url: "/zh",
    scope: "/",
    display: "standalone",
    background_color: "#0b0e14",
    theme_color: "#ff7a2f",
    lang: "zh-Hans",
    categories: ["education", "reference", "science"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
