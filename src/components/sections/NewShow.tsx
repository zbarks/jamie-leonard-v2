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
            His most ambitious show yet. Jamie Leonard explores the fine line between reality and illusion in a high-speed, 50-minute rollercoaster of comedy and impossible feats.
          </p>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Venue</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold text-gold">Pleasance Courtyard</p>
            </div>
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Availability</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold">Aug 08 - 30</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="https://tickets.edfringe.com" target="_blank" className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all duration-300 rounded-full">
                <Ticket size={16} />
                Free Tickets
            </a>
            <a href="/past-shows" className="flex items-center justify-center gap-3 px-10 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:border-white transition-all duration-300 rounded-full">
                Past Shows
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
            src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=1200" 
            alt="Blink of an Eye Show" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
