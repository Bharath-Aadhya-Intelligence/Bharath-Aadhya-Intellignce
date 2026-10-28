"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUp, ShieldCheck } from "lucide-react";
import LogoImg from "../../public/Logo.jpeg";

const serviceLinks = [
  { name: "Enterprise Web Engineering", href: "#services" },
  { name: "Mobile Application Development", href: "#services" },
  { name: "Cloud Architecture & DevOps", href: "#services" },
  { name: "Custom AI & Automation", href: "#services" },
  { name: "Legacy Modernization", href: "#services" },
  { name: "Dedicated Engineering Pods", href: "#services" },
];

const companyLinks = [
  { name: "About Bharath Aadhya Intelligence", href: "#about" },
  { name: "Why Enterprises Choose Us", href: "#about" },
  { name: "Institutional Collaborators", href: "#partners" },
  { name: "Our Delivery Framework", href: "#about" },
  { name: "Request a Proposal", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-navy-dark text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand & Corporate Overview (5 cols) */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3.5 mb-5 group">
              <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden shadow-xs">
                <Image
                  src={LogoImg}
                  alt="Bharath Aadhya Intelligence"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-snug">
                  Bharath Aadhya Intelligence
                </span>
                <span className="text-[11px] tracking-wide uppercase text-brand-sky font-semibold">
                  Enterprise IT Solutions
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm mb-6">
              Bharath Aadhya Intelligence delivers robust software engineering, scalable cloud infrastructure, and intelligent automation systems that power enterprise growth.
            </p>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-brand-teal" />
                <a
                  href="mailto:bharathaadhyaintelligence@gmail.com"
                  className="hover:text-brand-sky transition-colors"
                >
                  bharathaadhyaintelligence@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={14} className="text-brand-teal" />
                <span>Karnataka, India • National Operations</span>
              </div>
            </div>
          </div>

          {/* Core Services Links (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Enterprise IT Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Governance Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Standards
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Bharath Aadhya Intelligence. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck size={14} className="text-brand-teal" />
              100% Client IP Ownership &amp; NDA Assured
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
