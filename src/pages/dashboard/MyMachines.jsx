import { useState } from 'react';
import Modal from '../../components/Modal.jsx';
import { MACHINES } from '../../data/demo.js';
import { money, machineStats, shortDate } from '../../utils/format.js';

export default function MyMachines() {
  const [sel, setSel] = useState(null);
  const rows = MACHINES.map(machineStats);
  return (
    <>
      <h1 className="dash-h">My mining machines</h1>
      <p className="sim">Simulated machines in a demo account. Accrued figures are hypothetical.</p>
      {rows.length === 0 && <p className="empty">No machines yet. Choose one on the Mining Machines page.</p>}
      <div className="mgrid">
        {rows.map((m) => (
          <article key={m.id} className="panel">
            <div className="mach-top"><h2>{m.name}</h2><span className="pill pill-pending">Active</span></div>
            <dl className="calc">
              <div><dt>Purchase amount</dt><dd>{money(m.amount)}</dd></div>
              <div><dt>Duration</dt><dd>{m.days} days</dd></div>
              <div><dt>Hypothetical accrual</dt><dd>{money(m.accrued)}</dd></div>
              <div><dt>Maturity date</dt><dd>{shortDate(m.mat)}</dd></div>
            </dl>
            <button className="btn btn-outline btn-block" style={{ marginTop: 14 }} onClick={() => setSel(m)}>View details</button>
          </article>
        ))}
      </div>
      {sel && (
        <Modal title={sel.name} onClose={() => setSel(null)}>
          <div className="stat-row"><span>Activated</span><span>{shortDate(sel.start)}</span></div>
          <div className="stat-row"><span>Matures</span><span>{shortDate(sel.mat)}</span></div>
          <div className="stat-row"><span>Term elapsed</span><span>{Math.round(sel.frac * 100)}% (day {sel.startedAgo} of {sel.days})</span></div>
          <div className="stat-row"><span>Purchase amount</span><span>{money(sel.amount)}</span></div>
          <div className="stat-row"><span>Hypothetical accrual to date</span><span>{money(sel.accrued)}</span></div>
          <p className="muted">Illustration only. A real machine's output would depend on network conditions and could be lower, or nil.</p>
        </Modal>
      )}
    </>
  );
}
