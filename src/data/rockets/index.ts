import type { Rocket } from "../types";

import { v2 } from "./v-2";
import { r7 } from "./r-7";
import { saturnV } from "./saturn-v";
import { ariane5 } from "./ariane-5";
import { longMarch2F } from "./long-march-2f";
import { deltaIVHeavy } from "./delta-iv-heavy";
import { soyuz2 } from "./soyuz-2";
import { longMarch5 } from "./long-march-5";
import { electron } from "./electron";
import { falcon9 } from "./falcon-9";
import { zhuque2 } from "./zhuque-2";
import { starship } from "./starship";
import { vulcanCentaur } from "./vulcan-centaur";
import { newGlenn } from "./new-glenn";
import { spaceShuttle } from "./space-shuttle";
import { atlasV } from "./atlas-v";
import { falconHeavy } from "./falcon-heavy";
import { n1 } from "./n1";
import { sls } from "./sls";
import { protonM } from "./proton-m";
import { angaraA5 } from "./angara-a5";
import { energia } from "./energia";
import { ariane6 } from "./ariane-6";
import { hIIA } from "./h-iia";
import { h3 } from "./h3";
import { lvm3 } from "./lvm3";
import { pslv } from "./pslv";
import { longMarch3B } from "./long-march-3b";
import { longMarch7 } from "./long-march-7";
import { vegaC } from "./vega-c";
import { nuri } from "./nuri";

/** 全部火箭，按首飞时间升序。 */
export const ROCKETS: Rocket[] = [
  v2,
  r7,
  saturnV,
  ariane5,
  longMarch2F,
  deltaIVHeavy,
  soyuz2,
  longMarch5,
  electron,
  falcon9,
  zhuque2,
  starship,
  vulcanCentaur,
  newGlenn,
  spaceShuttle,
  atlasV,
  falconHeavy,
  n1,
  sls,
  protonM,
  angaraA5,
  energia,
  ariane6,
  hIIA,
  h3,
  lvm3,
  pslv,
  longMarch3B,
  longMarch7,
  vegaC,
  nuri,
].sort((a, b) => a.firstFlight.localeCompare(b.firstFlight));

const BY_SLUG = new Map(ROCKETS.map((r) => [r.slug, r]));

export function getRocket(slug: string): Rocket | undefined {
  return BY_SLUG.get(slug);
}

export function getRockets(slugs: string[]): Rocket[] {
  return slugs.map((s) => BY_SLUG.get(s)).filter((r): r is Rocket => Boolean(r));
}

export const ROCKET_SLUGS = ROCKETS.map((r) => r.slug);

/** 首页精选：覆盖不同年代、国家与设计哲学。 */
export const FEATURED_SLUGS = [
  "saturn-v",
  "falcon-9",
  "long-march-5",
  "starship",
  "soyuz-2",
  "electron",
];

/** 按家族分组 */
export function rocketsInFamily(family: string): Rocket[] {
  return ROCKETS.filter((r) => r.family === family);
}

/** 一级主推进剂 —— 用于筛选与配色 */
export function primaryPropellant(r: Rocket) {
  return r.stages[0]?.propellant ?? "kerolox";
}

/** 全库统计，用于首页与关于页 */
export function atlasStats() {
  const countries = new Set(ROCKETS.map((r) => r.countryZh));
  const launches = ROCKETS.reduce((n, r) => n + (r.launches?.total ?? 0), 0);
  const span = {
    from: ROCKETS[0]?.firstFlight.slice(0, 4),
    to: String(Math.max(...ROCKETS.map((r) => Number(r.firstFlight.slice(0, 4))))),
  };
  return {
    rockets: ROCKETS.length,
    countries: countries.size,
    launches,
    span,
    sources: ROCKETS.reduce((n, r) => n + r.sources.length, 0),
  };
}
