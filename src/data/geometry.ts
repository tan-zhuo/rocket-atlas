import type { RocketGeometry, RocketPart, PartGroup, PartFinish } from "./types";

/**
 * 参数化几何构建器。
 *
 * 火箭的外形本质上是「一摞回转体 + 若干周向阵列」，用一个游标从底部
 * 向上堆叠即可精确表达公开尺寸。同一份数据同时驱动：
 *   - 3D 查看器（RocketModel）
 *   - 2D 等比剪影（Silhouette，对比页/卡片）
 * 因此几何数据必须与 Rocket.height / diameter 对得上。
 */

export type PartInput = Omit<RocketPart, "bottom">;

/** 各分组的默认金属配色（深浅拉开，便于爆炸视图区分） */
export const GROUP_COLOR: Record<PartGroup, string> = {
  payload: "#e8ebf1",
  "stage-3": "#c9d1de",
  "stage-2": "#b3bccd",
  "stage-1": "#95a0b3",
  core: "#a4aebf",
  booster: "#7f8a9e",
};

export const METAL_DARK = "#4c5464";
export const HEATSHIELD = "#2b2f38";

/**
 * 表面处理 → 基色 + PBR 参数。
 *
 * 这张表是模型「有质感」的来源：白漆蒙皮、裸铝、不锈钢、橙色泡沫绝热层、
 * 碳纤维、隔热瓦在真实火箭上是完全不同的表面，金属度与粗糙度差了一个数量级。
 * 同一张表也被 2D 剪影复用，保证两种呈现的配色一致。
 */
export interface FinishSpec {
  color: string;
  metalness: number;
  roughness: number;
  /** 清漆感（漆面/抛光金属有，泡沫与隔热瓦没有） */
  clearcoat?: number;
  labelZh: string;
}

export const FINISH: Record<PartFinish, FinishSpec> = {
  "painted-white": {
    color: "#e9edf4",
    metalness: 0.06,
    roughness: 0.44,
    clearcoat: 0.35,
    labelZh: "白漆蒙皮",
  },
  "painted-black": {
    color: "#1a1d24",
    metalness: 0.12,
    roughness: 0.46,
    clearcoat: 0.3,
    labelZh: "黑漆段",
  },
  "painted-accent": {
    color: "#bb4335",
    metalness: 0.14,
    roughness: 0.48,
    clearcoat: 0.3,
    labelZh: "醒目涂装",
  },
  "bare-metal": {
    color: "#aeb6c3",
    metalness: 0.88,
    roughness: 0.3,
    labelZh: "裸铝蒙皮",
  },
  stainless: {
    color: "#c6cdd8",
    metalness: 0.96,
    roughness: 0.17,
    labelZh: "不锈钢",
  },
  "insulation-foam": {
    color: "#c9702f",
    metalness: 0.02,
    roughness: 0.94,
    labelZh: "泡沫绝热层",
  },
  scorched: {
    color: "#8a6242",
    metalness: 0.05,
    roughness: 0.88,
    labelZh: "燎黑绝热层",
  },
  carbon: {
    color: "#20232b",
    metalness: 0.38,
    roughness: 0.34,
    clearcoat: 0.5,
    labelZh: "碳纤维",
  },
  "solid-booster": {
    color: "#d6dae2",
    metalness: 0.08,
    roughness: 0.62,
    labelZh: "固体助推器壳体",
  },
  "engine-metal": {
    color: "#474d59",
    metalness: 0.92,
    roughness: 0.36,
    labelZh: "发动机金属",
  },
  "copper-nozzle": {
    color: "#a86a45",
    metalness: 0.95,
    roughness: 0.31,
    labelZh: "铜合金喷管",
  },
  heatshield: {
    color: "#2a2d34",
    metalness: 0.03,
    roughness: 0.9,
    labelZh: "隔热瓦",
  },
};

/** 数据里没写 finish 时的推断规则 */
export function defaultFinish(part: RocketPart): PartFinish {
  switch (part.shape) {
    case "engines":
      return "engine-metal";
    case "gridfins":
      return "bare-metal";
    case "tower":
      return "painted-accent";
    case "flap":
    case "fins":
      return "painted-white";
    default:
      return part.group === "payload" ? "painted-white" : "bare-metal";
  }
}

export function partFinish(part: RocketPart): FinishSpec {
  const spec = FINISH[part.finish ?? defaultFinish(part)];
  // 数据里显式给了 color 时以 color 为准（保留既有配色的表达力）
  return part.color ? { ...spec, color: part.color } : spec;
}

export class RocketBuilder {
  y = 0;
  private parts: RocketPart[] = [];

  /** 堆叠一个部件：底面接在游标处，游标上移 height */
  add(p: PartInput): this {
    this.parts.push({ ...p, bottom: this.y });
    this.y += p.height;
    return this;
  }

  /** 在绝对高度放置一个部件（发动机、尾翼、助推器等），不移动游标 */
  at(bottom: number, p: PartInput): this {
    this.parts.push({ ...p, bottom });
    return this;
  }

  /** 级间空隙 / 手动调整游标 */
  gap(h: number): this {
    this.y += h;
    return this;
  }

  build(opts: {
    fidelity: RocketGeometry["fidelity"];
    modelNote: string;
    model3d?: string;
    /** 若外形最高点不是最后一个堆叠件（如逃逸塔单独放置），可显式指定 */
    totalHeight?: number;
  }): RocketGeometry {
    const totalHeight =
      opts.totalHeight ?? this.parts.reduce((m, p) => Math.max(m, p.bottom + p.height), 0);
    const maxRadius = this.parts.reduce((m, p) => {
      const lateral = p.cluster ? p.cluster.offset + p.radius : p.radius;
      return Math.max(m, lateral, p.radiusTop ?? 0);
    }, 0);
    return {
      totalHeight: Number(totalHeight.toFixed(2)),
      maxRadius: Number(maxRadius.toFixed(2)),
      parts: this.parts,
      fidelity: opts.fidelity,
      modelNote: opts.modelNote,
      model3d: opts.model3d,
    };
  }
}

export function rocketGeometry() {
  return new RocketBuilder();
}

/** 爆炸视图：按分组自下而上排序，越靠上的分组分离得越远 */
export const EXPLODE_ORDER: PartGroup[] = [
  "booster",
  "stage-1",
  "core",
  "stage-2",
  "stage-3",
  "payload",
];

export function explodeOffset(group: PartGroup, totalHeight: number, t: number) {
  const idx = EXPLODE_ORDER.indexOf(group);
  // 助推器向外分离，其余沿轴向上分离
  const radial = group === "booster" ? t * totalHeight * 0.09 : 0;
  const axial = group === "booster" ? 0 : t * totalHeight * 0.055 * idx;
  return { axial, radial };
}
