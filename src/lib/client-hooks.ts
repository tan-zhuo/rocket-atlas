"use client";

import * as React from "react";

/**
 * SSR 安全的「已水合」信号。
 * 用于 localStorage 持久化状态（对比选择）在首次渲染时保持与服务端一致，
 * 比 useState+useEffect 的 mounted 模式更符合 React 19 的规则。
 */
const noopSubscribe = () => () => {};

export function useHydrated(): boolean {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** 媒体查询订阅：服务端返回 false，客户端返回真实结果。 */
export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** 当前 URL hash（不含 #）。服务端返回空串。 */
export function useHash(): string {
  return React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    () => window.location.hash.replace("#", ""),
    () => "",
  );
}
