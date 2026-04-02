"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Plus } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-background opacity-40" />
      
      {/* Central Indigo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] bg-accent-indigo/[0.08] blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-indigo/[0.08] border border-accent-indigo/20 text-accent-indigo text-xs font-black uppercase tracking-wider mb-8"
        >
          <Sparkles size={14} className="animate-pulse" />
          The Home for Innovation
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-black tracking-tight text-foreground leading-[1.05] max-w-5xl mx-auto mb-8"
        >
          ACCELERATE INNOVATION <br />
          FROM <span className="text-accent-indigo italic relative">VISION</span> TO <span className="text-accent-indigo italic">VALUE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
        >
          A Global end-to-end Platform for Enterprise <span className="text-foreground font-bold italic">Hackathons</span>, <span className="text-foreground font-bold italic">Hiring Challenges</span> and <span className="text-foreground font-bold italic">Innovation Programs</span>
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
            className="w-full sm:w-auto px-10 py-5 bg-accent-indigo text-white rounded-xl font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:shadow-[0_8px_30px_rgb(73,83,245,0.3)] transition-all active:scale-95 group"
          >
            For Corporates
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#deck"
            className="w-full sm:w-auto px-10 py-5 border-2 border-accent-indigo text-accent-indigo rounded-xl font-black text-sm tracking-tight hover:bg-accent-indigo/5 transition-all text-center"
          >
            For Innovators
          </Link>
        </motion.div>
      </div>
      
      {/* Fade Bottom for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
