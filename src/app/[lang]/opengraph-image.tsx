import { ImageResponse } from "next/og";
import { atlasStats } from "@/data/rockets";
import { OG_SIZE, OG_CONTENT_TYPE, OgFrame } from "@/lib/og";

export const alt = "RocketAtlas — why rockets look the way they do";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const s = atlasStats();
  return new ImageResponse(
    (
      <OgFrame
        eyebrow="Launch vehicle atlas"
        title="Why rockets look the way they do"
        subtitle="Interactive 3D structure, stage-by-stage numbers and paired design trade-offs — built from verifiable public sources."
        stats={[
          { label: "VEHICLES", value: String(s.rockets) },
          { label: "ENGINES", value: "73" },
          { label: "COUNTRIES", value: String(s.countries) },
          { label: "SPAN", value: `${s.span.from}–${s.span.to}` },
        ]}
      />
    ),
    size,
  );
}
