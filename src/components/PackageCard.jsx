import { useState } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo.jsx';
import { ILLUSTRATIVE_RATE, DURATIONS } from '../data/packages.js';
import { money, project, maturityDate } from '../utils/format.js';

export default function PackageCard({ pkg, days }) {
  const [amount, setAmount] = useState(pkg.amount);
  const valid = Number.isFinite(amount) && amount >= pkg.amount;
  const p = project(valid ? amount : pkg.amount, days, ILLUSTRATIVE_RATE);

  return (
    <article className="pkg">
      <Photo name={pkg.image} alt={`${pkg.name} mining hardware`} ratio="16 / 10" />
      <div className="pkg-body">
        <header>
          <h3>{pkg.name}</h3>
          <p className="pkg-from">From <strong>{money(pkg.amount)}</strong></p>
        </header>
        <p className="pkg-blurb">{pkg.blurb}</p>

        <label className="field">
          <span>Amount to simulate (USD)</span>
          <input
            type="number" inputMode="decimal" min={pkg.amount} step="10" value={Number.isFinite(amount) ? amount : ''}
            onChange={(e) => setAmount(e.target.value === '' ? NaN : Number(e.target.value))}
            aria-invalid={!valid}
          />
          {!valid && <small className="error">Enter at least {money(pkg.amount)} to run the simulation.</small>}
        </label>

        <dl className="calc">
          <div><dt>Duration</dt><dd>{days} days</dd></div>
          <div><dt>Hypothetical gain</dt><dd>{money(p.gain)}</dd></div>
          <div><dt>Hypothetical total</dt><dd>{money(p.total)}</dd></div>
          <div><dt>Simulated maturity</dt><dd>{maturityDate(days)}</dd></div>
        </dl>
        <details className="brk">
          <summary>Full breakdown (hypothetical)</summary>
          <div className="brk-body">
            <h4>Plan terms</h4>
            <div className="table-wrap"><table><tbody>
              <tr><td>Minimum amount</td><td className="r">{money(pkg.amount)}</td></tr>
              <tr><td>Terms available</td><td className="r">30, 60 or 90 days</td></tr>
              <tr><td>Results reported</td><td className="r">In the dashboard, daily (simulated)</td></tr>
              <tr><td>Payout</td><td className="r">At maturity (placeholder)</td></tr>
              <tr><td>Fees</td><td className="r">To be confirmed</td></tr>
              <tr><td>Early exit</td><td className="r">To be confirmed</td></tr>
              <tr><td>Capital protection</td><td className="r">None</td></tr>
            </tbody></table></div>
            <h4>All durations on {money(valid ? amount : pkg.amount)}</h4>
            <div className="table-wrap"><table>
              <thead><tr><th>Term</th><th className="r">Rate</th><th className="r">Gain</th><th className="r">Total</th><th className="r">Per day</th></tr></thead>
              <tbody>{DURATIONS.map((d) => { const q = project(valid ? amount : pkg.amount, d, ILLUSTRATIVE_RATE); return (
                <tr key={d} className={d === days ? 'hl' : ''}><td>{d} days</td><td className="r">{(ILLUSTRATIVE_RATE[d] * 100).toFixed(1)}%</td><td className="r">{money(q.gain)}</td><td className="r">{money(q.total)}</td><td className="r">{money(q.perDay)}</td></tr>); })}</tbody>
            </table></div>
            <h4>Three outcomes over {days} days</h4>
            <div className="table-wrap"><table>
              <thead><tr><th>Outcome</th><th className="r">Gain</th><th className="r">Total</th></tr></thead>
              <tbody>
                <tr><td>No output</td><td className="r">{money(0)}</td><td className="r">{money(valid ? amount : pkg.amount)}</td></tr>
                <tr><td>Half the assumption</td><td className="r">{money(p.gain / 2)}</td><td className="r">{money((valid ? amount : pkg.amount) + p.gain / 2)}</td></tr>
                <tr className="hl"><td>Assumption</td><td className="r">{money(p.gain)}</td><td className="r">{money(p.total)}</td></tr>
              </tbody>
            </table></div>
            <p>Capital is not protected. Real results depend on network difficulty, asset prices, hardware and fees, and can fall below every row above.</p>
          </div>
        </details>
        <p className="pkg-flag">Illustration only. Not actual or guaranteed performance.</p>
        <Link to={`/register?machine=${pkg.id}`} className="btn btn-gold btn-block">Select machine</Link>
      </div>
    </article>
  );
}
