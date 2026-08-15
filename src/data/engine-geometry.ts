import type { EngineCycle } from "./types";
import type { EngineEntry } from "./engines-index";

/**
 * 发动机的参数化几何。
 *
 * 关键点：**喷管尺寸不是捏出来的，是反算出来的。**
 *
 *   喉部面积  At = F / (Cf · Pc)      （Cf 为推力系数，取 1.7）
 *   出口半径  Re = Rt · √ε            （ε 为扩张比）
 *   钟形长度  Ln = 0.8 · (Re − Rt) / tan15°   （80% 钟形喷管的通行经验式）
 *
 * 用 F-1 验算：6,770 kN / (1.7 × 70 bar) → 喉部直径 0.85 m、出口直径 3.4 m、
 * 喷管长 3.8 m，与公开的 F-1 尺寸（喉径约 0.9 m、出口 3.7 m、长约 3.7 m）吻合。
 * 也就是说，只要推力、室压、扩张比这三个数是公开的，模型的比例就是可信的。
 *
 * 其余部件（涡轮泵、预燃室、管路）没有公开的通用尺寸，按与喉部半径成比例的
 * 经验值布置——它们是示意的，说明的是**连接关系**而不是具体外形。
 */

export interface EngineModelSpec {
  /** 喉部半径（m） */
  throatRadius: number;
  /** 燃烧室半径（m） */
  chamberRadius: number;
  /** 燃烧室圆柱段长度（m） */
  chamberLength: number;
  /** 收缩段长度（m） */
  convergeLength: number;
  /** 出口半径（m） */
  exitRadius: number;
  /** 扩张段长度（m） */
  nozzleLength: number;
  /** 主燃烧室数量 */
  chambers: number;
  /** 多室时各室中心距轴线的距离（m） */
  chamberOffset: number;
  /** 游动喷管数量 */
  verniers: number;

  hasTurbopump: boolean;
  /** 预燃室 / 燃气发生器数量：0=没有，1=燃气发生器或单预燃室，2=全流量 */
  preburners: 0 | 1 | 2;
  /** 涡轮废气是否排出箭外（开式循环特有的排气管） */
  hasDumpDuct: boolean;
  /** 电泵循环的电池组 */
  hasBattery: boolean;
  /** 膨胀循环的冷却回流总管 */
  hasExpanderManifold: boolean;
  /** 可展开 / 辐射冷却喷管延伸段：延伸段占扩张段长度的比例 */
  extensionFraction: number;
  /** 固体发动机：只有壳体与喷管 */
  solid: boolean;
  hasGimbal: boolean;

  /** 全长（m），用于取景与比例尺 */
  totalLength: number;
  /** 最大横向半径（m） */
  maxRadius: number;
  /** 数据可信度说明用：扩张比是否为估算 */
  derivedFrom: { thrustKN: number; chamberPressureBar: number; expansionRatio: number };
}

const CF = 1.7; // 推力系数，海平面到真空之间的典型值
const TAN15 = Math.tan((15 * Math.PI) / 180);

function featuresOf(cycle: EngineCycle) {
  switch (cycle) {
    case "gas-generator":
      return { pump: true, preburners: 1 as const, dump: true, battery: false, manifold: false };
    case "staged-combustion":
      return { pump: true, preburners: 1 as const, dump: false, battery: false, manifold: false };
    case "full-flow-staged-combustion":
      return { pump: true, preburners: 2 as const, dump: false, battery: false, manifold: false };
    case "expander":
      return { pump: true, preburners: 0 as const, dump: false, battery: false, manifold: true };
    case "electric-pump":
      return { pump: true, preburners: 0 as const, dump: false, battery: true, manifold: false };
    case "pressure-fed":
    case "solid":
    case "hybrid-unknown":
    default:
      return { pump: false, preburners: 0 as const, dump: false, battery: false, manifold: false };
  }
}

export function engineModelSpec(entry: EngineEntry): EngineModelSpec {
  const d = entry.detail;
  const spec = entry.spec;
  const chambers = d.chambers ?? 1;
  const solid = spec.cycle === "solid";

  // 室压缺失时按循环给一个量级（固体燃烧室压力典型 50–100 bar）
  const pcBar = d.chamberPressure ?? (solid ? 60 : 60);
  const eps = d.expansionRatio ?? (spec.ispVacuum && spec.ispVacuum > 380 ? 100 : 20);

  // 单室推力（kN → N）
  const thrustPerChamber = (spec.thrust * 1000) / chambers;
  const pcPa = pcBar * 1e5;

  const throatArea = thrustPerChamber / (CF * pcPa); // m²
  const throatRadius = Math.sqrt(throatArea / Math.PI);
  const exitRadius = throatRadius * Math.sqrt(eps);
  const nozzleLength = (0.8 * (exitRadius - throatRadius)) / TAN15;

  // 燃烧室：收缩比约 1.8（Rc ≈ 1.35·Rt），特征长度给一个常见值
  const chamberRadius = throatRadius * 1.35;
  const chamberLength = chamberRadius * (solid ? 6 : 2.4);
  const convergeLength = chamberRadius * 1.1;

  const f = featuresOf(spec.cycle);
  const pumpDriven = d.pumpDriven ?? f.pump;

  const chamberOffset = chambers > 1 ? chamberRadius * 1.35 : 0;
  const maxRadius = Math.max(exitRadius + chamberOffset, chamberRadius * (pumpDriven ? 2.4 : 1.4));
  const totalLength = chamberLength + convergeLength + nozzleLength + (pumpDriven ? chamberRadius * 2.2 : chamberRadius * 0.8);

  return {
    throatRadius,
    chamberRadius,
    chamberLength,
    convergeLength,
    exitRadius,
    nozzleLength,
    chambers,
    chamberOffset,
    verniers: d.verniers ?? 0,
    hasTurbopump: pumpDriven && !solid,
    preburners: solid ? 0 : f.preburners,
    hasDumpDuct: f.dump,
    hasBattery: f.battery,
    hasExpanderManifold: f.manifold,
    extensionFraction: d.nozzleExtension ? 0.45 : 0,
    solid,
    hasGimbal: !solid,
    totalLength,
    maxRadius,
    derivedFrom: { thrustKN: spec.thrust, chamberPressureBar: pcBar, expansionRatio: eps },
  };
}

/**
 * 钟形喷管的母线（返回 [半径, 轴向] 点列，轴向 0 在喉部、向下为正）。
 * 用两条切线的交点作为二次贝塞尔控制点，是 80% 钟形喷管的标准近似画法。
 */
export function bellProfile(
  Rt: number,
  Re: number,
  Ln: number,
  segments = 22,
  thetaN = (30 * Math.PI) / 180,
  thetaE = (8 * Math.PI) / 180,
): [number, number][] {
  const tn = Math.tan(thetaN);
  const te = Math.tan(thetaE);
  const y1 = (Re - Rt - Ln * te) / (tn - te);
  const r1 = Rt + y1 * tn;

  const pts: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    const r = mt * mt * Rt + 2 * mt * t * r1 + t * t * Re;
    const y = mt * mt * 0 + 2 * mt * t * y1 + t * t * Ln;
    pts.push([r, y]);
  }
  return pts;
}

/** 收缩段母线：燃烧室半径平滑收到喉部 */
export function convergeProfile(
  Rc: number,
  Rt: number,
  L: number,
  segments = 12,
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // 余弦过渡，两端相切，避免出现折角
    const r = Rt + (Rc - Rt) * (0.5 + 0.5 * Math.cos(Math.PI * t));
    pts.push([r, -L + t * L]);
  }
  return pts;
}
