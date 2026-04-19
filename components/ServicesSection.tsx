"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Buy",
    icon: "◈",
    accent: "Curated Access",
    text: "Discover a curated collection of authenticated pre-owned luxury watches. Every timepiece undergoes rigorous inspection, with transparent pricing and personalized concierge support.",
    href: "/services",
    detail: ["Certified Authenticity", "Market-fair Pricing", "Concierge Service"],
  },
  {
    number: "02",
    title: "Sell",
    icon: "◇",
    accent: "Expert Valuation",
    text: "Benefit from expert valuations and our extensive network to pursue the best possible result, whether through immediate cash offers or consignment.",
    href: "/services",
    detail: ["Free Appraisal", "Cash Offers", "Consignment Option"],
  },
  {
    number: "03",
    title: "Trade",
    icon: "⟳",
    accent: "Smart Upgrade",
    text: "Exchange your current watch for a new acquisition with fair, market-driven valuations that make upgrading your collection easier.",
    href: "/services",
    detail: ["Fair Trade-In Value", "Seamless Process", "Collection Upgrade"],
  },
  {
    number: "04",
    title: "Polish",
    icon: "✦",
    accent: "Restoration",
    text: "Restore your cherished timepiece to its original glory through expert polishing that removes hairline scratches and brings back its brilliance.",
    href: "/services",
    detail: ["Scratch Removal", "Factory Finish", "Case & Bracelet"],
  },
  {
    number: "05",
    title: "Authenticate",
    icon: "⊕",
    accent: "Certified Trust",
    text: "Protect your investment with meticulous inspection, specialist expertise, and a trusted process that helps verify authenticity and uncover hidden issues.",
    href: "/services",
    detail: ["Serial Verification", "Movement Check", "Provenance Docs"],
  },
];

// ─── Bezel ring SVG ───────────────────────────────────────────────────────────
function BezelRing({ size = 64, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle
        cx="32" cy="32" r="28"
        stroke={active ? "rgba(248,224,124,0.7)" : "rgba(180,128,44,0.3)"}
        strokeWidth="1"
        style={{ transition: "stroke 0.3s ease" }}
      />
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * Math.PI * 2;
        const main = i % 4 === 0;
        const r1 = 28, r2 = main ? 22 : 25;
        return (
          <line
            key={i}
            x1={32 + Math.cos(angle) * r1}
            y1={32 + Math.sin(angle) * r1}
            x2={32 + Math.cos(angle) * r2}
            y2={32 + Math.sin(angle) * r2}
            stroke={active ? "rgba(248,224,124,0.55)" : "rgba(180,128,44,0.3)"}
            strokeWidth={main ? "1" : "0.5"}
            style={{ transition: "stroke 0.3s ease" }}
          />
        );
      })}
      <circle
        cx="32" cy="32" r="14"
        stroke={active ? "rgba(248,224,124,0.35)" : "rgba(180,128,44,0.15)"}
        strokeWidth="0.8"
        style={{ transition: "stroke 0.3s ease" }}
      />
    </svg>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  visible,
}: {
  service: typeof services[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const isFeature = index < 2; // first two get a bigger treatment

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 50, y: 50 }); }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-[28px] cursor-default"
      style={{
        border: `1px solid ${hovered ? "rgba(248,224,124,0.35)" : "rgba(180,128,44,0.18)"}`,
        background: "linear-gradient(160deg,rgba(20,22,26,0.96),rgba(11,12,14,0.98))",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.97)",
        transition: `opacity 0.75s ease ${index * 0.1}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(248,224,124,0.08)" : "0 8px 30px rgba(0,0,0,0.25)",
        gridColumn: isFeature && index === 0 ? "span 1" : "span 1",
      }}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(180,128,44,0.09), transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-500"
        style={{ width: hovered ? "100%" : "0%" }}
      />

      <div className={`relative p-7 ${isFeature ? "md:p-8" : ""}`}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--gold)] opacity-60 mb-1">
              {service.number}
            </span>
            <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-[var(--gold)]">
              {service.accent}
            </span>
          </div>
          <div
            className="flex-shrink-0 transition-all duration-500"
            style={{
              transform: hovered ? "rotate(15deg) scale(1.1)" : "rotate(0deg) scale(1)",
            }}
          >
            <BezelRing size={60} active={hovered} />
            {/* Icon overlay on bezel */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg"
              style={{
                color: hovered ? "var(--gold-soft)" : "var(--gold)",
                transition: "color 0.3s ease",
                marginTop: "-30px",
                marginLeft: "24px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-3xl font-semibold leading-tight mb-3 transition-colors duration-300"
          style={{
            fontFamily: "'Georgia', serif",
            color: hovered ? "var(--gold-soft)" : "var(--text)",
          }}
        >
          {service.icon} {service.title}
        </h3>

        {/* Animated line */}
        <div
          className="mb-5 h-px bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-transparent transition-all duration-500"
          style={{ width: hovered ? "100%" : "32px", opacity: hovered ? 0.5 : 0.3 }}
        />

        {/* Description */}
        <p className="text-[var(--muted)] leading-7 text-[15px] mb-6">
          {service.text}
        </p>

        {/* Detail tags */}
        <div
          className="flex flex-wrap gap-2 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {service.detail.map((d) => (
            <span
              key={d}
              className="rounded-full border border-[rgba(180,128,44,0.25)] bg-[rgba(180,128,44,0.06)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--gold)]"
            >
              {d}
            </span>
          ))}
        </div>

        {/* CTA link */}
        <Link
          href={service.href}
          className="group/link mt-6 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] transition-colors duration-200"
          style={{ color: hovered ? "var(--gold-soft)" : "rgba(246,243,238,0.45)" }}
        >
          Learn More
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          >
            <path d="M2 7h10M7 2l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [headingVisible, setHeadingVisible] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); sectionObs.disconnect(); } },
      { threshold: 0.06 }
    );
    const headingObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadingVisible(true); headingObs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) sectionObs.observe(ref.current);
    if (headingRef.current) headingObs.observe(headingRef.current);
    return () => { sectionObs.disconnect(); headingObs.disconnect(); };
  }, []);

  return (
    <section id="services" ref={ref} className="relative py-28 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(180,128,44,0.05),transparent)]" />

      {/* Animated tick marks top decoration */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 flex items-end gap-[3px] pt-px">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="bg-[var(--gold)]"
            style={{
              width: 1,
              height: i % 5 === 0 ? 18 : i % 2 === 0 ? 10 : 6,
              opacity: i % 5 === 0 ? 0.45 : 0.12,
            }}
          />
        ))}
      </div>

      <div className="container-luxury relative">
        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-16"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
            <p className="section-kicker">Services</p>
            <div className="h-px w-8 bg-[var(--gold)] opacity-50" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="section-title max-w-xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Built around every stage
              <br />
              <span className="text-[var(--gold)]">of your watch journey</span>
            </h2>
            <p className="max-w-md text-[var(--muted)] leading-7 lg:text-right">
              Whether you are buying, selling, trading, restoring, or authenticating
              a luxury watch, JJ Connections is built to support the process with
              clarity and confidence.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div
          className="mt-14 flex flex-col items-center gap-5 rounded-[28px] border border-[rgba(180,128,44,0.15)] bg-[rgba(14,15,18,0.7)] px-8 py-7 text-center md:flex-row md:justify-between md:text-left"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s",
          }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)] mb-1">
              ✦ Private Sourcing Available
            </p>
            <p className="text-[var(--muted)] text-sm">
              Looking for a specific reference? Tell us and we'll find it for you.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://wa.me/16892671285"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button text-sm px-6"
            >
              Contact Us
            </a>
            <Link href="/catalogo" className="outline-button text-sm px-6">
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
