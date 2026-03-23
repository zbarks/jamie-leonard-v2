import Hero from "@/components/sections/Hero";
import NewShow from "@/components/sections/NewShow";
import Gallery from "@/components/sections/Gallery";
import Booking from "@/components/sections/Booking";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />
      <Hero />
      <NewShow />
      <Booking />
      <Footer />
    </main>
  );
}
