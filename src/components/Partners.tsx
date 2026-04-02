"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "GTTC", label: "GTTC" },
  { name: "ATS", label: "ATS" },
  { name: "SPS", label: "Siligudi Public School" },
];

export default function Partners() {
  return (
    <section className="relative py-16 bg-white border-b border-border-subtle overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-center justify-center"
            >
              <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-foreground group-hover:text-accent-indigo transition-colors duration-500">
                {partner.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Subtle Grid Overlay for logic continuity */}
      <div className="absolute inset-0 grid-background opacity-[0.15] pointer-events-none" />
    </section>
  );
}
