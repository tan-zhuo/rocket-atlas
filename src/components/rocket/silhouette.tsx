import type { RocketGeometry, RocketPart } from "@/data/types";
import { partFinish } from "@/data/geometry";
import { cn } from "@/lib/utils";

/**
 * 参数化几何 → 等比 2D 侧视剪影（SVG）。
 *
 * 与 3D 查看器共用同一份 geometry 数据，因此剪影的比例可信：
 * 对比页把多枚火箭放进同一个 y 轴刻度，就能直接读出真实尺寸差异。
 * 同时它也是移动端与 3D 加载失败时的降级方案。
 */

type Mode = "solid" | "outline";

function partColor(p: RocketPart, mode: Mode) {
  // 与 3D 查看器共用同一张表面处理表，两种呈现的配色因此始终一致
  if (mode === "outline") return "currentColor";
  return partFinish(p).color;
}

/** 单个部件在侧视图中的路径元素（本地坐标：x 为半径方向，y 向上为正） */
function PartShapeEl({ p, mode, xOffset }: { p: RocketPart; mode: Mode; xOffset: number }) {
  const fill = partColor(p, mode);
  const common =
    mode === "outline"
      ? { fill: "none", stroke: "currentColor", strokeWidth: 0.12, vectorEffect: "non-scaling-stroke" as const }
      : { fill, stroke: "rgba(0,0,0,0.28)", strokeWidth: 0.03 };

  const x = xOffset;
  const y0 = p.bottom;
  const y1 = p.bottom + p.height;
  const r = p.radius;
  const rt = p.radiusTop ?? p.radius;

  switch (p.shape) {
    case "cylinder":
      return <rect x={x - r} y={y0} width={r * 2} height={p.height} {...common} />;

    case "frustum":
    case "cone":
      return (
        <polygon
          points={`${x - r},${y0} ${x + r},${y0} ${x + (p.shape === "cone" ? 0.001 : rt)},${y1} ${
            x - (p.shape === "cone" ? 0.001 : rt)
          },${y1}`}
          {...common}
        />
      );

    case "ogive":
      // 卵形头锥：两段二次贝塞尔逼近
      return (
        <path
          d={`M ${x - r} ${y0} L ${x + r} ${y0} Q ${x + r} ${y0 + p.height * 0.72} ${x} ${y1} Q ${
            x - r
          } ${y0 + p.height * 0.72} ${x - r} ${y0} Z`}
          {...common}
        />
      );

    case "capsule":
      return (
        <polygon
          points={`${x - r},${y0} ${x + r},${y0} ${x + r * 0.34},${y1} ${x - r * 0.34},${y1}`}
          {...common}
        />
      );

    case "engines": {
      const n = p.nozzles;
      const bell = n?.bellRadius ?? r * 0.4;
      const bh = Math.min(n?.bellHeight ?? p.height, p.height);
      const ring = n?.ringRadius ?? 0;
      // 侧视只画最外侧一对喷管 + 中心喷管（若为奇数台）
      const xs = ring > 0 ? [x - ring, x + ring, ...((n?.count ?? 1) % 2 ? [x] : [])] : [x];
      return (
        <>
          {xs.map((cx, i) => (
            <polygon
              key={i}
              points={`${cx - bell * 0.42},${y1} ${cx + bell * 0.42},${y1} ${cx + bell},${
                y1 - bh
              } ${cx - bell},${y1 - bh}`}
              {...common}
            />
          ))}
        </>
      );
    }

    case "fins":
      // 侧视：贴在箭体两侧的后掠三角
      return (
        <>
          <polygon
            points={`${x},${y0} ${x - r},${y0} ${x},${y1}`}
            {...common}
          />
          <polygon points={`${x},${y0} ${x + r},${y0} ${x},${y1}`} {...common} />
        </>
      );

    case "gridfins":
      return (
        <>
          <rect x={x - r} y={y0} width={r} height={p.height} {...common} />
          <rect x={x} y={y0} width={r} height={p.height} {...common} />
        </>
      );

    case "flap":
      return (
        <>
          <polygon points={`${x},${y0} ${x - r},${y1} ${x},${y1}`} {...common} />
          <polygon points={`${x},${y0} ${x + r},${y1} ${x},${y1}`} {...common} />
        </>
      );

    case "tower":
      return (
        <>
          <rect x={x - r * 0.28} y={y0} width={r * 0.56} height={p.height} {...common} />
          <polygon
            points={`${x - r},${y0} ${x + r},${y0} ${x + r * 0.28},${y0 + p.height * 0.3} ${
              x - r * 0.28
            },${y0 + p.height * 0.3}`}
            {...common}
          />
        </>
      );

    default:
      return <rect x={x - r} y={y0} width={r * 2} height={p.height} {...common} />;
  }
}

export function Silhouette({
  geometry,
  /** 统一的 y 轴刻度（m→px）。对比页传入同一个值即可等比并排。 */
  scale,
  mode = "solid",
  className,
  title,
}: {
  geometry: RocketGeometry;
  scale?: number;
  mode?: Mode;
  className?: string;
  title?: string;
}) {
  const h = geometry.totalHeight;
  const w = Math.max(geometry.maxRadius * 2, h * 0.12);
  const pad = w * 0.08;

  // 先画外侧的助推器/尾翼，再画芯级，视觉层次更自然
  const ordered = [...geometry.parts].sort((a, b) => {
    const la = a.cluster ? a.cluster.offset : 0;
    const lb = b.cluster ? b.cluster.offset : 0;
    return lb - la;
  });

  return (
    <svg
      className={cn("block", className)}
      viewBox={`${-w / 2 - pad} 0 ${w + pad * 2} ${h}`}
      style={scale ? { height: h * scale, width: (w + pad * 2) * scale } : undefined}
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={title ?? "火箭等比侧视剪影"}
    >
      {title ? <title>{title}</title> : null}
      {/* y 轴向上：整体翻转 */}
      <g transform={`translate(0 ${h}) scale(1 -1)`}>
        {ordered.map((p) => {
          const offsets = p.cluster ? [-p.cluster.offset, p.cluster.offset] : [0];
          return offsets.map((o, i) => (
            <PartShapeEl key={`${p.id}-${i}`} p={p} mode={mode} xOffset={o} />
          ));
        })}
      </g>
    </svg>
  );
}
