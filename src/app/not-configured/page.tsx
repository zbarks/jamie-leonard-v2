import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";

export default function NotConfigured() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="glass p-12 max-w-2xl rounded-sm border border-gold/20">
        <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center animate-pulse">
                <Info size={32} className="text-gold" />
            </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Experience Pending</h1>
        <div className="w-20 h-[1px] bg-gold mx-auto mb-8"></div>
        
        <p className="text-gold-light/60 text-lg md:text-xl uppercase tracking-[0.2em] font-sans mb-10 leading-relaxed">
            NOT CONFIGURED YET BY BARKER DIGITAL
        </p>
        
        <p className="text-white/40 text-sm mb-12 max-w-md mx-auto">
            This bespoke feature is currently being prepared for your brand. Arrange a strategy call with our team to activate this section.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-xs"
          >
            <ChevronLeft size={16} />
            Return to the Magic
          </Link>
          <a 
            href="https://barkerdigital.co.uk" 
            target="_blank"
            className="px-10 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-dark transition-all rounded-sm"
          >
            Contact Barker Digital
          </a>
        </div>
      </div>
    </div>
  );
}
