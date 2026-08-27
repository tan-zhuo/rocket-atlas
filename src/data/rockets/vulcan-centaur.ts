import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, bands, flag, text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "be4-pair",
    name: "BE-4 发动机（2 台）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 4,
    radius: 2.7,
    nozzles: { count: 2, bellRadius: 1.05, bellHeight: 3.1, ringRadius: 1.35 },
    description:
      "两台蓝色起源的 BE-4 甲烷发动机，海平面推力各 2,400 kN。ULA 选择向竞争对手采购发动机，是因为 2014 年后美国法律禁止军用发射使用俄制 RD-180，而当时国内可选的大推力发动机方案只有 BE-4 与 Aerojet 的 AR1——**一个纯粹由地缘政治催生的供应链决策。**",
  })
  .at(0, {
    id: "srb",
    name: "GEM 63XL 固体助推器（最多 6 枚）",
    group: "booster",
    shape: "cylinder",
    finish: "solid-booster",
    // GEM-63XL 白壳，根部一道红箍与芯级呼应
    livery: bands([{ from: 0.06, to: 0.09, color: PAINT.ulaRed }]),
    height: 20,
    radius: 0.8,
    cluster: { count: 6, offset: 3.5 },
    description:
      "碳纤维缠绕壳体的固体助推器，单枚推力 2,027 kN。**数量可按任务从 0 到 6 任意配置**——这是火神最核心的设计思想：不为每个运力档研制不同的火箭，而是用同一个芯级配不同数量的固体助推器，覆盖 LEO 10.8 t 到 27.2 t 的全谱系。固体助推器在这里扮演的是「可调节的推力模块」。",
  })
  .at(20, {
    id: "srb-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 2,
    radius: 0.8,
    cluster: { count: 6, offset: 3.5 },
    description: "固体助推器头锥。GEM 63XL 采用固定喷管（不摆动），姿态控制完全由芯级的两台 BE-4 承担。",
  })
  .at(4, {
    id: "core-body",
    name: "芯一级",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    // ULA 公布的红/白/灰三色：灰色尾裙 + 红箍 + 白箭体
    livery: [
      bands([
        { from: 0.0, to: 0.05, color: PAINT.darkGrey },
        { from: 0.05, to: 0.1, color: PAINT.ulaRed },
      ]),
      text("VULCAN", PAINT.ulaRed, 0.72, 0.95),
      flag("us", 0.55, 0.9),
    ],
    height: 33.6,
    radius: 2.7,
    description:
      "5.4 m 直径的甲烷/液氧芯级，采用摩擦搅拌焊接的铝合金正交网格壁板。ULA 曾规划过 **SMART 复用**方案：只把最贵的发动机舱段（约占一级成本的 65%）在再入时分离、用充气减速器与降落伞回收、直升机空中抓取——不回收整个箭体。该方案至今未实施。",
  })
  .at(37.6, {
    id: "centaur-v",
    name: "半人马座 V 上面级",
    nameEn: "Centaur V",
    group: "stage-2",
    shape: "cylinder",
    finish: "stainless",
    height: 11.5,
    radius: 2.7,
    description:
      "两台 RL10C-1-1 氢氧发动机，真空比冲 453.8 s。Centaur 的血统可追溯到 1962 年——它是**人类第一款氢氧上面级**，六十多年间不断演进至今。Centaur V 采用不锈钢承压式贮箱：箱壁只有 0.5 mm 厚，靠内压维持形状，不加压时会自行坍塌，因此干质比极高。它可在轨工作数小时并多次重启，未来的 ACES 方案还计划实现数周级的在轨滞留。",
  })
  .at(49.1, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 12.5,
    radius: 2.7,
    description: "5.4 m 直径整流罩，有 15.5 m 与 21.3 m 两种长度可选（本模型为短罩构型）。",
  });

export const vulcanCentaur: Rocket = {
  slug: "vulcan-centaur",
  name: "Vulcan Centaur",
  nameZh: "火神-半人马座",
  country: "United States",
  countryZh: "美国",
  agency: ["United Launch Alliance (ULA)"],
  family: "vulcan",
  status: "active",
  firstFlight: "2024-01-08",

  height: 61.6,
  diameter: 5.4,
  span: 8.6,
  mass: 662000,
  stageCount: 2,

  stages: [
    {
      name: "GEM 63XL SRB ×0–6",
      nameZh: "固体助推器（0–6 枚）",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustSeaLevel: 12162,
      burnTime: 90,
      propellantMass: 279000,
      diameter: 1.6,
      height: 22,
      note: "数量按任务配置，是运力调节的主要手段。",
      engines: [
        {
          name: "GEM 63XL",
          count: 6,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 2027,
          thrustSeaLevel: 2027,
          ispVacuum: 279,
        },
      ],
    },
    {
      name: "Vulcan First Stage",
      nameZh: "芯一级",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustSeaLevel: 4800,
      thrustVacuum: 5280,
      burnTime: 300,
      propellantMass: 313000,
      diameter: 5.4,
      height: 33.5,
      engines: [
        {
          name: "BE-4",
          count: 2,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "methalox",
          thrust: 2400,
          thrustSeaLevel: 2400,
          thrustVacuum: 2640,
          ispSeaLevel: 310,
          ispVacuum: 340,
        },
      ],
    },
    {
      name: "Centaur V",
      nameZh: "半人马座 V 上面级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 212,
      burnTime: 1000,
      dryMass: 5500,
      propellantMass: 54400,
      diameter: 5.4,
      height: 11.7,
      note: "可多次重启，在轨工作能力达数小时。",
      engines: [
        {
          name: "RL10C-1-1",
          count: 2,
          cycle: "expander",
          cycleZh: "膨胀循环",
          propellant: "hydrolox",
          thrust: 106,
          thrustVacuum: 106,
          ispVacuum: 453.8,
          note: "RL10 家族自 1962 年服役至今，是世界上服役时间最长的火箭发动机。",
        },
      ],
    },
  ],

  payloadLEO: 27200,
  payloadGTO: 14400,
  reusable: false,
  reuseNote: "规划中的 SMART 方案只回收发动机舱段，尚未实施。",
  humanRated: false,

  description:
    "ULA 用来同时取代 Atlas V 与 Delta IV 的单一平台，靠「可变数量固体助推器 + 六十年血统的氢氧上面级」覆盖全运力谱系。",

  history: `火神的诞生有一个明确的政治起点：2014 年俄罗斯吞并克里米亚后，美国国会立法禁止军用发射任务使用俄制 RD-180 发动机——而 ULA 的主力 Atlas V 一级正是靠 RD-180 驱动。ULA 必须在几年内换掉发动机，或者换掉整枚火箭。

它选择了后者，并且顺便解决另一个问题：同时维护 Atlas V 和 Delta IV 两条产线的成本过高。火神的目标是**用一个平台取代两个家族**，把单次发射成本从 Atlas V 的 1.1 亿美元以上压到 8,000 万美元级。

研制过程被 BE-4 发动机的进度反复拖延：原计划 2019 年首飞，实际推迟到 2024 年 1 月 8 日（Cert-1，携带 Astrobotic 的 Peregrine 月球着陆器——火箭工作完美，着陆器因自身推进系统泄漏失败）。2024 年 10 月的 Cert-2 飞行中一枚固体助推器的喷管在飞行中脱落，火箭仍成功完成任务，但认证因此推迟。

火神的订单簿是所有新火箭中最厚实的之一：美国太空军的 NSSL Phase 2 合同、亚马逊 Kuiper 星座的 38 次发射。**它不需要在开放市场上赢，只需要按时交付。**`,

  designPhilosophy: `火神的设计逻辑是**「用模块化配置替代型号谱系」**。

Atlas V 已经部分实践了这个思路（0–5 枚固体助推器可选），火神把它推到极致：同一个芯级、同一个上面级，靠 0/2/4/6 枚固体助推器和两种整流罩长度，覆盖从小型 GTO 任务到 27 t LEO 的全部需求。用户手册上有十几种构型编号（VC0S 到 VC6L），但工厂里只有一条产线。

这个思路的价值在于**摊薄固定成本**：航天工业的成本大头是产线、厂房、测试设备和熟练工人，而不是原材料。让所有任务共用同一套硬件，是在发射次数有限（每年 10–25 次）的前提下降低单价最直接的办法。

第二条主线是**保守中的选择性激进**：一级换用了从未有人量产过的富氧分级燃烧甲烷机（BE-4），上面级却沿用了 1962 年就开始服役的 RL10 血统。这个组合反映了 ULA 的判断——**一级发动机是被迫更换的（RD-180 断供），上面级则没有任何更换的理由**（Centaur 的性能与可靠性至今无人超越）。

第三条是**明确放弃整箭复用**。ULA 公开算过账：以每年 10–25 次的发射频率，回收整个一级的翻新与设施成本无法摊平。SMART 方案（只回收发动机舱）是它给出的折中答案，但至今停留在纸面上——**这实际上等于承认，在这个发射频率下，复用是一道算不过来的账。**`,

  tradeoffs: [
    {
      question: "为什么不做一级回收？",
      answer: `ULA 前 CEO Tory Bruno 多次公开阐述过这个判断，逻辑值得完整看一遍：

一级回收的经济性取决于三个量：**一级占全箭成本的比例**（记为 $f$）、**翻新成本占新造成本的比例**（$r$）、**单枚箭体的复用次数**（$n$），以及回收导致的**运力损失**。

ULA 的数据是：一级中发动机约占 65% 的成本，而整个一级约占全箭成本的 60%。也就是说发动机约占全箭成本的 40%，箭体结构只占 20%。

在这个成本结构下：

- 回收整个一级，要付出运力损失（约 25%）、着陆硬件质量、回收船队与翻新厂房的固定成本，换回 60% 的箭体价值；
- 只回收发动机舱（SMART），运力损失小得多（只需分离机构 + 减速伞 + 抓取），换回 40% 的价值。

**关键变量是发射频率。** 回收设施的固定成本必须除以年发射次数。SpaceX 一年飞 100+ 次，每次分摊到的固定成本可以忽略；ULA 一年飞 10–25 次，同样的设施每次要分摊 4–10 倍的成本。算下来，在 ULA 的发射量级上，SMART 方案的收益率高于整箭回收，而整箭回收的收益率可能是负的。

这个论证在数学上是成立的，但它有一个隐含前提：**发射频率是外生给定的**。SpaceX 的做法恰恰相反——它先假设自己能创造需求（Starlink），再按高频率去设计火箭。**这是两种截然不同的因果方向：一个把频率当作约束，一个把频率当作可以改变的变量。**`,
    },
    {
      question: "Centaur 用了六十年，凭什么还没被超越？",
      answer: `RL10 于 1962 年首次飞行，Centaur 上面级同年服役。今天火神上的 Centaur V 与当年相比，基本原理没有变化：

- **膨胀循环**：液氢流经推力室壁的冷却夹套吸热汽化，用汽化后的氢气驱动涡轮泵，再送入燃烧室燃烧。没有燃气发生器、没有预燃室、没有任何推进剂被浪费。这是所有循环里结构最简单、最可靠的一种，代价是推力受换热面积限制（RL10 只有 106 kN），只能用在上面级。
- **不锈钢承压贮箱**：箱壁 0.5 mm 厚，靠内压维持结构刚度，干质比极高。这个 1950 年代 Atlas 火箭的「钢气球」思路在上面级上找到了完美的应用场景。
- **真空比冲 453.8 s**：接近化学推进的理论上限。

它没被超越的原因是**这个设计已经很接近该问题的最优解**：真空环境、需要多次重启、需要长时间在轨、推力不需要大。在这些约束下，膨胀循环氢氧机 + 超薄承压贮箱几乎无懈可击。

真正在改进的是**周边能力**：Centaur V 增加了在轨滞留时间（从数小时向数天延长）、提高了重启次数、增大了贮箱。ULA 规划的 ACES 甚至设想用「集成飞行器流体（IVF）」系统——用蒸发的氢氧驱动一台内燃机发电并产生姿控推力，从而实现数周的在轨寿命。

**一个 1962 年的设计仍在定义 2020 年代的上面级标准，这本身就说明了「针对约束的最优解」有多长的生命力。**`,
    },
    {
      question: "固体助推器数量可变，真的等于「一个平台覆盖全谱系」吗？",
      answer: `理论上，0 到 6 枚 GEM 63XL 让火神的 LEO 运力从 10.8 t 连续覆盖到 27.2 t。但这个「连续」有隐藏成本：

- **每一种构型都要单独认证**。美国太空军的 NSSL 认证是按构型进行的，VC0 和 VC6 的气动载荷、振动环境、分离时序完全不同，不能互相替代。火神首飞后需要多次飞行才能完成主要构型的认证。
- **气动与载荷分析的组合爆炸**。6 枚助推器的非对称配置（比如 2 枚时装哪两个位置）会显著改变气动特性与滚转力矩，每种都要单独分析。
- **固体助推器的推力不可调**。一旦点火就按预定曲线燃烧，飞行中无法根据实际情况调整。这限制了轨迹优化的空间。

对比 Falcon 9 的方案：**用同一种构型，靠回收/不回收和不同的弹道来覆盖运力范围**。这样只需要认证一种构型，代价是在低运力任务上「浪费」了大火箭。

哪种更好取决于任务谱的形状。如果任务分布在很宽的运力区间且每种都有相当数量，模块化更优；如果任务集中在某几个点上，单一构型 + 弹道调整更简单。**火神的选择反映了它的客户结构——美国国家安全发射任务的载荷质量分布极宽，从 2 t 的导航卫星到 15 t 的侦察卫星都有。**`,
    },
  ],

  contemporaries: `火神的定位与 **Ariane 6**（欧洲，2024 年首飞，LEO 21.6 t，同样可配 2/4 枚固体助推器、同样不回收）几乎完全对称：两者都是老牌国家发射服务商为取代自家旧型号而研制的、以模块化降本为核心、明确放弃复用的中重型火箭；两者都延期多年；两者都主要依靠政府订单生存。

它们共同面对的问题是：**当竞争对手的边际成本靠复用持续下降时，靠模块化和产线整合能压缩的那 20–30% 成本够不够用？** 到目前为止，答案更多取决于政府是否愿意为「保持多个独立的发射供应商」这件事本身付费——这是一个战略采购问题，而不是市场问题。`,

  milestones: [
    { date: "2015-04-13", title: "火神计划公开", note: "宣布用单一平台取代 Atlas V 与 Delta IV。" },
    { date: "2024-01-08", title: "Cert-1 首飞成功", note: "携带 Peregrine 月球着陆器，火箭工作正常。" },
    { date: "2024-10-04", title: "Cert-2 飞行", note: "一枚固体助推器喷管脱落，任务仍成功。" },
  ],

  launches: {
    total: 4,
    success: 4,
    failure: 0,
    asOf: "2025-12-31",
    notable: [
      { date: "2024-01-08", name: "Cert-1 / Peregrine Mission One", note: "首飞；着陆器自身故障，与火箭无关。" },
      { date: "2024-10-04", name: "Cert-2", note: "固体助推器喷管在飞行中脱落，制导系统补偿后仍入轨。" },
    ],
  },

  variants: [
    { name: "VC0 / VC2 / VC4 / VC6", note: "按固体助推器数量（0/2/4/6）区分的构型。" },
    { name: "S / L 整流罩", note: "15.5 m 短罩与 21.3 m 长罩两种选择。" },
  ],
  relatedRockets: ["delta-iv-heavy", "ariane-5", "new-glenn", "falcon-9"],
  principles: ["propellants-and-cycles", "reusability"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 VC6S 构型（6 枚固体助推器 + 短整流罩）复原，总高约 61.6 m。助推器数量在实际任务中为 0–6 枚可变。涂装依据 ULA 公开的火神红/白/灰配色。",
  }),

  sources: [
    {
      title: "Vulcan-Centaur Rolls to Pad, Completes Last Major Pre-Launch Milestone",
      url: "https://www.americaspace.com/2024/01/05/vulcan-centaur-rolls-to-pad-completes-last-major-pre-launch-milestone/",
      publisher: "AmericaSpace",
      confidence: "medium",
      note: "芯级采用红/白/灰三色涂装的描述，本站 3D 涂装依此还原。",
    },
    {
      title: "Vulcan Centaur Launch Vehicle — Rocket Guide",
      url: "https://www.ulalaunch.com/rockets/vulcan-centaur",
      publisher: "United Launch Alliance",
      confidence: "high",
      note: "构型、尺寸与运力的一手来源。",
    },
    {
      title: "Vulcan Centaur User's Guide",
      url: "https://www.ulalaunch.com/docs/default-source/rockets/vulcan-centaur-users-guide.pdf",
      publisher: "United Launch Alliance",
      confidence: "high",
      note: "各构型运力表与载荷包络。",
    },
    {
      title: "Vulcan Centaur — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Vulcan_Centaur",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "研制历程与飞行记录汇总。",
    },
  ],

  tags: ["模块化构型", "甲烷", "固体助推", "膨胀循环上面级", "国家安全发射"],
};
