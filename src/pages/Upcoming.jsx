import { Link } from 'react-router-dom';

export default function Upcoming({ title, stage }) {
  return (
    <section className="section section-light">
      <div className="container narrow center">
        <h1>{title}</h1>
        <p className="lead">
          {stage ? `This page is part of stage ${stage} of the build and is not ready yet.` : 'That address does not exist.'}
        </p>
        <Link to="/" className="btn btn-gold">Back to home</Link>
      </div>
    </section>
  );
}
