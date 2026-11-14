import { PageHeader } from '../components/PageHeader';
import { TeamProfiles } from '../components/TeamProfiles';

export function TeamPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Leadership & Multidisciplinary Staff"
        title="Our Team"
        subtitle="Architects, legal and environmental advisers, quantity surveyors, project managers, CADD technicians, accountants, and ICT specialists."
      />
      <TeamProfiles />
    </div>
  );
}
