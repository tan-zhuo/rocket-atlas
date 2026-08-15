/**
 * 运载火箭百科 — 核心数据模型
 *
 * 单位约定（全库统一，禁止在数据文件中混用）：
 *   长度 m ｜ 质量 kg ｜ 推力 kN ｜ 比冲 s ｜ 时间 s ｜ 日期 ISO-8601
 *
 * 所有事实性字段都应能追溯到 `sources` 中的公开来源。
 */

export type RocketStatus = "active" | "retired" | "development" | "cancelled";

/** 数据置信度：影响详情页「数据来源」标签的呈现。 */
export type Confidence = "high" | "medium" | "low";

export interface Source {
  title: string;
  url: string;
  publisher?: string;
  confidence: Confidence;
  /** 说明该来源覆盖了哪些字段，或存在什么口径差异。 */
  note?: string;
}

/** 动力循环 —— 原理专题页会按这个枚举做交叉索引。 */
export type EngineCycle =
  | "gas-generator" // 燃气发生器循环
  | "staged-combustion" // 分级燃烧（补燃）循环
  | "full-flow-staged-combustion" // 全流量分级燃烧
  | "expander" // 膨胀循环
  | "electric-pump" // 电泵循环
  | "pressure-fed" // 挤压式
  | "solid" // 固体
  | "hybrid-unknown";

/** 推进剂组合 —— 用于筛选与配色。 */
export type PropellantType =
  | "kerolox" // RP-1 / 煤油 + 液氧
  | "hydrolox" // 液氢 + 液氧
  | "methalox" // 甲烷 + 液氧
  | "hypergolic" // 可贮存自燃（N2O4/UDMH 等）
  | "solid"
  | "alcolox"; // 乙醇 + 液氧（V-2）

export interface Engine {
  name: string;
  nameZh?: string;
  /** 该级上的台数 */
  count: number;
  cycle: EngineCycle;
  cycleZh: string;
  propellant: PropellantType;
  /** 单台推力（kN）。海平面型号给海平面值，真空型号给真空值。 */
  thrust: number;
  thrustSeaLevel?: number;
  thrustVacuum?: number;
  ispSeaLevel?: number;
  ispVacuum?: number;
  /** 推进剂的中文描述，如「RP-1 煤油 / 液氧（过冷）」 */
  propellantZh?: string;
  /** 一句话点出这台发动机的技术地位 */
  note?: string;
  /** 这台发动机（及其循环/推进剂选择）换来了什么 */
  pros?: string[];
  /** 代价是什么 —— 与 pros 成对出现，避免只讲优点 */
  cons?: string[];
}

export interface Stage {
  name: string;
  nameZh: string;
  engines: Engine[];
  propellant: PropellantType;
  propellantZh: string;
  /** 全级海平面/真空总推力（kN） */
  thrustSeaLevel?: number;
  thrustVacuum?: number;
  burnTime?: number;
  /** 干质量 / 推进剂质量（kg），用于质量比与火箭方程演示 */
  dryMass?: number;
  propellantMass?: number;
  diameter?: number;
  height?: number;
  reusable?: boolean;
  note?: string;
}

/** ── 参数化 3D 几何 ────────────────────────────────────────────────
 * 站点不依赖外部 CAD：每枚火箭用一组带真实尺寸的回转体/阵列描述外形，
 * 同一份数据同时驱动 3D 查看器与 2D 等比剪影（对比页 / 卡片）。
 * 这是规格 §6.2 第 4 条「示意模型」路线，精度等级见 `RocketGeometry.fidelity`。
 */
export type PartShape =
  | "cone" // 圆锥（尖头）
  | "ogive" // 卵形头锥（整流罩常见）
  | "cylinder"
  | "frustum" // 圆台（收缩段/裙部）
  | "engines" // 发动机喷管阵列
  | "fins" // 尾翼
  | "gridfins" // 栅格舵
  | "capsule" // 载人飞船（钝头锥）
  | "tower" // 逃逸塔桁架
  | "flap"; // 气动襟翼（星舰）

/**
 * 表面处理 —— 决定 PBR 材质参数与涂装质感。
 * 运载火箭的外观几乎全部由「这一段是漆的、裸的、包绝热层的还是贴瓦的」决定，
 * 所以这是比单纯给个颜色更有信息量的建模维度。
 */
export type PartFinish =
  | "painted-white" // 白漆蒙皮（最常见）
  | "painted-black" // 黑漆滚动标识 / 涂黑段
  | "painted-accent" // 醒目色（逃逸塔红等）
  | "bare-metal" // 裸铝 / 抛光金属
  | "stainless" // 不锈钢（星舰）
  | "insulation-foam" // 喷涂式泡沫绝热层（橙色低温贮箱）
  | "carbon" // 碳纤维复合材料
  | "solid-booster" // 固体助推器壳体
  | "engine-metal" // 发动机舱与喷管
  | "copper-nozzle" // 再生冷却铜合金喷管
  | "heatshield" // 隔热瓦 / 烧蚀层
  | "scorched"; // 被氢焰燎黑的泡沫（Delta IV Heavy）

/**
 * 涂装图案 —— 在部件表面用程序化贴图叠加的标识。
 * 这些图案不是装饰：滚动标识用于地面光学跟踪判读姿态，
 * 隔热瓦的分布直接说明了再入时哪一面朝下。
 */
export interface PartLivery {
  kind:
    | "roll-pattern" // 象限式黑白滚动标识（土星五号、V-2）
    | "checker" // 黑白格（V-2 的试验涂装）
    | "bands" // 横向色带
    | "tiles" // 隔热瓦阵列（只覆盖迎风面）
    | "text"; // 侧面字样（USA、CZ-5 等）
  /** bands: 每条带的位置（0=底 1=顶）与颜色 */
  bands?: { from: number; to: number; color: string }[];
  /** text: 竖排/横排字样 */
  text?: string;
  /** 图案主色（默认取自 finish） */
  color?: string;
}

/** 部件在爆炸视图中的归组；也用于「按级高亮」。 */
export type PartGroup =
  | "payload"
  | "stage-3"
  | "stage-2"
  | "stage-1"
  | "booster"
  | "core";

export interface RocketPart {
  id: string;
  name: string;
  nameEn?: string;
  group: PartGroup;
  shape: PartShape;
  /** 部件底面距发射台的高度（m），火箭底部 = 0 */
  bottom: number;
  height: number;
  /** 底半径（m）。frustum 用 radius→radiusTop 收缩。 */
  radius: number;
  radiusTop?: number;
  /** 覆盖分组默认配色 */
  color?: string;
  /** 表面处理，决定材质质感；缺省时按分组与形状推断 */
  finish?: PartFinish;
  /** 程序化涂装图案 */
  livery?: PartLivery;
  /** 绕轴周向阵列：助推器、尾翼、栅格舵 */
  cluster?: { count: number; offset: number; phase?: number };
  /** shape==='engines' 时的喷管布局 */
  nozzles?: { count: number; bellRadius: number; bellHeight: number; ringRadius?: number };
  /** 点击部件后侧栏显示的说明——这是「看得见的设计逻辑」的落点 */
  description: string;
  /** 是否参与剖面视图（内部结构件在剖切时才显示） */
  internal?: boolean;
}

export interface RocketGeometry {
  /** 与 Rocket.height 一致（m），用于比例校验 */
  totalHeight: number;
  /** 含助推器的最大横向半径（m），用于相机取景与剪影画布 */
  maxRadius: number;
  parts: RocketPart[];
  /**
   * schematic: 按公开尺寸复原的示意模型（外形比例可信，细节简化）
   * detailed:  有可靠外形图/官方模型佐证
   */
  fidelity: "schematic" | "detailed";
  /** 模型说明与依据，展示在查看器角落 */
  modelNote: string;
  /** 若日后接入 GLB，填此路径即可自动切换到实模渲染 */
  model3d?: string;
}

export interface LaunchRecord {
  total: number;
  success: number;
  /** 部分失败（未完全达成任务但入轨等） */
  partial?: number;
  failure: number;
  /** 统计截止日期 */
  asOf: string;
  /** 重要任务 */
  notable: { date: string; name: string; note: string }[];
}

export interface Milestone {
  date: string;
  title: string;
  note: string;
}

/** 设计逻辑的结构化承载：每条都是一个「为什么」而不是「是什么」。 */
export interface DesignTradeoff {
  question: string;
  /** 支持 Markdown + KaTeX */
  answer: string;
}

export interface Rocket {
  slug: string;
  name: string;
  nameZh: string;
  country: string;
  countryZh: string;
  agency: string[];
  family: string;
  status: RocketStatus;
  firstFlight: string;
  lastFlight?: string;

  height: number;
  diameter: number;
  /** 含助推器的最大横向尺寸（m） */
  span?: number;
  mass: number;
  stageCount: number;
  stages: Stage[];

  payloadLEO?: number;
  payloadGTO?: number;
  payloadSSO?: number;
  payloadTLI?: number;
  /** 载荷占起飞质量比例由 payloadLEO/mass 计算，无需存储 */

  reusable: boolean;
  reuseNote?: string;
  humanRated?: boolean;

  /** 一句话定位（列表卡片与 SEO description 复用） */
  description: string;
  /** 概览 Tab：历史背景（Markdown） */
  history: string;
  /** 设计逻辑 Tab 的开篇总纲（Markdown） */
  designPhilosophy: string;
  /** 设计逻辑 Tab 的问答式主体 —— 本站的核心内容 */
  tradeoffs: DesignTradeoff[];
  /** 与同时代火箭的对比思考（Markdown） */
  contemporaries?: string;

  milestones: Milestone[];
  launches?: LaunchRecord;

  variants: { name: string; note: string; slug?: string }[];
  relatedRockets: string[];
  /** 关联的原理专题 slug */
  principles: string[];

  geometry: RocketGeometry;
  sources: Source[];
  tags: string[];
}

export interface Family {
  slug: string;
  name: string;
  nameZh: string;
  countryZh: string;
  /** Markdown：家族的演进主线 */
  summary: string;
  /** 谱系条目，可包含库中尚未收录的型号 */
  lineage: { name: string; years: string; note: string; slug?: string }[];
  members: string[];
  related: string[];
}

export interface Principle {
  slug: string;
  title: string;
  titleEn: string;
  /** 列表页摘要 */
  summary: string;
  /** 阅读时长（分钟），人工估算 */
  readingMinutes: number;
  /** 正文，Markdown + KaTeX（$...$ / $$...$$） */
  body: string;
  /** 「应用了该原理的典型火箭」 */
  examples: { slug: string; why: string }[];
  sources: Source[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  countryZh: string;
  note: string;
  /** first-orbit / human / heavy-lift / reuse / commercial … */
  kind: "milestone" | "debut" | "program" | "loss";
  rocket?: string;
}
