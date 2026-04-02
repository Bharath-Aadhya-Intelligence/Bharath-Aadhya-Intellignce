"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Plus } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden hero-gradient-vibrant">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-overlay-white opacity-20" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider mb-8 backdrop-blur-sm"
        >
          <Sparkles size={14} className="animate-pulse" />
          The Home for Innovation
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-black tracking-tight text-white leading-[1.05] max-w-5xl mx-auto mb-8"
        >
          BUILDING INDIA'S <br />
          <span className="italic relative">AI FUTURE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Developing the nation's <span className="text-white font-bold italic">First Independent LLM</span> while delivering elite <span className="text-white font-bold italic">Mobile App</span> and <span className="text-white font-bold italic">Web Engineering</span> services for global visionaries.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="w-full sm:w-auto px-10 py-5 bg-white text-accent-indigo rounded-xl font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:shadow-xl transition-all active:scale-95 group"
          >
            Hire our Dev Team
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#ai"
            className="w-full sm:w-auto px-10 py-5 border-2 border-white/30 text-white rounded-xl font-black text-sm tracking-tight hover:bg-white/10 backdrop-blur-sm transition-all text-center"
          >
            Explore AI Research
          </Link>
        </motion.div>
      </div>
      
      {/* Wave/Fade Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
