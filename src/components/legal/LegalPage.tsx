import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import LogoImg from "../../../public/Logo.jpeg";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
};

/** Shared layout for the Privacy Policy and Terms of Service. Styles the plain HTML inside the sections. */
export default function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <>
      <header className="border-b border-border-subtle bg-white">
        <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-5">
          <Link href="/" className="group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-indigo">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
              <Image src={LogoImg} alt="Bharath Aadhya Intelligence Logo" className="h-full w-full object-contain" />
            </div>
            <span className="font-display text-sm font-black uppercase tracking-tight text-foreground sm:text-base">
              Bharath Aadhya Intelligence
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-lg text-sm font-bold text-accent-indigo underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden px-6 py-16 text-center hero-gradient-vibrant md:py-24">
          <div className="absolute inset-0 grid-overlay-white opacity-[0.2] pointer-events-none" />
          <div className="container relative z-10 mx-auto max-w-3xl">
            <h1 className="mb-6 font-display text-4xl font-black tracking-tight text-white md:text-5xl">{title}</h1>
            {intro && <div className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-white/85">{intro}</div>}
            <p className="mt-6 text-sm font-bold text-white/70">Last Updated: {lastUpdated}</p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="legal-body">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-24">
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.content}
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
