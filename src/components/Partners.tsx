"use client";

import { motion } from "framer-motion";

const trustMetrics = [
  {
    number: "01",
    title: "Enterprise Quality & Security",
    desc: "Rigorous code reviews, automated unit testing, and secure development lifecycles.",
  },
  {
    number: "02",
    title: "Agile Sprint Delivery",
    desc: "Bi-weekly sprint demos, transparent kanban boards, and measurable milestones.",
  },
  {
    number: "03",
    title: "Dedicated Engineering Pods",
    desc: "Senior tech leads and developers aligned directly with your business goals.",
  },
  {
    number: "04",
    title: "Full Intellectual Property",
    desc: "100% codebase, design assets, and architecture documentation transferred to you.",
  },
];

const partners = [
  {
    name: "GTTC",
    fullName: "Government Tool Room and Training Centre",
    type: "Technical Institute Partner",
    animationClass: "float-partner-1",
  },
  {
    name: "ATS",
    fullName: "ATS Global Technologies",
    type: "Enterprise Engineering",
    animationClass: "float-partner-2",
  },
  {
    name: "SPS",
    fullName: "Siliguri Public School",
    type: "Institutional Technology",
    animationClass: "float-partner-3",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-16 bg-transparent relative overflow-hidden">
      {/* Subtle Glow Highlights */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-cream/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-navy block mb-2">
            Trusted Strategic Collaborators
          </span>
          <p className="text-sm text-slate-600">
            Delivering robust digital infrastructure and software services across technical institutes and enterprises.
          </p>
        </div>

        {/* Floating Semi-Transparent Glass Partner Containers */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              viewport={{ once: true }}
              className={`transparent-floating-card ${partner.animationClass} rounded-2xl px-7 py-5 flex items-center gap-4.5 cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-blue text-white font-extrabold text-sm flex items-center justify-center shadow-md border border-white/30 shrink-0">
                {partner.name}
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold text-brand-navy group-hover:text-brand-blue transition-colors">
                  {partner.fullName}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">
                  {partner.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Value Guarantees with Bordered Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {trustMetrics.map((metric) => (
            <div
              key={metric.title}
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-sm border border-slate-200/90 hover:border-brand-blue/60 hover:bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-brand-blue font-mono">
                    {metric.number} //
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/80 group-hover:scale-125 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 group-hover:text-brand-navy transition-colors">
                  {metric.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
