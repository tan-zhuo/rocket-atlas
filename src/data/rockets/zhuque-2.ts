import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, band, flag, text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "tq12-cluster",
    name: "天鹊 TQ-12 发动机（4 台）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3.5,
    radius: 1.675,
    nozzles: { count: 4, bellRadius: 0.62, bellHeight: 2.3, ringRadius: 0.85 },
    description:
      "四台液氧甲烷发动机，单台海平面推力 657 kN。天鹊系列是中国第一款投入飞行的大推力甲烷机，采用燃气发生器循环——没有走分级燃烧的技术路线，是商业公司在研制周期与技术风险之间的典型取舍：**先做出能飞的，再做更好的。**",
  })
  .at(3.5, {
    id: "s1-body",
    name: "一级箭体",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    // 白漆箭体 + 蓝箭航天的蓝色标识 + 五星红旗
    livery: [
      band(0.0, 0.05, PAINT.landspace),
      text("ZQ-2", PAINT.landspace, 0.74, 0.95),
      flag("cn", 0.58, 0.9),
    ],
    height: 24,
    radius: 1.675,
    description:
      "3.35 m 直径——与长征二号/三号/四号系列相同。这个尺寸在中国有完整的工装、模具、运输与发射设施配套，商业公司沿用它可以大幅降低基础设施成本。**创新集中在推进剂与发动机上，箭体尺寸则跟随既有工业体系，这是中国商业火箭的普遍策略。**",
  })
  .at(27.5, {
    id: "interstage",
    name: "级间段",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-black",
    height: 2,
    radius: 1.675,
    description: "级间段。朱雀二号改进型（2E/3）规划了一级垂直回收能力，级间段将改为带栅格舵的可回收构型。",
  })
  .at(29.5, {
    id: "s2-body",
    name: "二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 9,
    radius: 1.675,
    description:
      "一台真空版 TQ-12（推力 785 kN）+ 四台 TQ-11 游动发动机（各 98 kN）。首飞失败的原因正出在这里：**游动发动机的推进剂供应管路失效**，导致二级在主机关机后无法完成末速修正，载荷未能入轨。第二发针对性改进后即成功。",
  })
  .at(38.5, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 11,
    radius: 1.675,
    description: "3.35 m 直径整流罩。改进型 2E 换用 4.2 m 大整流罩以适应星座卫星的批量部署。",
  });

export const zhuque2: Rocket = {
  slug: "zhuque-2",
  name: "Zhuque-2 (ZQ-2)",
  nameZh: "朱雀二号",
  country: "China",
  countryZh: "中国",
  agency: ["LandSpace 蓝箭航天"],
  family: "zhuque",
  status: "active",
  firstFlight: "2022-12-14",

  height: 49.5,
  diameter: 3.35,
  span: 3.35,
  mass: 219000,
  stageCount: 2,

  stages: [
    {
      name: "First Stage",
      nameZh: "一级",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustSeaLevel: 2628,
      thrustVacuum: 2999,
      burnTime: 170,
      diameter: 3.35,
      height: 27.5,
      note: "改进型规划垂直回收，标准型为一次性。",
      engines: [
        {
          name: "天鹊 TQ-12",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "methalox",
          thrust: 657,
          thrustSeaLevel: 657,
          thrustVacuum: 750,
          ispSeaLevel: 285,
          ispVacuum: 320,
          note: "中国第一款投入飞行的大推力液氧甲烷发动机。",
        },
      ],
    },
    {
      name: "Second Stage",
      nameZh: "二级",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustVacuum: 785,
      burnTime: 300,
      diameter: 3.35,
      height: 11,
      engines: [
        {
          name: "天鹊 TQ-12 真空版",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "methalox",
          thrust: 785,
          thrustVacuum: 785,
          ispVacuum: 337,
        },
        {
          name: "天鹊 TQ-11（游动发动机）",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "methalox",
          thrust: 98,
          thrustVacuum: 98,
          ispVacuum: 338,
          note: "负责二级姿态控制与末速精调。",
        },
      ],
    },
  ],

  payloadLEO: 6000,
  payloadSSO: 4000,
  reusable: false,
  reuseNote: "标准型一次性；改进型 ZQ-2E 与后继的 ZQ-3 规划一级垂直回收。",
  humanRated: false,

  description:
    "世界上第一枚成功入轨的液氧甲烷运载火箭，也是中国民营航天第一次在一项关键技术上跑到国际前面。",

  history: `蓝箭航天成立于 2015 年，是中国最早的一批民营火箭公司之一。它的第一枚火箭朱雀一号（固体，2018 年）三级姿控失效未能入轨；随后公司做了一个当时看来相当激进的决定：**直接跳过煤油，研制液氧甲烷发动机。**

理由是判断甲烷是可回收火箭的未来——燃烧洁净无积碳、密度高于液氢、可深冷贮存、与液氧温度接近便于共底设计。这个判断与 SpaceX 的 Raptor、Blue Origin 的 BE-4、Rocket Lab 的 Archimedes 不谋而合。

2022 年 12 月 14 日朱雀二号首飞失败，原因是二级游动发动机的推进剂管路失效。2023 年 7 月 12 日第二次发射成功——**这使朱雀二号成为世界上第一枚成功入轨的液氧甲烷火箭**，比 SpaceX 的 Starship、Blue Origin 的 New Glenn、ULA 的 Vulcan、Relativity 的 Terran 1 都要早。

这是一个有象征意义但需要谨慎解读的「第一」：朱雀二号的运力（LEO 6 t）远小于同期在研的其他甲烷火箭，技术路线（燃气发生器循环）也更保守。**它赢的是首次入轨的时间点，而不是技术水平。**

此后公司推出了改进型 ZQ-2E（换大整流罩、增大运力），并在研可回收的 ZQ-3——后者采用不锈钢箭体、3.8 m 直径、目标 LEO 21 t（回收构型 18.3 t）。`,

  designPhilosophy: `朱雀二号的设计逻辑是**「在一项技术上激进，在其余所有方面保守」**。

激进的部分只有一个：推进剂选甲烷。这在 2018 年是一个没有任何中国企业验证过的方向，需要从零建立发动机、贮箱、加注、试车台的全套能力。

保守的部分则一应俱全：

- **箭体直径 3.35 m**——沿用长征系列的成熟尺寸，工装、运输、发射工位都能复用现有工业体系；
- **燃气发生器循环**——不追求分级燃烧的高比冲，选择结构最简单、研制风险最低的循环；
- **两级串联 + 游动发动机控姿**——完全是长征二号系列的经典布局；
- **不做回收**——首个型号只求入轨，把回收留给下一代。

这个组合背后的判断很清晰：**一家初创公司的研制预算只够在一个方向上冒险。** 把风险集中在最有长期价值的那一项（甲烷推进），其余全部踩在已经被验证的路径上。

对比 Relativity Space 的 Terran 1——它同时挑战了甲烷推进和「整箭 3D 打印」两项新技术，首飞失败后直接放弃了该型号转向 Terran R。**同时下两个赌注的代价，在这个行业里往往是致命的。**`,

  tradeoffs: [
    {
      question: "为什么直接跳过煤油做甲烷？",
      answer: `2018 年中国商业火箭公司的主流选择是液氧煤油——技术成熟、供应链完备、有 YF-100 的工业基础可以参照。蓝箭却选了甲烷，理由是三条对**未来**的判断：

1. **积碳**。煤油燃烧会在喷注器、燃气发生器和涡轮上留下积碳，复用前必须清洗甚至分解检查。甲烷是最简单的碳氢化合物（CH₄），燃烧洁净，理论上可以「点火即飞、飞完即再飞」。对以复用为长期目标的公司，这是决定性的。
2. **共底贮箱**。液氧沸点 −183 °C，液态甲烷 −162 °C，两者温差只有 21 °C；而煤油是常温的、液氢是 −253 °C。温差小意味着可以用简单的共底结构而不需要厚重的绝热层，箭体能做得更短更轻。
3. **密度与比冲的平衡**。甲烷密度 423 kg/m³（是液氢的 6 倍），真空比冲可达 360 s 以上（比煤油高约 20 s）。它在密度和比冲之间的位置，恰好适合可回收火箭——回收需要留推进剂，密度高意味着贮箱不用做大。

代价是**从零开始**：没有现成的发动机可以参考、没有甲烷加注设施、没有低温甲烷的贮运经验、供应链上连合格的液态甲烷供应商都要自己找。首飞晚了两年多，很大一部分时间花在这些「不性感」的基础工作上。

事后看这个赌注押对了：今天全球在研的新一代可回收火箭中，选甲烷的占绝大多数。`,
    },
    {
      question: "「世界首枚入轨甲烷火箭」这个头衔有多大含金量？",
      answer: `需要拆开看。

**它确实是真的第一**：2023 年 7 月 12 日入轨，早于 Vulcan（2024 年 1 月）、Terran 1（2023 年 3 月失败）、Starship（至今未完成入轨任务）、New Glenn（2025 年 1 月）。

**但比较的对象不在同一量级**：

| 火箭 | LEO 运力 | 发动机循环 | 复用 |
|---|---|---|---|
| 朱雀二号 | 6 t | 燃气发生器 | 无 |
| Vulcan | 27.2 t | 富氧分级燃烧 | 无 |
| New Glenn | 45 t | 富氧分级燃烧 | 一级 |
| Starship | 100 t+ | 全流量分级燃烧 | 两级（目标） |

朱雀二号的技术复杂度明显低于其余几型。它选了甲烷火箭中最容易做的那一档：小推力、简单循环、不回收。

那么这个「第一」的意义在哪？在于**它证明了甲烷推进的工程路径是通的**，并且是由一家成立仅七年、员工千人规模的民营公司做到的。对中国商业航天而言，它的价值更多在产业层面：验证了民企可以独立完成新型发动机研制、可以拿到发射许可与工位、可以走完从试车到入轨的完整链条。

**技术上的「第一」和产业上的「第一」是两件事，朱雀二号赢的主要是后者。**`,
    },
    {
      question: "首飞失败在游动发动机上，说明了什么？",
      answer: `2022 年 12 月的首飞中，一二级工作正常，但二级主机关机后**游动发动机的推进剂管路失效**，末速修正未能完成，载荷未入轨。

游动发动机（vernier）是中国火箭的经典设计：主机固定不动、只提供推力，姿态控制交给四台小推力的可摆动发动机。这个方案的好处是主机结构简单（不需要万向节和柔性管路）、控制解耦清晰；代价是**多了四套完整的推进系统**，每一套都有自己的管路、阀门和点火器。

失败发生在这里并非偶然：游动发动机的管路细、工况变化剧烈（要频繁启停摆动）、在低温甲烷条件下的流动特性又是全新的。**它是整枚火箭里「零件最多、验证最少」的部分。**

更普遍的教训是：新技术项目的失败往往不发生在最受关注的核心技术上，而发生在**被认为「已经会了」的配套系统上**。核心的 TQ-12 发动机经过了大量试车，反而工作正常；出问题的是被沿用的传统设计在新推进剂环境下的表现。这与 Ariane 5 首飞（复用 Ariane 4 的软件）、Vega-C（沿用的喷管材料）的失败模式如出一辙。`,
    },
  ],

  contemporaries: `中国商业火箭同期的对手包括 **天龙三号**（天兵科技，煤油，LEO 17 t，可回收）、**引力二号**（东方空间，固液结合）、**双曲线三号**（星际荣耀，甲烷可回收）、**力箭一号**（中科宇航，固体）。几乎所有 2023 年后立项的中国商业火箭都指向同一个目标构型：**液氧甲烷或液氧煤油 + 一级垂直回收 + 3.8–4.2 m 直径 + LEO 15–20 t**——本质上是 Falcon 9 的对标物。

驱动力很明确：中国的两个巨型星座（GW 星网与千帆/G60）合计规划超过 2.6 万颗卫星，现有的长征系列产能远不足以支撑。**这是一个由需求侧确定性驱动的产业窗口，而不是由技术突破驱动的。**`,

  milestones: [
    { date: "2018-10-27", title: "朱雀一号发射失败", note: "固体三级姿控失效，公司随后转向液体火箭。" },
    { date: "2019-05", title: "TQ-12 首次全系统试车", note: "中国首台大推力液氧甲烷发动机点火成功。" },
    { date: "2022-12-14", title: "朱雀二号首飞失败", note: "二级游动发动机管路失效。" },
    { date: "2023-07-12", title: "遥二飞行成功", note: "世界第一枚成功入轨的液氧甲烷运载火箭。" },
    { date: "2023-12-09", title: "遥三成功发射三颗卫星", note: "首次执行实际商业载荷任务。" },
  ],

  launches: {
    total: 6,
    success: 5,
    failure: 1,
    asOf: "2025-06-30",
    notable: [
      { date: "2022-12-14", name: "遥一", note: "首飞失败。" },
      { date: "2023-07-12", name: "遥二", note: "全球首枚入轨甲烷火箭。" },
      { date: "2023-12-09", name: "遥三", note: "首次商业载荷任务成功。" },
    ],
  },

  variants: [
    { name: "朱雀二号（标准型）", note: "3.35 m 整流罩，LEO 6 t。" },
    { name: "朱雀二号改进型 ZQ-2E", note: "4.2 m 大整流罩，运力提升，面向星座批量发射。" },
    { name: "朱雀三号 ZQ-3", note: "在研的不锈钢可回收火箭，3.8 m 直径，LEO 21 t（一次性）。" },
  ],
  relatedRockets: ["falcon-9", "electron", "long-march-5"],
  principles: ["propellants-and-cycles", "reusability"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按蓝箭航天公开的 49.5 m 总高、3.35 m 直径复原（标准型构型）。各段长度分配为示意。涂装：白漆箭体，蓝色企业标识与五星红旗位于一级上段。",
  }),

  sources: [
    {
      title: "蓝箭航天 — 朱雀二号运载火箭",
      url: "https://www.landspace.com/",
      publisher: "LandSpace 蓝箭航天",
      confidence: "high",
      note: "总体参数、发动机与构型的官方来源。",
    },
    {
      title: "Zhuque-2 — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Zhuque-2",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录与各次任务结果；部分参数为公开报道汇总，官方未发布完整质量数据。",
    },
    {
      title: "Chinese commercial launch sector overview",
      url: "https://spacenews.com/",
      publisher: "SpaceNews",
      confidence: "medium",
      note: "首飞失败原因与产业背景的报道来源。",
    },
  ],

  tags: ["甲烷", "商业航天", "全球首枚甲烷入轨", "中国民营", "中型运载"],
};
