"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

const images = [
  { url: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800", title: "Close-up Sleight" },
  { url: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&q=80&w=800", title: "Mentalism" },
  { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800", title: "Street Magic" },
  { url: "https://images.unsplash.com/photo-1549413645-316279f64c6b?auto=format&fit=crop&q=80&w=800", title: "Corporate Gala" },
  { url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800", title: "Wedding Reception" },
  { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", title: "Private Party" },
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-20 bg-black" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif gold-gradient mb-4"
          >
            Visual Chronicles
          </motion.h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square group overflow-hidden cursor-pointer rounded-sm"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-8 text-center">
                <Maximize2 className="text-gold mb-4 w-8 h-8 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                <h4 className="text-white font-serif text-2xl tracking-wide">{img.title}</h4>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
