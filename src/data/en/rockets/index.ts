import type { RocketOverlay } from "@/i18n/localize";

import { saturnVEn } from "./saturn-v";
import { falcon9En } from "./falcon-9";
import { starshipEn } from "./starship";
import { longMarch5En } from "./long-march-5";
import { r7En } from "./r-7";
import { soyuz2En } from "./soyuz-2";
import { v2En } from "./v-2";
import { ariane5En } from "./ariane-5";
import { deltaIVHeavyEn } from "./delta-iv-heavy";
import { longMarch2FEn } from "./long-march-2f";
import { electronEn } from "./electron";
import { zhuque2En } from "./zhuque-2";
import { vulcanCentaurEn } from "./vulcan-centaur";
import { newGlennEn } from "./new-glenn";
import { spaceShuttleEn } from "./space-shuttle";
import { atlasVEn } from "./atlas-v";
import { falconHeavyEn } from "./falcon-heavy";
import { n1En } from "./n1";
import { slsEn } from "./sls";
import { protonMEn } from "./proton-m";
import { angaraA5En } from "./angara-a5";
import { energiaEn } from "./energia";
import { ariane6En } from "./ariane-6";
import { hIIAEn } from "./h-iia";
import { h3En } from "./h3";
import { lvm3En } from "./lvm3";
import { pslvEn } from "./pslv";
import { longMarch3BEn } from "./long-march-3b";
import { longMarch7En } from "./long-march-7";
import { vegaCEn } from "./vega-c";
import { nuriEn } from "./nuri";

/**
 * 火箭内容的英文覆盖层。
 * 只需要写要翻译的字段，未提供的字段自动回落到中文主副本。
 */
export const ROCKET_EN: Record<string, RocketOverlay> = {
  "saturn-v": saturnVEn,
  "falcon-9": falcon9En,
  starship: starshipEn,
  "long-march-5": longMarch5En,
  "r-7": r7En,
  "soyuz-2": soyuz2En,
  "v-2": v2En,
  "ariane-5": ariane5En,
  "delta-iv-heavy": deltaIVHeavyEn,
  "long-march-2f": longMarch2FEn,
  electron: electronEn,
  "zhuque-2": zhuque2En,
  "vulcan-centaur": vulcanCentaurEn,
  "new-glenn": newGlennEn,
  "space-shuttle": spaceShuttleEn,
  "atlas-v": atlasVEn,
  "falcon-heavy": falconHeavyEn,
  n1: n1En,
  sls: slsEn,
  "proton-m": protonMEn,
  "angara-a5": angaraA5En,
  energia: energiaEn,
  "ariane-6": ariane6En,
  "h-iia": hIIAEn,
  h3: h3En,
  lvm3: lvm3En,
  pslv: pslvEn,
  "long-march-3b": longMarch3BEn,
  "long-march-7": longMarch7En,
  "vega-c": vegaCEn,
  nuri: nuriEn,
};
