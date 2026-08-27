import type { Rocket } from "../types";
import { rocketGeometry } from "../geometry";
import { text } from "../livery";

const g = rocketGeometry()
  .at(0, {
    id: "rutherford-9",
    name: "Rutherford 发动机（9 台）",
    group: "stage-1",
    shape: "engines",
    finish: "engine-metal",
    height: 1.6,
    radius: 0.6,
    nozzles: { count: 9, bellRadius: 0.14, bellHeight: 0.75, ringRadius: 0.4 },
    description:
      "全球第一款投入轨道飞行的**电泵循环**发动机：推进剂不是靠涡轮驱动的泵输送，而是由两台无刷直流电机带动，电机由锂聚合物电池供电。单台海平面推力仅 24 kN。发动机的主要承力件——推力室、喷注器、泵壳、涡轮——全部用电子束熔融（EBM）3D 打印，一台的打印周期约 24 小时。",
  })
  .at(1.6, {
    id: "s1-body",
    name: "一级箭体",
    group: "stage-1",
    shape: "cylinder",
    finish: "carbon",
    // 电子号不刷漆：碳纤维缠绕壳体本色就是黑的，只有白色字样
    livery: text("ROCKET LAB", "#e8ecf2", 0.72, 0.8),
    height: 10.5,
    radius: 0.6,
    description:
      "碳纤维复合材料贮箱，直接承力（不是内挂式）。碳纤维贮低温推进剂的难点在于树脂微裂纹导致的渗漏，Rocket Lab 用自研的内衬工艺解决。整枚一级干质量约 950 kg——比同直径的铝合金方案轻约 40%，这对小火箭是决定性的：**小火箭的载荷占比本来就极低，每省 1 kg 结构几乎就是多 1 kg 载荷。**",
  })
  .at(12.1, {
    id: "interstage",
    name: "级间段",
    group: "stage-1",
    shape: "cylinder",
    finish: "carbon",
    height: 1.5,
    radius: 0.6,
    description:
      "回收构型下，一级在这里之上分离后靠再入减速、降落伞下降，由船只在海上打捞（早期曾用直升机空中抓取降落伞）。一级不做动力回收——Electron 太小，携带返场推进剂的代价会吃光全部载荷。",
  })
  .at(13.6, {
    id: "s2-body",
    name: "二级",
    group: "stage-2",
    shape: "cylinder",
    finish: "carbon",
    height: 2,
    radius: 0.6,
    description:
      "单台真空版 Rutherford（扩张比更大，真空比冲 343 s）。二级的电池组会在工作过程中**分批抛掉已耗尽的电池**——这是电泵循环独有的减重手段：涡轮泵火箭无法抛弃已经烧过的涡轮，但电池可以。",
  })
  .at(15.6, {
    id: "kick-stage",
    name: "Curie 上面级（Kick Stage）",
    group: "stage-3",
    shape: "cylinder",
    finish: "bare-metal",
    height: 0.6,
    radius: 0.55,
    description:
      "一个可多次点火的小型上面级，装 120 N 的 Curie 单组元/双组元发动机。它把每颗小卫星分别送到各自的精确轨道，而不是像传统「拼车发射」那样把所有载荷丢在同一点——**这正是小火箭相对搭载发射的核心卖点：你买的不只是运力，而是轨道的自主权。**",
  })
  .at(16.2, {
    id: "fairing",
    name: "整流罩",
    group: "payload",
    shape: "ogive",
    finish: "carbon",
    height: 1.8,
    radius: 0.6,
    description: "1.2 m 直径整流罩，载荷包络 ⌀1.07 × 1.4 m。对 300 kg 级的小卫星来说，限制往往不是质量而是这个体积。",
  });

export const electron: Rocket = {
  slug: "electron",
  name: "Electron",
  nameZh: "电子号",
  country: "New Zealand / United States",
  countryZh: "新西兰 / 美国",
  agency: ["Rocket Lab"],
  family: "electron",
  status: "active",
  firstFlight: "2017-05-25",

  height: 18,
  diameter: 1.2,
  span: 1.2,
  mass: 13000,
  stageCount: 2,

  stages: [
    {
      name: "Electron First Stage",
      nameZh: "一级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustSeaLevel: 224,
      thrustVacuum: 246,
      burnTime: 154,
      dryMass: 950,
      propellantMass: 9250,
      diameter: 1.2,
      height: 12.1,
      reusable: true,
      note: "降落伞 + 海上打捞回收，已成功回收多枚并复用过 Rutherford 发动机。",
      engines: [
        {
          name: "Rutherford",
          count: 9,
          cycle: "electric-pump",
          cycleZh: "电泵循环",
          propellant: "kerolox",
          thrust: 24,
          thrustSeaLevel: 24,
          thrustVacuum: 26,
          ispSeaLevel: 311,
          ispVacuum: 343,
          note: "首款轨道级电泵发动机，主要部件全部 3D 打印。",
        },
      ],
    },
    {
      name: "Electron Second Stage",
      nameZh: "二级",
      propellant: "kerolox",
      propellantZh: "RP-1 煤油 / 液氧",
      thrustVacuum: 26,
      burnTime: 333,
      dryMass: 250,
      propellantMass: 2050,
      diameter: 1.2,
      height: 2.4,
      engines: [
        {
          name: "Rutherford Vacuum",
          count: 1,
          cycle: "electric-pump",
          cycleZh: "电泵循环",
          propellant: "kerolox",
          thrust: 26,
          thrustVacuum: 26,
          ispVacuum: 343,
        },
      ],
    },
    {
      name: "Kick Stage",
      nameZh: "Curie 上面级",
      propellant: "hypergolic",
      propellantZh: "单组元 / 双组元绿色推进剂",
      thrustVacuum: 0.12,
      diameter: 1.1,
      height: 0.6,
      note: "可多次点火，用于精确轨道部署与末级离轨。",
      engines: [
        {
          name: "Curie",
          count: 1,
          cycle: "pressure-fed",
          cycleZh: "挤压式",
          propellant: "hypergolic",
          thrust: 0.12,
          ispVacuum: 320,
        },
      ],
    },
  ],

  payloadLEO: 320,
  payloadSSO: 200,
  reusable: true,
  reuseNote: "一级降落伞海上回收，已实现发动机复用；二级一次性。",
  humanRated: false,

  description:
    "把「小火箭也能赚钱」这件事第一次做成的商业运载器，用电泵循环与 3D 打印重新定义了小型发动机的制造方式。",

  history: `Rocket Lab 由新西兰工程师 Peter Beck 于 2006 年创立。Electron 的市场假设很明确：CubeSat 与小卫星的数量在爆发，但它们只能作为大火箭的「搭车客」，被迫接受主载荷决定的轨道和发射时间。如果有一枚 300 kg 级的小火箭能按客户的时间表、把卫星送到客户要的轨道，就存在一个新市场。

2017 年 5 月首飞（"It's a Test"）因**地面遥测设备的配置错误**触发飞行终止而失败——火箭本身工作正常。2018 年 1 月第二次发射成功入轨。此后 Electron 成为除 Falcon 9 外发射次数最多的美系轨道火箭，累计发射超过 60 次。

回收方面走过一段弯路：最初计划用直升机在空中抓住降落伞下降的一级（2022 年 5 月曾短暂抓住但因载荷特性异常而放手），后来判断直升机方案的复杂度与收益不成比例，改为直接让一级溅落海面后打捞。2024 年起已有回收的 Rutherford 发动机重新参加飞行。

Rocket Lab 目前的重心正在转向中型的可回收火箭 **Neutron**（LEO 13 t）。`,

  designPhilosophy: `Electron 的设计逻辑是**把小火箭的经济学难题，从「性能」转移到「制造」。**

小型运载火箭有一个残酷的数学事实：火箭越小，结构与发动机的质量占比越高，载荷比越差。Electron 起飞质量 13 t、LEO 载荷 0.32 t，载荷比约 2.5%，而 Falcon 9 是 4.2%。规模效应是逆着小火箭的。

既然性能上赢不了，Rocket Lab 选择在两个别的维度上做文章：

1. **制造成本**。传统涡轮泵是火箭发动机中最贵、最难造、周期最长的部件。电泵循环把它换成了电机 + 电池——电机是成熟工业品，控制简单，还能精确调节流量。再配合 3D 打印，一台 Rutherford 从原料到成品只要 24 小时，而一枚火箭要 10 台。
2. **发射节奏与轨道服务**。自建发射场（新西兰玛希亚半岛，全球唯一的私营轨道发射场）绕开了排队问题；Kick Stage 提供任意轨道部署。客户买的是**确定性**，为此愿意付出比搭车发射高得多的单价（约 750 万美元 / 300 kg，折合 2.3 万美元/kg，是 Falcon 9 搭车价的十倍以上）。

**这是一次对「运载火箭卖的到底是什么」的重新定义：不是每公斤的价格，而是时间与轨道的自主权。**`,

  tradeoffs: [
    {
      question: "电泵循环：用电池推火箭，代价是什么？",
      answer: `Rutherford 的推进剂由电机驱动的泵输送，电机由锂聚合物电池供电。这个方案在大火箭上是不可想象的，但在小火箭上成立，原因是**泵功率随推力线性增长，而电池能量密度是固定的**。

Rutherford 单台泵功率约 37 kW。9 台一级发动机需要约 330 kW 的电力，一级的电池组质量约 100 kg 量级。如果把这个方案放大到 Merlin 的推力（845 kN，约 35 倍），需要的电池质量会增长到吃掉全部载荷。**电泵循环有一个明确的推力上限，Electron 恰好在这个上限之下。**

在这个尺度上，它换来的好处很实在：

- **没有涡轮、没有燃气发生器、没有预燃室**——发动机中最难的部分被整个删掉了；
- **推力控制精确且快速**：调电机转速比调涡轮功率简单得多，响应更快；
- **启动可靠**：不需要火药启动器或复杂的启动时序，通电即可；
- **可以抛电池**：飞行中把耗尽的电池组分批抛掉，这是涡轮泵做不到的减重。

代价除了功率上限之外，还有**比冲损失**：电池是纯死重，不产生推力。Rutherford 的真空比冲 343 s，与同为煤油机的 Merlin（348 s）接近，说明这个代价在小推力段是可以接受的。`,
    },
    {
      question: "为什么不做动力回收？",
      answer: `Falcon 9 的一级靠自身发动机减速着陆，Electron 却用降落伞 + 海上打捞。原因是**推进剂预算在小火箭上根本不够**。

Falcon 9 回收要消耗约 6–8% 的一级推进剂，损失 LEO 运力约 23%。这个比例对一枚 22.8 t 运力的火箭意味着还剩 17.5 t——仍然是笔好生意。同样的比例放到 Electron 上：320 kg 的运力扣掉 23% 只剩 246 kg，而且小火箭的最小可控推力问题更严重（9 台 Rutherford 即使只点一台，对一枚空的一级来说推重比也远大于 1，无法悬停）。

降落伞回收的账不一样：只需要在箭体顶部加几十公斤的伞舱、隔热层与浮筒，运力损失在 10% 以内。代价是**箭体要经历海水浸泡**，翻新难度大得多——尤其是碳纤维结构和电气系统。

Rocket Lab 的实际结论很务实：一级整体复用的经济性不明朗，但**发动机复用是确定划算的**——Rutherford 占一级成本的大头，而它是密封的金属件，海水侵蚀相对可控。2024 年起飞行中已开始使用回收翻新的 Rutherford。

顺带一提：Peter Beck 曾在 2019 年公开表示「Electron 绝不会做回收，否则我把帽子吃掉」。一年后公司宣布回收计划时，他真的把一顶帽子搅碎吞了下去——这个梗现在是航天圈的经典段子。`,
    },
    {
      question: "小火箭的市场真的存在吗？",
      answer: `2018–2021 年间有超过 100 家小型运载火箭公司成立，绝大多数已经倒闭或转型。活下来并且真正持续发射的，全球不超过三家。

小火箭面对的结构性困难是：**SpaceX 的拼车发射（Transporter 任务）把每公斤价格压到了约 6,000 美元，而小火箭的成本下限在 2 万美元/kg 以上。** 对一个不在乎轨道精度、能等半年的客户，拼车永远更便宜。

Electron 能活下来，靠的是那些**不能拼车的客户**：

- **军方与情报卫星**：不愿与其他载荷共享发射，也不愿公开发射时间；
- **需要特殊轨道的科学任务**：如 NASA 的 CAPSTONE 月球轨道验证任务，用 Kick Stage 直接送入地月转移；
- **星座的补网发射**：星座里坏了一颗星，等半年拼车不可接受；
- **验证性任务**：新技术首飞不愿意跟别人挤在一起。

即便如此，Rocket Lab 的主要收入来源已经从发射服务转向了**卫星制造与组件**（反作用轮、太阳能帆板、星务计算机）。这提示了一个更普遍的判断：**在当前的市场规模下，纯粹的小型发射服务很难独立成为一门可持续的生意**——它更像是进入航天产业链的入场券，而不是终点。这也是 Rocket Lab 把战略重心转向中型可回收火箭 Neutron 的原因。`,
    },
  ],

  contemporaries: `同期的小型火箭里，**Astra Rocket 3.3**（成本更低但可靠性不足，已停产）、**Virgin Orbit LauncherOne**（空射方案，2023 年破产）、**Firefly Alpha**（1 t 级，介于小型与中型之间）是最直接的对手。中国的 **谷神星一号、快舟一号甲、双曲线一号** 走的是固体火箭路线——成本更低、准备时间更短，但比冲低、入轨精度差。

有意思的是，Electron 真正的竞争对手不是别的小火箭，而是 **Falcon 9 的拼车服务**：一次 Transporter 任务可以带上百颗小卫星，单价低一个数量级。小火箭必须在「拼车做不到的事」里找到自己的位置，这个空间比 2018 年时所有人预期的都要窄。`,

  milestones: [
    { date: "2017-05-25", title: '首飞 "It\'s a Test"', note: "地面遥测配置错误导致飞行终止，火箭本身正常。" },
    { date: "2018-01-21", title: '"Still Testing" 首次入轨', note: "第二次发射成功，并首次使用 Kick Stage。" },
    { date: "2020-11-20", title: "首次回收一级", note: "降落伞减速后海上打捞成功。" },
    { date: "2022-05-02", title: "直升机空中抓取尝试", note: "短暂抓住后释放，方案后被放弃。" },
    { date: "2022-06-28", title: "发射 CAPSTONE", note: "用 Kick Stage 把 25 kg 探测器送入地月转移轨道。" },
    { date: "2024-08", title: "复用 Rutherford 首次飞行", note: "回收翻新的发动机重新参加任务。" },
  ],

  launches: {
    total: 68,
    success: 64,
    failure: 4,
    asOf: "2025-06-30",
    notable: [
      { date: "2017-05-25", name: "It's a Test", note: "地面设备问题，非火箭故障。" },
      { date: "2020-07-04", name: "Pics Or It Didn't Happen", note: "二级电池连接失效。" },
      { date: "2022-06-28", name: "CAPSTONE", note: "小火箭首次执行地月转移任务。" },
      { date: "2023-09-19", name: "We Will Never Desert You", note: "二级供电系统失效，此后停飞两个月。" },
    ],
  },

  variants: [
    { name: "Electron (标准)", note: "一次性构型，LEO 320 kg。" },
    { name: "Electron (回收构型)", note: "带伞舱与隔热层，运力略低。" },
    { name: "HASTE", note: "亚轨道高超声速试验平台构型。" },
  ],
  relatedRockets: ["falcon-9", "zhuque-2"],
  principles: ["propellants-and-cycles", "structures-and-materials", "reusability"],

  geometry: g.build({
    fidelity: "schematic",
    modelNote: "按 Rocket Lab 用户手册的 18 m 总高、1.2 m 直径复原。各段长度分配为示意。涂装：碳纤维本色（黑）+ 白色字样；踢腿级包多层隔热金箔。",
  }),

  sources: [
    {
      title: "Electron Payload User's Guide",
      url: "https://www.rocketlabusa.com/assets/Uploads/Electron-Payload-User-Guide-7.0.pdf",
      publisher: "Rocket Lab",
      confidence: "high",
      note: "尺寸、运力、载荷包络与 Kick Stage 能力。",
    },
    {
      title: "Rocket Lab — Electron",
      url: "https://www.rocketlabusa.com/launch/electron/",
      publisher: "Rocket Lab",
      confidence: "high",
      note: "Rutherford 发动机参数与回收方案说明。",
    },
    {
      title: "Electron (rocket) — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Electron_(rocket)",
      publisher: "Wikipedia",
      confidence: "medium",
      note: "发射记录汇总，截至 2025-06-30。",
    },
  ],

  tags: ["小型运载", "电泵循环", "3D 打印", "商业航天", "碳纤维箭体"],
};
