export default function Section({ title, intro, tone = 'light', children, id }) {
  return (
    <section id={id} className={`section section-${tone}`}>
      <div className="container">
        {(title || intro) && (
          <div className="section-head">
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
