import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, band, flag, text } from "../livery";

/** 按 Atlas V 551 构型（五枚固推 + 5 m 长整流罩）建模，这是运力最大的一档。 */
const g = rocketGeometry()
  .at(0, {
    id: "rd-180",
    name: "RD-180 发动机",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3.6,
    radius: 1.905,
    nozzles: { count: 2, bellRadius: 0.71, bellHeight: 2.7, ringRadius: 0.78 },
    description:
      "一台泵、两个燃烧室——俄制 RD-180 是 RD-170（能源号用的四燃烧室怪物）砍掉一半的产物。它用**富氧分级燃烧循环**，室压 257 bar，海平面比冲 311 s，比同期美国煤油机高出整整 40 s。美国在 1990 年代买下它的原因很简单：自己没有，而且从头研制要十年。**这台发动机后来成了美国国家安全发射体系里最尴尬的一环。**",
  })
  .at(3.6, {
    id: "ccb",
    name: "通用芯级 CCB",
    nameEn: "Common Core Booster",
    group: "stage-1",
    shape: "cylinder",
    finish: "painted-white",
    // 通用芯级白漆，尾裙深灰；ULA 蓝色型号字样与星条旗在同一带上
    livery: [
      band(0.0, 0.05, PAINT.darkGrey),
      text("ATLAS V", PAINT.ulaBlue, 0.72, 0.9),
      flag("us", 0.55, 0.9),
    ],
    height: 29.5,
    radius: 1.905,
    description:
      "3.81 m 直径的等径铝合金结构贮箱。注意它是**等径的、有结构强度的**——这一点与它的祖先 Atlas 系列彻底决裂：早期 Atlas 用的是靠内压维持形状的「气球贮箱」，空箱时不加压就会像易拉罐一样瘪掉。Atlas V 放弃了这个传承四十年的绝技，换成常规结构，因为气球贮箱无法承受捆绑固体助推器带来的非对称载荷。",
  })
  .at(0.9, {
    id: "srb-nozzle",
    name: "AJ-60A 固推喷管（最多 5 枚）",
    group: "booster",
    shape: "engines",
    finish: "engine-metal",
    height: 1.8,
    radius: 0.79,
    cluster: { count: 5, offset: 2.86, phase: 18 },
    nozzles: { count: 1, bellRadius: 0.7, bellHeight: 1.6 },
    description:
      "固推喷管固定不摆，推力矢量控制全靠 RD-180。这带来一个特别的现象：**五枚固推不是均匀分布的。**Atlas V 的助推器安装位是三个，五枚时呈非对称排布，起飞后靠 RD-180 持续偏转来配平——**这是把结构上的方便留给自己、把控制上的麻烦交给发动机的典型交换。**",
  })
  .at(2.7, {
    id: "srb-body",
    name: "AJ-60A 固体助推器",
    group: "booster",
    shape: "cylinder",
    finish: "solid-booster",
    height: 17.3,
    radius: 0.79,
    description:
      "单枚推力 1,688 kN、长 20 m，是当时飞行过的最大单段固体助推器。装 0 至 5 枚，运力从 9.8 t 连续覆盖到 18.9 t——**Atlas V 的三位数编号（如 551）就是「整流罩直径 5 m / 固推 5 枚 / 上面级 1 台发动机」。**这套编号本身就是模块化思路的说明书。",
    cluster: { count: 5, offset: 2.86, phase: 18 },
  })
  .at(20, {
    id: "srb-nose",
    name: "固推头锥",
    group: "booster",
    shape: "cone",
    finish: "solid-booster",
    height: 2.6,
    radius: 0.79,
    cluster: { count: 5, offset: 2.86, phase: 18 },
    description: "锥形头锥内含分离火工品；固推在 T+94 s 左右分两批抛离，避开芯级。",
  })
  .at(33.1, {
    id: "boattail",
    name: "级间过渡段",
    group: "stage-2",
    shape: "frustum",
    finish: "painted-white",
    height: 3.2,
    radius: 1.905,
    radiusTop: 2.69,
    description: "从 3.81 m 芯级过渡到 5.4 m 整流罩的扩张段。5 m 构型里整流罩把半人马座上面级整个包在里面，是少见的「全包式」布局。",
  })
  .at(34.5, {
    id: "centaur",
    name: "半人马座上面级",
    nameEn: "Centaur III",
    group: "stage-3",
    shape: "cylinder",
    finish: "stainless",
    height: 12.7,
    radius: 1.52,
    internal: true,
    description:
      "**人类第一款氢氧上面级，1962 年首飞，至今仍在服役——这是所有航天器里最长的连续服役谱系之一。**它保留了气球贮箱：0.5 mm 厚的不锈钢蒙皮，全靠内压维持形状，空箱结构质量比接近 1:20。半人马座能在轨滑行数小时、多次重启，这是深空探测器直接注入所需要的能力：新视野号、朱诺号、好奇号、毅力号、露西号全部由它送出地球。",
  })
  .at(36.3, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "cylinder",
    finish: "painted-white",
    livery: band(0.02, 0.05, PAINT.ulaBlue),
    height: 15,
    radius: 2.69,
    description: "5.4 m 外径的复合材料整流罩，有 20.7 / 23.4 / 26.5 m 三档长度。另有 4 m 直径的金属整流罩构型，用于较小载荷。",
  })
  .at(51.3, {
    id: "fairing-nose",
    name: "整流罩头锥",
    group: "payload",
    shape: "ogive",
    finish: "painted-white",
    height: 10.9,
    radius: 2.69,
    description: "卵形头锥。星际飞行任务里，载荷在这里面等待的最后几分钟，是它一生中唯一被大气包围的时刻。",
  });

export const atlasV: Rocket = {
  slug: "atlas-v",
  name: "Atlas V",
  nameZh: "宇宙神五号",
  country: "United States",
  countryZh: "美国",
  agency: ["United Launch Alliance (ULA)", "Lockheed Martin"],
  family: "atlas",
  status: "active",
  firstFlight: "2002-08-21",

  height: 62.2,
  diameter: 3.81,
  span: 7.5,
  mass: 587000,
  stageCount: 2,

  stages: [
    {
      name: "Common Core Booster + 5 × AJ-60A",
      nameZh: "通用芯级 + 五枚固体助推器",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustSeaLevel: 12267,
      thrustVacuum: 13300,
      burnTime: 253,
      dryMass: 21054,
      propellantMass: 284089,
      diameter: 3.81,
      height: 32.5,
      note: "固推在 T+94 s 前后分批抛离，芯级继续工作至 T+253 s。",
      engines: [
        {
          name: "RD-180",
          count: 1,
          cycle: "staged-combustion",
          cycleZh: "富氧分级燃烧循环",
          propellant: "kerolox",
          thrust: 3827,
          thrustSeaLevel: 3827,
          thrustVacuum: 4152,
          ispSeaLevel: 311.3,
          ispVacuum: 337.8,
          note: "一台涡轮泵驱动两个燃烧室；室压 257 bar，可节流至 47%。",
        },
        {
          name: "AJ-60A",
          count: 5,
          cycle: "solid",
          cycleZh: "固体",
          propellant: "solid",
          thrust: 1688,
          thrustSeaLevel: 1688,
          ispVacuum: 279,
          note: "单段固体助推器，可装 0–5 枚，喷管固定不摆。",
        },
      ],
    },
    {
      name: "Centaur III (SEC)",
      nameZh: "半人马座上面级",
      propellant: "hydrolox",
      propellantZh: "液氢 / 液氧",
      thrustVacuum: 106,
      burnTime: 842,
      dryMass: 2247,
      propellantMass: 20830,
      diameter: 3.05,
      height: 12.68,
      note: "不锈钢气球贮箱，可多次重启并长时间滑行，负责深空探测器的直接注入。",
      engines: [
        {
          name: "RL10C-1",
          count: 1,
          cycle: "expander",
          cycleZh: "膨胀循环",
          propellant: "hydrolox",
          thrust: 106,
          thrustVacuum: 106,
          ispVacuum: 449.7,
          note: "RL10 家族服役已逾六十年，是飞行时间最长的液体火箭发动机型号。",
        },
      ],
    },
  ],

  payloadLEO: 18850,
  payloadGTO: 8900,
  reusable: false,
  humanRated: true,

  description:
    "美国二十年间最可靠的一次性运载火箭，用一台俄制发动机把国家安全载荷送上天——直到这件事本身变成了不可接受的风险。",

  history: `Atlas V 与 Delta IV 是同一份合同（1990 年代的 **EELV 计划**）催生的两个竞争方案。洛克希德·马丁的思路与波音相反：**不追求新技术，只追求把现成的最好零件拼起来。**

一级发动机直接买俄罗斯的。1990 年代苏联解体后，能源机械联合体（NPO Energomash）手里握着西方拿不出的东西——**富氧分级燃烧循环**。西方长期认为高压富氧燃气会把涡轮和管路烧穿，这个「不可能」被苏联人用一层特殊的搪瓷涂层解决了。RD-180 是 RD-170 砍掉两个燃烧室的版本，性能碾压当时所有美国煤油机。

上面级直接用半人马座，一款 1962 年就首飞的氢氧级，此时已经在轨可靠工作了四十年。

结果是一枚几乎没有新技术的火箭，也因此有了近乎完美的记录：**首飞至今仅一次部分失败**（2007 年 NROL-30，半人马座提前 4 s 关机，载荷仍进入可用轨道）。它送走了新视野号、朱诺号、好奇号、毅力号、露西号、Solar Orbiter，以及波音星际客机的载人试飞。

**2014 年，克里米亚事件让 RD-180 从优势变成了负债。**美国国会在 2015 年的国防授权法案中禁止军方在 2022 年后采购使用俄制发动机的火箭。ULA 因此启动了 Vulcan：新的 BE-4 发动机、新的芯级，唯一保留的是半人马座的血统。

Atlas V 剩余的箭体已全部售出（主要给亚马逊的 Kuiper 星座与星际客机），飞完即止。**它是被地缘政治而非技术或成本终结的。**`,

  designPhilosophy: `Atlas V 的设计哲学可以概括为一句话：**在别人的最优解上做集成，而不是自己重新发明。**

这不是保守，而是一种明确的风险管理选择。一枚新火箭的风险主要集中在三处：一级发动机、上面级发动机、以及全箭的结构与控制集成。Atlas V 把前两项都换成了有大量飞行史的成熟产品：

- 一级用 RD-180——它的原型 RD-170 从 1985 年就在飞；
- 上面级用半人马座 + RL10——1962 年首飞，此时已飞了三百多次。

**唯一真正新研的是箭体本身**，而箭体是三者里最容易验证的。这个分配让 Atlas V 从首飞起就有极高的成功率。

模块化是第二条主线。三位数编号（如 401、531、551）直接编码了构型：整流罩直径、固推数量、上面级发动机数。同一条生产线，通过增减固推，把 LEO 运力从 9.8 t 连续覆盖到 18.9 t——**这让每一次任务都能买到「刚好够用」的运力，而不是被迫为多余的能力付钱。**

它放弃的东西也很明确：

- **放弃了气球贮箱**。Atlas 家族四十年的招牌绝技（靠内压维持形状的超薄不锈钢箱体）在 Atlas V 上被抛弃，因为捆绑固推带来的非对称弯矩不是气球箱能承受的。**结构效率让位于构型灵活性。**
- **放弃了自主可控**。买俄制发动机在商业上是最优解，在战略上是单点故障。这个交换在 2002 年看起来聪明，在 2014 年之后看起来是整个美国国家安全发射体系最大的漏洞。

**Atlas V 是一个关于「买 vs 造」的完整案例：买带来了二十年的可靠与便宜，也带来了一个无法在国内修复的依赖。**`,

  tradeoffs: [
    {
      question: "美国为什么要买俄罗斯的发动机？富氧分级燃烧到底难在哪？",
      answer: `富氧分级燃烧循环的思路是：让预燃室在**极度富氧**的条件下燃烧一小部分燃料，产生大量高温高压的**含氧燃气**去推动涡轮，然后把这股燃气全部送进主燃烧室继续烧。

好处是显而易见的：

- 推进剂一克不浪费（相比燃气发生器循环白扔约 3%）；
- 涡轮工质是氧化性燃气，密度大，同样功率下涡轮可以做得更小；
- 富燃分级燃烧（RS-25 那条路）会在管路里析出积碳，煤油尤其严重；富氧则没有这个问题，**这正是煤油机选择富氧、氢氧机选择富燃的根本原因**。

难在哪？**500 °C 以上的高压纯氧燃气会点燃金属本身。**镍基高温合金在这种环境里不是被「腐蚀」，而是直接燃烧——一旦局部起火，火焰会顺着管路一路烧穿整台发动机。西方在 1960–70 年代做过尝试，结论是「工程上不可行」，于是美国的煤油机路线停在了燃气发生器（F-1、梅林）。

苏联人的解法是材料学而非结构设计：在所有接触富氧燃气的表面做**扩散涂层与搪瓷保护层**，加上极其严格的清洁度控制（任何有机残留都是火种）。这套工艺没有捷径，是几十年试验积累的结果。

于是出现了 1990 年代那一幕：美国工程师到希姆基（Khimki）参观时，普遍不相信 RD-170 的公开参数是真的，直到亲眼看到试车。**买 RD-180 不是省钱，是买一段美国当时无法用金钱在短期内复现的工艺经验。**

后续的验证是：美国真正做出可用的富氧分级燃烧煤油机，是 2010 年代的 BE-4（其实是甲烷）与 AR1；从立项到首飞用了近十年。国会 2015 年划下的截止线，几乎正好是这个研制周期。`,
    },
    {
      question: "为什么五枚固体助推器不对称安装？",
      answer: `Atlas V 芯级上只有三个固推安装位，间隔并不是 120°。要装 1、2、3、4、5 枚时，分别用不同的位置组合，其中 1 枚、3 枚、5 枚的构型在气动与推力上都是**不对称**的。

正常的设计直觉是：非对称推力会产生持续的滚转与偏航力矩，必须避免。Atlas V 反其道而行，理由是一笔具体的账：

- **对称方案的代价**：要让 1–5 枚都对称，芯级上至少需要 5 个（甚至更多）安装位与配套的传力结构。这些结构在只装 1 枚固推时全是死重，而 401（无固推）构型是飞得最多的一档。
- **非对称方案的代价**：RD-180 需要持续偏转来配平。它的摆动能力本来就是为姿态控制准备的，用掉一部分权限去配平并不需要新增硬件；损失的是一点点余弦效率（推力矢量偏离轴线时，轴向分量按 $\\cos\\theta$ 打折），量级在 1% 以下。

**结论是把问题从结构域移到控制域：结构上省下的是每一次飞行都要背的质量，控制上付出的是可以用软件解决的偏转角。**

这个交换还有一个前提：RD-180 是单台大推力发动机，摆动权限充裕。如果一级是多台小发动机并联（如猎鹰 9 号），配平非对称推力的难度会大得多，这个设计就不成立了。`,
    },
    {
      question: "半人马座的气球贮箱，为什么在上面级上还留着，一级却不用了？",
      answer: `气球贮箱（balloon tank）是 1950 年代 Atlas 导弹的发明：贮箱蒙皮薄到 0.25–0.5 mm，本身没有加强桁条也没有框，全靠**内部增压**维持形状与承载能力。不加压时，箱体会在自重下瘪掉——早期 Atlas 停在厂房里必须一直接着氮气瓶。

它的收益是极致的结构效率。半人马座的干质比接近 **1:20**（2.25 t 干重装 20.8 t 推进剂），这个数字在今天仍属顶尖，而它是 1962 年的设计。

为什么一级放弃了、上面级留着？因为两者的载荷环境完全不同：

| | 一级（Atlas V CCB） | 上面级（Centaur III） |
|---|---|---|
| 弯矩来源 | 跨声速气动载荷、固推捆绑点的集中力、非对称推力 | 几乎没有——在整流罩内、在大气外 |
| 载荷方向 | 复杂多向 | 主要是轴向 |
| 是否需要挂东西 | 要挂 5 枚固推 | 不挂 |

气球箱只擅长承受**均匀轴压**。一旦有集中载荷（固推捆绑点）或大弯矩（跨声速抖振），薄蒙皮会局部失稳。Atlas V 要支持 0–5 枚固推的模块化，就必须放弃气球箱。

半人马座的工作环境恰恰相反：它在整流罩里被保护着穿过大气层，工作时周围是真空，除了自身推力几乎没有别的载荷。**在这种环境里，气球箱是最优解，而且六十年来没有出现过更优解——这是为什么火神号也继续用它（Centaur V，直径放大到 5.4 m）。**

顺带一提：氢的密度只有 71 kg/m³，上面级的贮箱体积很大而质量很轻，结构质量在总干重里占比高。因此**上面级正是结构效率收益最大的地方**——省下的每一公斤干重，几乎等量地转化成载荷。`,
    },
  ],

  contemporaries: `同门的 **Delta IV Heavy** 走的是全氢氧、三芯并联的重路线，运力更大但价格高一倍以上，2024 年退役。Atlas V 反而活得更久——**在一个成本敏感的市场里，「刚好够用而且便宜」比「性能顶尖」更有生命力。**

**猎鹰 9 号** 的 LEO 运力（一次性 22.8 t）超过 Atlas V 551，价格却不到一半，且可回收。2010 年后它逐步吃下商业市场，Atlas V 退守到国家安全与深空科学任务——这两类客户看重的是记录而非价格。

**联盟号 2.1a**（俄罗斯）是另一种「用成熟换可靠」的样本，但它的成熟来自六十年不变的设计；Atlas V 的成熟来自把不同来源的成熟部件组装起来。**两条路都能到达高可靠性，但只有后者会在供应链被切断时崩塌。**

继任者 **火神半人马座** 保留了半人马座的血统与三位数构型编号，把 RD-180 换成美国自产的 BE-4——**这枚火箭真正的技术任务，是把一条本来买来的能力搬回国内。**`,

  milestones: [
    { date: "2002-08-21", title: "首飞", note: "发射 Hot Bird 6 通信卫星。" },
    { date: "2006-01-19", title: "发射新视野号", note: "551 构型加装 Star 48B 三级，创下地球逃逸速度纪录。" },
    { date: "2007-06-15", title: "NROL-30 部分失败", note: "半人马座提前 4 s 关机，至今唯一一次未完全达标的任务。" },
    { date: "2011-11-26", title: "发射好奇号火星车", note: "541 构型；此后毅力号也由 Atlas V 发射。" },
    { date: "2015-05-20", title: "发射 X-37B（OTV-4）", note: "空军轨道试验飞行器的多次任务由它承担。" },
    { date: "2024-06-05", title: "星际客机载人试飞", note: "Atlas V 首次载人发射，构型加装应急探测系统与双发动机半人马座。" },
  ],

  launches: {
    total: 101,
    success: 100,
    partial: 1,
    failure: 0,
    asOf: "2024-12-31",
    notable: [
      { date: "2006-01-19", name: "New Horizons", note: "至今飞离地球最快的探测器发射。" },
      { date: "2011-08-05", name: "Juno", note: "木星探测器，靠地球借力抵达。" },
      { date: "2016-09-08", name: "OSIRIS-REx", note: "小行星采样返回。" },
      { date: "2020-07-30", name: "Mars 2020 / 毅力号", note: "541 构型。" },
      { date: "2024-06-05", name: "Starliner CFT", note: "首次载人。" },
    ],
  },

  variants: [
    { name: "Atlas V 401", note: "4 m 整流罩、无固推、单发上面级——飞得最多的基本型。" },
    { name: "Atlas V 541 / 551", note: "5 m 整流罩加 4 或 5 枚固推，用于火星车与深空探测。" },
    { name: "Atlas V N22", note: "无整流罩、双发半人马座，专为星际客机载人任务设计。" },
  ],
  relatedRockets: ["vulcan-centaur", "delta-iv-heavy", "falcon-9", "angara-a5"],
  principles: ["propellants-and-cycles", "staging-and-rocket-equation"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 ULA 用户手册的 551 构型复原：62.2 m 总高、3.81 m 芯级、5.4 m 整流罩、五枚 AJ-60A。涂装：白漆箭体、深灰尾裙、不锈钢半人马座裸箱，型号字样为 ULA 蓝。",
  }),

  sources: [
    {
      title: "Atlas V Launch Services User's Guide",
      url: "https://www.ulalaunch.com/docs/default-source/rockets/atlasvusersguide2010a.pdf",
      publisher: "United Launch Alliance",
      confidence: "high",
      note: "尺寸、质量、各构型运力与整流罩包络。",
    },
    {
      title: "RD-180 Engine Data Sheet",
      url: "https://www.npoenergomash.ru/",
      publisher: "NPO Energomash",
      confidence: "high",
      note: "推力、比冲、室压与节流范围。",
    },
    {
      title: "Assessment of Atlas V and Delta IV Engine Supply",
      url: "https://www.gao.gov/",
      publisher: "U.S. Government Accountability Office",
      confidence: "high",
      note: "RD-180 采购限制与 Vulcan 转型的政策背景。",
    },
    {
      title: "Atlas V — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Atlas_V",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射次数统计随统计口径与截止日期略有差异。",
    },
  ],

  tags: ["模块化", "俄制发动机", "深空探测", "高可靠", "载人"],
};
