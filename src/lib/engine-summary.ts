import type { EngineCycle, PropellantType } from "@/data/types";
import type { EngineEntry } from "@/data/engines-index";
import { getEngineDetail } from "@/data/engines";
import type { Locale } from "@/i18n/config";

/**
 * 发动机列表页用的精简视图模型。
 * 优缺点是长文，只在详情页取；列表只要能筛选、排序、画图的字段。
 */
export interface EngineSummary {
  slug: string;
  name: string;
  country: string;
  cycle: EngineCycle;
  propellant: PropellantType;
  /** kN */
  thrust: number;
  thrustSeaLevel?: number;
  thrustVacuum?: number;
  ispSeaLevel?: number;
  ispVacuum?: number;
  chamberPressure?: number;
  since?: number;
  maker?: string;
  summary?: string;
  /** 装在哪些火箭上 */
  rockets: { slug: string; name: string }[];
}

export function toEngineSummary(
  e: EngineEntry,
  lang: Locale,
  rocketName: (slug: string) => string,
): EngineSummary {
  const d = getEngineDetail(e.key, lang) ?? e.detail;
  return {
    slug: e.slug,
    name: lang === "en" ? e.detail.displayEn : e.detail.displayZh,
    country: lang === "en" ? e.detail.country : e.detail.countryZh,
    cycle: e.spec.cycle,
    propellant: e.spec.propellant,
    thrust: e.spec.thrust,
    thrustSeaLevel: e.spec.thrustSeaLevel,
    thrustVacuum: e.spec.thrustVacuum,
    ispSeaLevel: e.spec.ispSeaLevel,
    ispVacuum: e.spec.ispVacuum,
    chamberPressure: d.chamberPressure,
    since: d.since,
    maker: d.maker,
    summary: d.summary,
    rockets: e.rockets.map((slug) => ({ slug, name: rocketName(slug) })),
  };
}

export type EngineSortKey = "thrust" | "isp" | "pressure" | "name";

export interface EngineFilters {
  cycles: EngineCycle[];
  propellants: PropellantType[];
  countries: string[];
  sort: EngineSortKey;
}

export const EMPTY_ENGINE_FILTERS: EngineFilters = {
  cycles: [],
  propellants: [],
  countries: [],
  sort: "thrust",
};

export function applyEngineFilters(list: EngineSummary[], f: EngineFilters): EngineSummary[] {
  const out = list.filter((e) => {
    if (f.cycles.length && !f.cycles.includes(e.cycle)) return false;
    if (f.propellants.length && !f.propellants.includes(e.propellant)) return false;
    if (f.countries.length && !f.countries.includes(e.country)) return false;
    return true;
  });

  return out.sort((a, b) => {
    switch (f.sort) {
      case "isp":
        return (b.ispVacuum ?? 0) - (a.ispVacuum ?? 0);
      case "pressure":
        return (b.chamberPressure ?? 0) - (a.chamberPressure ?? 0);
      case "name":
        return a.name.localeCompare(b.name);
      case "thrust":
      default:
        return b.thrust - a.thrust;
    }
  });
}

export function engineFilterOptions(list: EngineSummary[]) {
  const uniq = <T,>(a: T[]) => Array.from(new Set(a));
  return {
    cycles: uniq(list.map((e) => e.cycle)),
    propellants: uniq(list.map((e) => e.propellant)),
    countries: uniq(list.map((e) => e.country)).sort(),
  };
}
