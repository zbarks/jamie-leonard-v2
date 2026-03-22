"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Send, Clock, MapPin, Sparkles } from "lucide-react";

const showTypes = [
  { id: "corporate", label: "Corporate Magic", desc: "Sleight of hand for galas and mixers." },
  { id: "wedding", label: "Wedding Entertainment", desc: "Interactive magic for your special day." },
  { id: "private", label: "Private Events", desc: "Intimate performances for house parties." },
  { id: "theatre", label: "Theatre / Fringe", desc: "Full stage show bookings." }
];

export default function Booking() {
  const [selectedType, setSelectedType] = useState(showTypes[0].id);

  return (
    <section className="py-32 px-6 md:px-20 bg-black relative overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.5em] text-white/30 font-bold mb-6">Inquiries</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight">Bring the <br /> Magic to You</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
                <Clock className="text-gold shrink-0" size={20} />
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Fast Response</h4>
                    <p className="text-white/40 text-sm">Usually replies within 4 hours.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <MapPin className="text-gold shrink-0" size={20} />
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Location</h4>
                    <p className="text-white/40 text-sm">Based in Edinburgh. Travels UK wide.</p>
                </div>
            </div>
          </div>

          <div className="space-y-4 pt-10 border-t border-white/5">
            <p className="text-white/20 uppercase tracking-[0.3em] text-[10px]">Select Performance Type</p>
            <div className="grid grid-cols-1 gap-3">
                {showTypes.map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`flex items-center justify-between p-6 transition-all duration-300 rounded-sm border ${
                            selectedType === type.id 
                            ? "bg-white border-white text-black translate-x-4" 
                            : "bg-transparent border-white/10 text-white hover:border-white/30"
                        }`}
                    >
                        <div className="text-left">
                            <span className="block font-bold uppercase tracking-wider text-sm">{type.label}</span>
                            <span className={`text-[10px] uppercase tracking-widest ${selectedType === type.id ? "text-black/50" : "text-white/30"}`}>
                                {type.desc}
                            </span>
                        </div>
                        <ChevronRight size={18} className={selectedType === type.id ? "opacity-100" : "opacity-20"} />
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] p-10 md:p-16 border border-white/5 relative"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-gold/50"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-gold/50"></div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Your Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="Enter name" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="hello@example.com" />
                </div>
                <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Event Date</label>
                    <input type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="DD/MM/YYYY" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all resize-none" placeholder="Tell Jamie about your event..." />
              </div>

              <button className="group flex items-center gap-4 w-full justify-center py-6 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500">
                <Send size={18} />
                Send Inquiry
                <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
