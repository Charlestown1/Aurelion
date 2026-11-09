import { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Cpu, ArrowDownToLine, ArrowUpFromLine, History, ListOrdered, Settings, LogOut, Menu, X } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import TopMenus from '../components/TopMenus.jsx';
import DemoBanner from '../components/DemoBanner.jsx';
import { useDemo } from '../context/DemoContext.jsx';

const ITEMS = [
  ['/dashboard', 'Overview', LayoutGrid, true],
  ['/dashboard/machines', 'My Mining Machines', Cpu],
  ['/dashboard/deposit', 'Deposit', ArrowDownToLine],
  ['/dashboard/withdraw', 'Withdraw', ArrowUpFromLine],
  ['/dashboard/history', 'Investment History', History],
  ['/dashboard/transactions', 'Transactions', ListOrdered],
  ['/dashboard/settings', 'Account Settings', Settings],
];

export default function DashboardLayout() {
  const { session, leave } = useDemo();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  if (!session) return <Navigate to="/login" replace />;

  return (
    <>
      <DemoBanner />
      <div className="dash">
        <aside className={`side ${open ? 'is-open' : ''}`}>
          <div className="side-top"><Logo light />
            <button className="nav-toggle side-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
          </div>
          <nav>
            {ITEMS.map(([to, label, Icon, end]) => (
              <NavLink key={to} to={to} end={end}><Icon size={18} />{label}</NavLink>
            ))}
            <button onClick={() => { leave(); nav('/'); }}><LogOut size={18} />Logout</button>
          </nav>
        </aside>
        {open && <div className="scrim" onClick={() => setOpen(false)} />}
        <div className="dash-main">
          <div className="dash-bar">
            <button className="nav-toggle side-open" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
            <span className="bar-title">Demo account</span>
            <TopMenus />
          </div>
          <div className="dash-body"><Outlet /></div>
        </div>
      </div>
    </>
  );
}
