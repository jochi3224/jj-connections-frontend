"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Live clock ────────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  const hourRef = useRef<SVGLineElement>(null);
  const minuteRef = useRef<SVGLineElement>(null);
  const secondRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      const ms = now.getMilliseconds();
      setTime({
        h: String(now.getHours()).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
      if (hourRef.current)
        hourRef.current.style.transform = `rotate(${(h / 12) * 360 + (m / 60) * 30}deg)`;
      if (minuteRef.current)
        minuteRef.current.style.transform = `rotate(${(m / 60) * 360 + (s / 60) * 6}deg)`;
      if (secondRef.current)
        secondRef.current.style.transform = `rotate(${(s / 60) * 360 + (ms / 1000) * 6}deg)`;
    };
    tick();
    const id = setInterval(tick, 80);
    return () => clearInterval(id);
  }, []);

  const cx = 44, cy = 44, r = 40;

  return (
    <div className="flex items-center gap-4">
      {/* Mini dial */}
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} stroke="rgba(180,128,44,0.25)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r - 7} stroke="rgba(180,128,44,0.08)" strokeWidth="0.5" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const main = i % 5 === 0;
          return (
            <line key={i}
              x1={cx + Math.cos(a) * (r - 1)} y1={cy + Math.sin(a) * (r - 1)}
              x2={cx + Math.cos(a) * (main ? r - 9 : r - 5)} y2={cy + Math.sin(a) * (main ? r - 9 : r - 5)}
              stroke={main ? "rgba(180,128,44,0.55)" : "rgba(180,128,44,0.18)"}
              strokeWidth={main ? "1.2" : "0.6"}
            />
          );
        })}
        <line ref={hourRef} x1={cx} y1={cy + 8} x2={cx} y2={cy - 20}
          stroke="rgba(246,243,238,0.7)" strokeWidth="2" strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.4s ease" }} />
        <line ref={minuteRef} x1={cx} y1={cy + 9} x2={cx} y2={cy - 28}
          stroke="rgba(246,243,238,0.85)" strokeWidth="1.5" strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.15s ease" }} />
        <line ref={secondRef} x1={cx} y1={cy + 11} x2={cx} y2={cy - 32}
          stroke="rgba(180,128,44,0.95)" strokeWidth="0.8" strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px` }} />
        <circle cx={cx} cy={cy} r="3" fill="rgba(180,128,44,0.9)" />
        <circle cx={cx} cy={cy} r="1.2" fill="#060402" />
      </svg>

      {/* Digital time */}
      <div>
        <p className="font-mono text-2xl font-semibold tracking-wider text-[var(--gold-soft)]">
          {time.h}:{time.m}
          <span className="text-[var(--gold)] opacity-60">:{time.s}</span>
        </p>
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)] opacity-50 mt-0.5">
          Orlando, Florida
        </p>
      </div>
    </div>
  );
}

// ─── Social icon ───────────────────────────────────────────────────────────────
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(180,128,44,0.2)] text-[var(--muted)] transition-all duration-200 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {children}
    </a>
  );
}

// ─── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        borderTop: "1px solid rgba(180,128,44,0.18)",
        background: "linear-gradient(to bottom,rgba(9,10,12,0.99),rgba(6,4,2,1))",
      }}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(180,128,44,0.05),transparent)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-[rgba(248,224,124,0.3)]"
            style={{
              left: `${(i * 13 + 6) % 100}%`,
              top: `${(i * 19 + 8) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${7 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Top tick strip */}
      <div className="flex justify-center gap-[3px] pt-px">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="bg-[var(--gold)]" style={{
            width: 1, height: i % 6 === 0 ? 14 : i % 2 === 0 ? 8 : 5,
            opacity: i % 6 === 0 ? 0.45 : 0.1,
          }} />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="container-luxury pt-14 pb-10">
        <div
          className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── Brand col ── */}
          <div className="space-y-6">
            <Link href="/">
              <img src="/img/logo-jj.png" alt="JJ Connections" className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--gold)] mb-1">JJ Connections</p>
              <h3
                className="text-xl font-semibold leading-[1.2] text-[var(--text)]"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Luxury watches,
                <br />
                <span className="text-[var(--gold)]">presented with intention.</span>
              </h3>
            </div>

            <p className="text-sm leading-7 text-[var(--muted)] max-w-xs">
              A premium experience for buying, selling, and trading authenticated luxury timepieces with trust and clarity.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              <SocialLink href="https://www.instagram.com/jj_connections" label="Instagram">
                <svg width="15" height="15" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@jj_connections" label="TikTok">
                <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.facebook.com/josue.j.gonzalez.73" label="Facebook">
                <svg width="14" height="14" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://wa.me/16892671285" label="WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* ── Nav col ── */}
          <div>
            <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Navigation</p>
            <div className="h-px w-8 bg-[var(--gold)] opacity-30 mb-5" />
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Catalog", href: "/catalogo" },
                { label: "Services", href: "/#services" },
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-[var(--muted)] transition-all duration-200 hover:text-[var(--gold-soft)]"
                  >
                    <span
                      className="h-px bg-[var(--gold)] opacity-0 group-hover:opacity-60 transition-all duration-200"
                      style={{ width: 0, minWidth: 0 }}
                      ref={(el) => {
                        if (el) {
                          el.parentElement?.addEventListener("mouseenter", () => { el.style.width = "12px"; });
                          el.parentElement?.addEventListener("mouseleave", () => { el.style.width = "0px"; });
                        }
                      }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services col ── */}
          <div>
            <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Services</p>
            <div className="h-px w-8 bg-[var(--gold)] opacity-30 mb-5" />
            <ul className="space-y-3">
              {[
                { label: "Buy a Watch", href: "/catalogo" },
                { label: "Sell Your Watch", href: "https://wa.me/16892671285" },
                { label: "Trade", href: "https://wa.me/16892671285" },
                { label: "Polish", href: "/services" },
                { label: "Authenticate", href: "/services" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--gold-soft)] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact col ── */}
          <div>
            <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">Contact</p>
            <div className="h-px w-8 bg-[var(--gold)] opacity-30 mb-5" />

            {/* Live clock */}
            <div className="mb-5 rounded-2xl border border-[rgba(180,128,44,0.18)] bg-[rgba(14,15,18,0.8)] p-4">
              <LiveClock />
            </div>

            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-2 group">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(180,128,44,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href="tel:+16892671285" className="hover:text-[var(--gold-soft)] transition-colors">+1 689 267 1285</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(180,128,44,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 8l10 6 10-6"/>
                </svg>
                <a href="mailto:jjconnections@gmail.com" className="hover:text-[var(--gold-soft)] transition-colors">jjconnections@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(180,128,44,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Orlando, Florida</span>
              </li>
            </ul>

            <a
              href="https://wa.me/16892671285"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button mt-5 w-full text-center text-sm flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Start on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t border-[rgba(180,128,44,0.1)]"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.3s",
        }}
      >
        <div className="container-luxury flex flex-col items-center justify-between gap-3 py-5 md:flex-row">
          <p className="text-[0.72rem] text-[var(--muted)] opacity-50 tracking-[0.06em]">
            © {new Date().getFullYear()} JJ Connections. All rights reserved.
          </p>

          {/* Bottom tick marks */}
          <div className="flex gap-[2px] items-center">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-[var(--gold)]" style={{
                width: 1, height: i % 4 === 0 ? 10 : 5,
                opacity: i % 4 === 0 ? 0.35 : 0.1,
              }} />
            ))}
          </div>

          <p className="text-[0.72rem] text-[var(--muted)] opacity-50 tracking-[0.06em]">
            Orlando, Florida · Worldwide Service
          </p>
        </div>
      </div>
    </footer>
  );
}
