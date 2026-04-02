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
    <section id="contact" className="relative py-24 hero-gradient-vibrant overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-overlay-white opacity-[0.2]" />
      
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-wider mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Live Availability: Responses in 15m
                </div>
                
                <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tight leading-[1.1] uppercase">
                  LET&apos;S BUILD THE <span className="text-white italic">FUTURE</span> TOGETHER
                </h2>
                <p className="text-lg text-white/70 font-medium mb-10 leading-relaxed">
                  Ready to start your next big project? Whether it&apos;s a cutting-edge AI model, a high-performance mobile app, or a scalable web ecosystem, our team is ready to scale with you in real time.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white uppercase text-sm tracking-widest">Expert AI Engineering</h4>
                      <p className="text-xs text-white/60 font-medium">Domain-specific Indian LLM research & integration.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/90">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white uppercase text-sm tracking-widest">Full-Stack Excellence</h4>
                      <p className="text-xs text-white/60 font-medium">Premium Mobile & Web development services.</p>
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
              className="relative p-8 md:p-12 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-10 space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                          <input 
                            required
                            type="text" 
                            placeholder="John Doe"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-bold text-white placeholder:text-white/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Business Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                          <input 
                            required
                            type="email" 
                            placeholder="john@company.com"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-bold text-white placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                        <input 
                          required
                          type="tel" 
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-bold text-white placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Project Type</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                        <select 
                          required
                          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-bold text-white appearance-none cursor-pointer placeholder:text-white/20"
                        >
                          <option value="" disabled selected className="text-foreground">Select a service</option>
                          {projectTypes.map(type => (
                            <option key={type} value={type} className="text-foreground">{type}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Project Details</label>
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-6 text-white/30 group-focus-within:text-white transition-colors" size={18} />
                        <textarea 
                          required
                          rows={4}
                          placeholder="Tell us about your vision..."
                          className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all font-bold text-white placeholder:text-white/20 resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-white text-accent-indigo rounded-2xl font-black text-lg tracking-tight flex items-center justify-center gap-3 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group shadow-xl"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-accent-indigo/20 border-t-accent-indigo rounded-full animate-spin" />
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
                    className="relative z-10 text-center py-20"
                  >
                    <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tight">Request Received!</h3>
                    <p className="text-white/60 font-medium mb-8 max-w-[280px] mx-auto leading-relaxed">
                      Thank you for trusting BAI. Our team is reviewing your details and will call you back within 15 minutes.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-white font-black uppercase text-sm tracking-widest hover:underline"
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
