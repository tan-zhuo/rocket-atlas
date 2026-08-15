import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";

const g = rocketGeometry()
  .at(0, {
    id: "s1-engines",
    name: "KRE-075 发动机（4 台）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3.5,
    radius: 1.75,
    nozzles: { count: 4, bellRadius: 0.62, bellHeight: 2.8, ringRadius: 0.92 },
    description:
      "四台 75 tf（735 kN）级煤油/液氧发动机，燃气发生器循环。**韩国选择「用四台中等推力机并联」而不是研制一台 300 tf 的大机**，理由是研制风险：同一款发动机可以同时用作一级（四台并联）与二级（一台真空型），研制一款抵两款。代价是四机并联的推力同步与结构耦合问题——**这正是首飞前最大的技术攻关点。**",
  })
  .at(3.5, {
    id: "s1-body",
    name: "第一级",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    height: 18.1,
    radius: 1.75,
    description:
      "3.5 m 直径的煤油/液氧一级，贮箱是韩国自研的铝合金结构。**世界上只有少数几个国家能独立造出这个尺度的低温贮箱**——薄壁大直径贮箱的成形、焊接与静力试验，都是需要专门设施与多年积累的能力。",
  })
  .at(21.6, {
    id: "s2-engine",
    name: "KRE-075 真空型",
    group: "stage-2",
    shape: "engines",
    finish: "engine-metal",
    height: 1.9,
    radius: 1.75,
    nozzles: { count: 1, bellRadius: 0.95, bellHeight: 1.8 },
    description: "与一级同款发动机的真空版本，扩张比加大。同一型号在两级复用，是罗老号失败后韩国最重要的一条研制策略。",
  })
  .at(23.5, {
    id: "s2-body",
    name: "第二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "painted-white",
    height: 9.5,
    radius: 1.75,
    description: "第二级同样是 3.5 m 直径，装 56 t 推进剂。",
  })
  .at(33, {
    id: "interstage",
    name: "级间过渡段",
    group: "stage-3",
    shape: "frustum",
    finish: "painted-white",
    height: 1.5,
    radius: 1.75,
    radiusTop: 1.3,
    description: "从 3.5 m 收缩到 2.6 m。",
  })
  .at(34.5, {
    id: "s3-body",
    name: "第三级",
    group: "stage-3",
    shape: "cylinder",
    finish: "painted-white",
    height: 4.5,
    radius: 1.3,
    description:
      "一台 7 tf（68.6 kN）的 KRE-007。**2021 年首飞失败就发生在这一级**：飞行中的加速度让液氧贮箱内的一个氦气瓶固定支架松脱，气瓶在箱内撞击，导致贮箱破裂、氧化剂泄漏，第三级提前 46 秒关机。载荷差 1.5 km/s 未能入轨。**这是一个典型的「地面难以复现」的失效模式**——支架的设计只考虑了地面 1g 与飞行轴向过载，没有充分考虑浮力方向的反转。",
  })
  .at(39, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 8.2,
    radius: 1.7,
    description: "3.4 m 直径整流罩。首飞时载荷是一个 1.5 t 的配重块，第二次飞行才携带真实卫星。",
  });

export const nuri: Rocket = {
  slug: "nuri",
  name: "Nuri (KSLV-II)",
  nameZh: "世界号（KSLV-II）",
  country: "South Korea",
  countryZh: "韩国",
  agency: ["韩国航空宇宙研究院（KARI）", "韩华宇航"],
  family: "kslv",
  status: "active",
  firstFlight: "2021-10-21",

  height: 47.2,
  diameter: 3.5,
  mass: 200000,
  stageCount: 3,

  stages: [
    {
      name: "First Stage",
      nameZh: "第一级",
      propellant: "kerolox",
      propellantZh: "煤油 / 液氧",
      thrustSeaLevel: 2942,
      thrustVacuum: 3260,
      burnTime: 127,
      dryMass: 15200,
      propellantMass: 127000,
      diameter: 3.5,
      height: 21.6,
      note: "四台 KRE-075 并联，推力同步与结构耦合是研制中最主要的攻关点。",
      engines: [
        {
          name: "KRE-075",
          count: 4,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 735,
          thrustSeaLevel: 735,
          thrustVacuum: 815,
          ispSeaLevel: 289,
          ispVacuum: 315,
          note: "韩国自研的 75 tf 级发动机，一级与二级共用同一型号。",
        },
      ],
    },
    {
      name: "Second Stage",
      nameZh: "第二级",
      propellant: "kerolox",
      propellantZh: "煤油 / 液氧",
      thrustVacuum: 788,
      burnTime: 148,
      dryMass: 4000,
      propellantMass: 56000,
      diameter: 3.5,
      height: 9.5,
      note: "一台 KRE-075 真空型，扩张比加大。",
      engines: [
        {
          name: "KRE-075 Vacuum",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 788,
          thrustVacuum: 788,
          ispVacuum: 315,
          note: "与一级同款发动机的真空版本。",
        },
      ],
    },
    {
      name: "Third Stage",
      nameZh: "第三级",
      propellant: "kerolox",
      propellantZh: "煤油 / 液氧",
      thrustVacuum: 68.6,
      burnTime: 521,
      dryMass: 1300,
      propellantMass: 12700,
      diameter: 2.6,
      height: 4.5,
      note: "一台 KRE-007；2021 年首飞时因氦气瓶支架松脱导致提前关机。",
      engines: [
        {
          name: "KRE-007",
          count: 1,
          cycle: "gas-generator",
          cycleZh: "燃气发生器循环",
          propellant: "kerolox",
          thrust: 68.6,
          thrustVacuum: 68.6,
          ispVacuum: 325,
          note: "7 tf 级小推力发动机，负责最终入轨。",
        },
      ],
    },
  ],

  payloadLEO: 2600,
  payloadSSO: 1500,
  reusable: false,
  humanRated: false,

  description:
    "韩国第一款完全自研的运载火箭：从发动机到贮箱到飞控全部国产，用了十二年，让韩国成为第七个能自主发射一吨级载荷的国家。",

  history: `世界号的前身叫**罗老号（KSLV-I）**，那是一次教训。

2000 年代韩国与俄罗斯合作研制罗老号：**第一级直接由俄罗斯赫鲁尼切夫提供**（实际上就是安加拉 URM-1 的一个变体），韩国只做第二级固体级与总体集成。合同还规定俄方不转让一级的设计资料。

结果是：2009 年首飞失败（整流罩未分离），2010 年第二次失败（一二级分离前爆炸），2013 年第三次才成功。**而且成功之后韩国依然造不出第一级。**

**KSLV-II「世界号」的立项前提就是这次经验：全部自研，尤其是发动机。**

研制从 2010 年开始，核心是 **KRE-075 发动机**。韩国之前从未造过大推力液体火箭发动机，从燃烧室冷却、涡轮泵设计到燃烧稳定性，全部要从零建立。为此建了新的试车台，累计试车超过 180 次、总时长超过 18,000 秒。

**2021 年 10 月 21 日首飞**：一级、二级工作正常，第三级提前 46 秒关机，载荷（1.5 t 配重）达到了 700 km 高度但速度不足，未能入轨。

调查结论很有教育意义：第三级液氧贮箱内的一个**氦气瓶固定支架**在飞行中松脱。原因是设计时只校核了地面 1g 与飞行轴向过载，**没有考虑到飞行中浮力的方向会反转**——氦气瓶在液氧里受浮力，而火箭加速时这个"等效重力"方向与地面相反，支架受到的是设计时未预期的载荷方向。

**2022 年 6 月 21 日第二次发射成功**，把一颗 162.5 kg 的性能验证卫星与四颗立方星送入 700 km 太阳同步轨道。**韩国成为第七个用自研火箭把 1 t 级载荷送入轨道的国家**（前六个是苏俄、美、欧、中、日、印）。

2023 年 5 月第三次发射成功，首次携带商业客户的卫星。此后韩国把火箭的生产逐步移交给民营企业**韩华宇航**，走的是与美国类似的「政府研制、企业运营」路线。`,

  designPhilosophy: `世界号的设计逻辑几乎全部围绕一个词：**自主。**

它没有任何一处技术是最先进的：燃气发生器循环（不是分级燃烧）、煤油/液氧（不是甲烷）、一次性（不可回收）、三级串联（没有捆绑）。**这些选择的共同点是「已被充分验证、研制风险可控」。**

对一个从零开始的国家来说，这是唯一理性的路径。

**最重要的设计决策是「一款发动机用在两级上」。**

KRE-075 有两个版本：一级用海平面型（四台并联），二级用真空型（一台，扩张比加大）。除喷管外，涡轮泵、燃烧室、供给系统基本相同。

好处很直接：

- **研制投入减半。**只需要把一款发动机做成熟。
- **试车数据可共享。**一级的每一次试车都在为二级积累置信度。
- **产量翻倍。**一枚火箭需要 5 台 KRE-075，产量是「只用在一级」的 1.25 倍以上。

代价是**两级的工况都不是最优**。一级发动机的推力（735 kN）对一枚 200 t 的火箭来说偏小，所以要用四台；二级用一台又略显推力过大（推重比高会带来过载与结构负担）。**这是典型的「用性能换研制确定性」。**

**第二个决策是四机并联而不是单台大推力机。**

同样的逻辑：造一台 3,000 kN 的发动机，难度不是 735 kN 那台的四倍，而是数量级的差别（燃烧不稳定、涡轮泵功率、冷却）。四台并联的难点在于推力同步、底部热环境与结构耦合，这些问题更"工程化"，可以靠试验解决。

**这个选择也带来了一个副产品：** 韩国因此获得了多机并联的飞控经验，这是未来做可回收火箭的必要基础。

**世界号最实在的意义不在性能，而在它证明了一件事：** 一个此前没有任何大推力液体发动机经验的国家，用十二年和相对有限的预算（约 20 亿美元），可以走完从发动机试车台到入轨的全过程。**对比罗老号那条「买第一级」的路——十年过去，什么也没留下。**`,

  tradeoffs: [
    {
      question: "买第一级和自己造第一级，差别有多大？",
      answer: `差别是「有没有能力」和「有没有一枚火箭」的区别，韩国用两个项目把这件事演示得非常清楚。

**罗老号（KSLV-I，2002–2013）：**

- 第一级由俄罗斯提供（安加拉 URM-1 的变体），合同明确不转让设计资料；
- 韩国负责第二级（固体）与总体集成；
- 三次发射，两次失败，第三次成功。

**成功之后韩国得到了什么？**一次入轨记录，以及一些总体设计与发射操作的经验。**它没有得到造第一级的能力**——那部分是黑箱。项目结束后，韩国如果还想发射，仍然要买。

**世界号（KSLV-II，2010–）：**

- 全部自研，尤其是 KRE-075 发动机；
- 建了自己的发动机试车台，累计试车 180 余次、18,000 余秒；
- 首飞失败一次，第二次成功。

**成功之后韩国得到了什么？**一支能设计、制造、试验大推力液体发动机的队伍；一套试车与验证的设施；一条从贮箱成形到总装的工业链。**这些东西可以支撑下一款火箭，而买来的第一级不能。**

**这个对比揭示了航天技术转让的一个基本事实：可以买到产品，很难买到能力。**

原因在于火箭发动机的知识大部分是**隐性的**：什么样的焊缝算合格、什么样的振动信号意味着要停车、喷注器孔的加工偏差在什么范围内可接受——这些不在图纸上，在人的经验和试车记录里。

印度的经历也印证了这一点：1993 年俄罗斯在美国压力下取消氢氧上面级的技术转让，只卖成品发动机。**印度靠那几台成品飞了几次，但要真正拥有这个能力，还是用了近二十年自研 CE-20。**

**「买」能解决一时的任务，「造」才解决长期的存在。**`,
    },
    {
      question: "一个氦气瓶支架，怎么会让整枚火箭失败？",
      answer: `因为它松脱后在液氧贮箱里变成了一个自由运动的高压容器，把箱底撞破了。

事情的物理过程是这样的：

1. 第三级的液氧贮箱内浸泡着几个**高压氦气瓶**（用于贮箱增压）。把气瓶放在低温推进剂里是常见做法——氦被冷却后密度上升，同样体积能装更多，气瓶可以做得更小。
2. 气瓶靠支架固定在贮箱内。支架的设计载荷考虑了地面 1g 与飞行中的轴向过载。
3. **但设计没有充分考虑浮力方向的反转。**气瓶在液氧里受浮力。在地面上，浮力向上；在飞行中，火箭加速产生的等效重力方向与地面相反，浮力也随之反向，而且量级随过载放大——第三级工作末段的轴向过载可以达到 4–5g，浮力也放大到 4–5 倍。
4. 支架在这个未预期方向的载荷下松脱。气瓶在箱内自由移动，撞击箱壁，最终导致液氧贮箱下封头破裂。
5. 氧化剂泄漏，混合比失衡，第三级发动机在推进剂耗尽前 46 秒关机。
6. 载荷达到了 700 km 高度，但速度只有约 6.3 km/s，差 1.5 km/s 未能入轨。

**这个失效模式的教训不在于「支架强度不够」，而在于「载荷工况没有被完整枚举」。**

火箭上的每一个零件都要针对一组**载荷工况**做校核：地面运输、竖立、加注、点火冲击、跨声速抖振、级间分离、各飞行段的过载。**漏掉一个工况，强度算得再准也没用。**

类似的案例在航天史上反复出现：

- 阿丽亚娜 5 首飞（1996）：复用的惯性导航软件在新火箭的飞行剖面下发生整数溢出——**新的工况超出了旧软件的验证范围。**
- 哥伦比亚号（2003）：泡沫脱落是已知现象，但「泡沫撞击 RCC 面板」这个工况从未被当作会致命的情形分析过。

**这类失效的共同点是：每个部件单独看都是合格的，问题出在没有人问「在这个特定条件下会怎样」。**这也是为什么飞行试验无法被仿真完全替代——**仿真只能验证你想到的工况。**`,
    },
  ],

  contemporaries: `**Electron**（新西兰/美国）与它的运力接近（0.32 t vs 1.5 t SSO），但商业模式完全不同：Electron 是私营公司面向商业市场，世界号是国家项目建立自主能力。

**Vega-C**（欧洲）在 SSO 运力上与它同级（2.3 t vs 1.5 t），同样以本国/本地区机构任务为主。

**H-IIA / H3**（日本）代表东亚另一条路径：日本在 1970 年代先引进美国技术，再逐步自研；韩国则在罗老号的教训后直接选择全自研。**两条路都走通了，但日本用了三十年，韩国用了十二年——后发者可以跳过一些弯路，前提是愿意在发动机上从头投入。**

**长征系列**（中国）的起点相似（自研为主、从中小型起步），但发展路径长得多，如今的规模不可同日而语。**世界号今天的位置，大致相当于中国 1980 年代的长征二号。**`,

  milestones: [
    { date: "2013-01-30", title: "罗老号第三次发射成功", note: "第一级来自俄罗斯，韩国未获得设计资料。" },
    { date: "2010-03", title: "KSLV-II 立项", note: "确定全部自研，核心是 KRE-075 发动机。" },
    { date: "2018-11-28", title: "试验型火箭亚轨道飞行", note: "单台 KRE-075 的第二级验证飞行，工作 151 秒。" },
    { date: "2021-10-21", title: "首飞", note: "第三级氦气瓶支架松脱导致提前关机，载荷未入轨。" },
    { date: "2022-06-21", title: "第二次发射成功", note: "韩国成为第七个自主发射 1 t 级载荷入轨的国家。" },
    { date: "2023-05-25", title: "第三次发射成功", note: "首次搭载商业客户卫星，生产逐步移交韩华宇航。" },
  ],

  launches: {
    total: 4,
    success: 3,
    failure: 1,
    asOf: "2025-06-30",
    notable: [
      { date: "2021-10-21", name: "首飞", note: "配重块达到 700 km 但速度不足 1.5 km/s。" },
      { date: "2022-06-21", name: "第二次飞行", note: "性能验证卫星与四颗立方星入轨。" },
      { date: "2023-05-25", name: "第三次飞行", note: "首次携带实用载荷与商业卫星。" },
    ],
  },

  variants: [
    { name: "KSLV-II 基本型", note: "三级构型，SSO 1.5 t。" },
    { name: "KSLV-III（规划）", note: "更大运力的后续型号，规划中包含可回收技术验证与月球任务能力。" },
  ],
  relatedRockets: ["electron", "vega-c", "h-iia", "long-march-7"],
  principles: ["staging-and-rocket-equation", "propellants-and-cycles"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 47.2 m 总高、3.5 m 一二级直径与三级串联构型复原。",
  }),

  sources: [
    {
      title: "KSLV-II Nuri — KARI",
      url: "https://www.kari.re.kr/eng.do",
      publisher: "Korea Aerospace Research Institute",
      confidence: "high",
      note: "各级参数、发动机推力与运力。",
    },
    {
      title: "Nuri First Flight Investigation Result",
      url: "https://www.msit.go.kr/",
      publisher: "韩国科学技术信息通信部",
      confidence: "high",
      note: "首飞第三级提前关机的失效机理（氦气瓶支架与浮力方向）。",
    },
    {
      title: "Nuri (KSLV-II) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Nuri_(rocket)",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录与研制预算；部分参数为公开报道口径。",
    },
  ],

  tags: ["中小型运载", "煤油液氧", "自主研制", "韩国"],
};
