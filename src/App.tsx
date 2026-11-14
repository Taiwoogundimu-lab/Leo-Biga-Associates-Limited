import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TeamPage } from './pages/TeamPage';
import { ClientsPage } from './pages/ClientsPage';
import { ContactPage } from './pages/ContactPage';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Leo Biga Associates Limited (LBA) – Architects & Development Consultants',
  '/about': 'About Us | Leo Biga Associates Limited (LBA)',
  '/services': 'Our Services & Technology | Leo Biga Associates Limited (LBA)',
  '/projects': 'Our Projects Portfolio | Leo Biga Associates Limited (LBA)',
  '/team': 'Our Team | Leo Biga Associates Limited (LBA)',
  '/clients': 'Our Clients | Leo Biga Associates Limited (LBA)',
  '/contact': 'Contact Us | Leo Biga Associates Limited (LBA)',
};

function ScrollAndTitleManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title =
      ROUTE_TITLES[pathname] ||
      'Leo Biga Associates Limited (LBA) – International Development Consulting';

    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollAndTitleManager />
      <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#202522]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
