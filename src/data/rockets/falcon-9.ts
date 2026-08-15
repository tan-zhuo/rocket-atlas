import type { Rocket } from "../types";
import { rocketGeometry, GROUP_COLOR, METAL_DARK } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "octaweb",
    name: "Merlin 1D 发动机（9 台）",
    nameEn: "Octaweb engine section",
    group: "stage-1",
    shape: "engines",
    height: 3.1,
    radius: 1.85,
    color: METAL_DARK,
    nozzles: { count: 9, bellRadius: 0.42, bellHeight: 1.55, ringRadius: 1.28 },
    description:
      "八台环绕、一台居中的「Octaweb」结构。这个布局不是为了美观：中心机在回收着陆时单独工作（推力可深度节流到约 40%），而八台外围机用简单的钢梁隔舱互相隔离，任何一台发生非包容性故障都不会连累邻机——发动机数量多带来的可靠性风险，是用结构隔离和飞行中关机能力换回来的。",
  })
  .at(0, {
    id: "landing-legs",
    name: "着陆腿（4 条）",
    group: "stage-1",
    shape: "fins",
    height: 4.6,
    radius: 1.1,
    cluster: { count: 4, offset: 1.85, phase: 45 },
    color: "#2c313d",
    description:
      "碳纤维/铝蜂窝着陆腿，收拢时贴在箭体外侧，着陆前约 10 s 由高压氦气展开，跨距 18 m。为了减重它们不可主动收回——早期回收后需要人工拆卸，Block 5 改为可折叠以缩短复用周转时间。",
  })
  .at(3.1, {
    id: "s1-body",
    name: "一级箭体",
    nameEn: "First stage",
    group: "stage-1",
    shape: "cylinder",
    height: 38.1,
    radius: 1.85,
    color: GROUP_COLOR["stage-1"],
    description:
      "3.7 m 直径的 2195 铝锂合金贮箱，摩擦搅拌焊接。直径不是气动最优解，而是**公路运输的上限**——箭体要能装上拖车穿越美国州际公路的桥涵，这个约束直接决定了 Falcon 9 只能靠拉长（v1.0 的 47 m → Block 5 的 70 m）而不能靠加粗来提升运力。",
  })
  .at(37.6, {
    id: "grid-fins",
    name: "栅格舵（4 片）",
    group: "stage-1",
    shape: "gridfins",
    height: 1.6,
    radius: 0.85,
    cluster: { count: 4, offset: 1.85 },
    color: "#4a4f5c",
    description:
      "钛合金整体铸造的栅格舵，在再入段提供气动控制力矩。早期铝制版本带隔热涂层，会在再入加热中烧蚀、每次都要更换；换成钛后可以裸奔并且无限次复用——这是 Block 5「不检修连飞十次」目标下的典型改动。",
  })
  .at(41.2, {
    id: "interstage",
    name: "级间段",
    group: "stage-1",
    shape: "cylinder",
    height: 6.7,
    radius: 1.85,
    color: "#20242e",
    description:
      "碳纤维复合材料级间段，内部是气动压紧释放机构（pneumatic pusher）。相比爆炸螺栓，气动分离可以在地面反复测试与复位，且不产生碎片——同样是为复用而做的选择。",
  })
  .at(47.9, {
    id: "s2-body",
    name: "二级",
    nameEn: "Second stage",
    group: "stage-2",
    shape: "cylinder",
    height: 9.0,
    radius: 1.85,
    color: GROUP_COLOR["stage-2"],
    description:
      "单台真空版 Merlin（MVac）的二级，喷管扩张比 165，铌合金辐射冷却喷管延伸段。二级是一次性的：SpaceX 曾公开研究过二级回收，最终判断为了回收所需的隔热与结构代价会吃掉大部分运力，在 Falcon 架构上不划算——这个结论直接推动了 Starship 的全新设计。",
  })
  .at(56.9, {
    id: "fairing-boattail",
    name: "整流罩过渡段",
    group: "payload",
    shape: "frustum",
    height: 2.4,
    radius: 1.85,
    radiusTop: 2.6,
    color: "#dfe3ea",
    description: "从 3.7 m 箭体扩张到 5.2 m 整流罩的过渡段。",
  })
  .at(59.3, {
    id: "fairing",
    name: "有效载荷整流罩",
    group: "payload",
    shape: "ogive",
    height: 10.7,
    radius: 2.6,
    color: "#eef1f6",
    description:
      "5.2 × 13.1 m 铝蜂窝夹层复合整流罩，两瓣式。分离后由冷气推力器调姿、翼伞减速，海上回收后翻新复用——单套整流罩成本约 600 万美元，占单次发射成本的相当比例，值得为它专门养一支回收船队。",
  });

export const falcon9: Rocket = {
  slug: "falcon-9",
  name: "Falcon 9 Block 5",
  nameZh: "猎鹰九号 Block 5",
  country: "United States",
  countryZh: "美国",
  agency: ["SpaceX"],
  family: "falcon",
  status: "active",
  firstFlight: "2018-05-11",

  height: 70,
  diameter: 3.7,
  span: 5.2,
  mass: 549054,
  stageCount: 2,

  stages: [
    {
      name: "Falcon 9 First Stage",
      nameZh: "一级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧（过冷）",
      thrustSeaLevel: 7607,
      thrustVacuum: 8227,
      burnTime: 162,
      dryMass: 25600,
      propellantMass: 411000,
      diameter: 3.7,
      height: 41.2,
      reusable: true,
      note: "回收构型下约保留 6–8% 推进剂用于返场/着陆点火，代价是 LEO 运力从 22.8 t 降到约 17.5 t。",
      engines: [
        {
          name: "Merlin 1D",
          count: 9,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 845,
          thrustSeaLevel: 845,
          thrustVacuum: 914,
          ispSeaLevel: 283,
          ispVacuum: 311,
          note: "推重比约 180，是量产液体发动机中最高的之一；可节流至 40%，支持着陆。",
        },
      ],
    },
    {
      name: "Falcon 9 Second Stage",
      nameZh: "二级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustVacuum: 981,
      burnTime: 397,
      dryMass: 3900,
      propellantMass: 107500,
      diameter: 3.7,
      height: 12.6,
      reusable: false,
      note: "可多次重启，支持直接 GTO、GEO 与深空注入。",
      engines: [
        {
          name: "Merlin 1D Vacuum",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 981,
          thrustVacuum: 981,
          ispVacuum: 348,
          note: "扩张比 165 的真空版，喷管延伸段为铌合金辐射冷却。",
        },
      ],
    },
  ],

  payloadLEO: 22800,
  payloadGTO: 8300,
  payloadSSO: 15600,
  reusable: true,
  reuseNote: "一级与整流罩可回收复用；单枚一级已实现 20 次以上飞行。二级一次性。",
  humanRated: true,

  description:
    "第一款把「轨道级火箭一级回收复用」变成常规操作的运载火箭，用高发射频率与低边际成本重塑了全球发射市场。",

  history: `Falcon 9 的起点不是技术突破，而是一个成本假设：如果火箭像飞机一样可以重复使用，发射价格可以下降一个数量级。2010 年 6 月 v1.0 首飞时，它只是一枚普通的煤油两级火箭；真正的路线图藏在后面——v1.1（2013）拉长箭体、把发动机改成 Octaweb 布局并加装着陆腿，Full Thrust（2015）引入**过冷推进剂**把密度提上去以补偿回收带来的性能损失。

2015 年 12 月 21 日，ORBCOMM-2 任务的一级首次返场着陆成功；2017 年 3 月 SES-10 首次复用已飞过的一级；2018 年 5 月 Block 5 首飞，这是为「同一枚一级不做大修连飞十次」而定型的最终版本。

此后 Falcon 9 的发射频率逐年翻番：2020 年 26 次，2022 年 61 次，2024 年超过 130 次——单一型号的年发射量超过了历史上任何国家的年度总和。载人方面，2020 年 5 月 Demo-2 让美国在航天飞机退役九年后恢复了本土载人能力。`,

  designPhilosophy: `Falcon 9 的设计逻辑是**把「单次性能最优」换成「全寿命经济性最优」**。

传统运载火箭的每一处设计都在追求把更多质量送入轨道；Falcon 9 却主动牺牲了约 30% 的运力（回收所需的推进剂、着陆腿、栅格舵、加强结构），去换取一级的重复使用。这个交换只有在**发射频率足够高**时才成立——如果一年只飞三次，回收硬件的研发与翻新成本永远摊不平。所以 Falcon 9 的设计其实预设了 Starlink 这样的自有高频需求。

第二条主线是**用制造简化替代性能极致**：只用一种发动机（Merlin 1D 及其真空版）、只用一种推进剂组合、只用一种箭体直径。9+1 台同型发动机意味着产线上每年造几百台同一个东西，单机成本和可靠性都随产量爬坡。这与 Ariane 5、Delta IV 那种「每一级都用最适合它的专用发动机」的思路正好相反。

第三条是**先飞再改**：v1.0 到 Block 5 六年间箭体长度增加 50%、推力增加 70%，全部在有付费载荷的实飞任务中逐步验证。`,

  tradeoffs: [
    {
      question: "为什么用 9 台小发动机，而不是 1–2 台大发动机？",
      answer: `从纯性能看这是个坏选择：9 台发动机意味着 9 套涡轮泵、9 套阀门、9 个潜在故障点，还要付出 Octaweb 结构和复杂管路的质量代价。传统可靠性模型（串联故障链）会直接判它出局——N1 的四连败就是前车之鉴。

Falcon 9 反其道而行，理由有三条：

1. **发动机外故障容限**：9 台发动机的一级可以在飞行中关掉 1 台仍完成任务。2012 年 CRS-1 任务中一台 Merlin 在 79 s 时失压关机，其余 8 台延长工作时间，主载荷正常入轨。这把「多机 = 更不可靠」翻转成了「多机 = 可容错」——前提是控制系统能实时重规划。
2. **回收需要深度节流**：一枚空载返回的一级，即使只点燃 1 台发动机，推重比仍大于 1。发动机越小，着陆时能实现的最小推力越低，悬停裕度越好。如果用单台大发动机，根本无法把推力压到能软着陆的量级。
3. **产量决定成本**：同一台 Merlin 用在一级（9 台）和二级（1 台），每枚火箭消耗 10 台。年产上千台带来的学习曲线，是单台大发动机永远得不到的。

代价是：一级的推力室总数多，地面试车与检修工作量大；发动机数量带来的燃烧不稳定耦合、共振风险必须靠仿真与实测逐一排除。`,
    },
    {
      question: "为什么坚持煤油而不是甲烷或液氢？",
      answer: `Falcon 9 立项时（2005 前后），煤油/液氧是唯一一个**已知量**：地面设施成熟、推进剂便宜、密度高（不用巨大贮箱）、常温储存（不需要复杂绝热）。对一家现金流紧张的初创公司来说，把创新预算全部押在「回收」这一件事上，其余环节尽量用最保守的技术，是理性的风险分配。

煤油的代价在复用上很快显现：RP-1 燃烧会在燃气发生器和喷注器上留下**积碳**，翻新时需要清洗；煤油的比冲也比甲烷低约 10 s、比液氢低约 100 s。这些正是 SpaceX 在下一代（Raptor / Starship）转向甲烷的直接动因——甲烷燃烧洁净、可深冷共底、且能在火星就地生产。

值得注意的是 Falcon 9 用了一个折中手段来弥补煤油比冲的不足：**过冷推进剂**。把液氧冷到 −207 °C（远低于 −183 °C 的沸点）、RP-1 冷到 −7 °C，密度分别提高约 8% 和 2.5%，同样体积的贮箱能多装约 8% 的推进剂。代价是加注必须在发射前 35 分钟内完成、且不能长时间保持——这也是为什么 Falcon 9 的载人任务采用了有争议的「先上人、后加注」流程。`,
    },
    {
      question: "回收一级到底划不划算？",
      answer: `直接算账：回收使 LEO 运力从 22.8 t 降到约 17.5 t（−23%），GTO 从 8.3 t 降到 5.5 t（−34%）。硬件上多出着陆腿、栅格舵、着陆推进剂、加强的推力结构，还有回收船队与翻新厂房的固定成本。

划算与否取决于三个变量：

- **一级占全箭成本的比例**：Falcon 9 一级约占箭体成本的 60–70%，二级 + 整流罩约 30–40%。回收一级理论上能省掉大头。
- **翻新成本与周转时间**：Block 5 的目标是「10 次飞行之间只做例行检查」。实际记录中单枚一级最短周转已压到 21 天以内，累计飞行超过 20 次。
- **发射频率**：所有固定成本（回收船、翻新设施、工程团队）都要靠飞行次数摊薄。

结论是：在 SpaceX 自有 Starlink 星座提供的高频需求下，回收显然划算——2024 年超过 130 次发射里，绝大多数使用了复用一级。但对一年只发射 3–8 次的运营商（Ariane、ULA 长期以来的处境）来说，同样的账算下来是亏的。**可回收不是一个纯技术判断，而是一个关于发射市场规模的商业押注。**`,
    },
    {
      question: "为什么是「返场着陆」和「海上驳船」两种方案？",
      answer: `一级关机分离时的状态决定了它能去哪里。

- **返场着陆（RTLS）**：分离时速度较低（通常 < 2 km/s），一级还有足够推进剂做一次「回推点火（boostback burn）」把水平速度抵消掉、飞回发射场。着陆点在陆地，回收最快、翻新最省事，但要付出三次点火（回推 + 再入 + 着陆）的推进剂，运力损失最大。
- **海上驳船（ASDS）**：分离时速度高（2.3–2.6 km/s），没有余量飞回岸边，只能沿着弹道继续向下游飞，落在几百公里外的自主无人船上。省下回推点火的推进剂，运力损失较小，但要付出船队运营与海况风险。

所以任务规划的逻辑是：**载荷越重、轨道越高，一级分离速度越大，越只能用驳船；轻载荷或返回舱任务才用返场着陆。** 而最重的 GTO 任务（8 t 以上）会直接放弃回收，一次性飞行——这三种模式对应了同一枚火箭上三条不同的性能曲线。`,
    },
  ],

  contemporaries: `与 Falcon 9 同代的一次性火箭——Atlas V、Ariane 5、Delta IV、H-IIA——在可靠性上并不逊色，甚至更高（Atlas V 近乎全胜）。它们输掉的是**单位成本与发射节奏**：Ariane 5 一年 6–7 发、Atlas V 一年 5–8 发，单价 1.5 亿美元以上；Falcon 9 在 2023 年之后把商业单价压到 6,700 万美元附近，并且一年能飞 100 次以上。

这引出一个反直觉的结论：**Falcon 9 的核心竞争力不是回收本身，而是回收所强制要求的高频率生产与运营体系。** 后来者（New Glenn、Neutron、Terran R、朱雀三号、长征十号系列）几乎全部照抄了这条路径，而不是照抄 Merlin 或者煤油。`,

  milestones: [
    { date: "2010-06-04", title: "Falcon 9 v1.0 首飞", note: "两级煤油火箭，尚无任何回收硬件。" },
    { date: "2012-05-25", title: "Dragon 首次对接空间站", note: "商业飞船首次与 ISS 对接。" },
    { date: "2015-12-21", title: "ORBCOMM-2 — 一级首次返场着陆", note: "轨道级火箭一级首次成功垂直回收。" },
    { date: "2017-03-30", title: "SES-10 — 首次复用一级", note: "证明翻新后的一级可执行商业任务。" },
    { date: "2018-05-11", title: "Block 5 首飞", note: "为 10 次以上复用定型的最终版本。" },
    { date: "2020-05-30", title: "Demo-2 — 首次商业载人", note: "美国九年后恢复本土载人发射能力。" },
    { date: "2024-11-01", title: "单枚一级第 23 次飞行", note: "B1067 刷新单枚箭体复用次数纪录。" },
  ],

  launches: {
    total: 460,
    success: 457,
    partial: 1,
    failure: 2,
    asOf: "2025-06-30",
    notable: [
      { date: "2012-10-08", name: "CRS-1", note: "一台 Merlin 飞行中关机，主载荷仍正常入轨——多机冗余的首次实证。" },
      { date: "2015-06-28", name: "CRS-7", note: "二级液氧箱支撑杆断裂导致解体，是 Falcon 9 唯一的飞行中失败。" },
      { date: "2016-09-01", name: "Amos-6", note: "加注期间静态点火前爆炸（非飞行失败），暴露过冷液氧与碳纤维缠绕气瓶（COPV）的相容性问题。" },
      { date: "2020-05-30", name: "Demo-2", note: "首次载人飞行。" },
    ],
  },

  variants: [
    { name: "Falcon 9 v1.0 / v1.1 / Full Thrust", note: "2010–2018 的迭代版本，箭体逐步拉长、推力提升。" },
    { name: "Falcon Heavy", note: "三枚 Falcon 9 一级并联，LEO 63.8 t（一次性），2018 年首飞。" },
  ],
  relatedRockets: ["starship", "new-glenn", "electron", "zhuque-2"],
  principles: ["reusability", "propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 SpaceX 用户手册（Falcon User's Guide）公开尺寸复原：直径 3.7 m、整流罩 5.2 × 13.1 m、总高 70 m。各段长度按总高 70 m 归一化处理（公开的分段长度之和略大于总高，存在重叠口径差异）。",
  }),

  sources: [
    {
      title: "Falcon User's Guide",
      url: "https://www.spacex.com/media/falcon-users-guide-2021-09.pdf",
      publisher: "SpaceX",
      confidence: "high",
      note: "尺寸、运力包络、整流罩尺寸的一手来源。",
    },
    {
      title: "Falcon 9 — SpaceX",
      url: "https://www.spacex.com/vehicles/falcon-9/",
      publisher: "SpaceX",
      confidence: "high",
      note: "推力、质量、发动机台数。",
    },
    {
      title: "CRS-7 Accident Investigation Summary",
      url: "https://www.nasa.gov/wp-content/uploads/2018/06/spx-crs-7_public_summary.pdf",
      publisher: "NASA",
      confidence: "high",
      note: "二级支撑杆失效的官方结论。",
    },
    {
      title: "Falcon 9 — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Falcon_9",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射统计与复用次数汇总；统计口径随时间变化，本页数据截至 2025-06-30。",
    },
  ],

  tags: ["可回收", "商业航天", "载人", "高频发射", "煤油"],
};
