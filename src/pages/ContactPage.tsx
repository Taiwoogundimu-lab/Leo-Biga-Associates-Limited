import { Mail, MapPin, MessageCircle, Phone, UserCheck } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { ContactForm } from '../components/ContactForm';
import { LBALogo } from '../components/LBALogo';
import { COMPANY_INFO } from '../data/company';

export function ContactPage() {
  return (
    <div className="bg-[#F5F2EA]">
      <PageHeader
        eyebrow="Consultations & Inquiries"
        title="Contact Us"
        subtitle="Connect directly with Leo Biga Associates Limited in Ibadan, Nigeria, or submit an enquiry to the Managing Partner."
      />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Managing Partner & Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* CONTACT THE MANAGING PARTNER Highlight */}
            <div className="bg-[#123D35] text-[#F5F2EA] p-5 sm:p-8 border border-[#C5A46D]/30">
              <div className="flex items-center justify-between gap-4 mb-5">
                <LBALogo variant="dark" size="sm" />
                <UserCheck className="w-5 h-5 text-[#C5A46D]" aria-hidden="true" />
              </div>

              <div className="flex items-center gap-4 mt-1">
                <div className="w-16 h-16 shrink-0 border border-[#C5A46D] bg-[#0B2822] overflow-hidden">
                  <img
                    src="/assets/managing-partner.jpg"
                    alt={COMPANY_INFO.leader}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-[#C5A46D] uppercase">
                    Contact the Managing Partner
                  </p>
                  <h2 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-white leading-snug">
                    {COMPANY_INFO.leader}
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#F5F2EA]/80 leading-relaxed">
                For new project briefs, institutional tenders, development feasibility studies, and
                international partnership enquiries, message the Managing Partner directly using the
                form or via the channels below.
              </p>

              <div className="mt-6 pt-6 border-t border-white/15">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] inline-flex items-center justify-center gap-2.5 px-4 py-3.5 text-xs font-semibold tracking-wider uppercase bg-[#C5A46D] text-[#123D35] hover:bg-[#D9C298] transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp (+234 8026043299)</span>
                </a>
              </div>
            </div>

            {/* Office Contact Card */}
            <div className="bg-white border border-[#123D35]/15 p-5 sm:p-8 space-y-6">
              <h3 className="font-display text-xl font-semibold text-[#123D35] border-b border-[#123D35]/10 pb-3">
                Office Contact Details
              </h3>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#123D35]">
                    Office Address
                  </p>
                  <address className="mt-1 not-italic text-sm text-[#202522]/85 leading-relaxed">
                    {COMPANY_INFO.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#123D35]">
                    Mobile / Telephone
                  </p>
                  <a
                    href={COMPANY_INFO.phoneHref}
                    className="mt-1 inline-flex items-center min-h-[36px] text-sm font-medium text-[#202522] hover:text-[#123D35] tabular-nums"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#C5A46D] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#123D35]">
                    Email Addresses
                  </p>
                  <div className="mt-1 flex flex-col gap-1.5 text-sm">
                    <a
                      href={`mailto:${COMPANY_INFO.primaryEmail}`}
                      className="font-medium text-[#123D35] hover:underline break-all"
                    >
                      {COMPANY_INFO.primaryEmail}{' '}
                      <span className="text-xs text-[#202522]/60 font-normal">(Primary)</span>
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.secondaryEmail}`}
                      className="font-medium text-[#123D35] hover:underline break-all"
                    >
                      {COMPANY_INFO.secondaryEmail}{' '}
                      <span className="text-xs text-[#202522]/60 font-normal">(Secondary)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
