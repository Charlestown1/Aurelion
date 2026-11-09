import { useState } from 'react';
import { useDemo } from '../../context/DemoContext.jsx';
import TxTable from '../../components/TxTable.jsx';

const TYPES = ['All', 'Deposit', 'Withdrawal', 'Mining earnings', 'Investment purchase'];
const STATUSES = ['All', 'Completed', 'Pending'];

export default function Transactions() {
  const { txs } = useDemo();
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const rows = txs.filter((t) => (type === 'All' || t.type === type) && (status === 'All' || t.status === status));
  return (
    <>
      <h1 className="dash-h">Transactions</h1>
      <p className="sim">Simulated records. Not a financial statement.</p>
      <div className="panel">
        <div className="filters">
          <label className="field"><span>Type</span><select value={type} onChange={(e) => setType(e.target.value)}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></label>
          <label className="field"><span>Status</span><select value={status} onChange={(e) => setStatus(e.target.value)}>{STATUSES.map((t) => <option key={t}>{t}</option>)}</select></label>
        </div>
        {rows.length ? <TxTable rows={rows} /> : <p className="empty">No transactions match these filters. Set both filters to All to see everything.</p>}
      </div>
    </>
  );
}
