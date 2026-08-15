import type { PropellantType, Rocket, RocketStatus } from "@/data/types";
import type { RocketSummary } from "./summary";
import { unique } from "./utils";

/**
 * 筛选与排序。
 * 注意：本文件会被打进客户端 bundle，**不要**在这里 import 完整数据集。
 * 筛选项从传入的 summary 列表派生。
 */

export type SortKey = "firstFlight" | "payload" | "height" | "mass" | "name";

export interface FilterState {
  q: string;
  countries: string[];
  status: RocketStatus[];
  propellants: PropellantType[];
  stageCounts: number[];
  reusableOnly: boolean;
  humanRatedOnly: boolean;
  decades: number[];
  sort: SortKey;
}

export const EMPTY_FILTERS: FilterState = {
  q: "",
  countries: [],
  status: [],
  propellants: [],
  stageCounts: [],
  reusableOnly: false,
  humanRatedOnly: false,
  decades: [],
  sort: "firstFlight",
};

export const SORT_KEYS: SortKey[] = ["firstFlight", "payload", "height", "mass", "name"];

/** 该火箭涉及的全部推进剂类型（含助推器与上面级） */
export function rocketPropellants(r: Rocket): PropellantType[] {
  return unique(r.stages.map((s) => s.propellant));
}

export function decadeOf(firstFlight: string): number {
  return Math.floor(Number(firstFlight.slice(0, 4)) / 10) * 10;
}

/** 从传入的列表派生筛选项，避免把全量数据引入客户端 */
export function filterOptionsFrom(rockets: RocketSummary[]) {
  return {
    countries: unique(rockets.map((r) => r.countryZh)).sort(),
    propellants: unique(rockets.flatMap((r) => r.propellants)),
    stageCounts: unique(rockets.map((r) => r.stageCount)).sort((a, b) => a - b),
    decades: unique(rockets.map((r) => decadeOf(r.firstFlight))).sort((a, b) => a - b),
  };
}

export type FilterOptions = ReturnType<typeof filterOptionsFrom>;

function matchesQuery(r: RocketSummary, q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return [r.name, r.nameZh, r.slug, r.countryZh, r.family, r.description, ...r.tags]
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

export function applyFilters(rockets: RocketSummary[], f: FilterState): RocketSummary[] {
  const out = rockets.filter((r) => {
    if (!matchesQuery(r, f.q)) return false;
    if (f.countries.length && !f.countries.includes(r.countryZh)) return false;
    if (f.status.length && !f.status.includes(r.status)) return false;
    if (f.propellants.length && !r.propellants.some((p) => f.propellants.includes(p))) return false;
    if (f.stageCounts.length && !f.stageCounts.includes(r.stageCount)) return false;
    if (f.reusableOnly && !r.reusable) return false;
    if (f.humanRatedOnly && !r.humanRated) return false;
    if (f.decades.length && !f.decades.includes(decadeOf(r.firstFlight))) return false;
    return true;
  });

  return out.sort((a, b) => {
    switch (f.sort) {
      case "payload":
        return (b.payloadLEO ?? 0) - (a.payloadLEO ?? 0);
      case "height":
        return b.height - a.height;
      case "mass":
        return b.mass - a.mass;
      case "name":
        return a.nameZh.localeCompare(b.nameZh, "zh-Hans-CN");
      case "firstFlight":
      default:
        return b.firstFlight.localeCompare(a.firstFlight);
    }
  });
}

export function activeFilterCount(f: FilterState): number {
  return (
    f.countries.length +
    f.status.length +
    f.propellants.length +
    f.stageCounts.length +
    f.decades.length +
    (f.reusableOnly ? 1 : 0) +
    (f.humanRatedOnly ? 1 : 0)
  );
}

export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}
