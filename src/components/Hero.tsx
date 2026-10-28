"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface StackFlow {
  title: string;
  badge: string;
  summary: string;
  pipeline: { step: string; label: string; detail: string }[];
  metrics: { label: string; val: string }[];
  tags: string[];
}

const architectureModes: Record<"web" | "mobile" | "ai", StackFlow> = {
  web: {
    title: "Enterprise Cloud & Web Systems",
    badge: "Distributed Architecture",
    summary: "High-concurrency microservices with automated failover and sub-second caching.",
    pipeline: [
      { step: "01", label: "Edge Gateway", detail: "Global SSL & DDoS Protection" },
      { step: "02", label: "Next.js Core", detail: "Serverless Microservices API" },
      { step: "03", label: "In-Memory Cache", detail: "Microsecond State with Redis" },
      { step: "04", label: "Database Cluster", detail: "Encrypted PostgreSQL Storage" },
    ],
    metrics: [
      { label: "Uptime SLA", val: "99.99%" },
      { label: "API Latency", val: "<120ms" },
      { label: "Throughput", val: "10k+ Req/s" },
    ],
    tags: ["Next.js 16", "TypeScript", "Docker", "AWS", "PostgreSQL"],
  },
  mobile: {
    title: "High-Performance Mobile Systems",
    badge: "Cross-Platform & Native",
    summary: "Reactive mobile apps with offline-first synchronization and biometric security.",
    pipeline: [
      { step: "01", label: "Client Layer", detail: "120 FPS Fluid Native UI" },
      { step: "02", label: "Offline Storage", detail: "Zero-Latency Local DB Sync" },
      { step: "03", label: "Biometric Layer", detail: "Hardware Secure Enclave" },
      { step: "04", label: "Cloud Sync", detail: "Real-Time WebSocket Engine" },
    ],
    metrics: [
      { label: "Platforms", val: "iOS & Android" },
      { label: "Performance", val: "60-120 FPS" },
      { label: "Security", val: "AES-256" },
    ],
    tags: ["React Native", "Flutter", "Swift", "Kotlin", "WebSockets"],
  },
  ai: {
    title: "Custom AI & Enterprise Automation",
    badge: "Private & Grounded Knowledge",
    summary: "Private RAG semantic pipelines and intelligent workflows on your data.",
    pipeline: [
      { step: "01", label: "Enterprise Data", detail: "Document & Schema Ingestion" },
      { step: "02", label: "Vector Search", detail: "Semantic Hybrid Indexing" },
      { step: "03", label: "Custom Models", detail: "Grounded LLM Inference" },
      { step: "04", label: "Workflow Ops", detail: "Automated System Execution" },
    ],
    metrics: [
      { label: "Data Leakage", val: "0% (Air-Gapped)" },
      { label: "Search Speed", val: "<180ms" },
      { label: "Residency", val: "100% In-Region" },
    ],
    tags: ["Python", "PyTorch", "Vector DBs", "LangChain", "Open Models"],
  },
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"web" | "mobile" | "ai">("web");
  const current = architectureModes[activeTab];

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-20 bg-transparent overflow-hidden">
      {/* Ambient Floating Glow Lights (Seamless - Zero Background Box Borders) */}
      <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-brand-sky/25 rounded-full blur-3xl pointer-events-none orb-1" />
      <div className="absolute top-1/2 left-5 w-[500px] h-[500px] bg-brand-teal/20 rounded-full blur-3xl pointer-events-none orb-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6">
            {/* Minimal Category Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full cream-badge text-[11px] font-bold tracking-wider uppercase mb-6"
            >
              <span>Enterprise IT Services &amp; Engineering Partner</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-brand-navy leading-[1.14] mb-6"
            >
              Enterprise Software Engineering &amp; IT Solutions That{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-teal to-brand-navy bg-clip-text text-transparent">
                Scale Your Business.
              </span>
            </motion.h1>

            {/* Value Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8"
            >
              Bharath Aadhya Intelligence partners with enterprises, institutions, and high-growth companies to design, build, and deploy mission-critical web platforms, mobile ecosystems, cloud infrastructure, and custom AI integrations.
            </motion.p>

            {/* Action Buttons */}
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
                <span>Schedule IT Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#services"
                className="px-7 py-3.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-300 hover:border-brand-blue hover:text-brand-blue text-slate-700 font-semibold text-sm flex items-center justify-center transition-all duration-300 shadow-xs"
              >
                Explore Core Services
              </Link>
            </motion.div>

            {/* Clean Minimal Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-slate-200/50 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-semibold text-slate-700"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                100% Client IP Ownership
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                Strict Non-Disclosure (NDA)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                Agile Milestone Delivery
              </span>
            </motion.div>
          </div>

          {/* Right Column: Clean Self-Contained Floating Container */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="floating-container rounded-2xl p-6 sm:p-8"
            >
              {/* Card Header & Category Switcher */}
              <div className="pb-4 mb-5 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-brand-navy">
                  Enterprise Architecture Blueprint
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click a domain to inspect the engineering pipeline:
                </p>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100/90 rounded-xl mb-6 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab("web")}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "web"
                      ? "bg-white text-brand-navy shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Cloud &amp; Web
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("mobile")}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "mobile"
                      ? "bg-white text-brand-navy shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Mobile Apps
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === "ai"
                      ? "bg-white text-brand-navy shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  AI &amp; Data
                </button>
              </div>

              {/* Dynamic Architecture Flow */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {current.title}
                      </h4>
                      <span className="text-[10px] font-bold text-brand-blue uppercase">
                        {current.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      {current.summary}
                    </p>
                  </div>

                  {/* 4 Clean Step Blocks with Numerical Hierarchy */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {current.pipeline.map((node) => (
                      <div
                        key={node.step}
                        className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-brand-teal/50 transition-all"
                      >
                        <div className="text-[10px] font-extrabold text-brand-blue mb-1">
                          PHASE {node.step}
                        </div>
                        <div className="text-xs font-bold text-slate-900">
                          {node.label}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {node.detail}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture Metrics Strip */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 grid grid-cols-3 gap-2 text-center">
                    {current.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-[10px] text-slate-500 uppercase font-semibold">
                          {m.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-brand-navy mt-0.5">
                          {m.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clean Tech Stack Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {current.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="#contact"
                      className="text-xs font-bold text-brand-blue hover:text-brand-navy transition-colors flex items-center gap-1"
                    >
                      <span>Inquire Blueprint</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
