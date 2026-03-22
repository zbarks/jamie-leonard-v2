"use client";

import { motion } from "framer-motion";
import { Star, Shield, Users, Crown } from "lucide-react";

const services = [
  {
    title: "Weddings",
    description: "Elegant close-up magic to entertain guests during cocktails or the reception. Unforgettable moments for your special day.",
    icon: <Users className="w-12 h-12 text-gold" />,
    cta: "Request Wedding Brochure"
  },
  {
    title: "Corporate",
    description: "Professional entertainment designed to break the ice at networking events, galas, and product launches. Sophisticated and high-impact.",
    icon: <Shield className="w-12 h-12 text-gold" />,
    cta: "Inquire for Events"
  },
  {
    title: "Private Parties",
    description: "Exclusive performances for intimate gatherings, birthdays, and celebrations. A truly bespoke experience for your guests.",
    icon: <Star className="w-12 h-12 text-gold" />,
    cta: "Check Private Availability"
  }
];

export default function Services() {
  return (
    <section className="py-24 px-6 md:px-20 bg-black relative" id="services">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(214,175,55,0.05)_0%,transparent_70%)]"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif gold-gradient mb-6">Signature Experiences</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
            <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
              Transforming ordinary moments into extraordinary memories. Each performance is tailored to the unique energy of your event.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass p-10 group hover:border-gold transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Crown className="w-16 h-16 text-white" />
              </div>
              
              <div className="mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-4 tracking-wide">{service.title}</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <a href="#booking" className="text-gold uppercase tracking-[0.15em] font-bold text-sm flex items-center gap-2 group/btn">
                <span>{service.cta}</span>
                <span className="w-6 h-[1px] bg-gold group-hover/btn:w-10 transition-all duration-300"></span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
