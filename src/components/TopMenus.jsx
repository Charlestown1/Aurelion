import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { useDemo } from '../context/DemoContext.jsx';
import { money } from '../utils/format.js';

export default function TopMenus() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const { txs, leave } = useDemo();
  const nav = useNavigate();
  const pending = txs.filter((t) => t.status === 'Pending');
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(null);
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const toggle = (k) => setOpen(open === k ? null : k);

  return (
    <div className="menus" ref={ref}>
      <div className="menu-wrap">
        <button className="icon-btn" onClick={() => toggle('n')} aria-label="Notifications" aria-expanded={open === 'n'}>
          <Bell size={19} />{pending.length > 0 && <i className="dot" />}
        </button>
        {open === 'n' && (
          <div className="dropdown">
            <strong>Notifications</strong>
            {pending.length === 0 && <p className="muted">Nothing new. Pending deposits and withdrawals appear here.</p>}
            {pending.map((t) => <p key={t.id}>{t.type} of {money(t.amount)} is pending (simulated).</p>)}
          </div>
        )}
      </div>
      <div className="menu-wrap">
        <button className="icon-btn" onClick={() => toggle('p')} aria-label="Profile menu" aria-expanded={open === 'p'}><User size={19} /></button>
        {open === 'p' && (
          <div className="dropdown">
            <strong>Demo account</strong>
            <Link to="/dashboard/settings" onClick={() => setOpen(null)}>Account settings</Link>
            <button onClick={() => { leave(); nav('/'); }}>Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}
