import { PageHeader } from '../components/PageHeader';
import { AboutSection } from '../components/AboutSection';

export function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About Leo Biga Associates Limited"
        title="Integrity, Disciplined Development & Technical Excellence"
        subtitle="Founded in 1993 and restructured in 1999 under Architect Muyiwa Ige, FNIA, LBA delivers integrated architectural, planning, and project management services."
      />
      <AboutSection mode="full" />
    </div>
  );
}
