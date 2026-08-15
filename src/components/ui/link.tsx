"use client";

import * as React from "react";
import NextLink from "next/link";
import { useI18n } from "@/i18n/provider";
import { localePath } from "@/i18n/config";

/**
 * 站内链接。自动补上当前语言前缀（`/rockets` → `/en/rockets`），
 * 这样各页面写链接时不必关心语言。外链请继续用 <a>。
 */
export function L({
  href,
  ...rest
}: Omit<React.ComponentProps<typeof NextLink>, "href"> & { href: string }) {
  const { lang } = useI18n();
  return <NextLink href={localePath(lang, href)} {...rest} />;
}
