"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "The Show", href: "/the-show" },
    { name: "Archive", href: "/past-shows" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-20 py-8 ${isScrolled ? "bg-black/80 backdrop-blur-lg py-5 border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo removed as requested */}
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-white/40 hover:text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link href="/#booking" className="px-8 py-3 border border-white/10 hover:border-white text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 rounded-full">
            Inquire
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col p-10 overflow-hidden"
          >
            {/* Separate blur layer for maximum effect */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-3xl" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-end items-center mb-20">
                <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-12 items-center text-center">
                {navLinks.map((link, idx) => (
                  <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-5xl font-serif text-white/90 hover:text-gold transition-colors"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                    >
                      {link.name}
                    </motion.div>
                  </Link>
                ))}
                <Link 
                  href="/#booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full max-w-xs py-6 bg-white text-black font-bold uppercase tracking-[0.3em] mt-10 text-center text-sm rounded-full"
                >
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                  >
                      Inquire
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
