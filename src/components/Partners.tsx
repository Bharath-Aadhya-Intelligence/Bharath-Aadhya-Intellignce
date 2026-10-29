"use client";

import { motion } from "framer-motion";

const partners = [
  {
    name: "GTTC",
    fullName: "Government Tool Room and Training Centre",
    type: "Technical Institute Partner",
  },
  {
    name: "ATS",
    fullName: "ATS Global Technologies",
    type: "Enterprise Engineering Partner",
  },
  {
    name: "SPS",
    fullName: "Siliguri Public School",
    type: "Institutional Technology Partner",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="py-14 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-navy block mb-2">
            Strategic Collaborators
          </span>
          <p className="text-sm text-slate-500">
            Trusted by educational institutions and technology enterprises.
          </p>
        </div>

        {/* Clean Partner Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm border border-slate-200/90 hover:border-brand-blue/50 rounded-2xl px-7 py-5 flex items-center gap-4.5 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-navy to-brand-blue text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0">
                {partner.name}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-brand-navy">
                  {partner.fullName}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  {partner.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
