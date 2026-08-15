import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "nozzle",
    name: "推力室与喷管",
    nameEn: "Thrust chamber",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 1.7,
    radius: 0.6,
    nozzles: { count: 1, bellRadius: 0.44, bellHeight: 1.5 },
    description:
      "245 kN 推力的单室发动机，用 18 个杯状喷注头把乙醇和液氧分区喷入——这是为了避开当时无法解决的燃烧不稳定问题：把一个大燃烧室拆成 18 个小的燃烧区，各自稳定后再汇合。喷管内壁用乙醇再生冷却，外加薄膜冷却。",
  })
  .at(0, {
    id: "tail",
    name: "尾段",
    group: "stage-1",
    shape: "frustum",
    finish: "painted-black",
    height: 2.4,
    radius: 0.95,
    radiusTop: 0.825,
    description:
      "尾段内装涡轮泵（由过氧化氢分解产生的蒸汽驱动）、过氧化氢罐与高锰酸钠催化剂罐。涡轮泵的功率来自一套独立的化学系统，而不是主推进剂——这是最早期的「单独气源」思路，比后来的燃气发生器循环更笨重但更容易分别调试。",
  })
  .at(0, {
    id: "fins",
    name: "尾翼与燃气舵（4 片）",
    group: "stage-1",
    shape: "fins",
    finish: "painted-black",
    height: 3.6,
    radius: 1.05,
    cluster: { count: 4, offset: 0.7 },
    description:
      "四片大尾翼提供气动稳定，翼根处装有**石墨燃气舵**——直接伸进发动机尾焰中偏转燃气，从而在低速、稀薄大气中也能控制姿态。这是人类第一次实用化的推力矢量控制，代价是石墨舵在飞行中被高温燃气不断烧蚀，损失约 17% 的推力。",
  })
  .at(2.4, {
    id: "tanks",
    name: "推进剂贮箱段",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    height: 6.6,
    radius: 0.825,
    description:
      "上方是乙醇箱、下方是液氧箱，两个铝制贮箱**悬挂在箭体蒙皮内部**而不是自身承力。这种「贮箱内挂」结构比后来的承力贮箱重得多，但制造与检修简单——V-2 是在战时用非熟练劳动力大批量生产的，可制造性优先于结构效率。",
  })
  .at(9, {
    id: "guidance",
    name: "仪器舱",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    height: 1.2,
    radius: 0.825,
    description:
      "内装两个陀螺仪（一个测俯仰/偏航，一个测滚转）与积分加速度计。制导逻辑极其朴素：保持姿态、按预定程序转弯、当累计速度达到设定值时切断发动机——没有位置反馈、没有闭环导航。命中精度因此只有约 17 km（CEP），作为武器几乎没有军事价值。",
  })
  .at(10.2, {
    id: "warhead",
    name: "战斗部 / 头锥",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    livery: { kind: "checker", color: "#15171c" },
    height: 3.8,
    radius: 0.825,
    description:
      "1,000 kg 阿马图炸药战斗部。头部不可分离，整枚火箭以超过 5 马赫的速度撞击目标——这也意味着 V-2 没有再入热防护的概念，箭体只需要在撞击前撑住几十秒。",
  });

export const v2: Rocket = {
  slug: "v-2",
  name: "V-2 (Aggregat 4)",
  nameZh: "V-2 / A4",
  country: "Germany",
  countryZh: "德国",
  agency: ["Heeresversuchsanstalt Peenemünde 佩内明德陆军试验场"],
  family: "a-series",
  status: "retired",
  firstFlight: "1942-10-03",
  lastFlight: "1952-09-19",

  height: 14,
  diameter: 1.65,
  span: 3.56,
  mass: 12500,
  stageCount: 1,

  stages: [
    {
      name: "A4 单级",
      nameZh: "单级",
      propellant: "alcolox",
      propellantZh: "75% 乙醇水溶液 / 液氧",
      thrustSeaLevel: 245,
      thrustVacuum: 305,
      burnTime: 65,
      dryMass: 4008,
      propellantMass: 8760,
      diameter: 1.65,
      height: 14,
      note: "关机速度约 1.6 km/s，射程 320 km，弹道最高点约 88 km。",
      engines: [
        {
          name: "A4 发动机",
          count: 1,
          cycle: "pressure-fed",
          cycleZh: "过氧化氢蒸汽涡轮泵供给",
          propellant: "alcolox",
          thrust: 245,
          thrustSeaLevel: 245,
          thrustVacuum: 305,
          ispSeaLevel: 203,
          ispVacuum: 239,
          note: "涡轮泵由过氧化氢催化分解的蒸汽驱动，与主推进剂无关。",
        },
      ],
    },
  ],

  reusable: false,
  humanRated: false,

  description:
    "人类第一枚大型液体燃料弹道导弹，也是第一个进入太空的人造物体；它作为武器彻底失败，作为技术起点却定义了此后所有运载火箭的基本要素。",

  history: `V-2 的技术根源在 1920 年代的德国业余火箭运动。1932 年，年仅 20 岁的冯·布劳恩被德国陆军招募——因为《凡尔赛条约》限制了火炮口径却没有提到火箭，火箭成了德军可以合法投资的方向。从 A1 到 A4，佩内明德用十年时间把一个业余爱好推进到工业规模。

1942 年 10 月 3 日，A4 第一次成功飞行：射程 190 km、最高点 84.5 km。项目负责人 Walter Dornberger 当晚说了一句话：「今天，宇宙飞船诞生了。」1944 年 6 月 20 日的一次垂直试射（MW 18014）达到 176 km 高度——**这是人造物体第一次越过 100 km 的卡门线进入太空。**

作为武器，V-2 从 1944 年 9 月开始袭击伦敦、安特卫普等城市，总共发射约 3,172 枚，造成约 9,000 人死亡。但生产它的代价更为惨重：诺德豪森的 Mittelwerk 地下工厂使用集中营强制劳工，**约 12,000–20,000 名劳工死于生产过程——死于制造这件武器的人数，远超死于这件武器的人数。** 任何关于 V-2 技术成就的讨论都不应该绕开这一点。

战后美苏英三国瓜分了 V-2 的技术遗产：美国的「回形针行动」把冯·布劳恩与 100 多名工程师、数百枚零件运回本土，直接催生了 Redstone、Jupiter 与后来的 Saturn 系列；苏联接收了佩内明德的设施与部分人员，科罗廖夫仿制出 R-1 并由此起步走向 R-7。`,

  designPhilosophy: `V-2 建立了此后八十年所有运载火箭的**基本要素清单**：泵压式液体发动机、再生冷却推力室、涡轮泵、惯性制导、推力矢量控制、轻质承力箭体、大规模地面试验体系。在它之前，这些东西没有一样在大尺度上被验证过。

它的设计逻辑可以概括为**「在一切都不成熟时，为每个难题找一条绕路」**：

- 大燃烧室会不稳定 → 用 18 个小喷注头把燃烧分区；
- 涡轮泵没有成熟驱动方案 → 用独立的过氧化氢蒸汽系统，与主推进剂完全解耦；
- 空气舵在稀薄大气中无效 → 把石墨舵直接伸进尾焰里；
- 承力贮箱工艺不过关 → 让贮箱挂在蒙皮里面，各管各的。

每一条绕路都付出了质量或效率的代价（燃气舵损失 17% 推力、内挂贮箱使干质量偏大、乙醇比冲远低于煤油），但每一条都把一个「不会」变成了「能做」。**这正是第一代工程的典型形态：不追求最优解，只追求可行解。**

而它作为武器的彻底失败，同样是设计逻辑的直接后果：17 km 的命中精度意味着它只能用于恐吓城市，1 t 的战斗部又不足以造成战略性破坏。用一枚成本相当于四架战斗机的火箭去投掷一枚炸弹，在军事经济学上是荒谬的。**V-2 真正的价值从来不在它被设计用来做的事情上。**`,

  tradeoffs: [
    {
      question: "为什么烧乙醇而不是煤油？",
      answer: `乙醇（75% 水溶液）的比冲只有 203 s（海平面），比煤油低约 40 s，是个明显较差的燃料。选它有三个理由：

1. **冷却**。乙醇的汽化潜热高、掺水后燃烧温度更低（约 2,700 °C 而非煤油的 3,400 °C）。1940 年代的再生冷却技术还很原始，降低燃烧温度是让推力室能撑过 65 s 的关键。掺进去的 25% 水纯粹是「用比冲换寿命」。
2. **供应**。德国战时缺石油，但乙醇可以用马铃薯发酵大量生产——V-2 计划一度消耗了德国相当比例的马铃薯产量。这是典型的战时资源约束进入技术方案的例子。
3. **燃烧特性**。乙醇燃烧稳定、积碳少，对当时还无法精细控制的喷注器更友好。

战后美苏两国的仿制品（Redstone、R-1）都沿用了乙醇，直到 1950 年代中期煤油（RP-1）的冷却与结焦问题被解决，才完成了替换。**这条路径说明：推进剂的选择往往不是由理论比冲决定的，而是由「当前的材料与工艺能不能撑住」决定的。**`,
    },
    {
      question: "燃气舵是个好方案吗？",
      answer: `V-2 起飞时速度为零，气动舵面完全无效；上升到高空后大气稀薄，气动舵同样无效。要在这两个阶段控制姿态，唯一的办法是直接作用于推力。

冯·布劳恩团队的方案是**在喷管出口放四片石墨舵片**，通过偏转燃气产生控制力矩。它有效、简单、不需要活动的发动机安装结构。但代价是：

- 舵片长期浸在 2,700 °C 的燃气中，**持续烧蚀**，65 s 的工作时间几乎是石墨舵的寿命极限；
- 舵片阻挡燃气流，直接损失约 17% 的推力——这是一个巨大的性能税；
- 烧蚀导致舵效随时间变化，控制系统必须容忍这种漂移。

后来的火箭全部转向了**摆动发动机（gimbal）**：把整台发动机装在万向节上，用作动器偏转，不损失任何推力。V-2 没有这么做，是因为当时的推进剂柔性管路和大功率作动器都还不存在。

**燃气舵的历史地位在于它证明了推力矢量控制这个概念本身是可行的**——一旦这一点被证明，寻找更好的实现方式就只是工程问题。今天燃气舵仍用在需要极短工作时间的场合（如某些固体导弹的初始段和火箭逃逸系统）。`,
    },
    {
      question: "为什么 V-2 上不去轨道？差在哪？",
      answer: `V-2 的关机速度约 1.6 km/s，而近地轨道需要约 7.8 km/s。差了将近 5 倍——但这个差距远比看上去更难跨越，因为它出现在指数里。

理想火箭方程：

$$\\Delta v = I_{sp} \\, g_0 \\ln\\frac{m_0}{m_f}$$

V-2 的比冲 $I_{sp} \\approx 239\\text{ s（真空）}$，质量比 $m_0/m_f = 12{,}500 / 4{,}008 \\approx 3.1$，得 $\\Delta v \\approx 2.65$ km/s（扣除重力损失与阻力后实际约 1.6 km/s）。

要用同样的发动机达到入轨所需的约 9.4 km/s（含损失），需要的质量比是：

$$\\frac{m_0}{m_f} = e^{9400 / (239 \\times 9.81)} \\approx e^{4.0} \\approx 55$$

也就是说整枚火箭里只有 1/55 可以是结构和载荷。而 V-2 的结构本身就占了 1/3。**单级入轨在这个比冲下在数学上就不成立**，无论工程做得多好。

这正是分级的必要性所在——把烧空的贮箱扔掉，让 $m_f$ 在飞行中阶跃式下降。冯·布劳恩很早就知道这一点：A9/A10 方案（两级、跨大西洋射程）在战争结束前已经在图纸上。R-7 与 Redstone 都是沿着这条线走下去的结果。`,
    },
  ],

  contemporaries: `V-2 在技术上没有同代竞争者——盟军没有任何可比的液体火箭项目。美国的 JATO 与 WAC Corporal、苏联的 Katyusha 都是小得多的固体或简单液体火箭。这种技术代差本身就说明了集中投入的效果：德国在 1937–1945 年间投入 V-2 的资源，据估算相当于曼哈顿计划的规模。

但两个项目的产出完全不同：曼哈顿计划交付了改变战争结局的武器；V-2 交付了一件军事上无效、道德上沉重、却在战后二十年内被两个超级大国分别继承并送人上天的技术遗产。`,

  milestones: [
    { date: "1942-10-03", title: "首次成功飞行", note: "射程 190 km、最高点 84.5 km。" },
    { date: "1944-06-20", title: "MW 18014 — 首次进入太空", note: "垂直试射达到 176 km，人造物体首次越过卡门线。" },
    { date: "1944-09-08", title: "首次实战使用", note: "袭击巴黎与伦敦。" },
    { date: "1945-05", title: "回形针行动 / 苏军接管佩内明德", note: "技术遗产被美苏瓜分。" },
    { date: "1946-04-16", title: "美国首次发射缴获的 V-2", note: "白沙靶场，用于高层大气与宇宙线研究。" },
    { date: "1949-02-24", title: "Bumper-WAC 达到 393 km", note: "V-2 + WAC Corporal 两级组合，首次实用的多级火箭飞行。" },
  ],

  variants: [
    { name: "A4b", note: "加装后掠翼的滑翔增程型，试飞两次。" },
    { name: "A9 / A10", note: "两级跨大西洋方案，仅停留在设计阶段。" },
    { name: "Bumper", note: "美国用 V-2 作一级、WAC Corporal 作二级的两级验证火箭。" },
    { name: "R-1", note: "苏联仿制型，科罗廖夫团队由此起步。" },
  ],
  relatedRockets: ["r-7", "saturn-v"],
  principles: ["staging-and-rocket-equation", "guidance-and-control"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 A4 公开图纸的 14 m 总高、1.65 m 箭体直径、3.56 m 尾翼跨距复原。内部贮箱与涡轮泵位置为示意剖分，不代表精确布局。",
  }),

  sources: [
    {
      title: "The Rocket Team",
      url: "https://www.nasa.gov/history/history-publications-and-resources/",
      publisher: "Frederick Ordway & Mitchell Sharpe",
      confidence: "high",
      note: "佩内明德团队、A4 研制过程与战后转移的标准参考。",
    },
    {
      title: "V-2 Rocket / A-4 Technical Data",
      url: "https://airandspace.si.edu/collection-objects/missile-surface-surface-v-2-4",
      publisher: "Smithsonian National Air and Space Museum",
      confidence: "high",
      note: "尺寸、质量、推力的馆藏实物数据。",
    },
    {
      title: "The Dora-Mittelbau concentration camp and V-2 production",
      url: "https://encyclopedia.ushmm.org/content/en/article/dora-mittelbau",
      publisher: "United States Holocaust Memorial Museum",
      confidence: "high",
      note: "强制劳工与死亡人数的权威记录。",
    },
    {
      title: "V-2 rocket — Wikipedia",
      url: "https://en.wikipedia.org/wiki/V-2_rocket",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射数量与伤亡统计的汇总；不同来源在总发射数（2,800–3,600）上差异较大。",
    },
  ],

  tags: ["历史起点", "亚轨道", "首次进入太空", "液体弹道导弹"],
};
