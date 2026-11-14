import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { LBALogo } from './LBALogo';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Services', to: '/services' },
  { label: 'Our Projects', to: '/projects' },
  { label: 'Our Team', to: '/team' },
  { label: 'Our Clients', to: '/clients' },
  { label: 'Contact Us', to: '/contact' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#F5F2EA]/95 backdrop-blur-md border-b border-[#123D35]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4 lg:gap-8">
        {/* Zone 1: Official LBA Logo */}
        <Link
          to="/"
          aria-label="Leo Biga Associates Limited Home"
          className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123D35]"
        >
          <LBALogo variant="light" size="sm" />
        </Link>

        {/* Zone 2: Single-line Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#202522]/85"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative whitespace-nowrap shrink-0 py-1.5 transition-colors duration-150 ${
                  isActive ? 'text-[#123D35] font-semibold' : 'hover:text-[#123D35]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-underline"
                      transition={{ duration: 0.22, ease: ARCHITECTURAL_EASE }}
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[#C5A46D]"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Consultation CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact#consultation"
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#123D35] text-[#F5F2EA] border border-[#C5A46D]/60 hover:bg-[#0B2822] hover:border-[#C5A46D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
          >
            Request a Consultation
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 border border-[#123D35]/20 text-[#123D35] bg-white hover:bg-[#123D35]/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123D35]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: ARCHITECTURAL_EASE }}
            className="xl:hidden bg-[#F5F2EA] border-t border-[#123D35]/15 px-4 py-4 shadow-lg max-h-[calc(100dvh-4rem)] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `min-h-[44px] flex items-center px-3 py-2.5 text-sm font-medium border-b border-[#123D35]/10 transition-colors ${
                      isActive
                        ? 'text-[#123D35] font-semibold bg-white'
                        : 'text-[#202522] hover:bg-white/60'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact#consultation"
                className="mt-4 min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-wider uppercase bg-[#123D35] text-[#F5F2EA] border border-[#C5A46D]"
              >
                Request a Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
