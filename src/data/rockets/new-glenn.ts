import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, band, flag, text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "be4-cluster",
    name: "BE-4 发动机（7 台）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 5,
    radius: 3.5,
    nozzles: { count: 7, bellRadius: 0.95, bellHeight: 2.9, ringRadius: 2.2 },
    description:
      "7 台富氧分级燃烧的甲烷发动机，单台海平面推力 2,400 kN。BE-4 同时也是 ULA 火神火箭的一级发动机——**一家公司的发动机同时供给自己和最大的竞争对手，这在运载火箭史上很少见**，原因是美国在 2014 年后急需一款不依赖俄制 RD-180 的大推力发动机，而符合条件的选项只有两个。",
  })
  .at(0, {
    id: "landing-legs",
    name: "着陆腿（6 条）",
    group: "stage-1",
    shape: "fins",
    finish: "carbon",
    height: 6,
    radius: 1.6,
    cluster: { count: 6, offset: 3.5 },
    description:
      "六条着陆腿，比 Falcon 9 多两条。New Glenn 的一级着陆在**移动的海上平台**（而非固定的驳船锚位），设计上要容忍更大的甲板运动与倾斜，因此需要更宽的支撑基面和更强的缓冲行程。",
  })
  .at(5, {
    id: "s1-body",
    name: "一级箭体",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    // 白漆箭体 + Blue Origin 深蓝字样与尾箍
    livery: [
      text("NEW GLENN", PAINT.blueOrigin, 0.8, 0.8),
      flag("us", 0.66, 0.85),
      band(0.0, 0.04, PAINT.blueOrigin),
    ],
    height: 52.5,
    radius: 3.5,
    description:
      "7 m 直径的铝合金贮箱——这个直径的选择摆脱了公路运输限制（工厂就建在卡纳维拉尔角旁边，箭体直接陆运几公里到发射台）。7 m 也是整流罩直径，全箭上下等径，避免了收缩段带来的结构与气动复杂度。设计目标是**同一枚一级复用 25 次**。",
  })
  .at(50,
  {
    id: "strakes",
    name: "气动稳定翼（4 片）",
    group: "stage-1",
    shape: "fins",
    finish: "painted-white",
    height: 6,
    radius: 2.0,
    cluster: { count: 4, offset: 3.5 },
    description:
      "一级上部的四片固定气动翼。它不是栅格舵——New Glenn 的再入控制主要靠这些固定翼提供的气动稳定性配合发动机摆动，而不是可动舵面。少一套作动机构，就少一处需要在再入热环境中工作的活动部件。",
  })
  .at(57.5, {
    id: "interstage",
    name: "级间段",
    group: "stage-1",
    shape: "cylinder",
    finish: "carbon",
    height: 2,
    radius: 3.5,
    description: "级间段，分离后留在一级上一同返回。",
  })
  .at(59.5, {
    id: "s2-body",
    name: "二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 16.5,
    radius: 3.5,
    description:
      "2 台 BE-3U 氢氧发动机，真空比冲 445 s，可多次重启。一二级用**不同的推进剂组合**（一级甲烷、二级氢氧）：一级要的是推力密度与复用友好性，二级要的是极致比冲。这是把「推进剂分层选择」原则用到极致的现役案例。",
  })
  .at(76, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 22,
    radius: 3.5,
    description:
      "7 m 直径、22 m 长的整流罩，内部容积约为 Falcon 9 整流罩的 2.4 倍。**在现役火箭中体积最大**——这是 New Glenn 最明确的差异化卖点：有些载荷受限的不是质量而是尺寸（大口径望远镜、大型天线、空间站舱段）。",
  });

export const newGlenn: Rocket = {
  slug: "new-glenn",
  name: "New Glenn",
  nameZh: "新格伦",
  country: "United States",
  countryZh: "美国",
  agency: ["Blue Origin"],
  family: "new-glenn",
  status: "active",
  firstFlight: "2025-01-16",

  height: 98,
  diameter: 7,
  span: 7,
  mass: 1450000,
  stageCount: 2,

  stages: [
    {
      name: "GS1",
      nameZh: "一级",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustSeaLevel: 17100,
      burnTime: 190,
      diameter: 7,
      height: 57.5,
      reusable: true,
      note: "设计复用寿命 25 次，海上平台着陆。",
      engines: [
        {
          name: "BE-4",
          count: 7,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "methalox",
          thrust: 2400,
          thrustSeaLevel: 2400,
          thrustVacuum: 2640,
          ispSeaLevel: 310,
          ispVacuum: 340,
          note: "美国在 RD-180 之后的替代方案，同时供应 ULA 的火神火箭。",
        },
      ],
    },
    {
      name: "GS2",
      nameZh: "二级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 1420,
      burnTime: 460,
      diameter: 7,
      height: 23.4,
      reusable: false,
      note: "可多次重启，支持 GEO 直接注入与地月转移。",
      engines: [
        {
          name: "BE-3U",
          count: 2,
          cycle: "expander",
          cycleZh: "膨胀排放循环",
          propellant: "hydrolox",
          thrust: 710,
          thrustVacuum: 710,
          ispVacuum: 445,
          note: "由亚轨道火箭 New Shepard 的 BE-3 发展而来的真空版。",
        },
      ],
    },
  ],

  payloadLEO: 45000,
  payloadGTO: 13600,
  reusable: true,
  reuseNote: "一级设计为可复用 25 次，海上平台着陆；二级一次性。",
  humanRated: false,

  description:
    "Blue Origin 用二十年时间打造的重型可回收火箭，以 7 m 超大整流罩和「一级甲烷 + 二级氢氧」的双推进剂架构区别于所有竞争者。",

  history: `Blue Origin 成立于 2000 年，比 SpaceX 还早两年，但采取了截然不同的节奏——公司格言 *Gradatim Ferociter*（循序渐进、勇往直前）几乎是对 SpaceX 快速迭代路线的直接回应。二十年间它先做亚轨道的 New Shepard（2015 年起载人飞行），直到 2025 年才把轨道级火箭送上天。

New Glenn 于 2016 年公开，以约翰·格伦（美国首位环绕地球的航天员）命名。研制过程屡次延期，最主要的瓶颈是 **BE-4 发动机**——这台富氧分级燃烧的甲烷机同时是 ULA 火神火箭的一级动力，它的进度直接卡住了两个火箭家族。

2025 年 1 月 16 日首飞（NG-1）：二级成功入轨，一级海上着陆失败。第二次飞行（NG-2，2025 年 11 月）发射 NASA 的 ESCAPADE 火星探测器，并**成功完成了一级海上回收**——这使 New Glenn 成为继 Falcon 9 之后第二种实现轨道级一级回收的运载火箭。

它承担的任务包括亚马逊 Kuiper 星座、NASA 的多个科学任务，以及 Blue Origin 自己的月球着陆器 Blue Moon。`,

  designPhilosophy: `New Glenn 的设计逻辑是**在 Falcon 9 已经验证过的路线上，把每一个参数往上推一档。**

它没有发明新的回收方式（仍是垂直着陆）、没有挑战新的复用极限（仍只回收一级），而是在三个具体维度上做加法：

1. **直径**。7 m 而不是 3.7 m。这一个数字改变了很多事——整流罩体积是 Falcon 9 的 2.4 倍，让它能接下光学望远镜、大型天线这类「装不进去」而非「举不起来」的载荷；同时避免了 Falcon 9 那种被公路运输限死、只能不断拉长的困境。
2. **推进剂分层**。一级用甲烷（复用友好、无积碳、密度尚可），二级用氢氧（比冲 445 s）。这比 Falcon 9 上下都用煤油的方案在性能上更优，代价是要同时维护两套完全不同的推进剂系统与地面设施。
3. **复用寿命**。设计目标 25 次，是 Falcon 9 Block 5 初始目标（10 次）的 2.5 倍。为此一级采用了更保守的结构裕度与更温和的再入弹道。

代价是**上市时间**：从公开到首飞用了九年，期间 Falcon 9 已经飞了三百多次。在运载火箭这个行业里，先到者积累的飞行数据与客户信任是很难用参数优势追平的。**New Glenn 面对的不是技术问题，而是「更好的第二名」这个位置本身有多少价值的问题。**`,

  tradeoffs: [
    {
      question: "为什么一级烧甲烷、二级烧氢？两套推进剂不麻烦吗？",
      answer: `绝大多数火箭在一二级用同一种推进剂组合（Falcon 9 全煤油、Starship 全甲烷、Delta IV 全氢氧），因为共用推进剂意味着共用地面加注系统、共用增压方案、共用一套操作规程。New Glenn 却选了两套。

理由是**两级的最优解本来就不同**：

- 一级要在稠密大气里提供大推力，看重的是**密度**（贮箱不能太大）和**复用友好性**（燃烧洁净、无积碳、可快速检修）。甲烷密度 423 kg/m³，是液氢的 6 倍；燃烧产物洁净，不像煤油那样积碳。
- 二级在真空中工作，Δv 占比高，比冲每提高 1% 都直接换成载荷。氢氧的 445 s 比甲烷高出约 65 s——在二级上这个差距价值巨大。

代价是实打实的：

- 两套低温加注系统（甲烷 −162 °C、氢 −253 °C），发射台复杂度显著上升；
- 液氢的贮存与泄漏管理是航天界公认最麻烦的问题之一（氢分子小、易泄漏、易燃且火焰不可见）；
- 两条独立的发动机产线（BE-4 与 BE-3U）。

Blue Origin 能接受这个复杂度，是因为它同时在做 New Shepard（BE-3 的来源）和月球着陆器（也用氢氧），**两套推进剂体系在公司层面是共用的，而不只是为这一枚火箭准备的。**`,
    },
    {
      question: "7 m 直径值不值？",
      answer: `Falcon 9 的 3.7 m 直径是被公路桥涵限死的；New Glenn 直接把工厂建在发射场旁边，从而摆脱了这个约束。7 m 带来的好处：

- **整流罩容积 2.4 倍**。载荷包络 ⌀6.35 × 21.9 m，可以装下 Falcon 9 装不下的东西。
- **不需要收缩段**。全箭等径，结构与气动都更简单。
- **同样的长细比下总长更短**，结构横向刚度更好，跨声速抖振与弯曲模态问题更容易处理。

代价：

- **箭体只能就地生产**。工厂、发射台、总装厂必须绑在一起，无法像 Falcon 9 那样在加州造、佛州和加州两地发射。
- **底部面积大**，再入时的气动加热总量更高，着陆时的地面效应与羽流冲刷更严重。
- **规模不经济的风险**：如果市场上没有足够多需要 7 m 包络的载荷，这个能力就是纯成本。

目前看，大整流罩的实际需求正在增长——大口径空间望远镜、Kuiper 这类需要一次投放大量卫星的星座、以及未来的空间站舱段，都受体积而非质量限制。**这可能是 New Glenn 相对 Falcon 9 最难被复制的差异化优势。**`,
    },
    {
      question: "二十年才首飞，「循序渐进」的代价是什么？",
      answer: `Blue Origin 与 SpaceX 几乎同时起步（2000 vs 2002），资源上 Blue Origin 长期更充裕（贝索斯每年注资约 10 亿美元）。但到 2025 年 New Glenn 首飞时，Falcon 9 已经飞了 400 多次。

两条路线的差别不在勤奋程度，而在**信息获取方式**：

- SpaceX 用早期的、不完美的产品进入市场，靠真实飞行获取数据、靠客户付款支撑现金流，在飞行中迭代（Falcon 1 四次才成功，Falcon 9 从 v1.0 改到 Block 5 用了八年）。
- Blue Origin 长期在地面与亚轨道积累，追求「首飞即接近最终状态」。New Shepard 飞了 20 多次都是亚轨道跳跃，对轨道级火箭的贡献主要在发动机与操作经验上。

代价是明确的：**没有飞行就没有真实数据，没有真实数据就无法知道哪些保守设计是必要的、哪些是浪费。** 二十年里 New Glenn 的设计经过多轮修改（一级发动机从 6 台增到 7 台，二级从 BE-4U 改为 BE-3U），每一轮都是在纸面上做的判断。

反过来说，这条路线也有它的回报：New Glenn 首飞就把载荷送入轨道，第二次飞行就完成了一级回收——而 Falcon 9 用了 20 次发射才第一次成功着陆。**慢，换来的是首飞成功率；快，换来的是迭代速度。哪个更值，取决于你在跟谁竞争、以及市场还留给你多少时间。**`,
    },
  ],

  contemporaries: `直接对手是 **Falcon Heavy**（LEO 63.8 t）与 **Vulcan Centaur**（LEO 27.2 t）。New Glenn 的 45 t 运力介于两者之间，但整流罩体积超过两者之和的量级——它在竞争中打的不是运力牌，而是包络牌与复用牌。

真正的悬念在 **Starship**：如果 Starship 实现完全复用并把每公斤成本压低一个数量级，New Glenn 这种「一级复用 + 二级一次性」的架构会重演今天 Ariane 5 面对 Falcon 9 的处境。Blue Origin 对此的回应是把二级做得尽可能便宜（**"Project Jarvis"** 曾研究过不锈钢可回收二级），但目前尚未有公开的成熟方案。`,

  milestones: [
    { date: "2016-09-12", title: "New Glenn 计划公开", note: "以美国首位环绕地球的航天员命名。" },
    { date: "2017-03-07", title: "BE-4 首次全推力试车", note: "美国自主大推力甲烷机的关键节点。" },
    { date: "2025-01-16", title: "NG-1 首飞", note: "二级成功入轨，一级海上着陆失败。" },
    { date: "2025-11", title: "NG-2 首次成功回收一级", note: "成为继 Falcon 9 后第二种实现轨道级一级回收的火箭。" },
  ],

  launches: {
    total: 2,
    success: 2,
    failure: 0,
    asOf: "2025-12-31",
    notable: [
      { date: "2025-01-16", name: "NG-1 (Blue Ring Pathfinder)", note: "首飞入轨成功，一级回收失败。" },
      { date: "2025-11", name: "NG-2 (ESCAPADE)", note: "发射 NASA 火星探测器并成功回收一级。" },
    ],
  },

  variants: [
    { name: "New Glenn 两级构型", note: "标准构型，LEO 45 t。" },
    { name: "三级构型", note: "早期方案中提出过增加氢氧三级以增强高轨能力，目前未实施。" },
  ],
  relatedRockets: ["falcon-9", "vulcan-centaur", "starship"],
  principles: ["reusability", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 Blue Origin 公开的 98 m 总高、7 m 直径与 7 台 BE-4 布局复原。各段长度分配与着陆腿、气动翼形状为示意。涂装：白漆箭体、黑色碳纤维级间段，字样与尾箍用 Blue Origin 深蓝。",
  }),

  sources: [
    {
      title: "New Glenn Payload User's Guide",
      url: "https://www.blueorigin.com/new-glenn",
      publisher: "Blue Origin",
      confidence: "high",
      note: "尺寸、运力、整流罩包络与复用目标。",
    },
    {
      title: "BE-4 Engine",
      url: "https://www.blueorigin.com/engines/be-4",
      publisher: "Blue Origin",
      confidence: "high",
      note: "发动机推力与循环类型。",
    },
    {
      title: "New Glenn — Wikipedia",
      url: "https://en.wikipedia.org/wiki/New_Glenn",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "起飞质量、各级参数为公开估算；Blue Origin 未发布完整质量数据。飞行记录截至 2025 年底。",
    },
  ],

  tags: ["可回收", "甲烷", "大整流罩", "商业航天", "重型运载"],
};
