import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectPortfolio } from '../components/ProjectPortfolio';
import { ClientsSection } from '../components/ClientsSection';
import { COMPANY_INFO } from '../data/company';

export function HomePage() {
  return (
    <div>
      <Hero />

      <AboutSection mode="preview" />

      <ServicesSection mode="preview" />

      {/* Selected Projects Preview */}
      <section className="bg-[#F5F2EA] pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
              Selected Commissions
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight [text-wrap:balance]">
              Nigeria &amp; International Project Portfolio
            </h2>
            <p className="mt-3 text-base text-[#202522]/80 leading-relaxed">
              A track record across commercial developments, institutional campuses, healthcare
              facilities, and private residences in Nigeria and Ghana.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#123D35] border-b border-[#C5A46D] pb-1 hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0"
          >
            Explore All 41 Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProjectPortfolio previewCount={6} />
      </section>

      {/* Clients Preview */}
      <section className="bg-white pt-16 lg:pt-20 border-t border-[#123D35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
              Institutional &amp; Corporate Trust
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight">
              Our Clients
            </h2>
          </div>
          <Link
            to="/clients"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#123D35] border-b border-[#C5A46D] pb-1 hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0"
          >
            View All 21 Organisations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ClientsSection compact />
      </section>

      {/* Contact Managing Partner CTA Band */}
      <section className="bg-[#0B2822] text-[#F5F2EA] py-12 sm:py-16 lg:py-20 border-t border-[#C5A46D]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase">
              Contact the Managing Partner
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-semibold text-white leading-tight [text-wrap:balance]">
              Discuss Your Upcoming Development or Architectural Commission
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#F5F2EA]/80 leading-relaxed">
              Reach Architect Muyiwa Ige, FNIA and our multidisciplinary team in Old Bodija, Ibadan,
              or submit a consultation brief online.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
            <Link
              to="/contact#consultation"
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase bg-[#C5A46D] text-[#123D35] hover:bg-[#D9C298] transition-colors whitespace-nowrap"
            >
              Request a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase border border-[#F5F2EA]/40 text-[#F5F2EA] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
