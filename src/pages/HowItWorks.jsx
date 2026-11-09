import Photo from '../components/Photo.jsx';
import Section from '../components/Section.jsx';

const STEPS = [
  ['Create an account', 'Register with your name, email and country.'],
  ['Select a mining machine', 'Pick a package and a 30, 60 or 90 day duration.'],
  ['Fund the account', 'Deposit a supported cryptocurrency on a supported network.'],
  ['Monitor mining performance', 'Follow progress, maturity dates and reported activity in the dashboard.'],
  ['Review balances and request withdrawals', 'Check what is available and submit a withdrawal request.'],
];
const CHAIN = [
  ['Transactions are broadcast', 'People send coins; the transactions wait in a pool.'],
  ['Miners assemble a block', 'Miners group waiting transactions into a candidate block.'],
  ['Miners race to solve a puzzle', 'Specialised hardware tries enormous numbers of guesses per second.'],
  ['A block is added', 'The first valid solution extends the chain, and the winning miner receives the reward.'],
];

export default function HowItWorks() {
  return (
    <>
      <section className="page-head"><div className="container"><h1>How it works</h1>
        <p className="lead">The proposed process, from sign-up to withdrawal. In this prototype every step is simulated.</p></div></section>

      <Section title="Five steps">
        <ol className="steps steps-light">
          {STEPS.map(([t, d], i) => <li key={t}><span className="step-n">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}
        </ol>
      </Section>

      <Section title="How blockchain mining works" intro="A simplified view of proof-of-work mining." tone="warm">
        <div className="chain">
          {CHAIN.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
        <div className="gallery" style={{ marginTop: 28 }}>
          <Photo name="facility-1.jpg" alt="Mining facility" ratio="3 / 2" />
          <Photo name="facility-2.jpg" alt="Server racks" ratio="3 / 2" />
          <Photo name="facility-3.jpg" alt="Mining hardware" ratio="3 / 2" />
        </div>
      </Section>

      <Section title="Two different things" intro="Mining and account management are separate. This prototype shows only the second.">
        <div className="two-col">
          <div className="panel"><h2>Mining operations</h2><p className="muted">Hardware, hosting, electricity, pool connections and the coins actually earned. Not part of this software, and not in place.</p></div>
          <div className="panel"><h2>Account and reporting</h2><p className="muted">Sign-up, funding, balances, maturity schedules, history and withdrawal requests. This is what the prototype demonstrates, using simulated data.</p></div>
        </div>
      </Section>
    </>
  );
}
