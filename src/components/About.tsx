"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Layers, Cpu, Clock } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Layers,
    title: "System Design & Architecture",
    desc: "Every build starts with solid system design, database schema planning, and clean API boundaries to prevent technical debt.",
  },
  {
    icon: ShieldCheck,
    title: "Full IP Ownership & Privacy",
    desc: "100% intellectual property transfer upon delivery. We operate under strict mutual NDAs and adhere to OWASP security practices.",
  },
  {
    icon: Cpu,
    title: "Modern Engineering Stacks",
    desc: "We build with proven modern technologies (Next.js, TypeScript, React Native, Python, AWS) so your team can maintain the code easily.",
  },
  {
    icon: Clock,
    title: "Post-Launch SLA & Support",
    desc: "Ongoing maintenance, automated monitoring, backups, and guaranteed SLA response times to keep systems running smoothly.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    detail: "Requirements scoping, architecture roadmap, and realistic timeline estimates.",
  },
  {
    step: "02",
    title: "Agile Development",
    detail: "Regular sprint demos, working staging environments, and transparent updates.",
  },
  {
    step: "03",
    title: "Testing & QA",
    detail: "Automated unit tests, cross-device validation, and code review prior to release.",
  },
  {
    step: "04",
    title: "Deployment & Handover",
    detail: "Production launch, CI/CD pipeline setup, and thorough documentation handover.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cream-badge text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Why BAI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-3">
            Engineering Principles We Stand By
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            How we approach building reliable software for our enterprise clients.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-slate-200/90 bg-white/80 hover:bg-white hover:border-brand-blue/40 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-teal-light text-brand-navy flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Delivery Process Workflow Banner */}
        <div className="rounded-2xl color-fade-dark text-white p-8 sm:p-10 shadow-xl border border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-white/10 gap-4">
            <div>
              <span className="text-brand-teal text-[11px] font-bold uppercase tracking-widest block mb-1">
                Process
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                How We Deliver
              </h3>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-sky hover:text-white transition-colors"
            >
              <span>Get in touch</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-xs font-bold text-brand-teal mb-1">
                  Step {step.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
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
    </section>
  );
}
