"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWatchById } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Watch = Awaited<ReturnType<typeof getWatchById>>;

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://api.jjconnections.com";

function normalizeImageUrl(url?: string | null) {
  if (!url || url.trim() === "") return "/images/placeholder-watch.jpg";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${STRAPI_BASE_URL}${url}`;
  return `${STRAPI_BASE_URL}/${url}`;
}

// ─── Bezel SVG ─────────────────────────────────────────────────────────────────
function BezelAccent({ size = 80, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke={active ? "rgba(248,224,124,0.6)" : "rgba(180,128,44,0.25)"}
        strokeWidth="1"
        style={{ transition: "stroke 0.4s ease" }}
      />
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const main = i % 5 === 0;
        return (
          <line
            key={i}
            x1={40 + Math.cos(a) * 36}
            y1={40 + Math.sin(a) * 36}
            x2={40 + Math.cos(a) * (main ? 28 : 32)}
            y2={40 + Math.sin(a) * (main ? 28 : 32)}
            stroke={active ? "rgba(248,224,124,0.5)" : "rgba(180,128,44,0.3)"}
            strokeWidth={main ? "1.2" : "0.6"}
            style={{ transition: "stroke 0.4s ease" }}
          />
        );
      })}
      <circle
        cx="40"
        cy="40"
        r="3"
        fill={active ? "rgba(248,224,124,0.8)" : "rgba(180,128,44,0.5)"}
        style={{ transition: "fill 0.4s ease" }}
      />
    </svg>
  );
}

// ─── Spec row ──────────────────────────────────────────────────────────────────
function SpecRow({
  label,
  value,
  index,
  visible,
}: {
  label: string;
  value: string;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-all duration-200"
      style={{
        background: hovered ? "rgba(180,128,44,0.05)" : "transparent",
        border: "1px solid",
        borderColor: hovered ? "rgba(180,128,44,0.2)" : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s, background 0.2s, border-color 0.2s`,
      }}
    >
      <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] flex-shrink-0 mt-0.5">
        {label}
      </span>
      <span
        className="text-right text-sm font-medium transition-colors duration-200"
        style={{ color: hovered ? "var(--gold-soft)" : "var(--text)" }}
      >
        {value || "N/A"}
      </span>
    </div>
  );
}

// ─── Image gallery ─────────────────────────────────────────────────────────────
function ImageGallery({
  images,
  watchName,
}: {
  images: { url: string; alternativeText?: string }[];
  watchName: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoom) return;
    const r = mainRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div className="space-y-4">
      <div
        ref={mainRef}
        className="group relative overflow-hidden rounded-[28px] cursor-zoom-in"
        style={{
          background: "linear-gradient(145deg,#1c2026,#0f1114)",
          border: "1px solid rgba(180,128,44,0.18)",
          aspectRatio: "1",
        }}
        onClick={() => setZoom(!zoom)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoom(false)}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,224,124,0.04)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[rgba(180,128,44,0.4)]" />
        <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[rgba(180,128,44,0.4)]" />
        <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[rgba(180,128,44,0.4)]" />
        <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[rgba(180,128,44,0.4)]" />

        <img
          src={images[active]?.url}
          alt={images[active]?.alternativeText || watchName}
          className="h-full w-full object-contain p-8 bg-white transition-all duration-500"
          style={{
            transform: zoom
              ? `scale(1.8) translate(${(50 - mousePos.x) * 0.15}%, ${(50 - mousePos.y) * 0.15}%)`
              : "scale(1)",
          }}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-watch.jpg";
          }}
        />

        <div className="absolute bottom-4 right-4 rounded-full border border-[rgba(180,128,44,0.3)] bg-[rgba(11,12,14,0.8)] px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.18em] text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {zoom ? "Click to exit zoom" : "Click to zoom"}
        </div>

        {images.length > 1 && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: active === i ? 18 : 6,
                  height: 6,
                  background: active === i ? "var(--gold)" : "rgba(180,128,44,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-[16px] transition-all duration-200"
              style={{
                aspectRatio: "1",
                background: "linear-gradient(145deg,#1c2026,#0f1114)",
                border: `1px solid ${active === i ? "rgba(248,224,124,0.5)" : "rgba(180,128,44,0.15)"}`,
                boxShadow: active === i ? "0 0 16px rgba(180,128,44,0.2)" : "none",
              }}
            >
              <img
                src={img.url}
                alt={img.alternativeText || `${watchName} ${i + 1}`}
                className="h-full w-full object-contain p-2 bg-white transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder-watch.jpg";
                }}
              />
              {active === i && <div className="absolute inset-0 bg-[rgba(180,128,44,0.08)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function WatchDetailClient({ watch }: { watch: NonNullable<Watch> }) {
  const [visible, setVisible] = useState(false);
  const [specsVisible, setSpecsVisible] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = specsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSpecsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

 

  const images =
    watch.galeria && watch.galeria.length > 0
      ? watch.galeria.map((img: any) => ({
          url: normalizeImageUrl(img.url),
          alternativeText: img.alternativeText || watch.nombre,
        }))
      : watch.imagen_url
      ? [{ url: normalizeImageUrl(watch.imagen_url), alternativeText: watch.nombre }]
      : [{ url: "/images/placeholder-watch.jpg", alternativeText: watch.nombre }];

 const specs = [
  { label: "Reference", value: watch.referencia },
  { label: "Condition", value: watch.condicion },
  { label: "Diameter", value: watch.diametro },
  { label: "Material", value: watch.material },
 { label: "Bracelet Material", value: watch.BraceletMaterial },
  { label: "Crystal", value: watch.cristal },
  { label: "Water Resistance", value: watch.resistencia_agua },
  { label: "Dial Color", value: watch.color_esfera },
  { label: "Bezel", value: watch.bisel },
  { label: "Movement", value: watch.movimiento },
  { label: "Store", value: watch.tienda },
].filter((s) => s.value);

  const whatsappMsg = encodeURIComponent(
    `Hello, I'm interested in this watch:\n\n*${watch.nombre}*\nReference: ${watch.referencia || "N/A"}\nPrice: ${formatPrice(watch.precio, watch.moneda)}\n\nCould you give me more information?`
  );

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(180,128,44,0.07),transparent)]" />

        <div className="container-luxury py-12">
          <div
            className="mb-8 flex items-center gap-2 text-sm"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <Link
              href="/catalogo"
              className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--gold-soft)] transition-colors duration-200 group"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <path d="M10 7H2M6 2L1 7l5 5" />
              </svg>
              Catalog
            </Link>
            <span className="text-[var(--muted)] opacity-40">/</span>
            <span className="text-[var(--muted)] opacity-60 truncate max-w-[200px]">{watch.marca}</span>
            <span className="text-[var(--muted)] opacity-40">/</span>
            <span className="text-[var(--text)] truncate max-w-[200px]">{watch.nombre}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT: Gallery */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <ImageGallery images={images} watchName={watch.nombre} />
            </div>

            {/* RIGHT: Info */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(30px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <div className="rounded-[28px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(160deg,rgba(20,22,26,0.97),rgba(11,12,14,0.99))] p-8 md:p-10 relative overflow-hidden">
                <div className="pointer-events-none absolute right-6 top-6 opacity-10">
                  <BezelAccent size={90} />
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <div className="h-px w-4 bg-[var(--gold)] opacity-60" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                    {watch.marca || "Luxury Watch"}
                  </p>
                </div>

                <h1
                  className="mb-2 text-3xl font-semibold leading-tight text-[var(--text)] md:text-4xl xl:text-5xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {watch.nombre}
                </h1>

                {watch.modelo && <p className="mb-4 text-lg text-[var(--muted)]">{watch.modelo}</p>}

                <div
                  className="mb-6 h-px bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent"
                  style={{
                    width: visible ? "100%" : "0%",
                    opacity: 0.3,
                    transition: "width 1s ease 0.6s",
                  }}
                />

                <div className="mb-6 rounded-2xl border border-[rgba(180,128,44,0.2)] bg-[rgba(180,128,44,0.04)] px-5 py-4">
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Price</p>
                  <p
                    className="text-3xl font-semibold text-[var(--gold-soft)]"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {formatPrice(watch.precio, watch.moneda)}
                  </p>
                  {watch.condicion && (
                    <span className="mt-2 inline-block rounded-full border border-[rgba(248,224,124,0.2)] px-3 py-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--muted)]">
                      {watch.condicion}
                    </span>
                  )}
                </div>

                {watch.descripcion && (
                  <p className="mb-6 leading-7 text-[var(--muted)] text-sm border-l border-[rgba(180,128,44,0.25)] pl-4">
                    {watch.descripcion}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mb-8">
                  <a
                    href={`https://wa.me/16892671285?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-button flex items-center gap-2 flex-1 justify-center"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contact on WhatsApp
                  </a>
                  <Link href="/catalogo" className="outline-button flex items-center gap-2 justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 7H2M6 2L1 7l5 5" />
                    </svg>
                    Back
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(180,128,44,0.1)]">
                  {["✦ Authenticated", "✦ Secure Process", "✦ Private Consult"].map((b) => (
                    <span
                      key={b}
                      className="text-[0.65rem] uppercase tracking-[0.15em] text-[var(--muted)] opacity-60"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={specsRef} className="mt-10 grid gap-6 lg:grid-cols-2">
            <div
              className="rounded-[28px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(160deg,rgba(20,22,26,0.97),rgba(11,12,14,0.99))] p-8 relative overflow-hidden"
              style={{
                opacity: specsVisible ? 1 : 0,
                transform: specsVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <div className="pointer-events-none absolute right-6 top-6 opacity-[0.06]">
                <BezelAccent size={120} active />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-4 bg-[var(--gold)] opacity-60" />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Specifications
                </p>
              </div>

              <div className="space-y-1">
                {specs.map((spec, i) => (
                  <SpecRow
                    key={spec.label}
                    label={spec.label}
                    value={spec.value || ""}
                    index={i}
                    visible={specsVisible}
                  />
                ))}
              </div>
            </div>

            <div
              className="rounded-[28px] border border-[rgba(180,128,44,0.22)] bg-[linear-gradient(135deg,rgba(22,20,16,0.97),rgba(11,12,14,0.99))] p-8 flex flex-col justify-between relative overflow-hidden"
              style={{
                opacity: specsVisible ? 1 : 0,
                transform: specsVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
              }}
            >
              <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[rgba(180,128,44,0.1)] blur-3xl" />

              <div className="flex gap-[3px] mb-6">
                {Array.from({ length: 22 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[var(--gold)]"
                    style={{
                      width: 1,
                      height: i % 4 === 0 ? 14 : 7,
                      opacity: i % 4 === 0 ? 0.5 : 0.15,
                    }}
                  />
                ))}
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)] mb-3">
                  Private Inquiry
                </p>
                <h3
                  className="text-2xl font-semibold text-[var(--text)] mb-4 leading-tight"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Interested in this timepiece?
                </h3>
                <p className="text-[var(--muted)] leading-7 mb-6 text-sm">
                  Reach out directly for more details, additional photos, provenance
                  documentation, or to arrange a private viewing.
                </p>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/16892671285?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-button w-full text-center flex items-center justify-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Message on WhatsApp
                  </a>
                  <a
                    href="mailto:jjconnections@gmail.com"
                    className="outline-button w-full text-center flex items-center justify-center gap-2"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 8l10 6 10-6" />
                    </svg>
                    Send Email
                  </a>
                </div>
              </div>

              <p className="mt-6 text-[0.65rem] uppercase tracking-[0.15em] text-[var(--muted)] opacity-40">
                ✦ Discreet · Secure · Professional
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}