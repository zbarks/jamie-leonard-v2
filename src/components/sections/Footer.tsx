import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 md:px-20 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2 space-y-8">
          <h2 className="text-3xl font-serif text-white tracking-tight uppercase">Jamie Leonard</h2>
          <p className="text-white/40 max-w-sm leading-relaxed text-lg italic font-serif">
            &quot;Magic is not just about what people see, but how it makes them feel long after the performance ends.&quot;
          </p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/jamieleonardmagic/" target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-gold transition-all duration-300 bg-white/5">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-8">Navigation</h3>
          <ul className="space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Past Shows", href: "/past-shows" },
              { name: "Gallery", href: "/gallery" },
              { name: "Bookings", href: "/#booking" }
            ].map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-white/40 hover:text-gold transition-colors tracking-widest text-[10px] uppercase font-bold">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold mb-8">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors">
              <Mail size={16} className="text-gold/50 group-hover:text-gold" />
              <a href="mailto:jamieleonardmagic@gmail.com" className="text-[10px] uppercase tracking-widest font-bold font-sans">jamieleonardmagic@gmail.com</a>
            </li>
            <li className="flex items-center gap-4 text-white/40 group cursor-pointer hover:text-white transition-colors">
              <MapPin size={16} className="text-gold/50 group-hover:text-gold" />
              <span className="text-[10px] uppercase tracking-widest font-bold font-sans">Edinburgh, Scotland</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white/10 uppercase tracking-[0.3em] font-bold">
          &copy; {new Date().getFullYear()} Jamie Leonard Magic
        </p>
        
        <div className="flex flex-col items-center md:items-end gap-2">
            <a 
                href="https://barkerdigital.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4"
            >
                <span className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-bold group-hover:text-gold transition-colors">Designed by</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
                    Barker Digital
                </span>
                <div className="w-8 h-[1px] bg-gold/20 group-hover:w-12 group-hover:bg-gold transition-all duration-300"></div>
            </a>
        </div>
      </div>
    </footer>
  );
}
