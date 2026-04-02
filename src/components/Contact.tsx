"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MessageSquare,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const projectTypes = [
  "Website Development",
  "Mobile App Development",
  "AI / LLM Research",
  "Product Incubation",
  "Custom AI Integration",
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate real-time submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 bg-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-[0.2]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/[0.08] border border-accent-indigo/20 text-accent-indigo text-[10px] font-black uppercase tracking-wider mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-indigo opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-indigo"></span>
                  </span>
                  Live Availability: Responses in 15m
                </div>
                
                <h2 className="text-4xl md:text-6xl font-display font-black text-foreground mb-6 tracking-tight leading-[1.1] uppercase">
                  LET&apos;S BUILD THE <span className="text-accent-indigo italic">FUTURE</span> TOGETHER
                </h2>
                <p className="text-lg text-muted font-medium mb-10 leading-relaxed">
                  Ready to start your next big project? Whether it&apos;s a cutting-edge AI model, a high-performance mobile app, or a scalable web ecosystem, our team is ready to scale with you in real time.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-indigo/5 flex items-center justify-center text-accent-indigo">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-foreground uppercase text-sm tracking-widest">Expert AI Engineering</h4>
                      <p className="text-xs text-muted font-medium">Domain-specific Indian LLM research & integration.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-indigo/5 flex items-center justify-center text-accent-indigo">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-foreground uppercase text-sm tracking-widest">Full-Stack Excellence</h4>
                      <p className="text-xs text-muted font-medium">Premium Mobile & Web development services.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 bg-white rounded-[2.5rem] border border-border-subtle shadow-2xl shadow-accent-indigo/5"
            >
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent-indigo transition-colors" size={18} />
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-accent-indigo/[0.02] border-2 border-border-subtle rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-indigo transition-all font-bold text-foreground placeholder:text-muted/30"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Business Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent-indigo transition-colors" size={18} />
                          <input 
                            required
                            type="email" 
                            placeholder="john@company.com"
                            className="w-full bg-accent-indigo/[0.02] border-2 border-border-subtle rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-indigo transition-all font-bold text-foreground placeholder:text-muted/30"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent-indigo transition-colors" size={18} />
                        <input 
                          required
                          type="tel" 
                          placeholder="+91 98765 43210"
                          className="w-full bg-accent-indigo/[0.02] border-2 border-border-subtle rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-indigo transition-all font-bold text-foreground placeholder:text-muted/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project Type</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent-indigo transition-colors" size={18} />
                        <select 
                          required
                          className="w-full bg-accent-indigo/[0.02] border-2 border-border-subtle rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-indigo transition-all font-bold text-foreground appearance-none cursor-pointer"
                        >
                          <option value="" disabled selected>Select a service</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project Details</label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-5 text-muted-foreground group-focus-within:text-accent-indigo transition-colors" size={18} />
                        <textarea 
                          required
                          rows={4}
                          placeholder="Tell us about your vision..."
                          className="w-full bg-accent-indigo/[0.02] border-2 border-border-subtle rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-accent-indigo transition-all font-bold text-foreground placeholder:text-muted/30 resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-accent-indigo text-white rounded-2xl font-black text-lg tracking-tight flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-accent-indigo/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-accent-indigo/10 text-accent-indigo rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-foreground mb-4 uppercase tracking-tight">Request Received!</h3>
                    <p className="text-muted font-medium mb-8 max-w-[280px] mx-auto">
                      Thank you for trusting BAI. Our team is reviewing your details and will call you back within 15 minutes.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent-indigo font-black uppercase text-sm tracking-widest hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
