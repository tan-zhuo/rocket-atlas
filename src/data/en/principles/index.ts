import type { PrincipleOverlay } from "@/i18n/localize";

import { stagingEn } from "./staging";
import { propellantsEn } from "./propellants";
import { reusabilityEn } from "./reusability";
import { structuresEn } from "./structures";
import { guidanceEn } from "./guidance";

export const PRINCIPLE_EN: Record<string, PrincipleOverlay> = {
  "staging-and-rocket-equation": stagingEn,
  "propellants-and-cycles": propellantsEn,
  reusability: reusabilityEn,
  "structures-and-materials": structuresEn,
  "guidance-and-control": guidanceEn,
};
