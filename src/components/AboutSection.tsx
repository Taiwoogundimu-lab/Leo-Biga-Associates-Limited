import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY_INFO, CORE_COMPETENCIES, HOMEPAGE_HIGHLIGHTS } from '../data/company';
import planningImg from '../assets/images/architectural_planning_studio_1794682084858.jpg';
import commercialImg from '../assets/images/commercial_institutional_architecture_1794682083345.jpg';

interface AboutSectionProps {
  mode?: 'preview' | 'full';
}

export function AboutSection({ mode = 'full' }: AboutSectionProps) {
  if (mode === 'preview') {
    return (
      <section className="bg-[#F5F2EA] py-12 sm:py-16 lg:py-24 border-b border-[#123D35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2-Column Intro Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#123D35] uppercase mb-3">
                Practice Profile
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight [text-wrap:balance]">
                Multidisciplinary Development Consultancy Since 1993
              </h2>

              <div className="mt-6 space-y-4 text-[15px] sm:text-base text-[#202522]/85 leading-relaxed max-w-2xl">
                <p>
                  Leo Biga Associates Limited (LBA) is a multidisciplinary development firm
                  specialising in Development Planning, Architecture, Interior Design, Environmental
                  Design, Facilities Management and Project Management with Construction.
                </p>
                <p>
                  The company prides itself on serving clients with integrity, utilising appropriate
                  technology and resources to achieve excellent cost management and timely project
                  delivery.
                </p>
                <p>
                  Founded in 1993, the firm&apos;s management was restructured in 1999 under the
                  leadership of Architect Muyiwa Ige, FNIA.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-wider uppercase bg-[#123D35] text-[#F5F2EA] hover:bg-[#0B2822] transition-colors whitespace-nowrap"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 text-[#C5A46D]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[220px] sm:min-h-[280px] bg-white border border-[#123D35]/15 p-2">
                <img
                  src={planningImg}
                  alt="Architectural drafting table with site masterplans and timber scale model"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-Column Highlights Strip */}
          <div className="mt-14 pt-10 border-t border-[#123D35]/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOMEPAGE_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="bg-white border border-[#123D35]/12 p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold tracking-[0.14em] text-[#C5A46D] uppercase">
                    {item.label}
                  </p>
                  <p className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#123D35] leading-snug tabular-nums">
                    {item.value}
                  </p>
                </div>
                <p className="mt-3 text-xs text-[#202522]/70 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#F5F2EA]">
      {/* Company Overview */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-[#123D35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
                Company Overview
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight [text-wrap:balance]">
                Serving Corporate, Public &amp; International Clients Since 1993
              </h2>

              <div className="mt-6 space-y-4 text-base text-[#202522]/85 leading-relaxed">
                <p>
                  Leo Biga Associates Limited (LBA) is a multidisciplinary development consultancy
                  specialising in development planning, architecture, interior design, environmental
                  design, facilities management and project management with construction.
                </p>
                <p>
                  The company prides itself on serving clients with integrity and utilising
                  appropriate technology and resources to achieve excellent cost management and
                  timely project delivery.
                </p>
                <p>
                  LBA was founded in 1993, and its management was restructured in 1999 under the
                  leadership of Architect Muyiwa Ige, FNIA.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[300px] bg-white border border-[#123D35]/15 p-2">
                <img
                  src={commercialImg}
                  alt="Modern institutional and corporate architectural facade"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision & Core Competence */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-[#123D35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Vision */}
          <div className="lg:col-span-5 bg-[#123D35] text-[#F5F2EA] p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase">
                Our Vision
              </p>
              <blockquote className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
                &ldquo;{COMPANY_INFO.vision}&rdquo;
              </blockquote>
            </div>
            <p className="mt-8 pt-6 border-t border-white/15 text-xs tracking-[0.14em] text-[#D9C298] uppercase">
              {COMPANY_INFO.motto}
            </p>
          </div>

          {/* Core Competence */}
          <div className="lg:col-span-7 bg-[#F5F2EA] border border-[#123D35]/15 p-6 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase">
              Our Core Competence
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#123D35]">
              The core competence of the firm is DEVELOPMENT.
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#202522]/80">
              This involves professional service expertise across five integrated pillars:
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CORE_COMPETENCIES.map((item) => (
                <li
                  key={item}
                  className="bg-white border border-[#123D35]/10 px-4 py-3.5 flex items-center gap-3 text-sm font-medium text-[#123D35]"
                >
                  <Check className="w-4 h-4 text-[#C5A46D] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 lg:py-20 bg-[#F5F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="h-full min-h-[280px] bg-white border border-[#123D35]/15 p-2">
                <img
                  src={planningImg}
                  alt="Site plan documentation and architectural scale model"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
                Methodology
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight">
                Our Approach
              </h2>

              <div className="mt-6 space-y-4 text-base text-[#202522]/85 leading-relaxed">
                <p>
                  LBA has development capabilities and experience similar to those of a full-service
                  development organisation. These capabilities are based on a disciplined approach
                  involving planning, design, construction, project management and securing project
                  funding.
                </p>
                <p>
                  The firm also undertakes documentation of existing site conditions and
                  implementation planning so that every design decision is anchored in physical and
                  economic reality.
                </p>
                <p>
                  An extensive network of international and local associates has been established to
                  ensure the application of specialist knowledge and support on projects. LBA has
                  also collaborated with various firms on large-scale development projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
