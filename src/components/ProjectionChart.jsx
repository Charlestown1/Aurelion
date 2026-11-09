import { money } from '../utils/format.js';

// Simple illustrative accrual line. Linear by assumption; real output would vary.
export default function ProjectionChart({ amount, rate, days = 90 }) {
  const W = 600, H = 220, pad = 28;
  const pts = Array.from({ length: days + 1 }, (_, d) => [
    pad + (d / days) * (W - pad * 2),
    H - pad - (d / days) * (H - pad * 2),
  ]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0]} ${H - pad} L${pad} ${H - pad} Z`;
  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Illustrative accrual over 90 days">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={pad} x2={W - pad} y1={pad + i * ((H - pad * 2) / 3)} y2={pad + i * ((H - pad * 2) / 3)} stroke="#E4E0D8" />
        ))}
        <path d={area} fill="#C6A15B" opacity="0.12" />
        <path d={line} fill="none" stroke="#B89552" strokeWidth="2.5" />
        <text x={pad} y={H - 6} fontSize="12" fill="#6B675F">Day 0</text>
        <text x={W - pad} y={H - 6} fontSize="12" fill="#6B675F" textAnchor="end">Day {days}</text>
        <text x={W - pad} y={pad - 10} fontSize="12" fill="#6B675F" textAnchor="end">{money(amount * rate)} (hypothetical)</text>
      </svg>
      <figcaption>Hypothetical accrual on {money(amount)}. Assumes a constant rate; actual mining output varies and can be zero.</figcaption>
    </figure>
  );
}
