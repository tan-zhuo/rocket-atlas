import type { Family } from "./types";

/** 家族谱系（第二批），与 `families.ts` 合并成同一张表。 */
export const FAMILIES_MORE: Family[] = [
  {
    slug: "space-shuttle",
    name: "Space Transportation System",
    nameZh: "航天飞机 / 太空运输系统",
    countryZh: "美国",
    summary: `航天飞机不是一个火箭家族，而是一套系统：可复用的轨道器、可复用的固体助推器、一次性的外贮箱。它的谱系很短——五架轨道飞行器，三十年，135 次飞行——但它对此后所有载人航天设计的影响是决定性的，**主要以「不要这样做」的形式。**

它留下的硬件遗产直接构成了 SLS：同样的 8.4 m 直径、同样的 RS-25、同样的固体助推器、同样的工厂与供应商。`,
    lineage: [
      { name: "Enterprise (OV-101)", years: "1977", note: "只做大气层内进近与着陆试验，从未入轨。" },
      { name: "Columbia (OV-102)", years: "1981–2003", note: "首架入轨的轨道器，28 次飞行；2003 年再入中解体。", slug: "space-shuttle" },
      { name: "Challenger (OV-099)", years: "1983–1986", note: "由结构试验件改装，10 次飞行；1986 年上升段解体。" },
      { name: "Discovery (OV-103)", years: "1984–2011", note: "飞行次数最多，39 次。" },
      { name: "Atlantis (OV-104)", years: "1985–2011", note: "33 次飞行，执行了最后一次任务 STS-135。" },
      { name: "Endeavour (OV-105)", years: "1992–2011", note: "挑战者号事故后用备件组装，25 次飞行。" },
      { name: "SLS", years: "2022–", note: "继承直径、发动机、固推与工厂的直接后代。", slug: "sls" },
    ],
    members: ["space-shuttle"],
    related: ["sls", "saturn", "energia"],
  },
  {
    slug: "sls",
    name: "Space Launch System",
    nameZh: "太空发射系统",
    countryZh: "美国",
    summary: `SLS 是一条被法律定义的谱系：2010 年的 NASA 授权法案要求新的重型火箭「尽最大可能利用航天飞机与星座计划的现有合同、投资、劳动力与工业基础」。

于是它的技术形态在立项那一刻就被确定了：8.4 m 直径（外贮箱工装）、RS-25（航天飞机主发动机库存）、五段固推（航天飞机固推加长）、ICPS（Delta IV 的上面级）。

**这是一个「用旧零件搭新火箭」的实验，结论是：旧零件不会让新火箭变便宜，只会让它变得更难改。**`,
    lineage: [
      { name: "Ares I / Ares V", years: "2005–2010", note: "星座计划的火箭方案，随计划取消而终止，但技术积累转入 SLS。" },
      { name: "SLS Block 1", years: "2022–", note: "ICPS 上面级，TLI 27 t，用于 Artemis I–III。", slug: "sls" },
      { name: "SLS Block 1B", years: "规划中", note: "换装四发 RL10 的探索上面级 EUS，TLI 42 t，需新建移动发射平台。" },
      { name: "SLS Block 2", years: "规划中", note: "先进固体助推器构型，TLI 46 t；尚未立项。" },
    ],
    members: ["sls"],
    related: ["space-shuttle", "saturn", "starship"],
  },
  {
    slug: "atlas",
    name: "Atlas",
    nameZh: "宇宙神",
    countryZh: "美国",
    summary: `宇宙神是美国最长的火箭谱系之一，从 1957 年的洲际导弹一路飞到今天。但要注意：**这条谱系在 Atlas V 处发生了断裂。**

1957–2004 年的宇宙神家族有一个共同的技术标志：**气球贮箱**——0.25–0.5 mm 厚的不锈钢蒙皮，靠内压维持形状，不加压就会瘪掉。这套结构效率极高的绝技传承了近半个世纪。

Atlas V 放弃了它（捆绑固体助推器带来的非对称载荷不是气球箱能承受的），只在半人马座上面级上保留至今。**所以「Atlas V」这个名字继承的是品牌与发射服务体系，而不是技术血统——它的一级发动机来自俄罗斯，箭体是常规结构。**`,
    lineage: [
      { name: "SM-65 Atlas", years: "1957–1965", note: "美国第一款洲际导弹，气球贮箱与「一级半」构型。" },
      { name: "Atlas LV-3B / Mercury-Atlas", years: "1962–1963", note: "把约翰·格伦送入轨道，美国首次载人绕地飞行。" },
      { name: "Atlas-Agena / Atlas-Centaur", years: "1960–1983", note: "半人马座上面级首飞，人类第一款氢氧上面级。" },
      { name: "Atlas II / III", years: "1991–2005", note: "Atlas III 首次采用俄制 RD-180，是 Atlas V 的技术预演。" },
      { name: "Atlas V", years: "2002–", note: "RD-180 + 半人马座，模块化三位数构型编号。", slug: "atlas-v" },
      { name: "Vulcan Centaur", years: "2024–", note: "换装美国自产 BE-4，保留半人马座血统与构型编号逻辑。", slug: "vulcan-centaur" },
    ],
    members: ["atlas-v"],
    related: ["vulcan", "delta", "falcon"],
  },
  {
    slug: "n1",
    name: "N1 / L3",
    nameZh: "N1 登月计划",
    countryZh: "苏联",
    summary: `N1 是苏联载人登月计划的运载器，四次发射四次失败，1974 年被取消并销毁，此后十五年官方否认它存在过。

它的失败不是单一技术问题，而是一条完整的因果链：**格鲁什科拒绝提供大推力发动机 → 只能用 30 台小机 → 复杂的耦合与控制问题 → 需要整机试车验证 → 球形贮箱迫使外形是锥形 → 无法铁路运输 → 只能在发射场现场总装 → 没有试车台 → 耦合问题只能在飞行中暴露。**

留下的唯一实物遗产是被库兹涅佐夫违令封存的 NK-33 发动机，三十年后被美国买走用在了 Antares 上。`,
    lineage: [
      { name: "N1 (3L / 5L / 6L / 7L)", years: "1969–1972", note: "四次发射全部失败，最后一次距一级正常关机只差 7 秒。", slug: "n1" },
      { name: "N1F", years: "1974（取消）", note: "改用 NK-33/NK-43 的改进型，两枚接近完工的箭体被拆毁。" },
      { name: "L3 复合体", years: "1964–1974", note: "Block G/D 转移级 + LK 单人登月舱 + LOK 环月飞船。" },
      { name: "Block D", years: "1967–", note: "N1 计划唯一活下来的部分，成为质子号的 DM 上面级并服役至今。" },
      { name: "NK-33 / AJ26", years: "1972 封存 / 2013 复飞", note: "被违令保存的发动机，三十年后装在美国的 Antares 上飞行。" },
    ],
    members: ["n1"],
    related: ["energia", "saturn", "proton"],
  },
  {
    slug: "energia",
    name: "Energia / Buran",
    nameZh: "能源号 / 暴风雪号",
    countryZh: "苏联",
    summary: `能源号是苏联在 N1 失败十三年后交出的答卷：格鲁什科亲自主持，用 4 台 RD-170（正是当年他没有造出来的那种大推力机）替代 30 台小机。

它与美国航天飞机的关键区别在于**主发动机装在芯级上而不是轨道器上**。这一个改动让能源号成为一枚真正的通用重型火箭——它可以不带暴风雪号飞行，载荷可以是任何 100 t 级的东西。

两次发射两次成功，然后随苏联一起消失。留下的最大遗产是 RD-170 家族：它派生出 RD-171（天顶号）、RD-180（宇宙神 5）、RD-191（安加拉）。`,
    lineage: [
      { name: "Energia (Polyus)", years: "1987", note: "首飞，火箭工作正常；载荷「极地号」因自身程序错误未入轨。", slug: "energia" },
      { name: "Energia (Buran)", years: "1988", note: "暴风雪号无人全自动再入与着陆，落点偏差 3 m。" },
      { name: "Energia-M", years: "1993（落选）", note: "两助推器、单台 RD-0120 的缩小型，造出全尺寸样机后竞标失败。" },
      { name: "Zenit", years: "1985–2017", note: "能源号的助推器模块单独作为中型运载火箭使用。" },
      { name: "Vulkan / Hercules", years: "纸面方案", note: "八助推器构型，LEO 175 t。" },
    ],
    members: ["energia"],
    related: ["n1", "space-shuttle", "angara"],
  },
  {
    slug: "proton",
    name: "Proton (UR-500)",
    nameZh: "质子号",
    countryZh: "俄罗斯",
    summary: `质子号最初是切洛梅设计局的 UR-500，用途是投掷一颗 100 兆吨当量的热核弹头。洲际导弹的角色很快被放弃，它转而成为苏联/俄罗斯六十年间的重型运载主力。

它送走了礼炮号、和平号与国际空间站的俄方全部舱段，以及苏联绝大多数的行星探测器。1990 年代它成为俄罗斯重要的外汇来源，2000 年代一度占据全球商业 GEO 发射的三分之一。

**它的外形由铁路决定**：中央 4.1 m 氧化剂箱（铁路装载界限的极限）加六个外挂燃料箱——那六个筒不是助推器，是燃料箱，而且不分离。`,
    lineage: [
      { name: "UR-500", years: "1965–1966", note: "两级构型，首飞发射质子 1 号科学卫星，火箭因此得名。" },
      { name: "Proton-K", years: "1967–2012", note: "三级构型加 Blok D 上面级，主力型号，飞行 300 余次。" },
      { name: "Proton-M / Briz-M", years: "2001–2025", note: "数字控制系统与可重启上面级，商业发射主力。", slug: "proton-m" },
      { name: "Proton Medium / Light", years: "2016–2018（取消）", note: "为对抗猎鹰 9 号提出的减配构型，未投产。" },
      { name: "Angara A5", years: "2014–", note: "官方接替者：无毒、模块化、本土发射。", slug: "angara-a5" },
    ],
    members: ["proton-m"],
    related: ["angara", "r-7", "long-march-3"],
  },
  {
    slug: "angara",
    name: "Angara",
    nameZh: "安加拉",
    countryZh: "俄罗斯",
    summary: `安加拉 1992 年立项，2014 年首飞——二十二年的跨度本身就是它最重要的注脚。

立项动机全部与苏联解体有关：拜科努尔不再属于俄罗斯、部分部件产自乌克兰、质子号的毒推进剂是长期的外交负担。安加拉要求本土发射、100% 俄罗斯境内生产、无毒推进剂。

技术方案是「通用火箭模块」（URM）：一个 2.9 m 直径、装 RD-191 的标准模块，通过并联数量覆盖 3.8–24.5 t 的全运力谱系。**问题是模块化的经济性需要总产量支撑，而俄罗斯的发射需求在这二十年里持续萎缩。**`,
    lineage: [
      { name: "Angara 1.2PP", years: "2014", note: "亚轨道验证飞行。" },
      { name: "Angara 1.2", years: "2022–", note: "单模块构型，LEO 3.8 t。" },
      { name: "Angara A5", years: "2014–", note: "五模块构型，LEO 24.5 t，替代质子号。", slug: "angara-a5" },
      { name: "Angara A5M", years: "研制中", note: "发动机推力提升的改进型，规划配氢氧上面级。" },
      { name: "Angara A5V", years: "纸面方案", note: "氢氧上面级构型，LEO 可达 35 t。" },
    ],
    members: ["angara-a5"],
    related: ["proton", "energia", "vulcan"],
  },
  {
    slug: "h-ii",
    name: "H-II series",
    nameZh: "H 系列",
    countryZh: "日本",
    summary: `H 系列是日本航天从「引进」走向「自主」的过程。1970 年代的 N-I / N-II 用的是美国 Delta 的技术，关键部件是美国造的，日本连改都不能改。

H-II（1994）是第一款全日本自研的火箭，直接挑战了当时只有美苏掌握的富燃分级燃烧氢氧技术。代价是频繁的事故：七次飞行两次失败，1999 年的 F8 失败后日本从 3,000 m 深海打捞回发动机残骸做失效分析。

H-IIA 的对策是反直觉的——**主动降低性能指标换取裕度**，结果是 50 次飞行 49 次成功。H3 则要证明「可靠性和低成本可以兼得」。`,
    lineage: [
      { name: "N-I / N-II", years: "1975–1987", note: "基于美国 Delta 技术的引进型，关键部件不可自主修改。" },
      { name: "H-I", years: "1986–1992", note: "第二级开始使用国产 LE-5 氢氧发动机。" },
      { name: "H-II", years: "1994–1999", note: "首款全自研火箭，七次飞行两次失败，LE-7 问题频发。" },
      { name: "H-IIA", years: "2001–2025", note: "以性能换可靠性，50 次飞行 49 次成功。", slug: "h-iia" },
      { name: "H-IIB", years: "2009–2020", note: "两台 LE-7A 的加大型，专用于 HTV 货运飞船，9 次全成功。" },
      { name: "H3", years: "2023–", note: "新的 LE-9 膨胀排放循环发动机，目标是把单价砍半。", slug: "h3" },
    ],
    members: ["h-iia", "h3"],
    related: ["ariane", "vulcan", "long-march-new"],
  },
  {
    slug: "gslv",
    name: "GSLV / LVM3",
    nameZh: "GSLV / LVM3",
    countryZh: "印度",
    summary: `GSLV 系列的主线是一个问题：**印度怎么获得低温上面级技术。**

1991 年印度与俄罗斯签约购买氢氧上面级技术，1993 年在美国的 MTCR 压力下俄方取消了技术转让，只卖成品发动机。印度被迫自研，这条路走了二十多年。

GSLV Mk I / Mk II 是过渡：先用买来的俄制发动机，再换国产的 CUS。LVM3（原名 GSLV Mk III）则是从零重新设计的火箭——两枚 S200 固体助推器、一个空中点火的液体芯级、一个自研的 CE-20 氢氧上面级。它把月船三号送到了月球南极。`,
    lineage: [
      { name: "GSLV Mk I", years: "2001–2010", note: "第三级使用俄制 KVD-1 氢氧发动机。" },
      { name: "GSLV Mk II", years: "2010–", note: "换装国产低温级 CUS，首次试用即失败，2014 年才成功。" },
      { name: "LVM3 (GSLV Mk III)", years: "2017–", note: "全新设计，CE-20 氢氧上面级，GTO 4 t。", slug: "lvm3" },
      { name: "HLVM3", years: "研制中", note: "加甘扬载人构型，增加逃逸系统与人体额定的冗余设计。" },
    ],
    members: ["lvm3"],
    related: ["pslv", "ariane", "long-march-3"],
  },
  {
    slug: "pslv",
    name: "PSLV",
    nameZh: "极轨卫星运载火箭",
    countryZh: "印度",
    summary: `PSLV 是印度的主力工作火箭，也是全世界构型最特别的火箭之一：**固体 → 液体 → 固体 → 液体，四级交替。**

这个构型不是标新立异，而是把每一级的物理需求与印度当时可用的技术精确匹配：固体负责推力（印度的固体推进最成熟），液体负责精度（可关机、可重启）。

它的第四级 PS4 只有 15.2 kN 推力，却决定了整枚火箭的入轨精度与商业价值——2017 年一箭 104 星就是靠它反复点火、分批释放完成的。`,
    lineage: [
      { name: "SLV-3", years: "1979–1983", note: "印度第一款运载火箭，四级全固体，LEO 40 kg。" },
      { name: "ASLV", years: "1987–1994", note: "五次发射三次失败，但积累了捆绑与分离的经验。" },
      { name: "PSLV-G", years: "1993–2016", note: "六枚标准捆绑助推器的初代构型。", slug: "pslv" },
      { name: "PSLV-CA", years: "2007–", note: "无捆绑助推器的核心版，SSO 约 1.1 t。" },
      { name: "PSLV-XL", years: "2008–", note: "六枚加长助推器，SSO 1.75 t，主力构型。" },
      { name: "SSLV", years: "2022–", note: "更小的三级全固体小型运载器，面向快速响应发射。" },
    ],
    members: ["pslv"],
    related: ["gslv", "vega", "electron"],
  },
  {
    slug: "long-march-3",
    name: "Long March 3 series",
    nameZh: "长征三号系列",
    countryZh: "中国",
    summary: `长征三号系列是中国的 GTO 主力，也是中国第五个掌握氢氧上面级技术的证明（1984 年长征三号首飞）。

它的全部特征都能追溯到两个约束：**3.35 m 直径**（铁路隧道限界）与**自燃推进剂**（东风五号洲际导弹的技术传承）。要提高运力只能加长与捆绑，不能加粗。

1996 年 2 月 14 日长征三号乙的首飞坠入村庄，是中国航天最沉重的一天，也间接导致了美国 ITAR 政策的转向——中国的火箭此后被彻底挡在西方商业发射市场之外。`,
    lineage: [
      { name: "长征三号", years: "1984–2000", note: "中国第一款带氢氧上面级的火箭，GTO 1.5 t。" },
      { name: "长征三号甲", years: "1994–", note: "改进的 YF-75 三级，GTO 2.6 t。" },
      { name: "长征三号乙", years: "1996–", note: "四枚助推器，GTO 5.5 t，中国 GTO 发射的绝对主力。", slug: "long-march-3b" },
      { name: "长征三号丙", years: "2008–", note: "两枚助推器，GTO 3.9 t，运力介于甲乙之间。" },
      { name: "长征七号甲 / 长征五号", years: "2016–", note: "新一代无毒火箭，逐步接手长三系列的任务。", slug: "long-march-5" },
    ],
    members: ["long-march-3b"],
    related: ["long-march-2", "long-march-new", "proton"],
  },
  {
    slug: "vega",
    name: "Vega",
    nameZh: "织女星",
    countryZh: "欧洲",
    summary: `织女星由意大利主导，填补了欧洲运载体系里唯一的空白：小型运载器。它的构型是「三级固体 + 一个可重启的小液体末级」——固体负责力气，液体负责准头。

Vega-C 最重要的设计决策是第一级换成 **P120C**，而 P120C 同时是阿丽亚娜 6 的助推器。这把欧洲的固体发动机年产量翻了一倍，是低产量航天工业里获得规模效应的唯一途径。

代价在 2022 年显现：Vega-C 因第二级喷管喉衬失效停飞两年，恰逢阿丽亚娜 5 退役而阿丽亚娜 6 未首飞，**欧洲一度完全失去自主入轨能力。**`,
    lineage: [
      { name: "Vega", years: "2012–2024", note: "P80 第一级，SSO 1.5 t，欧洲首款自主小型运载器。" },
      { name: "Vega-C", years: "2022–", note: "P120C 第一级与加大整流罩，SSO 2.3 t。", slug: "vega-c" },
      { name: "Vega-E", years: "研制中", note: "用 M10 甲烷发动机取代 AVUM 的自燃推进剂末级。" },
    ],
    members: ["vega-c"],
    related: ["ariane", "pslv", "electron"],
  },
  {
    slug: "kslv",
    name: "KSLV",
    nameZh: "韩国运载火箭",
    countryZh: "韩国",
    summary: `韩国的运载火箭谱系只有两个型号，但它们演示了「买」与「造」的完整对比。

**罗老号（KSLV-I）**的第一级由俄罗斯提供，合同明确不转让设计资料。三次发射两次失败，第三次成功——**而成功之后韩国依然造不出第一级。**

**世界号（KSLV-II）**的立项前提就是这次经验：全部自研。KRE-075 发动机累计试车 180 余次、18,000 余秒，2022 年第二次飞行成功，韩国成为第七个用自研火箭把 1 t 级载荷送入轨道的国家。

**可以买到产品，很难买到能力。**`,
    lineage: [
      { name: "KSR 探空火箭", years: "1993–2003", note: "固体与液体探空火箭，韩国液体推进的起点。" },
      { name: "罗老号 KSLV-I", years: "2009–2013", note: "第一级来自俄罗斯，三次发射两次失败。" },
      { name: "试验型火箭", years: "2018", note: "单台 KRE-075 的第二级亚轨道验证飞行，工作 151 秒。" },
      { name: "世界号 KSLV-II", years: "2021–", note: "全部自研，SSO 1.5 t。", slug: "nuri" },
      { name: "KSLV-III", years: "规划中", note: "更大运力的后续型号，规划含可回收技术验证。" },
    ],
    members: ["nuri"],
    related: ["electron", "vega", "h-ii"],
  },
];
