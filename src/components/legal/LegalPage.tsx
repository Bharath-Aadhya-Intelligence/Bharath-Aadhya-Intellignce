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

/** Marks information that must be supplied or confirmed by the business before publication. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-amber-100 px-1 font-bold text-amber-950">{children}</mark>;
}

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
        <div className="container mx-auto max-w-3xl px-6 py-12 md:py-20">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-accent-indigo">Legal</p>
          <h1 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mb-8 text-sm font-bold text-muted">Last updated: {lastUpdated}</p>

          <div
            role="note"
            className="mb-10 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm font-medium leading-relaxed text-amber-950"
          >
            <p className="mb-2 font-black">Draft for review</p>
            <p>
              This page has not yet been reviewed by a qualified lawyer and is not legal advice. Text in{" "}
              <Placeholder>highlighted brackets</Placeholder> is information the business must supply or confirm before
              the page is treated as final.
            </p>
          </div>

          {intro && <div className="legal-body mb-10">{intro}</div>}

          <nav aria-labelledby="legal-toc-title" className="mb-12 rounded-2xl border border-border-subtle p-6">
            <h2 id="legal-toc-title" className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-foreground">
              On this page
            </h2>
            <ol className="list-decimal space-y-2 pl-6 text-sm font-bold text-muted">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="rounded text-accent-indigo underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

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
