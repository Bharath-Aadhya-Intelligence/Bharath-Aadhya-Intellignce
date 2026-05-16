"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "AI Research", href: "#ai" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md border-b border-border-subtle" : "bg-transparent"
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm overflow-hidden p-1.5">
            <Image 
              src="/Logo.jpeg" 
              alt="Bharath Aadhya Intelligence Logo" 
              width={56}
              height={56}
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className={cn(
              "font-display font-black text-xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              Bharath Aadhya
            </span>
            <span className={cn(
              "text-[9px] uppercase tracking-[0.2em] font-bold -mt-1 transition-colors duration-300",
              isScrolled ? "text-muted" : "text-white/70"
            )}>
              Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors duration-300",
                isScrolled ? "text-muted hover:text-accent-indigo" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className="flex items-center gap-2 px-5 py-2 bg-accent-indigo text-white rounded-lg text-sm font-bold hover:shadow-lg transition-all active:scale-95 hover:bg-accent-indigo/90"
          >
            <Plus size={16} />
            Start a Project
          </Link>
          <Link
            href="#login"
            className={cn(
              "px-5 py-2 border rounded-lg text-sm font-bold transition-all",
              isScrolled 
                ? "border-border-emphasis text-foreground hover:bg-black/5" 
                : "border-white/30 text-white hover:bg-white/10"
            )}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-border-subtle p-6 flex flex-col gap-6 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-bold text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border-subtle">
              <Link
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-3 bg-accent-indigo text-white rounded-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Plus size={18} />
                Start a Project
              </Link>
              <Link
                href="#login"
                className="w-full py-3 border border-border-emphasis text-center rounded-xl font-bold text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
