import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { PAINT, text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "raptor-33",
    name: "Raptor 发动机（33 台）",
    nameEn: "Super Heavy engine section",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 3.6,
    radius: 4.5,
    nozzles: { count: 33, bellRadius: 0.65, bellHeight: 1.9, ringRadius: 3.4 },
    description:
      "内圈 3 台 + 中圈 10 台 + 外圈 20 台。只有内圈 13 台可摆动做推力矢量控制，外圈 20 台固定安装——固定发动机省掉了液压/电动作动器和柔性管路，是把发动机数量堆到 33 台后必须做的减法。着陆时只点内圈 3 台。",
  })
  .at(3.6, {
    id: "booster-body",
    name: "Super Heavy 箭体",
    nameEn: "Super Heavy booster",
    group: "stage-1",
    shape: "cylinder",
    finish: "stainless",
    // 不锈钢不刷漆，只在上段有一处黑色字样
    livery: text("SpaceX", PAINT.black, 0.9, 0.7),
    height: 64.4,
    radius: 4.5,
    description:
      "9 m 直径的 304L / 30X 不锈钢贮箱，由 4 mm 厚钢卷焊接成环再堆叠。选不锈钢而非铝锂或碳纤维，是本世纪运载火箭最反直觉的材料决策之一（见下方设计逻辑）。液氧箱在下、甲烷箱在上，共用一个共底。",
  })
  .at(59, {
    id: "booster-gridfins",
    name: "栅格舵（4 片）",
    group: "stage-1",
    shape: "gridfins",
    finish: "bare-metal",
    height: 4.5,
    radius: 2.2,
    cluster: { count: 4, offset: 4.5 },
    description:
      "不可收拢的固定式钛栅格舵，只能绕自身轴转动。Falcon 9 的栅格舵会在上升段收拢贴紧箭体以减阻，Super Heavy 直接省掉了收放机构——因为它的回收弹道更短、气动损失可以接受，而少一套机构就少一个失效模式。",
  })
  .at(68, {
    id: "hot-stage-ring",
    name: "热分离环",
    nameEn: "Hot-stage ring",
    group: "stage-1",
    shape: "cylinder",
    finish: "engine-metal",
    height: 2.3,
    radius: 4.5,
    description:
      "带排气孔的开放式钢环。飞船的 3 台海平面 Raptor **在两级尚未分离时就点火**，燃气从环上的开孔排出。热分离避免了大直径箭体在分离间隙里失去推力控制的风险，代价是多出约 9 t 的结构质量——第 5 次飞行后改为在分离后抛弃这个环以回收部分性能。",
  })
  .at(70.3, {
    id: "ship-engines",
    name: "飞船发动机（3+3）",
    group: "stage-2",
    shape: "engines",
    finish: "engine-metal",
    height: 3.6,
    radius: 4.5,
    nozzles: { count: 6, bellRadius: 1.1, bellHeight: 2.4, ringRadius: 2.2 },
    description:
      "3 台海平面 Raptor（负责着陆与大气内机动）+ 3 台大扩张比真空版 RVac（真空比冲约 380 s，只在轨道段工作）。同一台发动机的两种喷管版本共用涡轮泵与预燃室，是「一种发动机打天下」策略的延伸。",
  })
  .at(70.3, {
    id: "ship-body",
    name: "Starship 飞船箭体",
    nameEn: "Starship upper stage",
    group: "stage-2",
    shape: "cylinder",
    finish: "stainless",
    livery: { kind: "tiles", color: "#23262d" },
    height: 36.7,
    radius: 4.5,
    description:
      "既是上面级、也是飞船、还是着陆器。迎风面贴有约 18,000 块六边形陶瓷隔热瓦，机械固定在钢壳的销钉上。不锈钢在 800 °C 仍保有约一半室温强度，这让隔热系统可以做得比铝结构薄——这是选钢的直接回报之一。",
  })
  .at(74, {
    id: "aft-flaps",
    name: "后襟翼（2 片）",
    group: "stage-2",
    shape: "flap",
    finish: "stainless",
    height: 9,
    radius: 4.2,
    cluster: { count: 2, offset: 4.5, phase: 90 },
    description:
      "飞船以「腹部朝下」的水平姿态再入，靠 4 片襟翼像跳伞者一样调整姿态与升阻比，落到约 100 m 高度再做「翻身（flip）」竖直点火着陆。后襟翼在 V2 版本中被移到更靠背风的位置，因为原位置的铰链缝隙在再入时被等离子体烧穿过。",
  })
  .at(98, {
    id: "fwd-flaps",
    name: "前襟翼（2 片）",
    group: "stage-2",
    shape: "flap",
    finish: "stainless",
    height: 6.5,
    radius: 3.2,
    cluster: { count: 2, offset: 4.3, phase: 90 },
    description: "位于头锥根部的一对前襟翼，与后襟翼配合控制再入姿态的俯仰与滚转。",
  })
  .at(107, {
    id: "nosecone",
    name: "头锥 / 载荷舱",
    group: "payload",
    shape: "ogive",
    finish: "stainless",
    livery: { kind: "tiles", color: "#23262d" },
    height: 14,
    radius: 4.5,
    description:
      "载荷从侧面的「投币口（PEZ dispenser）」舱门释放，而不是抛整流罩——因为整流罩要跟着飞船回来。这个选择限制了单个载荷的尺寸包络，但省掉了每次发射抛弃一套整流罩的成本。",
  });

export const starship: Rocket = {
  slug: "starship",
  name: "Starship / Super Heavy",
  nameZh: "星舰 / 超重型助推器",
  country: "United States",
  countryZh: "美国",
  agency: ["SpaceX"],
  family: "starship",
  status: "development",
  firstFlight: "2023-04-20",

  height: 121,
  diameter: 9,
  span: 9,
  mass: 5000000,
  stageCount: 2,

  stages: [
    {
      name: "Super Heavy",
      nameZh: "一级 Super Heavy",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustSeaLevel: 74400,
      burnTime: 160,
      dryMass: 200000,
      propellantMass: 3400000,
      diameter: 9,
      height: 71,
      reusable: true,
      note: "不带着陆腿，由发射塔机械臂（「筷子」）在空中夹持接住——把着陆腿的质量转移到了地面设施上。",
      engines: [
        {
          name: "Raptor 2",
          count: 33,
          cycle: "full-flow-staged-combustion",
          cycleZh: "全流量分级燃烧循环",
          propellant: "methalox",
          thrust: 2255,
          thrustSeaLevel: 2255,
          thrustVacuum: 2530,
          ispSeaLevel: 327,
          ispVacuum: 350,
          note: "史上第一款投入实际飞行的全流量分级燃烧发动机。",
        },
      ],
    },
    {
      name: "Starship",
      nameZh: "二级 Starship",
      propellant: "methalox",
      propellantZh: "液态甲烷 / 液氧",
      thrustVacuum: 12250,
      burnTime: 380,
      dryMass: 100000,
      propellantMass: 1200000,
      diameter: 9,
      height: 50.3,
      reusable: true,
      note: "同时充当上面级、飞船、月面着陆器与在轨加注的受注方，需要具备在轨长期贮存低温推进剂的能力。",
      engines: [
        {
          name: "Raptor 2 (海平面)",
          count: 3,
          cycle: "full-flow-staged-combustion",
          cycleZh: "全流量分级燃烧循环",
          propellant: "methalox",
          thrust: 2255,
          ispVacuum: 350,
        },
        {
          name: "Raptor Vacuum (RVac)",
          count: 3,
          cycle: "full-flow-staged-combustion",
          cycleZh: "全流量分级燃烧循环",
          propellant: "methalox",
          thrust: 2530,
          ispVacuum: 380,
          note: "大扩张比喷管，只在真空段工作。",
        },
      ],
    },
  ],

  payloadLEO: 100000,
  reusable: true,
  reuseNote: "设计为两级全部回收复用；一级已多次成功被发射塔捕获，二级尚未完成入轨后回收。",
  humanRated: false,

  description:
    "人类建造过的最大、推力最强的运载器，也是第一个把「两级全复用 + 在轨加注」作为设计前提的轨道运输系统。",

  history: `Starship 的构想经历了多轮改名与改材料：2016 年发布时叫 ITS（行星际运输系统），直径 12 m、碳纤维结构、载荷 300 t；2017 年缩小为 9 m 的 BFR；2018 年底 SpaceX 突然宣布放弃已经造出样件的碳纤维箭体，改用**不锈钢**。

2019 年 7 月，形似水塔的 Starhopper 完成 150 m 悬停跳跃；2020–2021 年 SN8 至 SN15 反复验证「腹部再入 + 翻身着陆」的机动，前四次都在着陆时爆炸，SN15 于 2021 年 5 月首次完整回收。

2023 年 4 月 20 日首次轨道级整合试飞：多台发动机失效、级间分离失败、飞行终止系统延迟起爆。此后每一次试飞都在解决上一次暴露的问题——第 2 次（2023-11）验证了热分离但两级均在后段失控，第 3 次（2024-03）首次达到近轨道速度，第 4 次（2024-06）两级都完成受控溅落，第 5 次（2024-10）**发射塔首次成功夹持接住一级助推器**。

截至目前，Starship 尚未完成一次真正的入轨 + 回收任务。它同时是 NASA Artemis 计划的月面着陆器（HLS）承包方案，进度直接绑定着美国的重返月球时间表。`,

  designPhilosophy: `Starship 的设计逻辑只有一句话：**如果发射成本要降到今天的 1/100，那么任何一次性抛弃的硬件都不可接受。**

Falcon 9 回收了一级（约占成本 60–70%），剩下的二级与整流罩仍然每次扔掉，这为单次成本设了一个地板。Starship 从这个地板出发倒推：两级都必须回来，因此二级必须能承受轨道再入的热载荷；能承受再入的结构必须便宜且耐高温；便宜且耐高温的大尺寸结构——那就只能是不锈钢。

第二个前提是**在轨加注**。9 m 直径两级火箭把 100 t 送到 LEO 已接近极限，要去月球或火星只能在轨道上把推进剂补满。这意味着推进剂必须能长期贮存、能在失重下转移，且必须便宜到可以为一次任务发射十几枚加注飞船——甲烷比液氢好贮存、比煤油洁净，是唯一同时满足这些条件的选择。

第三条是**用高频廉价试飞替代地面分析**。Saturn V 有全尺寸结构试验件和全推力台架试车；Starship 造一枚箭体只要几百万美元，于是它选择直接飞、炸了再改。这不是鲁莽，而是当单枚成本足够低时，飞行试验成为最快的信息来源。`,

  tradeoffs: [
    {
      question: "为什么放弃碳纤维，改用又重又「落后」的不锈钢？",
      answer: `2018 年这个决定让整个行业错愕：碳纤维复合材料的比强度是不锈钢的数倍，几乎所有现代航天结构都在往复合材料走。

但 Starship 的约束不是室温比强度，而是**在 −180 °C 到 +1,400 °C 全温域内的比强度、成本与可修复性**：

- **低温**：304L 不锈钢在液氧温度下强度反而提升约 50%（低温强化），碳纤维在深冷下则要面对树脂微裂纹与渗漏。
- **高温**：再入时迎风面可达 1,300 °C 以上。碳纤维在 150 °C 就开始软化，必须靠一层厚重的隔热系统全面保护；不锈钢到 800 °C 仍保有约一半强度，隔热瓦可以做得更薄、背风面甚至可以裸奔。这一进一出，钢结构的「重」被隔热系统的「轻」抵消了大半。
- **成本**：航天级碳纤维预浸料约 130 美元/kg 且需要大型热压罐；304L 钢卷约 3 美元/kg，用普通焊接就能造，可以在露天工棚里生产。
- **迭代速度**：钢结构可以焊、可以割、可以现场改。碳纤维模具一旦开好，改设计就是重新开模。

代价很实在：Starship 的干质比远不如碳纤维方案，二级干质量约 100 t（Falcon 9 二级仅 4 t 量级）。这吃掉了大量运力——但如果这些运力换来的是「能飞回来重复用」，账就算得过来。`,
    },
    {
      question: "为什么用全流量分级燃烧（FFSC）循环？",
      answer: `Raptor 是历史上第一款真正投入飞行的全流量分级燃烧发动机。这个循环的特点是：燃料和氧化剂**各有一个预燃室**，一个富燃、一个富氧，两股燃气分别驱动各自的涡轮泵后**全部注入主燃烧室**——没有任何推进剂被排掉。

对比其他循环：

| 循环 | 涡轮排气去向 | 代表 |
|---|---|---|
| 燃气发生器 | 排出箭体外，损失约 3% 流量 | F-1、Merlin |
| 分级燃烧（单预燃室） | 全部进主燃烧室 | RD-180、SSME |
| 全流量分级燃烧 | 两路都进主燃烧室 | Raptor |

FFSC 的真正好处不只是那 3% 的比冲：

1. **涡轮工作温度低**：因为流经涡轮的是全部流量而不是一小部分，同样的功率下温度可以低几百度，涡轮寿命大幅延长——这对要求「不检修连飞 N 次」的复用发动机是决定性的。
2. **没有富氧燃气接触燃料泵**：燃料泵驱动富燃燃气、氧化剂泵驱动富氧燃气，两条路径之间不需要跨介质密封（这是 RD-180 那类富氧分级燃烧发动机最难的部分）。
3. **可深度节流**：Raptor 的节流范围约 40–100%，这是着陆必需的。

代价是：两套预燃室、两套涡轮泵、极高的燃烧室压力（Raptor 3 目标 350 bar 以上），研制难度是所有循环里最高的。苏联的 RD-270 和美国的 IPD 计划都做过 FFSC 样机，但从未上过天。`,
    },
    {
      question: "为什么不用着陆腿，而让发射塔「用筷子夹住」？",
      answer: `Super Heavy 上没有任何着陆腿。回收方式是：助推器悬停在发射塔旁，塔上两条巨大的机械臂合拢，接住箭体上部两个小小的承力销。

这个方案看起来极端，逻辑却很清晰：**把质量从火箭上转移到地面。** 一套能承受 200 t 空箭着陆冲击的着陆腿，质量在 10 t 量级，而且每一次飞行都要带着它往返一趟——而运载火箭上每 1 kg 一级干质量大约要吃掉 20–50 g 的入轨载荷。相反，塔臂再重也永远待在地面。

第二个理由是**周转时间**。着陆在远处的箭体需要吊装、运输、竖立、上架；被塔臂接住的箭体已经在发射位上，理论上可以直接放回发射台加注再飞。SpaceX 公开的目标是助推器一小时内复飞。

代价是风险高度集中：一次失败可能同时毁掉助推器和唯一的发射塔，而塔的重建周期以月计。这也是为什么第一次捕获尝试设置了极其严格的中止判据——任何一项健康检查不通过，助推器就立刻改为溅落海上。`,
    },
    {
      question: "「快速迭代、炸了再改」在载人航天上站得住脚吗？",
      answer: `这是 Starship 最有争议的部分。传统载人飞行器的验证逻辑是「分析 → 地面试验 → 有限飞行试验 → 载人」，每一步都要把风险论证到可接受；Starship 的逻辑是「造一批便宜的箭 → 飞 → 看它怎么坏 → 改」。

支持这条路线的前提有两个：

1. **单位成本足够低**。一枚 Starship 箭体的成本据估算在数千万美元量级，且产线设计目标是一周一枚。当硬件比试验台还便宜时，飞行试验就是性价比最高的信息获取方式。
2. **失败是无人的**。所有爆炸都发生在无人试飞中，没有乘员风险。

但从「无人试飞成熟」到「载人飞行认证」之间有一道很难跨的坎：载人系统需要证明的是**极低概率事件不会发生**，而这类论证恰恰无法靠十几次飞行的统计得到。Starship 目前还没有逃逸系统——它的尺寸和构型让传统逃逸塔方案几乎不可能实现，只能依赖「整体可靠性足够高」这个航空业式的论证路径（就像客机不带弹射座椅）。这要求的飞行样本量，可能是数百次。

**因此更合理的判断是：快速迭代解决的是「让它能飞」，而载人认证需要的是另一套完全不同的方法论。** 两者的衔接方式，是这个项目未来十年最大的未知数。`,
    },
  ],

  contemporaries: `唯一在同一量级的在研型号是 NASA 的 **SLS**：LEO 运力 95 t（Block 1），但完全一次性、单次成本超过 20 亿美元、年产能约 1 枚。两者的对比几乎是运载火箭史上两种哲学最极端的并置——SLS 复用了航天飞机的成熟硬件（RS-25 发动机、固体助推器）以求首飞即可靠，Starship 从零设计以求边际成本趋近于零。

讽刺的是，Artemis 计划同时依赖两者：SLS/Orion 送人到月球轨道，Starship HLS 负责月面往返。**一个计划里同时押注两种相反的工程哲学**，这本身就是当前航天工业转型期的写照。`,

  milestones: [
    { date: "2018-12-23", title: "宣布改用不锈钢", note: "放弃已制造的碳纤维箭体样件。" },
    { date: "2019-07-25", title: "Starhopper 150 m 跳跃", note: "首次 Raptor 驱动的自由飞行。" },
    { date: "2021-05-05", title: "SN15 完整着陆回收", note: "第五次尝试后首次成功完成腹部再入 + 翻身着陆。" },
    { date: "2023-04-20", title: "IFT-1 首次轨道级试飞", note: "多台发动机失效，未能分级。" },
    { date: "2023-11-18", title: "IFT-2 热分离验证", note: "首次成功热分离，两级随后均失控。" },
    { date: "2024-06-06", title: "IFT-4 两级受控溅落", note: "飞船带着烧穿的襟翼完成再入并受控溅落。" },
    { date: "2024-10-13", title: "IFT-5 塔臂首次捕获助推器", note: "运载火箭一级首次被地面机构在空中接住。" },
  ],

  variants: [
    { name: "Starship HLS", note: "NASA Artemis 月面着陆器构型，无隔热瓦与襟翼，只在真空中工作。" },
    { name: "Tanker / Depot", note: "在轨推进剂加注与贮存构型，是所有深空任务的前提。" },
    { name: "Starship V2 / V3", note: "加长贮箱、Raptor 3 发动机，目标运力 150–200 t。" },
  ],
  relatedRockets: ["saturn-v", "falcon-9", "new-glenn"],
  principles: ["reusability", "propellants-and-cycles", "structures-and-materials"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote:
      "按 SpaceX 公开的 121 m 总高、9 m 直径与 33/6 台发动机布局复原的示意模型。Starship 处于快速迭代中，各批次（V1/V2）在襟翼位置、热分离环与箭体长度上均有差异，本模型对应 V1 后期构型。",
  }),

  sources: [
    {
      title: "Starship — SpaceX",
      url: "https://www.spacex.com/vehicles/starship/",
      publisher: "SpaceX",
      confidence: "high",
      note: "总高、直径、发动机配置、运力目标。",
    },
    {
      title: "Starship Users Guide (Rev 1.0)",
      url: "https://www.spacex.com/media/starship_users_guide_v1.pdf",
      publisher: "SpaceX",
      confidence: "high",
      note: "载荷包络与任务剖面。",
    },
    {
      title: "NASA Human Landing System — Option A Source Selection Statement",
      url: "https://www.nasa.gov/wp-content/uploads/2021/04/option-a-source-selection-statement-final.pdf",
      publisher: "NASA",
      confidence: "high",
      note: "HLS 方案与在轨加注需求的官方评述。",
    },
    {
      title: "SpaceX Starship — Wikipedia",
      url: "https://en.wikipedia.org/wiki/SpaceX_Starship",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "试飞时间线与各次飞行结果汇总。质量、干质量等数据为公开估算，SpaceX 未正式发布。",
    },
  ],

  tags: ["全复用", "甲烷", "全流量分级燃烧", "超重型", "在研"],
};
