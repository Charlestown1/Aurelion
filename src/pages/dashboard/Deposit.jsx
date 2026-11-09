import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useDemo } from '../../context/DemoContext.jsx';
import Field from '../../components/Field.jsx';
import { CRYPTOS } from '../../data/demo.js';
import { money } from '../../utils/format.js';

const MIN = 10; // placeholder minimum

export default function Deposit() {
  const { txs, requestDeposit } = useDemo();
  const [coin, setCoin] = useState('USDT');
  const [net, setNet] = useState('TRC20');
  const [amt, setAmt] = useState('');
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState('');
  const [done, setDone] = useState(false);
  const address = `DEMO-ONLY-${coin}-${net}-NOT-A-REAL-ADDRESS`.toUpperCase();
  const recent = txs.filter((t) => t.type === 'Deposit').slice(0, 3);

  const pickCoin = (c) => { setCoin(c); setNet(CRYPTOS[c][0]); setDone(false); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(address); setCopied('Copied the demo text.'); }
    catch { setCopied('Copy is blocked in this browser. Select the text manually.'); }
    setTimeout(() => setCopied(''), 2500);
  };
  const submit = (e) => {
    e.preventDefault();
    const n = Number(amt);
    if (!Number.isFinite(n) || n < MIN) { setErr(`Enter an amount of at least ${money(MIN)}.`); return; }
    setErr(''); requestDeposit(`${coin} ${net}`, n); setDone(true); setAmt('');
  };

  return (
    <>
      <h1 className="dash-h">Deposit</h1>
      <p className="sim">Demo only. No real address, no real funds, no blockchain connection.</p>
      <div className="two">
        <form className="panel" onSubmit={submit} noValidate>
          <Field label="Cryptocurrency"><select value={coin} onChange={(e) => pickCoin(e.target.value)}>{Object.keys(CRYPTOS).map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Network"><select value={net} onChange={(e) => { setNet(e.target.value); setDone(false); }}>{CRYPTOS[coin].map((n) => <option key={n}>{n}</option>)}</select></Field>
          <Field label="Deposit amount (USD)" error={err}><input type="number" inputMode="decimal" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder={`Minimum ${MIN} (placeholder)`} /></Field>
          <p className="muted">Minimum deposit: {money(MIN)} (placeholder value).</p>
          <button className="btn btn-gold btn-block" type="submit">Submit simulated deposit</button>
          {done && <p className="ok" role="status">Simulated deposit request created. Status: pending confirmation. Nothing was sent.</p>}
        </form>

        <div className="panel">
          <h2>Receiving address</h2>
          <div className="demo-flag">DEMO ONLY</div>
          <code className="addr">{address}</code>
          <button className="btn btn-outline btn-block" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}&nbsp;Copy demo address</button>
          {copied && <p className="muted" role="status">{copied}</p>}
          <div className="qr" aria-label="QR code placeholder">QR placeholder<br />Demonstration only</div>
          <p className="muted">Never send real funds to anything shown on this page.</p>
        </div>
      </div>

      <div className="panel">
        <h2>How a deposit would work</h2>
        <ol className="flow">
          <li>Select the cryptocurrency</li><li>Select the network</li><li>Enter the amount</li>
          <li>View the receiving address</li><li>Copy the address</li><li>Submit the deposit request</li><li>Wait for confirmation</li>
        </ol>
      </div>

      <div className="panel">
        <h2>Transaction status</h2>
        {recent.map((t) => <div key={t.id} className="stat-row"><span>{t.asset}, {money(t.amount)}</span><span className={`pill pill-${t.status.toLowerCase()}`}>{t.status}</span></div>)}
      </div>
    </>
  );
}
