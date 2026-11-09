import { useState } from 'react';
import { useDemo } from '../../context/DemoContext.jsx';
import Field from '../../components/Field.jsx';
import { CRYPTOS } from '../../data/demo.js';
import { money } from '../../utils/format.js';

const FEE = 1; // placeholder network fee

export default function Withdraw() {
  const { available, requestWithdrawal } = useDemo();
  const [coin, setCoin] = useState('USDT');
  const [net, setNet] = useState('TRC20');
  const [amt, setAmt] = useState('');
  const [addr, setAddr] = useState('');
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState('');
  const n = Number(amt);
  const receive = Number.isFinite(n) && n > FEE ? n - FEE : 0;

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!Number.isFinite(n) || n <= FEE) x.amt = `Enter an amount above the ${money(FEE)} placeholder fee.`;
    else if (n > available) x.amt = `That is more than your available balance of ${money(available)}.`;
    if (addr.trim().length < 6) x.addr = 'Enter any text of 6 or more characters. Do not paste a real wallet address.';
    setErrs(x);
    if (Object.keys(x).length) return;
    requestWithdrawal(`${coin} ${net}`, n);
    setDone(`Simulated withdrawal of ${money(n)} is pending. Nothing was sent.`);
    setAmt(''); setAddr('');
  };

  return (
    <>
      <h1 className="dash-h">Withdraw</h1>
      <p className="sim">Demo only. No transaction is created on any blockchain.</p>
      <div className="two">
        <form className="panel" onSubmit={submit} noValidate>
          <div className="stat-row"><span>Available balance</span><strong>{money(available)}</strong></div>
          <Field label="Withdrawal amount (USD)" error={errs.amt}><input type="number" inputMode="decimal" value={amt} onChange={(e) => { setAmt(e.target.value); setDone(''); }} /></Field>
          <Field label="Cryptocurrency"><select value={coin} onChange={(e) => { setCoin(e.target.value); setNet(CRYPTOS[e.target.value][0]); }}>{Object.keys(CRYPTOS).map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Network"><select value={net} onChange={(e) => setNet(e.target.value)}>{CRYPTOS[coin].map((x) => <option key={x}>{x}</option>)}</select></Field>
          <Field label="Recipient address (demo)" error={errs.addr}><input value={addr} onChange={(e) => setAddr(e.target.value)} autoComplete="off" /></Field>
          <button className="btn btn-gold btn-block" type="submit">Submit simulated withdrawal</button>
          {done && <p className="ok" role="status">{done}</p>}
        </form>
        <div className="panel">
          <h2>Summary</h2>
          <div className="stat-row"><span>Amount</span><span>{n > 0 ? money(n) : '-'}</span></div>
          <div className="stat-row"><span>Estimated network fee (placeholder)</span><span>{money(FEE)}</span></div>
          <div className="stat-row"><span>Recipient receives</span><strong>{money(receive)}</strong></div>
          <div className="stat-row"><span>Asset and network</span><span>{coin} {net}</span></div>
          <p className="muted">Fees and processing times in a real service would depend on the network and the operator.</p>
        </div>
      </div>
    </>
  );
}
