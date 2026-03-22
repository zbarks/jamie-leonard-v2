"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { MapPin, Calendar as CalendarIcon, ExternalLink } from "lucide-react";

const dates = [
    { date: "Aug 08 - Aug 30", event: "Blink of an Eye (Fringe)", location: "Pleasance Courtyard, Edinburgh", status: "Tickets Available" },
    { date: "Sep 12", event: "Private Gala", location: "St Andrews", status: "Private" },
    { date: "Oct 05", event: "Magic Circle Showcase", location: "London", status: "Invited Only" },
    { date: "Nov 20", event: "Corporate Launch", location: "Glasgow", status: "Sold Out" },
    { date: "Dec 15 - Dec 24", event: "Christmas Residence", location: "Edinburgh", status: "Booking Open" },
];

export default function Calendar() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <CalendarIcon className="text-gold" size={24} />
                <h1 className="text-sm uppercase tracking-[0.5em] text-white/40 font-bold">Appearances</h1>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-none">Tour <br />Calendar</h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-20 font-bold">Note: These can be changed by Barker Digital</p>

            <div className="space-y-4">
                {dates.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 border border-white/5 hover:border-gold/30 hover:bg-white/[0.02] transition-all duration-300 rounded-sm gap-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                            <span className="text-gold font-bold tracking-widest uppercase text-xs w-32">{item.date}</span>
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif text-white mb-1 group-hover:text-gold transition-colors">{item.event}</h3>
                                <div className="flex items-center gap-2 text-white/30">
                                    <MapPin size={12} />
                                    <span className="text-[10px] uppercase tracking-widest">{item.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${
                                item.status === "Tickets Available" || item.status === "Booking Open" 
                                ? "border-gold/50 text-gold" 
                                : "border-white/10 text-white/20"
                            }`}>
                                {item.status}
                            </span>
                            {(item.status === "Tickets Available" || item.status === "Booking Open") && (
                                <a href="#" className="text-white hover:text-gold transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-20 glass p-12 text-center rounded-sm">
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs mb-6 font-bold">Inquire for unlisted dates</p>
                <a href="/#booking" className="text-white text-3xl md:text-5xl font-serif border-b border-gold/50 pb-2 hover:text-gold hover:border-gold transition-all">
                    Book an Appearance
                </a>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
