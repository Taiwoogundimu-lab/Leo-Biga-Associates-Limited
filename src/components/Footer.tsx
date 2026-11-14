import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { SERVICES_LIST } from '../data/services';
import { LBALogo } from './LBALogo';

export function Footer() {
  return (
    <footer className="bg-[#123D35] text-[#F5F2EA] border-t border-[#C5A46D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <LBALogo variant="dark" size="md" />
              <div>
                <p className="font-display text-lg font-semibold text-white leading-tight">
                  {COMPANY_INFO.name}
                </p>
                <p className="text-[11px] tracking-[0.16em] text-[#C5A46D] font-medium mt-0.5">
                  {COMPANY_INFO.motto}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#F5F2EA]/80 leading-relaxed max-w-sm">
              Established in 1993, Leo Biga Associates Limited is a multidisciplinary development
              consultancy committed to serving our clients with integrity through disciplined
              planning, architectural design, and timely project delivery.
            </p>

            <p className="text-xs tracking-[0.14em] text-[#C5A46D] font-medium pt-1">
              {COMPANY_INFO.descriptor}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm text-[#F5F2EA]/80">
              <li>
                <Link to="/" className="hover:text-[#C5A46D] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A46D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C5A46D] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#C5A46D] transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-[#C5A46D] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-[#C5A46D] transition-colors">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A46D] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-base font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2.5 text-sm text-[#F5F2EA]/80">
              {SERVICES_LIST.map((service) => (
                <li key={service.number}>
                  <Link to="/services" className="hover:text-[#C5A46D] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-base font-semibold text-white mb-4">Head Office</h3>

            <div className="flex items-start gap-3 text-sm text-[#F5F2EA]/85">
              <MapPin className="w-4 h-4 text-[#C5A46D] shrink-0 mt-1" />
              <address className="not-italic leading-relaxed">
                {COMPANY_INFO.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="flex items-center gap-3 text-sm text-[#F5F2EA]/85">
              <Phone className="w-4 h-4 text-[#C5A46D] shrink-0" />
              <a
                href={COMPANY_INFO.phoneHref}
                className="hover:text-[#C5A46D] transition-colors tabular-nums"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>

            <div className="flex items-start gap-3 text-sm text-[#F5F2EA]/85">
              <Mail className="w-4 h-4 text-[#C5A46D] shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <a
                  href={`mailto:${COMPANY_INFO.primaryEmail}`}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  {COMPANY_INFO.primaryEmail}
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.secondaryEmail}`}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  {COMPANY_INFO.secondaryEmail}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase bg-[#C5A46D] text-[#123D35] hover:bg-[#D9C298] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#F5F2EA]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F2EA]/70 text-center sm:text-left">
          <p>{COMPANY_INFO.copyright}</p>
          <p className="tracking-[0.1em] sm:tracking-[0.12em] text-[#C5A46D]">{COMPANY_INFO.descriptor}</p>
        </div>
      </div>
    </footer>
  );
}
