# RocketAtlas · 火箭为什么长成这样

把每一枚运载火箭与它的发动机拆开，讲清楚它为什么是这个样子。目标不是收集最多的参数，
而是把散落在 NASA 技术报告、发射服务用户手册、官方白皮书与事故调查报告里的公开信息，
整理成能回答 **「为什么不是别的方案」** 的知识结构。全站中英双语。

## 内容方法：三层结构

每个型号页都按同一套结构组织，避免变成参数堆砌：

| 层级 | 内容 | 承载方式 |
|---|---|---|
| **事实层** | 名称、国家、机构、首飞、级数、推进剂、推力、载荷能力、发射记录 | 结构化数据表 + 来源置信度标注 |
| **架构层** | 总体布局、分级逻辑、发动机配置、结构特点、回收方案 | 参数化 3D 查看器（旋转 / 爆炸 / 部件点击） |
| **原理层** | 为什么选这种推进剂与循环、为什么这样分级、结构与热管理的权衡 | 问答式「设计权衡」+ 横向原理专题 |

## 功能

- **火箭百科** `/rockets` — 31 个型号，10 个国家/地区，从 1942 年的 V-2 到 2025 年的新格伦；按国家、状态、推进剂、级数、年代、可回收性筛选，卡片 / 表格双视图
- **型号详情** `/rocket/[slug]` — 3D 查看器 + 六个内容分区（概览 / 设计逻辑 / 技术规格 / 发射历史 / 演进与家族 / 数据来源）
- **对比工具** `/compare` — 2–4 枚火箭并排：等比尺寸剪影、性能条形图、规格对照、设计哲学并置
- **原理专题** `/principles` — 火箭方程与分级优化、推进剂与动力循环、可回收经济学、结构与材料、制导导航控制（KaTeX 公式）
- **时间线** `/timeline` — 从 1926 年到今天，里程碑与重大失败并列
- **发动机** `/engines` — 73 型发动机目录（室压 × 比冲散点图、按循环/推进剂/国家筛选），
  每型有独立页：3D 模型、成对的「换来了什么 / 代价是什么」、装在哪些火箭上
- **发动机原理** `/engines/anatomy` — 可交互结构剖面、六种动力循环流程图、关键概念
- **3D 实验室** `/lab` — 一个页面里自由切换全部模型
- **家族谱系** `/family/[slug]` — 26 个家族的演进主线与完整型号谱系
- 全站搜索（⌘K）、深浅主题、响应式（小屏 3D 自动降级为等比剪影）

## 3D 的实现方式

本站**不使用也不生成任何非公开的工程图纸或高精度 CAD**。每枚火箭用一组带真实尺寸的
回转体与周向阵列描述外形（`src/data/geometry.ts` 的 `RocketBuilder`）：

```ts
const g = rocketGeometry()
  .at(0, { id: "octaweb", shape: "engines", height: 3.1, radius: 1.85,
           nozzles: { count: 9, bellRadius: 0.42, bellHeight: 1.55, ringRadius: 1.28 },
           description: "八台环绕、一台居中……" })
  .at(3.1, { id: "s1-body", shape: "cylinder", height: 38.1, radius: 1.85, ... })
```

同一份数据同时驱动：

- **3D 查看器**（`src/components/viewer/`，React Three Fiber）
- **2D 等比剪影**（`src/components/rocket/silhouette.tsx`，纯 SVG，用于卡片 / 对比页 / 移动端降级）

因此对比页的尺寸比较是可信的。每个部件的 `description` 就是点击后弹出的设计说明——
「看得见的设计逻辑」的落点。

## 技术栈

Next.js 16（App Router）· TypeScript · Tailwind CSS v4 · React Three Fiber + three.js ·
Zustand（对比选择）· react-markdown + KaTeX · 全站静态预渲染（SSG）

## 开发

```bash
npm run dev     # 开发服务器
npm run build   # 生产构建（全站 SSG）
npm run lint    # ESLint
```

### 部署前必须设置的环境变量

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

canonical、hreflang、sitemap、robots 与 OG 图的绝对地址全部由它生成。
不设置会退回占位域名 `rocket-atlas.example`，搜索引擎会照着那个域名收录。

## SEO

- **每页自指的 canonical + hreflang**（zh-Hans / en / x-default）。这一条不能靠根 layout
  声明——Next 的 metadata 逐字段继承，在 layout 上写 `alternates` 会让全站几百个页面
  都把 canonical 指向首页。统一走 `src/lib/seo.ts` 的 `pageMeta()`。
- **结构化数据**（`application/ld+json`，全站静态预渲染，爬虫不需要执行 JS）：
  `Organization` + `WebSite` 在根布局，型号页是 `BreadcrumbList` + `TechArticle` +
  `Product` + **`FAQPage`**（「设计权衡」本来就是问答式的，直接映射过去），
  发动机页同理，列表页与家族页是 `ItemList`。
- **OG 图**由 `next/og` 在构建时生成：型号卡片直接画那枚火箭的等比剪影，
  发动机卡片画物理反算出来的钟形喷管轮廓——与 3D 模型共用同一份几何。
  卡片一律用拉丁字符：satori 只内置拉丁字形，中文会渲染成豆腐块。
- sitemap 覆盖全部 294 个页面并互相声明 alternates；刻意不写 `lastModified`，
  因为站点没有真实的逐页修改时间，用构建时间戳等于每次部署都宣称全站都改了。

## 新增一枚火箭

内容与代码完全分离，加一个型号只需要一个数据文件：

1. 新建 `src/data/rockets/<slug>.ts`，导出一个 `Rocket` 对象（类型定义在 `src/data/types.ts`）
2. 用 `rocketGeometry()` 按公开尺寸堆叠部件，填好每个部件的 `description`
3. 在 `src/data/rockets/index.ts` 里注册

3D、剪影、筛选、对比、搜索、sitemap 会自动适配。

## 数据与许可

全部内容基于公开来源整理，关键参数标注出处与置信度（`high` / `medium` / `low`）。
设计逻辑部分是对公开资料的解读与归纳，明确标注为「基于公开信息的分析」，不是官方结论。
详见 `/about`。
