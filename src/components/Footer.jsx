import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { NAV } from '../data/brand.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-note">
            A design prototype for presentation purposes. It is not an operating business,
            holds no licences, and does not offer investments or accept deposits.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Log in</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
      <div className="container footer-legal">
        Mining involves risk and returns are never guaranteed. Every projection shown on this site is a hypothetical
        illustration, not a forecast or an offer.
      </div>
    </footer>
  );
}
