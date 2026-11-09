export default function LineChart({ values, label }) {
  const W = 640, H = 220, p = 24;
  const min = Math.min(...values), max = Math.max(...values), span = max - min || 1;
  const pts = values.map((v, i) => [p + (i / (values.length - 1)) * (W - p * 2), H - p - ((v - min) / span) * (H - p * 2)]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="linechart" role="img" aria-label={label}>
      {[0, 1, 2].map((i) => <line key={i} x1={p} x2={W - p} y1={p + i * ((H - p * 2) / 2)} y2={p + i * ((H - p * 2) / 2)} stroke="#E4E0D8" />)}
      <path d={`${d} L${pts[pts.length - 1][0]} ${H - p} L${p} ${H - p} Z`} fill="#C6A15B" opacity=".12" />
      <path d={d} fill="none" stroke="#B89552" strokeWidth="2.5" />
    </svg>
  );
}
