"use client";

import { motion } from "framer-motion";
import { Globe, Users, Mail, Phone, MapPin, Send, Plus, createLucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Custom icons due to missing brand icons in this version of lucide-react
const Linkedin = createLucideIcon('Linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', key: '1' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9', key: '2' }],
  ['circle', { cx: '4', cy: '4', r: '2', key: '3' }],
]);

const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: '1' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: '2' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: '3' }],
]);

const Twitter = createLucideIcon('Twitter', [
  ['path', { d: 'm4 4 11.733 16H20L8.267 4z', key: '1' }],
  ['path', { d: 'm4 20 6.768-6.768', key: '2' }],
  ['path', { d: 'm13.277 10.723 6.723-6.723', key: '3' }]
]);

const Youtube = createLucideIcon('Youtube', [
  ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2z', key: '1' }],
  ['path', { d: 'm10 15 5-3-5-3z', key: '2' }]
]);

const companyLinks = [
  { name: "Programs", href: "#programs" },
  { name: "Services", href: "#services" },
  { name: "Impact", href: "#about" },
  { name: "Community", href: "#" },
];

const supportLinks = [
  { name: "Contact Us", href: "#contact" },
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "FAQs", href: "#" },
];

const socialLinks = [
  { icon: Mail, href: "mailto:bharathaadhyaintelligence@gmail.com", name: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-border-subtle relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 grid-background opacity-[0.05] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden p-1.5">
                <Image 
                  src="/Logo.jpeg" 
                  alt="Bharath Aadhya Intelligence Logo" 
                  width={56}
                  height={56}
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display font-black text-xl text-foreground tracking-tight uppercase">
                  Bharath Aadhya
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-bold -mt-1">
                  Intelligence
                </span>
              </div>
            </Link>
            <p className="text-muted font-medium mb-8 leading-relaxed">
              Accelerating innovation from vision to value through a global ecosystem of builders and enterprise challenges.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-3 rounded-xl border border-border-subtle text-muted hover:border-accent-indigo hover:text-accent-indigo transition-all group"
                  aria-label={social.name}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1 md:ml-auto">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-8">
                Platform
              </h4>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted font-bold hover:text-accent-indigo transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-8">
                Connect
              </h4>
              <ul className="space-y-4">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted font-bold hover:text-accent-indigo transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 lg:ml-auto max-w-sm w-full">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground mb-8">
              Stay Updated
            </h4>
            <p className="text-muted font-medium mb-6">
              Subscribe to get the latest innovation challenges and program updates directly in your inbox.
            </p>
            <form className="relative group">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-white border-2 border-border-subtle rounded-2xl py-4 pl-6 pr-14 text-foreground font-bold placeholder:text-muted/50 focus:border-accent-indigo outline-none transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 aspect-square bg-accent-indigo text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all active:scale-90"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted text-sm font-bold">
            © {new Date().getFullYear()} Bharath Aadhya Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-muted font-bold text-sm">
                <MapPin size={16} className="text-accent-indigo" />
                Bengaluru, India
             </div>
             <div className="flex items-center gap-2 text-muted font-bold text-sm">
                <Mail size={16} className="text-accent-indigo" />
                bharathaadhyaintelligence@gmail.com
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
