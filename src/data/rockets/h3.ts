import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

/** 按 H3-24L 构型（两台 LE-9 + 四枚 SRB-3 + 长整流罩）建模。 */
const g = rocketGeometry()
  .at(0, {
    id: "le9",
    name: "LE-9 发动机（2 台）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 4.5,
    radius: 2.635,
    nozzles: { count: 2, bellRadius: 1.15, bellHeight: 3.4, ringRadius: 1.3 },
    description:
      "**世界上推力最大的膨胀排放循环发动机：真空推力 1,471 kN。**这是一次重要的技术跨越——膨胀循环因为受传热面积限制，长期被认为只能做到 200 kN 级、只适合上面级。LE-9 把它推到了一级。代价是研制困难：2020 年试车中发现涡轮叶片与燃烧室内壁出现裂纹，整个 H3 项目因此推迟了两年。",
  })
  .at(4.5, {
    id: "core-body",
    name: "第一级",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 32.5,
    radius: 2.635,
    description:
      "5.27 m 直径，比 H-IIA 的 4 m 粗了不少。加粗的目的是**提高结构效率并简化制造**：同样的推进剂量，粗而短的箱体比细而长的焊缝更少、结构更轻。这一级的贮箱由三菱重工用自动化产线制造，目标是把生产周期压缩一半。",
  })
  .at(0.5, {
    id: "srb3-nozzle",
    name: "SRB-3 喷管（最多 4 枚）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2,
    radius: 1.1,
    cluster: { count: 4, offset: 3.9, phase: 45 },
    nozzles: { count: 1, bellRadius: 0.95, bellHeight: 1.8 },
    description:
      "**SRB-3 相对 H-IIA 的 SRB-A3 做了一个反直觉的简化：取消了喷管摆动机构。**姿态控制全部交给一级的两台 LE-9。固定喷管让固体助推器少了液压伺服、少了柔性接头、少了控制接口——单枚成本下降约 10%。",
  })
  .at(2.5, {
    id: "srb3-body",
    name: "SRB-3 固体助推器",
    group: "booster",
    shape: "cylinder",
    finish: "solid-booster",
    height: 12,
    radius: 1.1,
    cluster: { count: 4, offset: 3.9, phase: 45 },
    description:
      "推力 2,158 kN，可装 0、2 或 4 枚。**H3 的型号编号直接写明构型**：H3-24L = 2 台 LE-9 + 4 枚 SRB-3 + 长整流罩。它还规划了 H3-30 构型——**零助推器，纯靠三台 LE-9 起飞**，这是日本压低发射成本最激进的一步。",
  })
  .at(14.5, {
    id: "srb3-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "solid-booster",
    height: 2.5,
    radius: 1.1,
    cluster: { count: 4, offset: 3.9, phase: 45 },
    description: "分离机构同样做了简化，取消了 H-IIA 上曾经出过问题的部分火工品设计。",
  })
  .at(37, {
    id: "interstage",
    name: "级间段",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 3,
    radius: 2.635,
    description: "级间段内藏第二级的 LE-5B-3 喷管。",
  })
  .at(40, {
    id: "s2-body",
    name: "第二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 8,
    radius: 2.635,
    description:
      "一台 LE-5B-3，仍然是膨胀排放循环——这是 H-IIA 上零故障的那一款的改进型，延长了工作时间并提高了重启能力。**H3 在这里的策略很明确：一级冒险（全新的 LE-9），二级求稳（沿用已验证的 LE-5B）。**",
  })
  .at(48, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 15,
    radius: 2.7,
    description: "5.2 m 直径，短罩（S）与长罩（L）两档。长罩构型下总高 63 m。",
  });

export const h3: Rocket = {
  slug: "h3",
  name: "H3",
  nameZh: "H3",
  country: "Japan",
  countryZh: "日本",
  agency: ["JAXA", "三菱重工业"],
  family: "h-ii",
  status: "active",
  firstFlight: "2023-03-07",

  height: 63,
  diameter: 5.27,
  span: 10.4,
  mass: 574000,
  stageCount: 2,

  stages: [
    {
      name: "First Stage + 4 × SRB-3",
      nameZh: "第一级 + 四枚固体助推器",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧 · HTPB 复合固体推进剂",
      thrustSeaLevel: 10967,
      burnTime: 105,
      dryMass: 26000,
      propellantMass: 225000,
      diameter: 5.27,
      height: 37,
      note: "SRB-3 工作 105 s；一级两台 LE-9 从地面点火烧到约 T+300 s。",
      engines: [
        {
          name: "LE-9",
          count: 2,
          cycle: "expander",
          cycleZh: "膨胀排放循环",
          propellant: "hydrolox",
          thrust: 1471,
          thrustSeaLevel: 1226,
          thrustVacuum: 1471,
          ispSeaLevel: 372,
          ispVacuum: 425,
          note: "世界推力最大的膨胀排放循环发动机；研制中因涡轮与燃烧室裂纹推迟两年。",
        },
        {
          name: "SRB-3",
          count: 4,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 2158,
          thrustSeaLevel: 2158,
          ispVacuum: 283.6,
          note: "取消了喷管摆动机构，姿控全部交给一级发动机。",
        },
      ],
    },
    {
      name: "Second Stage",
      nameZh: "第二级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 137,
      burnTime: 740,
      dryMass: 3000,
      propellantMass: 24000,
      diameter: 5.27,
      height: 11,
      note: "沿用 H-IIA 的 LE-5B 改进型，延长工作时间并强化重启能力。",
      engines: [
        {
          name: "LE-5B-3",
          count: 1,
          cycle: "expander",
          cycleZh: "膨胀排放循环",
          propellant: "hydrolox",
          thrust: 137,
          thrustVacuum: 137,
          ispVacuum: 448,
          note: "H-IIA 上零飞行故障的 LE-5B 的改进型。",
        },
      ],
    },
  ],

  payloadLEO: 17000,
  payloadGTO: 6500,
  payloadSSO: 4000,
  reusable: false,
  humanRated: false,

  description:
    "日本把 H-IIA 的单价砍一半的尝试：一台被认为「做不大」的循环被做大了，代价是首飞失败与两年延期。",

  history: `H3 的立项目标只有一句话：**把 H-IIA 的发射价格砍掉一半**，从约 1 亿美元降到 5,000 万美元级。

理由是市场。H-IIA 的可靠性世界一流（50 次 49 成功），但它从未在国际商业发射市场上拿到过有意义的份额——太贵。2010 年代猎鹰 9 号出现后，价格差距进一步拉大。日本面临的选择是：要么接受自己的火箭只服务本国政府任务，要么重做一款能竞争的。

**降本的手段集中在三处：**

1. **新发动机 LE-9。**LE-7A 用的富燃分级燃烧循环需要预燃室、高温燃气管路、复杂的启动时序，零件多、检验环节多。膨胀排放循环没有预燃室，零件数大幅减少，制造成本更低。
2. **简化助推器。**SRB-3 取消了喷管摆动机构，单枚成本降低约 10%。
3. **改变生产方式。**引入汽车工业的流水线思路：标准化工装、自动化焊接、批量采购通用件（部分电子件直接使用汽车级零件）。

**难点全部集中在 LE-9 上。**

膨胀循环的功率来自燃烧室壁传给氢的热量，而传热面积随尺寸的平方增长、推力随体积增长——**推力越大，可用的传热越不够。**这就是为什么此前所有膨胀循环发动机都是上面级级别（RL10 是 110 kN，Vinci 是 180 kN）。LE-9 要做到 1,471 kN，是十倍的跨越。

2020 年 5 月的试车中发现了两个问题：**燃烧室内壁出现裂纹，涡轮叶片出现疲劳裂纹。**根因是燃烧室内的高频压力振荡（燃烧不稳定的一种表现）。修复方案是重新设计喷注器与燃烧室冷却通道，整个项目推迟了两年。

**2023 年 3 月 7 日首飞失败。**一级工作正常，但第二级的 LE-5B-3 未能点火——电气系统在级间分离后出现异常，点火指令未被执行。载荷 ALOS-3 对地观测卫星损失。

**2024 年 2 月 17 日第二次飞行成功。**此后 H3 进入稳定服役，并在 2025 年接过了 H-IIA 的全部任务。`,

  designPhilosophy: `H3 的设计哲学是：**在不牺牲可靠性的前提下，把成本从设计中挤出来。**

日本面临的约束与欧洲相似——年发射量少（5–8 次），无法靠产量或复用摊薄。所以降本必须来自「造得更便宜」，而不是「用得更多次」。

**核心赌注是 LE-9 的循环选择。**

比较两条路：

| | LE-7A（富燃分级燃烧） | LE-9（膨胀排放） |
|---|---|---|
| 预燃室 | 有 | **无** |
| 高温燃气管路 | 有（约 800 K 富燃燃气） | **无** |
| 启动时序 | 复杂，需点火器 | 简单，靠推进剂相变自启动 |
| 涡轮工质温度 | 高 | **低（几百 K）** |
| 零件数 | 多 | **少约 20%** |
| 真空比冲 | 440 s | 425 s |
| 单台成本 | 基准 | **约 −40%** |

**注意比冲那一行：LE-9 比 LE-7A 低了 15 s。**这是有意接受的损失——膨胀排放要排掉一小部分氢，且循环压力做不到分级燃烧那么高（LE-9 室压约 100 bar，LE-7A 是 120 bar）。

**日本用 3.4% 的比冲损失，换取 40% 的成本下降。**这个交换只有在「成本是主要矛盾」时才成立，而这正是 H3 的立项前提。

**第二个赌注是「取消摆动喷管」。**

SRB-3 的喷管固定不动，姿态控制全部由一级的两台 LE-9 承担。这要求：

- LE-9 的摆动权限足够大（因为它要同时对抗四枚固推的推力偏差）；
- 助推器的推力一致性足够好（否则会产生难以配平的力矩）。

**这是把可靠性风险从「机构」转移到「控制」的典型做法**——液压伺服机构是活动部件，是常见的失效源；控制律则是软件，可以反复验证。

**第三条主线是构型灵活性。**H3 规划了从 H3-30（三台 LE-9、零助推器）到 H3-24L（两台 LE-9、四枚助推器）的多种组合。**H3-30 是最有意思的一个：完全不用固体助推器，靠三台氢氧机起飞。**这在世界上没有先例（氢氧机推重比低，通常抬不起自己），它的可行性建立在 LE-9 足够大的推力上。如果它成立，日本就可以在低运力任务上进一步压低成本。`,

  tradeoffs: [
    {
      question: "膨胀循环做不大，LE-9 是怎么绕过去的？",
      answer: `靠「膨胀排放」这个变体，把涡轮从燃烧室的压力约束里解放出来。

**先看纯膨胀循环（closed expander，如 RL10、Vinci）的死结：**

液氢流过燃烧室与喷管的冷却夹套吸热气化，推动涡轮，然后**全部进入燃烧室燃烧**。因为氢最终要进燃烧室，涡轮出口的压力必须高于室压。这意味着涡轮的可用压比很小，要产生足够功率就必须加大流量或提高温升——而温升来自传热。

传热量正比于**面积**：

$$Q \\propto A_{\\text{壁}} \\propto D^2$$

推力正比于喉部面积，也大致正比于 $D^2$，看起来匹配。但问题在于**燃烧室的特征长度**：推力增大时，室压和流量增加，壁面热流密度上升有限，而需要的涡轮功率上升很快。实际结果是纯膨胀循环的推力天花板在 200–300 kN。

**膨胀排放循环（open / bleed expander）改了一处：**驱动涡轮的那股氢，推完涡轮后**直接排到舷外**，不进燃烧室。

这一改的后果：

- 涡轮出口压力可以低到接近环境压力，**可用压比从几倍变成几十倍**；
- 同样的功率只需要少得多的流量与温升；
- 于是传热面积不再是瓶颈，推力上限被打开。

代价是**排掉的那部分氢不产生推力**。LE-9 排掉的约占燃料流量的百分之几，反映在比冲上是十几秒的损失。

**日本为什么能做成？**因为它在这条路线上积累了四十年：LE-5（1986）、LE-5A、LE-5B 全是膨胀排放循环，涡轮匹配、传热设计、启动时序的经验是连续的。**LE-9 不是从零开始，是把一条走了四十年的路推到极限。**

**它仍然很难。**2020 年的裂纹问题说明，即使循环本身简单，1,471 kN 的燃烧室依然会遇到燃烧不稳定与热疲劳——**这些问题与循环无关，是「大推力」本身带来的。**`,
    },
    {
      question: "首飞失败之后，H3 改了什么？",
      answer: `改的东西很少，这本身就是结论。

2023 年 3 月 7 日的失败发生在第二级点火：一级正常工作并分离，但 LE-5B-3 没有点火。调查锁定在**第二级的电气系统**——具体是级间分离时产生的电气瞬态，触发了配电系统的保护动作，切断了发动机控制器的供电。

值得注意的是三点：

**1. 失败与 LE-9 无关。**整个项目最大的技术风险（新循环的大推力发动机）在首飞中工作完全正常。失败出在一个相对传统的子系统上。

**2. 根因无法唯一确定。**JAXA 的调查报告列出了三种可能的失效路径，无法通过遥测数据区分。**于是修复方案是把三种可能全部堵上**——这是航天故障处理的标准做法：当无法确定是哪一个原因时，就假设每一个都可能。

**3. 改动集中在电气隔离与冗余上**，没有触及推进系统或结构。第二次飞行（2024 年 2 月）就成功了，间隔不到一年。

**这次失败暴露的更深层问题是「继承的假象」。**LE-5B-3 与它的电气系统很大程度上继承自 H-IIA——那款零故障的发动机。但 H3 的一级、级间分离方式、供电架构都是新的，**旧部件放进新环境，接口处的行为不再是「已验证」的。**

这是航天项目里反复出现的模式：

- 阿丽亚娜 5 首飞失败（1996），原因是直接复用了阿丽亚娜 4 的惯性导航软件，而新火箭的飞行剖面超出了原软件的数值范围；
- 航天飞机的固推设计源自导弹传统，但在新的载荷环境下暴露了接缝问题。

**「继承成熟部件」降低的是部件本身的风险，不降低集成的风险——而后者往往更大。**`,
    },
  ],

  contemporaries: `**阿丽亚娜 6**（2024）与它几乎是同一道题的两份答卷：同样在 2014 年前后立项、同样为把老火箭的价格砍半、同样选择一次性而非复用、同样靠制造工艺降本、同样推迟了三四年、同样在 2023–2024 年首飞。**两者的构型也极像：氢氧芯级 + 固体助推器 + 氢氧上面级。**

**火神半人马座**（美国，2024）是第三份答卷，区别是它换了推进剂（甲烷）并规划了发动机舱回收。

**猎鹰 9 号** 是这三者共同的对手，也是共同的立项理由。

**H-IIA** 是它要超越的对象：可靠性 98%，价格 1 亿美元。**H3 要证明的是「可靠性和低成本可以兼得」——如果它做到了，日本能留在自主发射的国家名单上；如果做不到，日本航天将退回纯政府任务的角色。**`,

  milestones: [
    { date: "2014", title: "立项", note: "目标是把 H-IIA 的发射价格砍半。" },
    { date: "2020-05", title: "LE-9 试车发现裂纹", note: "燃烧室内壁与涡轮叶片出现裂纹，项目推迟两年。" },
    { date: "2023-03-07", title: "首飞失败", note: "第二级电气异常导致 LE-5B-3 未点火，ALOS-3 卫星损失。" },
    { date: "2024-02-17", title: "第二次飞行成功", note: "改进电气隔离与冗余后复飞。" },
    { date: "2024-07-01", title: "首次执行业务任务", note: "发射 ALOS-4 对地观测卫星。" },
  ],

  launches: {
    total: 6,
    success: 5,
    failure: 1,
    asOf: "2025-06-30",
    notable: [
      { date: "2023-03-07", name: "TF1", note: "首飞失败，二级未点火。" },
      { date: "2024-02-17", name: "TF2", note: "复飞成功，验证全部飞行程序。" },
      { date: "2024-07-01", name: "ALOS-4", note: "首次业务发射。" },
    ],
  },

  variants: [
    { name: "H3-22S / 22L", note: "两台 LE-9 + 两枚 SRB-3，短罩或长罩。" },
    { name: "H3-24L", note: "两台 LE-9 + 四枚 SRB-3 + 长罩，运力最大的构型。" },
    { name: "H3-30S", note: "三台 LE-9、无固体助推器；世界上没有先例的全氢氧起飞构型，用于低成本任务。" },
  ],
  relatedRockets: ["h-iia", "ariane-6", "vulcan-centaur", "long-march-5"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 H3-24L 构型复原：63 m 总高、5.27 m 芯级直径、四枚 SRB-3 固体助推器与长整流罩。",
  }),

  sources: [
    {
      title: "H3 Launch Vehicle — JAXA",
      url: "https://global.jaxa.jp/projects/rockets/h3/",
      publisher: "JAXA",
      confidence: "high",
      note: "构型、各级参数、运力与降本目标。",
    },
    {
      title: "H3 Test Flight 1 Failure Investigation Report",
      url: "https://www.jaxa.jp/",
      publisher: "JAXA",
      confidence: "high",
      note: "首飞失败的三种可能失效路径与对应改进措施。",
    },
    {
      title: "LE-9 Engine Development",
      url: "https://www.mhi.com/products/space/",
      publisher: "Mitsubishi Heavy Industries",
      confidence: "medium",
      note: "膨胀排放循环的推力放大方案与研制中的裂纹问题。",
    },
  ],

  tags: ["中重型运载", "膨胀排放循环", "全氢氧", "固体助推", "低成本一次性"],
};
