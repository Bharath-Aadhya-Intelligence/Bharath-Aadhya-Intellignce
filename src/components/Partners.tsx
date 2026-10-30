const partners = [

  { name: "SPS", label: "Siligudi Public School" },
];

export default function Partners() {
  return (
    <section className="relative py-16 bg-white border-b border-border-subtle overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <div key={partner.name} className="group flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-foreground group-hover:text-accent-indigo transition-colors duration-500">
                {partner.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Grid Overlay for logic continuity */}
      <div className="absolute inset-0 grid-background opacity-[0.15] pointer-events-none" />
    </section>
  );
}
