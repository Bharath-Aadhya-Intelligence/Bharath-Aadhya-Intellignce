import { Building2, Code2, Rocket, Cpu } from "lucide-react";

const stats = [
  { label: "Dev Projects", value: "100+", icon: Code2 },
  { label: "AI Tokens", value: "5M+", icon: Cpu },
  { label: "Products Launched", value: "25+", icon: Rocket },
  { label: "Global Partners", value: "45+", icon: Building2 },
];

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="container relative z-10 mx-auto px-6">
        {/* Main Stats Block */}
        <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-accent-indigo p-4 sm:p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight uppercase">
              ENGINEERING THE FUTURE
            </h2>
            <p className="text-lg sm:text-xl text-white/80 font-medium leading-relaxed">
              We are on a mission to build the technology backbone of a Smarter India, from foundational AI models to world-class software solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-8 relative z-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex p-4 rounded-2xl bg-white/10 text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm font-black text-white/60 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
