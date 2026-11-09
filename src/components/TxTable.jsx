import { money } from '../utils/format.js';

export default function TxTable({ rows }) {
  if (!rows.length) return <p className="empty">No transactions yet. Make a simulated deposit to see activity here.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Date</th><th>Type</th><th>Asset</th><th className="r">Amount</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id}>
              <td>{t.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
              <td>{t.type}</td><td>{t.asset}</td>
              <td className="r">{money(t.amount)}</td>
              <td><span className={`pill pill-${t.status.toLowerCase()}`}>{t.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
