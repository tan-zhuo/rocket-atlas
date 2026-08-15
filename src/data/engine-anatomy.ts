import type { EngineCycle } from "./types";
import type { Locale } from "@/i18n/config";

/**
 * 发动机原理栏目的文字内容。
 *
 * 这一栏解决的问题和「发动机目录」不同：目录回答「有哪些发动机、各自什么参数」，
 * 这一栏回答「一台发动机内部到底发生了什么、每个零件为什么存在」。
 * 所以它按结构与概念组织，而不是按型号。
 */

/** 画了流程图的循环（固体与未公开没有泵系统流程可画） */
export type DiagramCycle = Exclude<EngineCycle, "solid" | "hybrid-unknown">;

export interface AnatomyPart {
  id: string;
  name: string;
  /** 一句话职能 */
  role: string;
  /** 为什么它是这个样子 */
  body: string;
}

export interface Concept {
  id: string;
  title: string;
  body: string;
}

export interface AnatomyCopy {
  title: string;
  lead: string;
  sectionAnatomy: string;
  anatomyLead: string;
  parts: AnatomyPart[];
  sectionCycles: string;
  cyclesLead: string;
  /** 只覆盖有流程图的六种循环 */
  cycleNote: Record<DiagramCycle, string>;
  /** 循环流程图上的节点标签 */
  nodes: {
    fuel: string;
    ox: string;
    pump: string;
    turbine: string;
    gg: string;
    preburner: string;
    preburnerFuel: string;
    preburnerOx: string;
    chamber: string;
    battery: string;
    motor: string;
    helium: string;
    dump: string;
    jacket: string;
  };
  sectionConcepts: string;
  conceptsLead: string;
  concepts: Concept[];
  hint: string;
  toCatalogue: string;
}

const zh: AnatomyCopy = {
  title: "发动机是怎么工作的",
  lead: "一台泵压式液体火箭发动机，本质上是把两种低压液体在几秒内变成每秒几百公斤、几千度的超声速气流。下面这张剖面图把这条链路上的每个零件拆开——点任意部件读它为什么存在。",

  sectionAnatomy: "结构剖面",
  anatomyLead:
    "这是一台燃气发生器循环液体发动机的典型剖面。推进剂从上方进入，经泵增压后分两路：大头进主燃烧室，一小股先在燃气发生器里烧掉去驱动涡轮。",

  parts: [
    {
      id: "gimbal",
      name: "万向节",
      role: "把整台发动机装在一个可偏转的关节上，实现推力矢量控制。",
      body: "运载火箭在气动上是静不稳定的，必须持续主动控制姿态。让整台发动机偏转 ±5–8° 是目前最主流的做法——不损失任何推力，控制力矩也大。代价是推进剂管路必须做成柔性的，还要一套大功率作动器。V-2 做不到这一点，只能把石墨舵伸进尾焰里，白白损失 17% 的推力。",
    },
    {
      id: "valves",
      name: "主阀与推进剂入口",
      role: "控制两路推进剂何时、以多大流量进入发动机。",
      body: "启动时序是液体发动机最容易出事的环节之一：燃料和氧化剂谁先进、进多快，直接决定燃烧室里是平稳点火还是一次硬启动爆炸。主阀通常由高压氦或液压驱动，开启曲线是精心标定出来的。可重复启动的发动机（如 J-2、RL10）在这里还要多一套沉底与再点火系统。",
    },
    {
      id: "pumps",
      name: "涡轮泵",
      role: "把贮箱里几个大气压的推进剂增压到燃烧室压力的 1.5–2 倍。",
      body: "这是发动机里最贵、最难造、研制周期最长的部件。以 F-1 为例，涡轮泵功率超过 40,000 kW——相当于一艘驱逐舰的主机，却要塞进一个人抱得住的体积里，还要在液氧（−183 °C）和燃气（数百度）之间只隔几厘米。泵的转速普遍在每分钟一万至数万转，叶轮尖端速度接近声速。**电泵循环之所以是个有意思的方案，就是因为它把这个最难的东西整个删掉了。**",
    },
    {
      id: "turbine",
      name: "涡轮",
      role: "驱动泵的动力源，由高温燃气推动。",
      body: "涡轮的工作环境决定了发动机能活多久：温度越高、流量越小，涡轮越吃力。燃气发生器循环里只有百分之几的推进剂流经涡轮，所以燃气必须很热；全流量分级燃烧让**全部**流量都流过涡轮，同样功率下温度可以低几百度，寿命因此大幅延长——这正是它被选为复用发动机循环的根本原因。",
    },
    {
      id: "gas-generator",
      name: "燃气发生器 / 预燃室",
      role: "以极不平衡的混合比燃烧一小部分推进剂，产生驱动涡轮的燃气。",
      body: "这里不能按最佳混合比燃烧——那样温度会高到烧穿涡轮。所以要么富燃（多加燃料，靠没烧的燃料吸热降温），要么富氧。富氧燃气会腐蚀涡轮与管路，需要特殊的抗氧化涂层，这是苏/俄冶金积累了几十年的门槛；富燃则要面对积碳。**燃气发生器循环把这股燃气排掉（损失 2–5% 流量），分级燃烧把它送进主燃烧室继续烧（一点不浪费）——这就是两种循环的全部区别。**",
    },
    {
      id: "injector",
      name: "喷注器",
      role: "把两路推进剂雾化并均匀混合后送进燃烧室。",
      body: "喷注器面板上有成百上千个孔，它们的孔径、角度、排布决定了燃烧是否稳定。**F-1 在这里卡了将近四年**：燃烧释放的压力波与燃烧室的声学模态耦合，形成自激振荡，几十毫秒就能把喷注器面板烧穿。最后靠铜面板上的径向与周向隔板把高频振荡压下去，还专门用小炸药包在燃烧室里人为制造扰动，验证它能在 0.1 s 内自行恢复。V-2 则用了 18 个杯状喷注头把燃烧分区，绕开这个当时无解的问题。",
    },
    {
      id: "chamber",
      name: "燃烧室",
      role: "推进剂在这里完成燃烧，把化学能变成高温高压气体。",
      body: "燃烧室压力（室压）是衡量循环先进程度最直接的单一指标：F-1 是 70 bar，Merlin 1D 是 97 bar，RD-180 是 257 bar，Raptor 超过 300 bar。室压越高，同样尺寸能产生越大推力，喷管也能做更大的扩张比。但室压每提高一档，对泵功率、材料、冷却和燃烧稳定性的要求都同步提高——**开式循环几乎不可能做到 200 bar 以上，这是循环决定性能上限的具体机制。**",
    },
    {
      id: "cooling",
      name: "再生冷却夹套",
      role: "让推进剂在进燃烧室之前，先绕着室壁流一圈把热量带走。",
      body: "燃烧室内壁面对的是 3,000 °C 以上的燃气，而任何金属都撑不住。再生冷却的巧妙之处在于**热量没有被浪费**：燃料吸走的热量随它一起进了燃烧室。F-1 的推力室由数千根镍合金管钎焊而成，煤油从管里流过——这套工艺高度依赖特定工人的手艺，也正是土星五号停产后难以复现的直接原因。膨胀循环更进一步：干脆把这些热量直接当作涡轮的动力源。",
    },
    {
      id: "throat",
      name: "喉部",
      role: "燃烧室与喷管之间最窄的截面，气流在这里达到声速。",
      body: "喉部是整台发动机热流密度最高的地方，也是决定流量的地方——推力大致正比于喉部面积乘以室压。一旦气流在喉部达到声速，燃烧室里的压力就不再受下游影响（壅塞），这也是火箭发动机在真空里照样能工作的原因。喉部尺寸一旦被烧蚀改变，整台发动机的工作点都会漂移。",
    },
    {
      id: "nozzle",
      name: "喷管扩张段",
      role: "把声速气流继续加速到超声速，把压力能变成速度。",
      body: "扩张比（出口面积 / 喉部面积）决定了比冲。海平面发动机的扩张比不能太大，否则出口压力低于大气压会发生**流动分离**，气流在喷管里就脱开壁面，产生剧烈侧向载荷；真空发动机则可以做到几百的扩张比（RL10B-2 是 285）。这就是为什么同一台发动机会有海平面版和真空版两种喷管——Merlin、Raptor、天鹊都是这么干的。",
    },
    {
      id: "exhaust",
      name: "涡轮排气",
      role: "燃气发生器循环里，驱动完涡轮的废气直接排掉。",
      body: "这股废气占推进剂流量的 2–5%，几乎不产生推力，是开式循环比冲偏低的直接原因。有些设计把它引到喷管裙部当作膜冷却顺便利用一下（Vulcain 2 就是这么做的）。**火箭起飞时喷管旁那股颜色偏暗的烟，就是它。** 分级燃烧与全流量循环没有这股排气——这也是从外观上区分循环最简单的办法之一。",
    },
  ],

  sectionCycles: "六种动力循环",
  cyclesLead:
    "所有差别归结为一个问题：**驱动泵的能量从哪来，用完的燃气去哪儿。** 下面六张流程图是同一个问题的六种答案。",
  cycleNote: {
    "gas-generator":
      "最常见、最容易研制的方案。代价是那 2–5% 被排掉的推进剂，以及由此带来的比冲损失。",
    "staged-combustion":
      "涡轮废气全部进主燃烧室，一点不浪费。代价是涡轮工作在高温富氧或富燃燃气里，材料与工艺门槛陡增。",
    "full-flow-staged-combustion":
      "燃料与氧化剂各一个预燃室，两路燃气都进主燃烧室。涡轮温度最低、寿命最长，但要造两套涡轮泵和两个预燃室。",
    expander:
      "不烧任何额外推进剂：燃料在冷却室壁时吸收的热量就是涡轮的动力。最简单可靠，但推力被换热面积卡死，只能做上面级。",
    "electric-pump":
      "用电机和电池取代涡轮，发动机里最难的部分被整个删掉。代价是电池不产生推力，且功率随推力线性增长，存在明确的推力上限。",
    "pressure-fed":
      "干脆不要泵，用高压气体把推进剂挤进燃烧室。没有转动部件，但贮箱必须承受燃烧室压力，因而笨重、室压受限。",
  },

  nodes: {
    fuel: "燃料",
    ox: "氧化剂",
    pump: "泵",
    turbine: "涡轮",
    gg: "燃气发生器",
    preburner: "预燃室",
    preburnerFuel: "富燃预燃室",
    preburnerOx: "富氧预燃室",
    chamber: "燃烧室",
    battery: "电池",
    motor: "电机",
    helium: "高压氦",
    dump: "排出",
    jacket: "冷却夹套",
  },

  sectionConcepts: "几个反复出现的概念",
  conceptsLead: "读发动机参数表时，下面这几个量比「推力多大」更能说明问题。",
  concepts: [
    {
      id: "isp",
      title: "比冲（Isp）",
      body: "单位重量推进剂产生的冲量，单位是秒。可以粗略理解为「燃料效率」：比冲 300 s 意味着 1 kg 推进剂能产生 1 kg 力的推力持续 300 秒。它直接进入火箭方程的指数部分，所以上面级每提高 1% 比冲，几乎就是 1% 的载荷。同一台发动机在真空里的比冲总是高于海平面，因为大气压会抵消一部分喷管出口的推力。",
    },
    {
      id: "expansion",
      title: "扩张比与过膨胀",
      body: "喷管出口面积除以喉部面积。扩张比越大，气流被加速得越充分，比冲越高——但只在出口压力接近环境压力时成立。海平面上用大扩张比喷管会**过膨胀**：出口压力低于大气压，气流在喷管内脱离壁面，产生剧烈的侧向载荷，严重时能把喷管撕开。这就是真空发动机不能在低空点火的原因，也是海平面版与真空版必须分开设计的原因。",
    },
    {
      id: "mixture",
      title: "混合比",
      body: "氧化剂与燃料的质量比。它不是按化学恰当比来选的：氢氧发动机的恰当比约 8:1，实际却普遍用 5.5:1 左右——多带的燃料既能降低燃烧温度保护室壁，又因为氢的分子量低而提高排气速度。换句话说，**混合比是在比冲、温度与贮箱体积之间做的一次三方权衡。**",
    },
    {
      id: "throttle",
      title: "节流与重启",
      body: "节流是可回收火箭的前提：一枚烧空的一级即使只点一台发动机，推重比也远大于 1，必须能把推力压到 40% 以下才可能软着陆。而重启能力决定了任务剖面——能不能在轨道上滑行半圈再点火，直接决定了能否执行直接 GEO 注入、地月转移和末级离轨。这两项都必须从设计之初就规划（需要沉底系统、多次点火器、更长的低温贮存），无法后期加装。",
    },
    {
      id: "instability",
      title: "燃烧不稳定",
      body: "燃烧释放的压力波与燃烧室的声学模态耦合形成自激振荡，可以在几十毫秒内烧穿喷注器。燃烧室越大越容易发生，这正是格鲁什科选择「四个小燃烧室共用一套涡轮泵」而不是造一个大燃烧室的原因，也是 F-1 卡了四年的原因。今天的对策是喷注器隔板、声腔和大量的稳定性试验（包括人为在燃烧室里引爆小炸药包，看它能不能自行恢复）。",
    },
    {
      id: "twr",
      title: "推重比",
      body: "发动机推力除以自身重量。Merlin 1D 约 180，是量产液体发动机中的顶尖水平；而 RL10 只有约 37——因为它是上面级发动机，推力小、喷管大，且用了极致轻的材料换比冲。发动机自重是「上面级每一公斤更值钱」这条规律的直接受益对象：上面级发动机可以牺牲推重比换比冲，一级发动机则相反。",
    },
  ],

  hint: "点击剖面图上的任意部件查看说明",
  toCatalogue: "查看全部 31 型发动机 →",
};

const en: AnatomyCopy = {
  title: "How a rocket engine works",
  lead: "A pump-fed liquid rocket engine turns two low-pressure liquids into several hundred kilograms per second of supersonic gas at a few thousand degrees. The cutaway below takes that chain apart piece by piece — click any component to read why it exists.",

  sectionAnatomy: "Cutaway",
  anatomyLead:
    "A typical cutaway of a gas-generator cycle liquid engine. Propellant enters from the top, is pressurised by the pumps and then splits two ways: the bulk goes to the main chamber, while a small fraction is burned in the gas generator to drive the turbine.",

  parts: [
    {
      id: "gimbal",
      name: "Gimbal mount",
      role: "Hangs the whole engine on a joint so it can be deflected for thrust vector control.",
      body: "A launch vehicle is aerodynamically unstable and needs continuous active attitude control. Deflecting the entire engine ±5–8° is the mainstream solution: no thrust is lost and the control moment is large. The price is flexible propellant lines and a set of high-power actuators. The V-2 could not do this, and instead put graphite vanes in its exhaust — throwing away 17% of its thrust.",
    },
    {
      id: "valves",
      name: "Main valves and propellant inlets",
      role: "Control when and how fast each propellant enters the engine.",
      body: "Start sequencing is one of the most failure-prone parts of a liquid engine: which propellant arrives first, and how quickly, decides whether the chamber lights smoothly or detonates on a hard start. The main valves are usually driven by high-pressure helium or hydraulics, on carefully calibrated opening curves. Restartable engines (J-2, RL10) add ullage settling and re-ignition hardware here.",
    },
    {
      id: "pumps",
      name: "Turbopump",
      role: "Raises propellant from a few bar in the tanks to 1.5–2 times chamber pressure.",
      body: "This is the most expensive, most difficult and longest-lead component in the engine. The F-1's turbopump delivered more than 40,000 kW — destroyer-sized machinery packed into a volume a person could hug, with only centimetres separating liquid oxygen at −183 °C from combustion gas at several hundred degrees. Shaft speeds run from ten thousand to tens of thousands of rpm, with impeller tip speeds near sonic. **The electric pump cycle is interesting precisely because it deletes this whole problem.**",
    },
    {
      id: "turbine",
      name: "Turbine",
      role: "The power source that drives the pumps, spun by hot gas.",
      body: "The turbine's operating environment sets how long an engine lives: the hotter it runs and the less flow it gets, the harder its life. In a gas-generator cycle only a few percent of the propellant passes through, so that gas has to be very hot. Full-flow staged combustion sends **all** of the flow through the turbines, so the same power can be extracted hundreds of degrees cooler — which is exactly why it was chosen for a reusable engine.",
    },
    {
      id: "gas-generator",
      name: "Gas generator / preburner",
      role: "Burns a small fraction of the propellant at a heavily unbalanced ratio to make turbine drive gas.",
      body: "It cannot burn at the optimum ratio — that would be hot enough to destroy the turbine. So it runs either fuel-rich (excess fuel absorbs heat) or oxidiser-rich. Oxidiser-rich gas attacks turbines and ducting and needs specialised oxidation-resistant coatings, a barrier Soviet and Russian metallurgy spent decades clearing; fuel-rich brings coking instead. **A gas-generator cycle dumps this gas overboard (losing 2–5% of flow); staged combustion sends it into the main chamber to finish burning. That is the entire difference between the two cycles.**",
    },
    {
      id: "injector",
      name: "Injector",
      role: "Atomises and mixes the two propellants before they enter the chamber.",
      body: "The injector face carries hundreds or thousands of orifices, and their diameter, angle and pattern determine whether combustion is stable. **The F-1 was stuck here for nearly four years**: pressure waves from combustion coupled with the chamber's acoustic modes into a self-sustaining oscillation that could burn through the injector face in tens of milliseconds. Radial and circumferential baffles on a copper face eventually damped it, and small explosive charges were detonated inside the running chamber to prove it recovered within 0.1 s. The V-2 dodged the problem entirely by dividing combustion across 18 cup-shaped injector pots.",
    },
    {
      id: "chamber",
      name: "Combustion chamber",
      role: "Where combustion completes, turning chemical energy into hot high-pressure gas.",
      body: "Chamber pressure is the clearest single indicator of how sophisticated a cycle is: 70 bar for the F-1, 97 for Merlin 1D, 257 for the RD-180, over 300 for Raptor. Higher pressure means more thrust from the same size and allows a larger nozzle expansion ratio. But every step up raises the demands on pump power, materials, cooling and combustion stability together — **an open cycle can barely exceed 200 bar, which is the concrete mechanism by which the cycle sets the performance ceiling.**",
    },
    {
      id: "cooling",
      name: "Regenerative cooling jacket",
      role: "Routes propellant around the chamber wall before it is burned, carrying the heat away.",
      body: "The chamber wall faces gas above 3,000 °C, which no metal survives unaided. The elegance of regenerative cooling is that **the heat is not wasted** — it goes into the chamber along with the fuel that absorbed it. The F-1's thrust chamber was brazed from thousands of nickel-alloy tubes with kerosene flowing through them, a process so dependent on particular workers' craft that it is the direct reason Saturn V could not simply be rebuilt. The expander cycle goes one step further and uses that heat as the turbine's power source.",
    },
    {
      id: "throat",
      name: "Throat",
      role: "The narrowest section between chamber and nozzle, where the flow reaches the speed of sound.",
      body: "The throat sees the highest heat flux anywhere in the engine and sets the mass flow — thrust is roughly proportional to throat area times chamber pressure. Once flow chokes at sonic velocity, chamber pressure becomes independent of what happens downstream, which is why a rocket engine works just as well in vacuum. If erosion changes the throat dimension, the engine's entire operating point drifts.",
    },
    {
      id: "nozzle",
      name: "Nozzle expansion section",
      role: "Accelerates the sonic flow to supersonic, trading pressure for velocity.",
      body: "The expansion ratio (exit area over throat area) determines specific impulse. A sea-level engine cannot use a large one: if exit pressure falls below ambient the flow **separates**, tearing away from the wall inside the nozzle and generating violent side loads. A vacuum engine can run ratios in the hundreds (285 for the RL10B-2). This is why the same engine gets sea-level and vacuum nozzle variants — Merlin, Raptor and Tianque all do it.",
    },
    {
      id: "exhaust",
      name: "Turbine exhaust",
      role: "In a gas-generator cycle, the spent drive gas is simply dumped.",
      body: "That exhaust is 2–5% of propellant flow and produces almost no thrust, which is the direct reason open cycles have lower specific impulse. Some designs route it to the nozzle skirt as film cooling to recover a little value (Vulcain 2 does). **The darker plume beside the nozzles at liftoff is exactly this.** Staged combustion and full-flow cycles have no such exhaust — one of the easiest ways to tell cycles apart by eye.",
    },
  ],

  sectionCycles: "Six engine cycles",
  cyclesLead:
    "Every difference reduces to one question: **where does the power to drive the pumps come from, and where does the spent gas go.** The six diagrams below are six answers to it.",
  cycleNote: {
    "gas-generator":
      "The most common and easiest to develop. The price is the 2–5% of propellant dumped overboard and the impulse that goes with it.",
    "staged-combustion":
      "All of the turbine exhaust enters the main chamber; nothing is wasted. The price is a turbine working in hot oxidiser-rich or fuel-rich gas, which raises the materials bar steeply.",
    "full-flow-staged-combustion":
      "A preburner for each propellant, with both gas streams entering the main chamber. The lowest turbine temperatures and the longest life — but two turbopumps and two preburners to build.",
    expander:
      "Burns nothing extra: the heat the fuel absorbs while cooling the chamber is the turbine's power. The simplest and most reliable arrangement, with thrust capped by heat-exchange area — upper stages only.",
    "electric-pump":
      "Motors and batteries replace the turbine, deleting the hardest part of the engine. The batteries produce no thrust, and required power scales linearly with thrust, so there is a hard ceiling.",
    "pressure-fed":
      "No pumps at all: high-pressure gas pushes propellant into the chamber. No rotating machinery, but the tanks must hold chamber pressure, so they are heavy and pressure is limited.",
  },

  nodes: {
    fuel: "Fuel",
    ox: "Oxidiser",
    pump: "Pump",
    turbine: "Turbine",
    gg: "Gas generator",
    preburner: "Preburner",
    preburnerFuel: "Fuel-rich preburner",
    preburnerOx: "Ox-rich preburner",
    chamber: "Chamber",
    battery: "Battery",
    motor: "Motor",
    helium: "He pressurant",
    dump: "Overboard",
    jacket: "Cooling jacket",
  },

  sectionConcepts: "A few recurring quantities",
  conceptsLead:
    "When reading an engine data sheet, the following say more than “how much thrust”.",
  concepts: [
    {
      id: "isp",
      title: "Specific impulse (Isp)",
      body: "Impulse per unit weight of propellant, in seconds. Roughly, it is fuel efficiency: 300 s means one kilogram of propellant can produce one kilogram of force for 300 seconds. It enters the rocket equation inside the exponent, so on an upper stage a 1% gain in impulse is very nearly 1% more payload. The same engine always performs better in vacuum than at sea level, because ambient pressure cancels part of the thrust at the nozzle exit.",
    },
    {
      id: "expansion",
      title: "Expansion ratio and over-expansion",
      body: "Exit area divided by throat area. A larger ratio accelerates the flow more completely and raises impulse — but only while exit pressure stays close to ambient. Using a large ratio at sea level causes **over-expansion**: exit pressure drops below ambient, the flow separates from the wall inside the nozzle, and violent side loads follow — enough to tear a nozzle apart in bad cases. That is why vacuum engines cannot be lit at low altitude, and why sea-level and vacuum variants must be designed separately.",
    },
    {
      id: "mixture",
      title: "Mixture ratio",
      body: "The mass ratio of oxidiser to fuel — and it is never chosen at the stoichiometric value. Hydrolox is stoichiometric around 8:1 but almost always runs near 5.5:1: the extra fuel lowers flame temperature to protect the walls, and hydrogen's low molecular weight raises exhaust velocity. **Mixture ratio is a three-way trade between impulse, temperature and tank volume.**",
    },
    {
      id: "throttle",
      title: "Throttling and restart",
      body: "Throttling is the precondition for reusability: an empty first stage has a thrust-to-weight ratio well above one even on a single engine, so thrust must come below about 40% for a soft landing to be possible. Restart capability defines the mission profile — whether the stage can coast half an orbit and light again decides whether direct GEO insertion, translunar injection and disposal burns are available at all. Both must be designed in from the start (ullage settling, multiple igniters, longer cryogenic hold) and cannot be retrofitted.",
    },
    {
      id: "instability",
      title: "Combustion instability",
      body: "Pressure waves from combustion couple with the chamber's acoustic modes into a self-sustaining oscillation that can burn through an injector in tens of milliseconds. Larger chambers are more prone to it, which is exactly why Glushko chose four small chambers on one turbopump rather than building one large chamber, and why the F-1 lost four years. Today's countermeasures are injector baffles, acoustic cavities and extensive stability testing — including detonating small charges inside a running chamber to see whether it recovers.",
    },
    {
      id: "twr",
      title: "Thrust-to-weight ratio",
      body: "Engine thrust divided by its own weight. Merlin 1D reaches about 180, among the best of any production liquid engine; the RL10 manages only about 37 — because it is an upper stage engine with modest thrust, a large nozzle and materials chosen for impulse rather than mass. Engine mass is a direct beneficiary of the rule that upper-stage kilograms are worth more: an upper stage engine can trade thrust-to-weight for impulse, and a booster engine does the opposite.",
    },
  ],

  hint: "Click any component in the cutaway to read about it",
  toCatalogue: "Browse all 31 engines →",
};

export const ANATOMY_COPY: Record<Locale, AnatomyCopy> = { zh, en };

/** 剖面图上各部件的高亮顺序（自上而下），与 SVG 里的 id 对应 */
export const ANATOMY_ORDER = [
  "gimbal",
  "valves",
  "pumps",
  "turbine",
  "gas-generator",
  "injector",
  "chamber",
  "cooling",
  "throat",
  "nozzle",
  "exhaust",
] as const;

export const CYCLE_ORDER: DiagramCycle[] = [
  "gas-generator",
  "staged-combustion",
  "full-flow-staged-combustion",
  "expander",
  "electric-pump",
  "pressure-fed",
];
