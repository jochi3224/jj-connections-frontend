import Navbar from "@/components/Navbar";
import CatalogSection from "@/components/CatalogSection";
import Footer from "@/components/Footer";
import { getBrandsFromWatches, getWatches } from "@/lib/api";

type CatalogPageProps = {
  searchParams?: Promise<{
    search?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const search = resolvedSearchParams?.search || "";

  const watches = await getWatches();
  const brands = getBrandsFromWatches(watches);

  return (
    <main>
      <Navbar />
      <CatalogSection
        watches={watches}
        brands={brands}
        currentBrand="all"
        currentSearch={search}
        title="Full catalog"
        subtitle="Search by reference, model, or brand and explore the full collection organized by brand."
      />
      <Footer />
    </main>
  );
}