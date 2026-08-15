import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 12500 → "12,500" */
export function num(v: number | undefined | null, digits = 0): string {
  if (v === undefined || v === null || Number.isNaN(v)) return "—";
  return v.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Mass in kg → "2,970 t" for big numbers, "83.6 kg" for small ones. */
export function mass(kg: number | undefined | null): string {
  if (kg === undefined || kg === null) return "—";
  if (kg >= 1000) return `${num(kg / 1000, kg / 1000 >= 100 ? 0 : 1)} t`;
  return `${num(kg, kg < 10 ? 1 : 0)} kg`;
}

/** kN → "33,400 kN" */
export function force(kn: number | undefined | null): string {
  if (kn === undefined || kn === null) return "—";
  return `${num(kn)} kN`;
}

export function meters(m: number | undefined | null, digits = 1): string {
  if (m === undefined || m === null) return "—";
  return `${num(m, digits)} m`;
}

const EN_MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * "1967-11-09" → 中文「1967年11月9日」/ 英文「9 Nov 1967」。
 * 数据里有的日期只精确到年或月，格式化要能优雅降级。
 */
export function dateZh(iso: string | undefined | null, lang: "zh" | "en" = "zh"): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  if (lang === "en") {
    if (!m) return y;
    const mon = EN_MONTH[Number(m) - 1] ?? m;
    return d ? `${Number(d)} ${mon} ${y}` : `${mon} ${y}`;
  }
  if (!m) return `${y}年`;
  if (!d) return `${y}年${Number(m)}月`;
  return `${y}年${Number(m)}月${Number(d)}日`;
}

export function year(iso: string | undefined | null): string {
  if (!iso) return "—";
  return iso.slice(0, 4);
}

export function decade(iso: string): number {
  return Math.floor(Number(iso.slice(0, 4)) / 10) * 10;
}

/** Stable-ish clamp helper used by the 3D viewer and charts. */
export function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
