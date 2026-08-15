import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

/** 按 Block 1 载人构型（4 台 RS-25 + 两枚五段固推 + ICPS + 猎户座）建模。 */
const g = rocketGeometry()
  .at(0, {
    id: "core-engines",
    name: "RS-25 发动机（4 台）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 5,
    radius: 4.2,
    nozzles: { count: 4, bellRadius: 1.19, bellHeight: 3.2, ringRadius: 2.15 },
    description:
      "四台从航天飞机上拆下来的 RS-25——**它们中有的已经飞过十几次，现在每飞一次就扔四台。**库存的 16 台足够支撑 Artemis I–IV，之后要用新造的 RS-25E（简化生产版，取消了可复用要求，单价目标降到约一半，实际仍在 1 亿美元量级）。这是整个项目最具象征性的一处：**为复用而生的发动机，最终被用作一次性。**",
  })
  .at(0, {
    id: "srb-nozzle",
    name: "五段固推喷管（2 枚）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 3.2,
    radius: 1.86,
    cluster: { count: 2, offset: 6.2, phase: 90 },
    nozzles: { count: 1, bellRadius: 1.75, bellHeight: 2.8 },
    description: "喷管可摆动 ±8°，与芯级的四台 RS-25 共同承担起飞段的姿态控制。",
  })
  .at(3.2, {
    id: "srb-body",
    name: "五段固体助推器（2 枚）",
    group: "booster",
    shape: "cylinder",
    finish: "painted-white",
    height: 46.8,
    radius: 1.855,
    cluster: { count: 2, offset: 6.2, phase: 90 },
    description:
      "航天飞机的四段固推加了一段，推力提高约 25%，单枚 16,000 kN——**这是有史以来推力最大的固体火箭发动机。**它们贡献了起飞推力的 75%，工作 126 s 后抛掉。与航天飞机不同的是**不再回收**：伞舱与回收船的费用被判定不值得，箭体直接落海。",
  })
  .at(50, {
    id: "srb-nose",
    name: "固推头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 4,
    radius: 1.855,
    cluster: { count: 2, offset: 6.2, phase: 90 },
    description: "取消了航天飞机时代的回收伞系统，头锥内只保留分离火工品与配平质量。",
  })
  .at(5, {
    id: "core-lh2",
    name: "芯级 液氢舱",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 34,
    radius: 4.2,
    description:
      "8.4 m 直径——直接沿用航天飞机外贮箱的直径与米丘德工厂的工装。橙色不是涂装而是裸露的喷涂绝热泡沫，与外贮箱同源。**整个 SLS 的尺寸是被三十年前的工厂决定的。**",
  })
  .at(39, {
    id: "core-intertank",
    name: "箱间段",
    group: "core",
    shape: "cylinder",
    finish: "painted-white",
    height: 6.7,
    radius: 4.2,
    description: "两枚固推的前接点在这里，起飞时 32,000 kN 的固推推力通过这一段传进芯级。外部涂白以区别于泡沫段。",
  })
  .at(45.7, {
    id: "core-lox",
    name: "芯级 液氧舱",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 17.3,
    radius: 4.2,
    description:
      "与航天飞机外贮箱最大的区别在这里：外贮箱是一个纯粹的贮箱，**SLS 芯级是一个完整的级**——它自带四台发动机、飞控、电源与推力结构，长度增加到 64.6 m。这也是它研制超期的主要原因之一：把贮箱改造成有动力的级，远不是加几台发动机那么简单。",
  })
  .at(63, {
    id: "lvsa",
    name: "级间适配段 LVSA",
    group: "stage-2",
    shape: "frustum",
    finish: "painted-white",
    height: 4.5,
    radius: 4.2,
    radiusTop: 2.55,
    description: "从 8.4 m 芯级收缩到 5 m 上面级的锥形段，分离时纵向解体抛离。",
  })
  .at(67.5, {
    id: "icps",
    name: "临时低温推进级 ICPS",
    nameEn: "Interim Cryogenic Propulsion Stage",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 13.7,
    radius: 2.55,
    description:
      "由 Delta IV 的 DCSS 改来，一台 RL10B-2，负责地月转移注入。名字里的「临时」是真话：它的推进剂只有 27 t，是整枚火箭最弱的一环。Block 1B 会换成四台 RL10 的**探索上面级（EUS）**，TLI 运力从 27 t 提高到 42 t——**但那需要一个新的移动发射平台，费用又是数十亿美元。**",
  })
  .at(81.2, {
    id: "osa",
    name: "猎户座飞船适配器",
    group: "payload",
    shape: "frustum",
    finish: "painted-white",
    height: 2.6,
    radius: 2.55,
    radiusTop: 2.7,
    description: "适配器内可搭载立方星等次级载荷；Artemis I 就带了 10 颗。",
  })
  .at(83.8, {
    id: "orion",
    name: "猎户座飞船",
    nameEn: "Orion MPCV",
    group: "payload",
    shape: "capsule",
    finish: "painted-white",
    height: 8.5,
    radius: 2.7,
    description:
      "四人乘组的深空飞船，含欧空局提供的服务舱。返回舱直径 5.02 m，是阿波罗指令舱的 1.3 倍，再入速度接近 11 km/s——**这是自阿波罗以来第一次有载人飞行器以第二宇宙速度返回地球。**",
  })
  .at(92.3, {
    id: "las",
    name: "发射中止系统 LAS",
    group: "payload",
    shape: "tower",
    finish: "painted-accent",
    height: 5.8,
    radius: 1.3,
    description:
      "固体逃逸塔，中止推力 1,760 kN，可在 2 s 内把飞船拉离火箭 1.6 km。**它的存在正是对航天飞机最直接的否定**：载荷回到顶端，逃逸塔就重新有地方装了。",
  });

export const sls: Rocket = {
  slug: "sls",
  name: "Space Launch System",
  nameZh: "太空发射系统",
  country: "United States",
  countryZh: "美国",
  agency: ["NASA", "Boeing", "Aerojet Rocketdyne", "Northrop Grumman"],
  family: "sls",
  status: "active",
  firstFlight: "2022-11-16",

  height: 98.1,
  diameter: 8.4,
  span: 12.1,
  mass: 2608000,
  stageCount: 2,

  stages: [
    {
      name: "Core Stage + 2 × Five-Segment SRB",
      nameZh: "芯级 + 两枚五段固体助推器",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧 · PBAN 复合固体推进剂",
      thrustSeaLevel: 39100,
      burnTime: 126,
      dryMass: 85270,
      propellantMass: 1600000,
      diameter: 8.4,
      height: 64.6,
      note: "固推工作 126 s 后抛离；芯级四台 RS-25 一直烧到 T+480 s，与航天飞机的时序几乎相同。",
      engines: [
        {
          name: "Five-Segment SRB",
          nameZh: "五段固体助推器",
          count: 2,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 16000,
          thrustSeaLevel: 16000,
          ispSeaLevel: 242,
          ispVacuum: 269,
          note: "史上推力最大的固体火箭发动机，由航天飞机四段固推加长而来。",
        },
        {
          name: "RS-25",
          count: 4,
          cycle: "staged-combustion",
          cycleZh: "富燃分级燃烧循环",
          propellant: "hydrolox",
          thrust: 1859,
          thrustSeaLevel: 1859,
          thrustVacuum: 2279,
          ispSeaLevel: 366,
          ispVacuum: 452.3,
          note: "航天飞机退役后的库存机，一次性使用。",
        },
      ],
    },
    {
      name: "ICPS",
      nameZh: "临时低温推进级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 110,
      burnTime: 1125,
      dryMass: 3490,
      propellantMass: 26800,
      diameter: 5,
      height: 13.7,
      note: "由 Delta IV 的 DCSS 改来，负责地月转移注入；Block 1B 将换成四发的 EUS。",
      engines: [
        {
          name: "RL10B-2",
          count: 1,
          cycle: "expander",
          cycleZh: "膨胀循环",
          propellant: "hydrolox",
          thrust: 110,
          thrustVacuum: 110,
          ispVacuum: 462,
          note: "可展开碳复合喷管延伸段，扩张比 285。",
        },
      ],
    },
  ],

  payloadLEO: 95000,
  payloadTLI: 27000,
  reusable: false,
  humanRated: true,

  description:
    "用航天飞机的零件、工厂与供应商重新组装出来的登月火箭：性能真实，成本也真实——每次发射约 22 亿美元。",

  history: `SLS 的起点不是一份技术方案，而是一部法律。

2010 年，奥巴马政府取消了小布什时期的**星座计划**（Constellation，含战神一号/五号火箭）。国会的反应是在 **2010 年 NASA 授权法案**中直接立法规定 NASA 必须建造一款重型运载火箭，并写明它应当**「尽最大可能利用航天飞机与星座计划的现有合同、投资、劳动力、工业基础与能力」**。

这一句话决定了 SLS 的全部技术形态：

- 直径 8.4 m——航天飞机外贮箱的直径，米丘德工厂的工装现成；
- 芯级用 RS-25——航天飞机主发动机，库存 16 台；
- 助推器用固推——航天飞机固推加长一段；
- 上面级用 DCSS——Delta IV 的现成产品。

**几乎没有一个部件是为 SLS 全新设计的，但整枚火箭仍然花了十二年、超过 230 亿美元研制费才首飞。**原因在于「用旧零件」并不等于「不用重新设计」：外贮箱要变成有动力的级，固推要重新认证五段构型，全箭要重新做载荷与动力学分析。

2022 年 11 月 16 日，**Artemis I** 无人绕月任务成功。首飞前经历了多次推迟：氢泄漏、飓风、传感器故障。首飞结果非常干净——**入轨精度、猎户座的表现与再入热防护都优于预期。**

问题从来不是它能不能飞，而是它多久飞一次、花多少钱。NASA 监察长办公室（OIG）给出的数字是**每次发射约 41 亿美元**（含猎户座与地面系统），其中火箭本身约 22 亿。年产能一枚。

Artemis II（载人绕月）计划于 2026 年执行，Artemis III（载人登月）随后。`,

  designPhilosophy: `SLS 的设计哲学必须分成两层来看，否则会得出矛盾的结论。

**技术层：它是一枚正确的火箭。**

给定「把 27 t 送上地月转移轨道、一次发射完成、必须载人」这个需求，SLS 的构型选择几乎全是教科书答案：

- **芯级用氢氧**：TLI 这样的高能任务，比冲比推力重要。芯级 RS-25 的真空比冲 452 s，是任何煤油方案都达不到的。
- **起飞推力靠固推**：氢氧发动机推重比低、海平面效率差，用固体助推器补起飞推力是最经济的做法（阿丽亚娜 5、H-IIA、长征五号都是这个思路）。
- **一次发射完成**：不需要在轨加注、不需要交会对接，任务链最短，风险节点最少。

**工程管理层：它是一枚被约束定义的火箭。**

法律要求复用航天飞机的供应链，这带来一个奇特的结果——**成本结构与性能无关**。SLS 的年度预算约 25 亿美元，无论飞不飞、飞几次都要花掉，因为它维持的是一个分布在多个州的产业体系。于是：

$$\\text{单次成本} = \\frac{\\text{固定成本}}{N},\\quad N \\leq 1\\ \\text{每年}$$

**这和航天飞机的成本病是同一种病**：固定成本高、飞行频率低，两者互相锁死。区别是航天飞机至少一年飞四五次，SLS 一年最多一次。

**最尖锐的对比：** RS-25 是为了「复用」才做到 452 s 比冲和 207 bar 室压的，代价是极高的单价与维护成本。SLS 把它一次性使用——**付了复用的价钱，没有拿到复用的收益。**同理，五段固推放弃了回收，却仍然使用为可回收设计的分段结构（连带 O 形圈的传承）。

**结论是：SLS 在火箭工程上没有做错的选择，它的问题全部来自那些不是它自己能做的选择。**`,

  tradeoffs: [
    {
      question: "既然有猎鹰重型和星舰，为什么还需要 SLS？",
      answer: `2022 年 Artemis I 成功后，这个问题变得更尖锐了，因为答案的一半正在失效。

**仍然成立的那一半：高能轨道运力。**

| | LEO | 地月转移轨道（TLI） | 上面级比冲 |
|---|---|---|---|
| SLS Block 1 | 95 t | **27 t** | 462 s（氢氧） |
| 猎鹰重型（全一次性） | 63.8 t | ≈ 16–18 t | 348 s（煤油） |
| 星舰（不加注） | ≈ 100–150 t | **≈ 0** | 380 s（甲烷） |

注意最后一行：星舰在不进行**在轨加注**的情况下，几乎无法把有意义的载荷送出地球轨道——它的飞船本身太重（干重约 100 t），入轨后剩余推进剂不足以完成 TLI。星舰的登月方案需要在近地轨道进行**十次以上的推进剂转移**，而在轨低温推进剂转移至今没有被完整演示过。

**SLS 的真正价值是「一次发射、无需在轨操作」**——对载人任务来说，减少任务链上的关键节点本身就是安全性。

**正在失效的那一半：成本与频率。**

每次 41 亿美元、一年一发，意味着 Artemis 计划的节奏被火箭而不是任务需求决定。而 NASA 自己的登月方案（Artemis III）里，**着陆器用的是星舰**——也就是说，同一次任务同时依赖 SLS 和星舰。SLS 负责把四名航天员送到月球轨道，星舰负责把其中两人送到月面。

这个组合在技术上说得通（各自做自己最擅长的一段），在预算上很难长期维持。**如果星舰把在轨加注跑通，SLS 的技术理由就只剩下「载人段更成熟」这一条了。**`,
    },
    {
      question: "为什么要把可复用的 RS-25 一次性用掉？",
      answer: `因为把它改成一次性比重新设计一台一次性发动机更便宜——**在只考虑研制费、不考虑单价的会计口径下。**

RS-25 的技术指标是为复用而设的：额定 55 次点火寿命、可在飞行中大范围节流、全部关键件可拆检。这些能力在 SLS 上完全用不到（它只需要工作 480 s，然后落进大西洋），但它们已经包含在设计里，去掉反而要重新认证。

于是路径是：

1. **Artemis I–IV** 用航天飞机剩下的 16 台库存机，每次四台。这批机很多已经飞过若干次——**Artemis I 上有一台参加过 STS-25 次任务。**
2. **之后** 换成 RS-25E（Expendable，一次性版）。它去掉了为复用而设的可拆检特征，改用增材制造与简化工艺，目标是把单价降低约 30%。实际报价仍在**每台 1 亿美元**量级。

对比一下：一台 BE-4 或猛禽的成本大约是它的 1–2%。

**这背后是一个关于「什么叫便宜」的根本分歧。**

RS-25 昂贵的原因不是材料，而是**产量太低 + 工艺过于复杂**。它的每一台都近乎手工制造，检验环节极多。要让它便宜，唯一的办法是提高产量——而 SLS 一年最多飞一次，一年只需要四台。

$$\\text{单价} \\propto \\frac{1}{\\text{年产量}^{\\alpha}}$$

**学习曲线需要产量才能生效。**梅林、猛禽、BE-4 的低成本首先来自年产上百台，其次才来自设计。SLS 的架构从根本上排除了这条路。`,
    },
    {
      question: "8.4 m 的直径是怎么定下来的？",
      answer: `不是气动算出来的，也不是运力算出来的——**是 1970 年代米丘德工厂的焊接工装和驳船的宽度定下来的。**

链条是这样的：

1. 1970 年代，航天飞机外贮箱定为 8.4 m 直径，因为这个尺寸能在新奥尔良的米丘德装配厂生产，并用驳船经密西西比河与墨西哥湾运到卡角。
2. 2010 年的授权法案要求 SLS 复用现有工业基础，米丘德与那套工装是其中最大的一块资产。
3. 于是 SLS 芯级直接采用 8.4 m。

**这个选择本身并不坏**，8.4 m 对 95 t 级火箭是合理的。但它带来两个连锁约束：

- **上面级只能是 5 m 级。**芯级 8.4 m 之上必须有一个锥形收缩段（LVSA）过渡到 5 m 的 ICPS，这个收缩段本身是几吨死重，而且限制了整流罩的包络。Block 1B 的 EUS 会做到 8.4 m 等径，但那要重建移动发射平台。
- **整流罩包络受限。**Block 1 的载荷包络是 5 m × 19.1 m。作为对比，星舰规划的是 9 m × 17 m，长征五号是 5.2 m × 12.3 m。**对于望远镜、空间站舱段这类「体积比质量更受限」的载荷，包络往往比运力更关键。**

这里有一条普遍规律值得记下来：**运载火箭的直径几乎从不由空气动力学决定，而由「怎么造、怎么运」决定。** 猎鹰 9 号的 3.66 m 是美国公路桥涵的上限，N1 的 17 m 迫使它在发射场现场焊接，星舰的 9 m 迫使 SpaceX 把工厂建在发射场旁边。**制造与运输是火箭设计里最被低估的约束条件。**`,
    },
  ],

  contemporaries: `**航天飞机**（1981–2011）是它的直接父体：同样的直径、同样的发动机、同样的固推、同样的工厂、同样的成本病。区别在于载荷回到了顶端，逃逸塔重新装得下——**SLS 在构型上纠正了航天飞机最致命的错误，却继承了它的经济结构。**

**土星五号**（1967）在 TLI 运力上仍然领先（48.6 t vs 27 t），研制只用了六年。两者的差别不是技术，是当时的国家意志与预算规模。

**星舰**（研制中）代表完全相反的路线：不追求单次任务的最优，而追求发射频率极高、单次成本极低，用在轨加注把「一次发射」拆成「多次发射」。**如果在轨低温加注被跑通，SLS 这类「一次性重型火箭」的存在理由会大幅缩小；如果跑不通，SLS 依然是唯一能一次发射送人绕月的运载器。**

**长征五号**（2016）在构型逻辑上与 SLS 高度相似（氢氧芯级 + 助推器 + 氢氧上面级），只是尺度小一半。它同样证明了这条路线在技术上是稳的——中国的载人登月方案用的是不同的火箭（长征十号），但沿用了相同的推进剂搭配思路。`,

  milestones: [
    { date: "2010-10-11", title: "2010 年 NASA 授权法案签署", note: "立法要求建造重型火箭并复用航天飞机与星座计划的工业基础。" },
    { date: "2021-03-18", title: "芯级绿色运行热试车", note: "在斯坦尼斯试车台四台 RS-25 全时长点火 499 s。" },
    { date: "2022-11-16", title: "Artemis I 首飞成功", note: "猎户座无人绕月飞行 25 天，返回舱以 11 km/s 再入。" },
    { date: "2026", title: "Artemis II（计划）", note: "四人乘组绕月飞行，SLS 首次载人。" },
  ],

  launches: {
    total: 1,
    success: 1,
    failure: 0,
    asOf: "2022-12-11",
    notable: [
      { date: "2022-11-16", name: "Artemis I", note: "首飞即执行完整绕月任务，各系统表现优于预期。" },
    ],
  },

  variants: [
    { name: "Block 1", note: "ICPS 上面级，TLI 27 t，用于 Artemis I–III。" },
    { name: "Block 1B", note: "换装四发 RL10 的探索上面级 EUS，TLI 42 t，需新建移动发射平台。" },
    { name: "Block 2", note: "规划中的先进固推构型，TLI 46 t；尚未立项。" },
    { name: "Cargo 构型", note: "以整流罩取代猎户座，包络 8.4 m × 19.1 m，用于大型望远镜或行星探测器。" },
  ],
  relatedRockets: ["space-shuttle", "saturn-v", "starship", "falcon-heavy"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 Block 1 载人构型复原：98.1 m 总高、8.4 m 芯级、两枚 54 m 五段固推、ICPS 与猎户座飞船。",
  }),

  sources: [
    {
      title: "SLS Reference Guide",
      url: "https://www.nasa.gov/reference/sls/",
      publisher: "NASA",
      confidence: "high",
      note: "尺寸、推力、运力与各 Block 构型的一手来源。",
    },
    {
      title: "NASA's Management of the Space Launch System Program",
      url: "https://oig.nasa.gov/",
      publisher: "NASA Office of Inspector General",
      confidence: "high",
      note: "单次发射成本与研制费用的官方审计口径（约 41 亿美元含猎户座与地面系统）。",
    },
    {
      title: "NASA Authorization Act of 2010",
      url: "https://www.congress.gov/bill/111th-congress/senate-bill/3729",
      publisher: "U.S. Congress",
      confidence: "high",
      note: "第 302 条明确要求复用航天飞机与星座计划的合同与工业基础。",
    },
  ],

  tags: ["重型运载", "载人", "登月", "氢氧芯级", "固体助推"],
};
