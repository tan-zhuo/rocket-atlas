import type { Rocket } from "../types";
import { rocketGeometry, GROUP_COLOR, METAL_DARK } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "eap-nozzles",
    name: "EAP 固体助推器喷管（2 台）",
    group: "booster",
    shape: "engines",
    height: 3.0,
    radius: 1.525,
    cluster: { count: 2, offset: 4.25, phase: 90 },
    color: METAL_DARK,
    nozzles: { count: 1, bellRadius: 1.2, bellHeight: 2.8 },
    description:
      "每台 EAP 只有一个大喷管，由液压作动器摆动做推力矢量控制。固体助推器的喷管必须承受 130 s 的连续烧蚀，采用碳酚醛烧蚀材料——它在工作中被有控制地消耗掉，这与液体发动机的再生冷却是完全不同的热防护哲学。",
  })
  .at(0, {
    id: "eap-body",
    name: "EAP 固体助推器（2 枚）",
    nameEn: "Étage d'Accélération à Poudre",
    group: "booster",
    shape: "cylinder",
    height: 28,
    radius: 1.525,
    cluster: { count: 2, offset: 4.25, phase: 90 },
    color: GROUP_COLOR.booster,
    description:
      "每枚装 240 t 的 HTPB 复合固体推进剂，海平面推力 7,080 kN——两枚合计提供起飞推力的 90% 以上。药柱分三段浇筑后在发射场对接，星形通道截面使推力在前 30 s 保持高位、随后自然下降，从而把最大动压时的过载压下来。**固体推进剂的推力曲线是浇筑时用几何形状「写死」的，飞行中无法更改。**",
  })
  .at(28, {
    id: "eap-nose",
    name: "EAP 头锥",
    group: "booster",
    shape: "cone",
    height: 3.6,
    radius: 1.525,
    cluster: { count: 2, offset: 4.25, phase: 90 },
    color: "#6c7688",
    description: "助推器头锥，内含分离火箭。EAP 在 T+130 s 分离后落入大西洋，早期曾试验过海上回收但未投入常态化使用。",
  })
  .at(0, {
    id: "vulcain",
    name: "Vulcain 2 发动机",
    group: "core",
    shape: "engines",
    height: 3.4,
    radius: 2.7,
    color: METAL_DARK,
    nozzles: { count: 1, bellRadius: 1.15, bellHeight: 3.0 },
    description:
      "单台氢氧发动机，真空推力 1,390 kN、真空比冲 431 s，从地面点火一直工作到 T+540 s。它在起飞时只贡献约 8% 的推力——Ariane 5 的芯级本质上是一个「从地面开始工作的二级」。喷管下部采用燃气发生器排气膜冷却，是 Vulcain 2 相对 Vulcain 1 的主要改进。",
  })
  .at(3.4, {
    id: "epc",
    name: "芯级 EPC",
    nameEn: "Étage Principal Cryotechnique",
    group: "core",
    shape: "cylinder",
    height: 27.1,
    radius: 2.7,
    color: GROUP_COLOR["stage-1"],
    description:
      "5.4 m 直径的液氢/液氧芯级，装 175 t 推进剂。液氧箱在上、液氢箱在下，中间用一个共底隔开——液氢箱体积是液氧箱的三倍多，这就是氢的密度代价在结构上的直观体现。箭体外的橙色是喷涂的聚氨酯泡沫绝热层，不涂漆是为了省下几百公斤。",
  })
  .at(30.5, {
    id: "esc-a",
    name: "上面级 ESC-A + 设备舱",
    nameEn: "Étage Supérieur Cryotechnique",
    group: "stage-2",
    shape: "cylinder",
    height: 5.5,
    radius: 2.7,
    color: GROUP_COLOR["stage-2"],
    description:
      "装一台 HM7B 氢氧发动机（推力 67 kN、真空比冲 446 s），源自 Ariane 4 的成熟上面级。它**不可重启**——只能一次点火直接送入 GTO，这限制了 Ariane 5 执行需要多次点火的任务（如直接 GEO 注入或复杂星座部署）。上方的设备舱（VEB）内是制导计算机与双星发射所需的 SYLDA 结构支撑。",
  })
  .at(36, {
    id: "fairing",
    name: "整流罩（含 SYLDA 双星结构）",
    group: "payload",
    shape: "ogive",
    height: 17,
    radius: 2.7,
    color: "#eef1f6",
    description:
      "5.4 m 直径、最长 17 m 的整流罩，内部可装一个 SYLDA 承力筒：下层放一颗卫星、上层放另一颗，**一次发射同时送两颗商业通信卫星入 GTO**。这个「双星发射」能力是 Ariane 5 商业模式的核心——它把一枚大火箭的成本摊给两个客户，从而在单星运力过剩的情况下仍具价格竞争力。",
  });

export const ariane5: Rocket = {
  slug: "ariane-5",
  name: "Ariane 5 ECA",
  nameZh: "阿丽亚娜五号 ECA",
  country: "Europe",
  countryZh: "欧洲",
  agency: ["ESA 欧洲空间局", "ArianeGroup", "Arianespace"],
  family: "ariane",
  status: "retired",
  firstFlight: "2002-12-11",
  lastFlight: "2023-07-05",

  height: 53,
  diameter: 5.4,
  span: 11.55,
  mass: 780000,
  stageCount: 2,

  stages: [
    {
      name: "EAP (P241) ×2",
      nameZh: "固体助推器（2 枚）",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustSeaLevel: 14160,
      burnTime: 130,
      dryMass: 76000,
      propellantMass: 480000,
      diameter: 3.05,
      height: 31.6,
      note: "两枚合计提供起飞推力的 92%。",
      engines: [
        {
          name: "P241 固体发动机",
          count: 2,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 7080,
          thrustSeaLevel: 7080,
          ispSeaLevel: 275,
          ispVacuum: 275,
        },
      ],
    },
    {
      name: "EPC (H173)",
      nameZh: "芯级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustSeaLevel: 960,
      thrustVacuum: 1390,
      burnTime: 540,
      dryMass: 14700,
      propellantMass: 175000,
      diameter: 5.4,
      height: 30.5,
      engines: [
        {
          name: "Vulcain 2",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 1390,
          thrustSeaLevel: 960,
          thrustVacuum: 1390,
          ispSeaLevel: 310,
          ispVacuum: 431,
        },
      ],
    },
    {
      name: "ESC-A",
      nameZh: "上面级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 67,
      burnTime: 945,
      dryMass: 4540,
      propellantMass: 14900,
      diameter: 5.4,
      height: 4.711,
      note: "不可重启，只能一次点火完成 GTO 注入。",
      engines: [
        {
          name: "HM7B",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 67,
          thrustVacuum: 67,
          ispVacuum: 446,
          note: "源自 Ariane 4，是服役时间最长的氢氧上面级发动机之一。",
        },
      ],
    },
  ],

  payloadLEO: 21000,
  payloadGTO: 10865,
  reusable: false,
  humanRated: false,

  description:
    "欧洲二十年商业发射市场的支柱，以「双星发射」的独特商业模式和近乎完美的后期可靠性著称，也因不可复用而最终被时代淘汰。",

  history: `Ariane 5 的立项动机之一现在已被遗忘：它最初是为发射欧洲自己的载人航天飞机 **Hermes** 而设计的。这解释了它的很多特征——为什么起飞过载被限制得很低、为什么芯级用氢氧、为什么可靠性要求极高。1992 年 Hermes 被取消，火箭却已经造了一半，于是转型为商业卫星发射器。

1996 年 6 月 4 日首飞（Flight 501）在 37 秒后自毁，原因是把 Ariane 4 的惯性导航软件直接复用过来，一段用于地面对准的代码在 Ariane 5 更大的水平速度下发生 64 位浮点到 16 位整数的转换溢出，触发了硬件异常——**这成为软件工程教科书里最著名的案例之一：复用经过验证的代码，不等于复用它的适用范围。**

ECA 型（增强 GTO 运力到 10 t 级）2002 年 12 月首飞同样失败，Vulcain 2 的喷管在飞行中受热变形。经过整改后 2005 年 2 月复飞成功，此后连续 82 次发射成功，一直到 2023 年 7 月退役。

它的谢幕之作足够体面：2021 年 12 月 25 日发射 **詹姆斯·韦布空间望远镜**，入轨精度之高，为望远镜节省下的推进剂使其设计寿命从 10 年延长到 20 年以上。`,

  designPhilosophy: `Ariane 5 的设计逻辑是**为一个特定的商业细分市场做极致优化：地球同步转移轨道的双星发射。**

1990 年代的商业通信卫星质量集中在 3–6 t，而 Ariane 5 的 GTO 运力是 10 t 级。这个数字不是巧合——它被刻意选定为「刚好装得下两颗典型卫星」。SYLDA 双星结构、17 m 长整流罩、极低的入轨误差，全部服务于这一个商业模式：**把一枚大火箭的固定成本分摊给两个客户，从而做出比对手更低的单星价格。**

第二条主线是**用固体助推器换研制风险**。固体助推器结构简单、推力密度高、可长期贮存，让欧洲不必研制大推力液体一级发动机就能得到 1,400 t 的起飞推力。代价是固体推进剂比冲低（275 s）、点火后不可关机、不可回收。

第三条是**可靠性优先于成本**。Ariane 5 后期的连续成功记录（82 次）在大型火箭里几乎无人能及，但它的单次发射价格长期维持在 1.5–1.8 亿美元。当 Falcon 9 用复用把价格打到 6,700 万美元、并且能一次发射 60 颗星链卫星时，Ariane 5 精心优化的双星模式反而成了枷锁——它必须**等到凑齐两颗合适的卫星才能发射**，排期灵活性极差。`,

  tradeoffs: [
    {
      question: "为什么用固体助推器，而不是液体助推？",
      answer: `Ariane 5 起飞时 92% 的推力来自两枚固体助推器。这是欧洲在 1980 年代的一个现实判断：**研制一台 7,000 kN 级的液体发动机，欧洲既没有经验也没有预算。**

固体助推器的优势很实在：

- **推力密度高**：同样体积能产生更大推力，因为固体推进剂密度是液氢的 25 倍。
- **结构简单**：没有涡轮泵、没有阀门、没有低温绝热，就是一个装满固体燃料的钢筒加一个喷管。
- **可长期贮存**：浇筑好的助推器可以放几年，发射准备时间短。
- **技术可迁移**：法国已有弹道导弹固体发动机的工业基础（M4/M45），技术可以直接转用。

代价同样明确：

- **比冲低**（275 s vs 煤油的 300 s、氢氧的 430 s），这是最根本的损失；
- **点火即不可逆**：一旦点火就无法关机或节流，任何异常都只能靠飞行终止系统解决——这也是为什么 Ariane 5 的载人构型（Hermes）在安全性论证上非常吃力；
- **不可回收**（虽然理论上可以像航天飞机那样海上打捞，但翻新成本高）；
- **地面处理危险**：几百吨固体推进剂在总装厂里就是一个巨型爆炸物。

日本 H-IIA、美国航天飞机与 SLS、印度 GSLV Mk III 都做了同样的选择，理由高度一致。**固体助推器本质上是「用比冲和灵活性，换研制难度和起飞推力」。**`,
    },
    {
      question: "上面级不能重启，为什么是个大问题？",
      answer: `ESC-A 的 HM7B 只能点火一次。这意味着 Ariane 5 的入轨方式只有一种：一次连续点火，直接把载荷送到 GTO。

不能重启带来三个限制：

1. **不能直接 GEO 注入**。现代通信卫星越来越希望火箭把它送到接近 GEO 的轨道（甚至超同步转移轨道），以节省卫星自身的推进剂、延长寿命。这需要上面级在滑行半圈后再次点火。
2. **不能做多轨道面部署**。星座卫星需要投放到不同的轨道面，这要求上面级多次点火调整。Ariane 5 只能一次性把所有载荷丢在同一条轨道上。
3. **不能做末级离轨**。任务结束后的上面级无法主动降轨，只能留在轨道上成为空间碎片。

Ariane 5 之所以接受这个限制，是因为它诞生的年代里 GTO 双星发射就是全部市场。等到 2015 年后星座发射兴起，这个短板就无法弥补了——而**上面级的重启能力是从设计之初就要决定的事情（需要沉底推进系统、多次点火的点火器、更长的低温贮存时间），无法后期加装。**

Ariane 6 的 Vinci 发动机可重启多达 4 次，正是针对这一课的直接回应。`,
    },
    {
      question: "Flight 501 的软件失败说明了什么？",
      answer: `1996 年 6 月 4 日，Ariane 5 首飞在 37 秒后解体。事后调查发现的原因链条是这样的：

1. 惯性参考系统（SRI）中有一段用于**发射前地面对准**的代码，在起飞后仍继续运行——这在 Ariane 4 上是无害的冗余。
2. 该代码把水平速度的 64 位浮点值转换为 16 位有符号整数。Ariane 4 的水平速度永远不会溢出这个范围。
3. Ariane 5 的弹道更平、水平速度增长快得多，转换在 36.7 s 时溢出，触发硬件异常。
4. SRI 的设计把「异常」当作**硬件故障**处理，于是关机并把诊断信息发到数据总线。
5. 备份 SRI 运行**完全相同的软件**，在 72 毫秒前已经因同样原因关机。
6. 主控计算机把诊断信息误读为姿态数据，指令喷管做出极端偏转，火箭在气动载荷下解体。

每一环单独看都是合理的工程决策。真正的教训有三条：

- **复用经过验证的软件时，必须重新验证它的输入域假设**。这段代码没有 bug，它只是被用在了一个它从未被设计要面对的弹道上。
- **相同的冗余不是冗余**。两套完全相同的软件面对相同输入会同时失效，这种冗余只能防硬件随机故障，不能防设计错误。
- **异常处理的默认行为需要设计**。把「计算溢出」当作「硬件坏了」并关机，在一个飞行中的火箭上是最糟糕的选择。

这次失败让 Ariane 5 推迟了 17 个月，也让整个航天软件行业重写了自己的验证规范。`,
    },
    {
      question: "为什么退役？82 次连续成功也救不了它吗？",
      answer: `Ariane 5 的可靠性在退役时是世界最好的之一，但它在三个维度上同时失去了竞争力：

- **价格**：一次发射约 1.5–1.8 亿美元，Falcon 9 复用价约 6,700 万美元。即使双星发射摊薄到每颗 7,500 万美元，仍然贵。
- **排期灵活性**：双星模式要求两颗卫星同时就绪且轨道兼容。一颗卫星延期，另一颗客户就得跟着等——这在卫星研制经常延期的现实里是巨大的隐性成本。
- **市场结构变化**：GTO 通信卫星的年发射量从 2015 年的 20 多颗降到 2022 年的不足 10 颗（电推进让卫星更小、星座取代了部分转发器需求）。Ariane 5 精心优化的那个市场本身萎缩了。

值得注意的是，Ariane 5 的问题**不是它做错了什么，而是它做对的那件事不再重要了**。为特定市场做极致优化的产品，一旦市场结构变化就没有转身余地——这与 Falcon 9「先做一个通用平台，再靠频率和复用压成本」的路线形成了教科书式的对照。

Ariane 6 的困境在于它的设计目标（降低成本、上面级可重启）是在 2014 年确定的，回应的是 2014 年的市场；到 2024 年首飞时，市场已经又变了一轮。**这正是长研制周期运载火箭的结构性难题：你必须预测十年后的市场，而市场变化的速度正在超过火箭研制的速度。**`,
    },
  ],

  contemporaries: `Ariane 5 的同代对手是 **Atlas V**（可靠性同样出色，单价相近，靠美国政府订单生存）、**Proton-M**（价格更低但可靠性差、且使用剧毒的偏二甲肼）、**H-IIA/B**（技术相似但几乎只服务日本本国需求）与后来的 **Falcon 9**。

在 2010 年之前的商业 GTO 市场上，Ariane 5 与 Proton 分走了大部分份额，前者赢在可靠性、后者赢在价格。2013 年之后 Falcon 9 同时在两个维度上超越了它们——这是二十年商业发射市场里最彻底的一次洗牌。`,

  milestones: [
    { date: "1996-06-04", title: "Flight 501 首飞失败", note: "软件整数溢出导致 37 s 后解体。" },
    { date: "2002-12-11", title: "ECA 型首飞失败", note: "Vulcain 2 喷管热变形。" },
    { date: "2005-02-12", title: "ECA 复飞成功", note: "此后进入长期稳定期。" },
    { date: "2008-03-09", title: "首次发射 ATV 货运飞船", note: "20 t 级载荷送往国际空间站。" },
    { date: "2018-07-25", title: "一箭四星发射伽利略", note: "欧洲导航星座部署。" },
    { date: "2021-12-25", title: "发射詹姆斯·韦布空间望远镜", note: "入轨精度极高，为望远镜省下大量推进剂。" },
    { date: "2023-07-05", title: "末次飞行", note: "累计 117 次发射后退役。" },
  ],

  launches: {
    total: 117,
    success: 112,
    partial: 3,
    failure: 2,
    asOf: "2023-07-05",
    notable: [
      { date: "1996-06-04", name: "Flight 501", note: "软件失效，成为航天软件工程的经典案例。" },
      { date: "2002-12-11", name: "Flight 157 (ECA 首飞)", note: "Vulcain 2 喷管失效。" },
      { date: "2018-01-25", name: "Flight VA241", note: "方位角参数录入错误导致轨道偏差，卫星靠自身推进挽救。" },
      { date: "2021-12-25", name: "JWST", note: "史上最贵载荷之一，入轨精度使望远镜寿命翻倍。" },
    ],
  },

  variants: [
    { name: "Ariane 5G / G+ / GS", note: "初代构型，GTO 6.9 t，2003 年后逐步退出。" },
    { name: "Ariane 5 ECA", note: "主力商业构型，GTO 10.865 t。" },
    { name: "Ariane 5 ES", note: "使用可重启的 EPS 上面级，用于 ATV 与伽利略星座。" },
  ],
  relatedRockets: ["long-march-5", "delta-iv-heavy", "falcon-9", "vulcan-centaur"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 Ariane 5 用户手册的 ECA 长整流罩构型复原（总高约 53 m、芯级 5.4 m、EAP 3.05 m）。整流罩长度随构型在 12.7–17 m 之间变化，本模型取长罩版本。",
  }),

  sources: [
    {
      title: "Ariane 5 User's Manual, Issue 5",
      url: "https://www.arianespace.com/wp-content/uploads/2011/07/Ariane5_Users-Manual_October2016.pdf",
      publisher: "Arianespace",
      confidence: "high",
      note: "尺寸、质量、运力包络与 SYLDA 结构的一手来源。",
    },
    {
      title: "ARIANE 5 Flight 501 Failure — Report by the Inquiry Board",
      url: "https://esamultimedia.esa.int/docs/esa-x-1819eng.pdf",
      publisher: "ESA",
      confidence: "high",
      note: "首飞失败的官方调查报告全文。",
    },
    {
      title: "Ariane 5 — ESA",
      url: "https://www.esa.int/Enabling_Support/Space_Transportation/Launch_vehicles/Ariane_5",
      publisher: "ESA",
      confidence: "high",
      note: "型号总体说明与发射记录。",
    },
  ],

  tags: ["双星发射", "固体助推", "氢氧芯级", "商业发射", "已退役"],
};
