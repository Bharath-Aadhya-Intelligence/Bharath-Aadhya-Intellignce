import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 sm:pt-32 pb-20 overflow-hidden hero-gradient-vibrant">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-overlay-white opacity-20" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto text-center">
        {/* Animated Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-8 backdrop-blur-sm">
          <Sparkles size={14} className="animate-pulse" />
          The Home for Innovation
        </div>

        {/* Hero Title */}
        <h1
          className="animate-fade-up text-4xl sm:text-5xl md:text-8xl font-display font-black tracking-tight text-white leading-[1.05] max-w-5xl mx-auto mb-8"
          style={{ animationDelay: "0.1s" }}
        >
          BUILDING INDIA&apos;S <br />
          <span className="italic relative">AI FUTURE</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fade-up text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Developing the nation&apos;s <span className="text-white font-bold italic">First Independent LLM</span> while delivering elite <span className="text-white font-bold italic">Mobile App</span> and <span className="text-white font-bold italic">Web Engineering</span> services for global visionaries.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-white text-accent-indigo rounded-xl font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95 group"
          >
            Hire our Dev Team
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#services"
            className="w-full sm:w-auto px-10 py-5 border-2 border-white/30 text-white rounded-xl font-black text-sm tracking-tight hover:bg-white/10 backdrop-blur-sm transition-all text-center"
          >
            Explore AI Research
          </Link>
        </div>
      </div>

      {/* Wave/Fade Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
