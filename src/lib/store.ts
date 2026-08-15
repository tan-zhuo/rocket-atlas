"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_COMPARE = 4;

interface CompareState {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
  set: (slugs: string[]) => void;
}

/**
 * 对比选择 —— 跨页面保持（列表页勾选 → 对比页读取）。
 * 只存 slug，火箭数据始终从静态数据源取，避免状态与内容脱节。
 */
export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      add: (slug) => {
        const { slugs } = get();
        if (slugs.includes(slug) || slugs.length >= MAX_COMPARE) return;
        set({ slugs: [...slugs, slug] });
      },
      remove: (slug) => set({ slugs: get().slugs.filter((s) => s !== slug) }),
      toggle: (slug) => {
        const { slugs } = get();
        if (slugs.includes(slug)) set({ slugs: slugs.filter((s) => s !== slug) });
        else if (slugs.length < MAX_COMPARE) set({ slugs: [...slugs, slug] });
      },
      clear: () => set({ slugs: [] }),
      set: (slugs) => set({ slugs: slugs.slice(0, MAX_COMPARE) }),
    }),
    { name: "atlas-compare" },
  ),
);
