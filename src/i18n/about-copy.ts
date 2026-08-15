import type { Locale } from "./config";

/**
 * 「关于」页的长文文案。
 * 它是唯一一处以整页为单位翻译的界面文本，所以单独放一个模块，
 * 而不是塞进以短句为主的 dict.ts。
 */
export interface AboutCopy {
  title: string;
  metaDescription: string;
  lead: string;
  stats: { models: string; principles: string; citations: string; primary: string };
  method: {
    title: string;
    intro: string;
    layers: { name: string; desc: string }[];
    outro: string;
  };
  sources: {
    title: string;
    intro: string;
    levels: { label: string; desc: string; tone: "ok" | "warn" | "danger" }[];
    rulesIntro: string;
    rules: string[];
  };
  model: {
    title: string;
    intro: string;
    trusted: string;
    schematic: string;
    outro: string;
  };
  scope: { title: string; intro: string; excluded: string[]; outro: string };
  publishers: { title: string; note: string };
  contribute: { title: string; body: string; welcome: string };
  ctaBrowse: string;
  ctaPrinciples: string;
}

const zh: AboutCopy = {
  title: "关于与数据来源",
  metaDescription: "本站的内容方法、数据来源策略、置信度标注规则、3D 模型的精度声明与覆盖范围边界。",
  lead: "运载火箭图谱是一个公开知识驱动的运载火箭系统化可视化教育平台。它的目标不是收集最多的参数，而是把散落在 NASA 技术报告、发射服务用户手册、官方白皮书与事故调查报告里的公开信息，整理成能回答「为什么这样设计」的知识结构。",
  stats: { models: "收录型号", principles: "原理专题", citations: "来源引用", primary: "一手来源" },
  method: {
    title: "内容方法：三层结构",
    intro: "每个型号页的内容都按同一套结构组织，避免变成参数堆砌：",
    layers: [
      {
        name: "事实层",
        desc: "名称、国家、机构、首飞、级数、推进剂、推力、载荷能力、发射记录。这一层追求可核对——每一条关键参数都能追溯到具体来源。",
      },
      {
        name: "架构层",
        desc: "总体布局、分级逻辑、发动机配置、结构特点、回收方案。这一层由 3D 查看器承担：可旋转、可爆炸、可点击每个部件读说明。",
      },
      {
        name: "原理层",
        desc: "为什么选这种推进剂与循环、为什么这样分级、结构与热管理的权衡、与同时代型号的对比。这一层是解读，明确标注为「基于公开信息的分析」。",
      },
    ],
    outro: "第三层是本站最花力气的部分，也是最需要读者保持批判的部分——它是对公开资料的归纳与推理，不是官方结论。",
  },
  sources: {
    title: "来源策略与置信度",
    intro: "我们对来源做三级标注，直接显示在每个型号页的「数据来源」标签下：",
    levels: [
      {
        label: "高置信度",
        tone: "ok",
        desc: "发射服务用户手册、NASA/ESA 技术报告、官方事故调查报告、制造方发布的规格页。",
      },
      {
        label: "中置信度",
        tone: "warn",
        desc: "维基百科等汇总性来源、行业媒体报道。这类来源在质量、推力等参数上常有 ±5% 的口径差异。",
      },
      {
        label: "低置信度",
        tone: "danger",
        desc: "未经证实的报道或由公开信息反推的估算值，仅作参考。",
      },
    ],
    rulesIntro: "几条具体的取舍规则：",
    rules: [
      "官方用户手册优先于任何二手汇总。",
      "当不同来源冲突时，我们采用官方值并在来源备注里写明差异范围（例如 Saturn V 的 LEO 载荷在 118–140 t 之间取决于是否计入 S-IVB 剩余推进剂）。",
      "发射统计标注截止日期；「部分失败」的判定口径各家不同，可能有 ±1–2 次差异。",
      "在研型号（如星舰）的质量与运力多为公开估算，制造方未正式发布完整数据。",
    ],
  },
  model: {
    title: "3D 模型的精度声明",
    intro:
      "本站不使用也不生成任何非公开的工程图纸或高精度 CAD。所有 3D 模型都是参数化示意模型：用一组带真实尺寸的回转体与周向阵列，按公开的总高、直径、分段长度、发动机数量与布局复原外形。",
    trusted: "可信的部分：各级长度与直径的比例、发动机数量与排布、助推器构型、整流罩尺寸。",
    schematic: "示意的部分：表面细节（管路、蒙皮桁条、涂装标识）、内部结构、局部曲面过渡。",
    outro:
      "每个查看器右下角都标注了该模型的复原依据。同一份几何数据同时驱动 3D 与 2D 等比剪影，所以对比页的尺寸比较是可信的。",
  },
  scope: {
    title: "覆盖范围与边界",
    intro: "当前收录以「有轨道发射记录的运载火箭 + 对技术演进有决定性意义的历史型号」为准。明确不做：",
    excluded: [
      "弹道导弹、战术导弹与纯探空火箭（除非对运载技术演进有重大意义，如 V-2）。",
      "未公开的工程细节、内部图纸的推测性重建。",
      "实时发射追踪（这类信息有更专业的现成服务）。",
    ],
    outro:
      "内容与代码分离：所有型号数据都是结构化的 TypeScript 对象，新增一枚火箭只需要增加一个数据文件，3D、剪影、筛选、对比、搜索会自动适配。",
  },
  publishers: {
    title: "引用的主要来源方",
    note: "完整的逐条引用列表在每个型号页的「数据来源」标签与每篇专题的侧栏中。",
  },
  contribute: {
    title: "纠错与贡献",
    body: "如果你发现参数错误、来源失效，或者认为某段设计逻辑的解读有问题——尤其是原理层的分析——欢迎指出。数据文件结构清晰，一条修正通常只涉及一个字段和一条来源备注。",
    welcome:
      "我们特别欢迎两类贡献：带一手来源的参数修正，以及对设计权衡的不同解读——后者往往比前者更有价值。",
  },
  ctaBrowse: "浏览全部火箭",
  ctaPrinciples: "阅读原理专题",
};

const en: AboutCopy = {
  title: "About and sources",
  metaDescription:
    "How this atlas is built: the three-layer content method, the source and confidence policy, what the 3D models do and do not claim, and where the coverage stops.",
  lead: "Rocket Atlas is a public-knowledge-driven visual encyclopedia of launch vehicles. The goal is not to collect the most numbers, but to take information scattered across NASA technical reports, launch-service user guides, official white papers and accident investigation reports, and reorganise it into something that can answer the question “why was it designed that way”.",
  stats: {
    models: "Vehicles",
    principles: "Principle articles",
    citations: "Cited sources",
    primary: "Primary sources",
  },
  method: {
    title: "Method: three layers",
    intro: "Every vehicle page follows the same structure, so it never degenerates into a pile of numbers:",
    layers: [
      {
        name: "Facts",
        desc: "Name, country, organisations, first flight, stages, propellants, thrust, payload capability, launch record. This layer is meant to be checkable — every key figure traces back to a specific source.",
      },
      {
        name: "Architecture",
        desc: "Overall layout, staging logic, engine arrangement, structural features, recovery scheme. This is what the 3D viewer carries: rotate it, explode it, click any part to read what it is for.",
      },
      {
        name: "Principles",
        desc: "Why this propellant and this cycle, why this staging, how structure and thermal management were traded off, how it compares to its contemporaries. This layer is interpretation, and is labelled as analysis of public information.",
      },
    ],
    outro:
      "The third layer is where most of the work goes — and the layer readers should be most sceptical about. It is synthesis and inference from public material, not an official conclusion.",
  },
  sources: {
    title: "Sources and confidence",
    intro: "Every source carries one of three confidence levels, shown on each vehicle's Sources tab:",
    levels: [
      {
        label: "High confidence",
        tone: "ok",
        desc: "Launch-service user guides, NASA/ESA technical reports, official accident investigation reports, manufacturer specification pages.",
      },
      {
        label: "Medium confidence",
        tone: "warn",
        desc: "Aggregated references such as Wikipedia, and industry press. These routinely differ by ±5% on mass and thrust.",
      },
      {
        label: "Low confidence",
        tone: "danger",
        desc: "Unconfirmed reporting, or figures back-calculated from public information. Treat as indicative only.",
      },
    ],
    rulesIntro: "A few concrete rules:",
    rules: [
      "Official user guides take precedence over any secondary compilation.",
      "Where sources conflict, the official figure is used and the spread is noted in the citation — for example, Saturn V's LEO payload is quoted between 118 and 140 t depending on whether residual S-IVB propellant is counted.",
      "Launch statistics carry a cut-off date; what counts as a partial failure differs between references, so totals can vary by one or two flights.",
      "For vehicles still in development (Starship above all), mass and payload figures are public estimates — the manufacturer has never released a complete set.",
    ],
  },
  model: {
    title: "What the 3D models claim",
    intro:
      "This site neither uses nor generates non-public engineering drawings or high-fidelity CAD. Every 3D model is a parametric schematic: a stack of dimensioned solids of revolution and circular arrays, reconstructed from published overall height, diameter, section lengths, engine count and engine layout.",
    trusted:
      "What you can trust: the proportions of stage lengths and diameters, engine count and arrangement, booster configuration, fairing dimensions.",
    schematic:
      "What is schematic: surface detail (plumbing, stringers, markings), internal structure, local surface transitions.",
    outro:
      "Each viewer states the basis for its reconstruction in the corner. The same geometry drives both the 3D model and the 2D scale silhouettes, so the size comparisons on the comparison page are trustworthy.",
  },
  scope: {
    title: "Scope",
    intro:
      "Coverage is orbital launch vehicles, plus the historical vehicles that decisively shaped the technology. Explicitly out of scope:",
    excluded: [
      "Ballistic and tactical missiles and pure sounding rockets — unless, like the V-2, they are foundational to launch vehicle development.",
      "Speculative reconstruction of non-public engineering detail or internal drawings.",
      "Live launch tracking — there are better dedicated services for that.",
    ],
    outro:
      "Content and code are separate: every vehicle is a structured TypeScript object, so adding one means adding one data file. The 3D model, silhouette, filters, comparison and search all pick it up automatically.",
  },
  publishers: {
    title: "Principal sources cited",
    note: "The complete per-item citation list lives on each vehicle's Sources tab and in the sidebar of each principle article.",
  },
  contribute: {
    title: "Corrections and contributions",
    body: "If you find a wrong figure, a dead source, or a reading of the design logic you disagree with — especially in the principles layer — please say so. The data files are straightforward; a correction usually touches one field and one citation note.",
    welcome:
      "Two kinds of contribution are especially welcome: corrections backed by a primary source, and alternative readings of a design trade-off. The second is often worth more than the first.",
  },
  ctaBrowse: "Browse all rockets",
  ctaPrinciples: "Read the principles",
};

export const ABOUT_COPY: Record<Locale, AboutCopy> = { zh, en };
