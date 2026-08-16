import { ImageResponse } from "next/og";
import { ENGINES, getEngine } from "@/data/engines-index";
import { getEngineDetail } from "@/data/engines";
import { OG_SIZE, OG_CONTENT_TYPE, OgFrame } from "@/lib/og";
import { bellProfile, convergeProfile, engineModelSpec } from "@/data/engine-geometry";
import { engineProfileSvg, svgDataUri } from "@/lib/og-silhouette";

export const alt = "Rocket engine profile";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ENGINES.map((e) => ({ slug: e.slug }));
}

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const entry = getEngine(slug);
  if (!entry) return new ImageResponse(<OgFrame eyebrow="RocketAtlas" title="Not found" />, size);
  // 同样只用英文条目：satori 没有中日韩字形
  const d = getEngineDetail(entry.key, "en") ?? entry.detail;

  const stats = [
    { label: "THRUST", value: `${entry.spec.thrust.toLocaleString("en-US")} kN` },
    ...(entry.spec.ispVacuum ? [{ label: "VACUUM ISP", value: `${entry.spec.ispVacuum} s` }] : []),
    ...(d.chamberPressure ? [{ label: "CHAMBER", value: `${d.chamberPressure} bar` }] : []),
    ...(d.since ? [{ label: "SINCE", value: String(d.since) }] : []),
  ];

  const spec = engineModelSpec(entry);
  const art = engineProfileSvg(
    spec,
    bellProfile(spec.throatRadius, spec.exitRadius, spec.nozzleLength),
    convergeProfile(spec.chamberRadius, spec.throatRadius, spec.convergeLength),
    440,
  );

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={d.country ?? "Rocket engine"}
        title={entry.detail.displayEn}
        subtitle={d.summary}
        stats={stats}
        art={svgDataUri(art)}
      />
    ),
    size,
  );
}
