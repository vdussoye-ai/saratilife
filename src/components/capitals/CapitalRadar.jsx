import { useEffect, useState } from 'react';

const CAPITAL_KEYS = ['career', 'financial', 'health', 'social', 'inner'];
const CAPITAL_LABELS = { career: 'Career', financial: 'Financial', health: 'Health', social: 'Social', inner: 'Inner' };
const CAPITAL_COLORS = { career: 'var(--career)', financial: 'var(--financial)', health: 'var(--health)', social: 'var(--social)', inner: 'var(--inner)' };

/**
 * @param {{ scores: { career: number, financial: number, health: number, social: number, inner: number }, className?: string }} props
 */
export default function CapitalRadar({ scores, className = '' }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const levels = [25, 50, 75, 100];

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / CAPITAL_KEYS.length - Math.PI / 2;
    const r = (value / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const dataPoints = CAPITAL_KEYS.map((key, i) =>
    getPoint(i, animated ? (scores[key] || 0) : 0)
  );

  const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Five Capitals Radar Chart">
        {/* Grid levels */}
        {levels.map((level) => {
          const pts = CAPITAL_KEYS.map((_, i) => getPoint(i, level));
          return (
            <polygon
              key={level}
              points={pts.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="var(--light-gray)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {CAPITAL_KEYS.map((_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke="var(--light-gray)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(232, 137, 12, 0.15)"
          stroke="var(--saffron)"
          strokeWidth="2"
          style={{
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Data dots */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--white)"
            stroke="var(--saffron)"
            strokeWidth="2"
            style={{ transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        ))}

        {/* Labels */}
        {CAPITAL_KEYS.map((key, i) => {
          const labelR = maxR + 24;
          const angle = (Math.PI * 2 * i) / CAPITAL_KEYS.length - Math.PI / 2;
          const x = cx + labelR * Math.cos(angle);
          const y = cy + labelR * Math.sin(angle);
          return (
            <text
              key={key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                fill: 'var(--charcoal)',
              }}
            >
              {CAPITAL_LABELS[key]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
