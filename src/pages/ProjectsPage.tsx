import { PageHeader } from '../components/PageHeader';
import { ProjectPortfolio } from '../components/ProjectPortfolio';

export function ProjectsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Portfolio Record"
        title="Our Projects Portfolio"
        subtitle="Documented commissions across Nigeria and West Africa spanning commercial banking halls, institutional university campuses, healthcare facilities, and private residences."
      />
      <ProjectPortfolio />
    </div>
  );
}
