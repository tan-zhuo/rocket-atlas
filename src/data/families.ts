import type { Family } from "./types";
import { FAMILIES_MORE } from "./families-more";

/**
 * 火箭家族 —— 谱系视角的组织单位。
 * `lineage` 可以包含本站尚未收录的型号（无 slug），以保持演进链条完整。
 */
const FAMILIES_CORE: Family[] = [
  {
    slug: "a-series",
    name: "Aggregat (A-series)",
    nameZh: "A 系列",
    countryZh: "德国",
    summary: `佩内明德的 A 系列是所有现代运载火箭的共同祖先。从 1933 年的 A1 到 1942 年的 A4（即 V-2），它在十年内把液体火箭从业余爱好推进到工业规模，并第一次把泵压式发动机、再生冷却、惯性制导与推力矢量控制这四件事同时做成。

战后这条谱系分叉成两支：美国的 Redstone → Jupiter → Juno，以及苏联的 R-1 → R-2 → R-5 → R-7。**今天所有在飞的运载火箭，技术血缘上都能追回到这里。**`,
    lineage: [
      { name: "A1 / A2 / A3", years: "1933–1937", note: "试验型，验证陀螺稳定与液体发动机。" },
      { name: "A5", years: "1938–1942", note: "A4 的缩比验证弹，飞行超过 25 次。" },
      { name: "A4 (V-2)", years: "1942–1952", note: "第一枚大型液体弹道导弹，第一个进入太空的人造物体。", slug: "v-2" },
      { name: "A4b / A9 / A10", years: "1944–1945", note: "增程与两级方案，仅少量试飞或停留在图纸上。" },
      { name: "Bumper", years: "1948–1950", note: "V-2 + WAC Corporal，首次实用的两级火箭飞行。" },
      { name: "R-1 (苏联仿制)", years: "1948–1955", note: "科罗廖夫团队的起点。" },
      { name: "Redstone (美国)", years: "1953–1964", note: "冯·布劳恩团队在美国的第一款导弹，后来送谢泼德进入亚轨道。" },
    ],
    members: ["v-2"],
    related: ["r-7", "saturn"],
  },
  {
    slug: "r-7",
    name: "R-7 family",
    nameZh: "R-7 家族",
    countryZh: "苏联 / 俄罗斯",
    summary: `人类历史上发射次数最多、服役时间最长的火箭家族：从 1957 年的第一枚洲际导弹算起，累计发射超过 1,900 次，至今仍在飞。

它的基本构型——四枚锥形助推器围绕一根芯级、全部在地面点火——诞生于「当时无法可靠实现空中点火」这个技术空白。空白早已被填上，构型却因为过于成熟而从未被替换。七十年间变的是控制系统、上面级和制造工艺，不变的是 2.95 m 的芯级直径和四燃烧室发动机。

**它同时是「演进优于革命」这一工程哲学最成功的证明，和这条路线天花板的最好例证。**`,
    lineage: [
      { name: "R-7 / 8K71PS", years: "1957–1958", note: "首枚洲际导弹与首枚卫星运载器。", slug: "r-7" },
      { name: "Luna (8K72)", years: "1958–1960", note: "增加 Blok-E 上面级，用于月球探测。" },
      { name: "Vostok (8K72K)", years: "1960–1991", note: "加加林的座驾，首次载人航天。" },
      { name: "Molniya (8K78)", years: "1960–2010", note: "四级构型，用于大椭圆轨道与行星际探测。" },
      { name: "Voskhod (11A57)", years: "1963–1976", note: "载人与侦察卫星发射。" },
      { name: "Soyuz (11A511)", years: "1966–1976", note: "联盟飞船专用载人型。" },
      { name: "Soyuz-U", years: "1973–2017", note: "发射 786 次，单一型号世界纪录。" },
      { name: "Soyuz-FG", years: "2001–2019", note: "载人主力，直到被 Soyuz-2.1a 取代。" },
      { name: "Soyuz-2 (.1a/.1b/.1v)", years: "2004–", note: "数字控制系统的现役型号。", slug: "soyuz-2" },
    ],
    members: ["r-7", "soyuz-2"],
    related: ["a-series"],
  },
  {
    slug: "saturn",
    name: "Saturn",
    nameZh: "土星系列",
    countryZh: "美国",
    summary: `为阿波罗计划定制的运载火箭系列，也是历史上唯一一个「先确定任务、再倒推火箭规模」的重型型号谱系。

Saturn I 与 IB 验证了氢氧上面级与大直径箭体，Saturn V 则把这些能力放大到 140 t LEO。它的生命周期极短——1967 年首飞、1970 年停产、1973 年末次飞行——因为它服务的政治目标一旦达成，就再也没有任务需要它。

**Saturn V 至今仍是成功入轨的最大运载火箭，也是唯一把人送出近地轨道的型号。**`,
    lineage: [
      { name: "Saturn I", years: "1961–1965", note: "八台 H-1 并联的一级 + 氢氧二级，验证性飞行 10 次。" },
      { name: "Saturn IB", years: "1966–1975", note: "用 S-IVB 作二级，发射阿波罗 7 号、天空实验室乘员组与阿波罗-联盟。" },
      { name: "Saturn V", years: "1967–1973", note: "三级重型构型，13 次发射。", slug: "saturn-v" },
      { name: "Saturn INT-21", years: "1973", note: "两级构型，发射天空实验室。" },
      { name: "Nova / MLV 方案", years: "1961–1968", note: "更大规模的后续方案，全部未实施。" },
    ],
    members: ["saturn-v"],
    related: ["starship", "a-series"],
  },
  {
    slug: "delta",
    name: "Delta",
    nameZh: "德尔塔系列",
    countryZh: "美国",
    summary: `从 1960 年的 Thor-Delta 到 2024 年的 Delta IV Heavy，Delta 家族横跨 64 年、发射超过 380 次，是西方服役时间最长的火箭谱系。

它的演进路线是典型的美国式渐进：以中程导弹 Thor 为一级起步，不断更换上面级、加装固体助推器、加粗箭体，直到 Delta IV 完全重新设计为全氢氧构型。而正是这次彻底重新设计，让它失去了成本优势——**Delta IV 在技术上是家族最强的，在经济上却是最失败的。**`,
    lineage: [
      { name: "Thor-Delta", years: "1960–1962", note: "以 Thor 中程导弹为一级，发射了首颗商业通信卫星 Telstar。" },
      { name: "Delta A–N / 2000 系列", years: "1962–1981", note: "持续换装上面级与固体助推器的十余种改型。" },
      { name: "Delta II", years: "1989–2018", note: "GPS 星座与火星探测器的主力，155 次发射中仅 2 次失败。" },
      { name: "Delta III", years: "1998–2000", note: "三次发射两次失败的短命型号。" },
      { name: "Delta IV Medium", years: "2002–2019", note: "全氢氧单芯构型，因成本过高退役。" },
      { name: "Delta IV Heavy", years: "2004–2024", note: "三芯并联重型构型。", slug: "delta-iv-heavy" },
    ],
    members: ["delta-iv-heavy"],
    related: ["vulcan"],
  },
  {
    slug: "ariane",
    name: "Ariane",
    nameZh: "阿丽亚娜系列",
    countryZh: "欧洲",
    summary: `欧洲为摆脱对美国发射服务的依赖而建立的自主运载体系。1973 年立项，1979 年首飞，此后四十余年间 Ariane 系列一直是欧洲进入太空的唯一途径。

Ariane 1–4 是渐进演化的可贮存推进剂火箭；Ariane 5 是一次彻底重新设计（氢氧芯级 + 固体助推），并靠「GTO 双星发射」的商业模式在 2000 年代占据了全球商业发射的半壁江山；Ariane 6 则是对 Falcon 9 冲击的迟到回应。

**这个家族的每一次代际更替都伴随着长达十年的研制周期——这正是它在快速变化的市场中始终慢半拍的结构性原因。**`,
    lineage: [
      { name: "Ariane 1", years: "1979–1986", note: "三级可贮存推进剂火箭，GTO 1.8 t。" },
      { name: "Ariane 2 / 3", years: "1984–1989", note: "加装固体助推器，GTO 提升至 2.7 t。" },
      { name: "Ariane 4", years: "1988–2003", note: "六种助推器配置的模块化型号，116 次发射中 113 次成功。" },
      { name: "Ariane 5", years: "1996–2023", note: "氢氧芯级 + 固体助推，双星发射的商业支柱。", slug: "ariane-5" },
      { name: "Ariane 6", years: "2024–", note: "两种助推器配置，上面级可重启，目标是降低单次成本。" },
      { name: "Vega / Vega-C", years: "2012–", note: "小型固体运载火箭，与 Ariane 互补。" },
    ],
    members: ["ariane-5"],
    related: ["vulcan", "delta"],
  },
  {
    slug: "long-march-2",
    name: "Long March 2 series",
    nameZh: "长征二号系列",
    countryZh: "中国",
    summary: `源自东风五号洲际导弹的中国第一代实用运载火箭谱系，全部使用四氧化二氮/偏二甲肼可贮存推进剂、3.35 m 箭体直径。

这个家族最重要的分支是载人型 **长征二号F**：在长二捆（CZ-2E）的基础上增加逃逸塔与故障检测系统，自 1999 年起承担全部神舟任务，保持 100% 成功率。

尽管技术上已属于「上一代」（有毒推进剂、比冲偏低、不可回收），长征二号系列因其极高的成熟度而仍在大量使用——**在载人航天这个领域，可预测性的价值高于先进性。**`,
    lineage: [
      { name: "CZ-2 / 2C", years: "1974–", note: "源自东风五号，返回式卫星与商业发射的主力。" },
      { name: "CZ-2D", years: "1992–", note: "上海航天研制的改进型，SSO 任务主力。" },
      { name: "CZ-2E（长二捆）", years: "1990–1995", note: "首次采用捆绑助推器，为载人型奠定基础。" },
      { name: "CZ-2F", years: "1999–", note: "载人构型，带逃逸塔与故障检测系统。", slug: "long-march-2f" },
      { name: "CZ-2F/G", years: "2011–2016", note: "无逃逸塔的空间实验室发射构型。" },
    ],
    members: ["long-march-2f"],
    related: ["long-march-new"],
  },
  {
    slug: "long-march-new",
    name: "New-generation Long March",
    nameZh: "新一代长征系列",
    countryZh: "中国",
    summary: `2000 年代启动的中国运载火箭全面换代计划：用无毒的液氧煤油与液氢液氧取代偏二甲肼，用模块化的 5 m / 3.35 m / 2.25 m 箭体与 YF-100 / YF-77 / YF-75D 三型发动机组合出覆盖全运力谱系的型号。

它的核心不是任何单一火箭，而是**一套共用的发动机与模块体系**：YF-100 同时用于长征五号的助推器、长征六号一级、长征七号一二级和长征八号，一款发动机支撑起整个新一代谱系。

这次换代还改变了中国航天的地理格局——5 m 直径超出铁路限界，直接催生了天津总装基地与海南文昌发射场。`,
    lineage: [
      { name: "CZ-6", years: "2015–", note: "小型 SSO 运载火箭，新一代首飞型号。" },
      { name: "CZ-11", years: "2015–", note: "固体快速响应型，可海上发射。" },
      { name: "CZ-5 / 5B", years: "2016–", note: "重型旗舰，LEO 25 t。", slug: "long-march-5" },
      { name: "CZ-7 / 7A", years: "2016–", note: "全煤油中型主力，货运飞船与高轨任务。" },
      { name: "CZ-8 / 8A", years: "2020–", note: "面向商业市场的中型火箭，规划回收能力。" },
      { name: "CZ-10 / 10A", years: "在研", note: "新一代载人与登月火箭，规划一级回收。" },
    ],
    members: ["long-march-5"],
    related: ["long-march-2", "zhuque"],
  },
  {
    slug: "falcon",
    name: "Falcon",
    nameZh: "猎鹰系列",
    countryZh: "美国",
    summary: `SpaceX 的煤油火箭家族，也是第一个把「轨道级一级回收复用」从演示变成日常操作的谱系。

从 2006 年失败的 Falcon 1 到 2018 年定型的 Falcon 9 Block 5，这条路线的核心不是某项技术突破，而是**一个关于发射市场规模的商业押注**：只有当发射频率足够高时，回收才划算；而只有自己创造需求（Starlink），频率才可能足够高。

到 2024 年，Falcon 系列单一年度的发射次数超过了历史上任何国家的年度总和。`,
    lineage: [
      { name: "Falcon 1", years: "2006–2009", note: "五次发射两次成功，SpaceX 的生存之战。" },
      { name: "Falcon 9 v1.0", years: "2010–2013", note: "首个构型，尚无回收硬件。" },
      { name: "Falcon 9 v1.1", years: "2013–2016", note: "拉长箭体、Octaweb 布局、加装着陆腿。" },
      { name: "Falcon 9 Full Thrust", years: "2015–2018", note: "过冷推进剂，首次成功回收一级。" },
      { name: "Falcon 9 Block 5", years: "2018–", note: "为高频复用定型的最终版本。", slug: "falcon-9" },
      { name: "Falcon Heavy", years: "2018–", note: "三芯并联，LEO 63.8 t。" },
    ],
    members: ["falcon-9"],
    related: ["starship", "new-glenn"],
  },
  {
    slug: "starship",
    name: "Starship",
    nameZh: "星舰系列",
    countryZh: "美国",
    summary: `SpaceX 的全复用超重型运输系统，也是第一个把「两级都必须回来」和「在轨加注」同时作为设计前提的轨道运载器。

它的构型经历了多轮重大修改：2016 年的 ITS（12 m 直径、碳纤维）→ 2017 年的 BFR（9 m）→ 2018 年底改用不锈钢。每一次修改都指向同一个目标——把单位发射成本降低一到两个数量级。

截至目前尚未完成入轨 + 回收的完整任务，但已实现发射塔捕获一级助推器。`,
    lineage: [
      { name: "Starhopper", years: "2019", note: "单发动机验证机，完成 150 m 悬停跳跃。" },
      { name: "SN5 – SN15", years: "2020–2021", note: "验证腹部再入与翻身着陆，第五次尝试成功。" },
      { name: "Starship V1 (IFT 1–6)", years: "2023–2024", note: "轨道级整合试飞，实现热分离与塔臂捕获。", slug: "starship" },
      { name: "Starship V2 / V3", years: "在研", note: "加长贮箱、Raptor 3，目标运力 150–200 t。" },
      { name: "Starship HLS", years: "在研", note: "NASA Artemis 月面着陆器构型。" },
    ],
    members: ["starship"],
    related: ["falcon", "saturn"],
  },
  {
    slug: "new-glenn",
    name: "New Glenn",
    nameZh: "新格伦",
    countryZh: "美国",
    summary: `Blue Origin 的重型可回收火箭家族，以 7 m 直径、超大整流罩和「一级甲烷 + 二级氢氧」的双推进剂架构为特征。

公司信条 *Gradatim Ferociter*（循序渐进、勇往直前）定义了它的节奏：先用亚轨道的 New Shepard 积累二十年，再一步跨到轨道级。首飞即入轨、第二飞即回收一级，验证了这条慢路线的另一种回报。`,
    lineage: [
      { name: "New Shepard", years: "2015–", note: "亚轨道可复用飞行器，验证 BE-3 发动机与垂直着陆。" },
      { name: "New Glenn", years: "2025–", note: "两级构型，LEO 45 t，一级可回收。", slug: "new-glenn" },
      { name: "Blue Moon", years: "在研", note: "月面着陆器，与 New Glenn 配套。" },
    ],
    members: ["new-glenn"],
    related: ["falcon", "vulcan"],
  },
  {
    slug: "vulcan",
    name: "Vulcan",
    nameZh: "火神系列",
    countryZh: "美国",
    summary: `ULA 用来同时取代 Atlas V 与 Delta IV 的单一平台。它的诞生带有强烈的地缘政治色彩——2014 年美国禁止军用发射使用俄制 RD-180 发动机，ULA 必须换掉 Atlas V 的心脏。

设计核心是模块化：同一芯级 + 同一上面级，靠 0–6 枚固体助推器和两种整流罩覆盖 LEO 10.8–27.2 t 的全谱系。上面级 Centaur V 的血统可以追到 1962 年——**人类第一款氢氧上面级，至今仍未被超越。**`,
    lineage: [
      { name: "Atlas V", years: "2002–2024", note: "用俄制 RD-180 的高可靠性主力，89 次发射仅 1 次部分失败。" },
      { name: "Vulcan Centaur", years: "2024–", note: "BE-4 甲烷一级 + Centaur V 氢氧上面级。", slug: "vulcan-centaur" },
      { name: "SMART 复用 / ACES", years: "规划中", note: "只回收发动机舱、以及可长期在轨的上面级方案。" },
    ],
    members: ["vulcan-centaur"],
    related: ["delta", "ariane", "new-glenn"],
  },
  {
    slug: "electron",
    name: "Electron / Neutron",
    nameZh: "电子号 / 中子号",
    countryZh: "新西兰 / 美国",
    summary: `Rocket Lab 的火箭谱系。Electron 用电泵循环与 3D 打印把小型运载火箭的制造成本压了下来，并第一次证明专用小火箭这门生意在商业上是可行的——尽管窄。

公司的战略重心正在向中型可回收的 Neutron 转移，这本身就说明了小型发射市场的天花板在哪里。`,
    lineage: [
      { name: "Electron", years: "2017–", note: "18 m 小型火箭，LEO 320 kg，一级降落伞回收。", slug: "electron" },
      { name: "HASTE", years: "2023–", note: "亚轨道高超声速试验平台构型。" },
      { name: "Neutron", years: "在研", note: "13 t 级可回收中型火箭，碳纤维箭体、Archimedes 甲烷发动机。" },
    ],
    members: ["electron"],
    related: ["falcon", "zhuque"],
  },
  {
    slug: "zhuque",
    name: "Zhuque",
    nameZh: "朱雀系列",
    countryZh: "中国",
    summary: `蓝箭航天的火箭谱系，中国民营航天在关键技术上第一次跑到国际前面的案例。

朱雀一号（固体）失败后，公司直接跳过煤油路线转向液氧甲烷。2023 年 7 月，朱雀二号成为**世界上第一枚成功入轨的液氧甲烷运载火箭**——早于 Vulcan、New Glenn 与 Starship。

在研的朱雀三号采用不锈钢箭体与一级垂直回收，目标直指 Falcon 9 的对标位置。`,
    lineage: [
      { name: "朱雀一号", years: "2018", note: "三级固体火箭，唯一一次发射未能入轨。" },
      { name: "朱雀二号", years: "2022–", note: "全球首枚入轨甲烷火箭，LEO 6 t。", slug: "zhuque-2" },
      { name: "朱雀二号改进型 (ZQ-2E)", years: "2024–", note: "4.2 m 大整流罩，面向星座部署。" },
      { name: "朱雀三号 (ZQ-3)", years: "在研", note: "不锈钢可回收火箭，3.8 m 直径，LEO 21 t。" },
    ],
    members: ["zhuque-2"],
    related: ["falcon", "long-march-new", "electron"],
  },
];

/** 两批谱系合并成同一张表；拆文件只是为了不让单文件过长。 */
export const FAMILIES: Family[] = [...FAMILIES_CORE, ...FAMILIES_MORE];

const BY_SLUG = new Map(FAMILIES.map((f) => [f.slug, f]));

export function getFamily(slug: string): Family | undefined {
  return BY_SLUG.get(slug);
}

export const FAMILY_SLUGS = FAMILIES.map((f) => f.slug);
