import * as React from 'react';
import { cn } from '@/lib/cn';

export type RadarLevel = 'H' | 'M' | 'L';

export interface RadarChartProps {
  /**
   * Map of axis key to level. Order of keys is preserved and dictates the
   * polygon vertices. 15 axes maps to the SBTI dimension radar.
   */
  data: Record<string, RadarLevel>;
  /** SVG viewBox size (square). Defaults to 400. */
  size?: number;
  /** Optional short labels per key (e.g. 'SOC', 'RAT'). Falls back to key. */
  labels?: Record<string, string>;
  className?: string;
}

const levelToRadius: Record<RadarLevel, number> = {
  L: 1,
  M: 2,
  H: 3,
};

/**
 * SVG radar / spider chart.
 * H = 3, M = 2, L = 1 (distance from center). Axes are distributed evenly
 * around a full turn starting at the top. Works for any number of axes but is
 * designed for the 15-dimension SBTI result.
 */
export function RadarChart({
  data,
  size = 400,
  labels,
  className,
}: RadarChartProps) {
  const keys = Object.keys(data);
  const axisCount = keys.length;
  const center = size / 2;
  const maxRadius = size * 0.38;
  const labelRadius = size * 0.455;
  const maxLevel = 3;

  const angleFor = (index: number) =>
    (Math.PI * 2 * index) / axisCount - Math.PI / 2;

  const pointOnAxis = (index: number, level: number) => {
    const angle = angleFor(index);
    const radius = (maxRadius * level) / maxLevel;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  };

  const gridPolygons = [1, 2, 3].map((level) => {
    const points = keys
      .map((_, index) => {
        const p = pointOnAxis(index, level);
        return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
      })
      .join(' ');
    return { level, points };
  });

  const axesLines = keys.map((_, index) => {
    const p = pointOnAxis(index, maxLevel);
    return { x: p.x, y: p.y };
  });

  const dataPoints = keys.map((key, index) => {
    const level = levelToRadius[data[key]];
    return pointOnAxis(index, level);
  });

  const dataPolygon = dataPoints
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn('w-full h-auto', className)}
      role="img"
      aria-label="SBTI radar chart"
    >
      <defs>
        <radialGradient id="sbti-radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(168 85 247)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(236 72 153)" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      {gridPolygons.map((g) => (
        <polygon
          key={g.level}
          points={g.points}
          fill="none"
          stroke="rgb(63 63 70)"
          strokeWidth={1}
          strokeDasharray={g.level === maxLevel ? undefined : '3 4'}
        />
      ))}

      {axesLines.map((p, i) => (
        <line
          key={`axis-${i}`}
          x1={center}
          y1={center}
          x2={p.x}
          y2={p.y}
          stroke="rgb(63 63 70)"
          strokeWidth={1}
        />
      ))}

      <polygon
        points={dataPolygon}
        fill="url(#sbti-radar-fill)"
        stroke="rgb(192 132 252)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {dataPoints.map((p, i) => (
        <circle
          key={`pt-${i}`}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="rgb(244 114 182)"
          stroke="rgb(253 224 71)"
          strokeWidth={1}
        />
      ))}

      {keys.map((key, index) => {
        const angle = angleFor(index);
        const x = center + Math.cos(angle) * labelRadius;
        const y = center + Math.sin(angle) * labelRadius;
        const anchor =
          Math.abs(Math.cos(angle)) < 0.3
            ? 'middle'
            : Math.cos(angle) > 0
              ? 'start'
              : 'end';
        return (
          <text
            key={`label-${key}`}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="fill-zinc-300"
            fontSize={size * 0.032}
            fontWeight={600}
          >
            {labels?.[key] ?? key}
          </text>
        );
      })}
    </svg>
  );
}
