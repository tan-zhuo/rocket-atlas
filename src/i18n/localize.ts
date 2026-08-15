import type { Family, Principle, Rocket, TimelineEvent } from "@/data/types";
import type { Locale } from "./config";
import { ROCKET_EN } from "@/data/en/rockets";
import { FAMILY_EN } from "@/data/en/families";
import { PRINCIPLE_EN } from "@/data/en/principles";
import { TIMELINE_EN } from "@/data/en/timeline";

/**
 * 内容本地化。
 *
 * 中文是内容的主副本；英文以「覆盖层」的形式按 slug 提供，只翻译需要翻译的字段。
 * 缺失的字段自动回落到中文，这样英文版可以逐步补齐而不会出现空白页面。
 * 数组按下标对齐（tradeoffs / milestones / stages…），部件按 id 对齐。
 */

export interface RocketOverlay {
  /** 展示名（英文版里 nameZh 槽位放英文名） */
  displayName?: string;
  country?: string;
  agency?: string[];
  description?: string;
  history?: string;
  designPhilosophy?: string;
  contemporaries?: string;
  reuseNote?: string;
  tags?: string[];
  tradeoffs?: { question: string; answer: string }[];
  milestones?: { title: string; note: string }[];
  variants?: { name: string; note: string }[];
  stages?: {
    nameZh?: string;
    propellantZh?: string;
    note?: string;
    engines?: { cycleZh?: string; note?: string }[];
  }[];
  launchesNotable?: { name?: string; note: string }[];
  /** 按部件 id 覆盖 */
  parts?: Record<string, { name?: string; description?: string }>;
  modelNote?: string;
  sources?: { title?: string; publisher?: string; note?: string }[];
}

export interface FamilyOverlay {
  displayName?: string;
  country?: string;
  summary?: string;
  lineage?: { name?: string; note: string }[];
}

export interface PrincipleOverlay {
  title?: string;
  summary?: string;
  body?: string;
  examples?: { why: string }[];
  sources?: { title?: string; publisher?: string; note?: string }[];
}

export interface TimelineOverlay {
  title?: string;
  country?: string;
  note?: string;
}

function pick<T>(a: T | undefined, b: T): T {
  return a === undefined ? b : a;
}

export function localizeRocket(r: Rocket, lang: Locale): Rocket {
  if (lang === "zh") return r;
  const o = ROCKET_EN[r.slug];
  if (!o) return r;

  return {
    ...r,
    nameZh: pick(o.displayName, r.name),
    countryZh: pick(o.country, r.country),
    agency: pick(o.agency, r.agency),
    description: pick(o.description, r.description),
    history: pick(o.history, r.history),
    designPhilosophy: pick(o.designPhilosophy, r.designPhilosophy),
    contemporaries: pick(o.contemporaries, r.contemporaries),
    reuseNote: pick(o.reuseNote, r.reuseNote),
    tags: pick(o.tags, r.tags),
    tradeoffs: r.tradeoffs.map((t, i) => ({
      question: pick(o.tradeoffs?.[i]?.question, t.question),
      answer: pick(o.tradeoffs?.[i]?.answer, t.answer),
    })),
    milestones: r.milestones.map((m, i) => ({
      ...m,
      title: pick(o.milestones?.[i]?.title, m.title),
      note: pick(o.milestones?.[i]?.note, m.note),
    })),
    variants: r.variants.map((v, i) => ({
      ...v,
      name: pick(o.variants?.[i]?.name, v.name),
      note: pick(o.variants?.[i]?.note, v.note),
    })),
    stages: r.stages.map((s, i) => {
      const so = o.stages?.[i];
      return {
        ...s,
        nameZh: pick(so?.nameZh, s.name),
        propellantZh: pick(so?.propellantZh, s.propellantZh),
        note: pick(so?.note, s.note),
        engines: s.engines.map((e, j) => ({
          ...e,
          cycleZh: pick(so?.engines?.[j]?.cycleZh, e.cycleZh),
          note: pick(so?.engines?.[j]?.note, e.note),
        })),
      };
    }),
    launches: r.launches
      ? {
          ...r.launches,
          notable: r.launches.notable.map((n, i) => ({
            ...n,
            name: pick(o.launchesNotable?.[i]?.name, n.name),
            note: pick(o.launchesNotable?.[i]?.note, n.note),
          })),
        }
      : r.launches,
    geometry: {
      ...r.geometry,
      modelNote: pick(o.modelNote, r.geometry.modelNote),
      parts: r.geometry.parts.map((p) => {
        const po = o.parts?.[p.id];
        return {
          ...p,
          name: pick(po?.name, p.nameEn ?? p.name),
          description: pick(po?.description, p.description),
        };
      }),
    },
    sources: r.sources.map((s, i) => ({
      ...s,
      title: pick(o.sources?.[i]?.title, s.title),
      publisher: pick(o.sources?.[i]?.publisher, s.publisher),
      note: pick(o.sources?.[i]?.note, s.note),
    })),
  };
}

export function localizeFamily(f: Family, lang: Locale): Family {
  if (lang === "zh") return f;
  const o = FAMILY_EN[f.slug];
  if (!o) return f;
  return {
    ...f,
    nameZh: pick(o.displayName, f.name),
    countryZh: pick(o.country, f.countryZh),
    summary: pick(o.summary, f.summary),
    lineage: f.lineage.map((l, i) => ({
      ...l,
      name: pick(o.lineage?.[i]?.name, l.name),
      note: pick(o.lineage?.[i]?.note, l.note),
    })),
  };
}

export function localizePrinciple(p: Principle, lang: Locale): Principle {
  if (lang === "zh") return p;
  const o = PRINCIPLE_EN[p.slug];
  if (!o) return p;
  return {
    ...p,
    title: pick(o.title, p.titleEn),
    summary: pick(o.summary, p.summary),
    body: pick(o.body, p.body),
    examples: p.examples.map((e, i) => ({ ...e, why: pick(o.examples?.[i]?.why, e.why) })),
    sources: p.sources.map((s, i) => ({
      ...s,
      title: pick(o.sources?.[i]?.title, s.title),
      publisher: pick(o.sources?.[i]?.publisher, s.publisher),
      note: pick(o.sources?.[i]?.note, s.note),
    })),
  };
}

export function localizeTimeline(events: TimelineEvent[], lang: Locale): TimelineEvent[] {
  if (lang === "zh") return events;
  return events.map((e) => {
    const o = TIMELINE_EN[e.date + "|" + e.title];
    if (!o) return e;
    return {
      ...e,
      title: pick(o.title, e.title),
      countryZh: pick(o.country, e.countryZh),
      note: pick(o.note, e.note),
    };
  });
}
