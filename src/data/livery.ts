import type { PartLivery } from "./types";

/**
 * 涂装素材库。
 *
 * 箭体上的颜色几乎没有一处是纯装饰：
 *   - 橙色泡沫、软木层、隔热瓦是**材料本色**，涂白反而增重（见 FINISH）
 *   - 灰色底漆、黑白滚动标识是**任务需要**（防腐、地面光学判读滚转角）
 *   - 国旗与承包商标识是**法定标识**，位置固定在一级上段
 * 所以这里的每个常量都尽量贴着真实箭体的用色，而不是挑好看的颜色。
 *
 * 注意：本站模型是按公开尺寸与公开照片复原的示意模型，涂装同样是**特征级还原**——
 * 抓住那几处能一眼认出型号的颜色，不逐条复刻贴纸与小字。
 */

// ── 常用漆色 ──────────────────────────────────────────────
export const PAINT = {
  /** 大多数箭体白漆偏冷 */
  white: "#e9edf4",
  offWhite: "#dfe3ea",
  black: "#15171c",
  darkGrey: "#3b4048",
  /** 联盟号尾段与助推器箍圈的那道橙 */
  soyuzOrange: "#d0762c",
  /** 中国航天的正红 */
  casc: "#c8102e",
  /** ULA 的深蓝与红 */
  ulaBlue: "#1b3a6b",
  ulaRed: "#c8342c",
  /** ESA / Arianespace 的蓝 */
  esaBlue: "#1b3a8c",
  /** JAXA 的蓝与日之丸红 */
  jaxaBlue: "#0b3d91",
  jpRed: "#bc002d",
  /** ISRO 标识的橙红 */
  isro: "#e04b16",
  /** NASA 的蓝与「蠕虫」红 */
  nasaBlue: "#0b3d91",
  nasaRed: "#c8102e",
  /** Blue Origin 的深蓝 */
  blueOrigin: "#1b3f78",
  /** KARI / 누리호 的蓝 */
  kariBlue: "#12469b",
  /** 蓝箭航天的蓝 */
  landspace: "#1f4e9c",
} as const;

// ── 国旗 ──────────────────────────────────────────────────
// stripes 自上而下；disc 居中圆盘；canton 左上角方块。
export const FLAG: Record<string, PartLivery["flag"]> = {
  us: {
    stripes: ["#b22234", "#ffffff", "#b22234", "#ffffff", "#b22234", "#ffffff", "#b22234"],
    canton: "#3c3b6e",
    cantonW: 0.42,
    cantonH: 0.54,
  },
  cn: {
    stripes: ["#de2910"],
    canton: "#ffde00",
    cantonW: 0.2,
    cantonH: 0.26,
  },
  ru: { stripes: ["#ffffff", "#0039a6", "#d52b1e"] },
  jp: { stripes: ["#ffffff"], disc: ["#bc002d"] },
  kr: { stripes: ["#ffffff"], disc: ["#cd2e3a", "#0047a0"] },
  in: { stripes: ["#ff9933", "#ffffff", "#138808"], disc: ["#000080"] },
  eu: { stripes: ["#003399"], disc: ["#ffcc00"] },
  fr: { stripes: ["#002395", "#ffffff", "#ed2939"], vertical: true },
  it: { stripes: ["#008c45", "#ffffff", "#cd212a"], vertical: true },
  kz: { stripes: ["#00afca"], disc: ["#fec50c"] },
};

/** 贴在一级上段的国旗 */
export function flag(code: keyof typeof FLAG, at = 0.72, scale = 1): PartLivery {
  return { kind: "flag", flag: FLAG[code], at, scale };
}

/** 侧面字样 */
export function text(t: string, color: string, at = 0.7, scale = 1): PartLivery {
  return { kind: "text", text: t, color, at, scale };
}

/** 一道横箍 */
export function band(from: number, to: number, color: string): PartLivery {
  return { kind: "bands", bands: [{ from, to, color }] };
}

/** 多道横箍 */
export function bands(list: { from: number; to: number; color: string }[]): PartLivery {
  return { kind: "bands", bands: list };
}
