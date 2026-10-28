"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const guarantees = [
  "Non-Disclosure Agreement (NDA) Protected",
  "Milestone-Based Transparent Deliverables",
  "Complete Codebase & IP Ownership",
  "Post-Launch Technical Support Retainers",
];

export default function CTA() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-2xl color-fade-dark text-white p-8 sm:p-14 lg:p-16 shadow-xl relative overflow-hidden border border-white/10">
          {/* Ambient Fade Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/25 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 orb-1" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20 orb-2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block mb-2">
                Enterprise Partnership
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 leading-snug">
                Ready to Accelerate Your Enterprise IT Roadmap?
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8">
                Connect with our principal architects to discuss your custom web application, enterprise mobile ecosystem, or dedicated engineering pod.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guarantees.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-medium text-white/90">
                    <CheckCircle2 size={15} className="text-brand-teal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
              <Link
                href="#contact"
                className="px-8 py-3.5 rounded-lg bg-brand-cream hover:bg-white text-brand-navy font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-98"
              >
                <span>Request Project Proposal</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#services"
                className="px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm flex items-center justify-center transition-all duration-300 text-center"
              >
                Browse Core Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
