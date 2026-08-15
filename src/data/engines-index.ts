import { ROCKETS } from "./rockets";
import { ENGINE_DETAIL, type EngineDetail } from "./engines";
import type { Engine } from "./types";

/**
 * 发动机索引：把「发动机知识库」与「火箭数据」缝在一起。
 *
 * 推力、比冲这些数字只存在于火箭的分级数据里（同一台发动机在不同火箭上
 * 也应当是同一个值），这里不复制它们，而是从第一次出现的位置取用，
 * 同时反查出「哪些火箭、哪一级用了它」。
 */

/** 名字可能带后缀：「YF-20B (YF-21C 机组)」「Rutherford Vacuum」「天鹊 TQ-12 真空版」 */
export function normalizeEngineName(name: string): string | undefined {
  if (ENGINE_DETAIL[name]) return name;
  const noParen = name.split(/[(（]/)[0].trim();
  if (ENGINE_DETAIL[noParen]) return noParen;
  // 逐个去掉末尾修饰词（真空版 / Vacuum / 游动发动机…）
  const parts = noParen.split(/\s+/);
  for (let i = parts.length - 1; i > 0; i--) {
    const candidate = parts.slice(0, i).join(" ");
    if (ENGINE_DETAIL[candidate]) return candidate;
  }
  return undefined;
}

export interface EngineUsage {
  rocketSlug: string;
  /** 该级在火箭里的下标，用于取中英文级名 */
  stageIndex: number;
  count: number;
}

export interface EngineEntry {
  key: string;
  slug: string;
  detail: EngineDetail;
  /** 典型规格，取自首个使用它的火箭 */
  spec: Engine;
  usage: EngineUsage[];
  rockets: string[];
}

function build(): EngineEntry[] {
  const map = new Map<string, EngineEntry>();

  for (const r of ROCKETS) {
    r.stages.forEach((stage, stageIndex) => {
      for (const e of stage.engines) {
        const key = normalizeEngineName(e.name);
        if (!key) continue;
        const detail = ENGINE_DETAIL[key];
        const existing = map.get(key);
        if (existing) {
          existing.usage.push({ rocketSlug: r.slug, stageIndex, count: e.count });
          if (!existing.rockets.includes(r.slug)) existing.rockets.push(r.slug);
        } else {
          map.set(key, {
            key,
            slug: detail.slug,
            detail,
            spec: e,
            usage: [{ rocketSlug: r.slug, stageIndex, count: e.count }],
            rockets: [r.slug],
          });
        }
      }
    });
  }

  return [...map.values()].sort((a, b) => (b.spec.thrust ?? 0) - (a.spec.thrust ?? 0));
}

export const ENGINES: EngineEntry[] = build();

const BY_SLUG = new Map(ENGINES.map((e) => [e.slug, e]));

export function getEngine(slug: string): EngineEntry | undefined {
  return BY_SLUG.get(slug);
}

export const ENGINE_SLUGS = ENGINES.map((e) => e.slug);

/** 某枚火箭用到的发动机（去重，保持级序） */
export function enginesOfRocket(rocketSlug: string): EngineEntry[] {
  return ENGINES.filter((e) => e.rockets.includes(rocketSlug)).sort((a, b) => {
    const ai = a.usage.find((u) => u.rocketSlug === rocketSlug)?.stageIndex ?? 0;
    const bi = b.usage.find((u) => u.rocketSlug === rocketSlug)?.stageIndex ?? 0;
    return ai - bi;
  });
}
