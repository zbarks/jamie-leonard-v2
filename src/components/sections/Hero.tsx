"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Ticket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.to(textRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "50% top",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[110vh] bg-black overflow-hidden flex items-center justify-center">
      {/* Subtle Textured Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 noise"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>
        
        {/* Subtle glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 pointer-events-none mt-20">
        <h1 className="text-7xl md:text-[14rem] font-serif mb-4 leading-none tracking-tighter uppercase text-white">
            Jamie <br /> Leonard
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] w-8 md:w-16 bg-gold/50"></div>
            <p className="text-gold text-[10px] md:text-sm tracking-[0.4em] uppercase font-sans font-medium max-w-[280px] md:max-w-none leading-relaxed">
                One of UK’s no.1 rising stars in magic
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-gold/50"></div>
        </div>
        
        <div className="flex justify-center gap-4 pointer-events-auto">
            <a href="#fringe" className="flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-gold hover:text-white transition-all duration-300 rounded-full group">
                <Ticket size={16} className="group-hover:rotate-12 transition-transform" />
                Blink of an Eye
            </a>
            <a href="#booking" className="hidden md:flex items-center gap-3 px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-all duration-300 rounded-full">
                Enquire
            </a>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-50 mb-2">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
