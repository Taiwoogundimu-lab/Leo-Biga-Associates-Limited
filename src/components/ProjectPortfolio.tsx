import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
  MapPin,
  PauseCircle,
  Search,
  X,
} from 'lucide-react';
import { PROJECTS, ProjectItem, ProjectStatus } from '../data/projects';
import heroImg from '../assets/images/hero_modern_architecture_1794682084561.jpg';
import commercialImg from '../assets/images/commercial_institutional_architecture_1794682083345.jpg';
import residentialImg from '../assets/images/residential_interior_architecture_1794682084505.jpg';
import planningImg from '../assets/images/architectural_planning_studio_1794682084858.jpg';

const FILTER_OPTIONS = [
  'All Projects',
  'Architecture and Design',
  'Commercial',
  'Residential',
  'Healthcare',
  'Institutional',
  'International Projects',
] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

const IMAGE_MAP: Record<ProjectItem['imageKey'], string> = {
  hero: heroImg,
  commercial: commercialImg,
  residential: residentialImg,
  planning: planningImg,
};

function StatusIndicator({ status }: { status: ProjectStatus }) {
  if (status === 'Completed') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 whitespace-nowrap">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
        <span>Completed</span>
      </span>
    );
  }
  if (status === 'In Progress') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 whitespace-nowrap">
        <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" aria-hidden="true" />
        <span>In Progress</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 whitespace-nowrap">
      <PauseCircle className="w-3.5 h-3.5 text-neutral-500 shrink-0" aria-hidden="true" />
      <span>On Hold</span>
    </span>
  );
}

function formatProjectValue(project: ProjectItem): string {
  if (project.currency === 'Not stated' || project.value === 'Not stated') {
    return 'Not stated';
  }
  return `${project.currency} ${project.value}`;
}

interface ProjectPortfolioProps {
  previewCount?: number;
}

export function ProjectPortfolio({ previewCount }: ProjectPortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Projects');
  const [statusFilter, setStatusFilter] = useState<'All' | ProjectStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      if (activeFilter === 'International Projects') {
        if (project.region !== 'International') return false;
      } else if (activeFilter !== 'All Projects') {
        if (!project.categories.includes(activeFilter)) return false;
      }

      if (statusFilter !== 'All' && project.status !== statusFilter) {
        return false;
      }

      if (query) {
        const haystack = `${project.name} ${project.location} ${project.role} ${project.region}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [activeFilter, statusFilter, searchQuery]);

  const visibleProjects = previewCount
    ? filteredProjects.slice(0, previewCount)
    : filteredProjects;

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section className="bg-[#F5F2EA] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Toolbar */}
        {!previewCount && (
          <div className="bg-white border border-[#123D35]/15 p-4 sm:p-6 mb-8 sm:mb-10 space-y-4 sm:space-y-5">
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project categories">
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setActiveFilter(option)}
                    className={`min-h-[40px] px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123D35] ${
                      isActive
                        ? 'bg-[#123D35] text-[#F5F2EA]'
                        : 'bg-[#F5F2EA] text-[#202522] hover:bg-[#123D35]/10'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Search, Status Filter, View Toggle */}
            <div className="pt-4 border-t border-[#123D35]/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#202522]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by project name or location..."
                  aria-label="Search projects"
                  className="w-full pl-10 pr-4 py-2.5 text-base sm:text-sm bg-[#F5F2EA]/70 border border-[#123D35]/20 text-[#202522] placeholder:text-[#202522]/50 focus:outline-none focus:border-[#123D35]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="status-filter" className="text-xs font-semibold text-[#202522]/70 whitespace-nowrap">
                    Status:
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'All' | ProjectStatus)}
                    className="min-h-[40px] px-3 py-2 text-base sm:text-xs font-medium bg-[#F5F2EA]/70 border border-[#123D35]/20 text-[#202522] focus:outline-none focus:border-[#123D35]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>

                <div className="flex items-center border border-[#123D35]/20 bg-[#F5F2EA]/50">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="Card grid view"
                    className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#123D35] text-white'
                        : 'text-[#202522]/75 hover:text-[#123D35]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    aria-label="Project schedule ledger view"
                    className={`min-h-[40px] inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold cursor-pointer ${
                      viewMode === 'table'
                        ? 'bg-[#123D35] text-white'
                        : 'text-[#202522]/75 hover:text-[#123D35]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#202522]/70">
              <p className="tabular-nums">
                Showing <span className="font-semibold text-[#123D35]">{filteredProjects.length}</span> of{' '}
                <span className="font-semibold text-[#123D35]">{PROJECTS.length}</span> documented commissions
              </p>
              <p>
                Project Roles preserved as recorded: <span className="font-mono font-medium text-[#123D35]">D</span> ·{' '}
                <span className="font-mono font-medium text-[#123D35]">D CM</span>
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {visibleProjects.length === 0 ? (
          <div className="bg-white border border-[#123D35]/15 p-12 text-center">
            <p className="font-display text-xl text-[#123D35]">No matching projects found</p>
            <p className="mt-2 text-sm text-[#202522]/70">
              Try clearing your search term or switching back to All Projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All Projects');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="mt-5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#123D35] text-white hover:bg-[#0B2822] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'table' && !previewCount ? (
          /* Schedule / Ledger View: Responsive Mobile Cards + Desktop Table */
          <div>
            {/* Mobile Stacked Schedule List */}
            <div className="md:hidden space-y-3">
              {visibleProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-left bg-white border border-[#123D35]/15 p-4 space-y-2.5 hover:border-[#C5A46D] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <StatusIndicator status={project.status} />
                    <span className="font-mono text-xs font-semibold text-[#123D35] tabular-nums">
                      {formatProjectValue(project)}
                    </span>
                  </div>
                  <p className="font-display text-base font-semibold text-[#123D35] leading-snug">
                    {project.name}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#202522]/75 pt-2 border-t border-[#123D35]/10">
                    <span>{project.location}</span>
                    <span className="font-mono font-medium text-[#123D35]">
                      {project.region} · Role: {project.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop Schedule Table */}
            <div className="hidden md:block bg-white border border-[#123D35]/15 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#123D35] text-[#F5F2EA] text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-5 font-semibold">Project</th>
                    <th className="py-3.5 px-4 font-semibold">Location</th>
                    <th className="py-3.5 px-4 font-semibold">Region</th>
                    <th className="py-3.5 px-4 font-semibold">Role</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-5 font-semibold text-right">Project Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#123D35]/10 text-sm">
                  {visibleProjects.map((project) => (
                    <tr
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="hover:bg-[#F5F2EA]/70 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5 font-medium text-[#123D35]">{project.name}</td>
                      <td className="py-3.5 px-4 text-[#202522]/80">{project.location}</td>
                      <td className="py-3.5 px-4 text-[#202522]/75">{project.region}</td>
                      <td className="py-3.5 px-4 font-mono text-xs font-medium text-[#123D35]">
                        {project.role}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusIndicator status={project.status} />
                      </td>
                      <td className="py-3.5 px-5 text-right font-mono text-xs font-medium text-[#202522] tabular-nums">
                        {formatProjectValue(project)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Architectural Card Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-white border border-[#123D35]/15 hover:border-[#C5A46D] transition-colors flex flex-col cursor-pointer group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#123D35]/10 relative">
                  <img
                    src={project.imageUrl || IMAGE_MAP[project.imageKey]}
                    alt={`${project.name} architectural project visual`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B2822]/75 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-[#F5F2EA]">
                    <span>{project.region === 'International' ? 'International' : 'Nigeria'}</span>
                    <span className="font-mono">Role: {project.role}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#202522]/70 mb-2">
                      <StatusIndicator status={project.status} />
                      <span className="font-mono tabular-nums font-medium text-[#123D35]">
                        {formatProjectValue(project)}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-[#123D35] leading-snug group-hover:text-[#0B2822]">
                      {project.name}
                    </h3>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-[#202522]/75">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
                      <span>{project.location}</span>
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#123D35]/10 flex items-center justify-between text-xs text-[#202522]/65">
                    <span>{project.categories.filter((c) => c !== 'Architecture and Design').join(' · ') || 'Architecture and Design'}</span>
                    <span className="font-semibold text-[#123D35]">Details</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#0B2822]/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-[#C5A46D]/40 max-w-xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] w-full relative bg-[#123D35]/10">
              <img
                src={selectedProject.imageUrl || IMAGE_MAP[selectedProject.imageKey]}
                alt={selectedProject.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-3 right-3 w-11 h-11 bg-[#123D35] text-white flex items-center justify-center hover:bg-[#0B2822] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C5A46D]">
                  {selectedProject.region} Commission
                </span>
                <StatusIndicator status={selectedProject.status} />
              </div>

              <h3 id="project-modal-title" className="font-display text-xl sm:text-2xl font-semibold text-[#123D35]">
                {selectedProject.name}
              </h3>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[#123D35]/15 text-sm">
                <div>
                  <dt className="text-xs text-[#202522]/60 uppercase tracking-wider">Location</dt>
                  <dd className="mt-1 font-medium text-[#202522]">{selectedProject.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#202522]/60 uppercase tracking-wider">Recorded Role</dt>
                  <dd className="mt-1 font-mono font-semibold text-[#123D35]">{selectedProject.role}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#202522]/60 uppercase tracking-wider">Project Value</dt>
                  <dd className="mt-1 font-mono font-semibold text-[#123D35] tabular-nums">
                    {formatProjectValue(selectedProject)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#202522]/60 uppercase tracking-wider">Sectors</dt>
                  <dd className="mt-1 text-[#202522]">{selectedProject.categories.join(' · ')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
