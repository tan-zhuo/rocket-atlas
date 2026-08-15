import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "core-engine",
    name: "RS-68A 发动机（芯级）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 4,
    radius: 2.55,
    nozzles: { count: 1, bellRadius: 1.3, bellHeight: 3.4 },
    description:
      "推力最大的氢氧发动机：海平面 3,137 kN。为了降低成本，它刻意放弃了 SSME 那种极致设计——喷管是**烧蚀冷却**而非再生冷却，零件数只有 SSME 的 1/5，室压也低得多（97 bar vs 207 bar）。代价是真空比冲只有 412 s，比 SSME 的 452 s 低了 40 s。**这是一次明确的「用性能换成本」的交换。**",
  })
  .at(4, {
    id: "core-body",
    name: "芯级 CBC",
    nameEn: "Common Booster Core",
    group: "core",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 36.8,
    radius: 2.55,
    description:
      "5.1 m 直径的液氢/液氧「通用助推芯级」。Delta IV 全系列（Medium、Medium+、Heavy）都用同一款 CBC，区别只是捆绑几个、加不加固体助推器——这是 1990 年代 EELV 计划「模块化降成本」思路的产物。芯级在两侧助推器工作期间**节流到 57%**，以保存推进剂供后段独自使用。",
  })
  .at(0, {
    id: "booster-engines",
    name: "RS-68A 发动机（助推 CBC，2 台）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 4,
    radius: 2.55,
    cluster: { count: 2, offset: 5.1, phase: 90 },
    nozzles: { count: 1, bellRadius: 1.3, bellHeight: 3.4 },
    description: "两侧助推 CBC 各一台 RS-68A，全推力工作至 T+242 s 后分离。",
  })
  .at(4, {
    id: "booster-body",
    name: "助推 CBC（2 枚）",
    group: "booster",
    shape: "cylinder",
    finish: "scorched",
    height: 36.8,
    radius: 2.55,
    cluster: { count: 2, offset: 5.1, phase: 90 },
    description:
      "与芯级完全相同的箭体，只是顶部换成锥形头锥。Delta IV Heavy 起飞时那团著名的橙色火球，来自点火前排放的氢气被点燃——氢气比空气轻，会沿箭体外壁向上窜，把喷涂在贮箱外的橙色泡沫绝热层烧焦。**这是设计上接受的现象，不是故障。**",
  })
  .at(40.8, {
    id: "booster-nose",
    name: "助推 CBC 头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 4.2,
    radius: 2.55,
    cluster: { count: 2, offset: 5.1, phase: 90 },
    description: "助推芯级顶部的锥形整流头，改善并联构型的气动特性。",
  })
  .at(40.8, {
    id: "interstage",
    name: "级间段",
    group: "stage-2",
    shape: "cylinder",
    finish: "insulation-foam",
    height: 5,
    radius: 2.55,
    description: "芯级与上面级之间的级间段，内含 DCSS 的发动机与推进剂沉底系统。",
  })
  .at(45.8, {
    id: "dcss",
    name: "DCSS 上面级",
    nameEn: "Delta Cryogenic Second Stage",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 6.4,
    radius: 2.55,
    description:
      "装一台 RL10B-2——真空比冲 462 s，是**史上比冲最高的量产化学火箭发动机**之一。它采用膨胀循环，并带一个可在真空中展开的碳复合喷管延伸段（发射时收起以缩短级长，点火前展开以获得 285 的扩张比）。DCSS 可多次重启，最长在轨工作时间以小时计，因此能执行直接 GEO 注入与深空转移。",
  })
  .at(52.2, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 19.8,
    radius: 2.55,
    description:
      "5 m 直径、最长 19.8 m 的复合材料整流罩——Delta IV Heavy 的载荷包络长度在退役时仍是美国最大的之一，这也是它长期垄断大型侦察卫星发射的原因：某些光学侦察卫星的镜筒长度只有它装得下。",
  });

export const deltaIVHeavy: Rocket = {
  slug: "delta-iv-heavy",
  name: "Delta IV Heavy",
  nameZh: "德尔塔四号重型",
  country: "United States",
  countryZh: "美国",
  agency: ["United Launch Alliance (ULA)", "Boeing"],
  family: "delta",
  status: "retired",
  firstFlight: "2004-12-21",
  lastFlight: "2024-04-09",

  height: 72,
  diameter: 5.1,
  span: 15.3,
  mass: 733000,
  stageCount: 2,

  stages: [
    {
      name: "3 × Common Booster Core",
      nameZh: "三枚通用芯级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustSeaLevel: 9411,
      thrustVacuum: 10500,
      burnTime: 242,
      dryMass: 26760,
      propellantMass: 200000,
      diameter: 5.1,
      height: 40.8,
      note: "两侧助推 CBC 全推力工作，芯级同时节流到 57% 以延长自身工作时间至约 328 s。",
      engines: [
        {
          name: "RS-68A",
          count: 3,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 3137,
          thrustSeaLevel: 3137,
          thrustVacuum: 3560,
          ispSeaLevel: 362,
          ispVacuum: 412,
          note: "推力最大的氢氧发动机，喷管为烧蚀冷却。",
        },
      ],
    },
    {
      name: "DCSS (5m)",
      nameZh: "上面级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 110,
      burnTime: 1125,
      dryMass: 3490,
      propellantMass: 27200,
      diameter: 5,
      height: 13.7,
      note: "可多次重启，支持直接 GEO 注入与深空转移。",
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
          note: "带可展开碳复合喷管延伸段，扩张比 285，比冲为化学发动机之最。",
        },
      ],
    },
  ],

  payloadLEO: 28370,
  payloadGTO: 14220,
  reusable: false,
  humanRated: false,

  description:
    "美国二十年间唯一的重型运载火箭，全氢氧动力、三芯并联，专为美国国家安全太空发射任务而生，也因此从未需要在价格上与人竞争。",

  history: `Delta IV 诞生于 1990 年代的 **EELV（改进型一次性运载火箭）计划**：美国空军希望用两个互相竞争的商业化火箭家族（波音的 Delta IV 与洛克希德·马丁的 Atlas V）取代旧的 Titan IV，把发射成本降下来。

结果与预期相反。商业市场并没有出现空军预期的增长，两家公司的产能都远超需求，价格不降反升。2006 年，两家干脆把发射业务合并成合资公司 **ULA**——竞争消失了，价格进一步固化。Delta IV Medium 因为成本过高在 2019 年退役，只有无可替代的 Heavy 构型继续服役到 2024 年。

它执行的都是最不容有失的任务：NRO 的大型光学与信号情报卫星、**Parker Solar Probe**（2018，人类最接近太阳的探测器）、**Orion EFT-1**（2014，猎户座飞船首次无人试飞）。

2024 年 4 月 9 日，Delta IV Heavy 执行 NROL-70 后退役，Delta 这个可追溯到 1960 年 Thor-Delta 的火箭家族就此终结——**一个持续 64 年、发射超过 380 次的谱系画上句号。**`,

  designPhilosophy: `Delta IV Heavy 的设计逻辑是**「全氢氧 + 模块化并联」——一个在理论上优雅、在经济上失败的组合。**

全氢氧的理由是比冲：RS-68A 的真空比冲 412 s，比煤油机高出约 70 s。如果只看质量比，这是最优的化学推进方案。模块化的理由是产量：一款 CBC 芯级用在 Medium、Medium+、Heavy 三种构型上，理论上能通过产量摊薄单价。

两个前提在现实中都没有成立：

- **氢的密度太低**。为了装下同样质量的推进剂，Delta IV 的箭体体积远大于煤油火箭，结构质量、气动阻力、绝热成本全部上升。更要命的是氢氧发动机在**海平面**效率低（RS-68A 海平面比冲仅 362 s），而一级恰恰要在稠密大气里工作——把最贵的推进剂用在最不划算的地方。
- **产量从未达到**。EELV 预期的商业市场没有出现，Delta IV 全系列 20 年只飞了 45 次（Heavy 仅 16 次）。摊销固定成本后，Heavy 的单次发射价格高达 3.5–4.4 亿美元。

**这枚火箭最终成了一个纯粹的技术样本：性能上无懈可击，经济上无法生存。** 它的退役不是因为技术落后，而是因为一个更便宜的替代品（Falcon Heavy，1.5 亿美元）和一个更便宜的继任者（Vulcan）出现了。`,

  tradeoffs: [
    {
      question: "为什么一级用氢氧是个昂贵的选择？",
      answer: `氢氧的真空比冲比煤油高约 25%，看起来一级用氢氧应该更好。但一级的工况有三个特点，恰好把氢的优势削掉大半：

1. **海平面喷管效率低**。一级发动机的喷管扩张比必须迁就海平面大气压，无法做大。RS-68A 的海平面比冲只有 362 s，相对煤油机的 300 s，优势从 25% 缩到 20%。
2. **密度决定结构质量**。液氢密度 71 kg/m³，煤油 810 kg/m³——差 11 倍。装同样质量的燃料，氢箱体积是煤油箱的 11 倍。Delta IV 的一级直径因此必须做到 5.1 m，箭体表面积、绝热层、结构质量全部上去了。结构质量每增加 1 kg，就抵消掉一部分比冲带来的收益。
3. **一级的 Δv 占比小但推力需求大**。一级要克服重力损失，需要的是**大推力**；比冲的价值随飞行高度上升而增加，恰恰在一级的工作段最低。

结果是：一级用氢氧的净收益远小于纸面计算。这就是为什么绝大多数火箭选择「煤油/固体一级 + 氢氧上面级」的组合——Ariane 5、长征五号、H-IIA、SLS 全都如此，唯独 Delta IV 全程用氢。

反过来说，氢氧在**上面级**上是无可争议的最优解：真空工作、可以用大扩张比喷管、Δv 占比高。DCSS 的 RL10B-2 比冲 462 s，至今仍是记录保持者。`,
    },
    {
      question: "三个相同的芯级并联，为什么不比一个大芯级好？",
      answer: `Falcon Heavy 与 Delta IV Heavy 用的是同一个思路：不研制新的大芯级，把三个现成的芯级捆在一起。这在纸面上是「免费」的运力提升。

实际上并不免费：

- **结构不是简单相加**。三个芯级之间需要传力结构，中间芯级要承受两侧传来的推力，其推力结构必须为此加强——而这个加强在单芯构型下是多余的死重。
- **气动干扰复杂**。三体并联的绕流场远比单体复杂，跨声速段的抖振、局部激波、底部热流都需要额外的风洞与 CFD 工作。
- **分离事件多且危险**。两枚助推芯级要同时、对称地分离，且不能碰到中间芯级。Falcon Heavy 首飞前马斯克公开说过「它有可能在发射台上炸掉」，这个担忧主要来自并联的结构与分离复杂度。
- **节流带来的损失**。芯级必须在助推段节流（Delta IV Heavy 节流到 57%），以便在助推器分离后还有推进剂可用。节流工况下发动机效率低于额定点。

真正的替代方案——研制一个 8–9 m 直径的单芯级——需要新工厂、新运输方式、新发射台，成本以十亿美元计。**并联是一个「用运营复杂度换研制费用」的交换**，对发射次数少的型号是划算的，对高频型号则未必。`,
    },
  ],

  contemporaries: `直接对手是 **Falcon Heavy**（2018 首飞，LEO 63.8 t，一次性构型单价约 1.5 亿美元）。两者的运力差距接近一倍，价格差距超过两倍，这个对比几乎终结了关于「一次性重型火箭是否还有存在必要」的讨论。

另一个参照是 **Atlas V 551**（LEO 18.85 t）：同为 ULA 产品，用俄制 RD-180 煤油发动机做一级，可靠性极高（89 次发射仅 1 次部分失败）。2014 年克里米亚危机后，美国国会禁止军方采购使用俄制发动机的火箭，这直接推动了 Vulcan 的研制，也间接决定了 Delta IV Heavy 的退役时间表——**地缘政治在这里比技术和成本都更有决定性。**`,

  milestones: [
    { date: "2004-12-21", title: "首飞（部分失败）", note: "推进剂传感器气蚀导致三台发动机提前关机，载荷未达目标轨道。" },
    { date: "2014-12-05", title: "发射猎户座 EFT-1", note: "猎户座飞船首次无人绕地试飞。" },
    { date: "2018-08-12", title: "发射 Parker Solar Probe", note: "加装 Star 48BV 三级，创下人造物体最快速度纪录。" },
    { date: "2024-04-09", title: "NROL-70 末次飞行", note: "Delta 家族 64 年历史结束。" },
  ],

  launches: {
    total: 16,
    success: 15,
    partial: 1,
    failure: 0,
    asOf: "2024-04-09",
    notable: [
      { date: "2004-12-21", name: "Demo Flight", note: "唯一一次未达标任务。" },
      { date: "2018-08-12", name: "Parker Solar Probe", note: "需要极大的 Δv 才能「减速」落向太阳。" },
      { date: "2024-04-09", name: "NROL-70", note: "谢幕之作。" },
    ],
  },

  variants: [
    { name: "Delta IV Medium / Medium+", note: "单芯构型，可加 2 或 4 枚固体助推器，2019 年退役。" },
    { name: "Delta IV Heavy", note: "三芯并联构型。" },
  ],
  relatedRockets: ["vulcan-centaur", "ariane-5", "saturn-v", "falcon-9"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 ULA 用户手册的 72 m 总高、5.1 m CBC 直径与 19.8 m 长整流罩构型复原。",
  }),

  sources: [
    {
      title: "Delta IV Launch Services User's Guide",
      url: "https://www.ulalaunch.com/docs/default-source/rockets/delta-iv-user-s-guide.pdf",
      publisher: "United Launch Alliance",
      confidence: "high",
      note: "尺寸、质量、运力与整流罩包络的一手来源。",
    },
    {
      title: "RS-68A Engine",
      url: "https://www.rocket.com/",
      publisher: "Aerojet Rocketdyne",
      confidence: "high",
      note: "发动机推力与比冲。",
    },
    {
      title: "Delta IV Heavy — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Delta_IV_Heavy",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录与单价估算；单价随任务与年份差异很大。",
    },
  ],

  tags: ["重型运载", "全氢氧", "三芯并联", "国家安全发射", "已退役"],
};
