"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  category: "web" | "mobile" | "cloud" | "ai" | "consulting";
  number: string;
  title: string;
  desc: string;
  deliverables: string[];
  tech: string[];
  architectureDetail: string;
}

const itServices: ServiceItem[] = [
  {
    id: "web-systems",
    category: "web",
    number: "01",
    title: "Enterprise Web Engineering",
    desc: "Robust, scalable corporate web portals, SaaS platforms, and enterprise applications engineered for high concurrency and sub-second response times.",
    deliverables: [
      "Custom Enterprise Web Applications",
      "Microservices & REST / GraphQL APIs",
      "High-Performance Database Architectures",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    architectureDetail: "Includes multi-region edge caching, automated database connection pooling, and sub-second cold starts.",
  },
  {
    id: "mobile-apps",
    category: "mobile",
    number: "02",
    title: "Mobile Application Engineering",
    desc: "High-performance iOS and Android mobile solutions built for fluid customer engagement, enterprise workforce workflows, and seamless offline sync.",
    deliverables: [
      "Cross-Platform Apps (React Native & Flutter)",
      "Native iOS (Swift) & Android (Kotlin)",
      "Secure Biometric & Cloud Integration",
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin", "REST APIs"],
    architectureDetail: "Features 120 FPS render pipelines, localized SQLite/WatermelonDB offline synchronization, and hardware encryption.",
  },
  {
    id: "cloud-devops",
    category: "cloud",
    number: "03",
    title: "Cloud Architecture & DevOps",
    desc: "End-to-end cloud infrastructure management, containerization, automated CI/CD deployment pipelines, and zero-downtime scalability.",
    deliverables: [
      "AWS & Microsoft Azure Cloud Setup",
      "Automated CI/CD Delivery Pipelines",
      "Infrastructure Monitoring & Disaster Recovery",
    ],
    tech: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
    architectureDetail: "Terraform-driven Infrastructure as Code (IaC) with automated blue-green deployments and Grafana/Prometheus telemetry.",
  },
  {
    id: "custom-ai",
    category: "ai",
    number: "04",
    title: "Custom AI & Business Automation",
    desc: "Practical artificial intelligence and machine learning solutions integrated into your daily operations to automate manual workflows and unlock data insights.",
    deliverables: [
      "Enterprise Knowledge RAG & Semantic Search",
      "Document AI & Intelligent Data Extraction",
      "Predictive Analytics & Automated Bots",
    ],
    tech: ["Python", "PyTorch", "LangChain", "Vector DBs", "Open Models"],
    architectureDetail: "Air-gapped semantic search clusters, custom chunking pipelines, and zero external API data exfiltration.",
  },
  {
    id: "modernization",
    category: "consulting",
    number: "05",
    title: "Legacy Modernization & IT Consulting",
    desc: "Strategic technology audits, monolith-to-microservices decoupling, performance optimizations, and technical roadmaps that eliminate technical debt.",
    deliverables: [
      "Architecture & Codebase Security Audits",
      "Monolith to Cloud-Native Migration",
      "Database Optimization & Caching Strategy",
    ],
    tech: ["Enterprise Architecture", "Security Audits", "API Gateways", "Redis"],
    architectureDetail: "Strangler-fig migration patterns ensuring zero downtime while incrementally replacing outdated legacy systems.",
  },
  {
    id: "engineering-pods",
    category: "consulting",
    number: "06",
    title: "Dedicated Engineering Pods",
    desc: "Vetted senior full-stack developers, architects, and QA engineers who integrate seamlessly with your internal team to accelerate your product roadmap.",
    deliverables: [
      "Vetted Senior Engineering Talent",
      "Agile 2-Week Sprint Deliverables",
      "Flexible Engagement (Fixed or T&M)",
    ],
    tech: ["Full-Stack Pods", "QA Automation", "DevOps Engineers", "UI/UX Leads"],
    architectureDetail: "Full timezone alignment, daily standups, and direct repository commits into your organization's version control.",
  },
];

const categories = [
  { id: "all", label: "All Capabilities (6)" },
  { id: "web", label: "Web Systems" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "ai", label: "AI & Automation" },
  { id: "consulting", label: "Consulting & Pods" },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredServices =
    selectedCategory === "all"
      ? itServices
      : itServices.filter((s) => s.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Ambient Color Fades */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-brand-cream/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full teal-badge text-[11px] font-bold uppercase tracking-wider mb-4">
            <span>Our Core IT Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
            Comprehensive Enterprise IT &amp; Software Solutions
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Filter by capability domain. Click &ldquo;Technical Details&rdquo; on any card to inspect architectural specifications.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
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

        {/* Floating Service Cards with 100% Uniform Heights & Equal Baselines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isExpanded = expandedId === service.id;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="floating-container rounded-2xl p-7 flex flex-col justify-between h-[495px] group cursor-pointer"
                  onClick={() => toggleExpand(service.id)}
                >
                  <div>
                    {/* Number Index Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black tracking-wider text-brand-blue font-mono">
                        SERVICE // {service.number}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-brand-blue transition-colors">
                        {isExpanded ? "Show Overview" : "Explore Specs"}
                      </span>
                    </div>

                    {/* Uniform Title Height so all card bodies start at the exact same pixel */}
                    <div className="min-h-[3.25rem] flex items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-brand-navy transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    {/* Standardized Content Container (Uniform Height across all cards) */}
                    <div className="h-[14rem] overflow-hidden flex flex-col justify-start">
                      {isExpanded ? (
                        <div className="p-4 rounded-xl bg-brand-sky-subtle border border-brand-teal/30 text-brand-navy text-xs space-y-2 h-full flex flex-col justify-between">
                          <div>
                            <span className="font-bold uppercase tracking-wider text-[11px] text-brand-blue block mb-2">
                              Architecture Specification
                            </span>
                            <p className="text-slate-700 leading-relaxed">
                              {service.architectureDetail}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 block pt-2 border-t border-brand-teal/20">
                            Click card to return to deliverables list.
                          </span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-5 min-h-[3rem]">
                            {service.desc}
                          </p>

                          <div className="space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                              Deliverables Scope:
                            </span>
                            {service.deliverables.map((item) => (
                              <div
                                key={item}
                                className="text-xs text-slate-700 flex items-start gap-2.5"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Always Aligned at the Bottom */}
                  <div className="pt-5 border-t border-slate-100 mt-4">
                    {/* Fixed Height Tech Stack Tags so all buttons align horizontally */}
                    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[3rem] items-start">
                      {service.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-navy flex items-center gap-1">
                        <span>{isExpanded ? "Overview" : "Technical Details"}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                      <Link
                        href="#contact"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 transition-colors"
                      >
                        <span>Inquire</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
