import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import FeaturedCarousel from "@/components/FeaturedCarousel";
      
import ScrollWatchShowcase from "@/components/ScrollWatchShowcase";
import AboutSection from "@/components/AboutSection";

import Footer from "@/components/Footer";
import { getWatches } from "@/lib/api";

export default async function Home() {
  // Aquí está el truco: pedimos solo los destacados (featuredOnly = true)
  const featuredWatches = await getWatches("", "", true);

  return (
    <main>
      <Navbar />
      <HeroVideo />
      {/* Si hay relojes, mostramos el carrusel, si no, no se ve vacío */}
      {featuredWatches.length > 0 && (
        <FeaturedCarousel watches={featuredWatches} />
      )}
      {/* El resto de tus componentes */}
      <ScrollWatchShowcase />
      <AboutSection />

      <Footer />
    </main>
  );
}