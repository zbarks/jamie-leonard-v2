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
    { name: "The Show", href: "/#fringe" },
    { name: "Calendar", href: "/calendar" },
    { name: "Past", href: "/past-shows" },
    { name: "Gallery", href: "/#gallery" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-20 py-8 ${isScrolled ? "bg-black/80 backdrop-blur-lg py-5 border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg md:text-xl font-serif text-white tracking-[0.3em] uppercase">Jamie Leonard</span>
        </Link>

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-serif text-white uppercase tracking-widest">Jamie Leonard</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-12">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-serif text-white/90 hover:text-gold transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              <Link 
                href="/#booking"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-6 bg-white text-black font-bold uppercase tracking-[0.3em] mt-10 text-center text-sm"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
