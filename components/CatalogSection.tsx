import Link from "next/link";
import { Watch } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

type CatalogSectionProps = {
  watches: Watch[];
  brands: string[];
  currentBrand?: string;
  currentSearch?: string;
  title?: string;
  subtitle?: string;
};

// ─── Macro brand config — add more here as you expand ────────────────────────
// These render as full featured sections with custom accent color + description.
// Brands NOT in this list fall into the "Other Brands" section at the bottom.
const MACRO_BRANDS: Record<string, { label: string; tagline: string; accent: string }> = {
  rolex: {
    label: "Rolex",
    tagline: "The crown of horology. Precision, prestige, and enduring value.",
    accent: "#c0a050",
  },
  omega: {
    label: "Omega",
    tagline: "Master of time since 1848. Worn on the moon, trusted worldwide.",
    accent: "#7a9bb5",
  },
  breitling: {
    label: "Breitling",
    tagline: "Born for the skies. Precision instruments for pilots and explorers.",
    accent: "#d4a843",
  },
};

// Display order for macro brands
const MACRO_ORDER = ["rolex", "omega", "breitling"];

// ─── Watch card ───────────────────────────────────────────────────────────────
function WatchCard({ watch }: { watch: Watch }) {
  const image =
    watch.galeria?.[0]?.url ||
    (watch.imagen_url?.trim() ? watch.imagen_url : "/images/placeholder-watch.jpg");

  const msg = encodeURIComponent(
    `Hello, I'm interested in:\n\n*${watch.nombre}*\nRef: ${watch.referencia || "N/A"}\nPrice: ${formatPrice(watch.precio, watch.moneda)}`
  );

  return (
    <article className="luxury-card group overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden border-b border-[rgba(180,128,44,0.12)] bg-[linear-gradient(145deg,#1e2228,#0f1215)]">
        <img
          src={image}
          alt={watch.nombre}
          className="h-full w-full bg-white object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Corner accent top-right */}
        <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[rgba(180,128,44,0.35)]" />
        {watch.condicion && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full border border-[rgba(248,224,124,0.18)] bg-[rgba(11,12,14,0.85)] px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            {watch.condicion}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">
            {watch.marca}
          </span>
          {watch.referencia && (
            <span className="shrink-0 text-[0.58rem] text-[var(--muted)] opacity-50">
              Ref. {watch.referencia}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold leading-snug text-[var(--text)] group-hover:text-[var(--gold-soft)] transition-colors duration-200"
          style={{ fontFamily: "'Georgia', serif" }}>
          {watch.nombre}
        </h3>

        {watch.modelo && (
          <p className="mt-0.5 text-[0.7rem] text-[var(--muted)] opacity-55">{watch.modelo}</p>
        )}

        <div className="my-3 h-px w-6 bg-gradient-to-r from-[var(--gold)] to-transparent opacity-40 transition-all duration-300 group-hover:w-full" />

        <p className="text-xl font-bold text-[var(--gold-soft)]"
          style={{ fontFamily: "'Georgia', serif" }}>
          {formatPrice(watch.precio, watch.moneda)}
        </p>

        <div className="mt-4 flex gap-2">
          <Link href={`/reloj/${watch.documentId || watch.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[rgba(248,224,124,0.2)] py-2 text-[0.7rem] uppercase tracking-[0.12em] text-[var(--text)] transition-all duration-200 hover:border-[rgba(248,224,124,0.45)] hover:bg-[rgba(180,128,44,0.06)] hover:text-[var(--gold-soft)]">
            View
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </Link>
          <a href={`https://wa.me/16892671285?text=${msg}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl px-3 py-2 text-[0.7rem] font-bold text-black transition-all duration-200 hover:scale-[1.04]"
            style={{ background: "linear-gradient(115deg,#B4802C,#F8E07C 60%,#C9942A)" }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Macro brand section ──────────────────────────────────────────────────────
function MacroBrandSection({
  brandKey,
  watches,
}: {
  brandKey: string;
  watches: Watch[];
}) {
  const config = MACRO_BRANDS[brandKey];
  if (!config || watches.length === 0) return null;

  const preview = watches.slice(0, 6);
  const hasMore = watches.length > 6;

  return (
    <section id={`brand-${brandKey}`} className="relative scroll-mt-24">
      {/* Brand header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Brand name with accent line */}
          <div className="flex items-center gap-4 mb-2">
            <div className="h-8 w-[3px] rounded-full" style={{ background: config.accent }} />
            <h2 className="text-3xl font-bold text-[var(--text)] sm:text-4xl"
              style={{ fontFamily: "'Georgia', serif" }}>
              {config.label}
            </h2>
          </div>
          <p className="ml-7 text-sm leading-6 text-[var(--muted)] max-w-lg">
            {config.tagline}
          </p>
          <p className="ml-7 mt-1 text-[0.65rem] uppercase tracking-[0.22em]" style={{ color: config.accent, opacity: 0.7 }}>
            {watches.length} {watches.length === 1 ? "timepiece" : "timepieces"} available
          </p>
        </div>

        <Link
          href={`/catalogo/${encodeURIComponent(brandKey)}`}
          className="ml-7 inline-flex items-center gap-2 self-start rounded-full border border-[rgba(248,224,124,0.22)] px-5 py-2.5 text-[0.73rem] uppercase tracking-[0.18em] text-[var(--gold)] transition-all duration-200 hover:border-[var(--gold-soft)] hover:bg-[rgba(180,128,44,0.06)] hover:text-[var(--gold-soft)] sm:ml-0 sm:self-auto"
        >
          View all {config.label}
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </Link>
      </div>

      {/* Divider with tick marks */}
      <div className="mb-8 flex items-center gap-[3px]">
        <div className="h-px w-7 opacity-60" style={{ background: config.accent }} />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            width: 1, height: i % 4 === 0 ? 12 : 6,
            background: config.accent,
            opacity: i % 4 === 0 ? 0.45 : 0.12,
          }} />
        ))}
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(180,128,44,0.2)] to-transparent" />
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {preview.map((watch) => (
          <WatchCard key={watch.id} watch={watch} />
        ))}
      </div>

      {/* See more row */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href={`/catalogo/${encodeURIComponent(brandKey)}`}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(180,128,44,0.2)] bg-[rgba(14,15,18,0.8)] px-8 py-3 text-sm text-[var(--muted)] transition-all duration-200 hover:border-[rgba(248,224,124,0.35)] hover:text-[var(--gold-soft)]"
          >
            + {watches.length - 6} more {config.label} watches
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 7h10M7 2l5 5-5 5" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}

// ─── Other brands compact section ─────────────────────────────────────────────
function OtherBrandsSection({ groups }: { groups: { brand: string; watches: Watch[] }[] }) {
  if (groups.length === 0) return null;

  return (
    <section className="relative">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-8 w-[3px] rounded-full bg-[rgba(180,128,44,0.4)]" />
          <h2 className="text-2xl font-bold text-[var(--text)] sm:text-3xl"
            style={{ fontFamily: "'Georgia', serif" }}>
            More Brands
          </h2>
        </div>
        <p className="ml-7 text-sm text-[var(--muted)]">
          {groups.reduce((acc, g) => acc + g.watches.length, 0)} timepieces across {groups.length} {groups.length === 1 ? "brand" : "brands"}
        </p>
      </div>

      <div className="mb-8 flex items-center gap-[3px]">
        <div className="h-px w-7 bg-[rgba(180,128,44,0.4)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="bg-[var(--gold)]" style={{
            width: 1, height: i % 4 === 0 ? 12 : 6,
            opacity: i % 4 === 0 ? 0.3 : 0.1,
          }} />
        ))}
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(180,128,44,0.15)] to-transparent" />
      </div>

      <div className="space-y-10">
        {groups.map(({ brand, watches }) => (
          <div key={brand}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-[var(--text)]"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  {brand}
                </h3>
                <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[var(--gold)] opacity-60">
                  {watches.length} {watches.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
              <Link href={`/catalogo/${encodeURIComponent(brand.toLowerCase())}`}
                className="shrink-0 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)] transition hover:text-[var(--gold-soft)]">
                View all →
              </Link>
            </div>
            <div className="h-px mb-5 bg-gradient-to-r from-[rgba(180,128,44,0.2)] to-transparent" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {watches.slice(0, 4).map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
            {watches.length > 4 && (
              <div className="mt-5">
                <Link href={`/catalogo/${encodeURIComponent(brand.toLowerCase())}`}
                  className="text-sm text-[var(--muted)] transition hover:text-[var(--gold-soft)]">
                  + {watches.length - 4} more →
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({
  brands, macroKeys, currentBrand, currentSearch,
}: {
  brands: string[];
  macroKeys: string[];
  currentBrand: string;
  currentSearch: string;
}) {
  // Macro brands that actually have watches
  const macroLabels = macroKeys
    .filter((k) => brands.some((b) => b.toLowerCase() === k))
    .map((k) => MACRO_BRANDS[k].label);

  // Extra brands not in macro
  const extraBrands = brands.filter(
    (b) => !macroKeys.includes(b.toLowerCase())
  );

  return (
    <div className="mb-10 rounded-[24px] border border-[rgba(180,128,44,0.18)] bg-[rgba(14,15,18,0.9)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <form action="/catalogo" method="GET" className="w-full lg:max-w-sm">
          <div className="flex items-center gap-2 rounded-full border border-[rgba(180,128,44,0.22)] bg-[rgba(255,255,255,0.02)] px-4 py-2.5 focus-within:border-[rgba(180,128,44,0.5)] transition-colors">
            <svg width="13" height="13" viewBox="0 0 15 15" fill="none" stroke="rgba(180,128,44,0.55)" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="6.5" cy="6.5" r="4.5" /><path d="M10 10l3.5 3.5" />
            </svg>
            <input type="text" name="search" defaultValue={currentSearch}
              placeholder="Brand, model or reference…"
              className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]" />
            <button type="submit"
              className="rounded-full bg-[var(--gold)] px-3 py-1.5 text-[0.65rem] font-bold text-black hover:bg-[var(--gold-soft)] transition">
              Go
            </button>
          </div>
        </form>

        {/* Brand pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* All */}
          <Link href="/catalogo"
            className={`rounded-full border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
              currentBrand === "all"
                ? "border-[var(--gold-soft)] bg-[var(--gold)] text-black"
                : "border-[rgba(180,128,44,0.22)] text-[var(--text)] hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
            }`}>
            All
          </Link>

          {/* Macro brand pills */}
          {macroLabels.map((label) => {
            const key = label.toLowerCase();
            const active = currentBrand.toLowerCase() === key;
            return (
              <Link key={label}
                href={`/catalogo/${encodeURIComponent(key)}`}
                className={`rounded-full border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                  active
                    ? "border-[var(--gold-soft)] bg-[var(--gold)] text-black"
                    : "border-[rgba(180,128,44,0.22)] text-[var(--text)] hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
                }`}>
                {label}
              </Link>
            );
          })}

          {/* More brands dropdown */}
          {extraBrands.length > 0 && (
            <details className="relative">
              <summary className="list-none cursor-pointer rounded-full border border-[rgba(180,128,44,0.22)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.12em] text-[var(--text)] transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]">
                More ▾
              </summary>
              <div className="absolute left-0 z-30 mt-2 w-64 rounded-[18px] border border-[rgba(180,128,44,0.18)] bg-[rgba(11,12,14,0.98)] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="grid max-h-[280px] grid-cols-1 gap-1 overflow-y-auto">
                  {extraBrands.map((brand) => (
                    <Link key={brand}
                      href={`/catalogo/${encodeURIComponent(brand.toLowerCase())}`}
                      className="rounded-xl px-3 py-2.5 text-sm text-[var(--text)] transition hover:bg-[rgba(180,128,44,0.1)] hover:text-[var(--gold-soft)]">
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function CatalogSection({
  watches,
  brands,
  currentBrand = "all",
  currentSearch = "",
  title = "Browse by brand",
  subtitle = "Explore our collection organized by brand.",
}: CatalogSectionProps) {
  const q = currentSearch.trim().toLowerCase();

  // ── Filtered view (brand selected or search active) ──
  const filtered = watches.filter((w) => {
    const matchBrand =
      currentBrand === "all" || (w.marca || "").toLowerCase() === currentBrand.toLowerCase();
    if (!q) return matchBrand;
    const hay = [w.nombre, w.modelo, w.referencia, w.marca, w.material]
      .filter(Boolean).join(" ").toLowerCase();
    return matchBrand && hay.includes(q);
  });

  // ── Grouped view (all brands, no search) ──
  // Build macro groups first, then others
  const macroGroups = MACRO_ORDER.map((key) => ({
    key,
    watches: watches.filter((w) => (w.marca || "").toLowerCase() === key),
  })).filter((g) => g.watches.length > 0);

  const macroKeys = macroGroups.map((g) => g.key);

  const otherGroups = brands
    .filter((b) => !macroKeys.includes(b.toLowerCase()))
    .map((brand) => ({
      brand,
      watches: watches.filter((w) => (w.marca || "").toLowerCase() === brand.toLowerCase()),
    }))
    .filter((g) => g.watches.length > 0)
    .sort((a, b) => a.brand.localeCompare(b.brand));

  const isGroupedView = currentBrand === "all" && !q;

  return (
    <section id="catalog" className="py-20">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="section-kicker mb-3">Catalog</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">{subtitle}</p>
        </div>

        {/* Filter bar */}
        <FilterBar
          brands={brands}
          macroKeys={MACRO_ORDER}
          currentBrand={currentBrand}
          currentSearch={currentSearch}
        />

        {/* Results count */}
        <p className="mb-10 text-sm text-[var(--muted)]">
          {isGroupedView
            ? `${watches.length} watch${watches.length !== 1 ? "es" : ""} across ${brands.length} brand${brands.length !== 1 ? "s" : ""}`
            : `${filtered.length} watch${filtered.length !== 1 ? "es" : ""} found`}
        </p>

        {/* ── Grouped view ── */}
        {isGroupedView && (
          <div className="space-y-20">
            {macroGroups.map((g) => (
              <MacroBrandSection key={g.key} brandKey={g.key} watches={g.watches} />
            ))}
            <OtherBrandsSection groups={otherGroups} />
          </div>
        )}

        {/* ── Filtered view ── */}
        {!isGroupedView && (
          <>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">No results</p>
                <h3 className="mb-3 text-2xl font-semibold text-[var(--text)]"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  No watches found
                </h3>
                <p className="mb-6 text-sm text-[var(--muted)]">
                  Try adjusting your search or clearing the filters.
                </p>
                <Link href="/catalogo" className="gold-button text-sm">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((watch) => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
