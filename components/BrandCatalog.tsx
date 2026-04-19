import WatchCard from "./WatchCard";
import { Watch } from "@/lib/api";

type BrandCatalogProps = {
  brands: string[];
  watches: Watch[];
};

export default function BrandCatalog({ brands, watches }: BrandCatalogProps) {
  return (
    <section id="catalog" className="py-24">
      <div className="container-luxury">
        <div className="mb-12">
          <p className="section-kicker mb-3">Catalog</p>
          <h2 className="section-title">Browse by brand</h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Explora nuestra colección de relojes por marca.
          </p>
        </div>

        <div className="space-y-16">
          {brands.map((brand) => {
            const filtered = watches.filter((watch) => watch.marca === brand);

            if (filtered.length === 0) return null;

            return (
              <div key={brand}>
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-[rgba(180,128,44,0.16)] pb-4">
                  <div>
                    <h3 className="text-3xl font-semibold text-[var(--text)]">
                      {brand}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {filtered.length} reloj{filtered.length !== 1 ? "es" : ""}
                    </p>
                  </div>

                  <span className="rounded-full border border-[rgba(248,224,124,0.18)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">
                    Brand Collection
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((watch) => (
                    <WatchCard key={watch.id} watch={watch} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}