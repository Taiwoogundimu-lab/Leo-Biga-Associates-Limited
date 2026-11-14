import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST } from '../data/services';
import { TECHNOLOGY_STACK } from '../data/company';

interface ServicesSectionProps {
  mode?: 'preview' | 'full';
}

export function ServicesSection({ mode = 'full' }: ServicesSectionProps) {
  const displayedServices = mode === 'preview' ? SERVICES_LIST.slice(0, 4) : SERVICES_LIST;

  return (
    <div className="bg-white">
      <section className="py-12 sm:py-16 lg:py-24 border-b border-[#123D35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
                Multidisciplinary Practice
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#123D35] leading-tight [text-wrap:balance]">
                Our Services
              </h2>
              <p className="mt-3 text-base text-[#202522]/80 leading-relaxed">
                End-to-end architectural, development planning, construction, and facilities
                management expertise tailored to institutional, commercial, and private commissions.
              </p>
            </div>

            {mode === 'preview' && (
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#123D35] border-b border-[#C5A46D] pb-1 hover:text-[#C5A46D] transition-colors whitespace-nowrap shrink-0"
              >
                View All 8 Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedServices.map((service) => (
              <article
                key={service.number}
                className="bg-[#F5F2EA] border border-[#123D35]/12 flex flex-col overflow-hidden"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#123D35]/10">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 sm:p-8 flex-1 flex flex-col">
                  <p className="font-mono text-xs font-medium tracking-widest text-[#C5A46D]">
                    {service.number}.
                  </p>
                  <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-[#123D35]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#202522]/80 leading-relaxed">
                    {service.summary}
                  </p>

                  <ul className="mt-5 pt-5 border-t border-[#123D35]/10 space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#202522]/90">
                        <Check className="w-4 h-4 text-[#123D35] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {mode === 'full' && (
        <section className="py-12 sm:py-16 lg:py-24 bg-[#123D35] text-[#F5F2EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A46D] uppercase mb-3">
                Office Production Infrastructure
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight [text-wrap:balance]">
                Our Capabilities and Technology
              </h2>
              <p className="mt-4 text-base text-[#F5F2EA]/85 leading-relaxed">
                LBA employs advanced technology as an integral part of its office environment. These
                applications ensure that projects obtain maximum benefit from the skills of each
                staff member. This computer support forms the basis of the office production
                infrastructure and is applied to each project as required.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TECHNOLOGY_STACK.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-[#0B2822] border border-[#C5A46D]/25 p-6 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] text-[#C5A46D] uppercase">
                      {tool.category}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {tool.name}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#F5F2EA]/75 leading-relaxed">
                      {tool.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
