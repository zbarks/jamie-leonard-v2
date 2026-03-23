"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Ticket } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    // Simple parallax effect on scroll
    gsap.to(imageRef.current, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

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
      {/* Background Image Wrapper */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] z-0"
      >
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0 max-w-[1400px] mx-auto overflow-hidden">
          <Image 
            src="/assets/images/hero-web-new.jpg"
            alt="Jamie Leonard Magician"
            fill
            priority
            className="object-contain object-center grayscale-[20%] contrast-110 p-12 md:p-32"
          />
        </div>
        
        {/* Mobile Image */}
        <div className="md:hidden absolute inset-0">
          <Image 
            src="/assets/images/hero-mobile-new.jpg"
            alt="Jamie Leonard Magician"
            fill
            priority
            className="object-cover object-center grayscale-[20%] contrast-110"
          />
        </div>

        {/* Gradients to blend and focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
        
        {/* Extra bottom blend for the next section */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 pointer-events-none mt-20">
        <h1 className="text-7xl md:text-[14rem] font-serif mb-4 leading-none tracking-tighter uppercase text-white drop-shadow-2xl">
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
