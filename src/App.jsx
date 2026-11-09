import { Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Home from './pages/Home.jsx';
import Machines from './pages/Machines.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import About from './pages/About.jsx';
import Faq from './pages/Faq.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Upcoming from './pages/Upcoming.jsx';
import Overview from './pages/dashboard/Overview.jsx';
import Deposit from './pages/dashboard/Deposit.jsx';
import Withdraw from './pages/dashboard/Withdraw.jsx';
import MyMachines from './pages/dashboard/MyMachines.jsx';
import Transactions from './pages/dashboard/Transactions.jsx';
import History from './pages/dashboard/History.jsx';
import Settings from './pages/dashboard/Settings.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="machines" element={<Machines />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Upcoming title="Page not found" />} />
      </Route>
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="machines" element={<MyMachines />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="history" element={<History />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Upcoming title="Page not found" />} />
      </Route>
    </Routes>
  );
}
