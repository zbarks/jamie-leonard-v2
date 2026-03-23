"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "887f9ee9-f4b6-4e82-9716-306c8f38aff5");
    formData.append("subject", "New Inquiry from Jamie Leonard Site");
    formData.append("from_name", "Jamie Leonard Website");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      console.log("Submitting form...", object);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      console.log("Web3Forms Response:", result);
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert("Submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-32 px-6 md:px-20 bg-black relative overflow-hidden" id="booking">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.5em] text-white/30 font-bold mb-6">Inquiries</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight">Bring the <br /> Magic to You</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
                <Clock className="text-gold shrink-0" size={20} />
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Fast Response</h4>
                    <p className="text-white/40 text-sm">Usually replies within 4 hours.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <MapPin className="text-gold shrink-0" size={20} />
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Location</h4>
                    <p className="text-white/40 text-sm">Based in Edinburgh. Travels UK wide.</p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] p-10 md:p-16 border border-white/5 relative min-h-[600px] flex flex-col justify-center"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-gold/50"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-gold/50"></div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Your Name</label>
                    <input name="name" type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="Enter name" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Email Address</label>
                        <input name="email" type="email" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="hello@example.com" required />
                    </div>
                    <div className="space-y-2 group">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Event Date</label>
                        <input name="date" type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="DD/MM/YYYY" />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Performance Type</label>
                    <input name="type" type="text" className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all" placeholder="e.g. Wedding, Corporate, Theatre" />
                  </div>

                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.4em] text-white/30 group-focus-within:text-gold transition-colors">Message</label>
                    <textarea name="message" rows={4} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white text-white transition-all resize-none" placeholder="Tell Jamie about your event..." />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center gap-4 w-full justify-center py-6 bg-white text-black font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Inquiry
                        <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                      <CheckCircle2 className="text-gold" size={40} />
                    </div>
                  </div>
                  <h4 className="text-3xl font-serif text-white tracking-wide">Inquiry Sent</h4>
                  <p className="text-white/40 text-sm leading-loose uppercase tracking-widest px-10">
                    Your magic is in motion. <br /> Jamie will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-gold uppercase tracking-[0.3em] text-[10px] pt-10 hover:text-white transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
