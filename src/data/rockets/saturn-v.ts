import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "f1-cluster",
    name: "F-1 发动机（5 台）",
    nameEn: "F-1 engine cluster",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3.7,
    radius: 1.86,
    nozzles: { count: 5, bellRadius: 1.86, bellHeight: 3.7, ringRadius: 3.6 },
    description:
      "五台 F-1 呈四角+中心布局，单台海平面推力 6,770 kN，至今仍是飞行过的最大推力单室液体发动机。四台外侧机可摆动做推力矢量控制，中心机固定并在 T+135 s 提前关机以把过载压在 4 g 以内。",
  })
  .at(3.7, {
    id: "s1c-body",
    name: "S-IC 一级箭体",
    nameEn: "S-IC first stage",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "roll-pattern", color: "#15171c" },
    height: 38.4,
    radius: 5.05,
    description:
      "直径 10.1 m 的煤油/液氧一级，装 2,077 t 推进剂，工作 168 s 把飞行器送到 68 km、2.76 km/s。RP-1 贮箱在下、液氧箱在上，两箱之间用桁架式级间段隔开，液氧通过 5 根穿越煤油箱的输送管下行。",
  })
  .at(3.7, {
    id: "s1c-fins",
    name: "S-IC 尾翼",
    group: "stage-1",
    shape: "fins",
    finish: "painted-black",
    height: 6.5,
    radius: 3.2,
    cluster: { count: 4, offset: 5.05 },
    description:
      "四片固定尾翼提供气动稳定裕度，使控制系统在跨声速段不必全靠摆动发动机维持姿态。翼面同时兼作发射台支撑与外侧发动机的气动整流。",
  })
  .gap(38.4)
  .add({
    id: "s2-body",
    name: "S-II 二级",
    nameEn: "S-II second stage",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "roll-pattern", color: "#15171c" },
    height: 24.9,
    radius: 5.05,
    description:
      "5 台 J-2 的液氢/液氧二级，是当年最难的一级：为了减重采用共底贮箱（液氢与液氧仅隔一层蜂窝夹层），干质比达到惊人的 1:20 以上。工作约 360 s，把速度推到 6.8 km/s。",
  })
  .add({
    id: "s2-interstage",
    name: "S-II/S-IVB 级间段",
    group: "stage-2",
    shape: "frustum",
    finish: "painted-white",
    height: 3.5,
    radius: 5.05,
    radiusTop: 3.3,
    description:
      "从 10.1 m 收缩到 6.6 m 的锥形级间段。S-II 与 S-IVB 之间采用「热分离」：上面级发动机先点火，再由爆炸索切断连接，避免推进剂在失重下沉底不良。",
  })
  .add({
    id: "s4b-body",
    name: "S-IVB 三级",
    nameEn: "S-IVB third stage",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "bands", bands: [{ from: 0.0, to: 0.12, color: "#15171c" }, { from: 0.52, to: 0.6, color: "#15171c" }] },
    height: 17.8,
    radius: 3.3,
    description:
      "单台 J-2 的氢氧三级，也是唯一需要在轨二次启动的一级：第一次点火完成入轨，滑行 2–3 圈后再次点火执行地月转移（TLI）。箭体外侧可见的辅助推进系统（APS）负责滑行段沉底与姿态控制。",
  })
  .add({
    id: "iu",
    name: "仪器舱 IU",
    nameEn: "Instrument Unit",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-black",
    height: 0.91,
    radius: 3.3,
    description:
      "整枚火箭的「大脑」：IBM 研制的环形舱段，内含 ST-124 惯性平台与 LVDC 数字计算机，独立于飞船完成从起飞到 TLI 的全程制导。把制导系统集中在一个可更换的环上，是 Saturn 系列可维护性设计的关键。",
  })
  .add({
    id: "sla",
    name: "登月舱适配器 SLA",
    group: "payload",
    shape: "frustum",
    finish: "painted-white",
    height: 7.0,
    radius: 3.3,
    radiusTop: 1.96,
    description:
      "锥形适配段内部装载登月舱（LM）。TLI 后四块面板向外抛开，指令/服务舱掉头与登月舱对接并将其抽出——这一「转位对接」动作正是月球轨道交会方案的直接产物。",
  })
  .add({
    id: "sm",
    name: "服务舱 SM",
    group: "payload",
    shape: "cylinder",
    finish: "bare-metal",
    height: 5.8,
    radius: 1.96,
    description:
      "装有 SPS 主发动机（推力 91 kN，自燃推进剂）、燃料电池与消耗品，负责月球轨道进入与返回点火。返回大气层前抛弃。",
  })
  .add({
    id: "cm",
    name: "指令舱 CM",
    group: "payload",
    shape: "capsule",
    finish: "bare-metal",
    height: 3.5,
    radius: 1.96,
    description: "三名航天员的加压舱与再入舱，是全箭 3,000 t 中唯一返回地球的 5.5 t。",
  })
  .add({
    id: "les",
    name: "逃逸塔 LES",
    group: "payload",
    shape: "tower",
    finish: "painted-accent",
    height: 5.1,
    radius: 0.45,
    description:
      "固体逃逸发动机推力 667 kN，可在发射台或上升段把指令舱拽离故障火箭。正常飞行时于 S-II 点火后约 30 s 抛弃——此时逃逸已可由服务舱完成。",
  });

export const saturnV: Rocket = {
  slug: "saturn-v",
  name: "Saturn V",
  nameZh: "土星五号",
  country: "United States",
  countryZh: "美国",
  agency: ["NASA", "Boeing", "North American Aviation", "Douglas Aircraft"],
  family: "saturn",
  status: "retired",
  firstFlight: "1967-11-09",
  lastFlight: "1973-05-14",

  height: 110.6,
  diameter: 10.1,
  span: 10.1,
  mass: 2970000,
  stageCount: 3,

  stages: [
    {
      name: "S-IC",
      nameZh: "一级 S-IC",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustSeaLevel: 33850,
      thrustVacuum: 38850,
      burnTime: 168,
      dryMass: 131000,
      propellantMass: 2077000,
      diameter: 10.06,
      height: 42.1,
      note: "关机时高度约 68 km、速度约 2.76 km/s，占全程速度增量的 1/3 不到，却烧掉了全箭 70% 的推进剂质量——这就是重力损失与气动阻力的代价。",
      engines: [
        {
          name: "F-1",
          count: 5,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 6770,
          thrustSeaLevel: 6770,
          thrustVacuum: 7770,
          ispSeaLevel: 263,
          ispVacuum: 304,
          note: "迄今飞行过的推力最大的单燃烧室液体火箭发动机。",
        },
      ],
    },
    {
      name: "S-II",
      nameZh: "二级 S-II",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 5141,
      burnTime: 360,
      dryMass: 36000,
      propellantMass: 456100,
      diameter: 10.06,
      height: 24.87,
      note: "共底贮箱把干质比压到 1:12 以上，是当时结构效率最高的大型级。",
      engines: [
        {
          name: "J-2",
          count: 5,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 1028,
          thrustVacuum: 1028,
          ispVacuum: 421,
          note: "美国第一款实用氢氧发动机，可在真空中重启。",
        },
      ],
    },
    {
      name: "S-IVB",
      nameZh: "三级 S-IVB",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 1033,
      burnTime: 500,
      dryMass: 13500,
      propellantMass: 106600,
      diameter: 6.6,
      height: 17.86,
      note: "两次点火：约 165 s 完成入轨，滑行 2–3 圈后再点火约 340 s 执行地月转移。",
      engines: [
        {
          name: "J-2",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hydrolox",
          thrust: 1033,
          thrustVacuum: 1033,
          ispVacuum: 421,
        },
      ],
    },
  ],

  payloadLEO: 140000,
  payloadTLI: 48600,
  reusable: false,
  humanRated: true,

  description:
    "为「十年内登月」这一个目标定制的三级重型火箭，至今仍是成功入轨的最大运载火箭，也是唯一把人送出近地轨道的型号。",

  history: `1961 年 5 月肯尼迪把登月写进国家目标时，美国还没有任何一级火箭的推力超过 700 kN。冯·布劳恩团队在马歇尔中心用四年时间把 F-1 从纸面推到台架，同时 NASA 内部就登月方案吵了两年：直接起飞（Direct Ascent）需要一枚推力 Saturn V 三倍的 Nova；地球轨道交会（EOR）要两次发射对接。1962 年 7 月，NASA 最终选择了 John Houbolt 力推的**月球轨道交会（LOR）**——登月舱只在月球轨道之间往返，不必把返回地球的隔热层和燃料带上月面。

这个方案决定性地压缩了火箭规模：TLI 需求从 68 t 降到 45 t 量级，一枚 Saturn V 一次发射即可完成任务。整枚火箭的分级、直径、贮箱容积，都是这个 48.6 t 地月转移能力反推出来的。

1967 年 11 月 9 日，Apollo 4 以「全箭首飞即全系统试飞」（All-up testing）的激进方式一次成功。1968 年 12 月 Apollo 8 载人绕月，1969 年 7 月 Apollo 11 登月。13 次发射中仅 Apollo 6 出现二级发动机提前关机与三级重启失败的严重故障，无一次任务因运载器损失乘员。1973 年 5 月最后一枚（改为两级构型）把 Skylab 空间站送入轨道后，生产线已在 1970 年关闭。`,

  designPhilosophy: `Saturn V 的设计逻辑可以压缩成一句话：**它不是一枚通用运载火箭，而是一件为单一任务尺寸定制的工具。**

任务方案（LOR）先确定，需要送往地月转移的质量随之确定（48.6 t），再用理想火箭方程反推每一级的质量比与推进剂选择——而不是先造火箭再找任务。这与后来 Space Shuttle、SLS 试图「一箭多用」的路线形成鲜明对照，也解释了为什么它性能极致却完全不经济：每一枚都是手工制造的一次性产品，没有为复用、为高发射频率、为降低边际成本做过任何设计。

第二条主线是**推进剂的分层选择**：一级用煤油换密度，上面级用液氢换比冲。第三条是**用系统冗余替代逐级验证**：全箭首飞（all-up testing）省下了两年时间，代价是把风险压在地面试验与冗余设计上。`,

  tradeoffs: [
    {
      question: "为什么一级烧煤油，二三级却烧液氢？",
      answer: `这是密度与比冲的经典权衡。液氢的真空比冲比煤油高约 100 s（421 s vs 304 s），但密度只有煤油的 1/12（71 kg/m³ vs 810 kg/m³）。

一级要在稠密大气里对抗重力损失和气动阻力，需要的是**大推力和小体积**：如果 S-IC 改烧液氢，同样的推进剂质量需要的贮箱体积会膨胀到无法接受，箭体直径、结构质量与气动阻力都会失控，而它换来的比冲优势又被低空喷管效率吃掉一部分。

上面级在真空中工作，速度增量占比大，此时比冲每提高 1% 都直接换成载荷。S-II 与 S-IVB 因此接受液氢带来的巨大贮箱、20 K 深冷绝热和氢脆问题，换取 421 s 的真空比冲。

顺带一提，S-II 为了把液氢的体积代价压回去，用了**共底贮箱**：液氢箱底就是液氧箱顶，中间只有一层蜂窝绝热夹层。这一个设计省下约 3.6 t 结构质量和 3 m 箭体长度，也是 S-II 研制最难产的部分。`,
    },
    {
      question: "为什么是三级，而不是两级或四级？",
      answer: `级数越多，理论上质量比越优，但每增加一级都要付出级间段、分离机构、额外发动机和一次分离失败风险的代价。真正决定 Saturn V 用三级的是**任务剖面而不是最优化计算**：

- 一级（S-IC）：出大气层，纯粹解决"抬起来"的问题；
- 二级（S-II）：完成入轨速度的大头；
- 三级（S-IVB）：先补足入轨的最后 1 km/s，**然后必须在轨道上停机滑行 2–3 圈再重新点火**执行地月转移。

关键在第三条。地月转移点火的时机由月球位置和发射窗口决定，不可能与入轨连续进行。这就要求有一级具备**在轨滑行后二次启动**的能力——需要沉底推进系统、长时间低温推进剂管理和可重复点火的发动机。把这个昂贵的能力隔离在最小的一级上（S-IVB 只有 119 t），比让庞大的 S-II 具备重启能力便宜得多。

四级方案在纸面上能再省几吨，但多一次分离就多一个单点故障，对载人任务不划算。`,
    },
    {
      question: "F-1 为什么用燃气发生器循环而不是更高效的分级燃烧？",
      answer: `同期苏联的 NK-15 已经在做富氧分级燃烧，比冲更高。F-1 却选择了最"浪费"的燃气发生器循环——涡轮排气直接从喷管裙部排掉，损失约 3% 的推进剂流量。

原因是**规模优先于效率**。F-1 的目标是单室 6,770 kN，比任何在研发动机大一个数量级。分级燃烧要求预燃室、涡轮和主燃烧室在高压下耦合工作，任何一处不稳定都会传导到全系统；在 1960 年代的材料与计算条件下，把这套耦合放大到 F-1 的尺度风险极高。燃气发生器循环则把涡轮回路与主燃烧室解耦，让工程师可以分别调试。

即便如此，F-1 仍在**燃烧不稳定**上卡了将近四年：研制期间用了 2,000 多次点火试验和上百种喷注器隔板方案，最后靠铜制喷注器面板上的径向/周向隔板把高频振荡压下去，还专门用小炸药包在燃烧室里人为制造扰动来验证它能在 0.1 s 内自行恢复。

代价是 F-1 的海平面比冲只有 263 s。但对一级来说这是可接受的——一级的比冲对总载荷的敏感度远低于上面级。`,
    },
    {
      question: "「全箭首飞」（all-up testing）是激进还是理性？",
      answer: `传统的冯·布劳恩式流程是逐级验证：先飞一级带哑弹上面级，成功后再飞两级，最后飞全箭。Saturn V 只有 13 枚的采购量和 1969 年的最后期限，装不下这套流程。

1963 年 NASA 载人航天办公室主任 George Mueller 强行推行 all-up：**首飞就是完整三级 + 真实飞船，所有系统同时上**。理由是每一枚 Saturn V 的成本与制造周期太高，把它当作「一级试验件」在经济上不可接受；与其用飞行试验逐步排错，不如把资源压到地面试验台和单机可靠性上。

赌注在 Apollo 4 上得到回报：一次成功。但 Apollo 6（第二次无人试飞）暴露了两个几乎致命的问题——**POGO 纵向耦合振荡**（结构与推进系统的自激振荡）和 J-2 发动机氦点火管路在真空下的疲劳断裂，两台二级发动机提前关机、三级无法重启。如果那是一次载人任务，结果难以预料。

事后看，all-up 的可行性依赖于一个前提：地面试验的覆盖度足够高。Saturn V 有完整的全尺寸结构试验件、动力试验件和 S-IC/S-II 全推力台架试车。今天的 Starship 走的是相反路线——**用便宜的箭体做高频飞行试验**，因为它的单枚成本假设完全不同。`,
    },
    {
      question: "为什么 Saturn V 停产后再也没有复现？",
      answer: `常见说法是"图纸丢了"，这不准确——图纸和大量文档都在。真正不可复现的是**制造它的工业生态与知识**：F-1 的钎焊喷管由数千根镍合金管手工焊接而成，依赖特定工人的手艺和当时的工装；供应链上数百家承包商早已转型；测试台架被拆除或改建。

更根本的原因是**需求消失**。Saturn V 的边际成本按今天币值约 12–15 亿美元/枚，且完全一次性。当阿波罗的政治目标达成后，没有任何任务需要一年发射几枚 140 t 级火箭。NASA 在 1970 年砍掉后续订单时，本质上是承认了这枚火箭的设计前提——不计成本、单一任务、短周期——已不复存在。

这也是本站反复强调的观点：**运载火箭的"先进"从来不是绝对的，而是相对于它要服务的任务模型。** Saturn V 在它的任务模型下近乎完美，在今天的任务模型下则完全不适用。`,
    },
  ],

  contemporaries: `与 Saturn V 直接对标的是苏联的 **N1**：起飞推力更大（30 台 NK-15，45,400 kN），但因为缺少 F-1 这样的大推力单机而被迫用 30 台并联，控制系统（KORD）无法在故障时可靠处理管路耦合，四次发射全部失败。这组对比常被用来说明一个工程原则：**发动机数量的增加会使一级的可靠性问题从"单机可靠性"变成"系统耦合问题"**——而 SpaceX 在半个世纪后用 33 台发动机的 Super Heavy 重新挑战了这个结论，靠的是完全不同的传感、控制和迭代能力。

在载荷能力上，直到今天仍无任何**已成功入轨**的火箭超过 Saturn V 的 140 t LEO；Starship 的目标值超过它，但截至目前尚未完成入轨级任务。`,

  milestones: [
    { date: "1961-05-25", title: "肯尼迪宣布登月目标", note: "此时 F-1 尚未完成整机试车。" },
    { date: "1962-07-11", title: "NASA 确定月球轨道交会方案", note: "直接决定了火箭的规模上限。" },
    { date: "1967-11-09", title: "Apollo 4 — 首飞", note: "全箭首飞（all-up）一次成功。" },
    { date: "1968-04-04", title: "Apollo 6 — POGO 振荡", note: "二级两台发动机提前关机，三级未能重启。" },
    { date: "1968-12-21", title: "Apollo 8 — 首次载人绕月", note: "人类首次离开地球引力主导区。" },
    { date: "1969-07-16", title: "Apollo 11 — 首次载人登月", note: "" },
    { date: "1973-05-14", title: "Skylab 发射 — 末次飞行", note: "改为两级构型，把 77 t 空间站送入轨道。" },
  ],

  launches: {
    total: 13,
    success: 12,
    partial: 1,
    failure: 0,
    asOf: "1973-05-14",
    notable: [
      { date: "1967-11-09", name: "Apollo 4", note: "首飞，验证三级与再入。" },
      { date: "1969-07-16", name: "Apollo 11", note: "首次载人登月。" },
      { date: "1970-04-11", name: "Apollo 13", note: "运载段正常；二级中心机因 POGO 提前关机，由其余发动机延长工作补偿。" },
      { date: "1973-05-14", name: "Skylab 1", note: "唯一一次两级构型发射。" },
    ],
  },

  variants: [
    { name: "Saturn V (Apollo 构型)", note: "标准三级，SA-501 至 SA-512。" },
    { name: "Saturn INT-21", note: "两级构型，用于发射 Skylab。" },
    { name: "Saturn V-B / MLV 系列", note: "多种增强方案（加装固体助推、换用更大 F-1A），均未实施。" },
  ],
  relatedRockets: ["starship", "delta-iv-heavy", "new-glenn"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles", "structures-and-materials"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 NASA SP-4206 与 Saturn V Flight Manual 公开尺寸复原的示意模型：各级长度、直径、F-1 布局与真实值一致，表面细节（管路、蒙皮桁条、滚转标识）为示意。",
  }),

  sources: [
    {
      title: "Saturn V Flight Manual (SA-503)",
      url: "https://ntrs.nasa.gov/citations/19750063889",
      publisher: "NASA / MSFC",
      confidence: "high",
      note: "各级尺寸、推力、飞行时序的一手来源。",
    },
    {
      title: "Stages to Saturn: A Technological History of the Apollo/Saturn Launch Vehicles (SP-4206)",
      url: "https://www.nasa.gov/history/history-publications-and-resources/nasa-history-series/",
      publisher: "NASA History Series",
      confidence: "high",
      note: "F-1 燃烧不稳定、S-II 共底贮箱、all-up testing 决策的权威叙述。",
    },
    {
      title: "Apollo by the Numbers: A Statistical Reference (SP-2000-4029)",
      url: "https://ntrs.nasa.gov/citations/20000033408",
      publisher: "NASA",
      confidence: "high",
      note: "发射记录与任务统计。",
    },
    {
      title: "Saturn V — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Saturn_V",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "起飞质量、LEO 载荷等汇总值口径参考；不同来源在 118–140 t 之间存在差异（取决于是否含 S-IVB 剩余推进剂）。",
    },
  ],

  tags: ["登月", "重型运载", "液氢上面级", "载人", "历史里程碑"],
};
