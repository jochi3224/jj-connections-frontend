import Navbar from "@/components/Navbar";
import CatalogSection from "@/components/CatalogSection";
import Footer from "@/components/Footer";
import { getBrandsFromWatches, getWatches } from "@/lib/api";

type BrandPageProps = {
  params: Promise<{
    marca: string;
  }>;
  searchParams?: Promise<{
    search?: string;
  }>;
};

export default async function BrandCatalogPage({
  params,
  searchParams,
}: BrandPageProps) {
  const { marca } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const search = resolvedSearchParams?.search || "";

  const watches = await getWatches();
  const brands = getBrandsFromWatches(watches);

  const marcaDecodificada = decodeURIComponent(marca || "");

  const brandMatched =
    brands.find(
      (brand) => brand.toLowerCase() === marcaDecodificada.toLowerCase()
    ) || marcaDecodificada;

  return (
    <main>
      <Navbar />
      <CatalogSection
        watches={watches}
        brands={brands}
        currentBrand={brandMatched || "all"}
        currentSearch={search}
        title={`${brandMatched || "Brand"} catalog`}
        subtitle={`Browse the ${brandMatched || "selected"} selection with search and premium presentation.`}
      />
      <Footer />
    </main>
  );
}