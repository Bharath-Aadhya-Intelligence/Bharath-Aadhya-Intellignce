"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const serviceCategories = [
  "Enterprise Web Engineering",
  "Mobile App Development",
  "Cloud Architecture & DevOps",
  "Custom AI & Automation",
  "Dedicated Engineering Pod",
  "IT Modernization & Consulting",
];

const teamSizingMap: Record<string, { pod: string; timeline: string; focus: string }> = {
  "Enterprise Web Engineering": {
    pod: "1 Principal Architect + 2 Full-Stack Engineers + 1 QA Specialist",
    timeline: "6 - 12 Weeks to Production Release",
    focus: "Next.js Core, Microservices, PostgreSQL, and Automated CI/CD",
  },
  "Mobile App Development": {
    pod: "1 Mobile Architect + 2 React Native/Flutter Devs + 1 UI/UX Lead",
    timeline: "8 - 14 Weeks to App Store & Play Store",
    focus: "Offline Sync Engine, Biometrics, and Native API Integrations",
  },
  "Cloud Architecture & DevOps": {
    pod: "1 Senior Cloud Architect + 1 DevOps/SRE Engineer",
    timeline: "3 - 6 Weeks for Multi-Region Setup & Audit",
    focus: "Terraform IaC, Docker/Kubernetes, and Blue-Green Deployment",
  },
  "Custom AI & Automation": {
    pod: "1 AI/ML Research Lead + 1 Data Engineer + 1 Backend Dev",
    timeline: "4 - 10 Weeks for Model Tuning & Pipeline Integration",
    focus: "Private Knowledge RAG, Vector Search, and Air-Gapped Security",
  },
  "Dedicated Engineering Pod": {
    pod: "Custom Scale (3 - 8 Senior Full-Stack Engineers)",
    timeline: "Sprint-to-Sprint (Bi-Weekly Milestones)",
    focus: "Accelerating Internal Feature Roadmaps & Velocity",
  },
  "IT Modernization & Consulting": {
    pod: "1 Enterprise Architect + 2 Senior Refactoring Devs",
    timeline: "4 - 8 Weeks for Architecture Decoupling",
    focus: "Monolith Migration, Security Hardening, and Database Optimization",
  },
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "Enterprise Web Engineering",
    timeline: "Within 1-3 Months",
    details: "",
  });

  const currentEst = teamSizingMap[formData.service] || teamSizingMap["Enterprise Web Engineering"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = `BAI IT Consultation Request: ${formData.service} — ${formData.fullName}`;
      const body = `Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Required Service: ${formData.service}
Target Timeline: ${formData.timeline}
Suggested Pod Scale: ${currentEst.pod}

Project Scope & Architecture Requirements:
${formData.details}`;

      window.location.href = `mailto:bharathaadhyaintelligence@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      setIsSubmitted(true);
    } catch {
      alert("Please email us directly at bharathaadhyaintelligence@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full teal-badge text-[11px] font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span>Project Scoping &amp; Estimation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
            Request an IT Consultation &amp; Engineering Estimate
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Select your desired service to inspect recommended engineering pod structures and submit your technical scope.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Pod Estimation & Corporate Details (Floating Container) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Interactive Pod Estimator Card */}
            <div className="floating-container rounded-2xl p-7 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Recommended Pod Composition
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-teal-light text-brand-navy">
                  Dynamic Sizing
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Selected Domain:
                  </span>
                  <span className="font-extrabold text-sm text-brand-navy">
                    {formData.service}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Suggested Engineering Team:
                  </span>
                  <span className="font-bold text-slate-800 text-xs leading-relaxed block">
                    {currentEst.pod}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Target Velocity:
                    </span>
                    <span className="font-bold text-brand-navy text-[11px] mt-0.5 block">
                      {currentEst.timeline}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Response SLA:
                    </span>
                    <span className="font-bold text-emerald-700 text-[11px] mt-0.5 block">
                      &lt; 24h Guaranteed
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                100% Client IP Ownership &amp; Mutual NDA Assured
              </div>
            </div>

            {/* Direct Contact Floating Card */}
            <div className="floating-container rounded-2xl p-6 space-y-4 text-xs">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-0.5">
                  Corporate Email
                </span>
                <a
                  href="mailto:bharathaadhyaintelligence@gmail.com"
                  className="font-semibold text-brand-navy hover:text-brand-blue transition-colors text-sm"
                >
                  bharathaadhyaintelligence@gmail.com
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase text-slate-500 block mb-0.5">
                  Operations Base
                </span>
                <span className="font-medium text-slate-700">
                  Karnataka, India (National &amp; Global Remote)
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Consultation Form (Floating Container) */}
          <div className="lg:col-span-7">
            <div className="floating-container rounded-2xl p-8 sm:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Proposal Request Initialized
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Your email client should open with your consultation details and suggested team sizing. If it did not open automatically, please reach us directly at{" "}
                    <a
                      href="mailto:bharathaadhyaintelligence@gmail.com"
                      className="font-semibold text-brand-blue underline"
                    >
                      bharathaadhyaintelligence@gmail.com
                    </a>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Primary Service Required *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium"
                    >
                      {serviceCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name / Contact Person *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Rajesh Kumar"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Corporate / Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rajesh@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Target Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all font-medium"
                      >
                        <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
                        <option value="Within 1-3 Months">Within 1-3 Months</option>
                        <option value="Long-term Roadmap (3+ Months)">Long-term Roadmap (3+ Months)</option>
                      </select>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Overview &amp; Technical Requirements *
                    </label>
                    <textarea
                      name="details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Please describe your key business objectives, current system architecture (if any), expected user base, or specific technical integrations..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-brand-blue hover:bg-brand-navy text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Opening Mail Client..." : "Submit Project Inquiry"}</span>
                    <ArrowRight size={15} />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center">
                    All inquiries are held in strict confidence under our mutual NDA terms.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
