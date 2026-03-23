"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";

const images = [
  { url: "/assets/images/gallery-1.jpg", title: "Signature Style" },
  { url: "/assets/images/gallery-2.jpg", title: "Street Magic" },
  { url: "/assets/images/gallery-3.jpg", title: "Impossible Feats" },
  { url: "/assets/images/gallery-4.jpg", title: "Mind Control" },
  { url: "/assets/images/gallery-5.jpg", title: "The Performance" },
  { url: "/assets/images/gallery-6.jpg", title: "Sleight of Hand" },
  { url: "/assets/images/gallery-7.jpg", title: "The Moment" },
  { url: "/assets/images/gallery-8.jpg", title: "Magic in Edinburgh" },
  { url: "/assets/images/gallery-9.jpg", title: "Wonder" },
];

export default function Gallery() {
  return (
    <section className="py-24 px-6 md:px-20 bg-black" id="gallery">
      <div className="max-w-7xl mx-auto">
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
                className="object-cover object-top w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <Maximize2 className="text-white/80 w-8 h-8 transform scale-90 group-hover:scale-100 transition-transform duration-500" />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
