import { L } from "@/components/ui/link";
import { ArrowRight, Flame } from "lucide-react";
import type { EngineEntry } from "@/data/engines-index";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dict";
import { PROPELLANT_LABEL } from "@/i18n/terms";
import { force } from "@/lib/utils";

/**
 * 火箭页 → 发动机页的直达入口。
 *
 * 放在快速参数条下方，与内容 Tab 无关地常驻显示：读者看完「这枚火箭多大、
 * 能送多少」之后，最自然的下一个问题就是「它靠什么推上去」，这一步不该
 * 需要先切到某个标签里再找。
 */
export function EngineLinks({
  engines,
  lang,
  t,
  className,
}: {
  engines: EngineEntry[];
  lang: Locale;
  t: Dict;
  className?: string;
}) {
  if (engines.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
          <Flame className="size-3.5" />
          {t.detail.engineEntry}
        </span>

        {engines.map((e) => {
          const name = lang === "en" ? e.detail.displayEn : e.detail.displayZh;
          const prop = PROPELLANT_LABEL[lang][e.spec.propellant];
          // 同一台发动机可能出现在多级上，台数相加
          const count = e.usage.reduce((n, u) => n + u.count, 0);
          return (
            <L
              key={e.slug}
              href={`/engine/${e.slug}`}
              className="group flex items-center gap-2 rounded-md border border-border-base bg-panel px-2.5 py-1.5 transition-colors hover:border-accent"
            >
              <span
                className="size-1.5 shrink-0 rounded-full"
                style={{ background: prop.color }}
                aria-hidden
              />
              <span className="text-[13px] font-medium text-fg group-hover:text-accent">
                {name}
              </span>
              <span className="text-[11px] text-fg-subtle tabular">
                ×{count} · {force(e.spec.thrust)}
              </span>
              <ArrowRight className="size-3 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </L>
          );
        })}
      </div>
    </section>
  );
}
