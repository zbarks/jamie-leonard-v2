"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { Star, Trophy, History } from "lucide-react";

const pastShows = [
  {
    title: "Wonder Boy",
    year: "2024 - 2026",
    description: "After a sell-out run, Wonder Boy became Jamie's signature high-energy blend of laugh-out-loud comedy and mind-bending sleight of hand. A breakout success that toured across the UK.",
    image: "/assets/images/wonder-boy.jpg",
    stats: "Touring Production • Sell-out Run"
  }
];

export default function PastShows() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <History className="text-gold" size={24} />
                <h1 className="text-sm uppercase tracking-[0.5em] text-white/40 font-bold">The Archive</h1>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif text-white mb-20 leading-none">Past <br />Productions</h2>

            <div className="space-y-32">
                {pastShows.map((show, idx) => (
                    <motion.div 
                        key={show.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                    >
                        <div className="flex-1 space-y-8">
                            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                <h3 className="text-4xl md:text-5xl font-serif text-white">{show.title}</h3>
                                <span className="text-gold font-bold tracking-widest text-xs uppercase">{show.year}</span>
                            </div>
                            <p className="text-white/60 text-lg leading-relaxed">{show.description}</p>
                            <div className="flex items-center gap-3">
                                <Trophy size={16} className="text-gold" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{show.stats}</span>
                            </div>
                        </div>
                        <div className="flex-1 relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm group">
                            <img src={show.image} alt={show.title} className="w-full h-full object-contain bg-zinc-900 group-hover:scale-105 transition-all duration-700" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
