"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Bharath Aadhya Intelligence transformed our approach to open innovation. Their platform made running a global hiring hackathon seamless and highly effective.",
    author: "Arjun Mehta",
    role: "VP of Engineering, Infosys",
    avatar: "https://i.pravatar.cc/150?u=arjun",
  },
  {
    quote: "The quality of talent we discovered through the BAI Innovation Challenge was exceptional. It's the best ecosystem for identifying top-tier builders in AI.",
    author: "Priya Sharma",
    role: "Innovation Lead, Wipro",
    avatar: "https://i.pravatar.cc/150?u=priya",
  },
  {
    quote: "A game-changer for our CSR initiatives. We reached thousands of innovators and solved real-world challenges with the help of their expert team.",
    author: "Rohan Das",
    role: "Director of CSR, HCLTech",
    avatar: "https://i.pravatar.cc/150?u=rohan",
  },
];

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-display font-black text-foreground mb-4 tracking-tight uppercase"
          >
            TRUSTED BY THE BEST
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted font-medium"
          >
            Delivering excellence for India's innovation leaders.
          </motion.p>
        </div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_60%] px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-border-subtle p-10 md:p-16 rounded-[2rem] relative flex flex-col items-center text-center shadow-sm"
                >
                  <Quote size={40} className="text-accent-indigo opacity-20 mb-8" />
                  <p className="text-xl md:text-2xl font-medium text-foreground italic leading-relaxed mb-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full border-2 border-accent-indigo mb-4"
                    />
                    <div className="font-black text-foreground uppercase tracking-wider">
                      {testimonial.author}
                    </div>
                    <div className="text-sm font-bold text-muted">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
