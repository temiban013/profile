import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

/**
 * CSS-only animated grid pattern.
 * Uses a seeded PRNG so server and client produce identical positions,
 * avoiding hydration mismatches. CSS @keyframes handle the animation.
 */
export default function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 30,
  className,
  maxOpacity = 0.5,
  duration = 3,
}: AnimatedGridPatternProps) {
  // Seeded PRNG (mulberry32) — deterministic across server/client renders.
  const seed = numSquares * 7 + 42;
  let s = seed | 0;
  function seededRandom() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const cols = 25;
  const rows = 25;
  const squares = Array.from({ length: numSquares }, (_, i) => ({
    id: i,
    cx: Math.floor(seededRandom() * cols),
    cy: Math.floor(seededRandom() * rows),
  }));

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ id, cx, cy }) => (
          <rect
            key={id}
            className="animate-grid-fade"
            style={{
              animationDelay: `${id * 0.15}s`,
              animationDuration: `${duration}s`,
              ["--grid-max-opacity" as string]: maxOpacity,
            }}
            width={width - 1}
            height={height - 1}
            x={cx * width + 1}
            y={cy * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}
