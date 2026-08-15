import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "boosters",
    name: "侧挂助推器（4 枚）",
    nameEn: "Strap-on boosters",
    group: "booster",
    shape: "frustum",
    finish: "painted-white",
    height: 19.6,
    radius: 1.34,
    radiusTop: 0.5,
    cluster: { count: 4, offset: 3.0, phase: 45 },
    description:
      "与 1957 年 R-7 完全同构的锥形助推器，装 RD-107A。分离时上端解锁、下端由贮箱剩余增压气体推开，四枚助推器沿抛物线向外张开——这就是「科罗廖夫十字」，七十年来每一次联盟号发射都会重演一次。",
  })
  .at(0, {
    id: "rd107a",
    name: "RD-107A 发动机（4 台）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2.6,
    radius: 1.34,
    cluster: { count: 4, offset: 3.0, phase: 45 },
    nozzles: { count: 4, bellRadius: 0.4, bellHeight: 1.4, ringRadius: 0.64 },
    description:
      "四燃烧室 + 2 个游机，海平面推力 838 kN。相比 1957 年的 RD-107 提升了约 3%，主要来自新喷注头与更高的室压——七十年里这台发动机的推力总共只涨了不到 5%，因为整个系统的其余部分都是围绕原始推力设计的。",
  })
  .at(0, {
    id: "rd108a",
    name: "RD-108A 发动机（芯级）",
    group: "core",
    shape: "engines",
    finish: "engine-metal",
    height: 2.9,
    radius: 1.475,
    nozzles: { count: 4, bellRadius: 0.42, bellHeight: 1.55, ringRadius: 0.68 },
    description: "四燃烧室 + 4 个游机，海平面推力 792 kN，从地面工作到 T+286 s。",
  })
  .at(2.9, {
    id: "core-body",
    name: "芯级（Блок А）",
    group: "core",
    shape: "cylinder",
    finish: "painted-white",
    height: 24.2,
    radius: 1.475,
    description:
      "2.95 m 直径煤油/液氧芯级。直径来自 1950 年代的铁路运输限界，而这个限界至今没变——联盟号能从萨马拉的工厂用铁路直接运到拜科努尔、普列谢茨克乃至库鲁，是它保持低成本的关键之一。",
  })
  .at(27.1, {
    id: "interstage",
    name: "级间桁架",
    group: "stage-2",
    shape: "frustum",
    finish: "engine-metal",
    height: 1.2,
    radius: 1.475,
    radiusTop: 1.35,
    description:
      "开放式桁架级间段。三级采用**热分离**：Blok-I 的 RD-0124 在芯级尚未脱离时就点火，燃气从桁架的缝隙排出。开放桁架的存在本身就是热分离的证据。",
  })
  .at(28.3, {
    id: "blok-i",
    name: "三级 Блок И",
    nameEn: "Blok-I third stage",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 6.6,
    radius: 1.35,
    description:
      "Soyuz-2.1b 的三级装 RD-0124——一台**四燃烧室的富氧分级燃烧**发动机，真空比冲 359 s，是煤油机中比冲最高的量产型号之一。它相比 2.1a 上的老式 RD-0110（比冲 326 s）提升了约 950 kg 的 LEO 运力，代价是研制周期长了十几年。",
  })
  .at(34.9, {
    id: "fairing",
    name: "有效载荷整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 11.4,
    radius: 2.055,
    description:
      "4.11 m 直径整流罩（也有 3.7 m 与 4.11 m 加长型多种）。载人任务则换成联盟飞船 + 逃逸塔构型，总高与外形完全不同——同一枚火箭的上半截是可替换的模块。",
  });

export const soyuz2: Rocket = {
  slug: "soyuz-2",
  name: "Soyuz-2.1b",
  nameZh: "联盟-2.1b",
  country: "Russia",
  countryZh: "俄罗斯",
  agency: ["Progress Rocket Space Centre 进步火箭航天中心", "Roscosmos"],
  family: "r-7",
  status: "active",
  firstFlight: "2006-12-27",

  height: 46.3,
  diameter: 2.95,
  span: 10.3,
  mass: 312000,
  stageCount: 3,

  stages: [
    {
      name: "Boosters (Blocks B/V/G/D)",
      nameZh: "助推器（4 枚）",
      propellant: "kerolox",
      propellantZh: "RG-1 煤油 / 液氧",
      thrustSeaLevel: 3352,
      burnTime: 118,
      dryMass: 3784,
      propellantMass: 39160,
      diameter: 2.68,
      height: 19.6,
      engines: [
        {
          name: "RD-107A",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 838,
          thrustSeaLevel: 838,
          thrustVacuum: 1020,
          ispSeaLevel: 263,
          ispVacuum: 320,
        },
      ],
    },
    {
      name: "Core (Blok A)",
      nameZh: "芯级",
      propellant: "kerolox",
      propellantZh: "RG-1 煤油 / 液氧",
      thrustSeaLevel: 792,
      thrustVacuum: 990,
      burnTime: 286,
      dryMass: 6545,
      propellantMass: 91000,
      diameter: 2.95,
      height: 27.8,
      engines: [
        {
          name: "RD-108A",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 792,
          thrustSeaLevel: 792,
          thrustVacuum: 990,
          ispSeaLevel: 257,
          ispVacuum: 320,
        },
      ],
    },
    {
      name: "Blok I",
      nameZh: "三级",
      propellant: "kerolox",
      propellantZh: "RG-1 煤油 / 液氧",
      thrustVacuum: 294.3,
      burnTime: 270,
      dryMass: 2355,
      propellantMass: 21400,
      diameter: 2.66,
      height: 6.7,
      engines: [
        {
          name: "RD-0124",
          count: 1,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "kerolox",
          thrust: 294.3,
          thrustVacuum: 294.3,
          ispVacuum: 359,
          note: "四燃烧室，煤油机中真空比冲最高的量产型号之一。",
        },
      ],
    },
  ],

  payloadLEO: 8200,
  payloadGTO: 4900,
  payloadSSO: 4900,
  reusable: false,
  humanRated: true,

  description:
    "R-7 家族的现役成员：构型与 1957 年的第一枚洲际导弹几乎一致，却持续服役至今，是人类载人航天最长的一条连续技术链。",

  history: `Soyuz-2 是 R-7 谱系的第五代大改。它的直接前身 Soyuz-U 从 1973 年服役到 2017 年，飞了 786 次——单一型号发射次数的世界纪录。

Soyuz-2 的现代化集中在三件事：**数字控制系统**（取代 1960 年代的模拟陀螺平台，使火箭可以在飞行中滚转、进入任意方位角，不再依赖发射台的物理指向）、**新三级发动机 RD-0124**（2.1b 构型）、以及**取消对乌克兰供应链的依赖**（控制系统原产哈尔科夫）。

2004 年 11 月 2.1a 完成亚轨道试飞，2006 年 12 月 2.1b 首飞。2011 年起在法属圭亚那的库鲁发射场也建立了联盟号发射工位——一枚苏联火箭在欧洲发射场为欧洲客户服务，直到 2022 年因俄乌战争终止。

载人方面，2020 年联盟 MS-16 起，载人飞船全面转用 Soyuz-2.1a，取代了服役 19 年的 Soyuz-FG。`,

  designPhilosophy: `Soyuz-2 的设计逻辑几乎是「不设计」：**在一个已被 1,900 次飞行验证过的构型上，只改必须改的部分。**

R-7 的基本布局（4 枚锥形助推 + 芯级并联，地面全部点火）在 1950 年代是为了绕开空中点火难题；这个理由早已消失，但构型被保留了下来——因为改动它意味着重新验证一切。俄罗斯的选择是把创新限制在**可以独立验证的模块**上：控制系统换成数字的、三级换成分级燃烧的、整流罩换成更大的，而承力结构、贮箱、主发动机的基本设计维持不动。

这条路线的收益是极高的成熟度与极低的单价；代价是性能天花板被 1957 年的选择锁死：8.2 t 的 LEO 运力、无法回收、无法显著加大直径。当发射市场从「每年几十颗单星」转向「每年几千颗星座卫星」时，这个天花板变成了致命伤。

**Soyuz-2 是「演进优于革命」这一工程哲学最成功也最极端的样本——它同时证明了这条路线能走多远，以及它的终点在哪里。**`,

  tradeoffs: [
    {
      question: "为什么七十年不换构型？",
      answer: `换构型的收益是明确的：串联两级 + 大直径芯级可以把 LEO 运力从 8 t 提到 15–20 t，还能为回收留出空间。俄罗斯为此立项了 **Angara**——1992 年启动，用模块化的 URM-1 通用箭体，理论上可以组合出 3.5 t 到 24.5 t 的全谱系。

但 Angara 到 2014 年才首飞，到 2024 年总共只飞了不到 10 次，单价反而高于 Soyuz。原因不在技术，而在于**替换一个成熟系统需要同时重建的东西太多**：新发动机（RD-191）、新工厂、新发射工位、新的操作规程、新的可靠性统计。在这些全部到位之前，旧系统仍然更便宜更可靠，于是资源持续流向旧系统，新系统永远达不到摊薄成本所需的产量——这是一个自锁的循环。

同样的现象出现在 Ariane 5 → Ariane 6（十年延期）、Delta/Atlas → Vulcan（八年延期）。**打破这个循环的往往不是原有玩家，而是没有存量包袱的新进入者。** SpaceX 之所以能在十年内完成从零到 Falcon 9 Block 5，恰恰因为它没有一个「够用的旧系统」可以依赖。`,
    },
    {
      question: "三级换用分级燃烧的 RD-0124，值多少运力？",
      answer: `RD-0124 相对老式的 RD-0110：真空比冲从 326 s 提高到 359 s，提升约 10%。

用理想火箭方程粗算三级的贡献。三级质量比（起飞质量 / 关机质量）约 $m_0/m_f \\approx 3.5$：

$$\\Delta v = I_{sp} \\, g_0 \\ln\\frac{m_0}{m_f}$$

比冲从 326 s 提到 359 s，三级的 $\\Delta v$ 从约 4.0 km/s 提到约 4.4 km/s，多出来的 0.4 km/s 全部可以换成载荷。实际结果是 LEO 运力从 7.02 t（2.1a）提高到 8.2 t（2.1b），约 +17%。

**一台上面级发动机换代，带来的运力增益超过助推器推力提升 3% 所能贡献的十倍以上。** 这正是「上面级的比冲比一级的推力更值钱」这条规律的直接体现——也解释了为什么各国在有限的研制资源下，总是优先更新上面级发动机。`,
    },
    {
      question: "载人型与货运型有什么本质差别？",
      answer: `同一枚 Soyuz-2 在载人与不载人时几乎是两种火箭：

- **顶部构型不同**：载人型没有整流罩，取而代之的是联盟飞船 + 一座 **逃逸塔（САС）**。逃逸塔的固体发动机可以在故障时把轨道舱与返回舱一起拽走。
- **飞行剖面不同**：载人任务的过载限制更严（正常上升 ≤ 4 g），需要更平缓的程序转弯；同时上升段的每一段都要预先规划好中止落区（拜科努尔以东的哈萨克草原）。
- **可靠性判据不同**：载人任务对同批次硬件、发动机试车记录、气象窗口的要求更严格。

这套系统在 **2018 年 10 月 11 日的联盟 MS-10** 上经受了真实检验：助推器分离时一枚助推器的头部撞上芯级贮箱，火箭在 93 km 高度失控。此时逃逸塔已经抛掉，飞船靠整流罩上的备份分离发动机脱离，两名航天员承受 6.7 g 后安全返回。**这是人类载人航天史上少数几次逃逸系统实战成功的案例，也验证了「多重逃逸手段覆盖不同飞行段」这一设计的价值。**`,
    },
  ],

  contemporaries: `在同一运力档（LEO 5–10 t）上，Soyuz-2 的现役对手是 **Falcon 9**（22.8 t，但可降级承接小任务）、**Vega-C**（2.3 t）、**长征二号丙/四号乙**、**PSLV**（3.8 t）与新一代小型商业火箭。

Soyuz-2 曾经的核心优势——单价约 4,000–5,000 万美元、极高的成熟度、全球三个发射场——在 2015 年之后被逐一削弱：Falcon 9 的复用把单价打到同一区间但运力高三倍；2022 年之后西方客户和库鲁发射场全部退出。目前它主要服务俄罗斯本国的载人、军事与格洛纳斯任务。`,

  milestones: [
    { date: "2004-11-08", title: "Soyuz-2.1a 亚轨道试飞", note: "验证数字控制系统。" },
    { date: "2006-12-27", title: "Soyuz-2.1b 首飞", note: "首次使用 RD-0124 三级发动机。" },
    { date: "2011-10-21", title: "库鲁发射场首飞", note: "首次在欧洲发射场发射，送入两颗伽利略卫星。" },
    { date: "2018-10-11", title: "联盟 MS-10 上升段中止", note: "逃逸系统实战成功，乘员安全返回。" },
    { date: "2020-04-09", title: "联盟 MS-16 首次载人", note: "载人任务从 Soyuz-FG 全面转向 Soyuz-2.1a。" },
  ],

  launches: {
    total: 190,
    success: 184,
    partial: 2,
    failure: 4,
    asOf: "2025-06-30",
    notable: [
      { date: "2011-08-24", name: "Progress M-12M", note: "三级 RD-0124 供气管路堵塞导致失败，是 R-7 家族罕见的三级故障。" },
      { date: "2017-11-28", name: "Meteor-M No.2-1", note: "Fregat 上面级因发射场方位角参数错误而姿态失控，载荷全损——软件配置错误而非硬件失效。" },
      { date: "2018-10-11", name: "Soyuz MS-10", note: "助推器分离异常，乘员由逃逸系统救回。" },
    ],
  },

  variants: [
    { name: "Soyuz-2.1a", note: "三级用 RD-0110，LEO 7.02 t，现为载人任务主力。" },
    { name: "Soyuz-2.1b", note: "三级用 RD-0124，LEO 8.2 t。" },
    { name: "Soyuz-2.1v", note: "取消四枚助推器，芯级换 NK-33/RD-193 的轻型构型。" },
    { name: "Soyuz-ST", note: "库鲁发射场专用型，加装遥测与安全系统以符合欧洲标准。" },
  ],
  relatedRockets: ["r-7", "falcon-9", "long-march-2f"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 Soyuz-2.1b 带 4.11 m 整流罩构型的公开尺寸复原（总高 46.3 m）。载人构型顶部为飞船 + 逃逸塔，外形与此不同。",
  }),

  sources: [
    {
      title: "Soyuz User's Manual, Issue 2",
      url: "https://www.arianespace.com/wp-content/uploads/2015/09/Soyuz-Users-Manual-March-2012.pdf",
      publisher: "Arianespace / Starsem",
      confidence: "high",
      note: "尺寸、质量、各级参数与运力包络的一手来源。",
    },
    {
      title: "Soyuz-2 — Roscosmos / TsSKB-Progress",
      url: "https://www.samspace.ru/",
      publisher: "Progress Rocket Space Centre",
      confidence: "high",
      note: "制造方公开的型号说明。",
    },
    {
      title: "Soyuz MS-10 launch abort investigation",
      url: "https://www.nasa.gov/",
      publisher: "NASA / Roscosmos",
      confidence: "medium",
      note: "助推器分离异常的调查结论。",
    },
    {
      title: "Soyuz-2 — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Soyuz-2",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射统计；不同来源对成功/部分失败的判定口径不一致。",
    },
  ],

  tags: ["载人", "长寿型号", "一级半", "煤油", "分级燃烧上面级"],
};
