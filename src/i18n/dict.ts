import type { Locale } from "./config";

/**
 * UI 文案字典。
 *
 * 只放界面文案；火箭内容的双语在 `src/data/*` 的 `en` 覆盖层里。
 * 结构按页面/组件分组，键名保持语义化，方便对照缺漏。
 */
export interface Dict {
  brand: string;
  tagline: string;

  nav: {
    rockets: string;
    compare: string;
    principles: string;
    timeline: string;
    lab: string;
    about: string;
    search: string;
    searchPlaceholder: string;
    openMenu: string;
    closeMenu: string;
    toggleTheme: string;
    language: string;
  };

  common: {
    all: string;
    reset: string;
    clear: string;
    close: string;
    add: string;
    more: string;
    readMore: string;
    viewDetail: string;
    source: string;
    sources: string;
    minutes: string;
    cases: string;
    events: string;
    models: string;
    countries: string;
    citations: string;
    yearRange: string;
    noResult: string;
    breadcrumb: string;
    na: string;
  };

  status: Record<"active" | "retired" | "development" | "cancelled", string>;

  spec: {
    height: string;
    diameter: string;
    span: string;
    mass: string;
    stages: string;
    stageCount: string;
    firstFlight: string;
    lastFlight: string;
    inService: string;
    payloadLEO: string;
    payloadGTO: string;
    payloadSSO: string;
    payloadTLI: string;
    payloadRatio: string;
    payloadRatioNote: string;
    fineness: string;
    finenessNote: string;
    thrustSL: string;
    thrustVac: string;
    liftoffThrust: string;
    twr: string;
    twrNote: string;
    burnTime: string;
    dryMass: string;
    propellantMass: string;
    structuralCoefficient: string;
    structuralCoefficientNote: string;
    diameterLength: string;
    reusable: string;
    humanRated: string;
    operator: string;
    yes: string;
    no: string;
    engines: string;
    perEngineThrust: string;
    ispSL: string;
    ispVac: string;
    chamberPressure: string;
    chamberPressureNote: string;
    successRate: string;
    launches: string;
    success: string;
    partial: string;
    failure: string;
    asOf: string;
    country: string;
  };

  home: {
    heroTitleA: string;
    heroTitleB: string;
    heroAccent: string;
    heroLead: string;
    ctaExplore: string;
    ctaCompare: string;
    ctaPrinciples: string;
    dragToRotate: string;
    statModels: string;
    statCountries: string;
    statYears: string;
    statSources: string;
    scaleEyebrow: string;
    scaleTitle: string;
    scaleDesc: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDesc: string;
    featuredAll: string;
    methodEyebrow: string;
    methodTitle: string;
    methodDesc: string;
    layer1: string;
    layer1Desc: string;
    layer1Tag: string;
    layer2: string;
    layer2Desc: string;
    layer2Tag: string;
    layer3: string;
    layer3Desc: string;
    layer3Tag: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principlesDesc: string;
    timelineEyebrow: string;
    timelineTitle: string;
    timelineAll: string;
    quickEyebrow: string;
    quickTitle: string;
    quickReusable: string;
    quickHumanRated: string;
    quickSize: string;
  };

  list: {
    title: string;
    lead: (n: number) => string;
    filters: string;
    country: string;
    statusLabel: string;
    propellant: string;
    stageCount: string;
    decade: string;
    features: string;
    reusable: string;
    humanRated: string;
    clearFilters: (n: number) => string;
    searchPlaceholder: string;
    searchAria: string;
    sortBy: (label: string) => string;
    cardView: string;
    tableView: string;
    count: (a: number, b: number) => string;
    empty: string;
    model: string;
  };

  sort: Record<"firstFlight" | "payload" | "height" | "mass" | "name", string>;

  detail: {
    tabs: {
      overview: string;
      design: string;
      propulsion: string;
      specs: string;
      launches: string;
      family: string;
      sources: string;
    };
    addToCompare: string;
    inCompare: string;
    compareFull: (n: number) => string;
    history: string;
    milestones: string;
    tags: string;
    designSummary: string;
    tradeoffs: (n: number) => string;
    contemporaries: string;
    relatedPrinciples: string;
    burnsWhat: string;
    usedBy: string;
    engineCount: (n: number) => string;
    propellantSection: string;
    fuel: string;
    oxidizer: string;
    mixtureRatio: string;
    pros: string;
    cons: string;
    overall: string;
    capability: string;
    operations: string;
    notableMissions: string;
    launchStats: string;
    statsCaveat: string;
    variants: string;
    relatedRockets: string;
    fullLineage: string;
    sourcesIntro: string;
    modelNote: string;
    confidence: Record<"high" | "medium" | "low", string>;
    confidenceDesc: Record<"high" | "medium" | "low", string>;
    noLaunchData: string;
  };

  compare: {
    title: string;
    lead: string;
    empty: string;
    emptyHint: string;
    pick: string;
    presets: string;
    scaleTitle: string;
    scaleDesc: string;
    metricsTitle: string;
    metricsDesc: string;
    tableTitle: string;
    philosophyTitle: string;
    philosophyDesc: string;
    fullDesign: string;
    selected: (a: number, b: number) => string;
    searchPlaceholder: string;
    remove: (name: string) => string;
  };

  principles: {
    title: string;
    lead: string;
    examples: string;
    appliedIn: string;
    prev: string;
    next: string;
    references: string;
    formulaNote: string;
    formulaNoteBody: string;
  };

  timeline: {
    title: string;
    lead: string;
    eventType: string;
    country: string;
    count: (a: number, b: number) => string;
    kinds: Record<"milestone" | "debut" | "program" | "loss", string>;
    viewRocket: string;
    eventsIn: (n: number) => string;
  };

  lab: {
    title: string;
    lead: string;
    pick: string;
    fullPage: string;
  };

  viewer: {
    presets: Record<"full" | "engines" | "upper" | "nose", string>;
    toSilhouette: string;
    to3d: string;
    autoRotate: string;
    stopRotate: string;
    fullscreen: string;
    exitFullscreen: string;
    explode: string;
    clickForInfo: string;
    loading: string;
    building: string;
    schematic: string;
    detailed: string;
    groups: Record<"payload" | "stage-3" | "stage-2" | "stage-1" | "core" | "booster", string>;
    partHeight: string;
    partDiameter: string;
    partBottom: string;
    partCount: string;
    closePart: string;
  };

  footer: {
    blurb: string;
    browse: string;
    principles: string;
    families: string;
    author: string;
    openSource: string;
    disclaimer: string;
    sourcesLink: string;
    stats: (models: number, countries: number, sources: number) => string;
  };

  notFound: {
    code: string;
    title: string;
    lead: string;
    browse: string;
    home: string;
    recent: string;
  };

  search: {
    placeholder: string;
    empty: (q: string) => string;
    hint: string;
    kinds: Record<"rocket" | "family" | "principle", string>;
  };

  family: {
    lineage: string;
    inAtlas: string;
    members: string;
    related: string;
  };

  /** 英文版缺少译文时的提示 */
  untranslated: string;
}

const zh: Dict = {
  brand: "运载火箭图谱",
  tagline: "看得见结构，也讲得清为什么这样设计",

  nav: {
    rockets: "火箭百科",
    compare: "对比",
    principles: "原理专题",
    timeline: "时间线",
    lab: "3D 实验室",
    about: "关于",
    search: "搜索",
    searchPlaceholder: "搜索火箭、发动机…",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleTheme: "切换主题",
    language: "语言",
  },

  common: {
    all: "全部",
    reset: "重置",
    clear: "清空",
    close: "关闭",
    add: "添加",
    more: "更多",
    readMore: "阅读",
    viewDetail: "查看详情",
    source: "来源",
    sources: "数据来源",
    minutes: "分钟",
    cases: "个案例",
    events: "个事件",
    models: "个型号",
    countries: "个国家/地区",
    citations: "条来源引用",
    yearRange: "覆盖年代",
    noResult: "没有结果",
    breadcrumb: "面包屑",
    na: "—",
  },

  status: {
    active: "现役",
    retired: "退役",
    development: "研制中",
    cancelled: "已取消",
  },

  spec: {
    height: "全长",
    diameter: "芯级直径",
    span: "最大横向尺寸",
    mass: "起飞质量",
    stages: "级",
    stageCount: "级数",
    firstFlight: "首飞",
    lastFlight: "末次飞行",
    inService: "现役",
    payloadLEO: "近地轨道 LEO",
    payloadGTO: "同步转移 GTO",
    payloadSSO: "太阳同步 SSO",
    payloadTLI: "地月转移 TLI",
    payloadRatio: "载荷比",
    payloadRatioNote: "LEO 载荷 / 起飞质量",
    fineness: "长细比",
    finenessNote: "全长 / 芯级直径",
    thrustSL: "海平面推力",
    thrustVac: "真空推力",
    liftoffThrust: "起飞推力",
    twr: "起飞推重比",
    twrNote: "小于 1.2 时重力损失显著上升",
    burnTime: "工作时间",
    dryMass: "干质量",
    propellantMass: "推进剂质量",
    structuralCoefficient: "结构系数 ε",
    structuralCoefficientNote: "干质量 / 总质量",
    diameterLength: "直径 × 长度",
    reusable: "可回收",
    humanRated: "载人认证",
    operator: "研制 / 运营",
    yes: "是",
    no: "否",
    engines: "发动机",
    perEngineThrust: "单台推力",
    ispSL: "海平面比冲",
    ispVac: "真空比冲",
    chamberPressure: "燃烧室压力",
    chamberPressureNote: "衡量循环先进程度",
    successRate: "成功率",
    launches: "总发射次数",
    success: "成功",
    partial: "部分成功",
    failure: "失败",
    asOf: "统计截止",
    country: "国家 / 地区",
  },

  home: {
    heroTitleA: "看得见结构，",
    heroTitleB: "也讲得清",
    heroAccent: "为什么这样设计",
    heroLead:
      "从 V-2 到星舰，把散落在 NASA 技术报告、用户手册与官方白皮书里的公开信息，整理成可检索、可对比、可交互的知识体系。每一枚火箭都有 3D 结构、分级参数，以及一组「为什么不是别的方案」的设计权衡问答。",
    ctaExplore: "探索全部火箭",
    ctaCompare: "并排对比",
    ctaPrinciples: "从火箭方程读起",
    dragToRotate: "拖动可旋转",
    statModels: "收录型号",
    statCountries: "国家 / 地区",
    statYears: "覆盖年代",
    statSources: "来源引用",
    scaleEyebrow: "同一刻度",
    scaleTitle: "它们真实的大小差距",
    scaleDesc: "所有剪影使用同一份参数化几何、同一个 y 轴刻度绘制——与 3D 查看器完全一致的数据源。",
    featuredEyebrow: "精选",
    featuredTitle: "从这几枚开始",
    featuredDesc: "它们分别代表了不同年代、不同国家对同一组工程问题给出的不同答案。",
    featuredAll: "全部型号",
    methodEyebrow: "方法",
    methodTitle: "每一页都分三层组织",
    methodDesc:
      "参数堆砌解决不了「为什么」。我们把每个型号的内容拆成事实、架构、原理三层，3D 负责把架构层变得可见。",
    layer1: "事实层",
    layer1Desc: "名称、国家、首飞、级数、推进剂、推力、载荷能力、发射记录。每一条关键参数都标注来源与置信度。",
    layer1Tag: "快速查阅与对比",
    layer2: "架构层",
    layer2Desc: "总体布局、分级逻辑、发动机配置、结构特点、回收方案。用可旋转、可爆炸、可点击的 3D 呈现。",
    layer2Tag: "理解「怎么组装」",
    layer3: "原理层",
    layer3Desc: "为什么选这种推进剂与循环、为什么这样分级、结构与热管理的权衡、演进路径与同代对比。",
    layer3Tag: "理解「为什么这样设计」",
    principlesEyebrow: "原理专题",
    principlesTitle: "横向切面：一个问题，所有火箭",
    principlesDesc:
      "与其在每个型号页重复解释同一件事，不如把共通的原理抽出来单独讲透，再链回具体型号。",
    timelineEyebrow: "时间线",
    timelineTitle: "最近的关键节点",
    timelineAll: "完整时间线",
    quickEyebrow: "快速入口",
    quickTitle: "按你关心的维度切进去",
    quickReusable: "可回收火箭",
    quickHumanRated: "载人火箭",
    quickSize: "尺寸对比",
  },

  list: {
    title: "火箭百科",
    lead: (n) =>
      `目前收录 ${n} 个型号，覆盖从 1942 年的 V-2 到在研的星舰。每个型号页包含 3D 结构、分级参数、设计权衡问答与来源标注。勾选卡片右上角的「+」可加入对比（最多 4 个）。`,
    filters: "筛选",
    country: "国家 / 地区",
    statusLabel: "状态",
    propellant: "推进剂",
    stageCount: "级数",
    decade: "首飞年代",
    features: "特性",
    reusable: "可回收",
    humanRated: "载人",
    clearFilters: (n) => `清除全部筛选（${n}）`,
    searchPlaceholder: "搜索名称、国家、发动机、标签…",
    searchAria: "搜索火箭",
    sortBy: (label) => `按${label}`,
    cardView: "卡片视图",
    tableView: "表格视图",
    count: (a, b) => `${a} / ${b} 个型号`,
    empty: "没有符合条件的火箭",
    model: "型号",
  },

  sort: {
    firstFlight: "首飞时间",
    payload: "LEO 载荷",
    height: "高度",
    mass: "起飞质量",
    name: "名称",
  },

  detail: {
    tabs: {
      overview: "概览",
      design: "设计逻辑",
      propulsion: "动力系统",
      specs: "技术规格",
      launches: "发射历史",
      family: "演进与家族",
      sources: "数据来源",
    },
    addToCompare: "加入对比",
    inCompare: "已加入对比",
    compareFull: (n) => `最多对比 ${n} 个`,
    history: "历史背景",
    milestones: "关键里程碑",
    tags: "标签",
    designSummary: "设计总纲",
    tradeoffs: (n) => `设计权衡 · ${n} 个问题`,
    contemporaries: "与同时代火箭的对比思考",
    relatedPrinciples: "相关原理专题",
    burnsWhat: "这枚火箭烧什么",
    usedBy: "用于",
    engineCount: (n) => `发动机 · ${n} 型`,
    propellantSection: "推进剂",
    fuel: "燃料",
    oxidizer: "氧化剂",
    mixtureRatio: "混合比",
    pros: "换来了什么",
    cons: "代价是什么",
    overall: "总体",
    capability: "运载能力",
    operations: "运行",
    notableMissions: "重要任务",
    launchStats: "发射统计",
    statsCaveat: "不同来源对「部分失败」的判定口径不一致，统计结果可能有 ±1–2 次差异。",
    variants: "衍生型号与构型",
    relatedRockets: "相关型号",
    fullLineage: "查看完整家族谱系 →",
    sourcesIntro:
      "本站所有内容均基于公开来源整理。设计逻辑部分是对公开资料的解读与归纳，标注为「基于公开信息」；不同来源在质量、推力等参数上常有 ±5% 的口径差异，我们优先采用官方用户手册与技术报告。",
    modelNote: "3D 模型说明",
    confidence: { high: "高置信度", medium: "中置信度", low: "低置信度" },
    confidenceDesc: {
      high: "一手文件或官方发布",
      medium: "汇总性来源，口径可能有差异",
      low: "报道或推算，仅供参考",
    },
    noLaunchData: "本型号尚无系统整理的发射统计。可参考「数据来源」中的公开记录。",
  },

  compare: {
    title: "对比工具",
    lead: "把 2–4 枚火箭放在同一把尺子下。尺寸剪影与 3D 查看器使用同一份参数化几何，性能条形图按每个指标独立归一化——注意载荷比这类比值型指标，它比绝对运力更能说明设计效率。",
    empty: "还没有选择任何火箭",
    emptyHint: "最多可同时对比 4 个型号。你可以在这里挑选，也可以在火箭列表里点击卡片右上角的「+」。",
    pick: "添加火箭",
    presets: "预设组合",
    scaleTitle: "真实比例",
    scaleDesc: "同一 y 轴刻度绘制的等比侧视图——尺寸差异一眼可见。",
    metricsTitle: "关键性能",
    metricsDesc: "每个指标独立归一化：最长的条 = 该指标的最大值。",
    tableTitle: "规格对照",
    philosophyTitle: "设计哲学",
    philosophyDesc: "同样的物理约束，不同的取舍。点进详情页可以看到完整的权衡问答。",
    fullDesign: "完整设计逻辑 →",
    selected: (a, b) => `已选 ${a} / ${b}`,
    searchPlaceholder: "搜索型号…",
    remove: (name) => `移除 ${name}`,
  },

  principles: {
    title: "原理专题",
    lead: "与其在每个型号页重复解释同一件事，不如把共通的原理抽出来单独讲透。每篇专题都以「为什么会这样」而不是「它是什么」为主线，并在末尾链接到应用了该原理的具体火箭。",
    examples: "典型案例：",
    appliedIn: "应用了该原理的典型火箭",
    prev: "上一篇",
    next: "下一篇",
    references: "参考来源",
    formulaNote: "公式说明",
    formulaNoteBody:
      "正文中的公式使用 KaTeX 渲染。所有推导均为标准教科书结果，数值示例为便于理解的量级估算，不用于工程设计。",
  },

  timeline: {
    title: "全球运载火箭发展时间线",
    lead: "我们刻意把重大失败与里程碑并列——运载火箭的技术演进有相当一部分是由事故调查报告推动的，略去失败就看不懂后续设计为什么会那样改。",
    eventType: "事件类型",
    country: "国家 / 地区",
    count: (a, b) => `${a} / ${b} 个事件`,
    kinds: {
      milestone: "里程碑",
      debut: "型号首飞",
      program: "计划决策",
      loss: "重大失败",
    },
    viewRocket: "查看型号详情 →",
    eventsIn: (n) => `${n} 个事件`,
  },

  lab: {
    title: "3D 实验室",
    lead: "所有模型在一个页面里自由切换。拖拽旋转、滚轮缩放、拉动滑块展开爆炸视图，点击任意部件读它的设计说明。橙色人形是 1.8 m 比例尺——它比任何数字都更能说明这些东西到底有多大。",
    pick: "选择模型",
    fullPage: "查看完整型号页 →",
  },

  viewer: {
    presets: { full: "整体", engines: "发动机段", upper: "上面级", nose: "整流罩" },
    toSilhouette: "切换到等比剪影",
    to3d: "切换到 3D",
    autoRotate: "自动旋转",
    stopRotate: "停止自动旋转",
    fullscreen: "全屏",
    exitFullscreen: "退出全屏",
    explode: "爆炸视图",
    clickForInfo: "点击查看说明",
    loading: "加载 3D 查看器…",
    building: "正在构建几何…",
    schematic: "示意模型",
    detailed: "细节模型",
    groups: {
      payload: "载荷 / 整流罩",
      "stage-3": "三级",
      "stage-2": "二级",
      "stage-1": "一级",
      core: "芯级",
      booster: "助推器",
    },
    partHeight: "高度",
    partDiameter: "直径",
    partBottom: "距底",
    partCount: "数量",
    closePart: "关闭部件说明",
  },

  footer: {
    blurb:
      "一个公开知识驱动的运载火箭可视化教育平台。我们不只罗列参数，更试图讲清楚「为什么这样设计」。",
    browse: "浏览",
    principles: "原理专题",
    families: "火箭家族",
    author: "作者 tanzhuo.xyz",
    openSource: "开源代码",
    disclaimer:
      "全部内容基于公开来源整理，关键参数均标注出处与置信度。3D 模型为按公开尺寸复原的示意模型，不代表真实工程图纸。",
    sourcesLink: "数据来源与方法说明 →",
    stats: (m, c, s) => `${m} 个型号 · ${c} 个国家/地区 · ${s} 条来源引用`,
  },

  notFound: {
    code: "404 · 未入轨",
    title: "这个页面不在轨道上",
    lead: "你要找的型号可能尚未收录，或者链接已经变化。",
    browse: "浏览全部火箭",
    home: "回到首页",
    recent: "最近加入",
  },

  search: {
    placeholder: "火箭名、发动机、国家、家族…",
    empty: (q) => `没有匹配「${q}」的结果`,
    hint: "输入关键词开始搜索 · ↑↓ 选择 · Enter 打开",
    kinds: { rocket: "火箭", family: "家族", principle: "专题" },
  },

  family: {
    lineage: "谱系",
    inAtlas: "本站收录",
    members: "本站收录的成员",
    related: "相关家族",
  },

  untranslated: "该段内容的英文版尚未完成，以下为中文原文。",
};

const en: Dict = {
  brand: "Rocket Atlas",
  tagline: "See the structure — and understand why it was designed that way",

  nav: {
    rockets: "Rockets",
    compare: "Compare",
    principles: "Principles",
    timeline: "Timeline",
    lab: "3D Lab",
    about: "About",
    search: "Search",
    searchPlaceholder: "Search rockets, engines…",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleTheme: "Toggle theme",
    language: "Language",
  },

  common: {
    all: "All",
    reset: "Reset",
    clear: "Clear",
    close: "Close",
    add: "Add",
    more: "More",
    readMore: "Read",
    viewDetail: "View details",
    source: "Source",
    sources: "Sources",
    minutes: "min read",
    cases: "cases",
    events: "events",
    models: "vehicles",
    countries: "countries / regions",
    citations: "cited sources",
    yearRange: "Years covered",
    noResult: "No results",
    breadcrumb: "Breadcrumb",
    na: "—",
  },

  status: {
    active: "Active",
    retired: "Retired",
    development: "In development",
    cancelled: "Cancelled",
  },

  spec: {
    height: "Height",
    diameter: "Core diameter",
    span: "Max span",
    mass: "Liftoff mass",
    stages: "stages",
    stageCount: "Stages",
    firstFlight: "First flight",
    lastFlight: "Last flight",
    inService: "In service",
    payloadLEO: "Low Earth orbit (LEO)",
    payloadGTO: "Geo transfer (GTO)",
    payloadSSO: "Sun-synchronous (SSO)",
    payloadTLI: "Trans-lunar (TLI)",
    payloadRatio: "Payload fraction",
    payloadRatioNote: "LEO payload / liftoff mass",
    fineness: "Fineness ratio",
    finenessNote: "Height / core diameter",
    thrustSL: "Sea-level thrust",
    thrustVac: "Vacuum thrust",
    liftoffThrust: "Liftoff thrust",
    twr: "Liftoff T/W",
    twrNote: "Below 1.2, gravity losses climb sharply",
    burnTime: "Burn time",
    dryMass: "Dry mass",
    propellantMass: "Propellant mass",
    structuralCoefficient: "Structural coefficient ε",
    structuralCoefficientNote: "Dry mass / total mass",
    diameterLength: "Diameter × length",
    reusable: "Reusable",
    humanRated: "Human-rated",
    operator: "Builder / operator",
    yes: "Yes",
    no: "No",
    engines: "Engines",
    perEngineThrust: "Thrust per engine",
    ispSL: "Isp (sea level)",
    ispVac: "Isp (vacuum)",
    chamberPressure: "Chamber pressure",
    chamberPressureNote: "The clearest single indicator of cycle sophistication",
    successRate: "success rate",
    launches: "Total launches",
    success: "Success",
    partial: "Partial",
    failure: "Failure",
    asOf: "As of",
    country: "Country / region",
  },

  home: {
    heroTitleA: "See the structure.",
    heroTitleB: "Understand ",
    heroAccent: "why it was designed that way",
    heroLead:
      "From the V-2 to Starship: public information scattered across NASA technical reports, launch-service user guides and official white papers, reorganised into something searchable, comparable and interactive. Every vehicle gets a 3D structure, stage-by-stage numbers, and a set of “why not the other option” design trade-offs.",
    ctaExplore: "Explore all rockets",
    ctaCompare: "Compare side by side",
    ctaPrinciples: "Start with the rocket equation",
    dragToRotate: "Drag to rotate",
    statModels: "Vehicles",
    statCountries: "Countries / regions",
    statYears: "Years covered",
    statSources: "Cited sources",
    scaleEyebrow: "Same scale",
    scaleTitle: "How big the difference really is",
    scaleDesc:
      "Every silhouette is drawn from the same parametric geometry on the same y-axis scale — the exact data that drives the 3D viewer.",
    featuredEyebrow: "Featured",
    featuredTitle: "Start with these",
    featuredDesc:
      "Each one is a different era's and a different country's answer to the same set of engineering problems.",
    featuredAll: "All vehicles",
    methodEyebrow: "Method",
    methodTitle: "Every page is built in three layers",
    methodDesc:
      "Piling up numbers never answers “why”. Each vehicle is split into fact, architecture and principle layers — and 3D is what makes the architecture layer visible.",
    layer1: "Facts",
    layer1Desc:
      "Name, country, first flight, stages, propellants, thrust, payload capability, launch record. Every key figure carries a source and a confidence level.",
    layer1Tag: "Look up and compare",
    layer2: "Architecture",
    layer2Desc:
      "Overall layout, staging logic, engine arrangement, structure, recovery scheme — shown as a 3D model you can rotate, explode and click through.",
    layer2Tag: "Understand how it is assembled",
    layer3: "Principles",
    layer3Desc:
      "Why this propellant and cycle, why this staging, how structure and thermal management were traded off, and how it compares to its contemporaries.",
    layer3Tag: "Understand why it was designed that way",
    principlesEyebrow: "Principles",
    principlesTitle: "Cross-sections: one question, every rocket",
    principlesDesc:
      "Rather than repeating the same explanation on every vehicle page, the shared principles are pulled out and explained once — then linked back to the specific rockets.",
    timelineEyebrow: "Timeline",
    timelineTitle: "Recent milestones",
    timelineAll: "Full timeline",
    quickEyebrow: "Quick entry",
    quickTitle: "Jump in on the dimension you care about",
    quickReusable: "Reusable vehicles",
    quickHumanRated: "Human-rated vehicles",
    quickSize: "Size comparison",
  },

  list: {
    title: "Rocket encyclopedia",
    lead: (n) =>
      `${n} vehicles so far, from the 1942 V-2 to Starship in development. Every page carries a 3D structure, stage-level numbers, design trade-off Q&A and cited sources. Use the “+” on a card to add it to the comparison (up to 4).`,
    filters: "Filters",
    country: "Country / region",
    statusLabel: "Status",
    propellant: "Propellant",
    stageCount: "Stages",
    decade: "First flight decade",
    features: "Features",
    reusable: "Reusable",
    humanRated: "Human-rated",
    clearFilters: (n) => `Clear all filters (${n})`,
    searchPlaceholder: "Search name, country, engine, tag…",
    searchAria: "Search rockets",
    sortBy: (label) => `Sort by ${label}`,
    cardView: "Card view",
    tableView: "Table view",
    count: (a, b) => `${a} of ${b} vehicles`,
    empty: "No rockets match these filters",
    model: "Vehicle",
  },

  sort: {
    firstFlight: "first flight",
    payload: "LEO payload",
    height: "height",
    mass: "liftoff mass",
    name: "name",
  },

  detail: {
    tabs: {
      overview: "Overview",
      design: "Design logic",
      propulsion: "Propulsion",
      specs: "Specifications",
      launches: "Launch record",
      family: "Lineage",
      sources: "Sources",
    },
    addToCompare: "Add to compare",
    inCompare: "In comparison",
    compareFull: (n) => `Compare up to ${n}`,
    history: "Background",
    milestones: "Key milestones",
    tags: "Tags",
    designSummary: "Design thesis",
    tradeoffs: (n) => `Design trade-offs · ${n} questions`,
    contemporaries: "Compared with its contemporaries",
    relatedPrinciples: "Related principles",
    burnsWhat: "What this rocket burns",
    usedBy: "Used on",
    engineCount: (n) => `Engines · ${n} types`,
    propellantSection: "Propellant",
    fuel: "Fuel",
    oxidizer: "Oxidizer",
    mixtureRatio: "Mixture ratio",
    pros: "What it buys you",
    cons: "What it costs",
    overall: "Overall",
    capability: "Payload capability",
    operations: "Operations",
    notableMissions: "Notable missions",
    launchStats: "Launch statistics",
    statsCaveat:
      "Sources disagree on what counts as a partial failure, so totals can differ by one or two flights.",
    variants: "Variants and configurations",
    relatedRockets: "Related vehicles",
    fullLineage: "See the full family lineage →",
    sourcesIntro:
      "Everything here is compiled from public sources. The design-logic sections are interpretation and synthesis of public material, not official conclusions; sources routinely differ by ±5% on mass and thrust figures, and official user guides and technical reports take precedence.",
    modelNote: "About this 3D model",
    confidence: { high: "High confidence", medium: "Medium confidence", low: "Low confidence" },
    confidenceDesc: {
      high: "Primary document or official release",
      medium: "Aggregated source; figures may differ between references",
      low: "Press report or estimate — treat with care",
    },
    noLaunchData:
      "No systematically compiled launch statistics for this vehicle yet. See the cited sources for public records.",
  },

  compare: {
    title: "Comparison tool",
    lead: "Put 2–4 rockets under the same ruler. The silhouettes come from the same parametric geometry as the 3D viewer, and each performance bar is normalised independently — watch the ratio metrics such as payload fraction, they say more about design efficiency than absolute capacity.",
    empty: "No rockets selected yet",
    emptyHint:
      "You can compare up to 4 vehicles. Pick them here, or use the “+” on any card in the rocket list.",
    pick: "Add a rocket",
    presets: "Presets",
    scaleTitle: "True scale",
    scaleDesc: "Side views drawn on one y-axis scale — the size difference speaks for itself.",
    metricsTitle: "Key performance",
    metricsDesc: "Each metric is normalised on its own: the longest bar is that metric's maximum.",
    tableTitle: "Specification table",
    philosophyTitle: "Design philosophy",
    philosophyDesc:
      "Same physics, different trade-offs. The full Q&A is on each vehicle's detail page.",
    fullDesign: "Full design logic →",
    selected: (a, b) => `${a} of ${b} selected`,
    searchPlaceholder: "Search vehicles…",
    remove: (name) => `Remove ${name}`,
  },

  principles: {
    title: "Principles",
    lead: "Rather than repeating the same explanation on every vehicle page, the shared principles are explained once and properly. Each piece is organised around “why it works out this way” rather than “what it is”, and links back to the rockets that embody it.",
    examples: "Examples:",
    appliedIn: "Rockets that embody this principle",
    prev: "Previous",
    next: "Next",
    references: "References",
    formulaNote: "About the formulas",
    formulaNoteBody:
      "Formulas are rendered with KaTeX. All derivations are standard textbook results; the numerical examples are order-of-magnitude estimates for intuition, not for engineering use.",
  },

  timeline: {
    title: "A timeline of launch vehicle development",
    lead: "Major failures sit alongside the milestones on purpose — a large share of launch vehicle progress was driven by accident investigation reports, and leaving the failures out makes the later design changes unreadable.",
    eventType: "Event type",
    country: "Country / region",
    count: (a, b) => `${a} of ${b} events`,
    kinds: {
      milestone: "Milestone",
      debut: "Maiden flight",
      program: "Programme decision",
      loss: "Major failure",
    },
    viewRocket: "View vehicle →",
    eventsIn: (n) => `${n} events`,
  },

  lab: {
    title: "3D Lab",
    lead: "Every model in one place. Drag to rotate, scroll to zoom, pull the slider for the exploded view, and click any part to read its design note. The orange figure is a 1.8 m scale reference — it tells you more about the size of these machines than any number does.",
    pick: "Pick a model",
    fullPage: "Open the full vehicle page →",
  },

  viewer: {
    presets: { full: "Whole vehicle", engines: "Engine bay", upper: "Upper stage", nose: "Fairing" },
    toSilhouette: "Switch to scale silhouette",
    to3d: "Switch to 3D",
    autoRotate: "Auto-rotate",
    stopRotate: "Stop auto-rotate",
    fullscreen: "Fullscreen",
    exitFullscreen: "Exit fullscreen",
    explode: "Exploded view",
    clickForInfo: "click for details",
    loading: "Loading 3D viewer…",
    building: "Building geometry…",
    schematic: "Schematic model",
    detailed: "Detailed model",
    groups: {
      payload: "Payload / fairing",
      "stage-3": "Third stage",
      "stage-2": "Second stage",
      "stage-1": "First stage",
      core: "Core stage",
      booster: "Boosters",
    },
    partHeight: "Height",
    partDiameter: "Diameter",
    partBottom: "From base",
    partCount: "Count",
    closePart: "Close part details",
  },

  footer: {
    blurb:
      "A public-knowledge-driven visual encyclopedia of launch vehicles. Not just the numbers — the reasoning behind them.",
    browse: "Browse",
    principles: "Principles",
    families: "Families",
    author: "By tanzhuo.xyz",
    openSource: "Source code",
    disclaimer:
      "All content is compiled from public sources with citations and confidence levels. The 3D models are schematic reconstructions from published dimensions, not engineering drawings.",
    sourcesLink: "Sources and method →",
    stats: (m, c, s) => `${m} vehicles · ${c} countries/regions · ${s} cited sources`,
  },

  notFound: {
    code: "404 · Failed to reach orbit",
    title: "This page is not in orbit",
    lead: "The vehicle you are looking for may not be covered yet, or the link has changed.",
    browse: "Browse all rockets",
    home: "Back home",
    recent: "Recently added",
  },

  search: {
    placeholder: "Rocket, engine, country, family…",
    empty: (q) => `Nothing matches “${q}”`,
    hint: "Type to search · ↑↓ to select · Enter to open",
    kinds: { rocket: "Rocket", family: "Family", principle: "Principle" },
  },

  family: {
    lineage: "Lineage",
    inAtlas: "In this atlas",
    members: "Covered members",
    related: "Related families",
  },

  untranslated: "An English version of this section is not finished yet; the original Chinese follows.",
};

export const DICT: Record<Locale, Dict> = { zh, en };

export function getDict(locale: Locale): Dict {
  return DICT[locale];
}
