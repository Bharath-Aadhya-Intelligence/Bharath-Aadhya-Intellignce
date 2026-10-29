"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MapPin, Clock } from "lucide-react";

const serviceCategories = [
  "Enterprise Web Engineering",
  "Mobile App Development",
  "Cloud Architecture & DevOps",
  "Custom AI & Automation",
  "Dedicated Engineering Pod",
  "IT Modernization & Consulting",
];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = `BAI IT Consultation Request: ${formData.service} — ${formData.fullName}`;
      const body = `Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Service Required: ${formData.service}
Target Timeline: ${formData.timeline}

Project Overview:
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
    <section id="contact" className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full teal-badge text-[11px] font-bold uppercase tracking-wider mb-3">
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mb-3">
            Start a Conversation
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Tell us about your project requirements and our team will get back to you with a concrete plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact & Office Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="floating-container rounded-2xl p-7 space-y-6">
              <h3 className="font-bold text-base text-brand-navy border-b border-slate-100 pb-3">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="text-brand-blue shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold text-slate-500 block mb-0.5">Email</span>
                    <a
                      href="mailto:bharathaadhyaintelligence@gmail.com"
                      className="text-sm font-bold text-brand-navy hover:text-brand-blue transition-colors"
                    >
                      bharathaadhyaintelligence@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <MapPin className="text-brand-blue shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold text-slate-500 block mb-0.5">Location</span>
                    <span className="text-xs font-medium text-slate-800">
                      Karnataka, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <Clock className="text-brand-blue shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-semibold text-slate-500 block mb-0.5">Response Time</span>
                    <span className="text-xs font-medium text-slate-800">
                      Within 24 business hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                All inquiries are covered by mutual non-disclosure agreements.
              </div>
            </div>
          </div>

          {/* Right Column: Structured Consultation Form */}
          <div className="lg:col-span-7">
            <div className="floating-container rounded-2xl p-8 sm:p-10">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Inquiry Prepared
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mb-5 leading-relaxed">
                    Your email client should open with your consultation details. You can also reach us directly at{" "}
                    <a
                      href="mailto:bharathaadhyaintelligence@gmail.com"
                      className="font-semibold text-brand-blue underline"
                    >
                      bharathaadhyaintelligence@gmail.com
                    </a>.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Service Required *
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
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
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
                      Project Details *
                    </label>
                    <textarea
                      name="details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Briefly describe what you're looking to build or achieve..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-sm text-slate-900 focus:outline-none focus:border-brand-blue focus:bg-white transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-brand-blue hover:bg-brand-navy text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    <span>{isSubmitting ? "Opening Email..." : "Send Inquiry"}</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
