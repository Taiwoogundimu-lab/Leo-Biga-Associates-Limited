interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-[#123D35] text-[#F5F2EA] py-10 sm:py-16 lg:py-20 border-b border-[#C5A46D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-[#C5A46D] uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-white leading-tight [text-wrap:balance] max-w-3xl">
          {title}
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#F5F2EA]/80 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
