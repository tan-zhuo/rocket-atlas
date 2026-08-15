import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "booster-body",
    name: "K3 助推器（4 枚）",
    nameEn: "K3 boosters",
    group: "booster",
    shape: "cylinder",
    finish: "painted-white",
    height: 23.4,
    radius: 1.675,
    cluster: { count: 4, offset: 4.2, phase: 45 },
    description:
      "四枚 3.35 m 直径的煤油/液氧助推器，每枚装 2 台 YF-100。整枚火箭 1,060 t 起飞推力里有 960 t 来自助推器——芯级的两台氢氧机在海平面只贡献约 10%。这是「氢氧芯级 + 煤油助推」构型的典型特征：起飞推力靠助推器解决，芯级负责高比冲的持续加速。",
  })
  .at(0, {
    id: "booster-engines",
    name: "YF-100 发动机（8 台）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 3.2,
    radius: 1.675,
    cluster: { count: 4, offset: 4.2, phase: 45 },
    nozzles: { count: 2, bellRadius: 0.75, bellHeight: 2.2, ringRadius: 0.8 },
    description:
      "YF-100 是中国第一款富氧分级燃烧循环发动机，单台海平面推力 1,200 kN，室压 18 MPa。它的技术源头是引进消化的 RD-120 燃气发生器技术路线，2012 年定型后成为长征五号、六号、七号、八号乃至商业火箭的共用主力机型——一款发动机撑起了整个新一代长征系列。",
  })
  .at(23.4, {
    id: "booster-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 4.2,
    radius: 1.675,
    cluster: { count: 4, offset: 4.2, phase: 45 },
    description:
      "斜切头锥。助推器与芯级采用「捆绑传力」结构：主传力点在助推器头部（前捆绑点），推力通过头锥根部的球窝接头传给芯级——这样芯级的推力结构只需在一个环面上加强。",
  })
  .at(0, {
    id: "core-engines",
    name: "YF-77 发动机（2 台）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 3.5,
    radius: 2.5,
    nozzles: { count: 2, bellRadius: 1.05, bellHeight: 2.6, ringRadius: 1.2 },
    description:
      "中国唯一的大推力氢氧发动机，燃气发生器循环，单台真空推力 700 kN、真空比冲 430 s。它同时也是长征五号研制中最难的一环：2017 年第二次飞行失败的直接原因就是 YF-77 涡轮泵的局部结构在高温高转速下失效，此后停飞近 908 天做设计更改。",
  })
  .at(3.5, {
    id: "core-stage1",
    name: "芯一级",
    nameEn: "Core stage",
    group: "core",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "text", text: "CZ-5", color: "#b4231d" },
    height: 31.2,
    radius: 2.5,
    description:
      "5 m 直径的液氢/液氧芯级。5 m 是个关键数字——它超出了中国既有铁路隧道的运输极限，直接导致长征五号必须在天津新建总装厂、经海运送往文昌，也正是文昌发射场选址的原因之一。运输约束改变了发射场地理，这在世界航天史上并不多见。",
  })
  .at(34.7, {
    id: "stage2",
    name: "芯二级",
    nameEn: "Second stage",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 10,
    radius: 2.5,
    description:
      "装 2 台可摆动的 YF-75D 膨胀循环氢氧发动机，真空比冲 442 s，可两次启动。膨胀循环没有燃气发生器，靠液氢在推力室夹套中受热汽化驱动涡轮——结构最简单、可靠性最高，但推力受换热面积限制，只适合上面级。",
  })
  .at(44.7, {
    id: "fairing",
    name: "有效载荷整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 12.27,
    radius: 2.6,
    description:
      "5.2 m 直径、12.267 m 长的冯·卡门曲线整流罩。CZ-5B 构型使用 20.5 m 的加长整流罩以容纳天宫空间站的舱段——这是全球现役最大的整流罩之一。",
  });

export const longMarch5: Rocket = {
  slug: "long-march-5",
  name: "Long March 5 (CZ-5)",
  nameZh: "长征五号",
  country: "China",
  countryZh: "中国",
  agency: ["CALT 中国运载火箭技术研究院", "CASC 中国航天科技集团"],
  family: "long-march-new",
  status: "active",
  firstFlight: "2016-11-03",

  height: 56.97,
  diameter: 5,
  span: 11.75,
  mass: 869000,
  stageCount: 2,

  stages: [
    {
      name: "Boosters (K3 ×4)",
      nameZh: "助推器（4 枚）",
      propellant: "kerolox",
      propellantZh: "煤油 / 液氧",
      thrustSeaLevel: 9600,
      burnTime: 173,
      propellantMass: 620000,
      diameter: 3.35,
      height: 27.6,
      note: "四枚助推器提供起飞推力的约 90%。",
      engines: [
        {
          name: "YF-100",
          count: 8,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "kerolox",
          thrust: 1200,
          thrustSeaLevel: 1200,
          thrustVacuum: 1340,
          ispSeaLevel: 300,
          ispVacuum: 335,
          note: "每枚助推器 2 台，共 8 台。",
        },
      ],
    },
    {
      name: "Core Stage",
      nameZh: "芯一级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustSeaLevel: 1020,
      thrustVacuum: 1400,
      burnTime: 490,
      propellantMass: 165000,
      diameter: 5,
      height: 33.16,
      note: "在助推器分离后继续工作约 300 s，本质上承担了「二级」的角色。",
      engines: [
        {
          name: "YF-77",
          count: 2,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 700,
          thrustSeaLevel: 510,
          thrustVacuum: 700,
          ispSeaLevel: 310,
          ispVacuum: 430,
        },
      ],
    },
    {
      name: "Second Stage",
      nameZh: "芯二级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 176.7,
      burnTime: 780,
      diameter: 5,
      height: 11.5,
      note: "可两次启动，负责 GTO 与地月转移的最后注入。",
      engines: [
        {
          name: "YF-75D",
          count: 2,
          cycle: "expander",
          cycleZh: "膨胀循环",
          propellant: "hydrolox",
          thrust: 88.36,
          thrustVacuum: 88.36,
          ispVacuum: 442,
          note: "中国第一款膨胀循环发动机，可多次启动。",
        },
      ],
    },
  ],

  payloadLEO: 25000,
  payloadGTO: 14000,
  payloadTLI: 8200,
  reusable: false,
  humanRated: false,

  description:
    "中国新一代运载火箭的顶端型号，把中国的近地轨道运力从 8.6 t 一次性拉高到 25 t，是空间站、探月与火星任务的物质前提。",

  history: `长征五号的立项动机可以用一个数字概括：在它之前，中国运力最强的长征三号乙 LEO 运力约 12 t、GTO 5.5 t，而建造一座 60 t 级空间站、发射 8 t 级月球采样返回器都需要至少 20 t 以上的近地运力。2006 年国务院正式批复长征五号立项，配套的 YF-100 与 YF-77 两型发动机预研更早，可追溯到 1990 年代末。

研制周期长达十年，卡点几乎全在发动机与新推进剂上：中国此前的长征系列全部使用可贮存的偏二甲肼/四氧化二氮，长征五号则要同时掌握大推力液氧煤油与大推力液氢液氧两条全新技术路线，还要在一枚火箭上把它们组合起来。

2016 年 11 月 3 日首飞成功（过程中芯一级发生过异常但仍入轨）。2017 年 7 月 2 日第二次飞行因 YF-77 涡轮泵失效而失败，这次失败连锁推迟了嫦娥五号、火星探测与空间站的全部计划。经过两年多归零，2019 年 12 月 27 日复飞成功。此后接连执行了**天问一号火星探测（2020）、嫦娥五号月球采样返回（2020）、天和核心舱（2021，CZ-5B 构型）、嫦娥六号月背采样（2024）**等中国航天最重要的任务。`,

  designPhilosophy: `长征五号的设计逻辑是**用一个模块化发动机体系一次性替换掉整个长征家族的技术基础**。

它不是一枚孤立的火箭，而是「新一代长征」体系的顶端：同一款 YF-100 煤油机用于长征五号助推器、长征六号一级、长征七号一二级、长征八号；同一款 3.35 m 与 2.25 m 模块在不同型号间复用。这种设计使中国得以在 15 年内把无毒无污染的低温推进剂推广到整个现役谱系，同时把研制风险集中在两三型发动机上。

第二条主线是**用推进剂类型的分工来兼顾起飞推力与高空效率**：起飞推力由密度高、推力大的煤油助推器提供，芯级则选择比冲最高的氢氧，从一开始就以「上面级思维」工作（芯一级要点火 490 s，远超一般一级的 150–180 s）。这与美俄常见的「煤油一级 + 氢氧上面级」正好相反，也带来了独特的问题——起飞时两台 YF-77 在海平面推力不足，火箭在助推器分离前几乎完全依赖捆绑段传力。

第三条是**受制于运输的直径选择**：5 m 是海运可行、公路不可行的直径，这个决定把新一代火箭的总装与发射基地整体搬到了海南文昌。`,

  tradeoffs: [
    {
      question: "为什么芯级用氢氧，而不像 Falcon 9 那样全用煤油？",
      answer: `长征五号的芯一级要工作 490 s——是 Falcon 9 一级（162 s）的三倍。这说明它在任务剖面里根本不是传统意义上的「一级」，而更像一个从地面就开始工作的**二级**：起飞阶段的推力主要由四枚煤油助推器承担，芯级只需要维持推力并在助推器脱落后独自加速到接近入轨速度。

在这个角色下，比冲的价值远高于推力密度：YF-77 的真空比冲 430 s，比 YF-100 的 335 s 高出近 100 s。对一个要工作 490 s 的级来说，这个差值直接转化成运力。

代价有三个，而且都很实在：

1. **氢的密度太低**（71 kg/m³）。为了装下 165 t 氢氧推进剂，芯级直径必须做到 5 m，这就撞上了陆路运输的天花板。
2. **海平面推力不足**。两台 YF-77 在海平面合计只有约 1,020 kN，而全箭起飞质量 869 t——单靠芯级推重比远小于 1。整枚火箭在助推器分离前的推力结构、气动载荷分布都要围绕这个特点重新设计。
3. **大推力氢氧机极难**。YF-77 的研制困难直接造成了 2017 年的失败与 908 天停飞。相比之下，煤油机 YF-100 的成熟度要高得多。

这是一个「为最终性能付出研制风险」的选择。如果只看单发可靠性与进度，全煤油方案（类似长征七号）显然更稳妥；但那样就拿不到 25 t 的 LEO 运力。`,
    },
    {
      question: "为什么用 4 枚助推器捆绑，而不是把芯级做得更大？",
      answer: `捆绑构型在中国、欧洲、日本、印度的重型火箭上几乎是统一选择，原因是**它把「增加推力」与「增加箭体直径」解耦了**。

把芯级从 5 m 加粗到 8 m，需要的不只是更大的贮箱：总装厂房、运输船、发射台导流槽、脐带塔、风载计算全部要重做，而且推力结构的载荷会随直径平方增长。捆绑助推器则可以在既有芯级基础上「加模块」：CZ-5 用 4 枚，CZ-7 用 4 枚较小的，CZ-8 用 2 枚，甚至可以不捆绑（CZ-8A）。同一套 3.35 m 模块与同一款 YF-100 支撑了整个谱系。

代价是**分离事件变多**：4 枚助推器要在同一秒内可靠分离且不碰撞芯级，任何一枚异常都会导致姿态失控。为此长征五号采用了「前捆绑主传力 + 后支撑」的结构，分离时先解锁后支撑、再由头部推冲器把助推器向外推开。

另一个隐性代价是**气动干扰**：捆绑体的绕流远比光滑圆柱复杂，跨声速段的抖振与局部热流需要大量风洞试验来标定。`,
    },
    {
      question: "CZ-5B 为什么砍掉二级？争议在哪？",
      answer: `CZ-5B 是长征五号的一个变体：**保留 4 枚助推器与氢氧芯级，直接去掉整个二级**，换上 20.5 m 的加长整流罩。它专门用于发射天宫空间站的 20 t 级舱段。

逻辑很直接：空间站舱段的目标轨道只有约 400 km 的低轨，芯一级工作 490 s 后已经接近入轨速度，再加一级反而是多余的质量与多余的分离风险。一级半构型让 LEO 运力保持在 25 t，同时简化了飞行时序。

但这带来一个后果：**芯一级本身被送进了轨道。** 一个 20 t 级的空箭体入轨后无法主动离轨，只能在轨道上逐渐衰减、几天后不受控地再入大气层。2020–2022 年的几次 CZ-5B 发射都发生了残骸不受控再入事件，落区从西非到印度洋不等，招致 NASA 与多国航天机构的公开批评。

这是一个典型的**局部最优 vs 全局责任**的权衡：在单次任务的效率视角下，一级半构型无可挑剔；但在轨道环境责任的视角下，它把一个 20 t 的不可控物体交给了大气层。国际上通行做法是给末级留出离轨推进剂或做钝化处理，而这会吃掉一部分运力。后续型号（长征十号系列）已按可控离轨设计。`,
    },
    {
      question: "十年研制、一次失败、908 天停飞，值得吗？",
      answer: `从项目管理角度这是个昂贵的教训：2017 年的失败让嫦娥五号推迟三年、天问一号错过一个火星窗口需重新规划、空间站建造整体后移。

但换个视角：长征五号真正交付的不是一枚火箭，而是**两条全新的发动机技术路线与一整套低温推进剂基础设施**。YF-100 定型后被复制到六、七、八号以及后续型号上；文昌发射场、天津总装厂、海运体系都成为长期资产。2019 年复飞之后，长征五号系列的连续成功率极高，并在五年内完成了火星、月球采样、空间站三大任务。

这引出一个更普遍的判断：**重型运载火箭的研制周期与失败代价，本质上是国家级基础设施建设的代价，而不是单个产品的成本。** 用商业火箭的迭代节奏去评价它，会得出误导性的结论；反过来，用国家工程的容错标准去要求商业火箭，同样不合适。`,
    },
  ],

  contemporaries: `与长征五号同级的现役型号是 **Delta IV Heavy**（LEO 28 t）、**Ariane 5 ECA**（LEO 21 t）、**Falcon 9**（LEO 22.8 t）与 **H3**（LEO 约 16 t）。在这一档里，长征五号是唯一采用「氢氧芯级 + 4 枚煤油助推」构型的——Ariane 5 与 H-IIA 用固体助推器，Delta IV Heavy 用三个氢氧芯级并联。

固体助推器起飞推力大、结构简单、可长期贮存，但比冲低（约 270 s）且点火后无法关机；液体煤油助推器比冲高约 30 s、可节流可关机，代价是发射前流程复杂得多。长征五号选择液体助推，与它「所有环节一次性换代到无毒低温」的总目标是一致的。`,

  milestones: [
    { date: "2006-10", title: "国务院批复立项", note: "配套的 YF-100 / YF-77 预研更早启动。" },
    { date: "2016-11-03", title: "首飞成功", note: "从文昌发射场首飞，中国运载能力跨入 25 t 级。" },
    { date: "2017-07-02", title: "遥二失败", note: "YF-77 涡轮泵失效，此后停飞 908 天。" },
    { date: "2019-12-27", title: "复飞成功", note: "遥三成功发射实践二十号卫星。" },
    { date: "2020-07-23", title: "发射天问一号", note: "中国首次自主火星探测任务。" },
    { date: "2020-11-24", title: "发射嫦娥五号", note: "月球采样返回，8.2 t 探测器直接送入地月转移轨道。" },
    { date: "2021-04-29", title: "CZ-5B 发射天和核心舱", note: "中国空间站建造开始。" },
  ],

  launches: {
    total: 14,
    success: 13,
    failure: 1,
    asOf: "2025-06-30",
    notable: [
      { date: "2016-11-03", name: "首飞 / 实践十七号", note: "芯级异常但成功入轨。" },
      { date: "2017-07-02", name: "遥二 / 实践十八号", note: "唯一一次失败。" },
      { date: "2020-11-24", name: "嫦娥五号", note: "地月转移直接入轨，误差极小。" },
      { date: "2024-05-03", name: "嫦娥六号", note: "人类首次月球背面采样返回。" },
    ],
  },

  variants: [
    { name: "CZ-5", note: "标准两级半构型，用于高轨与深空任务。" },
    { name: "CZ-5B", note: "一级半构型，20.5 m 加长整流罩，用于空间站舱段。" },
    { name: "CZ-5 遥改 / CZ-5DY", note: "远征二号上面级构型，可直接送入 GEO。" },
  ],
  relatedRockets: ["long-march-2f", "ariane-5", "delta-iv-heavy"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 CASC 公开资料的 56.97 m 总高、5 m 芯级直径、3.35 m 助推器与 5.2 m 整流罩复原。助推器长度与头锥形状为示意，实际助推器头部为斜切构型。",
  }),

  sources: [
    {
      title: "长征五号运载火箭 — 中国运载火箭技术研究院",
      url: "http://www.calt.com/",
      publisher: "CALT",
      confidence: "high",
      note: "总体参数与构型的官方来源。",
    },
    {
      title: "LM-5 User's Manual",
      url: "http://www.cgwic.com/LaunchServices/LaunchVehicle/LM5.html",
      publisher: "CGWIC 中国长城工业集团",
      confidence: "high",
      note: "运力包络、整流罩尺寸、载荷接口。",
    },
    {
      title: "Long March 5 — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Long_March_5",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录与各次任务结果；起飞质量在 867–879 t 之间不同来源有差异。",
    },
  ],

  tags: ["重型运载", "氢氧芯级", "捆绑助推", "深空探测", "空间站"],
};
