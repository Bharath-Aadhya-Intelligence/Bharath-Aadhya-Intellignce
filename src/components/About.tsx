"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    step: "01",
    title: "Architecture-First Engineering",
    desc: "We avoid shortcuts. Every solution begins with a solid system design, database schema planning, and API contracts that eliminate technical debt and scale effortlessly.",
  },
  {
    step: "02",
    title: "100% IP Ownership & Security",
    desc: "Complete intellectual property transfer upon project delivery. We operate under strict mutual NDAs, adhere to OWASP security guidelines, and respect data sovereignty.",
  },
  {
    step: "03",
    title: "Modern Stacks & Clean Codebase",
    desc: "We build with proven modern technologies (Next.js, TypeScript, React Native, Python, AWS/Azure) ensuring your team can maintain and extend the software easily.",
  },
  {
    step: "04",
    title: "Dedicated Post-Launch SLAs",
    desc: "Our partnership continues after go-live with proactive cloud monitoring, automated backups, performance tuning, and guaranteed SLA response times.",
  },
];

const processSteps = [
  {
    step: "PHASE 01",
    title: "Discovery & Blueprint",
    detail: "Requirements scoping, architecture roadmap, tech stack selection, and milestone estimates.",
  },
  {
    step: "PHASE 02",
    title: "Agile Development",
    detail: "Bi-weekly sprint deliverables, working staging links, and transparent kanban updates.",
  },
  {
    step: "PHASE 03",
    title: "Rigorous QA & Testing",
    detail: "End-to-end unit tests, cross-browser/device validation, and security vulnerability reviews.",
  },
  {
    step: "PHASE 04",
    title: "Deployment & Support",
    detail: "Production release, automated cloud CI/CD, documentation handover, and ongoing maintenance.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cream/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cream-badge text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Why Bharath Aadhya Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
            Engineering Excellence with Direct Business Outcomes
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We bridge the gap between business strategy and robust software execution. Here is why enterprise clients and ambitious founders choose BAI as their technology partner.
          </p>
        </div>

        {/* 4 Pillars Grid with Editorial Numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-7 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-brand-teal/40 transition-all duration-300 corporate-shadow flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-black tracking-widest text-brand-blue font-mono block mb-3">
                  PILLAR // {pillar.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-navy transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] font-semibold text-slate-500">
                Verified Enterprise Standard
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery Process Workflow Banner */}
        <div className="rounded-2xl color-fade-dark text-white p-8 sm:p-12 shadow-xl relative overflow-hidden border border-white/10">
          {/* Subtle Ambient Orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none orb-1" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none orb-2" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-brand-teal text-[11px] font-bold uppercase tracking-widest block mb-1">
                  How We Work
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Our 4-Phase Delivery Framework
                </h3>
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky hover:text-white transition-colors"
              >
                <span>Discuss your project roadmap</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step) => (
                <div key={step.step} className="relative">
                  <div className="text-xs font-black text-brand-teal font-mono tracking-wider mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-white/75 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
