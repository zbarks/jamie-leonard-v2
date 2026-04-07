"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Star, Ticket, Clock, MapPin, Quote } from "lucide-react";

const TICKET_URL = "https://www.edfringe.com/tickets/whats-on/jamie-leonard-blink-of-an-eye";

export default function TheShow() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex-1 space-y-10"
          >
            <div className="space-y-4">
              <h1 className="text-gold uppercase tracking-[0.5em] text-xs font-bold">New Production</h1>
              <h2 className="text-6xl md:text-9xl font-serif text-white leading-none">Blink of <br />an Eye</h2>
            </div>
            
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="text-gold fill-gold" size={20} />
              ))}
              <span className="text-white/40 uppercase tracking-widest text-xs ml-2 self-center font-bold">5 Star Reviews</span>
            </div>

            <p className="text-white text-xl md:text-2xl leading-relaxed font-light italic border-l-2 border-gold pl-6">
              "One of the best magic shows I’ve seen" — MixUpTheatre.com
            </p>

            <div className="space-y-6 text-white/60 text-lg leading-relaxed max-w-xl">
              <p>
                After a hugely successful 2025 Edinburgh Fringe – earning five-star reviews, multiple sell-out performances and a Best Show of the Fringe nomination (MixUpTheatre.com) – Jamie Leonard returns with Blink of an Eye, a stylish, story-driven hour of comedy and magic.
              </p>
              <p>
                Blending sharp wit, astonishing sleight of hand and moments of quiet wonder, the show explores time, attention and the things we miss when we’re not really looking.
              </p>
              <p className="font-bold text-white/80">
                "One of magic’s rising stars" — Colin Cloud
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a href={TICKET_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-10 py-5 bg-gold text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                  Check It Out
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="flex-1 relative aspect-[1/1] w-full max-w-lg"
          >
            <div className="absolute inset-0 border border-gold/20 translate-x-6 translate-y-6"></div>
            <img 
              src="/assets/images/blink-poster-new.jpg" 
              alt="Blink of an Eye Poster" 
              className="absolute inset-0 w-full h-full object-contain bg-zinc-950 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Details Bar */}
      <section className="bg-white/5 py-12 px-6 md:px-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-widest text-[10px] mb-1">Venue</p>
              <p className="text-white uppercase tracking-wider text-sm font-bold">Liquid Rooms (Warehouse)</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-widest text-[10px] mb-1">Showtime</p>
              <p className="text-white uppercase tracking-wider text-sm font-bold">12:30 PM (50 Mins)</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold">
              <Ticket size={20} />
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-widest text-[10px] mb-1">Admission</p>
              <p className="text-white uppercase tracking-wider text-sm font-bold">No Ticket Required / Free Entry</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
