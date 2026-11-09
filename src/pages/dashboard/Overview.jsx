import { useDemo } from '../../context/DemoContext.jsx';
import TxTable from '../../components/TxTable.jsx';
import LineChart from '../../components/LineChart.jsx';
import { MACHINES } from '../../data/demo.js';
import { ILLUSTRATIVE_RATE } from '../../data/packages.js';
import { money } from '../../utils/format.js';

export default function Overview() {
  const { available, txs } = useDemo();
  const active = MACHINES.map((m) => {
    const frac = Math.min(1, m.startedAgo / m.days);
    const mat = new Date(); mat.setDate(mat.getDate() + m.days - m.startedAgo);
    return { ...m, frac, accrued: m.amount * ILLUSTRATIVE_RATE[m.days] * frac, mat };
  });
  const invested = active.reduce((s, m) => s + m.amount, 0);
  const earned = active.reduce((s, m) => s + m.accrued, 0);
  const total = available + invested + earned;
  const pending = txs.filter((t) => t.status === 'Pending').length;
  const series = Array.from({ length: 30 }, (_, i) => total * (0.93 + 0.07 * (i / 29)) + Math.sin(i * 1.3) * 6);
  series[29] = total;

  const stats = [
    ['Total portfolio value', money(total)],
    ['Available balance', money(available)],
    ['Illustrative accumulated earnings', money(earned)],
    ['Active mining machines', String(active.length)],
    ['Pending transactions', String(pending)],
  ];

  return (
    <>
      <h1 className="dash-h">Overview</h1>
      <p className="sim">Simulated data. Nothing here is a real balance or real mining output.</p>
      <div className="stats">{stats.map(([l, v]) => <div key={l} className="stat"><span>{l}</span><strong>{v}</strong></div>)}</div>

      <div className="panel"><h2>Portfolio performance (simulated, 30 days)</h2><LineChart values={series} label="Simulated portfolio value over 30 days" /></div>

      <div className="two">
        <div className="panel">
          <h2>Active mining machines</h2>
          {active.map((m) => (
            <div key={m.id} className="mach">
              <div className="mach-top"><strong>{m.name}</strong><span>{money(m.amount)}</span></div>
              <div className="bar" aria-label={`${Math.round(m.frac * 100)} percent of term elapsed`}><i style={{ width: `${m.frac * 100}%` }} /></div>
              <p>{Math.round(m.frac * 100)}% of {m.days}-day term. Matures {m.mat.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}. Hypothetical accrual {money(m.accrued)}.</p>
            </div>
          ))}
        </div>
        <div className="panel">
          <h2>Account activity</h2>
          <ul className="activity">
            <li>Demo session started</li>
            {active.map((m) => <li key={m.id}>{m.name} is on day {m.startedAgo} of {m.days}</li>)}
            {txs.slice(0, 2).map((t) => <li key={t.id}>{t.type} of {money(t.amount)} ({t.status.toLowerCase()})</li>)}
          </ul>
        </div>
      </div>

      <div className="panel"><h2>Recent transactions</h2><TxTable rows={txs.slice(0, 6)} /></div>
    </>
  );
}
