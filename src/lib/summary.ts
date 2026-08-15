import type { PropellantType, Rocket, RocketGeometry, RocketStatus } from "@/data/types";
import { rocketPropellants } from "./filters";

/**
 * 列表 / 对比页用的精简视图模型。
 *
 * 详情页的长文（设计逻辑、历史、权衡问答）加起来有几百 KB，绝不能进客户端 bundle。
 * 筛选与卡片渲染只需要这些字段 + 一份去掉说明文字的几何数据（用于等比剪影）。
 */
export interface RocketSummary {
  slug: string;
  name: string;
  nameZh: string;
  countryZh: string;
  family: string;
  status: RocketStatus;
  firstFlight: string;
  lastFlight?: string;
  height: number;
  diameter: number;
  span?: number;
  mass: number;
  stageCount: number;
  payloadLEO?: number;
  payloadGTO?: number;
  reusable: boolean;
  humanRated?: boolean;
  description: string;
  propellants: PropellantType[];
  tags: string[];
  launches?: { total: number; success: number };
  /** 起飞总推力（kN）：所有在地面点火的级/助推器之和 */
  liftoffThrust: number;
  /** 设计总纲的第一段（去 Markdown 标记），用于对比页的哲学并置 */
  designLead: string;
  geometry: RocketGeometry;
}

/** 起飞时同时工作的级：以「给出了海平面推力」为判据 */
function liftoffThrust(r: Rocket): number {
  return r.stages.reduce((sum, s) => sum + (s.thrustSeaLevel ?? 0), 0);
}

/** 取 Markdown 的第一段并剥掉行内标记 */
function leadParagraph(md: string): string {
  const first = md.split(/\n\s*\n/)[0] ?? "";
  return first
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/[#>]/g, "")
    .trim();
}

/** 剥掉部件说明文字，只留渲染剪影所需的几何 */
function liteGeometry(g: RocketGeometry): RocketGeometry {
  return {
    totalHeight: g.totalHeight,
    maxRadius: g.maxRadius,
    fidelity: g.fidelity,
    modelNote: "",
    parts: g.parts.map((p) => ({
      id: p.id,
      name: "",
      group: p.group,
      shape: p.shape,
      bottom: p.bottom,
      height: p.height,
      radius: p.radius,
      radiusTop: p.radiusTop,
      color: p.color,
      finish: p.finish,
      cluster: p.cluster,
      nozzles: p.nozzles,
      description: "",
    })),
  };
}

export function toSummary(r: Rocket): RocketSummary {
  return {
    slug: r.slug,
    name: r.name,
    nameZh: r.nameZh,
    countryZh: r.countryZh,
    family: r.family,
    status: r.status,
    firstFlight: r.firstFlight,
    lastFlight: r.lastFlight,
    height: r.height,
    diameter: r.diameter,
    span: r.span,
    mass: r.mass,
    stageCount: r.stageCount,
    payloadLEO: r.payloadLEO,
    payloadGTO: r.payloadGTO,
    reusable: r.reusable,
    humanRated: r.humanRated,
    description: r.description,
    propellants: rocketPropellants(r),
    tags: r.tags,
    launches: r.launches ? { total: r.launches.total, success: r.launches.success } : undefined,
    liftoffThrust: liftoffThrust(r),
    designLead: leadParagraph(r.designPhilosophy),
    geometry: liteGeometry(r.geometry),
  };
}
