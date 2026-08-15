import type { RocketGeometry, RocketPart, PartGroup } from "./types";

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
