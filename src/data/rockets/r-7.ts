import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "boosters",
    name: "侧挂助推器（4 枚，Блок Б/В/Г/Д）",
    nameEn: "Strap-on boosters",
    group: "booster",
    shape: "frustum",
    finish: "bare-metal",
    height: 19,
    radius: 1.53,
    radiusTop: 0.55,
    cluster: { count: 4, offset: 3.0, phase: 45 },
    description:
      "四枚锥形助推器，上粗下细的外形来自「包」式（пакет）构型的传力需求：助推器在**头部**与芯级相连并把推力顶上去，因此上端要粗壮、下端可以收细。锥形同时改善了整体气动外形。四枚助推器与芯级在地面同时点火。",
  })
  .at(0, {
    id: "rd107",
    name: "RD-107 发动机（4 台 × 4 室）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2.6,
    radius: 1.53,
    cluster: { count: 4, offset: 3.0, phase: 45 },
    nozzles: { count: 4, bellRadius: 0.45, bellHeight: 1.5, ringRadius: 0.72 },
    description:
      "每枚助推器一台 RD-107，但一台 RD-107 有**四个燃烧室共用一套涡轮泵**，外加两个游动小喷管做姿态控制。这是格鲁什科对「大推力单室会燃烧不稳定」这个难题的解法：不做大燃烧室，做四个成熟的小燃烧室并联。整枚火箭因此有 20 个主燃烧室和 12 个游机喷管同时工作。",
  })
  .at(0, {
    id: "rd108",
    name: "RD-108 发动机（芯级）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 2.9,
    radius: 1.475,
    nozzles: { count: 4, bellRadius: 0.46, bellHeight: 1.6, ringRadius: 0.72 },
    description:
      "芯级发动机，与 RD-107 同源但配四个游机（助推器只有两个），因为助推器分离后芯级要独自承担三轴姿态控制。芯级从地面一直工作到约 300 s，是典型的「一级半」工作方式。",
  })
  .at(2.9, {
    id: "core-body",
    name: "芯级（Блок А）",
    nameEn: "Core stage (Block A)",
    group: "core",
    shape: "cylinder",
    finish: "bare-metal",
    height: 23.1,
    radius: 1.475,
    description:
      "2.95 m 直径的煤油/液氧芯级。R-7 的贮箱采用承压式设计：箱体本身就是结构，靠内压维持刚度，这让干质量压得很低，但空箱在无内压时不能承受轴向载荷——地面操作必须始终保压。",
  })
  .at(26, {
    id: "nose",
    name: "头锥 / 卫星舱",
    group: "payload",
    shape: "cone",
    finish: "painted-white",
    height: 3.167,
    radius: 1.475,
    description:
      "8K71PS 构型的锥形头部内装 83.6 kg 的「人造地球卫星一号」。为了赶在美国之前发射，原定的重型科学卫星（「物体 D」，1.3 t）被临时换成了这个只有两台无线电发射机和电池的简化球体——**世界航天史的开端是一次进度让位于目标的妥协。**",
  });

export const r7: Rocket = {
  slug: "r-7",
  name: "R-7 / Sputnik (8K71PS)",
  nameZh: "R-7 / 卫星号",
  country: "Soviet Union",
  countryZh: "苏联",
  agency: ["OKB-1 科罗廖夫设计局"],
  family: "r-7",
  status: "retired",
  firstFlight: "1957-10-04",
  lastFlight: "1958-05-15",

  height: 29.167,
  diameter: 2.95,
  span: 10.3,
  mass: 267000,
  stageCount: 1,

  stages: [
    {
      name: "Boosters (Blocks B/V/G/D)",
      nameZh: "助推器（4 枚）",
      propellant: "kerolox",
      propellantZh: "T-1 煤油 / 液氧",
      thrustSeaLevel: 3256,
      burnTime: 118,
      diameter: 3.06,
      height: 19.8,
      note: "与芯级在地面同时点火，118 s 后成对脱落——分离时形成著名的「科罗廖夫十字」。",
      engines: [
        {
          name: "RD-107",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 814,
          thrustSeaLevel: 814,
          thrustVacuum: 990,
          ispSeaLevel: 252,
          ispVacuum: 306,
          note: "四燃烧室共用一套涡轮泵，另有 2 个游机喷管。",
        },
      ],
    },
    {
      name: "Core (Block A)",
      nameZh: "芯级",
      propellant: "kerolox",
      propellantZh: "T-1 煤油 / 液氧",
      thrustSeaLevel: 745,
      thrustVacuum: 941,
      burnTime: 300,
      diameter: 2.95,
      height: 28,
      note: "从起飞一直工作到入轨，是「一级半」构型的核心。",
      engines: [
        {
          name: "RD-108",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 745,
          thrustSeaLevel: 745,
          thrustVacuum: 941,
          ispSeaLevel: 244,
          ispVacuum: 315,
          note: "四燃烧室 + 4 个游机喷管。",
        },
      ],
    },
  ],

  payloadLEO: 1327,
  reusable: false,
  humanRated: false,

  description:
    "世界第一枚洲际弹道导弹，也是把第一颗人造卫星送入轨道的运载器；它的基本构型至今仍在联盟号上服役，是史上服役时间最长的火箭家族起点。",

  history: `R-7（北约代号 SS-6 Sapwood）最初的任务与太空无关：它要把一枚 5.4 t 的热核弹头投送 8,000 km。这个质量指标是被氢弹的早期设计定死的——弹头太重，导致火箭必须做到 267 t 起飞质量，成为一件在军事上极其笨拙的武器（加注需要数小时、无法机动、只能在固定阵地发射）。苏军实际部署的 R-7 从未超过 10 枚。

正是这个「军事上的失败品」造就了航天时代。1957 年 8 月 21 日 R-7 完成首次全程飞行试验；两个月不到，1957 年 10 月 4 日，代号 8K71PS 的简化型把 83.6 kg 的 Sputnik-1 送入轨道。一个月后 Sputnik-2 带着莱卡上天，1961 年 4 月 12 日改进型（Vostok-K）把加加林送入轨道。

R-7 的家族此后从未中断：Vostok、Voskhod、Molniya、Soyuz、Soyuz-U、Soyuz-FG、Soyuz-2……总发射次数超过 1,900 次，是人类发射次数最多的运载火箭谱系。`,

  designPhilosophy: `R-7 的设计逻辑被一个 1950 年代的技术空白定义：**当时没有人能造出可靠的空中点火系统。**

理想的洲际导弹应该是多级串联——一级烧完抛掉、二级在高空点火。但液体火箭发动机在真空、失重、低温条件下的可靠点火在当时是未解难题（推进剂会飘、涡轮泵会气蚀）。科罗廖夫的方案是彻底绕开它：**所有 20 个燃烧室在地面同时点火**，飞行中只做「关机 + 抛壳」，不做点火。

这就是「包（пакет）」式构型的由来——四枚助推器围绕一根更长的芯级，全部在发射台点火。118 s 后助推器烧完脱落（芯级继续工作），形成了著名的「科罗廖夫十字」分离景象。严格说这不是两级火箭，而是**一级半**：助推器和芯级是并联而非串联关系。

第二条主线是**用并联小燃烧室替代大燃烧室**。格鲁什科在放大燃烧室时反复遇到高频燃烧不稳定，于是干脆保持燃烧室尺寸不变、用一台涡轮泵驱动四个成熟的小燃烧室。今天 RD-107/108 的后代仍是这个构型——七十年过去，苏/俄没有做过一台真正的大推力单燃烧室煤油机。

第三条是**为可靠性牺牲一切优雅**：R-7 用的是最简单的燃气发生器循环、最保守的承压式贮箱、地面全程无线电辅助制导。结果是一枚在军事上臃肿、在航天上却极度耐用的火箭。`,

  tradeoffs: [
    {
      question: "「一级半」构型的代价是什么？",
      answer: `所有发动机在地面点火，意味着**芯级的发动机必须同时满足海平面与高空两种工况**。RD-108 的喷管扩张比只能取一个折中值，在地面欠膨胀、在高空过膨胀，两头都不是最优。真正的两级火箭可以给二级配大扩张比的真空喷管，比冲能高出 40–60 s。

第二个代价是**起飞推重比被摊薄**。芯级从地面就开始烧，到助推器分离时它已经消耗了大量推进剂，却还要背着整个上面结构继续飞——这部分推进剂做的功效率很低。

第三个代价是**推力不可调**。20 个燃烧室在起飞时全开，火箭的最大动压与过载曲线由此固定，没有节流余量。

它换回来的是：**飞行中不需要点火任何发动机**。在 1950 年代，这个「不需要」几乎等价于把一整类失效模式从可靠性框图里删掉。当空中点火技术在 1960 年代成熟后，这个构型的合理性就消失了——所以后来所有新设计的火箭都是串联多级，R-7 的构型再没有被任何新型号复制。`,
    },
    {
      question: "为什么一台发动机要做四个燃烧室？",
      answer: `液体火箭发动机的推力大致正比于燃烧室的横截面积。要提高推力，最直接的办法是把燃烧室做大——但燃烧室越大，内部越容易出现**高频燃烧不稳定**：燃烧释放的压力波与燃烧室的声学模态耦合，形成自激振荡，几十毫秒内就能把喷注器面板烧穿。

美国人在 F-1 上硬啃了这个问题，用了四年、两千多次试车和大量喷注器隔板方案。格鲁什科选择了另一条路：**保持已经验证过的小燃烧室尺寸，用一台涡轮泵同时供应四个。** 涡轮泵是发动机中最贵最难的部件，共用它就摊薄了成本；燃烧室则停留在「已知安全」的尺寸上。

代价是管路复杂、结构质量偏高、四个燃烧室的推力必须严格匹配（否则产生额外力矩）。但从工程风险的角度，这是把一个未解难题换成了一个已解难题。

这个选择塑造了整个苏/俄发动机传统：RD-170（四燃烧室，史上推力最大的液体发动机）、RD-180（双燃烧室）、RD-191（单室）都是同一条谱系的延续。`,
    },
    {
      question: "为什么这个 1950 年代的设计能服役到今天？",
      answer: `Soyuz-2 与 1957 年的 R-7 相比：构型完全一致（4 枚锥形助推 + 芯级 + 上面级）、发动机是 RD-107A/108A（同一型号的改进版）、贮箱布局与直径未变。变的主要是控制系统（模拟 → 数字）、上面级（Blok-I 换用 RD-0110/0124）和制造工艺。

它能持续七十年的原因有三条：

1. **构型的可扩展性**。R-7 天生留下了一个「顶上加一级」的接口。Vostok 加一级、Molniya 加两级、Soyuz 换更强的上面级——每次升级都不必动已经验证过的下半截。
2. **产量带来的可靠性**。1,900 多次发射意味着每一个失效模式都出现过、被分析过、被改掉过。任何全新设计的火箭都无法在短期内积累这种经验密度。
3. **需求的连续性**。载人飞船一直是同一个尺寸量级（7 t 级），从未有过让 R-7 运力不够用的载人任务。

但它也已经走到尽头：R-7 无法回收、单价难以进一步下降、7 t 级运力在星座发射时代明显不足。俄罗斯用 Angara 系列替代它的努力持续了三十年仍未完成，这本身也说明**替换一个「够用且极其成熟」的系统，从来不是纯技术问题。**`,
    },
  ],

  contemporaries: `同期的美国对手是 **Atlas**：它用了一个同样奇特的方案来绕开空中点火——「级半（stage-and-a-half）」，三台发动机在地面点火，飞行中抛掉两台外侧发动机及其裙部，但保留贮箱。Atlas 的贮箱更极端，是不锈钢气球式承压结构，不加压时会自行坍塌。

两个国家在同一个技术空白面前给出了两种绕行方案，而且都不优雅——这正说明当时的约束有多硬。等到 1960 年代空中点火（尤其是低温推进剂的沉底与再启动）成熟后，Titan II、Saturn、Proton 这些真正的串联多级火箭才成为主流。`,

  milestones: [
    { date: "1957-08-21", title: "R-7 首次全程飞行试验成功", note: "世界第一枚洲际弹道导弹。" },
    { date: "1957-10-04", title: "发射 Sputnik-1", note: "人类第一颗人造地球卫星，83.6 kg。" },
    { date: "1957-11-03", title: "发射 Sputnik-2", note: "首次把动物（莱卡）送入轨道。" },
    { date: "1961-04-12", title: "Vostok-K 发射加加林", note: "人类首次进入太空。" },
  ],

  launches: {
    total: 4,
    success: 3,
    failure: 1,
    asOf: "1958-05-15",
    notable: [
      { date: "1957-10-04", name: "Sputnik-1", note: "人类第一次轨道发射。" },
      { date: "1958-04-27", name: "Sputnik-3 首次尝试", note: "88 s 时因纵向振荡解体，是 8K71PS 唯一失败。" },
      { date: "1958-05-15", name: "Sputnik-3", note: "8K71PS 构型最后一次飞行。" },
    ],
  },

  variants: [
    { name: "R-7A (8K74)", note: "实际部署的洲际导弹型，射程增至 12,000 km。" },
    { name: "Vostok (8K72K)", note: "增加 Blok-E 上面级，用于首次载人飞行。" },
    { name: "Molniya (8K78)", note: "四级构型，用于大椭圆轨道与深空探测。" },
    { name: "Soyuz / Soyuz-U / Soyuz-2", note: "持续演进至今的载人与通用运载型。", slug: "soyuz-2" },
  ],
  relatedRockets: ["soyuz-2", "v-2", "saturn-v"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 8K71PS（Sputnik 发射型）公开尺寸复原：总高 29.167 m、芯级直径 2.95 m、最大横向 10.3 m。助推器的锥形轮廓与游机喷管为示意简化。",
  }),

  sources: [
    {
      title: "Sputnik and the Dawn of the Space Age",
      url: "https://www.nasa.gov/history/sputnik/",
      publisher: "NASA History Office",
      confidence: "high",
      note: "Sputnik-1 质量、发射日期与背景。",
    },
    {
      title: "Rockets and People (Ракеты и люди), Boris Chertok",
      url: "https://www.nasa.gov/history/history-publications-and-resources/nasa-history-series/",
      publisher: "NASA History Series (SP-2005-4110)",
      confidence: "high",
      note: "R-7 设计决策、包式构型由来与试验过程的一手回忆。",
    },
    {
      title: "R-7 (family) — Encyclopedia Astronautica",
      url: "http://www.astronautix.com/r/r-7.html",
      publisher: "Encyclopedia Astronautica",
      confidence: "medium",
      note: "推力、比冲、各改型参数；不同来源在 RD-107 推力上有 ±5% 差异。",
    },
  ],

  tags: ["历史里程碑", "首颗卫星", "一级半", "煤油", "洲际导弹改型"],
};
