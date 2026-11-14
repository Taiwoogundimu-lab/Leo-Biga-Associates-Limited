import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { ARCHITECTURAL_EASE } from './MotionPrimitives';

export function Hero() {
  return (
    <section className="relative bg-[#123D35] text-white overflow-hidden">
      {/* Architectural Backdrop with Measured Contrast Scrim */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0.88 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: ARCHITECTURAL_EASE }}
          src="/assets/hero-bg.jpg"
          alt="Centre for Innovation and Entrepreneurship architectural development"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[#0B2822]/78 sm:bg-transparent sm:bg-gradient-to-r sm:from-[#0B2822]/92 sm:via-[#123D35]/78 sm:to-[#123D35]/45"
          aria-hidden="true"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 lg:py-36">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: ARCHITECTURAL_EASE }}
            className="text-[11px] sm:text-sm font-semibold tracking-[0.14em] sm:tracking-[0.22em] text-[#C5A46D] uppercase mb-3 sm:mb-4"
          >
            {COMPANY_INFO.motto}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: ARCHITECTURAL_EASE }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1] [text-wrap:balance]"
          >
            LEO BIGA ASSOCIATES LIMITED
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: ARCHITECTURAL_EASE }}
            className="mt-3 sm:mt-4 text-xs sm:text-base font-medium tracking-[0.08em] sm:tracking-[0.16em] text-[#F5F2EA]/90 uppercase leading-relaxed"
          >
            {COMPANY_INFO.descriptor}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.28, ease: ARCHITECTURAL_EASE }}
            className="mt-5 sm:mt-6 font-display italic text-lg sm:text-2xl text-[#D9C298] leading-relaxed max-w-2xl"
          >
            &ldquo;{COMPANY_INFO.tagline}&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.36, ease: ARCHITECTURAL_EASE }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Link
              to="/projects"
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#C5A46D] text-[#123D35] hover:bg-[#D9C298] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Our Projects
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-[#C5A46D] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D]"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
