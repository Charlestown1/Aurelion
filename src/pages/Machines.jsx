import { useState } from 'react';
import PackageCard from '../components/PackageCard.jsx';
import { PACKAGES, DURATIONS } from '../data/packages.js';

export default function Machines() {
  const [days, setDays] = useState(30);
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Mining machines</h1>
          <p className="lead">
            Five packages, three durations. Switch the duration to see how the hypothetical projection changes.
          </p>
          <div className="seg" role="radiogroup" aria-label="Mining duration">
            {DURATIONS.map((d) => (
              <button key={d} role="radio" aria-checked={days === d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>
                {d} days
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container pkg-grid">
          {PACKAGES.map((p) => <PackageCard key={p.id} pkg={p} days={days} />)}
        </div>
        <div className="container">
          <p className="disclaimer">
            Projections use a single illustrative rate per duration, set in <code>src/data/packages.js</code>.
            They are not forecasts. Real mining output depends on network difficulty, asset prices, hardware and
            fees, and can be lower than shown or nil.
          </p>
        </div>
      </section>
    </>
  );
}
