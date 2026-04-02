"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "nasscom", logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/NASSCOM_logo.svg" },
  { name: "logitech", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg" },
  { name: "Lam Research", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Lam_Research_logo.svg" },
  { name: "Mercer", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Mercer_logo.svg" },
  { name: "Atlassian", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Atlassian_logo.svg" },
  { name: "Kyndryl", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Kyndryl_logo.svg" },
];

export default function Partners() {
  return (
    <section className="relative py-16 bg-white border-b border-border-subtle overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-8 md:h-10 w-auto flex items-center justify-center"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Subtle Grid Overlay for logic continuity */}
      <div className="absolute inset-0 grid-background opacity-[0.15] pointer-events-none" />
    </section>
  );
}
