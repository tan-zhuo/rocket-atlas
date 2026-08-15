import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

/** A5 构型：一个 URM-1 作芯级，四个同样的 URM-1 作助推器，上面是 URM-2 与微风-M。 */
const g = rocketGeometry()
  .at(0, {
    id: "core-rd191",
    name: "RD-191 发动机（芯级）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 3.4,
    radius: 1.45,
    nozzles: { count: 1, bellRadius: 1.15, bellHeight: 2.8 },
    description:
      "单燃烧室的 RD-191，室压 262 bar，海平面推力 1,922 kN——**它是 RD-170 家族的四分之一。**RD-170（能源号用，4 室）→ RD-180（宇宙神 5 用，2 室）→ RD-191（1 室），三十年里同一套核心技术被切成三种尺寸。芯级在助推段节流到 30% 以延长工作时间。",
  })
  .at(3.4, {
    id: "core-urm1",
    name: "芯级 URM-1",
    nameEn: "Universal Rocket Module",
    group: "core",
    shape: "cylinder",
    finish: "painted-white",
    height: 22.1,
    radius: 1.45,
    description:
      "「通用火箭模块」——安加拉的全部设计思想都在这个名字里。同一个 2.9 m 直径的模块，一个就是安加拉 1.2，五个就是 A5，七个就是纸面上的 A7。**目标是让一条生产线覆盖 3.8 t 到 35 t 的全部运力区间。**",
  })
  .at(0, {
    id: "booster-rd191",
    name: "RD-191 发动机（助推器 4 台）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 3.4,
    radius: 1.45,
    cluster: { count: 4, offset: 2.95, phase: 45 },
    nozzles: { count: 1, bellRadius: 1.15, bellHeight: 2.8 },
    description: "四个助推模块各一台 RD-191，与芯级同款。五台一起点火，起飞总推力 9,610 kN。",
  })
  .at(3.4, {
    id: "booster-urm1",
    name: "助推模块 URM-1（4 个）",
    group: "booster",
    shape: "cylinder",
    finish: "painted-white",
    height: 22.1,
    radius: 1.45,
    cluster: { count: 4, offset: 2.95, phase: 45 },
    description:
      "与芯级完全相同的模块，顶部换成锥形头锥。**这里是安加拉与质子号最大的区别**：质子号的六个外挂筒只是燃料箱，安加拉的四个模块是完整的、会分离的助推器。代价是每个模块都要自带全套推进剂管理与增压系统。",
  })
  .at(25.5, {
    id: "booster-nose",
    name: "助推模块头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 3.5,
    radius: 1.45,
    cluster: { count: 4, offset: 2.95, phase: 45 },
    description: "助推模块在 T+214 s 左右分离。",
  })
  .at(25.5, {
    id: "urm2",
    name: "二级 URM-2",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 6.9,
    radius: 1.7,
    description:
      "3.6 m 直径的第二级，一台 RD-0124A——这台机的真空比冲 359 s，**是所有煤油火箭发动机里最高的**。它用富氧分级燃烧循环加四个可摆动的燃烧室，与联盟号 2.1b 的 RD-0124 同源。",
  })
  .at(32.4, {
    id: "briz-m",
    name: "微风-M 上面级",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 2.6,
    radius: 1.9,
    internal: true,
    description:
      "沿用质子号的微风-M，自燃推进剂、可多次重启。**这是安加拉身上最不「新」的一块**：新一代火箭配了一个上一代的上面级，因为新研的氢氧上面级 KVTK 一直没有落地。",
  })
  .at(35, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 20.4,
    radius: 2.4,
    description: "4.35 m 直径整流罩，与质子号同级，以便直接继承既有载荷的接口与包络。",
  });

export const angaraA5: Rocket = {
  slug: "angara-a5",
  name: "Angara A5",
  nameZh: "安加拉 A5",
  country: "Russia",
  countryZh: "俄罗斯",
  agency: ["赫鲁尼切夫国家航天科研生产中心"],
  family: "angara",
  status: "active",
  firstFlight: "2014-12-23",

  height: 55.4,
  diameter: 2.9,
  span: 8.86,
  mass: 773000,
  stageCount: 3,

  stages: [
    {
      name: "4 × URM-1 booster + URM-1 core",
      nameZh: "四个助推模块 + 芯级模块",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustSeaLevel: 9610,
      thrustVacuum: 10530,
      burnTime: 214,
      dryMass: 45000,
      propellantMass: 590000,
      diameter: 2.9,
      height: 25.1,
      note: "五个模块全部相同；芯级在助推段节流到 30%，助推器分离后恢复满推力。",
      engines: [
        {
          name: "RD-191",
          count: 5,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "kerolox",
          thrust: 1922,
          thrustSeaLevel: 1922,
          thrustVacuum: 2085,
          ispSeaLevel: 311.2,
          ispVacuum: 337.5,
          note: "RD-170 家族的单燃烧室版本，室压 262 bar，可节流至 30%。",
        },
      ],
    },
    {
      name: "URM-2",
      nameZh: "二级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustVacuum: 294,
      burnTime: 424,
      dryMass: 3500,
      propellantMass: 35800,
      diameter: 3.6,
      height: 6.9,
      note: "一台四燃烧室的 RD-0124A，真空比冲 359 s，是煤油机中的最高值。",
      engines: [
        {
          name: "RD-0124A",
          count: 1,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "kerolox",
          thrust: 294,
          thrustVacuum: 294,
          ispVacuum: 359,
          note: "四个可摆动燃烧室共用一套涡轮泵。",
        },
      ],
    },
    {
      name: "Briz-M",
      nameZh: "微风-M 上面级",
      propellant: "hypergolic",
      propellantZh: "偏二甲肼 / 四氧化二氮",
      thrustVacuum: 19.6,
      burnTime: 3000,
      dryMass: 2370,
      propellantMass: 19800,
      diameter: 4,
      height: 2.6,
      note: "沿用质子号的上面级，可多次重启，负责 GTO 与 GEO 注入。",
      engines: [
        {
          name: "S5.98M",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 19.6,
          thrustVacuum: 19.6,
          ispVacuum: 328,
          note: "可重启 8 次，累计工作时间以小时计。",
        },
      ],
    },
  ],

  payloadLEO: 24500,
  payloadGTO: 5400,
  reusable: false,
  humanRated: false,

  description:
    "俄罗斯用二十年时间造出的质子号接班人：无毒、模块化、完全国产——也比它要接班的那枚火箭贵得多。",

  history: `安加拉在 **1992 年**立项，比它 2014 年的首飞早了二十二年。这个时间跨度本身就是它最重要的注脚。

立项动机有三条，全部与苏联解体有关：

1. **拜科努尔不再是自己的。**质子号只能从哈萨克斯坦的拜科努尔发射，租金昂贵，且坠落区污染问题让哈方多次叫停。俄罗斯需要一款能从本土（普列谢茨克、后来的东方港）发射的重型火箭。
2. **供应链断裂。**质子号与天顶号的部分部件产自乌克兰。安加拉要求 **100% 俄罗斯境内生产**。
3. **毒推进剂要淘汰。**质子号一级的偏二甲肼污染是长期的外交与环保负担。

技术方案是「通用火箭模块」（URM）：一个 2.9 m 直径、装 RD-191 的标准模块，通过并联数量覆盖全运力谱系。1 个是安加拉 1.2（LEO 3.8 t），5 个是 A5（24.5 t），纸面上 7 个是 A7（35 t）。

然后是二十年的资金饥荒。1990 年代俄罗斯航天预算崩塌，安加拉几乎停滞；2000 年代靠质子号的商业收入反哺，仍然一拖再拖。**2014 年 12 月 23 日 A5 首飞成功**，此时它要替代的质子号已经又飞了二十年。

首飞之后节奏依然缓慢：2014、2020、2021、2024……**十年里 A5 只飞了几次**，其中 2021 年那次因微风-M 故障未能进入目标轨道。

2024 年 4 月，A5 从**东方港航天发射场**首次发射成功——这是它设计目标里最重要的一条：不再依赖哈萨克斯坦。

真正的问题在成本。**安加拉 A5 的单价被公开报道为质子号的 1.5–2 倍**，赫鲁尼切夫总经理曾公开承认这一点。原因不难理解：质子号有六十年、四百多次发射摊薄的产线，安加拉一年造一两枚。`,

  designPhilosophy: `安加拉的核心思想是**模块化通用性**：用一种模块、一台发动机，覆盖从小到大的全部运力需求。

这个思路在纸面上极具吸引力：

- **一条生产线**——所有 URM-1 完全相同，产量是各构型之和，理论上能靠规模压低单价；
- **一台发动机**——RD-191 用在所有构型上，从 1.2 到 A5 到 A7，产量同样叠加；
- **一个发射工位**——通过更换支撑结构适配不同构型。

现实给出的答案要复杂得多。

**优点是真的：**它彻底解决了立项时的三个问题——本土发射、全国产、无毒推进剂。RD-191 也确实是一台优秀的发动机，室压 262 bar、可节流到 30%，性能在世界一线。

**问题在于「通用」的前提是「总量足够大」。**

模块化的经济学假设是：

$$\\text{单模块成本} = f\\left(\\sum_{\\text{所有构型}} \\text{年产量}\\right)$$

只有当各构型的总产量足够高时，摊薄才会发生。俄罗斯的实际发射需求在苏联解体后大幅萎缩，商业市场又在 2015 年后被猎鹰 9 号夺走。**总产量上不去，模块化就只剩下复杂度，没有规模效应。**

与之对比，**猎鹰 9 号用完全相反的策略取得了同样的目标**：不做模块化，只做一种火箭，但把这一种做到一年上百发。**规模效应的来源是产量，不是构型数量。**

还有一处结构上的代价：五个模块并联意味着五台发动机、五套贮箱增压系统、四组分离机构、复杂的气动干扰。而如果直接造一个 4 m 级的大芯级配两台 RD-191，构型会简单得多——**但那就需要为大芯级单独建一条产线，与「通用」的初衷相悖。**

**安加拉是一枚为「不确定的未来需求」而设计的火箭，而那个需求最终没有出现。**`,

  tradeoffs: [
    {
      question: "模块化到底省不省钱？",
      answer: `要分开看**研制费**和**单价**，模块化对这两者的作用方向相反。

**研制费：省。**
安加拉只需要研制一个 URM-1 模块、一台 RD-191，就能派生出覆盖 3.8–24.5 t 的全谱系。如果分别研制小、中、大三款火箭，研制费会高得多。对预算紧张的 1990 年代俄罗斯来说，这是唯一可行的路径。

**单价：不一定省，往往更贵。**
关键在于模块化会带来「构型税」：

- **每个模块都要能独当一面。**URM-1 既要能作芯级（顶部接二级）又要能作助推器（顶部是头锥、侧面有分离机构），于是每个模块都带着一部分在当前角色下用不到的结构。
- **并联比单体复杂。**五个模块意味着五套增压、五套推进剂管理、四组分离机构、复杂的底部热环境与气动干扰。一个等效运力的单芯级火箭只需要一套。
- **发动机数量翻倍。**A5 用五台 RD-191；如果做一个 4 m 芯级配两台，发动机数量减少 60%。发动机通常是一级里最贵的部件。

**真正决定单价的还是年产量。**

对比三个案例：

| | 策略 | 年产量 | 结果 |
|---|---|---|---|
| 安加拉 | 模块化覆盖全谱系 | 1–2 枚 | 单价高于被替代的质子号 |
| 猎鹰 9 号 | 单一构型，靠回收与高频 | 100+ 次 | 单价降到历史最低 |
| 长征系列 | 多型号并行，各有产线 | 60+ 次 | 各型号产量都足以摊薄 |

**结论：模块化是研制预算受限时的正确选择，但它不能替代产量。**如果总需求上不去，模块化省下的是一次性的研制费，付出的是每一发都要承担的构型复杂度。`,
    },
    {
      question: "为什么新火箭还在用旧的微风-M 上面级？",
      answer: `因为新的上面级一直没能做出来，而任务不能等。

安加拉最初的规划里，配套的是氢氧上面级 **KVTK**（低温上面级），比冲 460 s 级，能把 A5 的 GTO 运力从 5.4 t 提高到 7.5 t 以上。氢氧上面级是重型火箭的标准配置——阿丽亚娜 5、Delta IV、长征五号、SLS 全都如此。

KVTK 至今没有飞。原因是研制经费与优先级：氢氧上面级需要新的低温加注设施、新的发动机（RD-0146）、新的绝热与推进剂管理技术，投入巨大。

于是安加拉配了质子号用了二十年的微风-M：自燃推进剂、比冲只有 328 s、但**现成、成熟、可多次重启**。

这个搭配的后果很具体：

- **GTO 运力被压住了。** A5 的 LEO 运力 24.5 t 超过质子号（23 t），但 GTO 运力 5.4 t **反而低于质子号的 6.9 t**——因为质子号的三级效率更高，且微风-M 在质子号上的工作点更优。**换了一枚更好的火箭，商业上最赚钱的那个指标却退步了。**
- **「无毒」只做了一半。**换掉一级的偏二甲肼是安加拉最重要的卖点之一，但上面级仍然用它。落区污染问题解决了，加注与地面操作的毒性问题依旧。

**这是一个很常见的模式：新系统在最难的部分（新发动机、新箭体）取得了突破，却卡在配套环节上。**没有匹配的上面级，一枚重型火箭的高能轨道能力就发挥不出来。

安加拉 A5M（改进型）计划配 **ORION / KVTK** 氢氧上面级，把 GTO 运力提到 8 t 级。这个计划仍在推进中。`,
    },
    {
      question: "为什么二十年才首飞？",
      answer: `因为在这二十年里，安加拉从来不是最紧迫的事。

它 1992 年立项，1990 年代俄罗斯航天预算相比苏联时期削减了一个数量级。**在预算只够维持现役型号运转的年份里，一个「替代品」项目永远排在后面**——尤其是被替代的那个（质子号）还在正常工作，而且是重要的外汇来源。

具体的资金逻辑很讽刺：安加拉的研制经费有相当部分来自**质子号的商业发射收入**。也就是说，**它的进度取决于它要取代的对象赚了多少钱。**质子号越好卖，安加拉越有钱；质子号一旦卖不动（2015 年后），安加拉反而更缺钱。

其他拖延因素：

- **发射场也要新建。**普列谢茨克的安加拉工位从零开始建，东方港的工位建到 2023 年才完工。火箭与发射场必须同步，任何一方拖延都拖住另一方。
- **RD-191 的研制。**从 RD-170 派生单室版本并非简单缩比：燃烧稳定性、涡轮泵匹配、节流范围都要重做，试车周期长。
- **需求本身在变。**二十年里，全球发射市场的价格结构被猎鹰 9 号彻底改写，安加拉在立项时对标的成本目标，到首飞时已经完全过时。

**这里有一个对所有长周期航天项目都成立的规律：研制周期越长，立项时的假设越可能失效。**安加拉是按 1992 年的世界设计的，交付到了 2014 年的世界；SLS 是按 2010 年的世界设计的，交付到了 2022 年的世界。**在一个技术与成本结构快速变化的领域里，时间本身就是最大的风险。**`,
    },
  ],

  contemporaries: `**质子-M** 是它要替代的对象。安加拉在环保、自主与发射场自由度上全面胜出，在成本与 GTO 运力上却落后——**这是「更好的技术不一定是更好的产品」的直接案例。**

**猎鹰 9 号**（2010）在同一时期用完全相反的策略解决了同一个问题：不做模块化，只做一种火箭，靠高频次与回收压成本。两者的对比几乎是一次关于「规模效应从哪里来」的对照实验。

**火神半人马座**（2024）与安加拉的处境相似：都是为替代一款成熟但有政治问题的老火箭而生（RD-180 依赖 / 质子号毒性），都用了新的国产发动机，都面临着如何在低产量下压低成本的难题。

**长征五号**（2016）代表另一条路：不追求全谱系通用，而是让不同运力段各有自己的型号（长征六/七/五号），每个型号都有足够的国内发射需求支撑产量。**从结果看，这条路比安加拉的「一模块通吃」更成功。**`,

  milestones: [
    { date: "1992", title: "立项", note: "目标是本土发射、全国产、无毒推进剂的质子号替代者。" },
    { date: "2014-07-09", title: "安加拉 1.2PP 首飞", note: "亚轨道验证飞行。" },
    { date: "2014-12-23", title: "A5 首飞成功", note: "从普列谢茨克发射，将模拟载荷送入 GEO。" },
    { date: "2021-12-27", title: "第三次发射", note: "微风-M 上面级故障，未能进入目标轨道。" },
    { date: "2024-04-11", title: "东方港首飞", note: "首次从俄罗斯远东的新发射场发射，实现完全的本土发射能力。" },
  ],

  launches: {
    total: 5,
    success: 4,
    partial: 1,
    failure: 0,
    asOf: "2024-12-31",
    notable: [
      { date: "2014-12-23", name: "A5 首飞", note: "模拟载荷送入 GEO。" },
      { date: "2021-12-27", name: "Persona 试验载荷", note: "微风-M 故障，未达目标轨道。" },
      { date: "2024-04-11", name: "东方港首飞", note: "第三次发射尝试才成功点火，前两次因增压与发动机启动系统中止。" },
    ],
  },

  variants: [
    { name: "Angara 1.2", note: "单模块构型，LEO 3.8 t。" },
    { name: "Angara A5", note: "五模块构型，LEO 24.5 t，替代质子号。" },
    { name: "Angara A5M", note: "改进型，发动机推力提升，规划配氢氧上面级。" },
    { name: "Angara A5V", note: "纸面上的氢氧上面级构型，LEO 可达 35 t；未立项。" },
  ],
  relatedRockets: ["proton-m", "soyuz-2", "vulcan-centaur", "atlas-v"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 A5 构型复原：55.4 m 总高、2.9 m 模块直径、8.86 m 跨距，五个完全相同的 URM-1 模块。",
  }),

  sources: [
    {
      title: "Angara Launch Vehicle Family",
      url: "http://www.khrunichev.ru/",
      publisher: "Khrunichev State Research and Production Space Center",
      confidence: "high",
      note: "各构型的尺寸、质量与运力。",
    },
    {
      title: "Angara — RussianSpaceWeb",
      url: "https://www.russianspaceweb.com/angara.html",
      publisher: "Anatoly Zak",
      confidence: "medium",
      note: "研制史、进度拖延原因与成本讨论。",
    },
    {
      title: "RD-191 Engine",
      url: "https://www.npoenergomash.ru/",
      publisher: "NPO Energomash",
      confidence: "high",
      note: "推力、比冲、室压与节流范围。",
    },
  ],

  tags: ["模块化", "无毒推进剂", "重型运载", "俄罗斯"],
};
