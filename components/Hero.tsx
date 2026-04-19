import Link from "next/link";

export default function Hero() {
  const particles = Array.from({ length: 18 });

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[rgba(180,128,44,0.08)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(180,128,44,0.15),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(248,224,124,0.08),transparent_18%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((_, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-[rgba(248,224,124,0.35)]"
            style={{
              width: `${(i % 4) + 2}px`,
              height: `${(i % 4) + 2}px`,
              left: `${(i * 7 + 8) % 100}%`,
              top: `${(i * 11 + 12) % 100}%`,
              animationDelay: `${i * 0.45}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="container-luxury relative grid min-h-[88vh] items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="section-kicker mb-5">Your key to luxury watches</p>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-[var(--text)] md:text-6xl xl:text-7xl">
            Curated timepieces for collectors with taste.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Discover premium and luxury watches from the world’s most respected
            houses. Explore our catalog by brand, search by reference, and
            experience a more elegant way to buy, sell, and source exceptional
            timepieces.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/catalogo" className="gold-button">
              View Catalog
            </Link>

            <a href="/#services" className="outline-button">
              Our Services
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
            <div>
              <span className="block text-3xl font-semibold text-[var(--gold-soft)]">
                100%
              </span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                Authenticity-driven
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-[var(--gold-soft)]">
                Top
              </span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                Luxury brands
              </span>
            </div>
            <div>
              <span className="block text-3xl font-semibold text-[var(--gold-soft)]">
                Global
              </span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                Client support
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-[360px] w-[360px] rounded-full bg-[rgba(180,128,44,0.14)] blur-3xl" />

          <div className="relative">
            <img
              src="/img/rolex-hero.png"
              alt="Rolex hero"
              className="rolex-float relative z-10 mx-auto w-full max-w-[420px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />

            <div className="absolute left-[-10px] top-[40px] rounded-full border border-[rgba(248,224,124,0.22)] bg-[rgba(17,17,17,0.85)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)] backdrop-blur">
              Featured selection
            </div>

            <div className="absolute bottom-[10px] right-[-10px] rounded-[20px] border border-[rgba(180,128,44,0.18)] bg-[rgba(17,17,17,0.88)] p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Luxury Catalog
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">
                Rolex • Omega • Seiko
              </h3>
              <Link
                href="/catalogo"
                className="mt-3 inline-flex text-sm text-[var(--gold-soft)]"
              >
                Browse →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}