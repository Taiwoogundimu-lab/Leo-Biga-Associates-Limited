import { PageHeader } from '../components/PageHeader';
import { ServicesSection } from '../components/ServicesSection';

export function ServicesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Capabilities & Technical Infrastructure"
        title="Our Services & Office Technology"
        subtitle="Comprehensive development consulting spanning architectural design, environmental impact assessment, construction, project financing advisory, and facilities management."
      />
      <ServicesSection mode="full" />
    </div>
  );
}
