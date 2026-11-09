import Section from '../components/Section.jsx';

const ROWS = [
  ['Interface prototype', 'Built', 'Every page you can see'],
  ['Mining hardware and hosting', 'Planned', 'Not in place'],
  ['Custody and payments', 'Planned', 'Not in place'],
  ['Legal and regulatory approvals', 'Planned', 'None held'],
  ['Independent performance reporting', 'Planned', 'Not in place'],
];

export default function About() {
  return (
    <>
      <section className="page-head"><div className="container"><h1>About us</h1>
        <p className="lead">The vision behind this concept, and a clear line between what exists and what does not.</p></div></section>
      <Section title="The vision">
        <div className="prose">
          <p>The concept is a single place where a customer can see what they hold, how long it runs for, and what has been reported against it, with every projection labelled for what it is.</p>
          <p>There is no company history to describe, because this is a design prototype. It has no operating record, no capacity figures and no partners.</p>
        </div>
      </Section>
      <Section title="Planned and built" tone="warm">
        <div className="table-wrap panel"><table>
          <thead><tr><th>Area</th><th>Status</th><th>Note</th></tr></thead>
          <tbody>{ROWS.map(([a, s, n]) => <tr key={a}><td>{a}</td><td><span className={`pill ${s === 'Built' ? 'pill-completed' : 'pill-pending'}`}>{s}</span></td><td>{n}</td></tr>)}</tbody>
        </table></div>
      </Section>
    </>
  );
}
