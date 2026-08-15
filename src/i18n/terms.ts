import type { EngineCycle, PropellantType } from "@/data/types";
import type { Locale } from "./config";

/**
 * 术语表：推进剂、动力循环这类在整站反复出现的枚举标签。
 * 与 dict.ts 分开，是因为它们的键来自数据模型的枚举，改数据模型时应该一起改这里。
 */

export const PROPELLANT_LABEL: Record<
  Locale,
  Record<PropellantType, { label: string; short: string; color: string }>
> = {
  zh: {
    kerolox: { label: "煤油 / 液氧", short: "煤油", color: "#f0a04b" },
    hydrolox: { label: "液氢 / 液氧", short: "氢氧", color: "#4fd1ff" },
    methalox: { label: "甲烷 / 液氧", short: "甲烷", color: "#5fd68a" },
    hypergolic: { label: "自燃推进剂", short: "自燃", color: "#c792ea" },
    solid: { label: "固体", short: "固体", color: "#9aa4b6" },
    alcolox: { label: "乙醇 / 液氧", short: "乙醇", color: "#e5c07b" },
  },
  en: {
    kerolox: { label: "Kerosene / LOX", short: "Kerolox", color: "#f0a04b" },
    hydrolox: { label: "Liquid hydrogen / LOX", short: "Hydrolox", color: "#4fd1ff" },
    methalox: { label: "Liquid methane / LOX", short: "Methalox", color: "#5fd68a" },
    hypergolic: { label: "Hypergolic (N₂O₄ / UDMH)", short: "Hypergolic", color: "#c792ea" },
    solid: { label: "Solid", short: "Solid", color: "#9aa4b6" },
    alcolox: { label: "Ethanol / LOX", short: "Alcolox", color: "#e5c07b" },
  },
};

export const PROPELLANT_TRADEOFF: Record<Locale, Record<PropellantType, string>> = {
  zh: {
    kerolox: "密度高、常温、便宜、基础设施成熟；比冲中等，燃烧会积碳，对复用不够友好。",
    hydrolox: "比冲最高（440–465 s）；但密度只有 71 kg/m³，贮箱巨大，需要 −253 °C 深冷与厚重绝热。",
    methalox: "比冲与密度居中，燃烧洁净不积碳，与液氧温差小便于共底贮箱——近十年可回收火箭的共同选择。",
    hypergolic: "接触即自燃、常温可长期贮存、可反复启停；代价是剧毒、致癌与偏低的比冲。",
    solid: "推力密度最高、结构最简单、可贮存数年；但比冲最低，且点火后无法关机或节流。",
    alcolox: "燃烧温度低、易冷却、可用农产品发酵获得；比冲很低，只在早期火箭上使用。",
  },
  en: {
    kerolox:
      "Dense, storable at room temperature, cheap, and backed by mature ground infrastructure. Middling specific impulse, and combustion leaves coking deposits that make reuse harder.",
    hydrolox:
      "The highest specific impulse of any practical propellant (440–465 s), but at 71 kg/m³ it needs enormous tanks, −253 °C cryogenics and heavy insulation.",
    methalox:
      "Sits between the two on both impulse and density, burns clean with no coking, and its boiling point is close enough to LOX to allow a simple common bulkhead — which is why almost every reusable vehicle of the last decade chose it.",
    hypergolic:
      "Ignites on contact, stores indefinitely at room temperature, restarts freely. The price is acute toxicity, carcinogenicity, and low specific impulse.",
    solid:
      "The highest thrust density and the simplest structure, storable for years — but the lowest specific impulse, and once lit it can be neither throttled nor shut down.",
    alcolox:
      "Low flame temperature, easy to cool, and producible by fermentation. Specific impulse is poor; used only on the earliest rockets.",
  },
};

export const CYCLE_EXPLAIN: Record<Locale, Record<EngineCycle, string>> = {
  zh: {
    "gas-generator":
      "一小部分推进剂在燃气发生器中燃烧驱动涡轮，废气直接排出箭体，损失约 2–5% 流量。结构简单、易调试。",
    "staged-combustion":
      "预燃室中富燃或富氧燃烧的燃气驱动涡轮后全部注入主燃烧室，没有推进剂被浪费。比冲更高，但涡轮工作环境苛刻。",
    "full-flow-staged-combustion":
      "燃料与氧化剂各有一个预燃室，两路燃气全部进主燃烧室。涡轮温度低、寿命长，是复用发动机的理想循环，也是研制难度最高的。",
    expander:
      "推进剂在冷却推力室时吸热汽化，直接驱动涡轮泵。没有燃气发生器与预燃室，最简单可靠，但推力受换热面积限制。",
    "electric-pump":
      "电机驱动泵，电池供电。删掉了涡轮与燃气回路，但电池是死重，存在明确的推力上限。",
    "pressure-fed": "靠高压气体把推进剂挤入燃烧室。没有转动部件，但贮箱必须承受燃烧室压力，因而笨重。",
    solid: "推进剂预先浇筑成药柱，点火后按预定推力曲线燃烧到底。推力密度高，但不可关机、不可节流。",
    "hybrid-unknown": "混合式或公开信息不足。",
  },
  en: {
    "gas-generator":
      "A small fraction of the propellant burns in a gas generator to drive the turbine; the exhaust is dumped overboard, costing roughly 2–5% of the flow. Simple to build and to debug.",
    "staged-combustion":
      "A fuel-rich or oxidiser-rich preburner drives the turbine, and all of that gas is then injected into the main chamber — nothing is wasted. Higher impulse, at the price of a brutal turbine environment.",
    "full-flow-staged-combustion":
      "Fuel and oxidiser each get their own preburner and both gas streams enter the main chamber. Turbine temperatures stay low and life is long, which makes it the ideal cycle for a reusable engine — and the hardest one to develop.",
    expander:
      "Propellant vaporises while cooling the thrust chamber and drives the turbopump directly. No gas generator, no preburner: the simplest and most reliable cycle, but thrust is capped by available heat-exchange area.",
    "electric-pump":
      "Electric motors drive the pumps, powered by batteries. The turbine and gas circuit disappear entirely, but the batteries are dead weight and impose a hard thrust ceiling.",
    "pressure-fed":
      "High-pressure gas pushes propellant into the chamber. No rotating machinery, but the tanks must withstand chamber pressure and are therefore heavy.",
    solid:
      "The propellant is cast as a grain and burns to a predetermined thrust curve once lit. Very high thrust density; no shutdown, no throttling.",
    "hybrid-unknown": "Hybrid, or insufficient public information.",
  },
};

export const GROUP_LABEL: Record<
  Locale,
  Record<"payload" | "stage-3" | "stage-2" | "stage-1" | "core" | "booster", string>
> = {
  zh: {
    payload: "载荷 / 整流罩",
    "stage-3": "三级",
    "stage-2": "二级",
    "stage-1": "一级",
    core: "芯级",
    booster: "助推器",
  },
  en: {
    payload: "Payload / fairing",
    "stage-3": "Third stage",
    "stage-2": "Second stage",
    "stage-1": "First stage",
    core: "Core stage",
    booster: "Boosters",
  },
};
