import {
  Bot,
  Smartphone,
  Monitor,
  Rocket,
  Cpu,
  Layers
} from "lucide-react";

const services = [
  {
    title: "AI & LLM RESEARCH",
    description: "Building the nation's First Independent LLM from the ground up, tailored specifically for the Indian linguistic and cultural ecosystem.",
    icon: Bot,
    color: "bg-blue-500",
  },
  {
    title: "MOBILE DEVELOPMENT",
    description: "Crafting high-performance, intuitive mobile applications for iOS and Android using the latest native and hybrid technologies.",
    icon: Smartphone,
    color: "bg-indigo-500",
  },
  {
    title: "WEB ENGINEERING",
    description: "Developing scalable, secure, and lightning-fast enterprise web platforms that drive tangible business growth and user engagement.",
    icon: Monitor,
    color: "bg-cyan-500",
  },
  {
    title: "PRODUCT INCUBATION",
    description: "We don't just build for others; we launch our own disruptive products, taking ideas from concept to global market leaders.",
    icon: Rocket,
    color: "bg-blue-600",
  },
  {
    title: "CUSTOM AI SOLUTIONS",
    description: "Supercharge your existing business workflows by integrating custom-trained AI models and intelligent automation systems.",
    icon: Cpu,
    color: "bg-indigo-600",
  },
  {
    title: "FULL-STACK FREELANCING",
    description: "Elite engineering talent available for high-end software craftsmanship, delivering pure value from front-end to robust back-ends.",
    icon: Layers,
    color: "bg-cyan-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24 bg-white overflow-hidden scroll-mt-24">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-background opacity-[0.2]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-foreground mb-4 tracking-tight">
            OUR CORE EXPERTISE
          </h2>
          <p className="text-lg text-muted font-medium">
            From building India&apos;s first LLM to crafting elite digital experiences, we redefine the boundaries of innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-6 sm:p-8 bg-white border border-border-subtle rounded-2xl transition-all hover:-translate-y-1 hover:border-accent-indigo/30 hover:shadow-[0_20px_40px_rgba(73,83,245,0.06)]"
            >
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className={`p-3 rounded-xl bg-accent-indigo/[0.08] text-accent-indigo transition-transform group-hover:scale-110 duration-300`}>
                    <service.icon size={28} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-accent-indigo tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
