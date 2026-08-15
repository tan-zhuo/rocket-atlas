import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

/** 按 PSLV-XL 构型（六枚加长捆绑固体助推器）建模。 */
const g = rocketGeometry()
  .at(0, {
    id: "s139-nozzle",
    name: "S139 喷管",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 2.5,
    radius: 1.4,
    nozzles: { count: 1, bellRadius: 1.25, bellHeight: 2.3 },
    description: "柔性接头喷管，可摆动 ±2°。一级的滚转控制另有两台自燃推进剂的游动发动机负责。",
  })
  .at(2.5, {
    id: "s139-body",
    name: "第一级 S139",
    group: "stage-1",
    shape: "cylinder",
    finish: "solid-booster",
    height: 18,
    radius: 1.4,
    description:
      "装药 138 t 的固体一级，海平面推力 4,800 kN。印度的火箭传统从探空火箭开始，固体推进是它最早成熟、也最有信心的技术——**所以 PSLV 把最不容有失的起飞段完全交给了固体。**",
  })
  .at(0.5, {
    id: "psom-nozzle",
    name: "捆绑助推器喷管（6 枚）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 2,
    radius: 0.5,
    cluster: { count: 6, offset: 1.95 },
    nozzles: { count: 1, bellRadius: 0.45, bellHeight: 1.8 },
    description: "六枚中有四枚在地面点火，另外两枚在 T+25 s 空中点火——**用点火时序把推力曲线摊平**，避免起飞瞬间过载太大。",
  })
  .at(2.5, {
    id: "psom-body",
    name: "PSOM-XL 固体捆绑助推器",
    group: "booster",
    shape: "cylinder",
    finish: "solid-booster",
    height: 11,
    radius: 0.5,
    cluster: { count: 6, offset: 1.95 },
    description: "每枚装药 12 t（XL 型），推力 719 kN。数量可以在 0、2、4、6 之间选择，构成 PSLV-CA、PSLV-G 与 PSLV-XL 三种运力档。",
  })
  .at(13.5, {
    id: "psom-nose",
    name: "助推器头锥",
    group: "booster",
    shape: "cone",
    finish: "solid-booster",
    height: 2,
    radius: 0.5,
    cluster: { count: 6, offset: 1.95 },
    description: "地面点火的四枚在 T+70 s 分离，空中点火的两枚在 T+92 s 分离。",
  })
  .at(20.5, {
    id: "ps2-engine",
    name: "维卡斯发动机（第二级）",
    group: "stage-2",
    shape: "engines",
    finish: "engine-metal",
    height: 2,
    radius: 1.4,
    nozzles: { count: 1, bellRadius: 0.85, bellHeight: 1.8 },
    description:
      "一台维卡斯，自燃推进剂。**PSLV 最独特的地方就是这里：固体（一级）→ 液体（二级）→ 固体（三级）→ 液体（四级）交替排布。**这个「固液交替」的构型在全世界几乎找不到第二个。",
  })
  .at(22.5, {
    id: "ps2-body",
    name: "第二级 PS2",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 11,
    radius: 1.4,
    description: "装 42 t 偏二甲肼/四氧化二氮。液体级在这里的作用是提供可控、可关机的推力，为后段的精确入轨打基础。",
  })
  .at(33.5, {
    id: "interstage",
    name: "级间过渡段",
    group: "stage-3",
    shape: "frustum",
    finish: "painted-white",
    height: 1,
    radius: 1.4,
    radiusTop: 1,
    description: "从 2.8 m 收缩到 2.0 m 的过渡段。",
  })
  .at(34.5, {
    id: "ps3",
    name: "第三级 PS3",
    group: "stage-3",
    shape: "cylinder",
    finish: "solid-booster",
    height: 3.2,
    radius: 1,
    description:
      "又一级固体，装药 7.6 t，真空推力 240 kN。**为什么第三级又回到固体？**因为在这个高度上需要的是「一次性把速度推上去」的大冲量，固体的推力密度最高、结构最简单，而它不需要节流或关机——那些事交给第四级去做。",
  })
  .at(37.7, {
    id: "ps4",
    name: "第四级 PS4",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 2.6,
    radius: 0.67,
    internal: true,
    description:
      "两台 7.6 kN 的小发动机，**可以多次重启**。这一级是 PSLV 全部精度与灵活性的来源：它能把主载荷送进 SSO，再改变轨道把搭载的小卫星送到不同高度。**2017 年那次一箭 104 星的纪录，靠的就是这一级反复点火、分批释放。**",
  })
  .at(37, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 7.4,
    radius: 1.6,
    description: "3.2 m 直径整流罩。多星发射时内部装有多层分配器（如月船一号任务用的双层结构）。",
  });

export const pslv: Rocket = {
  slug: "pslv",
  name: "PSLV",
  nameZh: "极轨卫星运载火箭",
  country: "India",
  countryZh: "印度",
  agency: ["印度空间研究组织（ISRO）"],
  family: "pslv",
  status: "active",
  firstFlight: "1993-09-20",

  height: 44.4,
  diameter: 2.8,
  span: 4.9,
  mass: 320000,
  stageCount: 4,

  stages: [
    {
      name: "PS1 (S139) + 6 × PSOM-XL",
      nameZh: "第一级 + 六枚固体捆绑助推器",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustSeaLevel: 7690,
      burnTime: 110,
      dryMass: 30200,
      propellantMass: 210000,
      diameter: 2.8,
      height: 20,
      note: "六枚助推器中四枚地面点火、两枚 T+25 s 空中点火，把起飞过载摊平。",
      engines: [
        {
          name: "S139",
          count: 1,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 4800,
          thrustSeaLevel: 4800,
          ispVacuum: 269,
          note: "装药 138 t 的固体一级。",
        },
        {
          name: "PSOM-XL",
          count: 6,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 719,
          thrustSeaLevel: 719,
          ispVacuum: 262,
          note: "加长型捆绑助推器，每枚装药 12 t。",
        },
      ],
    },
    {
      name: "PS2",
      nameZh: "第二级",
      propellant: "hypergolic",
      propellantZh: "偏二甲肼 / 四氧化二氮",
      thrustVacuum: 799,
      burnTime: 133,
      dryMass: 5300,
      propellantMass: 41500,
      diameter: 2.8,
      height: 12.8,
      note: "一台维卡斯发动机，可摆动实现三轴姿控。",
      engines: [
        {
          name: "Vikas",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "hypergolic",
          thrust: 799,
          thrustVacuum: 799,
          ispVacuum: 293,
          note: "源自法国 Viking 发动机的国产化型号。",
        },
      ],
    },
    {
      name: "PS3",
      nameZh: "第三级",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustVacuum: 240,
      burnTime: 113,
      dryMass: 1120,
      propellantMass: 7600,
      diameter: 2,
      height: 3.6,
      note: "固体级，提供高空段的大冲量加速。",
      engines: [
        {
          name: "HPS3",
          count: 1,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 240,
          thrustVacuum: 240,
          ispVacuum: 295,
          note: "碳纤维壳体，装药 7.6 t。",
        },
      ],
    },
    {
      name: "PS4",
      nameZh: "第四级",
      propellant: "hypergolic",
      propellantZh: "一甲基肼 / 混合氮氧化物",
      thrustVacuum: 15.2,
      burnTime: 525,
      dryMass: 920,
      propellantMass: 2500,
      diameter: 1.34,
      height: 3,
      note: "两台小发动机，可多次重启，负责精确入轨与多轨道部署。",
      engines: [
        {
          name: "PS4 Engine",
          count: 2,
          cycle: "pressure-fed",
          cycleZh: "挤压式",
          propellant: "hypergolic",
          thrust: 7.6,
          thrustVacuum: 7.6,
          ispVacuum: 308,
          note: "挤压式供给，结构极简，可反复点火。",
        },
      ],
    },
  ],

  payloadLEO: 3800,
  payloadSSO: 1750,
  payloadGTO: 1425,
  reusable: false,
  humanRated: false,

  description:
    "印度的主力工作火箭：四级固液交替、可重启的末级，靠一次任务把上百颗卫星送到不同轨道——不是最强，但可能是最会「分货」的火箭。",

  history: `PSLV 的立项目标很具体：把印度的**遥感卫星**送进太阳同步轨道（SSO）。

印度在 1980 年代已经有了小型的 SLV-3 与 ASLV，但运力只有几十至上百公斤，且 ASLV 五次发射三次失败。PSLV 是第一款「能干活」的印度火箭。

**1993 年 9 月 20 日首飞失败**——第二级与第三级的分离时序出错，姿态失控。1994 年第二次发射成功，此后 PSLV 进入了长达三十年的稳定服役期。

它的记录里有几个特别的项目：

- **月船一号**（2008）——印度第一个月球探测器，PSLV 把它送进地月转移轨道。探测器上的月球矿物测绘仪首次在月球两极确认了水冰的存在。
- **曼加里安 / 火星轨道飞行器**（2013）——印度第一次火星任务，总成本约 7,400 万美元，且**一次成功**（此前所有国家的首次火星任务都失败过）。PSLV 的运力不足以直接送它奔火星，于是探测器先进入大椭圆地球轨道，通过多次自身点火逐步抬高远地点，最后才逃逸——**用时间换运力。**
- **2017 年 2 月 15 日：一次发射部署 104 颗卫星**，这个纪录保持了四年。

它也是国际小卫星的主要「班车」：三十年里为三十多个国家发射了三百多颗卫星。**PSLV 的商业价值不在运力，而在它的第四级能把不同客户的卫星精确送到各自需要的轨道。**

2017 年 PSLV-C39 因整流罩未分离失败，2025 年 PSLV-C61 再次失败，但整体成功率仍在 94% 以上。`,

  designPhilosophy: `PSLV 的构型在全世界都很罕见：**固体 → 液体 → 固体 → 液体，四级交替。**

这不是为了标新立异，而是每一级都在解决一个不同的问题：

| 级 | 类型 | 要解决什么 |
|---|---|---|
| PS1 | 固体（大） | 起飞推力。固体推力密度最高，结构最简单，最可靠 |
| PS2 | 液体（维卡斯） | 可控加速。液体可关机、可摆动，为姿态与时序留余地 |
| PS3 | 固体（小） | 高空大冲量。此时不需要精细控制，只需要把速度推上去 |
| PS4 | 液体（挤压式） | 精度与灵活性。可多次重启，负责最后的轨道成形 |

**核心思想是：把「推力」和「精度」分开采购。**

固体发动机便宜、可靠、推力大，但点火后不能关、不能调、总冲量固定，落点精度差。液体发动机贵、复杂，但可以精确控制关机时刻，这直接决定了入轨精度。

PSLV 的做法是让固体级负责「把速度堆上去」，让液体级负责「把速度修准」。**第四级的两台发动机加起来只有 15.2 kN，还不如一台汽车发动机的推力大，但它决定了整枚火箭的入轨精度。**

**第四级的可重启能力是 PSLV 最有商业价值的部分。**一次发射里，它可以：

1. 点火，把主载荷（比如一颗遥感卫星）送进 630 km 的 SSO，释放；
2. 关机、滑行，再点火降低轨道；
3. 在新轨道上释放一批小卫星；
4. 再点火再调整，释放下一批。

2017 年一箭 104 星就是这样完成的——**卫星不是一次性全部弹出去，而是分批、按时序、以不同速度弹出，避免碰撞。**

**这个设计的代价是「级数多」。** 四级意味着三次分离、四次点火，每一个都是潜在的失效点。PSLV 的两次失败中，一次正是级间分离时序问题（1993 年首飞），一次是整流罩未分离（2017）。**级数与可靠性是直接矛盾的，PSLV 用大量重复飞行的经验把这个矛盾压住了。**`,

  tradeoffs: [
    {
      question: "为什么要固体和液体交替？直接全液体不行吗？",
      answer: `技术上完全可行，但那会是一枚不同的火箭，成本和研制难度都高得多。

考虑印度在 1980 年代的技术状况：

- **固体推进**：非常成熟。印度从探空火箭起步，有完整的固体装药、壳体缠绕、喷管烧蚀材料工业。
- **液体推进**：刚从法国引进 Viking 发动机技术，正在国产化。只有一款可用的发动机（维卡斯）。
- **低温推进**：完全没有。

在这个约束下，「全液体四级」意味着要研制至少三种不同推力等级的液体发动机，周期以十年计。**PSLV 的构型本质上是「用手上有的东西拼出一枚够用的火箭」。**

但它拼得很有道理，不是随便凑的。看每一级的选择理由：

**PS1 用固体：** 起飞段需要的是绝对推力，而固体的推力密度（推力/体积）远高于液体。同样体积的固体一级能产生更大的推力，且不需要涡轮泵、不需要加注设施、可以长期贮存。

**PS2 用液体：** 一级抛掉后，火箭已经出了稠密大气，此时需要的是**可控性**。液体级可以在任意时刻关机，也可以摆动喷管做三轴姿控。如果这一级也用固体，飞行时序就完全被装药的燃烧曲线锁死。

**PS3 用固体：** 这一级的任务是在 200 km 以上把速度从 5 km/s 推到接近入轨速度。这个阶段没有大气干扰，姿态需求简单，需要的只是冲量。固体级的结构质量比更好（没有泵、没有增压系统、没有贮箱与发动机的分离结构），**在这个位置上，简单等于效率。**

**PS4 用液体挤压式：** 需要多次重启和精确关机，只有液体能做到。而挤压式（不用涡轮泵，靠气瓶压推进剂）在这个推力等级下最简单、最可靠。

**结论：这不是一个妥协的构型，是一个把每一级的物理需求与可用技术精确匹配的构型。**它的独特性来自印度独特的技术起点，但它的逻辑是普适的。`,
    },
    {
      question: "一箭 104 星是怎么做到不撞在一起的？",
      answer: `靠第四级的多次点火、精确的释放时序，以及一点点轨道力学的技巧。

2017 年 2 月 15 日那次任务的载荷是：1 颗 714 kg 的印度制图卫星（主载荷）+ 103 颗小卫星（大部分是 5 kg 以下的立方星，来自美国 Planet Labs 等公司）。

关键问题是：**如果同时释放 103 个物体，它们的相对速度很小（几十厘米每秒），会在轨道上长期保持接近，碰撞风险很高。**

解法有三层：

**第一层：结构上的分层。**整流罩内装有多层分配器（deck），小卫星分装在不同层与不同方位。

**第二层：释放的时序与方向。**卫星不是同时弹出，而是每隔几秒弹出一批，并且**相邻批次朝相反方向弹射**。弹射装置给每颗星约 0.5–1.5 m/s 的相对速度，方向交替。

**第三层：第四级自身的姿态与速度调整。**在释放批次之间，PS4 会做小的姿态机动，改变后续卫星的弹出方向；必要时还可以做微小的轨道调整。

整个部署过程持续了约 10 分钟。

**这个能力的真正意义不在「破纪录」，而在商业模式。**小卫星客户最大的痛点是：搭车发射只能接受主载荷的轨道，没有选择权。PSLV 的第四级把这个约束松开了——**它可以在一次任务里服务多个轨道需求不同的客户。**

后来 SpaceX 的 Transporter 拼车任务用了同样的思路，规模更大（一次上百颗），但轨道选择反而更少（因为猎鹰 9 号的二级不做大范围轨道变换）。**PSLV 的优势是「分得细」，猎鹰的优势是「量大且便宜」。**

ISRO 后来还把 PS4 做成了一个**在轨实验平台**：任务结束后，第四级不再离轨，而是带着搭载的实验载荷（太阳能帆板、姿控系统）继续在轨工作数月。**把最后一级从「垃圾」变成「卫星」，这是一个成本几乎为零的额外收益。**`,
    },
  ],

  contemporaries: `**长征二号丙 / 四号乙**（中国）是同一运力段的对手，同样以 SSO 遥感发射为主。中国的型号发射频次更高，但轨道部署的灵活性不如 PSLV 的第四级。

**Vega / Vega-C**（欧洲）是最接近的类比：同样是小型运载器、同样以 SSO 为主、同样用「固体多级 + 液体末级（AVUM）」的构型。**两者的末级设计思路几乎一模一样**——都是用一个可多次重启的小型液体级来提供精度与多轨道部署能力。

**猎鹰 9 号的 Transporter 拼车任务**（2021 起）从价格上冲击了 PSLV 的小卫星业务：每公斤 6,000 美元 vs PSLV 的两三倍。**但 Transporter 只提供固定的几条轨道，PSLV 仍然保有「定制轨道」这块市场。**

**Electron**（新西兰/美国）走的是另一个极端：更小、更贵、但完全按客户时间表与轨道发射。**三者构成了小卫星发射的三种商业模式：拼车最便宜、PSLV 最灵活、Electron 最专属。**`,

  milestones: [
    { date: "1993-09-20", title: "首飞失败", note: "二三级分离时序错误导致姿态失控。" },
    { date: "1994-10-15", title: "首次成功", note: "此后进入长期稳定服役。" },
    { date: "2008-10-22", title: "发射月船一号", note: "印度首个月球探测器，确认月球两极存在水冰。" },
    { date: "2013-11-05", title: "发射曼加里安火星探测器", note: "总成本约 7,400 万美元，首次尝试即成功。" },
    { date: "2017-02-15", title: "一箭 104 星", note: "单次发射部署卫星数量的世界纪录，保持四年。" },
    { date: "2017-08-31", title: "PSLV-C39 失败", note: "整流罩未分离，卫星被困在罩内。" },
  ],

  launches: {
    total: 61,
    success: 58,
    partial: 1,
    failure: 2,
    asOf: "2024-12-31",
    notable: [
      { date: "2008-10-22", name: "Chandrayaan-1", note: "印度首次月球任务。" },
      { date: "2013-11-05", name: "Mangalyaan", note: "用多次绕地抬轨代替直接注入，以时间换运力。" },
      { date: "2017-02-15", name: "PSLV-C37", note: "一箭 104 星。" },
      { date: "2017-08-31", name: "PSLV-C39", note: "整流罩未分离。" },
    ],
  },

  variants: [
    { name: "PSLV-G", note: "六枚标准捆绑助推器的初代构型，已停用。" },
    { name: "PSLV-CA", note: "无捆绑助推器的「核心版」，SSO 运力约 1.1 t。" },
    { name: "PSLV-XL", note: "六枚加长助推器，SSO 1.75 t，主力构型。" },
    { name: "PSLV-DL / QL", note: "两枚或四枚助推器的中间档，按任务定制。" },
  ],
  relatedRockets: ["lvm3", "vega-c", "electron", "long-march-3b"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 PSLV-XL 构型复原：44.4 m 总高、2.8 m 一级直径、六枚 1 m 直径捆绑助推器。",
  }),

  sources: [
    {
      title: "PSLV — ISRO",
      url: "https://www.isro.gov.in/PSLV.html",
      publisher: "Indian Space Research Organisation",
      confidence: "high",
      note: "各级参数、构型与运力。",
    },
    {
      title: "PSLV-C37 / Cartosat-2D Mission",
      url: "https://www.isro.gov.in/",
      publisher: "ISRO",
      confidence: "high",
      note: "一箭 104 星的部署时序与分配器设计。",
    },
    {
      title: "PSLV — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Polar_Satellite_Launch_Vehicle",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射统计随截止日期变化；不同来源对「部分失败」的归类略有差异。",
    },
  ],

  tags: ["小中型运载", "固液交替", "多星部署", "太阳同步轨道", "印度"],
};
