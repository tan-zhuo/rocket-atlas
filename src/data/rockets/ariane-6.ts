import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

/** 按 A64 构型（四枚 P120C 助推器）建模。 */
const g = rocketGeometry()
  .at(0, {
    id: "vulcain",
    name: "火神 2.1 发动机",
    nameEn: "Vulcain 2.1",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 4.2,
    radius: 2.7,
    nozzles: { count: 1, bellRadius: 1.15, bellHeight: 3.4 },
    description:
      "阿丽亚娜 5 的火神 2 改进而来：喷管延伸段改用**成本更低的钣金焊接结构**，并大量采用增材制造。性能几乎没变（真空推力 1,370 kN、比冲 431 s），改的全是制造工艺——**阿丽亚娜 6 的整个立项目标就是「同样的性能，一半的成本」。**",
  })
  .at(4.2, {
    id: "core-lh2",
    name: "芯级 液氢舱",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 20.5,
    radius: 2.7,
    description: "5.4 m 直径的芯级，与阿丽亚娜 5 同直径以沿用图卢兹与不来梅的既有工装和法属圭亚那的地面设施。",
  })
  .at(24.7, {
    id: "core-lox",
    name: "芯级 液氧舱",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 6.5,
    radius: 2.7,
    description: "液氧舱在上、液氢舱在下。芯级工作约 8 分钟，与助推器一起在起飞时点火。",
  })
  .at(0, {
    id: "p120c-nozzle",
    name: "P120C 喷管（4 枚）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2.4,
    radius: 1.5,
    cluster: { count: 4, offset: 4.3, phase: 45 },
    nozzles: { count: 1, bellRadius: 1.35, bellHeight: 2.2 },
    description: "碳/酚醛喉衬，喷管可摆动提供助推段的推力矢量控制。",
  })
  .at(2.4, {
    id: "p120c-body",
    name: "P120C 固体助推器",
    group: "booster",
    shape: "cylinder",
    finish: "solid-booster",
    height: 11.5,
    radius: 1.5,
    cluster: { count: 4, offset: 4.3, phase: 45 },
    description:
      "**这是欧洲航天最重要的一次共用设计：同一个 P120C 既是阿丽亚娜 6 的助推器，也是织女星 C 的第一级。**一个 141.6 t 装药、整体缠绕碳纤维壳体的固体发动机，两条完全不同的火箭产线共用它。目的很直接——把年产量从个位数提到二十枚以上，用产量摊薄成本。A62 装两枚，A64 装四枚。",
  })
  .at(13.9, {
    id: "p120c-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "solid-booster",
    height: 3,
    radius: 1.5,
    cluster: { count: 4, offset: 4.3, phase: 45 },
    description: "助推器在 T+130 s 左右分离，落入大西洋，不回收。",
  })
  .at(31.2, {
    id: "vinci-stage",
    name: "上面级（火神-6 / Vinci）",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 9,
    radius: 2.7,
    description:
      "一台 Vinci 发动机，膨胀循环、真空比冲 457 s、**可重启四次以上**。这是阿丽亚娜 6 相对阿丽亚娜 5 最实质的进步：阿丽亚娜 5 的 ESC-A 上面级只能点火一次，因此只能做 GTO 双星并联发射；Vinci 能多次重启，于是可以直接注入 GEO、可以一箭多轨部署星座、可以在任务末段主动离轨。**它把阿丽亚娜从「专发大 GEO 卫星」变成了一款通用火箭。**",
  })
  .at(40.2, {
    id: "apu-fairing-base",
    name: "载荷适配与辅助动力单元",
    group: "payload",
    shape: "frustum",
    finish: "painted-white",
    height: 2.8,
    radius: 2.7,
    radiusTop: 2.7,
    description:
      "上面级带一个小型辅助动力单元（APU），在长时间滑行中给贮箱增压并沉底推进剂。没有它，Vinci 的多次重启就无法实现——**在轨滑行期间怎么让推进剂待在管口，是所有可重启低温上面级共同的难题。**",
  })
  .at(43, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 20,
    radius: 2.7,
    description: "5.4 m 直径整流罩，有 14 m 与 20 m 两档。长罩构型下总高 63 m。",
  });

export const ariane6: Rocket = {
  slug: "ariane-6",
  name: "Ariane 6",
  nameZh: "阿丽亚娜六号",
  country: "Europe",
  countryZh: "欧洲",
  agency: ["欧洲空间局（ESA）", "ArianeGroup", "Arianespace"],
  family: "ariane",
  status: "active",
  firstFlight: "2024-07-09",

  height: 63,
  diameter: 5.4,
  span: 8.6,
  mass: 860000,
  stageCount: 2,

  stages: [
    {
      name: "Lower Liquid Propulsion Module + 4 × P120C",
      nameZh: "芯级 + 四枚固体助推器",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧 · HTPB 复合固体推进剂",
      thrustSeaLevel: 19740,
      burnTime: 130,
      dryMass: 14000,
      propellantMass: 715000,
      diameter: 5.4,
      height: 31.2,
      note: "四枚 P120C 与火神 2.1 同时点火；助推器 T+130 s 分离，芯级工作至约 T+490 s。",
      engines: [
        {
          name: "Vulcain 2.1",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 1370,
          thrustSeaLevel: 960,
          thrustVacuum: 1370,
          ispSeaLevel: 320,
          ispVacuum: 431,
          note: "火神 2 的低成本改进型，喷管延伸段改为钣金焊接并采用增材制造。",
        },
        {
          name: "P120C",
          count: 4,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 4650,
          thrustSeaLevel: 4650,
          ispVacuum: 278.5,
          note: "与织女星 C 的第一级完全相同，装药 141.6 t，碳纤维整体缠绕壳体。",
        },
      ],
    },
    {
      name: "Upper Liquid Propulsion Module",
      nameZh: "上面级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 180,
      burnTime: 900,
      dryMass: 4000,
      propellantMass: 31000,
      diameter: 5.4,
      height: 9,
      note: "Vinci 可重启四次以上，配辅助动力单元实现长时间在轨滑行与主动离轨。",
      engines: [
        {
          name: "Vinci",
          count: 1,
          cycle: "expander",
          cycleZh: "膨胀循环",
          propellant: "hydrolox",
          thrust: 180,
          thrustVacuum: 180,
          ispVacuum: 457,
          note: "带可展开喷管延伸段，扩张比 240，可多次重启。",
        },
      ],
    },
  ],

  payloadLEO: 21650,
  payloadGTO: 11500,
  payloadSSO: 14900,
  reusable: false,
  humanRated: false,

  description:
    "欧洲在猎鹰 9 号出现之后的答案：不追可复用，只把同样的性能做到一半的价钱——一个理性但注定被追问的选择。",

  history: `阿丽亚娜 6 的立项是一次被迫的转向。

2012 至 2014 年间，猎鹰 9 号把商业 GTO 发射价格拉到了阿丽亚娜 5 的一半。阿丽亚娜 5 的技术无可指摘（连续 82 次成功），但它的成本结构建立在「双星并联发射」上：一次发射两颗 GEO 卫星，成本各摊一半。当猎鹰 9 号可以单星发射还更便宜时，**这个模式的前提就消失了**——找不到配对的卫星，就要么等待，要么亏本单发。

2014 年 12 月，ESA 部长级会议批准阿丽亚娜 6。方案选择本身经过一场激烈争论：

- 一派主张研制可复用火箭，正面对抗猎鹰 9 号；
- 另一派认为欧洲的年发射量（十次左右）根本无法摊薄回收所需的研制投入与地面设施，主张**在一次性的框架内把成本压到极限**。

**后者赢了**，理由是一组具体的数字：回收的经济性需要每年数十次发射，而欧洲的机构市场加商业市场加起来不到十次。

于是阿丽亚娜 6 的全部改进都指向制造成本：

- 芯级贮箱改用**摩擦搅拌焊**，焊缝数量大幅减少；
- 火神 2.1 的喷管延伸段从复杂的管束结构改为钣金焊接；
- 大量部件用**增材制造**（Vinci 的喷注器头把 248 个零件合成 1 个）；
- **P120C 与织女星 C 共用**，把固体发动机的产量翻倍；
- 总装从「垂直总装、逐枚定制」改为水平总装线。

目标是把单价降到阿丽亚娜 5 的 40–50%。

首飞一再推迟：原定 2020 年，实际到 **2024 年 7 月 9 日**。中间夹着阿丽亚娜 5 的退役（2023 年 7 月）与织女星 C 的停飞（2022 年 12 月事故），**欧洲经历了近一年完全没有自主入轨能力的窗口期**——这段空白让欧洲不得不把伽利略导航卫星交给猎鹰 9 号发射。

首飞基本成功：主载荷全部部署，但末段的辅助动力单元提前关闭，导致离轨演示未完成。`,

  designPhilosophy: `阿丽亚娜 6 的核心命题是：**在一个不可能靠复用摊薄成本的市场里，怎么把一次性火箭做便宜。**

它给出的答案有三条主线。

**第一条：把成本从「设计」转移到「制造」。**

火箭的性能参数几乎没变——火神 2.1 与火神 2 的推力比冲基本相同，上面级的推进剂组合也没变。变的全是怎么造：焊接方式、零件数量、装配流程。这是一种非常「工业」的思路，与航空制造业的降本路径一致。

典型例子是 Vinci 的喷注器头：传统制造需要 248 个零件、上百道焊缝；增材制造把它做成 1 个零件。**成本下降的同时，泄漏点也从上百个变成零个。**

**第二条：靠共用把产量做上去。**

P120C 是这个思路最彻底的体现。它同时是：

- 阿丽亚娜 6 的助推器（A62 装 2 枚，A64 装 4 枚）；
- 织女星 C 的第一级（每枚 1 个）。

如果两款火箭各自研制固体发动机，年产量各只有几枚；共用之后年产量可以到二十枚以上。**这是欧洲在无法提高发射次数的前提下，唯一能获得规模效应的办法。**

**第三条：用上面级的能力换取任务的通用性。**

阿丽亚娜 5 的上面级只能点火一次，这把它锁死在「双星并联送 GTO」这一种任务上。Vinci 能重启四次以上，于是阿丽亚娜 6 可以：

- 直接把卫星送进 GEO（省掉卫星自己的变轨推进剂）；
- 一次发射把星座卫星送进多个不同轨道面；
- 任务结束后主动离轨，符合欧洲自己推动的空间碎片规则。

**这是从「专用运输船」到「通用运输船」的转变，而这个转变的技术支点只有一个：上面级能不能多次点火。**

**它放弃的是什么？** 明确放弃了可复用。这个选择在欧洲内部争议巨大，因为它把阿丽亚娜 6 的成本下限锁死在「一次性火箭能达到的最低值」——大约是猎鹰 9 号复用价格的水平，而不是更低。**如果 SpaceX 继续降价，阿丽亚娜 6 没有第二张牌。**ESA 已经在研制 Themis 可复用一级验证机与 Prometheus 甲烷发动机，但那是下一代的事。`,

  tradeoffs: [
    {
      question: "欧洲为什么不做可复用？",
      answer: `因为回收的经济账在欧洲的发射量下算不平——这是一个可以量化的判断，不是保守。

回收的成本模型大致是：

$$\\text{每发节省} = C_{\\text{一级}} \\times \\eta_{\\text{复用率}} - C_{\\text{检修}} - \\frac{C_{\\text{研制}} + C_{\\text{地面设施}}}{N_{\\text{总发射数}}}$$

关键在最后一项。回收需要的一次性投入包括：着陆系统的研制、栅格舵与着陆腿、驳船或着陆场、检修厂房与流程认证。SpaceX 的这笔投入被上百次发射摊薄，欧洲要用**每年不到十次**去摊。

还有第二个约束：**运力损失**。回收要消耗一级 6–8% 的推进剂，LEO 运力损失约 23%。阿丽亚娜 6 的主要客户是欧洲机构（伽利略、哥白尼、军用侦察）与 GEO 通信卫星，这些任务对运力都很敏感。**在一个发射次数少的体系里，每一发都要尽可能装满，运力折扣的代价被放大了。**

第三个约束更微妙：**发射场位置**。库鲁在南美洲北岸，向东发射的航区是大西洋。一级返场着陆需要在陆地上或驳船上，而库鲁周围是雨林与海洋，建着陆场的条件不如佛罗里达。

**这个判断在 2014 年是对的。到 2024 年就未必了**——因为亚马逊 Kuiper、欧洲自己的 IRIS² 星座等大规模项目开始出现，年发射量可能上升到十几次。ESA 因此启动了 Themis（可复用一级验证）与 Prometheus（低成本甲烷发动机），目标是下一代火箭。

**教训是：可复用不是一个技术判断，是一个关于市场规模的判断。**同一个技术在不同的发射频率下，答案可以完全相反。`,
    },
    {
      question: "P120C 同时用在两款火箭上，这样做有什么代价？",
      answer: `收益很清楚：产量翻倍，摊薄固定成本。代价有三条，都不小。

**1. 两款火箭被绑在了一起。**
2022 年 12 月，织女星 C 的第二级 Zefiro-40 因喷管喉衬材料问题失败，织女星 C 停飞两年。虽然故障不在 P120C 上，但整个欧洲固体推进的供应链与质量体系都被牵连审查。**共用意味着风险也共用**：如果哪天 P120C 出问题，阿丽亚娜 6 与织女星 C 会同时停飞，欧洲将完全失去入轨能力。

**2. 设计必须迁就两种角色。**
作为织女星 C 的第一级，P120C 从地面点火、承受全箭载荷；作为阿丽亚娜 6 的助推器，它挂在芯级侧面、要传递侧向力。两种工况的结构要求不同，最终的设计是两者的包络——**对任何一方都不是最优。**

**3. 排产冲突。**
一条产线要同时满足两款火箭的节奏。当阿丽亚娜 6 需要一次四枚而织女星 C 也在排队时，谁先谁后是一个真实的管理问题。

**但这些代价是值得付的**，因为替代方案更糟：如果各自研制，两款固体发动机的年产量分别只有几枚，单价会高得多，而且欧洲要维持两套完全独立的固体推进供应链——包括高氯酸铵、HTPB 粘合剂、碳纤维壳体缠绕、喉衬材料这一整条链。

**这里的普遍规律是：在低产量的航天工业里，「共用」几乎是唯一能获得规模效应的手段，代价是把独立性换成了成本。**中国的长征系列走的是相反的路（各型号各有产线），但前提是它的总发射量足够大，每条产线都能吃饱。`,
    },
    {
      question: "阿丽亚娜 5 那么成功，为什么不接着改？",
      answer: `因为它成功的方式恰恰是它无法继续的原因。

阿丽亚娜 5 的商业模式建立在**一箭双星**上：整流罩里上下各装一颗 GEO 通信卫星，发射成本由两家客户分摊。这在 1990–2010 年代非常有效，让它拿下了全球商业 GTO 市场一半以上的份额。

这个模式有两个隐含前提：

1. **GEO 通信卫星的质量在 3–6 t 区间**，两颗刚好塞进整流罩；
2. **市场上总能找到配对的卫星**，且两家客户能接受同一个发射窗口。

两个前提在 2010 年代都塌了：

- **卫星质量分化。**全电推卫星把质量压到 2 t 以下，超大平台又冲到 7 t 以上，「刚好能配对」的中间段变薄了。
- **猎鹰 9 号单星发射更便宜。**客户不再需要等配对，也不再需要接受别人的窗口。**「等待配对」本身变成了一项成本。**

阿丽亚娜 5 的另一个死穴是**上面级不能重启**。ESC-A 只能点火一次，这意味着它只能把卫星送到 GTO，不能直接送 GEO，也不能一箭多轨部署星座。当市场从「大 GEO 卫星」转向「LEO 星座」时，它无法参与。

改造能解决吗？换一个可重启的上面级（这正是 Vinci 的用途）在技术上可行，ESA 也确实做过 Ariane 5 ME 的方案。但成本结构改不了：阿丽亚娜 5 的芯级焊接工艺、总装流程、固体助推器（EAP，与任何其他型号不共用）都是 1980 年代的设计，**单价降不下来。**

**于是 ESA 做了一个在组织上很困难但在逻辑上很清楚的决定：不改，重做。**保留直径（沿用地面设施）、保留推进剂选择（沿用工艺经验）、保留库鲁的发射场，但箭体、发动机制造方式、助推器、上面级全部换新。`,
    },
  ],

  contemporaries: `**猎鹰 9 号** 是它立项的直接原因，也是它无法回避的对照。阿丽亚娜 6 的目标价格接近猎鹰 9 号复用构型的价格，但它是一次性的——**这意味着它的成本已经到底，而对方还有下降空间。**

**火神半人马座**（美国，2024）与它高度相似：同样在 2014 年前后立项、同样为替代一款成功但昂贵的老火箭、同样选择一次性（火神规划中的发动机舱回收未实施）、同样把降本押在制造工艺上。两者的首飞只差几个月。

**H3**（日本，2023）的目标一模一样：把 H-IIA 的单价砍半，靠新发动机与简化制造实现。三家在同一时期做出了同一个判断。

**长征五号**（中国，2016）在构型上与阿丽亚娜 6 最接近（氢氧芯级 + 助推器 + 氢氧上面级），但它的助推器用液体煤油而非固体，运力更大。**中国的降本路径是靠国内发射量堆产量，而不是靠共用或工艺。**`,

  milestones: [
    { date: "2014-12-02", title: "ESA 部长级会议批准立项", note: "在可复用与低成本一次性之间选择了后者。" },
    { date: "2020-01-28", title: "P120C 首次全尺寸试车", note: "阿丽亚娜 6 与织女星 C 共用的固体发动机。" },
    { date: "2023-07-05", title: "阿丽亚娜 5 退役", note: "阿丽亚娜 6 尚未首飞，欧洲进入自主发射能力空窗期。" },
    { date: "2024-07-09", title: "首飞", note: "主要目标全部达成；末段辅助动力单元提前关闭，离轨演示未完成。" },
    { date: "2025-03-06", title: "首次商业任务", note: "发射法国军用光学侦察卫星 CSO-3。" },
  ],

  launches: {
    total: 3,
    success: 3,
    failure: 0,
    asOf: "2025-06-30",
    notable: [
      { date: "2024-07-09", name: "VA262 首飞", note: "多颗立方星与再入舱；APU 提前关闭致离轨演示未完成。" },
      { date: "2025-03-06", name: "VA263 / CSO-3", note: "首次执行业务任务。" },
    ],
  },

  variants: [
    { name: "Ariane 62", note: "两枚 P120C，LEO 10.3 t / GTO 4.5 t，主要用于机构任务与中型卫星。" },
    { name: "Ariane 64", note: "四枚 P120C，LEO 21.65 t / GTO 11.5 t，用于双星发射与星座部署。" },
  ],
  relatedRockets: ["ariane-5", "vulcan-centaur", "h3", "long-march-5"],
  principles: ["propellants-and-cycles", "reusability", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 A64 长罩构型复原：63 m 总高、5.4 m 芯级直径、四枚 P120C 固体助推器。",
  }),

  sources: [
    {
      title: "Ariane 6 User's Manual",
      url: "https://www.arianespace.com/",
      publisher: "Arianespace",
      confidence: "high",
      note: "尺寸、质量、各构型运力与整流罩包络。",
    },
    {
      title: "Ariane 6 — ESA",
      url: "https://www.esa.int/Enabling_Support/Space_Transportation/Ariane_6",
      publisher: "European Space Agency",
      confidence: "high",
      note: "立项背景、降本目标与 P120C 共用方案。",
    },
    {
      title: "Vinci Engine",
      url: "https://www.ariane.group/",
      publisher: "ArianeGroup",
      confidence: "high",
      note: "推力、比冲、重启次数与增材制造喷注器。",
    },
  ],

  tags: ["中重型运载", "固体助推", "氢氧", "低成本一次性", "欧洲"],
};
