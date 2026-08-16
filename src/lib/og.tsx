import type { ReactElement } from "react";

/**
 * OG 图的共用外壳。
 *
 * **只用拉丁字符**：ImageResponse 底层的 satori 需要显式提供字体，
 * Next 只内置了拉丁字形的 Geist，中文会渲染成豆腐块。
 * 为一张分享图往仓库里塞一个几 MB 的中日韩字体不划算，
 * 所以卡片一律用型号的拉丁名与英文标签——中英两版共用同一张图。
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0b0e14";
const FG = "#e9edf4";
const MUTED = "#8b93a5";
const ACCENT = "#ff7a2f";

export function OgFrame({
  eyebrow,
  title,
  subtitle,
  stats,
  art,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  stats?: { label: string; value: string }[];
  /** 右侧图形区（剪影 data URI）；没有就只排字 */
  art?: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BG,
        color: FG,
        fontFamily: "Geist, sans-serif",
        position: "relative",
      }}
    >
      {/* 顶部那道橙线是站点标识色 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: ACCENT,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 56px 56px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: ACCENT,
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 22 ? 62 : 82,
              fontWeight: 600,
              lineHeight: 1.05,
              marginTop: 18,
              display: "flex",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 28,
                color: MUTED,
                marginTop: 18,
                display: "flex",
                maxWidth: 640,
                lineHeight: 1.35,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {stats && stats.length > 0 ? (
            <div style={{ display: "flex", gap: 46 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 17, color: MUTED, letterSpacing: 1.5, display: "flex" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 34, marginTop: 6, display: "flex" }}>{s.value}</div>
                </div>
              ))}
            </div>
          ) : null}

          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: ACCENT,
                display: "flex",
              }}
            />
            <div style={{ display: "flex", color: FG }}>RocketAtlas</div>
            <div style={{ display: "flex", color: MUTED }}>
              — why rockets look the way they do
            </div>
          </div>
        </div>
      </div>

      {art ? (
        <div
          style={{
            width: 400,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 56,
            paddingRight: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art} width={340} height={470} alt="" style={{ objectFit: "contain" }} />
        </div>
      ) : null}
    </div>
  );
}
