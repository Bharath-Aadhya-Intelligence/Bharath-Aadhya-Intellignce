"use client";

import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Search, 
  ShieldCheck, 
  Globe, 
  Briefcase, 
  Megaphone 
} from "lucide-react";

const services = [
  {
    title: "INNOVATION CHALLENGE",
    description: "Launch focused corporate challenges and hackathons to solve real business problems and unlock breakthrough ideas.",
    icon: Lightbulb,
    color: "bg-blue-500",
  },
  {
    title: "STARTUP SCOUTING",
    description: "Identify high-potential startups aligned to your business goals and collaborate on cutting-edge technologies and solutions.",
    icon: Search,
    color: "bg-indigo-500",
  },
  {
    title: "INTERNAL HACKATHON",
    description: "Activate your internal workforce to co-create solutions, generate fresh ideas, and accelerate organizational transformation.",
    icon: ShieldCheck,
    color: "bg-cyan-500",
  },
  {
    title: "EXTERNAL HACKATHON",
    description: "Engage external talent to co-create solutions, spark fresh ideas, and accelerate breakthrough innovation at scale.",
    icon: Globe,
    color: "bg-blue-600",
  },
  {
    title: "HIRING HACKATHON",
    description: "Discover exceptional talent through real-world problem solving and performance-driven recruitment programs.",
    icon: Briefcase,
    color: "bg-indigo-600",
  },
  {
    title: "PRODUCT ADOPTION",
    description: "Drive awareness and engagement for your products through targeted developer programs and community-led evangelism.",
    icon: Megaphone,
    color: "bg-cyan-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-white overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-background opacity-[0.2]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-black text-foreground mb-4 tracking-tight"
          >
            INNOVATION FOR ENTERPRISES
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             viewport={{ once: true }}
            className="text-lg text-muted font-medium"
          >
            Bharath Aadhya Intelligence enables customized innovation with a global ecosystem of builders
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative p-8 bg-white border border-border-subtle rounded-2xl transition-all hover:border-accent-indigo/30 hover:shadow-[0_20px_40px_rgba(73,83,245,0.06)]"
            >
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className={`p-3 rounded-xl bg-accent-indigo/[0.08] text-accent-indigo transition-transform group-hover:scale-110 duration-300`}>
                    <service.icon size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-accent-indigo tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
