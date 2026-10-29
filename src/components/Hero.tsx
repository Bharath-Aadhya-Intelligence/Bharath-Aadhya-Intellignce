"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Smartphone, Cloud, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    icon: Globe,
    title: "Web Engineering",
    desc: "Full-stack web portals, SaaS platforms, and high-concurrency microservices.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Cross-platform and native iOS & Android applications with offline synchronization.",
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Automated CI/CD delivery pipelines, containerization, and multi-cloud setup.",
    tags: ["AWS", "Docker", "Terraform"],
  },
  {
    icon: Sparkles,
    title: "AI & Automation",
    desc: "Practical machine learning, document AI, and automated business workflows.",
    tags: ["Python", "PyTorch", "Vector DBs"],
  },
];

export default function Hero() {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 bg-transparent overflow-hidden">
      {/* Ambient Glow Lights */}
      <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-brand-sky/25 rounded-full blur-3xl pointer-events-none orb-1" />
      <div className="absolute top-1/2 left-5 w-[500px] h-[500px] bg-brand-teal/20 rounded-full blur-3xl pointer-events-none orb-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full cream-badge text-[11px] font-bold tracking-wider uppercase mb-6"
            >
              <span>Enterprise IT & Engineering</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-navy leading-[1.14] mb-6"
            >
              Software Engineering &amp; IT That{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-navy bg-clip-text text-transparent">
                Scales.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8"
            >
              We design, build, and deploy web platforms, mobile apps, cloud infrastructure, and custom AI for enterprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <Link
                href="#contact"
                className="px-7 py-3.5 rounded-lg bg-brand-blue hover:bg-brand-navy text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
              >
                <span>Schedule Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#services"
                className="px-7 py-3.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-700 font-semibold text-sm flex items-center justify-center transition-all duration-300 shadow-xs"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Clean Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/50 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-blue" />
                100% Client IP Ownership
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-blue" />
                Strict Non-Disclosure (NDA)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-brand-blue" />
                Milestone-Based Delivery
              </span>
            </motion.div>
          </div>

          {/* Right Column: Real Capabilities Grid */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="floating-container rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <h3 className="font-bold text-base text-brand-navy">
                  Core Engineering Capabilities
                </h3>
                <span className="text-[11px] font-semibold text-brand-blue">
                  BAI Technical Stack
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
                {capabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={cap.title}
                      className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-brand-blue/30 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-brand-blue flex items-center justify-center mb-2.5 shadow-2xs">
                        <Icon size={16} />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">
                        {cap.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                        {cap.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cap.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">
                  Custom architecture for enterprise needs
                </span>
                <Link
                  href="#services"
                  className="font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 transition-colors"
                >
                  <span>View all services</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
