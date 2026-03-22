"use client";

import { motion } from "framer-motion";
import { Ticket, Star, Calendar } from "lucide-react";

export default function FringeShow() {
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
            <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-bold">The Main Event</h2>
            <h3 className="text-6xl md:text-8xl font-serif text-white leading-none">Blink of <br />an Eye</h3>
          </div>
          
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="text-gold fill-gold" size={20} />
            ))}
            <span className="text-white/40 uppercase tracking-widest text-xs ml-2 self-center">5 Star Comedy Magic</span>
          </div>

          <p className="text-white/60 text-xl leading-relaxed max-w-xl font-light">
            After a sell-out run in 2024, Jamie Leonard returns to the Edinburgh Fringe with a high-energy blend of laugh-out-loud comedy and mind-bending sleight of hand in "Blink of an Eye".
          </p>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Location</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold">Gilded Balloon</p>
            </div>
            <div className="space-y-2">
                <span className="text-white/30 uppercase tracking-widest text-[10px]">Time</span>
                <p className="text-white uppercase tracking-wider text-sm font-bold">18:45 Daily</p>
            </div>
          </div>

          <a href="#" className="inline-flex items-center gap-4 group">
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-black transition-transform group-hover:scale-110">
                <Ticket size={24} />
            </div>
            <div className="space-y-1">
                <p className="text-white uppercase tracking-[0.2em] font-bold text-sm">Book Tickets Now</p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">Starting from £12.00</p>
            </div>
          </a>
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
            alt="Blink of an Eye" 
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute -bottom-10 -right-10 bg-white p-8 hidden md:block">
            <Calendar className="text-black mb-4" size={32} />
            <p className="text-black font-serif text-2xl leading-none italic">Sold Out <br /> 2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
