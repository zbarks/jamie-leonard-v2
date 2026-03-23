"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
            <Gallery />
        </div>
      </section>

      <Footer />
    </main>
  );
}
