import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import ScrollWatchShowcase from "@/components/ScrollWatchShowcase";
import AboutSection from "@/components/AboutSection";
import OwnersSection from "@/components/OwnersSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { getWatches } from "@/lib/api";

export default async function Home() {
  const watches = await getWatches();

  return (
    <main>
      <Navbar />
      <HeroVideo />
      <FeaturedCarousel watches={watches} />
      <ScrollWatchShowcase />
      <AboutSection />
      <OwnersSection />
      <Footer />
    </main>
  );
}