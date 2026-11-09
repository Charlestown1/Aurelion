import { useState } from 'react';
import Field from '../../components/Field.jsx';
import { COUNTRIES } from '../../data/demo.js';

const KEY = 'aurelion-demo-notify';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export default function Settings() {
  const [p, setP] = useState({ name: 'Demo User', email: 'demo@example.com', country: 'Nigeria' });
  const [saved, setSaved] = useState(false);
  const [n, setN] = useState({ deposits: true, withdrawals: true, maturity: true, ...read() });
  const flip = (k) => {
    const next = { ...n, [k]: !n[k] };
    setN(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  };
  return (
    <>
      <h1 className="dash-h">Account settings</h1>
      <p className="sim">Demo profile. Changes are kept for this session only.</p>
      <div className="two">
        <form className="panel" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
          <h2>Profile</h2>
          <Field label="Full name"><input value={p.name} onChange={(e) => { setP({ ...p, name: e.target.value }); setSaved(false); }} /></Field>
          <Field label="Email address"><input type="email" value={p.email} onChange={(e) => { setP({ ...p, email: e.target.value }); setSaved(false); }} /></Field>
          <Field label="Country"><select value={p.country} onChange={(e) => { setP({ ...p, country: e.target.value }); setSaved(false); }}>{COUNTRIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <button className="btn btn-gold btn-block" type="submit">Save changes</button>
          {saved && <p className="ok" role="status">Saved for this demo session.</p>}
        </form>
        <div className="panel">
          <h2>Notifications</h2>
          {[['deposits', 'Deposit updates'], ['withdrawals', 'Withdrawal updates'], ['maturity', 'Machine maturity reminders']].map(([k, l]) => (
            <label key={k} className="check toggle"><input type="checkbox" checked={n[k]} onChange={() => flip(k)} />{l}</label>
          ))}
          <p className="muted">These preferences are the only thing saved in this browser. No financial data is stored.</p>
          <h2 style={{ marginTop: 20 }}>Security</h2>
          <p className="muted">Two-factor authentication and password changes are not part of this prototype.</p>
        </div>
      </div>
    </>
  );
}
