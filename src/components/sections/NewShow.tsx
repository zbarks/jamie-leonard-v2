"use client";

import { motion } from "framer-motion";
import { Ticket, ArrowRight } from "lucide-react";

export default function NewShow() {
  return (
    <section className="py-32 px-6 md:px-20 bg-black relative overflow-hidden" id="fringe">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 space-y-10"
        >
          <div className="space-y-4">
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-bold">New for 2026</h2>
            <h3 className="text-6xl md:text-8xl font-serif text-white leading-none">Blink of <br />an Eye</h3>
          </div>
          
          <p className="text-white/60 text-xl leading-relaxed max-w-xl font-light">
            Following a hit 2025 Fringe, with five-star reviews and a Best Show nomination (MixUpTheatre.com), Jamie Leonard presents Blink of an Eye: a sharp, story-driven hour of comedy and magic that will leave heads spinning.
          </p>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Venue</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold text-gold">Liquid Rooms</p>
            </div>
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Dates</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold">Aug 08 - 30</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="/the-show" className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all duration-300 rounded-full">
                The Show
                <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="flex-1 relative aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute inset-0 border border-gold/20 translate-x-6 translate-y-6"></div>
          <img 
            src="/assets/images/blink-poster-new.jpg" 
            alt="Blink of an Eye Show" 
            className="absolute inset-0 w-full h-full object-contain bg-zinc-950"
          />
        </motion.div>
      </div>
    </section>
  );
}
