import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DemoBanner from '../components/DemoBanner.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <DemoBanner />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
