import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, band, flag, text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "p120c-nozzle",
    name: "P120C 喷管",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 2.5,
    radius: 1.7,
    nozzles: { count: 1, bellRadius: 1.4, bellHeight: 2.3 },
    description: "碳/酚醛喉衬，可摆动的柔性接头喷管，负责第一级全程的推力矢量控制。",
  })
  .at(2.5, {
    id: "p120c-body",
    name: "第一级 P120C",
    group: "stage-1",
    shape: "cylinder",
    finish: "solid-booster",
    // P120C 白壳；型号字样用 ESA/Avio 蓝
    livery: text("VEGA C", PAINT.esaBlue, 0.72, 0.85),
    height: 11,
    radius: 1.7,
    description:
      "**这是全世界最大的整体式（单段）碳纤维壳体固体火箭发动机**：装药 141.6 t、推力 4,650 kN、壳体一体缠绕成型，没有段间接缝——也就没有航天飞机固推那种 O 形圈问题。同一个 P120C 也是阿丽亚娜 6 的助推器：**一款小型火箭的第一级，同时是一款重型火箭的助推器。**",
  })
  .at(13.5, {
    id: "interstage-1",
    name: "一二级级间段",
    group: "stage-2",
    shape: "frustum",
    finish: "cork-ablative",
    height: 1,
    radius: 1.7,
    radiusTop: 1.15,
    description: "从 3.4 m 收缩到 2.3 m。织女星 C 的四级直径逐级收缩，外形像一支削尖的铅笔。",
  })
  .at(14.5, {
    id: "zefiro40",
    name: "第二级 Zefiro-40",
    group: "stage-2",
    shape: "cylinder",
    finish: "solid-booster",
    height: 7.5,
    radius: 1.15,
    description:
      "装药 36 t 的固体第二级，真空推力 1,304 kN。**2022 年 12 月 20 日的 VV22 任务就毁在这一级**：喷管喉衬（一块从乌克兰供应商采购的碳-碳材料）在工作中异常侵蚀，推力骤降，火箭失控。此后欧洲更换了喉衬供应商并重新做了资格认证，织女星 C 停飞两年。",
  })
  .at(22, {
    id: "interstage-2",
    name: "二三级级间段",
    group: "stage-3",
    shape: "frustum",
    finish: "cork-ablative",
    height: 1,
    radius: 1.15,
    radiusTop: 0.95,
    description: "从 2.3 m 收缩到 1.9 m。",
  })
  .at(23, {
    id: "zefiro9",
    name: "第三级 Zefiro-9",
    group: "stage-3",
    shape: "cylinder",
    finish: "solid-booster",
    height: 4.5,
    radius: 0.95,
    description: "装药 10.6 t 的固体第三级，真空推力 314 kN。前三级全部是固体，把载荷推到接近入轨速度。",
  })
  .at(27.5,
    {
      id: "avum",
      name: "第四级 AVUM+",
      nameEn: "Attitude & Vernier Upper Module",
      group: "payload",
      shape: "cylinder",
      finish: "gold-foil",
      height: 2,
      radius: 0.95,
      internal: true,
      description:
        "**整枚火箭的精度全在这一级。**前三级固体只能提供固定的总冲量，无法精确控制关机时刻，入轨精度差；AVUM+ 用一台 2.45 kN 的自燃推进剂发动机，可以重启五次，负责最终的轨道成形、多轨道部署与任务结束后的主动离轨。它同时是全箭的姿态控制单元。",
    })
  .at(27,
    {
      id: "fairing",
      name: "整流罩",
      group: "payload",
      shape: "ogive",
      finish: "painted-white",
      // 意大利主导研制，整流罩上通常有意大利与欧盟标识
      livery: [
      band(0.04, 0.07, PAINT.esaBlue),
      flag("it", 0.28, 0.8),
    ],
      height: 7.8,
      radius: 1.4,
      description: "3.3 m 直径整流罩，比初代织女星加大，容积提升约 40%，可容纳更大的单星或更多的小卫星分配器。",
    });

export const vegaC: Rocket = {
  slug: "vega-c",
  name: "Vega-C",
  nameZh: "织女星 C",
  country: "Europe",
  countryZh: "欧洲",
  agency: ["欧洲空间局（ESA）", "Avio", "Arianespace"],
  family: "vega",
  status: "active",
  firstFlight: "2022-07-13",

  height: 34.8,
  diameter: 3.4,
  mass: 210000,
  stageCount: 4,

  stages: [
    {
      name: "P120C",
      nameZh: "第一级",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustSeaLevel: 4650,
      burnTime: 135,
      dryMass: 11000,
      propellantMass: 141600,
      diameter: 3.4,
      height: 13.5,
      note: "与阿丽亚娜 6 的助推器完全相同，是欧洲两款现役火箭的共用部件。",
      engines: [
        {
          name: "P120C",
          count: 1,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 4650,
          thrustSeaLevel: 4650,
          ispVacuum: 278.5,
          note: "世界最大的整体式碳纤维壳体固体发动机，无段间接缝。",
        },
      ],
    },
    {
      name: "Zefiro-40",
      nameZh: "第二级",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustVacuum: 1304,
      burnTime: 93,
      dryMass: 3300,
      propellantMass: 36200,
      diameter: 2.3,
      height: 7.5,
      note: "2022 年 VV22 任务因喷管喉衬异常侵蚀失败，此后更换供应商并重新认证。",
      engines: [
        {
          name: "Zefiro-40",
          count: 1,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 1304,
          thrustVacuum: 1304,
          ispVacuum: 293.5,
          note: "碳纤维壳体，可摆动喷管。",
        },
      ],
    },
    {
      name: "Zefiro-9",
      nameZh: "第三级",
      propellant: "solid",
      propellantZh: "HTPB 复合固体推进剂",
      thrustVacuum: 314,
      burnTime: 120,
      dryMass: 1000,
      propellantMass: 10600,
      diameter: 1.9,
      height: 4.1,
      note: "与初代织女星共用的第三级。",
      engines: [
        {
          name: "Zefiro-9",
          count: 1,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 314,
          thrustVacuum: 314,
          ispVacuum: 296,
          note: "装药 10.6 t。",
        },
      ],
    },
    {
      name: "AVUM+",
      nameZh: "第四级",
      propellant: "hypergolic",
      propellantZh: "偏二甲肼 / 四氧化二氮",
      thrustVacuum: 2.45,
      burnTime: 900,
      dryMass: 700,
      propellantMass: 740,
      diameter: 2.1,
      height: 2,
      note: "可重启五次，负责精确入轨、多轨道部署与主动离轨。",
      engines: [
        {
          name: "MEA (RD-843)",
          count: 1,
          cycle: "pressure-fed",
          cycleZh: "挤压式",
          propellant: "hypergolic",
          thrust: 2.45,
          thrustVacuum: 2.45,
          ispVacuum: 315.5,
          note: "乌克兰南方设计局的产品；俄乌战争后欧洲启动了替代方案。",
        },
      ],
    },
  ],

  payloadLEO: 3300,
  payloadSSO: 2300,
  reusable: false,
  humanRated: false,

  description:
    "欧洲的小型运载火箭：三级固体把速度堆上去，一个小小的液体末级把轨道修准；它的第一级同时是阿丽亚娜 6 的助推器。",

  history: `织女星（Vega）项目由意大利主导，2012 年首飞。立项动机是：欧洲有阿丽亚娜 5 打大卫星，有联盟号（在库鲁发射）打中型，**唯独没有自己的小型运载器**，而对地观测卫星与科学小卫星的需求正在增长。

**Vega-C（"C" 代表 Consolidation）是它的加大改进型**，2022 年 7 月 13 日首飞。主要改动有三处：

1. 第一级从 P80 换成 **P120C**，装药从 88 t 增加到 141.6 t；
2. 第二级从 Zefiro-23 换成 **Zefiro-40**；
3. 整流罩加大，容积提升约 40%。

SSO 运力从 1.5 t 提高到 2.3 t，单价基本不变。

**关键设计决策是 P120C 与阿丽亚娜 6 共用。**这不是巧合，而是欧洲固体推进产业的一次刻意整合：如果织女星与阿丽亚娜各用各的固体发动机，两条产线的年产量都只有几枚；共用之后，年产量可以达到二十枚以上。

**2022 年 12 月 20 日，第二次飞行（VV22）失败。**Zefiro-40 的喷管喉衬在工作中异常侵蚀，推力骤降，火箭在 T+151 s 失控，载荷（两颗 Pléiades Neo 卫星）损失。调查发现喉衬材料——一块从乌克兰供应商 Yuzhnoye 采购的碳-碳复合材料——的性能不符合规格。

**织女星 C 停飞了两年。**这段时间恰好与阿丽亚娜 5 退役、阿丽亚娜 6 尚未首飞重叠，**欧洲一度完全失去自主入轨能力**，不得不把伽利略导航卫星交给猎鹰 9 号发射。

2024 年 12 月 5 日，织女星 C 复飞成功，发射了哥白尼计划的 Sentinel-1C 卫星。

第四级 AVUM 的主发动机（RD-843）同样来自乌克兰。俄乌战争后，欧洲启动了 **M10 甲烷发动机**的研制，作为未来 Vega-E 的上面级动力，以摆脱这条供应链。`,

  designPhilosophy: `织女星 C 的构型逻辑与 PSLV 高度一致：**用固体级堆速度，用一个小液体级修精度。**

前三级全是固体，理由很直接：

- **固体发动机的结构质量比最好。**没有泵、没有增压系统、没有贮箱与发动机分离的结构，整个级就是一个装满推进剂的筒加一个喷管。对小型火箭来说，结构质量占比是最致命的问题——箭体越小，结构与发动机在总质量里的占比越高。
- **固体不需要加注设施。**小型火箭的商业逻辑是快速周转与低发射场成本，固体级可以预先装配好，发射当天不需要低温加注流程。
- **欧洲的固体推进工业强。**意大利的 Avio 有完整的固体发动机能力，这是织女星由意大利主导的直接原因。

**代价是精度。**固体发动机点火后不能关机、不能节流，总冲量由装药决定，实际值有百分之几的分散。三级固体叠加下来，入轨速度的误差会很大。

**AVUM 就是为了解决这个问题存在的。**它只有 2.45 kN 推力（相当于一台小型摩托车发动机的推力量级），740 kg 推进剂，但它可以：

- 精确控制关机时刻，把轨道半长轴与倾角修到要求的精度；
- 重启五次，在一次任务里把不同卫星送到不同轨道；
- 任务结束后主动离轨，避免留下轨道垃圾。

**这是一个非常清晰的分工：固体负责「力气」，液体负责「准头」。**

**P120C 的共用是另一条主线。**它把织女星 C 与阿丽亚娜 6 绑在了同一条产线上，这在低产量的欧洲航天工业里几乎是获得规模效应的唯一办法。代价是风险共享——两款火箭的固体推进供应链一旦出问题，欧洲会同时失去两款运载器。

**它没有解决的问题是价格。**织女星 C 的单价约 3,500–4,000 万美元，SSO 运力 2.3 t，折合每公斤约 1.6 万美元。作为对比，猎鹰 9 号的 Transporter 拼车任务是每公斤 6,000 美元。**织女星 C 的市场只能建立在「欧洲机构任务必须用欧洲火箭」这个政策前提上。**`,

  tradeoffs: [
    {
      question: "全固体的小火箭，为什么还要挂一个液体末级？",
      answer: `因为固体发动机在物理上无法精确控制关机时刻，而入轨精度完全由关机时刻决定。

固体发动机的推力曲线由装药的几何形状（药柱内孔的形状随燃烧推进而变化）决定，一旦点火就按这条曲线走到底。它的总冲量有制造分散性——装药量、燃速、燃面推进速度都会有百分之零点几到百分之几的偏差。

对轨道而言，这个偏差是致命的。入轨速度差 1 m/s（相对于 7,800 m/s，即 0.013%），近地点高度就会差好几公里。三级固体累积下来的速度误差，可能达到几十米每秒。

**液体末级解决这个问题的方式是「闭环制导」：**它一边工作一边测量自身状态，算出还需要多少 Δv，然后在准确的时刻关机。推力小反而是优点——**推力越小，关机时刻的一点点误差造成的速度偏差越小。**

$$\\Delta v_{\\text{误差}} \\approx \\frac{F}{m}\\cdot \\Delta t_{\\text{误差}}$$

AVUM 的推力只有 2.45 kN，即使关机时刻差 0.1 秒，速度误差也只有厘米每秒量级。

**这一级还带来两个附加能力：**

1. **多轨道部署。**重启五次意味着一次任务可以服务多个轨道需求不同的客户。
2. **主动离轨。**任务结束后点火降低轨道，让末级在几个月内再入烧毁，而不是留在轨道上几十年。**欧洲自己在推动空间碎片减缓规则，火箭必须以身作则。**

**同样的设计出现在 PSLV（PS4）、Minotaur、Electron（Kick Stage）上——凡是用固体级做主动力的小型火箭，几乎都会挂一个小液体末级。**这已经是这类火箭的标准构型。`,
    },
    {
      question: "VV22 那次失败暴露了什么问题？",
      answer: `暴露了一个比技术故障更麻烦的问题：**在小批量航天制造里，供应链的每一个环节都是单点故障。**

失败的直接原因很具体：Zefiro-40 的喷管喉衬（throat insert）在工作中异常侵蚀。喉衬是喷管最窄处的那一圈材料，要在 3,000 °C 以上的燃气流中保持形状——它会烧蚀，但必须**均匀、可预测地**烧蚀。

VV22 上的喉衬用的是碳-碳复合材料，供应商是乌克兰的 Yuzhnoye（南方设计局）。调查结论是这批材料的性能与规格不符。

**问题不在于「用了外国供应商」，而在于验证的深度。**

大批量制造的工业里，材料批次通过统计抽样与在线检测控制质量。**航天的批量太小，统计方法失效**——一年只做几个喉衬，无法建立有意义的统计分布。于是只能靠：

- 供应商的过程控制（相信对方的工艺没变）；
- 到货检验（但破坏性试验会毁掉样品，且无法覆盖每一件）；
- 地面试车（但试车用的不是要上天的那一件）。

**这三层里没有一层能保证「上天的这一件」是好的。**这与 N1 的 NK-15「上箭的发动机从未被点燃过」是同一类问题，只是尺度小得多。

**第二层问题是地缘政治。**AVUM 的主发动机 RD-843 同样来自乌克兰。俄乌战争后，这条供应链变得极不稳定。欧洲被迫启动 M10 甲烷发动机的研制作为替代——**这是一次由战争而非技术需求驱动的型号研制。**

**第三层问题是「没有备份」。**织女星 C 停飞的两年，恰好撞上阿丽亚娜 5 退役、阿丽亚娜 6 未首飞。欧洲在 2023 年一度**完全没有自主入轨能力**，这是自 1979 年阿丽亚娜 1 号首飞以来从未有过的处境。

**教训是：共用部件带来规模效应，也带来共同的脆弱性。**当一个航天体系只有两款火箭、且它们共用关键部件时，任何一处故障都会波及全局。`,
    },
  ],

  contemporaries: `**PSLV**（印度）在构型思路上几乎相同：固体主级 + 可重启的小液体末级 + 多星部署能力。PSLV 的运力更大、价格更低，是织女星 C 在国际小卫星市场上最直接的对手。

**Electron**（新西兰/美国）走的是完全不同的路：全液体、电泵、3D 打印，运力只有 0.32 t 但发射频率高得多。**两者代表小型运载器的两种商业模式：织女星 C 靠机构订单，Electron 靠专属发射服务。**

**猎鹰 9 号的 Transporter 拼车**从价格上碾压两者（每公斤 6,000 美元 vs 织女星 C 的 1.6 万），但只提供固定的几条轨道。**小型火箭的生存空间，取决于「定制轨道与时间表」这件事值多少钱。**

**阿丽亚娜 6** 是它的同门：共用 P120C，共享欧洲固体推进的供应链与产能。两者的关系既是协同也是绑定。`,

  milestones: [
    { date: "2012-02-13", title: "初代织女星首飞", note: "欧洲首款自主小型运载器，由意大利主导。" },
    { date: "2022-07-13", title: "织女星 C 首飞成功", note: "第一级换装 P120C，SSO 运力从 1.5 t 提升至 2.3 t。" },
    { date: "2022-12-20", title: "VV22 失败", note: "Zefiro-40 喷管喉衬异常侵蚀，停飞两年。" },
    { date: "2024-12-05", title: "复飞成功", note: "发射哥白尼计划的 Sentinel-1C 卫星。" },
  ],

  launches: {
    total: 4,
    success: 3,
    failure: 1,
    asOf: "2025-06-30",
    notable: [
      { date: "2022-07-13", name: "VV21 首飞", note: "搭载 LARES-2 与多颗立方星。" },
      { date: "2022-12-20", name: "VV22", note: "Zefiro-40 喉衬失效，两颗 Pléiades Neo 卫星损失。" },
      { date: "2024-12-05", name: "VV25 / Sentinel-1C", note: "复飞成功。" },
    ],
  },

  variants: [
    { name: "Vega（初代）", note: "P80 第一级，SSO 1.5 t，2012–2024 服役。" },
    { name: "Vega-C", note: "P120C 第一级与加大整流罩，SSO 2.3 t。" },
    { name: "Vega-E", note: "规划中的改进型，用 M10 甲烷发动机取代 AVUM 的自燃推进剂末级。" },
  ],
  relatedRockets: ["ariane-6", "pslv", "electron", "ariane-5"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 34.8 m 总高、3.4 m 第一级直径与逐级收缩的四级构型复原。涂装：白色固体级壳体、软木烧蚀层的级间段、金箔包裹的 AVUM，标识用 ESA/Avio 蓝。",
  }),

  sources: [
    {
      title: "Vega-C User's Manual",
      url: "https://www.arianespace.com/",
      publisher: "Arianespace",
      confidence: "high",
      note: "各级参数、运力与整流罩包络。",
    },
    {
      title: "Vega-C VV22 Independent Enquiry Commission Report",
      url: "https://www.esa.int/",
      publisher: "ESA / Arianespace",
      confidence: "high",
      note: "Zefiro-40 喷管喉衬失效的调查结论。",
    },
    {
      title: "P120C Solid Rocket Motor",
      url: "https://www.avio.com/",
      publisher: "Avio",
      confidence: "high",
      note: "装药量、推力与在两款火箭上的共用方案。",
    },
  ],

  tags: ["小型运载", "全固体主级", "多星部署", "太阳同步轨道", "欧洲"],
};
