import { useDemo } from '../../context/DemoContext.jsx';
import TxTable from '../../components/TxTable.jsx';
import { money } from '../../utils/format.js';

export default function History() {
  const { txs } = useDemo();
  const rows = txs.filter((t) => t.type === 'Investment purchase');
  const total = rows.reduce((s, t) => s + t.amount, 0);
  return (
    <>
      <h1 className="dash-h">Investment history</h1>
      <p className="sim">Simulated purchases in the demo account.</p>
      <div className="stats" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
        <div className="stat"><span>Machines purchased</span><strong>{rows.length}</strong></div>
        <div className="stat"><span>Total simulated amount</span><strong>{money(total)}</strong></div>
      </div>
      <div className="panel"><h2>Purchases</h2><TxTable rows={rows} /></div>
    </>
  );
}
