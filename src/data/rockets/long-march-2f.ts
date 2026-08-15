import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "booster-body",
    name: "助推器（4 枚）",
    group: "booster",
    shape: "cylinder",
    finish: "painted-white",
    height: 13,
    radius: 1.125,
    cluster: { count: 4, offset: 2.8, phase: 45 },
    description:
      "四枚 2.25 m 直径的液体助推器，每枚一台 YF-20B。使用与芯级相同的四氧化二氮/偏二甲肼——全箭只有一种推进剂组合，地面加注、贮存与应急处置流程因此高度统一。这在载人任务里是有价值的：**流程越单一，人为差错的机会越少。**",
  })
  .at(0, {
    id: "booster-engines",
    name: "助推器发动机（4 台 YF-20B）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2.6,
    radius: 1.125,
    cluster: { count: 4, offset: 2.8, phase: 45 },
    nozzles: { count: 1, bellRadius: 0.72, bellHeight: 2.2 },
    description: "单台海平面推力 740.4 kN，固定安装，不参与姿态控制。",
  })
  .at(13, {
    id: "booster-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "painted-white",
    height: 2.3,
    radius: 1.125,
    cluster: { count: 4, offset: 2.8, phase: 45 },
    description: "助推器在 T+128 s 分离，落区位于内蒙古与陕西境内——这是内陆发射场无法回避的代价，每次发射前都要疏散落区居民。",
  })
  .at(0, {
    id: "core-engines",
    name: "YF-21C 发动机组（4 台 YF-20B）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3,
    radius: 1.675,
    nozzles: { count: 4, bellRadius: 0.62, bellHeight: 2.3, ringRadius: 0.85 },
    description:
      "芯一级的四台 YF-20B 并联成 YF-21C 机组，海平面总推力 2,961.6 kN。四台发动机可**双向摆动**做推力矢量控制——这是长征二号系列从东风五号洲际导弹继承下来的成熟设计，飞行验证时间以数十年计。",
  })
  .at(3, {
    id: "core-stage1",
    name: "芯一级",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    livery: { kind: "text", text: "CZ-2F", color: "#b4231d" },
    height: 21.5,
    radius: 1.675,
    description:
      "3.35 m 直径箭体——这个尺寸由中国铁路隧道的运输限界决定，从 1970 年代的长征二号沿用至今。载人型在此基础上做的最大改动不是结构，而是**增加了 300 多个测量参数的遥测系统与故障检测处理系统（FDS）**：它实时监视十几项关键参数，一旦判定危及乘员，就在毫秒级触发逃逸。",
  })
  .at(24.5, {
    id: "stage2",
    name: "芯二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 14.5,
    radius: 1.675,
    description:
      "一台 YF-22B 主机（真空推力 738 kN，固定）+ 四台 YF-23B 游动发动机（各 47.1 kN，可摆动）。主机不摆、靠小游机控姿的方案结构简单可靠，代价是游机的推进剂消耗与额外的管路复杂度。",
  })
  .at(39, {
    id: "fairing-transition",
    name: "整流罩过渡段",
    group: "payload",
    shape: "frustum",
    finish: "painted-white",
    height: 2,
    radius: 1.675,
    radiusTop: 1.9,
    description: "从 3.35 m 箭体扩张到 3.8 m 整流罩。",
  })
  .at(41, {
    id: "fairing",
    name: "整流罩 / 神舟飞船",
    group: "payload",
    shape: "cylinder",
    finish: "painted-white",
    height: 9,
    radius: 1.9,
    description:
      "3.8 m 直径整流罩，内装神舟飞船的轨道舱、返回舱与推进舱（推进舱在整流罩外）。整流罩上部与逃逸飞行器一起构成逃逸组合体：一旦触发逃逸，**整流罩上段会带着轨道舱和返回舱整体被拽走**，而不是只拉走返回舱。",
  })
  .at(50, {
    id: "fairing-cone",
    name: "整流罩锥段",
    group: "payload",
    shape: "cone",
    finish: "painted-white",
    height: 3,
    radius: 1.9,
    description: "整流罩顶部锥段，与逃逸塔连接。",
  })
  .at(53, {
    id: "les",
    name: "逃逸塔",
    nameEn: "Launch Escape System",
    group: "payload",
    shape: "tower",
    finish: "painted-accent",
    height: 5.34,
    radius: 0.55,
    description:
      "顶部的固体逃逸塔覆盖发射台至约 39 km 高度的逃逸需求，最大过载约 10 g。塔上有四组不同方向的固体发动机：主逃逸发动机负责拉离，分离发动机负责把逃逸飞行器与整流罩分开，还有专门的姿控发动机保证逃逸过程中的姿态。**它在正常飞行中于 T+120 s 抛弃——此后的逃逸由飞船自身的推进舱完成。**",
  });

export const longMarch2F: Rocket = {
  slug: "long-march-2f",
  name: "Long March 2F (CZ-2F)",
  nameZh: "长征二号F",
  country: "China",
  countryZh: "中国",
  agency: ["CALT 中国运载火箭技术研究院", "CASC 中国航天科技集团"],
  family: "long-march-2",
  status: "active",
  firstFlight: "1999-11-19",

  height: 58.34,
  diameter: 3.35,
  span: 7.85,
  mass: 493000,
  stageCount: 2,

  stages: [
    {
      name: "Boosters ×4",
      nameZh: "助推器（4 枚）",
      propellant: "hypergolic",
      propellantZh: "四氧化二氮 / 偏二甲肼",
      thrustSeaLevel: 2961.6,
      burnTime: 128,
      diameter: 2.25,
      height: 15.326,
      engines: [
        {
          name: "YF-20B",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 740.4,
          thrustSeaLevel: 740.4,
          thrustVacuum: 814.4,
          ispSeaLevel: 259,
          ispVacuum: 289,
        },
      ],
    },
    {
      name: "First Stage",
      nameZh: "芯一级",
      propellant: "hypergolic",
      propellantZh: "四氧化二氮 / 偏二甲肼",
      thrustSeaLevel: 2961.6,
      thrustVacuum: 3256,
      burnTime: 166,
      diameter: 3.35,
      height: 28.465,
      engines: [
        {
          name: "YF-20B (YF-21C 机组)",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 740.4,
          thrustSeaLevel: 740.4,
          thrustVacuum: 814.4,
          ispSeaLevel: 259,
          ispVacuum: 289,
        },
      ],
    },
    {
      name: "Second Stage",
      nameZh: "芯二级",
      propellant: "hypergolic",
      propellantZh: "四氧化二氮 / 偏二甲肼",
      thrustVacuum: 738,
      burnTime: 301,
      diameter: 3.35,
      height: 15.52,
      engines: [
        {
          name: "YF-22B",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 738,
          thrustVacuum: 738,
          ispVacuum: 289,
          note: "固定安装的主机。",
        },
        {
          name: "YF-23B（游动发动机）",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 47.1,
          thrustVacuum: 47.1,
          ispVacuum: 289,
          note: "可摆动，负责二级姿态控制与末速修正。",
        },
      ],
    },
  ],

  payloadLEO: 8600,
  reusable: false,
  humanRated: true,

  description:
    "中国唯一的载人运载火箭，把「不追求先进、只追求可预测」这条载人航天设计原则贯彻到了极致，至今保持 100% 的发射成功率。",

  history: `1992 年 9 月 21 日，中国载人航天工程（921 工程）立项。运载火箭的方案选择几乎没有悬念：在既有的长征二号E（「长二捆」）基础上做载人化改造，而不是研制新火箭。长二捆本身脱胎于长征二号丙，而长征二号丙又源自东风五号洲际导弹——**这条技术链的每一环都已经过大量飞行验证。**

载人化改造的重点不在性能，而在**可靠性与安全性**：全箭可靠性指标定为 0.97，航天员安全性指标 0.997。为此增加了故障检测处理系统（FDS）、逃逸塔、冗余的控制与遥测系统，并把一二级的关键单机做了大量冗余设计。

1999 年 11 月 19 日发射神舟一号（无人）。2003 年 10 月 15 日，神舟五号把杨利伟送入轨道，中国成为第三个独立掌握载人航天的国家。此后每一次神舟任务都由长征二号F执行，从未更换。

2011 年起衍生出 CZ-2F/G 构型（取消逃逸塔、换 4.2 m 大整流罩），用于发射天宫一号与天宫二号空间实验室。

到 2025 年，长征二号F累计发射 20 余次，**全部成功**——这是所有载人运载火箭中最好的记录之一。`,

  designPhilosophy: `长征二号F的设计逻辑可以用一句话概括：**载人火箭的首要指标不是性能，而是可预测性。**

它的技术选择在今天看来处处「落后」：使用有毒的四氧化二氮/偏二甲肼、比冲只有 289 s、不可回收、运力只有 8.6 t、直径受限于铁路隧道。但每一项「落后」的选择背后都有同一个理由——**这些东西已经飞过几十次，它们的失效模式是已知的。**

第二条主线是**冗余与逃逸的分层覆盖**。载人火箭无法把失败概率降到零，因此设计重心从「不出故障」转向「出故障时能救人」：

- 0–39 km：逃逸塔（固体发动机，10 g 过载，可在发射台零高度启动）；
- 39–120 km：整流罩分离后由飞船推进舱执行逃逸；
- 入轨后：飞船具备应急返回能力。

配套的故障检测处理系统实时监视十余项参数（如发动机推力室压力、姿态角速率、贮箱压力），判定危及乘员时自动触发逃逸——**在这个环节上，火箭的「大脑」被赋予了推翻任务的权力。**

第三条是**发射流程的极端保守**。每一枚长征二号F在总装测试阶段的检查项目数以万计，发射前有备份火箭随时待命（自神舟十二号起实行「发射一发、备份一发」的滚动待命制度，以应对在轨应急救援需求）。`,

  tradeoffs: [
    {
      question: "为什么载人火箭还在用有毒的偏二甲肼？",
      answer: `四氧化二氮/偏二甲肼（N₂O₄/UDMH）有明显的缺点：剧毒、致癌、腐蚀性强，一旦泄漏需要专业防护处置；比冲只有 289 s，远低于煤油（335 s）和氢氧（430 s）。

但它有两个在载人场景下极难替代的优点：

1. **自燃**。两种推进剂一接触就自动着火，不需要任何点火装置。这意味着发动机点火这个环节的失效模式几乎被消除了——对载人火箭来说，少一个可能失效的系统就是少一份风险。
2. **常温可贮存**。不需要低温加注、不需要绝热层、不需要保压排气。火箭可以在加注后长时间保持待发状态，这对载人任务的**发射窗口灵活性**至关重要：如果因为天气或飞船原因需要推迟几小时，低温火箭可能要泄出推进剂重新加注，而常温火箭只需要等。

第三个理由更现实：**改推进剂等于改整枚火箭。** 贮箱容积、发动机、增压系统、加注设施、应急预案全部要重做，然后重新积累几十次飞行的可靠性数据。对一个已经 20 余次全部成功的载人系统来说，这个交换在风险上不划算。

中国的解决方案是**另起炉灶而不是改造**：新一代载人火箭长征十号使用液氧煤油，与长征二号F并行发展，等新火箭积累足够飞行经验后再交接。`,
    },
    {
      question: "逃逸塔真的有用吗？它增加了什么风险？",
      answer: `逃逸塔本身是一枚装满固体推进剂的火箭，装在载人飞船的正上方，在整个上升段的前 120 s 一直挂在那里。它的存在本身就是一个风险源：意外点火会直接杀死乘员。

因此逃逸系统的设计充满了防误触发的考量：多重独立的判据、需要多个传感器同时确认、地面与箭上双重授权。

它的价值在于覆盖了一个**其他手段无法覆盖的场景**：发射台上或起飞初期的爆炸。此时飞船高度为零、速度为零，没有任何时间余量，唯一的出路是用大推力在一两秒内把飞船拽到几百米外。逃逸塔的固体发动机可以在 0.1 s 内达到满推力，这是液体发动机做不到的。

真实案例证明了它的价值：

- **1983 年联盟 T-10-1**：发射台上火箭起火，逃逸塔在爆炸前 2 秒启动，两名航天员承受 14–17 g 后生还；
- **2018 年联盟 MS-10**：上升段助推器分离异常，此时逃逸塔已抛，靠备份系统救回乘员。

值得注意的是**航天飞机和 Starship 都没有逃逸系统**。航天飞机因此在挑战者号事故中失去了全部乘员——它的设计假设是「系统足够可靠，不需要逃逸」，而这个假设被证伪的代价是 14 条生命。这也是为什么中国、俄罗斯、以及 SpaceX 的载人龙飞船都保留了逃逸能力（龙飞船用集成在飞船侧壁的 SuperDraco 发动机，可以覆盖全飞行段）。`,
    },
    {
      question: "「发射一发、备份一发」的待命制度，代价有多大？",
      answer: `自神舟十二号起，每当有航天员在轨，地面就必须有一枚长征二号F和一艘神舟飞船处于**应急待命状态**：总装完毕、测试通过、可在 8.5 天内发射。这是为了应对空间站发生严重故障、需要紧急救援的情况。

代价是实打实的：

- **两倍的火箭与飞船库存**。每次任务实际占用两套硬件。
- **待命硬件的寿命消耗**。火箭长期竖立在厂房中待命，部分单机（尤其是电池、火工品）有存放期限制，超期需要更换。
- **发射场资源占用**。需要额外的厂房、测试设备与人员长期待命。

换回来的是**在轨人员的生命保障链条不留空白**。这个交换的逻辑与逃逸塔一致：载人航天的成本模型里，人的生命不是一个可以用运力或经费折算的变量。

实践中这套制度已经形成了滚动机制：待命的那一发在下次任务时转为正式发射，同时新的一发进入待命——所以并不是纯粹的浪费，而是把发射节奏与库存做了错位安排。`,
    },
  ],

  contemporaries: `载人运载火箭的现役成员只有三个半：**长征二号F**（LEO 8.6 t）、**Soyuz-2.1a**（7.02 t）、**Falcon 9**（22.8 t），加上试飞中的 SLS 与 New Glenn。

三者的设计哲学差异极大：Soyuz-2 是七十年演进的产物，长征二号F是「用成熟技术做载人化改造」，Falcon 9 则是**先做商业火箭、飞了 70 多次之后再做载人认证**——这条路径在此前的载人航天史上没有先例，它把「可靠性论证」从设计阶段前移到了运营阶段的统计数据上。

三者共同点是：都保留了完整的逃逸能力，都不追求单次任务的性能最优。**载人这件事本身就是对「性能优先」的否定。**`,

  milestones: [
    { date: "1992-09-21", title: "921 工程立项", note: "确定在长二捆基础上研制载人火箭。" },
    { date: "1999-11-19", title: "神舟一号发射", note: "无人首飞成功。" },
    { date: "2003-10-15", title: "神舟五号 — 首次载人", note: "杨利伟成为中国首位进入太空的航天员。" },
    { date: "2008-09-25", title: "神舟七号 — 首次出舱", note: "翟志刚完成中国首次太空行走。" },
    { date: "2011-09-29", title: "CZ-2F/G 发射天宫一号", note: "取消逃逸塔的货运构型。" },
    { date: "2021-06-17", title: "神舟十二号", note: "中国空间站首次载人驻留，同时启用发射待命制度。" },
  ],

  launches: {
    total: 22,
    success: 22,
    failure: 0,
    asOf: "2025-06-30",
    notable: [
      { date: "1999-11-19", name: "神舟一号", note: "首飞。" },
      { date: "2003-10-15", name: "神舟五号", note: "首次载人飞行。" },
      { date: "2016-09-15", name: "天宫二号", note: "CZ-2F/G 构型，4.2 m 整流罩。" },
      { date: "2021-10-16", name: "神舟十三号", note: "首次 6 个月长期驻留任务。" },
    ],
  },

  variants: [
    { name: "CZ-2F/Y", note: "标准载人构型，带逃逸塔。" },
    { name: "CZ-2F/G", note: "取消逃逸塔、换 4.2 m 整流罩，用于空间实验室。" },
    { name: "CZ-2E（长二捆）", note: "前身型号，1990 年首飞的商业发射型。" },
  ],
  relatedRockets: ["soyuz-2", "long-march-5", "falcon-9"],
  principles: ["guidance-and-control", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 CZ-2F 载人构型的 58.34 m 总高、3.35 m 芯级直径、2.25 m 助推器与 3.8 m 整流罩复原。逃逸塔的桁架结构为示意。",
  }),

  sources: [
    {
      title: "中国载人航天工程官网 — 长征二号F运载火箭",
      url: "http://www.cmse.gov.cn/",
      publisher: "中国载人航天工程办公室",
      confidence: "high",
      note: "总体参数、可靠性与安全性指标的官方来源。",
    },
    {
      title: "LM-2F User's Manual",
      url: "http://www.cgwic.com/LaunchServices/LaunchVehicle/LM2F.html",
      publisher: "CGWIC 中国长城工业集团",
      confidence: "high",
      note: "各级参数与载荷接口。",
    },
    {
      title: "Long March 2F — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Long_March_2F",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录汇总；不同来源在起飞质量（464–497 t）上有差异。",
    },
  ],

  tags: ["载人", "逃逸塔", "自燃推进剂", "全成功记录", "神舟"],
};
