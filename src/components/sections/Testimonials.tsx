"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Standard Life",
    role: "Corporate Event",
    quote: "Absolutely blew our minds. Not only is the magic incredible, but the charm and professionalism were top-tier. A highlight of the night.",
    rating: 5
  },
  {
    name: "Jennifer & Mark",
    role: "Edinburgh Wedding",
    quote: "The magic made our wedding reception. Our guests are still talking about the card through the glass trick. Simply magical.",
    rating: 5
  },
  {
    name: "Private Gala",
    role: "St Andrews",
    quote: "A true master of the craft. His ability to perform under pressure and keep every single guest engaged was a masterclass in entertainment.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-20 bg-black relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(214,175,55,0.03)_0%,transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
                <h2 className="text-sm uppercase tracking-[0.4em] text-gold-light/60 font-sans mb-4">The Word on the Street</h2>
                <h3 className="text-4xl md:text-6xl font-serif text-white gold-gradient">Acclaimed Performances</h3>
            </div>
            <div className="flex gap-4">
                <div className="w-12 h-[1px] bg-gold/50 mb-4 hidden md:block"></div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-12 relative flex flex-col group hover:border-gold/30 transition-all duration-500 rounded-sm"
            >
              <Quote className="absolute top-8 right-8 text-gold/10 group-hover:text-gold/20 transition-colors w-12 h-12" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gold/80 rounded-full shadow-[0_0_10px_rgba(214,175,55,0.4)]"></div>
                ))}
              </div>

              <p className="text-white/70 italic text-xl font-serif mb-12 leading-relaxed flex-grow">
                &quot;{t.quote}&quot;
              </p>

              <div>
                <h4 className="text-white font-bold tracking-[0.2em] uppercase text-xs mb-1">{t.name}</h4>
                <p className="text-gold-light/40 text-[10px] uppercase tracking-[0.3em] font-sans">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
