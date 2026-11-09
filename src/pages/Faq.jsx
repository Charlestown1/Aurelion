import { FAQ_GROUPS } from '../data/faq.js';

export default function Faq() {
  return (
    <>
      <section className="page-head"><div className="container"><h1>Frequently asked questions</h1>
        <p className="lead">Plain answers about mining, the demo, and what is and is not real.</p></div></section>
      <section className="section section-light"><div className="container narrow-left">
        {FAQ_GROUPS.map(([g, items]) => (
          <div key={g} className="faq-group">
            <h2>{g}</h2>
            <div className="faq">{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
          </div>
        ))}
      </div></section>
    </>
  );
}
