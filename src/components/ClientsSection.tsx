import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { CLIENTS, ClientItem } from '../data/clients';

const SECTORS: Array<'All' | ClientItem['sector']> = [
  'All',
  'Banking & Finance',
  'Government & Public Sector',
  'Academic & Healthcare',
  'Corporate & International',
];

export function ClientsSection({ compact = false }: { compact?: boolean }) {
  const [sector, setSector] = useState<'All' | ClientItem['sector']>('All');

  const displayed = compact
    ? CLIENTS.slice(0, 9)
    : sector === 'All'
      ? CLIENTS
      : CLIENTS.filter((c) => c.sector === sector);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!compact && (
          <div className="flex flex-wrap items-center gap-2 pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-[#123D35]/15">
            {SECTORS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={`min-h-[40px] px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  sector === s
                    ? 'bg-[#123D35] text-[#F5F2EA]'
                    : 'bg-[#F5F2EA] text-[#202522] hover:bg-[#123D35]/10'
                }`}
              >
                {s === 'All' ? `All Organisations (${CLIENTS.length})` : s}
              </button>
            ))}
          </div>
        )}

        {/* Typographic Client Wall (Zero fake logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((client) => (
            <div
              key={client.id}
              className="bg-[#F5F2EA]/75 border border-[#123D35]/15 p-6 flex flex-col justify-between hover:border-[#C5A46D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-medium tracking-[0.12em] text-[#C5A46D] uppercase">
                  <span>{client.sector}</span>
                  <span className="font-mono text-[#123D35]/50 tabular-nums">
                    {String(client.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-[#123D35] leading-snug">
                  {client.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Private & Discerning Individuals Statement */}
        <div className="mt-10 sm:mt-12 bg-[#123D35] text-[#F5F2EA] p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <Building2 className="w-6 h-6 text-[#C5A46D] shrink-0 mt-1" />
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A46D] uppercase">
                Private Commissions
              </p>
              <p className="mt-2 font-display text-xl sm:text-2xl text-white leading-snug">
                Beyond institutional and corporate mandates, LBA has served discerning individuals
                for whom it has designed and constructed residential and commercial projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
