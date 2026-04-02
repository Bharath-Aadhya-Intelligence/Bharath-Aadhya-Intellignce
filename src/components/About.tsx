"use client";

import { motion } from "framer-motion";
import { Users, Building2, Code2, Rocket } from "lucide-react";

const stats = [
  { label: "Innovators Enrolled", value: "95,000+", icon: Users },
  { label: "Programs Delivered", value: "250+", icon: Rocket },
  { label: "Community Builders", value: "12,000+", icon: Code2 },
  { label: "Hiring Partners", value: "45+", icon: Building2 },
];

export default function About() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        {/* Main Stats Block - Blue theme like HackCulture */}
        <div className="rounded-[2.5rem] bg-accent-indigo p-12 md:p-20 relative overflow-hidden shadow-2xl">
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight uppercase"
            >
              DELIVERED IMPACT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-white/80 font-medium leading-relaxed"
            >
              Powering innovation at scale for India's leading enterprises and a global ecosystem of top-tier talent.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex p-4 rounded-2xl bg-white/10 text-white mb-6 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-display font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm font-black text-white/60 uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
