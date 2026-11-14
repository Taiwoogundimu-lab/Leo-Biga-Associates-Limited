import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/team';

const DEPARTMENTS: Array<'All' | TeamMember['department']> = [
  'All',
  'Leadership',
  'Technical & Design',
  'Finance & Advisory',
];

export function TeamProfiles() {
  const [department, setDepartment] = useState<'All' | TeamMember['department']>('All');

  const filtered =
    department === 'All'
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((member) => member.department === department);

  return (
    <section className="bg-[#F5F2EA] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-[#123D35]/15">
          <div className="flex flex-wrap items-center gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartment(dept)}
                className={`min-h-[40px] px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  department === dept
                    ? 'bg-[#123D35] text-[#F5F2EA]'
                    : 'bg-white text-[#202522] border border-[#123D35]/15 hover:border-[#C5A46D]'
                }`}
              >
                {dept === 'All' ? `All Personnel (${TEAM_MEMBERS.length})` : dept}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#202522]/70">
            Key Officers and Multidisciplinary Professional Staff
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((member) => (
            <article
              key={member.id}
              className="bg-white border border-[#123D35]/15 flex flex-col justify-between"
            >
              <div>
                {/* Portrait or Neutral Architectural Initials Placeholder */}
                <div className="bg-[#123D35] px-5 py-6 sm:px-6 sm:py-8 flex items-center gap-4 sm:gap-5 border-b border-[#C5A46D]/30">
                  {member.photoUrl ? (
                    <div className="w-16 h-16 shrink-0 border border-[#C5A46D] bg-white overflow-hidden">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-top ${
                          member.id === 1 ? 'scale-110' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-16 h-16 shrink-0 border border-[#C5A46D] bg-[#0B2822] flex items-center justify-center"
                      aria-label={`Portrait placeholder for ${member.name}`}
                    >
                      <span className="font-display text-xl font-semibold tracking-wider text-[#F5F2EA]">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-[#C5A46D] uppercase">
                      {member.department}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-white leading-snug">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#F5F2EA]/80 font-medium">
                      {member.designation}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Qualifications */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#123D35] uppercase mb-2.5">
                      <GraduationCap className="w-4 h-4 text-[#C5A46D]" />
                      <span>Qualifications</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#202522]/85 leading-relaxed">
                      {member.qualifications.map((qual) => (
                        <li key={qual} className="flex items-start gap-2">
                          <span className="text-[#C5A46D] font-bold" aria-hidden="true">
                            ·
                          </span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Biography */}
                  <div className="pt-4 border-t border-[#123D35]/10">
                    <p className="text-sm text-[#202522]/85 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
