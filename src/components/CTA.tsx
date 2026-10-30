import { ArrowRight, Calendar, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const trustItems = [
  "Expert AI Engineers",
  "Full-Stack Excellence",
  "Strategic Innovation",
];

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[3rem] bg-accent-indigo p-6 sm:p-12 md:p-24 overflow-hidden border border-accent-indigo shadow-2xl">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-white mb-6 md:mb-8 tracking-tight leading-[1.1] uppercase">
                READY TO BUILD THE FUTURE?
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-white/90 font-bold text-sm tracking-wide"
                  >
                    <CheckCircle2 size={18} className="text-white" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 w-full md:w-auto">
              <Link
                href="#contact"
                className="flex items-center justify-center gap-3 px-6 py-5 sm:px-12 sm:py-6 bg-white text-accent-indigo rounded-2xl font-black text-lg tracking-tight hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all active:scale-95 group shadow-xl"
              >
                <Calendar size={24} />
                Start Your Project
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                className="flex items-center justify-center gap-3 px-6 py-5 sm:px-12 sm:py-6 border-2 border-white/30 text-white rounded-2xl font-black text-lg tracking-tight hover:bg-white/10 transition-all text-center"
              >
                <FileText size={24} />
                Explore AI Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
