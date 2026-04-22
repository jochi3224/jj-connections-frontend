"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  image: string;
  number: string;
  intro: string;
  body: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const teamMembers: TeamMember[] = [
  {
    name: "JJ Gonzalez",
    role: "Founder",
    number: "01",
    image: "/img/team-jj.jpg",
    intro:
      "JJ Gonzalez is the engineering heartbeat behind JJ Connections. As a seasoned mechanical engineer, he brings precision, technical discipline, and a deep respect for the craftsmanship of luxury watches.",
    body: [
      "His understanding of complex mechanisms shapes the way JJ Connections approaches authentication, evaluation, and presentation.",
      "For JJ, a watch is not only an object of status, but a marvel of engineering and design that deserves to be treated with care and expertise.",
      "His role helps ensure every timepiece meets the standards of quality, confidence, and precision that define the brand.",
    ],
  },
  {
    name: "Dr. Del Rodriguez",
    role: "Co-Founder",
    number: "02",
    image: "/img/team-del.jpg",
    intro:
      "Dr. Del Rodriguez is the architect of operations at JJ Connections, ensuring every client experience feels organized, secure, and elevated from beginning to end.",
    body: [
      "Her background brings a meticulous attention to detail, professionalism, and care to every stage of the business.",
      "From administrative structure to client communication and internal coordination, she helps create the seamless and trustworthy experience clients expect from JJ Connections.",
      "Her contribution is central to the brand's consistency, efficiency, and long-term reliability.",
    ],
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Watches Sold" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Authenticated" },
  
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Team Card with Tilt Effect ───────────────────────────────────────────────
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, visible } = useReveal(0.1);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  }, []);

  return (
    <div
      ref={revealRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.2}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: "transform 0.15s ease" }}
        className="group relative overflow-hidden rounded-[32px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(160deg,rgba(22,22,24,0.97),rgba(11,12,14,0.99))] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:p-10"
      >
        {/* Glow on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(180,128,44,0.08), transparent 60%)" }}
        />

        {/* Watch bezel corner decoration */}
        <div className="pointer-events-none absolute right-8 top-8 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
          <WatchBezelSVG size={80} />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          {/* Photo */}
          <div className="relative">
            {/* Tick marks ring around photo */}
            <div className="absolute -inset-3 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <TickRingSVG />
            </div>
            <div className="relative overflow-hidden rounded-[24px] border border-[rgba(248,224,124,0.14)] bg-[rgba(255,255,255,0.03)] aspect-[3/4]">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              {/* Gold overlay shimmer */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,224,124,0.07)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Number badge */}
            <div className="absolute -bottom-3 -right-3 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(180,128,44,0.4)] bg-[#0b0c0e]">
              <span className="font-mono text-sm font-bold text-[var(--gold)]">
                {member.number}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
              {member.number} · {member.role}
            </p>

            <h3
              className="mt-3 text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {member.name}
            </h3>

            {/* Animated underline */}
            <div
              className="mt-4 h-px w-0 bg-gradient-to-r from-[var(--gold)] to-transparent transition-all duration-700 group-hover:w-full"
            />

            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {member.intro}
            </p>

            <div className="mt-6 space-y-4">
              {member.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="leading-8 text-[var(--muted)] text-[15px]"
                  style={{
                    opacity: 0.75,
                    borderLeft: "1px solid rgba(180,128,44,0.25)",
                    paddingLeft: "1rem",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SVG Components ───────────────────────────────────────────────────────────

function WatchDialSVG({ size = 600 }: { size?: number }) {
  const hourRef = useRef<SVGLineElement>(null);
  const minuteRef = useRef<SVGLineElement>(null);
  const secondRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      const ms = now.getMilliseconds();

      const hourDeg = (h / 12) * 360 + (m / 60) * 30;
      const minDeg = (m / 60) * 360 + (s / 60) * 6;
      const secDeg = (s / 60) * 360 + (ms / 1000) * 6;

      if (hourRef.current)
        hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
      if (minuteRef.current)
        minuteRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (secondRef.current)
        secondRef.current.style.transform = `rotate(${secDeg}deg)`;
    }
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} stroke="rgba(180,128,44,0.18)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r - 12} stroke="rgba(180,128,44,0.08)" strokeWidth="1" />

      {/* Hour tick marks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const isHour = i % 5 === 0;
        const innerR = isHour ? r - 24 : r - 18;
        const x1 = cx + Math.cos(angle) * (r - 4);
        const y1 = cy + Math.sin(angle) * (r - 4);
        const x2 = cx + Math.cos(angle) * innerR;
        const y2 = cy + Math.sin(angle) * innerR;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isHour ? "rgba(180,128,44,0.55)" : "rgba(180,128,44,0.2)"}
            strokeWidth={isHour ? "2" : "0.8"}
          />
        );
      })}

      {/* Roman numerals placeholder circles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const textR = r - 38;
        const x = cx + Math.cos(angle) * textR;
        const y = cy + Math.sin(angle) * textR;
        const nums = ["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(180,128,44,0.45)"
            fontSize={size * 0.025}
            fontFamily="Georgia, serif"
            letterSpacing="0.02em"
          >
            {nums[i]}
          </text>
        );
      })}

      {/* Centre circle */}
      <circle cx={cx} cy={cy} r={r * 0.55} stroke="rgba(180,128,44,0.05)" strokeWidth="1" fill="none" />

      {/* Hands — pivot origin at center */}
      <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <line
          ref={hourRef}
          x1={cx}
          y1={cy + r * 0.12}
          x2={cx}
          y2={cy - r * 0.48}
          stroke="rgba(246,243,238,0.7)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.5s ease" }}
        />
      </g>
      <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <line
          ref={minuteRef}
          x1={cx}
          y1={cy + r * 0.15}
          x2={cx}
          y2={cy - r * 0.68}
          stroke="rgba(246,243,238,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.2s ease" }}
        />
      </g>
      <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <line
          ref={secondRef}
          x1={cx}
          y1={cy + r * 0.2}
          x2={cx}
          y2={cy - r * 0.75}
          stroke="rgba(180,128,44,0.9)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </g>

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="5" fill="rgba(180,128,44,0.9)" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0b0c0e" />
    </svg>
  );
}

function WatchBezelSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" stroke="rgba(180,128,44,0.6)" strokeWidth="1" />
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 5 === 0;
        const r1 = 36, r2 = isMain ? 30 : 33;
        return (
          <line
            key={i}
            x1={40 + Math.cos(angle) * r1}
            y1={40 + Math.sin(angle) * r1}
            x2={40 + Math.cos(angle) * r2}
            y2={40 + Math.sin(angle) * r2}
            stroke={isMain ? "rgba(180,128,44,0.7)" : "rgba(180,128,44,0.35)"}
            strokeWidth={isMain ? "1.5" : "0.7"}
          />
        );
      })}
      <circle cx="40" cy="40" r="3" fill="rgba(180,128,44,0.6)" />
    </svg>
  );
}

function TickRingSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="60" r="55" stroke="rgba(180,128,44,0.3)" strokeWidth="0.5" />
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * Math.PI * 2;
        const isMain = i % 4 === 0;
        const r1 = 55, r2 = isMain ? 48 : 51;
        return (
          <line
            key={i}
            x1={60 + Math.cos(angle) * r1}
            y1={60 + Math.sin(angle) * r1}
            x2={60 + Math.cos(angle) * r2}
            y2={60 + Math.sin(angle) * r2}
            stroke="rgba(180,128,44,0.5)"
            strokeWidth={isMain ? "1" : "0.5"}
          />
        );
      })}
    </svg>
  );
}

function GearSVG({ size = 120, speed = 20 }: { size?: number; speed?: number }) {
  const teeth = 16;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.78;
  const toothH = outerR * 0.18;
  const holeR = outerR * 0.22;

  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 0.35) / teeth) * Math.PI * 2 - Math.PI / 2;
    const a3 = ((i + 0.65) / teeth) * Math.PI * 2 - Math.PI / 2;
    const a4 = ((i + 1) / teeth) * Math.PI * 2 - Math.PI / 2;

    const cx = size / 2, cy = size / 2;
    const pts = [
      [cx + Math.cos(a1) * innerR, cy + Math.sin(a1) * innerR],
      [cx + Math.cos(a2) * (innerR + toothH), cy + Math.sin(a2) * (innerR + toothH)],
      [cx + Math.cos(a3) * (innerR + toothH), cy + Math.sin(a3) * (innerR + toothH)],
      [cx + Math.cos(a4) * innerR, cy + Math.sin(a4) * innerR],
    ];
    d += (i === 0 ? "M" : "L") + pts.map(p => p.join(",")).join(" L ") + " ";
  }
  d += "Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={{ animation: `spin ${speed}s linear infinite` }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); transform-origin: ${size/2}px ${size/2}px; } }`}</style>
      <path d={d} stroke="rgba(180,128,44,0.25)" strokeWidth="1" fill="rgba(180,128,44,0.04)" />
      <circle cx={size / 2} cy={size / 2} r={innerR * 0.7} stroke="rgba(180,128,44,0.2)" strokeWidth="1" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={holeR} stroke="rgba(180,128,44,0.3)" strokeWidth="1" fill="rgba(0,0,0,0.3)" />

      {/* Spokes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={size / 2 + Math.cos(angle) * holeR}
            y1={size / 2 + Math.sin(angle) * holeR}
            x2={size / 2 + Math.cos(angle) * innerR * 0.65}
            y2={size / 2 + Math.sin(angle) * innerR * 0.65}
            stroke="rgba(180,128,44,0.2)"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function GoldParticles() {
  const particles = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.35 + 0.08,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[var(--gold)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleMove ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Marquee Strip ────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const words = [
    "LUXURY WATCHES",
    "·",
    "PRECISION",
    "·",
    "AUTHENTICATION",
    "·",
    "BUY · SELL · TRADE",
    "·",
    "HOROLOGICAL EXCELLENCE",
    "·",
    "ORLANDO FLORIDA",
    "·",
  ];
  const repeated = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-[rgba(180,128,44,0.15)] bg-[rgba(180,128,44,0.04)] py-4">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {repeated.map((w, i) => (
          <span
            key={i}
            className="mx-6 text-xs font-medium uppercase tracking-[0.3em] text-[var(--gold)]"
            style={{ opacity: w === "·" ? 0.4 : 0.7 }}
          >
            {w}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { ref: heroRef, visible: heroVisible } = useReveal(0.05);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.2);
  const { ref: whoRef, visible: whoVisible } = useReveal(0.15);

  return (
    <main className="relative">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] overflow-hidden border-b border-[rgba(180,128,44,0.10)] flex items-center">

        {/* Animated watch dial — background */}
        <div
          className="pointer-events-none absolute right-[-8vw] top-1/2 -translate-y-1/2 opacity-[0.07]"
          style={{ width: "min(820px, 90vw)", aspectRatio: "1" }}
        >
          <WatchDialSVG size={820} />
        </div>

        {/* Gear decorations */}
        <div className="pointer-events-none absolute left-[-30px] bottom-[10%] opacity-40">
          <GearSVG size={160} speed={25} />
        </div>
        <div className="pointer-events-none absolute right-[5%] bottom-[5%] opacity-20">
          <GearSVG size={90} speed={15} />
        </div>

        {/* Gold particles */}
        <GoldParticles />

        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_40%,rgba(180,128,44,0.1),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(248,224,124,0.04),transparent_35%)]" />

        <div
          ref={heroRef}
          className="container-luxury relative py-32"
        >
          {/* Kicker */}
          <div
            className="flex items-center gap-3 mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="h-px w-8 bg-[var(--gold)] opacity-60" />
            <p className="section-kicker">About Us</p>
            <div className="h-px w-8 bg-[var(--gold)] opacity-60" />
          </div>

          {/* Headline */}
          <h1
            className="max-w-5xl text-5xl font-semibold leading-[1.02] text-[var(--text)] md:text-6xl xl:text-[5.5rem]"
            style={{
              fontFamily: "'Georgia', serif",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Your trusted partners
            <br />
            <span className="text-[var(--gold)] relative">
              in luxury watch
              {/* Underline decoration */}
              <span
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[var(--gold)] to-transparent"
                style={{
                  width: heroVisible ? "100%" : "0%",
                  transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s",
                }}
              />
            </span>{" "}
            trading.
          </h1>

          {/* Subtext */}
          <p
            className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            At JJ Connections, our passion for exquisite timepieces is matched only by
            our commitment to delivering an unparalleled experience in buying, selling,
            and trading luxury watches.
          </p>

          {/* Trust pills */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.5s",
            }}
          >
        
          </div>

          {/* Live clock badge */}
          <div
            className="mt-14 inline-flex items-center gap-4 rounded-[20px] border border-[rgba(180,128,44,0.2)] bg-[rgba(11,12,14,0.85)] px-5 py-4 backdrop-blur-sm"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.7s",
            }}
          >
            <div className="relative w-14 h-14 flex-shrink-0">
              <WatchDialSVG size={56} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--gold)] opacity-70">Time Is Precision</p>
              <p className="mt-0.5 text-sm text-[var(--muted)]">Every second counts in horology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ─────────────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,128,44,0.05),transparent_60%)]" />

        <div
          ref={statsRef}
          className="container-luxury"
        >
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-[24px] border border-[rgba(180,128,44,0.18)] bg-[rgba(14,15,18,0.9)] p-7 text-center group hover:border-[rgba(248,224,124,0.4)] transition-all duration-300 hover:-translate-y-1"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
                  transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}
              >
                {/* Bezel in corner */}
                <div className="absolute right-3 top-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <WatchBezelSVG size={40} />
                </div>

                <p
                  className="text-5xl font-bold text-[var(--gold-soft)]"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {statsVisible ? (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ────────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_80%_30%,rgba(180,128,44,0.05),transparent_55%)]" />

        <div
          ref={whoRef}
          className="container-luxury relative"
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left card */}
            <div
              className="luxury-card p-8 md:p-10 relative overflow-hidden"
              style={{
                opacity: whoVisible ? 1 : 0,
                transform: whoVisible ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Big gear watermark */}
              <div className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.04]">
                <GearSVG size={280} speed={40} />
              </div>

              <p className="section-kicker mb-4">Who We Are</p>

              <h2
                className="text-4xl font-semibold leading-[1.08] text-[var(--text)] md:text-5xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Built on expertise,
                <br />
                <span className="text-[var(--gold)]">precision,</span> and trust.
              </h2>

              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[var(--muted)]">
                <p>
                  We are more than a watch business. JJ Connections is a team of
                  professionals brought together by a shared respect for horology,
                  client trust, and long-term value.
                </p>
                <p>
                  Whether you are acquiring your next piece, unlocking the value of
                  one you already own, or trading into something more significant,
                  our role is to make the process feel cleaner, smarter, and more secure.
                </p>
                <p>
                  We believe luxury watch trading should feel personal,
                  confidence-driven, and elevated at every step.
                </p>
              </div>
            </div>

            {/* Right grid of service cards */}
            <div
              className="grid gap-5 sm:grid-cols-2"
              style={{
                opacity: whoVisible ? 1 : 0,
                transform: whoVisible ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              {[
                { title: "Buy", text: "Curated access to authenticated luxury watches with confidence.", icon: "◈" },
                { title: "Sell", text: "Expert guidance and market-aware valuations for your timepiece.", icon: "◇" },
                { title: "Trade", text: "A seamless path to upgrade or refine your collection.", icon: "⟳" },
                { title: "Trust", text: "Discreet service, better communication, and a more secure process.", icon: "✦" },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className="luxury-card group relative overflow-hidden p-6 cursor-default"
                  style={{
                    opacity: whoVisible ? 1 : 0,
                    transform: whoVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.7s ease ${0.25 + index * 0.1}s, transform 0.7s ease ${0.25 + index * 0.1}s`,
                  }}
                >
                  {/* Hover fill */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(180,128,44,0.06),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
                    <span>{item.icon}</span>
                    <span>0{index + 1}</span>
                  </p>
                  <h3
                    className="text-2xl font-semibold text-[var(--text)] group-hover:text-[var(--gold-soft)] transition-colors duration-300"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {item.title}
                  </h3>
                  <div className="my-3 h-px w-8 bg-[var(--gold)] opacity-30 group-hover:w-full transition-all duration-500" />
                  <p className="leading-7 text-[var(--muted)] text-sm">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-[rgba(180,128,44,0.10)] py-28 relative overflow-hidden">
        {/* Background watch pattern */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]">
            <WatchDialSVG size={900} />
          </div>
        </div>
        <GoldParticles />

        <div className="container-luxury relative">
          <div className="mb-16 text-center">
            <p className="section-kicker mb-3">Our Team</p>
            <h2
              className="section-title"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              The people behind
              <br />
              <span className="text-[var(--gold)]">JJ Connections</span>
            </h2>

            {/* Tick-mark separator */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {Array.from({ length: 21 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[var(--gold)]"
                  style={{
                    width: 1,
                    height: i % 5 === 0 ? 16 : 8,
                    opacity: i % 5 === 0 ? 0.7 : 0.2,
                  }}
                />
              ))}
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-[var(--muted)]">
              A team driven by passion, technical understanding, and a deep
              appreciation for luxury timepieces.
            </p>
          </div>

          <div className="space-y-10">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <GoldParticles />
          <div className="absolute -top-24 right-[-80px] h-[400px] w-[400px] rounded-full bg-[rgba(248,224,124,0.06)] blur-3xl" />
          <div className="absolute bottom-[-80px] left-[-60px] h-[340px] w-[340px] rounded-full bg-[rgba(180,128,44,0.1)] blur-3xl" />
        </div>

        {/* Floating gears */}
        <div className="pointer-events-none absolute right-8 top-8 opacity-15">
          <GearSVG size={140} speed={20} />
        </div>
        <div className="pointer-events-none absolute left-12 bottom-12 opacity-10">
          <GearSVG size={200} speed={35} />
        </div>

        <div className="container-luxury relative">
          <div className="relative overflow-hidden rounded-[40px] border border-[rgba(180,128,44,0.22)] bg-[linear-gradient(135deg,rgba(20,20,22,0.97),rgba(11,12,14,0.99))] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.55)] md:p-16">
            {/* Inner watch ring decoration */}
            <div className="pointer-events-none absolute right-[-60px] top-1/2 -translate-y-1/2 opacity-[0.06]">
              <WatchDialSVG size={480} />
            </div>

            <div className="relative grid items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="section-kicker mb-4">Connect With Us</p>

                <h2
                  className="text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl xl:text-6xl"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Ready to elevate your
                  <br />
                  <span className="text-[var(--gold)]">watch journey?</span>
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Whether you are looking to buy, sell, trade, polish, or
                  authenticate a luxury watch, JJ Connections is ready to guide you
                  with expertise, clarity, and personalized support.
                </p>

                {/* Horizontal tick marks */}
                <div className="mt-8 flex items-center gap-1">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[var(--gold)]"
                      style={{
                        width: 1,
                        height: i % 4 === 0 ? 14 : 7,
                        opacity: i % 4 === 0 ? 0.6 : 0.18,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href="https://wa.me/16892671285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button w-full text-center lg:w-auto relative overflow-hidden group"
                >
                  <span className="relative z-10">Start Conversation</span>
                  <span className="absolute inset-0 bg-[var(--gold-soft)] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
                </a>

                <Link
                  href="/catalogo"
                  className="outline-button w-full text-center lg:w-auto"
                >
                  Explore Catalog
                </Link>

                <p className="mt-2 text-xs text-[var(--muted)] lg:text-right leading-5">
                  Private consultation
                  <br />
                  Discreet process · Secure transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
