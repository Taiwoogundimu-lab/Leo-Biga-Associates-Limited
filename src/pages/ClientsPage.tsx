import { PageHeader } from '../components/PageHeader';
import { ClientsSection } from '../components/ClientsSection';

export function ClientsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Clientele & Institutional Partnerships"
        title="Our Clients"
        subtitle="Trusted by federal ministries, state governments, leading Nigerian banks, academic institutions, international bodies, and private clients."
      />
      <ClientsSection />
    </div>
  );
}
