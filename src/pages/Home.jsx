import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, FileText, Cpu } from 'lucide-react';
import Photo from '../components/Photo.jsx';
import Section from '../components/Section.jsx';
import ProjectionChart from '../components/ProjectionChart.jsx';
import { PACKAGES, ILLUSTRATIVE_RATE } from '../data/packages.js';
import { money } from '../utils/format.js';

const STEPS = [
  ['Create an account', 'Register with an email address. In this prototype, nothing is stored.'],
  ['Select a mining machine', 'Choose a package and a 30, 60 or 90 day duration.'],
  ['Fund the account', 'Deposit a supported cryptocurrency. Simulated here.'],
  ['Monitor performance', 'Follow hypothetical accrual in the dashboard.'],
  ['Review and withdraw', 'See available balances and submit a simulated withdrawal request.'],
];

const FAQ = [
  ['Is this a live platform?', 'No. It is a design prototype. No funds are accepted and no mining takes place.'],
  ['Are the figures real?', 'No. Every amount and projection is a hypothetical illustration and is labelled as one.'],
  ['Could returns be guaranteed?', 'Never. Mining output varies with network conditions and can be lower than any illustration, or nil.'],
  ['What is planned versus built?', 'The interface is built. Mining operations, custody, compliance and payments are not part of this prototype.'],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Powering the future of digital asset mining.</h1>
            <p className="lead">
              Explore advanced mining infrastructure, transparent performance reporting and digital asset
              management through one sophisticated platform.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn btn-gold btn-lg">Get started</Link>
              <Link to="/machines" className="btn btn-outline btn-lg">Explore mining machines</Link>
            </div>
            <p className="hero-note">Concept prototype. Figures are simulated.</p>
          </div>
          <Photo name="hero.jpg" alt="Rows of mining servers in a data hall" ratio="5 / 6" className="hero-photo" />
        </div>
      </section>

      <Section title="A platform built around clarity" intro="The proposed account tools, kept separate from the mining operation itself.">
        <div className="trio">
          <div><Cpu size={22} /><h3>Mining operations</h3><p>Hardware, hosting and power. In a real service these would be run and evidenced separately from this software.</p></div>
          <div><FileText size={22} /><h3>Account and reporting</h3><p>Balances, maturity dates and activity history, presented in one dashboard.</p></div>
          <div><Eye size={22} /><h3>Plain disclosure</h3><p>Projections are labelled as hypothetical wherever they appear.</p></div>
        </div>
      </Section>

      <Section title="Infrastructure" intro="Photography slots for the client's own licensed or commissioned images." tone="warm">
        <div className="gallery">
          <Photo name="facility-1.jpg" alt="Industrial mining facility exterior" ratio="3 / 2" />
          <Photo name="facility-2.jpg" alt="Server racks with cooling" ratio="3 / 2" />
          <Photo name="facility-3.jpg" alt="Close view of mining hardware" ratio="3 / 2" />
        </div>
      </Section>

      <Section title="Mining machine packages" intro="Five tiers, each with 30, 60 and 90 day options.">
        <div className="tiers">
          {PACKAGES.map((p) => (
            <Link to="/machines" key={p.id} className="tier">
              <h3>{p.name}</h3>
              <p>From {money(p.amount)}</p>
            </Link>
          ))}
        </div>
        <div className="center"><Link to="/machines" className="btn btn-gold">Compare packages</Link></div>
      </Section>

      <Section title="How the platform would work" tone="dark">
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="step-n">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
      </Section>

      <Section title="Performance, demonstrated" intro="A hypothetical 90-day accrual on a Professional Miner allocation.">
        <ProjectionChart amount={1000} rate={ILLUSTRATIVE_RATE[90]} />
      </Section>

      <Section title="Security and transparency" tone="warm">
        <div className="trio">
          <div><ShieldCheck size={22} /><h3>No real credentials</h3><p>The prototype never collects or sends passwords.</p></div>
          <div><ShieldCheck size={22} /><h3>Fictional addresses</h3><p>Deposit screens use clearly marked demonstration addresses only.</p></div>
          <div><ShieldCheck size={22} /><h3>Static by design</h3><p>No backend, database or blockchain connection exists in this build.</p></div>
        </div>
      </Section>

      <Section title="Questions, answered plainly">
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q}><summary>{q}</summary><p>{a}</p></details>
          ))}
        </div>
      </Section>
    </>
  );
}
