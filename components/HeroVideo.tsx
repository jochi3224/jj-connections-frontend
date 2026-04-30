"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

function WatchDial({ size = 400, opacity = 0.22 }: { size?: number; opacity?: number }) {
  const hourRef = useRef<SVGLineElement | null>(null);
  const minuteRef = useRef<SVGLineElement | null>(null);
  const secondRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      const ms = now.getMilliseconds();

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

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity }}>
      <circle cx={cx} cy={cy} r={r} stroke="rgba(180,128,44,0.95)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r - 14} stroke="rgba(180,128,44,0.45)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={r - 32} stroke="rgba(180,128,44,0.22)" strokeWidth="0.5" />

      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const isHour = i % 5 === 0;

        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * (r - 2)}
            y1={cy + Math.sin(a) * (r - 2)}
            x2={cx + Math.cos(a) * (isHour ? r - 22 : r - 12)}
            y2={cy + Math.sin(a) * (isHour ? r - 22 : r - 12)}
            stroke={isHour ? "rgba(180,128,44,1)" : "rgba(180,128,44,0.52)"}
            strokeWidth={isHour ? "2" : "0.8"}
          />
        );
      })}

      <line
        ref={hourRef}
        x1={cx}
        y1={cy + r * 0.12}
        x2={cx}
        y2={cy - r * 0.44}
        stroke="rgba(246,243,238,0.82)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.5s ease" }}
      />

      <line
        ref={minuteRef}
        x1={cx}
        y1={cy + r * 0.14}
        x2={cx}
        y2={cy - r * 0.65}
        stroke="rgba(246,243,238,0.92)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ transformOrigin: `${cx}px ${cy}px`, transition: "transform 0.2s ease" }}
      />

      <line
        ref={secondRef}
        x1={cx}
        y1={cy + r * 0.18}
        x2={cx}
        y2={cy - r * 0.75}
        stroke="rgba(180,128,44,1)"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      <circle cx={cx} cy={cy} r="6" fill="rgba(180,128,44,0.95)" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0b0c0e" />
    </svg>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          let i = 0;
          const id = setInterval(() => {
            i++;
            setVal(Math.round(to * (i / 52)));
            if (i >= 52) clearInterval(id);
          }, 1800 / 52);
        }
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function FloatingBadge({
  label,
  value,
  style,
  visible,
  delay = "0s",
}: {
  label: string;
  value: string;
  style?: React.CSSProperties;
  visible: boolean;
  delay?: string;
}) {
  return (
    <div
      className="absolute rounded-2xl border border-[rgba(180,128,44,0.3)] bg-[rgba(9,10,12,0.9)] px-4 py-3 backdrop-blur-md"
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
        transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.94)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(248,224,124,0.06)",
      }}
    >
      <div className="absolute left-0 right-0 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-[rgba(248,224,124,0.4)] to-transparent" />
      <p className="text-[0.58rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)]">{label}</p>
      <p className="mt-0.5 text-[0.78rem] font-semibold text-[var(--text)]">{value}</p>
    </div>
  );
}

export default function HeroVideo() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [dialVisible, setDialVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const t1 = setTimeout(() => setEntered(true), 100);
    const t2 = setTimeout(() => setDialVisible(true), 700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: isMobile ? 18 : 42 }, (_, i) => ({
        id: i,
        size: (i % 4) + 1.2,
        baseX: (i * 13 + 7) % 100,
        baseY: (i * 9 + 5) % 100,
        speed: ((i % 4) + 1) * 0.45,
        duration: 4 + (i % 5),
        delay: i * 0.14,
      })),
    [isMobile]
  );

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[rgba(180,128,44,0.10)]"
      onMouseMove={(e) => {
        if (isMobile) return;
        const r = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
        });
      }}
      onMouseLeave={() => setMouse({ x: 50, y: 50 })}
    >
      <style>{`
        @keyframes scanLine {
          0% { top: 8%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 0.5; }
          100% { top: 92%; opacity: 0; }
        }
        @keyframes pulseRing {
          0% { transform: translate(-50%,-50%) scale(0.82); opacity: 0.55; }
          100% { transform: translate(-50%,-50%) scale(1.22); opacity: 0; }
        }
        @keyframes scrollPulse {
          0%,100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.35); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-140%) skewX(-18deg); opacity: 0; }
          18% { opacity: 0.28; }
          50% { opacity: 0.18; }
          100% { transform: translateX(180%) skewX(-18deg); opacity: 0; }
        }
        .scan-line-hero { animation: scanLine 4.5s ease-in-out 1.8s infinite; }
        .pulse-ring-hero { animation: pulseRing 2.5s ease-out 1.2s infinite; }
        .scroll-pulse { animation: scrollPulse 2s ease-in-out infinite; }
        .hero-shimmer { animation: shimmerSweep 5.8s ease-in-out 1.2s infinite; }
      `}</style>

      <div className="absolute inset-0">
        <video className="h-full w-full object-cover opacity-[0.10] md:opacity-[0.14]" autoPlay muted loop playsInline>
          <source src="/video/hero-watch.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,10,12,0.95)_0%,rgba(9,10,12,0.55)_48%,rgba(9,10,12,0.65)_100%)] md:bg-[linear-gradient(135deg,rgba(9,10,12,0.92)_0%,rgba(9,10,12,0.40)_48%,rgba(9,10,12,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_35%,rgba(180,128,44,0.12),transparent_68%)] md:bg-[radial-gradient(ellipse_55%_65%_at_70%_42%,rgba(180,128,44,0.16),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_45%_at_10%_72%,rgba(248,224,124,0.04),transparent_60%)] md:bg-[radial-gradient(ellipse_45%_45%_at_10%_72%,rgba(248,224,124,0.05),transparent_60%)]" />

      {mounted && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => {
            const dx = isMobile ? 0 : (mouse.x - 50) * 0.07 * p.speed;
            const dy = isMobile ? 0 : (mouse.y - 50) * 0.05 * p.speed;

            return (
              <span
                key={p.id}
                className="particle absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `calc(${p.baseX}% + ${dx}px)`,
                  top: `calc(${p.baseY}% + ${dy}px)`,
                  background: "rgba(248,224,124,0.62)",
                  boxShadow: "0 0 8px rgba(248,224,124,0.34)",
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  transition: "left 0.5s ease, top 0.5s ease",
                }}
              />
            );
          })}
        </div>
      )}

      <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-[3px] pl-1 md:flex">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="bg-[var(--gold)]"
            style={{
              height: 1,
              width: i % 4 === 0 ? 20 : 9,
              opacity: i % 4 === 0 ? 0.45 : 0.12,
            }}
          />
        ))}
      </div>

      <div className="container-luxury relative flex flex-col pt-20 pb-14 lg:grid lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-28">
        <div
          className="relative order-1 flex items-center justify-center lg:order-2"
          style={{
            perspective: "1600px",
            minHeight: isMobile ? 250 : 300,
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.2s ease 0.2s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <div className="absolute h-[220px] w-[220px] rounded-full bg-[rgba(180,128,44,0.16)] blur-3xl sm:h-[300px] sm:w-[300px] lg:h-[440px] lg:w-[440px]" />
          <div className="absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(248,224,124,0.06),transparent_55%)] blur-3xl sm:h-[440px] sm:w-[440px] lg:h-[620px] lg:w-[620px]" />

          <div className="absolute inset-0 hidden items-center justify-center md:flex" style={{ opacity: dialVisible ? 1 : 0, transition: "opacity 1.5s ease" }}>
            <WatchDial size={420} opacity={0.22} />
          </div>

          <div className="relative z-10" style={{ transform: "none", transformStyle: "preserve-3d" }}>
            {!isMobile && (
              <div className="scan-line-hero pointer-events-none absolute left-0 right-0 z-30 h-[1.5px] bg-gradient-to-r from-transparent via-[rgba(180,128,44,0.7)] to-transparent" />
            )}

            <div className="hero-shimmer pointer-events-none absolute inset-y-0 left-[-20%] z-20 w-[40%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] blur-[2px]" />

            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-full"
              style={{
                background: isMobile
                  ? "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 22%, transparent 50%)"
                  : `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(255,255,255,0.24), rgba(255,255,255,0.05) 22%, transparent 50%)`,
                transition: "background 0.18s ease",
              }}
            />

            <img
              src="/img/rolex-hero.png"
              alt="Luxury watch"
              className="relative z-10 mx-auto w-full max-w-[220px] drop-shadow-[0_24px_44px_rgba(0,0,0,0.72)] sm:max-w-[300px] lg:max-w-[460px]"
            />

            {!isMobile && (
              <>
                <div className="absolute -inset-5 rounded-full border border-[rgba(180,128,44,0.12)]" style={{ transform: "translateZ(-16px)" }} />
                <div className="absolute -inset-12 rounded-full border border-[rgba(180,128,44,0.06)]" style={{ transform: "translateZ(-32px)" }} />
              </>
            )}
          </div>

          <div className="pulse-ring-hero pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] rounded-full border border-[rgba(180,128,44,0.20)] sm:h-[210px] sm:w-[210px] lg:h-[300px] lg:w-[300px]" />

          <div className="hidden lg:block">
            <FloatingBadge label="Certified" value="100% Authentic" visible={dialVisible} delay="1.1s" style={{ top: "10%", right: "-2%", zIndex: 30 }} />
            <FloatingBadge label="Orlando, FL" value="Private Consultation" visible={dialVisible} delay="1.35s" style={{ bottom: "12%", left: "-2%", zIndex: 30 }} />
          </div>
        </div>

        <div
          className="order-2 mt-10 flex flex-col lg:order-1 lg:mt-0"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.1s ease 0.1s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <h1
            className="text-[1.8rem] font-semibold leading-[1.08] text-[var(--text)] sm:text-5xl xl:text-[3.4rem]"
            style={{
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.02em",
              opacity: entered ? 1 : 0,
              transition: "opacity 0.9s ease 0.2s",
            }}
          >
            Buying, selling  &  
            <br className="hidden sm:block" />
             trading luxury watches
            <br />
            <span className="relative mt-1 inline-block text-[var(--gold)]">
              made simple and secure.
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-[var(--gold)] via-[var(--gold-soft)] to-transparent"
                style={{
                  width: entered ? "100%" : "0%",
                  transition: "width 1.4s cubic-bezier(0.16,1,0.3,1) 1s",
                }}
              />
            </span>
          </h1>

    
          <div className="mt-5 flex flex-wrap gap-2" style={{ opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.55s" }}>
            {["✦ Authenticated", "✦ Concierge Service"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[rgba(180,128,44,0.28)] bg-[rgba(180,128,44,0.07)] px-3 py-1.5 text-[0.68rem] text-[var(--gold-soft)] sm:px-3.5 sm:text-[0.72rem]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row" style={{ opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.65s" }}>
            <Link href="/catalogo" className="gold-button inline-flex items-center justify-center gap-2 text-sm">
              View Catalog
            </Link>

            <Link href="/services" className="outline-button inline-flex items-center justify-center gap-2 text-sm">
              Our Services
            </Link>
          </div>

          <div
            className="mt-8 grid w-full max-w-[300px] grid-cols-3 overflow-hidden rounded-2xl border border-[rgba(180,128,44,0.16)] bg-[rgba(12,13,16,0.8)] backdrop-blur-sm mx-auto sm:mx-0 sm:max-w-xs"
            style={{ opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.8s" }}
          >
            {[
              { value: 500, suffix: "+", label: "Sold" },
              { value: 3, suffix: "+", label: "Years" },
              { value: 100, suffix: "%", label: "Auth." },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center py-4"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(180,128,44,0.12)" : "none",
                  background: i === 1 ? "rgba(180,128,44,0.04)" : "transparent",
                }}
              >
                <span className="text-xl font-bold text-[var(--gold-soft)] sm:text-2xl" style={{ fontFamily: "'Georgia', serif" }}>
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-0.5 text-[0.57rem] uppercase tracking-[0.16em] text-[var(--muted)] opacity-60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex" style={{ opacity: dialVisible ? 1 : 0, transition: "opacity 0.7s ease 2.2s" }}>
        <div className="scroll-pulse h-8 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
        <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[var(--gold)] opacity-45">Scroll</p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}