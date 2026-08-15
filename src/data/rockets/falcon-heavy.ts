import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "core-octaweb",
    name: "芯级 Merlin 1D（9 台）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 3.1,
    radius: 1.85,
    nozzles: { count: 9, bellRadius: 0.42, bellHeight: 1.55, ringRadius: 1.28 },
    description:
      "芯级的九台发动机在助推段**节流到约 70%**，等两侧助推器分离后再回到满推力。这不是为了省油，而是为了让芯级在助推器分离时还剩下足够的推进剂——27 台机同时满推会在 T+150 s 就把芯级抽空。",
  })
  .at(3.1, {
    id: "core-body",
    name: "芯级箭体",
    nameEn: "Center core",
    group: "core",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "text", text: "SPACEX", color: "#2b2f38" },
    height: 37.9,
    radius: 1.85,
    description:
      "外形与猎鹰 9 号一级几乎一样，内部完全不同：**芯级要承受两侧助推器传来的全部推力**，箭体上下两处捆绑点附近的结构必须重做，贮箱壁板加厚，还要增加把 8,000 kN 侧向载荷传进主结构的接头。这是「三个一样的芯级捆一起」这句话最大的谎言——中间那个不一样。",
  })
  .at(0, {
    id: "booster-octaweb",
    name: "助推器 Merlin 1D（各 9 台）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 3.1,
    radius: 1.85,
    cluster: { count: 2, offset: 4.27, phase: 90 },
    nozzles: { count: 9, bellRadius: 0.42, bellHeight: 1.55, ringRadius: 1.28 },
    description:
      "两侧助推器各九台，起飞瞬间 27 台 Merlin 同时点火，海平面总推力 22,819 kN——**这是土星五号之后推力第二大的实际飞行火箭。**点火不是同时的：从中心向外分批，间隔毫秒级，以免发射台承受瞬时冲击。",
  })
  .at(3.1, {
    id: "booster-body",
    name: "助推器箭体（2 枚）",
    group: "booster",
    shape: "cylinder",
    finish: "painted-white",
    height: 37.9,
    radius: 1.85,
    cluster: { count: 2, offset: 4.27, phase: 90 },
    description:
      "由猎鹰 9 号一级改装：顶部换成锥形头锥、增加捆绑接头、贮箱增压逻辑改写。两侧助推器在 T+150 s 左右同时分离，随后各自返场，垂直降落在卡角的两个着陆区——**首飞时两枚助推器几乎同步着陆的画面，是这枚火箭最出名的时刻。**",
  })
  .at(37, {
    id: "booster-gridfins",
    name: "助推器栅格舵",
    group: "booster",
    shape: "gridfins",
    finish: "bare-metal",
    height: 1.6,
    radius: 0.85,
    cluster: { count: 2, offset: 4.27, phase: 90 },
    description: "钛合金栅格舵，返场再入时提供控制力矩。",
  })
  .at(41, {
    id: "booster-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "ogive",
    finish: "painted-white",
    height: 4.5,
    radius: 1.85,
    cluster: { count: 2, offset: 4.27, phase: 90 },
    description: "取代猎鹰 9 号的级间段，改善并联构型的跨声速气动。",
  })
  .at(41, {
    id: "interstage",
    name: "级间段",
    group: "stage-2",
    shape: "cylinder",
    finish: "carbon",
    height: 6.7,
    radius: 1.85,
    description: "碳纤维级间段，内含二级真空喷管与气动分离机构。芯级在助推器分离后继续工作约 3 分钟才分离。",
  })
  .at(47.7,
    {
      id: "s2-body",
      name: "二级",
      group: "stage-2",
      shape: "cylinder",
      finish: "painted-white",
      height: 9.2,
      radius: 1.85,
      description:
        "与猎鹰 9 号完全相同的二级，一台 MVac。**这是猎鹰重型最省的地方，也是它性能的天花板**：二级只有 111 t 推进剂，对于需要高能轨道的任务（GTO 之外），运力衰减很快。要把 63.8 t 送到 LEO 需要三级全部一次性使用。",
    })
  .at(56.9, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 13.1,
    radius: 2.6,
    description:
      "5.2 m 直径、13.1 m 长的复合材料整流罩，**这是猎鹰重型最实际的限制**：它能把 63.8 t 送上 LEO，却装不下与之匹配体积的载荷。大型空间望远镜、加压舱段这类「体积大于质量」的载荷仍然装不进去——运力和包络是两回事。",
  });

export const falconHeavy: Rocket = {
  slug: "falcon-heavy",
  name: "Falcon Heavy",
  nameZh: "猎鹰重型",
  country: "United States",
  countryZh: "美国",
  agency: ["SpaceX"],
  family: "falcon",
  status: "active",
  firstFlight: "2018-02-06",

  height: 70,
  diameter: 3.66,
  span: 12.2,
  mass: 1420788,
  stageCount: 2,

  stages: [
    {
      name: "3 × Falcon 9 first stage",
      nameZh: "三枚一级并联",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 过冷液氧",
      thrustSeaLevel: 22819,
      thrustVacuum: 24681,
      burnTime: 154,
      dryMass: 75000,
      propellantMass: 1210000,
      diameter: 3.66,
      height: 44.6,
      reusable: true,
      note: "27 台 Merlin 1D；两侧助推器 T+154 s 分离并返场，芯级继续工作至约 T+190 s。",
      engines: [
        {
          name: "Merlin 1D",
          count: 27,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 845,
          thrustSeaLevel: 845,
          thrustVacuum: 914,
          ispSeaLevel: 282,
          ispVacuum: 311,
          note: "与猎鹰 9 号同款；芯级在助推段节流到约 70%。",
        },
      ],
    },
    {
      name: "Falcon 9 second stage",
      nameZh: "二级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustVacuum: 981,
      burnTime: 397,
      dryMass: 4000,
      propellantMass: 111500,
      diameter: 3.66,
      height: 12.6,
      note: "与猎鹰 9 号完全共用，可重启，负责 GTO 与逃逸轨道注入。",
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
          note: "铌合金辐射冷却喷管延伸段，扩张比 165。",
        },
      ],
    },
  ],

  payloadLEO: 63800,
  payloadGTO: 26700,
  reusable: true,
  reuseNote: "两侧助推器可返场垂直着陆并复用；芯级理论上可回收，实际任务多为一次性以换取运力。",
  humanRated: false,

  description:
    "把三枚现成的一级捆在一起，做出了土星五号之后推力第二大的火箭——也顺带证明了「捆绑」这件事远没有听起来那么便宜。",

  history: `猎鹰重型在 2011 年宣布，原计划 2013 年首飞，实际拖到 **2018 年 2 月 6 日**。五年的延期本身就是它最重要的技术结论。

马斯克在首飞前的一次公开发言里说得很直白：「我们一开始以为把三枚一级捆起来很简单，结果发现要重新设计芯级……难度比造一枚全新火箭高得多。」这不是自谦。并联构型带来的载荷、振动、气动与分离问题，全部是芯级级别的新问题。

首飞载荷是马斯克自己的**特斯拉 Roadster**，因为没有客户愿意把真载荷放上一枚从未飞过的火箭。假人「Starman」坐在驾驶座上，仪表盘上写着《银河系漫游指南》里的 **DON'T PANIC**。两侧助推器同步返场着陆，芯级因着陆点火用的 TEA-TEB 引燃剂耗尽而坠海。

此后猎鹰重型的发射非常稀疏——**首飞后的头四年只飞了三次**。原因不是它不好用，而是它太大了：猎鹰 9 号的运力（可回收构型 17.5 t）已经覆盖了绝大多数商业任务，需要更大运力的客户本来就很少。

2022 年后节奏加快，客户集中在三类：美国太空军的高能轨道任务（USSF-44/67/52）、超大型 GEO 通信卫星（ViaSat-3、Jupiter-3）、以及 NASA 的深空探测器（**Psyche**、**欧罗巴快船**）。这些都是猎鹰 9 号够不着、而 SLS 太贵或排不上队的任务。

**它真正的历史位置可能是：在星舰成熟之前，为「需要重型但付不起 SLS」的任务提供了唯一选项。**`,

  designPhilosophy: `猎鹰重型的设计逻辑是**「用已有产能换运力，而不是用新研制换运力」**——这个思路在纸面上极具吸引力，在工程上代价很高。

纸面上的账：猎鹰 9 号一级已经在批量生产，产线成熟、成本已知、可靠性已由几十次飞行证明。把三枚捆起来，理论上运力接近三倍，而研制投入只是「加个连接结构」。

工程上的账完全不是这样：

1. **芯级必须重新设计。** 两侧助推器在起飞时各产生约 7,600 kN 推力，这些力要通过上下两组捆绑接头传进芯级。芯级的贮箱壁必须加厚、接头附近要加强框，最终**芯级与猎鹰 9 号一级的通用件比例远低于外界想象**。
2. **气动环境是全新的。** 三体并联的跨声速绕流、助推器头锥与芯级之间的激波干扰、底部回流区的热环境——这些都无法从单体火箭的数据外推，只能重新做风洞与 CFD。
3. **分离是最危险的动作。** 两枚 40 m 长的助推器要在超声速下同时、对称地推开，且不能碰到中间还在工作的芯级。任何不同步都是灾难。
4. **27 台发动机的可靠性乘法。** 单台可靠性 0.999 时，27 台全部正常的概率是 0.973。猎鹰重型靠的是「可以带故障飞行」——设计上允许若干台机提前关机仍完成任务，这与 N1 的 30 台机形成了鲜明对照。

**换来的是什么？** 一个非常具体的数字：一次性构型 63.8 t / 1.5 亿美元，对比 Delta IV Heavy 的 28.4 t / 3.5 亿美元。**运力翻倍、价格减半**，这个对比直接终结了美国传统重型一次性火箭。

而它自己也已经被下一代逻辑超越：星舰不再捆绑，而是直接把芯级做到 9 m。**「捆绑」是在造不出大芯级时的过渡方案，一旦大芯级造得出来，捆绑就没有理由存在。**`,

  tradeoffs: [
    {
      question: "27 台发动机会不会重蹈 N1 的覆辙？",
      answer: `N1 用了 30 台 NK-15，四次发射四次失败，是「发动机太多」这个论断最常被引用的证据。猎鹰重型用 27 台，至今全部成功。差别不在数量，而在三件具体的事：

**1. 能不能在飞行中关掉一台。**
N1 的 KORD 控制系统确实会关机，但它成对关机（关掉对称位置的另一台以保持推力平衡），而且系统本身有严重缺陷——第二次发射时它误判并关掉了几乎全部发动机。猎鹰的每台 Merlin 都能被独立关闭，飞控实时重新分配推力矢量；猎鹰 9 号在 CRS-1 任务中就曾一台机故障关机后仍完成主任务。

**2. 单台机飞过多少次。**
NK-15 是一次性发动机——它的设计不允许试车后再用于飞行，所以**每一台真正上箭的发动机都从未被点燃过**，全靠抽样试车推断整批质量。Merlin 1D 的情况完全相反：每一台出厂前在麦格雷戈试车，装箭后还有一次全箭静态点火，累计飞行台次以千计。

**3. 结构隔离。**
Octaweb 用钢梁把每台机隔在独立舱格里，一台机非包容性解体（涡轮盘飞出）不会打坏邻机。N1 的一级底部是一个开放的环形舱，1969 年 7 月 3 日的第二次发射中，一台机的氧泵解体后碎片打坏了整个底部，火箭掉回发射台把发射工位彻底炸毁。

**结论：多发动机本身不是问题，「不能单独关机 + 没有隔离 + 上箭的机没试过」才是问题。**发动机数量增加时，可靠性是乘法；但如果系统能容忍单台失效，它就变回加法。

$$P_{\\text{任务}} = \\sum_{k=0}^{k_{\\max}} \\binom{n}{k} p^{\\,n-k}(1-p)^k$$

允许 $k_{\\max}$ 台失效时，任务成功率反而随 $n$ 增大——**冗余的价值恰恰来自数量多。**`,
    },
    {
      question: "为什么运力最大的构型反而不能回收？",
      answer: `猎鹰重型有三档构型，运力差得非常远：

| 构型 | LEO 运力 | 说明 |
|---|---|---|
| 全部回收（两助推器返场 + 芯级驳船） | ≈ 30 t | 常规商业任务 |
| 助推器回收、芯级一次性 | ≈ 45–50 t | 最常用 |
| 全部一次性 | 63.8 t | 只在极高能轨道任务上使用 |

差距来自**回收要花掉的 Δv**。返场着陆需要三次点火：分离后的调姿掉头（boostback）、再入减速、着陆。这些燃料本来是用来加速载荷的。

对两侧助推器来说，这笔账相对划算：它们在 T+154 s 分离，此时速度约 2.0 km/h 级别的低超声速段，高度不到 70 km，返场所需 Δv 不算太大。

**芯级完全不同。**它在助推器分离后还要单独工作三分钟，分离时速度接近 3 km/s、高度上百公里。这时候要减速返回，需要的推进剂多得多，运力损失接近三分之一。而需要 60 t 级运力的任务，往往正是最不能接受运力打折的任务——**于是最需要芯级的任务，恰恰是必须扔掉芯级的任务。**

欧罗巴快船（2024）就是这样：为了把 6 t 探测器直接送上前往木星的转移轨道，三枚一级全部一次性使用。

**这揭示了可复用的一个普遍规律：复用的经济性只在「性能有余量」时成立。**当任务把火箭推到能力极限，回收的那部分推进剂就变成了不可承受的成本。星舰试图打破这一点的方式是把余量做得极大——运力过剩到即使全部回收也够用。`,
    },
    {
      question: "既然有猎鹰重型，为什么美国还要花几十亿造 SLS？",
      answer: `这个问题在美国国会被反复问过，答案分技术和政治两半，两半都是真的。

**技术上的差别是「高能轨道」和「体积」。**

| | 猎鹰重型（一次性） | SLS Block 1 |
|---|---|---|
| LEO | 63.8 t | 95 t |
| 月球转移轨道（TLI） | ≈ 16–18 t | 27 t |
| 整流罩包络 | 5.2 × 13.1 m | 5.0 × 19.1 m（Block 1） |
| 上面级 | 煤油，比冲 348 s | 氢氧，比冲 462 s |

关键在 **TLI 那一行**。猎鹰重型的二级用煤油，比冲只有 348 s；SLS 用氢氧的 ICPS，比冲 462 s。**在需要大 Δv 的高能轨道上，上面级的比冲比一级的推力重要得多。**这就是为什么两者的 LEO 运力只差 50%，TLI 运力却差了 60% 以上。

猎鹰重型要把 27 t 送上月球转移轨道，需要在轨加注或者额外一级——两者都还不存在。

**政治上的差别更直接。** SLS 沿用航天飞机的 RS-25 发动机、固体助推器与相关供应链，工作岗位分布在多个关键州。它的立法名称里就写着要「利用现有的航天飞机基础设施与劳动力」。**这不是隐藏的动机，是写在法条里的设计要求。**

代价是每次发射约 22 亿美元（不含研制摊销），每年最多飞一次。

**真正会终结这个争论的不是猎鹰重型，而是星舰**——如果它把 100 t 级运力做到可完全复用，SLS 的技术理由也会消失，只剩下政治理由。`,
    },
  ],

  contemporaries: `**Delta IV Heavy**（2004–2024）是它的直接竞争对手，运力不到一半、价格超过两倍，在猎鹰重型首飞六年后退役。这组对比几乎是「新旧两种成本结构」最干净的实验。

**SLS**（2022 首飞）在 LEO 上比它强 50%，在月球转移轨道上强得更多，但单次成本高一个数量级、年产能只有一枚。两者是互补而非替代：猎鹰重型接走了所有「重型但不必是 SLS」的任务。

**长征五号**（2016，LEO 25 t）代表另一种取舍：不并联同型芯级，而是用一个 5 m 氢氧芯级捆四枚 3.35 m 煤油助推器——**异构捆绑**。研制难度更高（要同时搞定两套推进系统），但避开了芯级承受同型助推器巨大侧向载荷的结构问题。

**星舰**（研制中）代表捆绑思路的终点：不再有助推器，只有一个 9 m 直径的芯级和一个 9 m 的飞船。**猎鹰重型证明了捆绑可行，也证明了它不值得。**`,

  milestones: [
    { date: "2011-04-05", title: "宣布研制", note: "原计划 2013 年首飞。" },
    { date: "2018-02-06", title: "首飞成功", note: "载荷为特斯拉 Roadster；两枚助推器同步返场着陆，芯级坠海。" },
    { date: "2019-06-25", title: "STP-2 任务", note: "首次复用助推器；二级四次点火，验证长时间在轨能力。" },
    { date: "2023-10-13", title: "发射灵神星探测器 Psyche", note: "NASA 首次用猎鹰重型执行行星际科学任务。" },
    { date: "2024-10-14", title: "发射欧罗巴快船", note: "三枚一级全部一次性使用，直接送入木星转移轨道。" },
  ],

  launches: {
    total: 11,
    success: 11,
    failure: 0,
    asOf: "2024-12-31",
    notable: [
      { date: "2018-02-06", name: "Falcon Heavy Demo", note: "Starman 与 Roadster 进入日心轨道。" },
      { date: "2022-11-01", name: "USSF-44", note: "首次执行美国太空军任务，直接注入 GEO。" },
      { date: "2023-04-30", name: "ViaSat-3 Americas", note: "全一次性构型，发射当时最大的商业通信卫星之一。" },
      { date: "2024-10-14", name: "Europa Clipper", note: "6 t 探测器直送木星转移轨道。" },
    ],
  },

  variants: [
    { name: "全回收构型", note: "两助推器返场 + 芯级驳船回收，LEO 约 30 t。" },
    { name: "助推器回收构型", note: "芯级一次性，最常用的商业构型。" },
    { name: "全一次性构型", note: "LEO 63.8 t，仅用于极高能轨道任务。" },
  ],
  relatedRockets: ["falcon-9", "delta-iv-heavy", "sls", "starship", "n1"],
  principles: ["reusability", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 SpaceX 用户手册的 70 m 总高、3.66 m 芯级直径、12.2 m 并联跨距与 5.2 m 整流罩复原。",
  }),

  sources: [
    {
      title: "Falcon User's Guide",
      url: "https://www.spacex.com/media/falcon-users-guide-2021-09.pdf",
      publisher: "SpaceX",
      confidence: "high",
      note: "尺寸、质量、各轨道运力与整流罩包络的一手来源。",
    },
    {
      title: "Falcon Heavy — SpaceX",
      url: "https://www.spacex.com/vehicles/falcon-heavy/",
      publisher: "SpaceX",
      confidence: "high",
      note: "推力、发动机数量与回收构型说明。",
    },
    {
      title: "Falcon Heavy — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Falcon_Heavy",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录与单价估算；单价随构型（是否回收）差异很大。",
    },
  ],

  tags: ["重型运载", "并联构型", "部分可复用", "深空探测"],
};
