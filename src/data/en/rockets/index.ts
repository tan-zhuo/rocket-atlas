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
};
