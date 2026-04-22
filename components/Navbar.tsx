"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FEATURED_BRANDS = [
  { key: "rolex", label: "Rolex", accent: "#c0a050", desc: "Crown of horology" },
  { key: "omega", label: "Omega", accent: "#7a9bb5", desc: "Master of time" },
  { key: "breitling", label: "Breitling", accent: "#d4a843", desc: "Born for the skies" },
  { key: "audemars piguet", label: "Audemars Piguet", accent: "#b88a5a", desc: "Icon of prestige" },
];

const MORE_BRANDS = [
  { key: "patek philippe", label: "Patek Philippe" },
  { key: "iwc", label: "IWC" },
  { key: "tag heuer", label: "TAG Heuer" },
  { key: "panerai", label: "Panerai" },
  { key: "tudor", label: "Tudor" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Catalog", href: "/catalogo", hasMega: true },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/#contact" },
];

function TickMarkDivider() {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-[var(--gold)]"
          style={{
            width: 1,
            height: i % 3 === 0 ? 10 : 6,
            opacity: i % 3 === 0 ? 0.55 : 0.18,
          }}
        />
      ))}
    </div>
  );
}

function BrandsMegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className="absolute left-1/2 top-full z-50 hidden -translate-x-1/2 lg:block"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transform: open
          ? "translateX(-50%) translateY(0px)"
          : "translateX(-50%) translateY(-8px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}
    >
      <div className="mx-auto mb-0 h-2 w-4 overflow-hidden">
        <div
          className="mx-auto h-3 w-3 rotate-45 border-l border-t border-[rgba(180,128,44,0.25)] bg-[rgba(11,12,14,0.98)]"
          style={{ marginTop: 2 }}
        />
      </div>

      <div
        className="overflow-hidden rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
        style={{
          background: "rgba(11,12,14,0.98)",
          border: "1px solid rgba(180,128,44,0.22)",
          minWidth: 560,
        }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(248,224,124,0.35)] to-transparent" />

        <div className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.32em] text-[var(--gold)]">
                Browse by Brand
              </p>
              <p className="mt-0.5 text-[0.68rem] text-[var(--muted)] opacity-55">
                Explore by brand, model family, or reference
              </p>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-[3px]">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="bg-[var(--gold)]"
                style={{
                  width: 1,
                  height: i % 4 === 0 ? 10 : 5,
                  opacity: i % 4 === 0 ? 0.38 : 0.1,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[var(--muted)] opacity-45">
                Featured
              </p>
              {FEATURED_BRANDS.map((b) => (
                <Link
                  key={b.key}
                  href={`/catalogo/${encodeURIComponent(b.key)}`}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-[rgba(180,128,44,0.07)]"
                >
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full transition-transform duration-200 group-hover:scale-[1.4]"
                    style={{ background: b.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-sm font-semibold text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--gold-soft)]"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {b.label}
                    </p>
                    <p className="text-[0.63rem] text-[var(--muted)] opacity-50">{b.desc}</p>
                  </div>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="rgba(180,128,44,0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </Link>
              ))}
            </div>

            <div>
              <p className="mb-3 text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[var(--muted)] opacity-45">
                More Brands
              </p>
              <div className="grid gap-0.5">
                {MORE_BRANDS.map((b) => (
                  <Link
                    key={b.key}
                    href={`/catalogo/${encodeURIComponent(b.key)}`}
                    onClick={onClose}
                    className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[var(--muted)] transition-all duration-200 hover:bg-[rgba(180,128,44,0.07)] hover:text-[var(--text)]"
                  >
                    {b.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="rgba(180,128,44,0.35)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <path d="M2 7h10M7 2l5 5-5 5" />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-[rgba(180,128,44,0.1)] pt-3">
                <Link
                  href="/catalogo"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--gold)] opacity-55 transition hover:opacity-100"
                >
                  Browse full catalog
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 7h10M7 2l5 5-5 5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 120);
    }
  }, [searchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const openMega = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    timerRef.current = setTimeout(() => setMegaOpen(false), 130);
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(9,10,12,0.96)" : "rgba(11,12,14,0.76)",
          borderBottom: scrolled
            ? "1px solid rgba(180,128,44,0.22)"
            : "1px solid rgba(180,128,44,0.10)",
          backdropFilter: "blur(20px)",
          boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none",
        }}
      >
        <div className="container-luxury flex h-[64px] items-center justify-between gap-3 sm:h-[68px] sm:gap-6">
          <Link
            href="/"
            className="group flex min-w-0 flex-shrink items-center gap-2 sm:gap-3"
            onClick={() => setDrawerOpen(false)}
          >
            <div className="relative shrink-0">
              <img
                src="/img/logo-jj.png"
                alt="JJ Connections"
                className="h-9 w-auto object-contain transition-all duration-300 group-hover:brightness-110 sm:h-[52px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(248,224,124,0.18)_50%,transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
            </div>

            <div className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate text-[0.68rem] font-bold leading-none tracking-[0.28em] text-[var(--gold)]">
                JJ CONNECTIONS
              </span>
              <span className="mt-[3px] truncate text-[0.56rem] leading-none tracking-[0.16em] text-[var(--muted)] uppercase">
                Luxury Watch Trading
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href.replace("/#", "/"));

              if (link.hasMega) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                  >
                    <Link
                      href={link.href}
                      className="relative flex items-center gap-1 px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
                      style={{
                        color: isActive || megaOpen ? "var(--gold-soft)" : "rgba(246,243,238,0.65)",
                      }}
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                          transition: "transform 0.2s",
                          transform: megaOpen ? "rotate(180deg)" : "none",
                        }}
                      >
                        <path d="M1 3l4 4 4-4" />
                      </svg>
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent transition-all duration-300"
                        style={{
                          width: isActive || megaOpen || hoveredLink === link.label ? "80%" : "0%",
                          opacity: 0.8,
                        }}
                      />
                    </Link>
                    <BrandsMegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{ color: isActive ? "var(--gold-soft)" : "rgba(246,243,238,0.65)" }}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent transition-all duration-300"
                    style={{
                      width: isActive || hoveredLink === link.label ? "80%" : "0%",
                      opacity: isActive ? 0.9 : 0.7,
                    }}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(180,128,44,0.2)] text-[var(--muted)] transition-all duration-200 hover:border-[var(--gold)] hover:text-[var(--gold)]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {searchOpen ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="6.5" cy="6.5" r="4.5" />
                  <path d="M10 10l3.5 3.5" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label="Menu"
              aria-expanded={drawerOpen}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-[rgba(180,128,44,0.2)] lg:hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span
                className="block h-[1.5px] bg-[var(--text)] transition-all duration-300"
                style={{
                  width: drawerOpen ? "16px" : "18px",
                  transform: drawerOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] bg-[var(--text)] transition-all duration-300"
                style={{ width: "14px", opacity: drawerOpen ? 0 : 1 }}
              />
              <span
                className="block h-[1.5px] bg-[var(--text)] transition-all duration-300"
                style={{
                  width: drawerOpen ? "16px" : "12px",
                  transform: drawerOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: searchOpen ? "120px" : "0px" }}
        >
          <form
            action="/catalogo"
            method="GET"
            className="container-luxury flex flex-col gap-3 pb-3 sm:flex-row sm:items-center"
          >
            <div className="flex w-full flex-1 items-center gap-2 rounded-2xl border border-[rgba(180,128,44,0.25)] bg-[rgba(255,255,255,0.03)] px-4 py-3 transition-colors focus-within:border-[rgba(180,128,44,0.55)]">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="rgba(180,128,44,0.6)" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6.5" cy="6.5" r="4.5" />
                <path d="M10 10l3.5 3.5" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand, model, watch name or reference…"
                className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--gold)] px-5 py-3 text-xs font-semibold text-black transition hover:bg-[var(--gold-soft)] sm:w-auto sm:flex-shrink-0"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {megaOpen && (
        <div
          className="fixed inset-0 z-40 hidden lg:block"
          onClick={() => setMegaOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
        style={{ opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none" }}
        aria-hidden="true"
      />

      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-[min(320px,88vw)] flex-col overflow-y-auto transition-transform duration-400 lg:hidden"
        style={{
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          background: "rgba(9,10,12,0.98)",
          borderLeft: "1px solid rgba(180,128,44,0.18)",
        }}
      >
        <div className="flex items-center justify-between border-b border-[rgba(180,128,44,0.12)] px-5 py-5">
          <div className="min-w-0">
            <span className="block truncate text-[0.62rem] font-bold tracking-[0.28em] text-[var(--gold)]">
              JJ CONNECTIONS
            </span>
            <span className="mt-0.5 block truncate text-[0.56rem] uppercase tracking-[0.12em] text-[var(--muted)]">
              Luxury Watch Trading
            </span>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(180,128,44,0.2)] text-[var(--muted)] transition hover:text-[var(--gold)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          <TickMarkDivider />
        </div>

        <div className="px-4 pb-3">
          <form action="/catalogo" method="GET" onSubmit={() => setDrawerOpen(false)} className="space-y-3">
            <div className="flex items-center gap-2 rounded-2xl border border-[rgba(180,128,44,0.25)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none" stroke="rgba(180,128,44,0.6)" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="6.5" cy="6.5" r="4.5" />
                <path d="M10 10l3.5 3.5" />
              </svg>
              <input
                type="text"
                name="search"
                defaultValue={query}
                placeholder="Search brand, name, model or ref…"
                className="w-full bg-transparent text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[var(--gold)] px-5 py-3 text-xs font-semibold text-black transition hover:bg-[var(--gold-soft)]"
            >
              Search Catalog
            </button>
          </form>
        </div>

        <nav className="flex-1 px-4 pb-2">
          {NAV_LINKS.map((link, i) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href.replace("/#", "/"));

            if (link.hasMega) {
              return (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200"
                    style={{
                      opacity: drawerOpen ? 1 : 0,
                      transform: drawerOpen ? "translateX(0)" : "translateX(20px)",
                      transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                      background: isActive || mobileBrandsOpen ? "rgba(180,128,44,0.08)" : "transparent",
                    }}
                  >
                    <span
                      className="text-sm font-medium uppercase tracking-[0.12em]"
                      style={{
                        color: isActive || mobileBrandsOpen ? "var(--gold-soft)" : "rgba(246,243,238,0.75)",
                      }}
                    >
                      Catalog
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke={mobileBrandsOpen ? "var(--gold)" : "rgba(180,128,44,0.4)"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{
                        transition: "transform 0.22s",
                        transform: mobileBrandsOpen ? "rotate(180deg)" : "none",
                      }}
                    >
                      <path d="M1 4l5 5 5-5" />
                    </svg>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: mobileBrandsOpen ? "560px" : "0px" }}
                  >
                    <div className="mb-2 ml-4 space-y-0.5 rounded-2xl border border-[rgba(180,128,44,0.12)] bg-[rgba(180,128,44,0.03)] p-3">
                      <p className="mb-2 px-2 text-[0.55rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)] opacity-55">
                        Featured
                      </p>
                      {FEATURED_BRANDS.map((b) => (
                        <Link
                          key={b.key}
                          href={`/catalogo/${encodeURIComponent(b.key)}`}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-[rgba(180,128,44,0.08)]"
                        >
                          <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: b.accent }} />
                          <span
                            className="text-sm font-medium text-[var(--text)]"
                            style={{ fontFamily: "'Georgia', serif" }}
                          >
                            {b.label}
                          </span>
                        </Link>
                      ))}
                      <div className="my-2 h-px bg-[rgba(180,128,44,0.1)]" />
                      <p className="mb-1 px-2 text-[0.55rem] font-bold uppercase tracking-[0.3em] text-[var(--muted)] opacity-35">
                        More
                      </p>
                      {MORE_BRANDS.map((b) => (
                        <Link
                          key={b.key}
                          href={`/catalogo/${encodeURIComponent(b.key)}`}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
                        >
                          {b.label}
                        </Link>
                      ))}
                      <Link
                        href="/catalogo"
                        onClick={() => setDrawerOpen(false)}
                        className="mt-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--gold)] opacity-65 transition hover:opacity-100"
                      >
                        Browse all →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200"
                style={{
                  opacity: drawerOpen ? 1 : 0,
                  transform: drawerOpen ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, background 0.2s`,
                  background: isActive ? "rgba(180,128,44,0.08)" : "transparent",
                }}
              >
                <span
                  className="text-sm font-medium uppercase tracking-[0.12em]"
                  style={{ color: isActive ? "var(--gold-soft)" : "rgba(246,243,238,0.75)" }}
                >
                  {link.label}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke={isActive ? "var(--gold)" : "rgba(180,128,44,0.4)"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-[rgba(180,128,44,0.12)] p-5">
          <a
            href="https://wa.me/16892671285"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-button block w-full text-center text-sm"
          >
            WhatsApp Us
          </a>
          <p className="text-center text-[0.65rem] uppercase tracking-[0.15em] text-[var(--muted)]">
            Orlando · Florida
          </p>
        </div>
      </aside>
    </>
  );
}