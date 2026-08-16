import { ImageResponse } from "next/og";
import { ROCKETS, getRocket } from "@/data/rockets";
import { localizeRocket } from "@/i18n/localize";
import { OG_SIZE, OG_CONTENT_TYPE, OgFrame } from "@/lib/og";
import { silhouetteSvg, svgDataUri } from "@/lib/og-silhouette";

export const alt = "Rocket profile";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ROCKETS.map((r) => ({ slug: r.slug }));
}

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const raw = getRocket(slug);
  if (!raw) return new ImageResponse(<OgFrame eyebrow="RocketAtlas" title="Not found" />, size);
  // 卡片一律用英文覆盖层：satori 只带拉丁字形，中文会渲染成豆腐块
  const r = localizeRocket(raw, "en");

  const t = (v: number) => `${Math.round(v / 1000).toLocaleString("en-US")} t`;

  return new ImageResponse(
    (
      <OgFrame
        eyebrow={r.country}
        title={r.name}
        subtitle={r.tags.slice(0, 3).join(" · ")}
        stats={[
          { label: "HEIGHT", value: `${r.height} m` },
          { label: "LIFTOFF MASS", value: t(r.mass) },
          ...(r.payloadLEO ? [{ label: "LEO", value: t(r.payloadLEO) }] : []),
          { label: "FIRST FLIGHT", value: r.firstFlight.slice(0, 4) },
        ]}
        art={svgDataUri(silhouetteSvg(r.geometry, 470))}
      />
    ),
    size,
  );
}
