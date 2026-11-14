import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ARCHITECTURAL_EASE } from './components/MotionPrimitives';
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
      const timer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 240);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2, ease: ARCHITECTURAL_EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollAndTitleManager />
        <div className="min-h-screen flex flex-col bg-[#F5F2EA] text-[#202522]">
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
