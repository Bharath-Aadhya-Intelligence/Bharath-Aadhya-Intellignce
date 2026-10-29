"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  category: "web" | "mobile" | "cloud" | "ai" | "consulting";
  title: string;
  desc: string;
  deliverables: string[];
  tech: string[];
}

const itServices: ServiceItem[] = [
  {
    id: "web-systems",
    category: "web",
    title: "Enterprise Web Engineering",
    desc: "Scalable web portals, SaaS platforms, and APIs built for high concurrency.",
    deliverables: [
      "Custom Web Applications",
      "REST / GraphQL APIs",
      "Database Architecture",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "mobile-apps",
    category: "mobile",
    title: "Mobile Engineering",
    desc: "iOS and Android apps built for fluid UX and seamless offline sync.",
    deliverables: [
      "Cross-Platform (React Native & Flutter)",
      "Native iOS & Android",
      "Biometric & Cloud Integration",
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "cloud-devops",
    category: "cloud",
    title: "Cloud & DevOps",
    desc: "Infrastructure management, CI/CD pipelines, and zero-downtime deployments.",
    deliverables: [
      "AWS & Azure Cloud Setup",
      "CI/CD Pipelines",
      "Monitoring & Disaster Recovery",
    ],
    tech: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "custom-ai",
    category: "ai",
    title: "AI & Automation",
    desc: "RAG pipelines, document AI, and predictive workflows on your private data.",
    deliverables: [
      "Knowledge RAG & Semantic Search",
      "Document AI & Data Extraction",
      "Predictive Analytics & Bots",
    ],
    tech: ["Python", "PyTorch", "LangChain", "Vector DBs"],
  },
  {
    id: "modernization",
    category: "consulting",
    title: "Legacy Modernization",
    desc: "Technology audits, microservices migration, and technical debt elimination.",
    deliverables: [
      "Security & Codebase Audits",
      "Cloud-Native Migration",
      "DB Optimization & Caching",
    ],
    tech: ["Enterprise Architecture", "Security Audits", "API Gateways", "Redis"],
  },
  {
    id: "engineering-pods",
    category: "consulting",
    title: "Engineering Pods",
    desc: "Senior developers and architects embedded directly into your team.",
    deliverables: [
      "Vetted Senior Engineers",
      "2-Week Agile Sprints",
      "Fixed or T&M Engagement",
    ],
    tech: ["Full-Stack", "QA Automation", "DevOps", "UI/UX"],
  },
];

const categories = [
  { id: "all", label: "All (6)" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "cloud", label: "Cloud" },
  { id: "ai", label: "AI" },
  { id: "consulting", label: "Consulting" },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices =
    selectedCategory === "all"
      ? itServices
      : itServices.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full teal-badge text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Enterprise IT Services
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-brand-navy text-white shadow-md"
                  : "bg-white/90 border border-slate-200 text-slate-700 hover:border-brand-blue hover:text-brand-navy shadow-xs"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="floating-container rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="text-xs text-slate-700 flex items-center gap-2"
                      >
                        <Check size={14} className="text-brand-blue shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="#contact"
                    className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 transition-colors shrink-0 ml-2"
                  >
                    <span>Inquire</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
