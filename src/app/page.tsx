import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen unified-ambient-canvas relative overflow-hidden">
      {/* Visible Structural Grid Texture Overlay across whole document */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 texture-grid"
      />

      <div className="relative z-10">
        <Header />
        <Hero />
        <Partners />
        <Services />
        <About />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
