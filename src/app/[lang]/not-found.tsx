import { L } from "@/components/ui/link";
import { ROCKETS } from "@/data/rockets";
import { getLang, getServerDict } from "@/i18n/server";
import { localizeRocket } from "@/i18n/localize";

export default async function NotFound() {
  const lang = await getLang();
  const t = await getServerDict();
  const suggestions = ROCKETS.slice(-4)
    .reverse()
    .map((r) => localizeRocket(r, lang));

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-mono text-[13px] text-accent">{t.notFound.code}</p>
      <h1 className="mt-3 text-[28px] font-semibold tracking-tight text-fg">
        {t.notFound.title}
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
        {t.notFound.lead}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <L
          href="/rockets"
          className="inline-flex h-10 items-center rounded-md bg-accent px-4 text-[13px] font-medium text-accent-fg"
        >
          {t.notFound.browse}
        </L>
        <L
          href="/"
          className="inline-flex h-10 items-center rounded-md border border-border-strong px-4 text-[13px] font-medium text-fg hover:border-accent"
        >
          {t.notFound.home}
        </L>
      </div>

      <div className="mt-12 w-full">
        <p className="text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{t.notFound.recent}</p>
        <ul className="mt-3 space-y-px overflow-hidden rounded-xl border border-border-base text-left">
          {suggestions.map((r) => (
            <li key={r.slug}>
              <L
                href={`/rocket/${r.slug}`}
                className="flex items-baseline justify-between bg-panel px-4 py-3 hover:bg-bg-elevated"
              >
                <span className="text-[14px] text-fg">{r.nameZh}</span>
                <span className="text-[11px] text-fg-subtle tabular">
                  {r.countryZh} · {r.firstFlight.slice(0, 4)}
                </span>
              </L>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
