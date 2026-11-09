import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV } from '../data/brand.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="container nav-row">
          <Logo />
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>)}
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost">Log in</Link>
            <Link to="/register" className="btn btn-gold">Get started</Link>
          </div>
          <button className="nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="drawer-top">
          <Logo light />
          <button className="nav-toggle drawer-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button>
        </div>
        <nav className="drawer-links">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>)}
        </nav>
        <div className="drawer-cta">
          <Link to="/login" className="btn btn-outline-light">Log in</Link>
          <Link to="/register" className="btn btn-gold">Get started</Link>
        </div>
      </div>
    </>
  );
}
