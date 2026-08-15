import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 国旗 —— 全部用 SVG 按官方构型绘制，不使用 emoji。
 *
 * emoji 国旗在很多平台（Windows、部分 Linux）根本不渲染，而且大小、
 * 基线、颜色都无法控制。这里按各国旗帜的几何规范画出来，
 * 统一 3:2 比例，可以任意缩放且在深浅主题下都保持清晰。
 */

type FlagKey = "us" | "cn" | "su" | "ru" | "de" | "eu" | "nz" | "fr" | "jp" | "gb" | "in";

/** 中文国名/地区名 → 旗帜。复合名（「新西兰 / 美国」）会拆成多面旗。 */
const NAME_TO_FLAG: Record<string, FlagKey> = {
  美国: "us",
  中国: "cn",
  苏联: "su",
  俄罗斯: "ru",
  德国: "de",
  欧洲: "eu",
  新西兰: "nz",
  法国: "fr",
  日本: "jp",
  英国: "gb",
  印度: "in",
};

const FLAG_LABEL: Record<FlagKey, string> = {
  us: "美国国旗",
  cn: "中国国旗",
  su: "苏联国旗",
  ru: "俄罗斯国旗",
  de: "德国国旗",
  eu: "欧盟旗帜",
  nz: "新西兰国旗",
  fr: "法国国旗",
  jp: "日本国旗",
  gb: "英国国旗",
  in: "印度国旗",
};

/** 生成正 n 角星的多边形点串 */
function starPoints(cx: number, cy: number, rOuter: number, rotation = -90, n = 5) {
  const rInner = rOuter * 0.382; // 正五角星的内外半径比
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = ((rotation + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(3)},${(cy + r * Math.sin(a)).toFixed(3)}`);
  }
  return pts.join(" ");
}

/* ── 各国旗帜 ─────────────────────────────────────────────── */

function UsFlag() {
  // 13 道横条（7 红 6 白），旗顶区宽 2/5、高 7/13
  const stripe = 20 / 13;
  const cantonW = 12;
  const cantonH = stripe * 7;
  const rows = [6, 5, 6, 5, 6, 5, 6, 5, 6];
  const stars: React.ReactElement[] = [];
  let idx = 0;
  rows.forEach((count, row) => {
    const y = (cantonH / 10) * (row + 1);
    for (let i = 0; i < count; i++) {
      const x =
        count === 6
          ? (cantonW / 12) * (2 * i + 1)
          : (cantonW / 12) * (2 * i + 2);
      stars.push(
        <polygon key={idx++} points={starPoints(x, y, 0.42)} fill="#ffffff" />,
      );
    }
  });
  return (
    <>
      <rect width="30" height="20" fill="#ffffff" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={stripe * i * 2} width="30" height={stripe} fill="#B22234" />
      ))}
      <rect width={cantonW} height={cantonH} fill="#3C3B6E" />
      {stars}
    </>
  );
}

function CnFlag() {
  // 五星按《国旗制法说明》的网格位置：大星中心 (5,5)，四颗小星环绕并朝向大星
  const small: [number, number][] = [
    [10, 2],
    [12, 4.5],
    [12, 7.5],
    [10, 10],
  ];
  return (
    <>
      <rect width="30" height="20" fill="#EE1C25" />
      <polygon points={starPoints(5, 5, 3)} fill="#FFFF00" />
      {small.map(([x, y], i) => {
        const angle = (Math.atan2(5 - y, 5 - x) * 180) / Math.PI;
        return <polygon key={i} points={starPoints(x, y, 1, angle)} fill="#FFFF00" />;
      })}
    </>
  );
}

function SuFlag() {
  return (
    <>
      <rect width="30" height="20" fill="#CE1126" />
      <polygon points={starPoints(4.6, 3.2, 1.5)} fill="#FFD900" />
      {/* 镰刀：一段圆弧 + 刀柄 */}
      <path
        d="M3.1 10.4a3.5 3.5 0 0 0 5.6-2.6"
        fill="none"
        stroke="#FFD900"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      {/* 锤子：柄 + 头 */}
      <path d="M3.4 6.6 L7.6 10.9" stroke="#FFD900" strokeWidth="0.85" strokeLinecap="round" />
      <rect x="2.2" y="5.6" width="2.1" height="1.2" rx="0.2" fill="#FFD900" transform="rotate(45 3.2 6.2)" />
    </>
  );
}

function RuFlag() {
  return (
    <>
      <rect width="30" height="20" fill="#ffffff" />
      <rect y="6.667" width="30" height="6.667" fill="#0039A6" />
      <rect y="13.333" width="30" height="6.667" fill="#D52B1E" />
    </>
  );
}

function DeFlag() {
  return (
    <>
      <rect width="30" height="6.667" fill="#000000" />
      <rect y="6.667" width="30" height="6.667" fill="#DD0000" />
      <rect y="13.333" width="30" height="6.667" fill="#FFCE00" />
    </>
  );
}

function EuFlag() {
  const stars = Array.from({ length: 12 }).map((_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    return (
      <polygon
        key={i}
        points={starPoints(15 + 6.667 * Math.cos(a), 10 + 6.667 * Math.sin(a), 1.2)}
        fill="#FFCC00"
      />
    );
  });
  return (
    <>
      <rect width="30" height="20" fill="#003399" />
      {stars}
    </>
  );
}

/** 米字旗（用于新西兰旗顶区与英国国旗） */
function UnionJack({ w, h }: { w: number; h: number }) {
  const sw = h * 0.3; // 白色斜十字宽
  const sr = h * 0.16; // 红色斜十字宽
  const cw = h * 0.33; // 白色正十字宽
  const cr = h * 0.2; // 红色正十字宽
  // 用嵌套 <svg> 而不是 clipPath：嵌套 svg 自带视口裁剪，
  // 也就不需要在页面里生成唯一的 clipPath id（服务端组件里拿不到 useId）。
  return (
    <svg x={0} y={0} width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect width={w} height={h} fill="#012169" />
      <path d={`M0 0 L${w} ${h} M${w} 0 L0 ${h}`} stroke="#ffffff" strokeWidth={sw} />
      <path d={`M0 0 L${w} ${h} M${w} 0 L0 ${h}`} stroke="#C8102E" strokeWidth={sr} />
      <path d={`M${w / 2} 0 V${h} M0 ${h / 2} H${w}`} stroke="#ffffff" strokeWidth={cw} />
      <path d={`M${w / 2} 0 V${h} M0 ${h / 2} H${w}`} stroke="#C8102E" strokeWidth={cr} />
    </svg>
  );
}

function NzFlag() {
  // 南十字座四星：红心白边
  const cross: [number, number, number][] = [
    [23.5, 5.2, 1.15],
    [26.4, 9.4, 1.35],
    [23.2, 14.2, 1.15],
    [20.6, 9.9, 0.95],
  ];
  return (
    <>
      <rect width="30" height="20" fill="#00247D" />
      <UnionJack w={15} h={10} />
      {cross.map(([x, y, r], i) => (
        <g key={i}>
          <polygon points={starPoints(x, y, r)} fill="#ffffff" />
          <polygon points={starPoints(x, y, r * 0.66)} fill="#CC142B" />
        </g>
      ))}
    </>
  );
}

function GbFlag() {
  return <UnionJack w={30} h={20} />;
}

function FrFlag() {
  return (
    <>
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </>
  );
}

function JpFlag() {
  return (
    <>
      <rect width="30" height="20" fill="#ffffff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </>
  );
}

function InFlag() {
  return (
    <>
      <rect width="30" height="6.667" fill="#FF9933" />
      <rect y="6.667" width="30" height="6.667" fill="#ffffff" />
      <rect y="13.333" width="30" height="6.667" fill="#138808" />
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.45" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={15}
            y1={10}
            x2={15 + 2.6 * Math.cos(a)}
            y2={10 + 2.6 * Math.sin(a)}
            stroke="#000080"
            strokeWidth="0.22"
          />
        );
      })}
    </>
  );
}

const FLAGS: Record<FlagKey, () => React.ReactElement> = {
  us: UsFlag,
  cn: CnFlag,
  su: SuFlag,
  ru: RuFlag,
  de: DeFlag,
  eu: EuFlag,
  nz: NzFlag,
  gb: GbFlag,
  fr: FrFlag,
  jp: JpFlag,
  in: InFlag,
};

function SingleFlag({ k, className }: { k: FlagKey; className?: string }) {
  const Shape = FLAGS[k];
  return (
    <svg
      viewBox="0 0 30 20"
      role="img"
      aria-label={FLAG_LABEL[k]}
      className={cn(
        "inline-block h-3 w-[18px] shrink-0 rounded-[1.5px] ring-1 ring-inset ring-black/15",
        className,
      )}
      preserveAspectRatio="xMidYMid slice"
    >
      <Shape />
    </svg>
  );
}

/** 解析「新西兰 / 美国」这类复合地区名 */
export function flagKeysFor(countryZh: string): FlagKey[] {
  return countryZh
    .split(/[/、]/)
    .map((s) => NAME_TO_FLAG[s.trim()])
    .filter(Boolean) as FlagKey[];
}

/**
 * 国旗组件。传中文国名即可，复合名会渲染多面旗。
 * `withName` 打开时在旗后跟上国名文字。
 */
export function Flag({
  country,
  className,
  flagClassName,
  withName = false,
}: {
  country: string;
  className?: string;
  flagClassName?: string;
  withName?: boolean;
}) {
  const keys = flagKeysFor(country);
  if (keys.length === 0) return withName ? <span className={className}>{country}</span> : null;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5">
        {keys.map((k) => (
          <SingleFlag key={k} k={k} className={flagClassName} />
        ))}
      </span>
      {withName ? <span>{country}</span> : null}
    </span>
  );
}
