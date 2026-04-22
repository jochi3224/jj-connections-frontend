"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    index: "01",
    title: "Buy",
    text: "Authenticated pre-owned luxury watches with transparent pricing and absolute confidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Sell",
    text: "Expert valuations, immediate offers, or full consignment service handled with care.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Trade",
    text: "Upgrade or diversify your collection with fair, market-driven trade valuations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Trust",
    text: "Secure processes, careful presentation, and a team that shares your passion for horology.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimCounter({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let i = 0;
        const steps = 55;
        const id = setInterval(() => {
          i++;
          setVal(Math.round(to * (i / steps)));
          if (i >= steps) clearInterval(id);
        }, 1600 / steps);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Mini bezel ring ─────────────────────────────────────────────────────────
function BezelRing({ active }: { active: boolean }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="19"
        stroke={active ? "rgba(248,224,124,0.6)" : "rgba(180,128,44,0.3)"}
        strokeWidth="1" style={{ transition: "stroke 0.4s" }} />
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i / 32) * Math.PI * 2;
        const main = i % 4 === 0;
        return (
          <line key={i}
            x1={22 + Math.cos(a) * 19} y1={22 + Math.sin(a) * 19}
            x2={22 + Math.cos(a) * (main ? 14 : 16.5)} y2={22 + Math.sin(a) * (main ? 14 : 16.5)}
            stroke={active ? "rgba(248,224,124,0.5)" : "rgba(180,128,44,0.25)"}
            strokeWidth={main ? "1" : "0.5"}
            style={{ transition: "stroke 0.4s" }}
          />
        );
      })}
      <circle cx="22" cy="22" r="2.5"
        fill={active ? "rgba(248,224,124,0.85)" : "rgba(180,128,44,0.5)"}
        style={{ transition: "fill 0.4s" }} />
    </svg>
  );
}

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function AboutSection() {
  const { ref: sectionRef, visible } = useInView(0.06);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const stats = [
    { num: 500, suffix: "+", label: "Watches Sold" },
    { num: 3, suffix: "+", label: "Years Experience" },
    { num: 100, suffix: "%", label: "Client Satisfaction" },
    { num: 200, suffix: "+", label: "QC INSPECTIONS CONDUCTED" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#070809] py-24 md:py-36"
    >
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(30px,-20px) scale(1.08); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-25px,18px) scale(1.06); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #B4802C 0%, #F8E07C 30%, #E8C84A 50%, #F8E07C 70%, #B4802C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 4s linear infinite;
        }
      `}</style>

      {/* ── Background effects ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #B4802C, transparent 70%)", animation: "orb1 12s ease-in-out infinite" }} />
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #F8E07C, transparent 70%)", animation: "orb2 15s ease-in-out infinite" }} />

        {/* Rotating bezel ring — background decoration */}
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 opacity-[0.04]"
          style={{ width: 500, height: 500, animation: "rotateSlow 60s linear infinite" }}>
          <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
            <circle cx="250" cy="250" r="240" stroke="rgba(180,128,44,1)" strokeWidth="1" />
            {Array.from({ length: 60 }).map((_, i) => {
              const a = (i / 60) * Math.PI * 2;
              const main = i % 5 === 0;
              return (
                <line key={i}
                  x1={250 + Math.cos(a) * 240} y1={250 + Math.sin(a) * 240}
                  x2={250 + Math.cos(a) * (main ? 220 : 230)} y2={250 + Math.sin(a) * (main ? 220 : 230)}
                  stroke="rgba(180,128,44,1)" strokeWidth={main ? "2" : "1"} />
              );
            })}
          </svg>
        </div>

        {/* Grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(180,128,44,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(180,128,44,0.035) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Gold particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle absolute rounded-full bg-[rgba(248,224,124,0.4)]"
            style={{
              left: `${(i * 13 + 7) % 100}%`, top: `${(i * 19 + 5) % 100}%`,
              width: `${(i % 3) + 1.5}px`, height: `${(i % 3) + 1.5}px`,
              animationDuration: `${5 + (i % 4)}s`, animationDelay: `${i * 0.3}s`,
            }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── Label + line ── */}
        <div className="mb-5 flex items-center gap-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.1s" }}>
          <div className="flex items-center gap-2">
            <BezelRing active={visible} />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#B4802C]">About Us</span>
          </div>
          <div className="h-px flex-1 origin-left bg-gradient-to-r from-[rgba(180,128,44,0.60)] to-transparent"
            style={{ transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s" }} />
          {/* Tick marks */}
          <div className="hidden items-center gap-[2px] md:flex">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="bg-[#B4802C]" style={{ width: 1, height: i % 4 === 0 ? 12 : 6, opacity: i % 4 === 0 ? 0.5 : 0.15 }} />
            ))}
          </div>
        </div>

        {/* ── Headline ── */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s" }}>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.06] text-white sm:text-5xl md:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.025em" }}>
            Your trusted partners
            <br className="hidden sm:block" />
            in{" "}
            <span className="shimmer-text">horology.</span>
          </h2>
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-[rgba(180,128,44,0.14)] py-8 sm:grid-cols-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.4s" }}>
          {stats.map((s, i) => (
            <div key={s.label}
              className="group relative flex flex-col gap-1 rounded-2xl border border-transparent px-3 py-3 transition-all duration-300 hover:border-[rgba(180,128,44,0.2)] hover:bg-[rgba(180,128,44,0.04)]"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.7s ease ${0.5 + i * 0.1}s, transform 0.7s ease ${0.5 + i * 0.1}s` }}>
              <span className="text-3xl font-semibold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
                {visible ? <AnimCounter to={s.num} suffix={s.suffix} /> : `0${s.suffix}`}
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-[#666C77]">{s.label}</span>
              {/* Tick underline */}
              <div className="mt-1 flex gap-[2px]">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="bg-[#B4802C]" style={{ width: 1, height: j % 2 === 0 ? 6 : 4, opacity: j % 2 === 0 ? 0.4 : 0.15 }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8 xl:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT — narrative card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
            className="group relative overflow-hidden rounded-3xl border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(160deg,#111518,#0A0C0F)] p-8 md:p-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 1s ease 0.35s, transform 1s ease 0.35s",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(248,224,124,0.06)",
            }}
          >
            {/* Mouse-follow glow */}
            <div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{ background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(180,128,44,0.07), transparent 65%)` }} />

            {/* Top glow */}
            <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg,transparent 0%,rgba(248,224,124,0.40) 50%,transparent 100%)" }} />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 -translate-y-1/2"
              style={{ background: "radial-gradient(ellipse,rgba(180,128,44,0.14) 0%,transparent 70%)" }} />

            {/* Bezel watermark */}
            <div className="pointer-events-none absolute right-4 top-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
              <BezelRing active />
            </div>

            <div className="space-y-5 text-[16px] leading-[1.85] text-[#787E8A] md:text-[17px]">
              <p>We are more than a watch company — a team of dedicated professionals with a shared love for the intricate world of horology.</p>
              <p>From sourcing exceptional pieces to handling secure transactions, our goal is to create a clear, elevated, and trustworthy experience for every client.</p>
              <p>Whether you are buying your next dream watch, selling a piece, or trading into something new, JJ Connections is built to guide you with expertise and care.</p>
            </div>

            <blockquote className="mt-8 border-l-2 border-[rgba(180,128,44,0.50)] pl-5">
              <p className="text-sm italic leading-7 text-[#555B65]">
                "Precision in timekeeping. Integrity in every transaction."
              </p>
            </blockquote>

            {/* Tick marks row */}
            <div className="mt-6 flex items-center gap-[3px]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="bg-[#B4802C]" style={{ width: 1, height: i % 4 === 0 ? 12 : 6, opacity: i % 4 === 0 ? 0.4 : 0.12 }} />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://wa.me/16892671285" target="_blank" rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0A0A0A] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "linear-gradient(115deg,#B4802C 0%,#F8E07C 55%,#C9942A 100%)" }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact on WhatsApp
              </a>
              <Link href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(180,128,44,0.35)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#C8A84B] transition-all duration-300 hover:border-[rgba(248,224,124,0.55)] hover:bg-[rgba(180,128,44,0.08)] hover:text-[#F8E07C]">
                View Catalog
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — pillar cards */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((item, i) => (
              <article
                key={item.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative cursor-default overflow-hidden rounded-2xl border border-[rgba(180,128,44,0.12)] bg-[linear-gradient(160deg,#101316,#0A0C0F)] p-5 transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(248,224,124,0.28)] md:p-6"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.9s ease ${0.4 + i * 0.1}s, transform 0.9s ease ${0.4 + i * 0.1}s, box-shadow 0.4s ease, border-color 0.4s ease`,
                  boxShadow: hovered === i ? "0 20px 60px rgba(180,128,44,0.18),0 0 0 1px rgba(248,224,124,0.12)" : "0 10px 30px rgba(0,0,0,0.30)",
                }}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-400"
                  style={{ background: "radial-gradient(ellipse at 50% 0%,rgba(180,128,44,0.14) 0%,transparent 65%)", opacity: hovered === i ? 1 : 0 }} />

                {/* Top line */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-px transition-all duration-400"
                  style={{
                    background: "linear-gradient(90deg,transparent,rgba(248,224,124,0.45),transparent)",
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                  }} />

                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-[rgba(180,128,44,0.22)] p-2.5 text-[#B4802C] transition-all duration-300 group-hover:border-[rgba(248,224,124,0.40)] group-hover:text-[#F8E07C]"
                  style={{ background: "linear-gradient(145deg,rgba(180,128,44,0.10),rgba(180,128,44,0.04))" }}>
                  {item.icon}
                </div>

                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B4802C] transition-colors duration-300 group-hover:text-[#E8C84A]">
                  {item.index}
                </p>

                <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl" style={{ fontFamily: "'Georgia', serif" }}>
                  {item.title}
                </h3>

                {/* Expanding line */}
                <div className="my-3 h-px bg-gradient-to-r from-[rgba(180,128,44,0.5)] to-transparent transition-all duration-400"
                  style={{ width: hovered === i ? "100%" : "20px" }} />

                <p className="text-sm leading-[1.75] text-[#676E7A]">{item.text}</p>

                <div className="mt-4 flex items-center gap-1.5 transition-all duration-300"
                  style={{ opacity: hovered === i ? 1 : 0, transform: hovered === i ? "translateX(0)" : "translateX(-8px)" }}>
                  <span className="text-xs uppercase tracking-[0.20em] text-[#B4802C]">Learn more</span>
                  <svg className="h-3 w-3 text-[#B4802C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
