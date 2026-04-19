"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const floatingCards = [
  {
    title: "Curated Selection",
    text: "A stronger mix of modern icons and collectible references, chosen with an eye for rarity and desirability.",
    image: "/showcase/watch-1.png",
    index: "01",
  },
  {
    title: "Private Sourcing",
    text: "We help clients source harder-to-find watches with full clarity on provenance and condition.",
    image: "/showcase/watch-2.png",
    index: "02",
  },
  {
    title: "Trusted Process",
    text: "Premium presentation and a more secure buying experience, from first inquiry to final delivery.",
    image: "/showcase/watch-3.png",
    index: "03",
  },
  {
    title: "Worldwide Clients",
    text: "Built for discerning buyers who value trust, speed, and white-glove service wherever they are.",
    image: "/showcase/watch-4.png",
    index: "04",
  },
];

export default function ScrollWatchShowcase() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080A0C] py-24 md:py-32"
    >
      {/* ── Ambient background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(180,128,44,0.13) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(248,224,124,0.05) 0%, transparent 60%)",
        }}
      />

      {/* ── Floating dust particles ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#F8E07C] opacity-0"
            style={{
              left: `${(i * 13 + 5) % 100}%`,
              top: `${(i * 19 + 7) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animation: `floatDust ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatDust {
          0%   { opacity: 0; transform: translateY(0px) scale(0.8); }
          50%  { opacity: 0.25; }
          100% { opacity: 0.07; transform: translateY(-18px) scale(1.1); }
        }
        @keyframes watchFloat {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes watchRotateSlow {
          0%   { transform: rotate(-6deg); }
          50%  { transform: rotate(6deg); }
          100% { transform: rotate(-6deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.08); }
        }
        .center-watch-anim {
          animation: watchFloat 7s ease-in-out infinite;
        }
        .glow-ring {
          animation: glowPulse 4s ease-in-out infinite;
        }
        .card-watch-anim {
          animation: watchRotateSlow 9s ease-in-out infinite;
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        {/* ── Section header ── */}
        <div
          className="mb-16 text-center md:mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#B4802C]">
            Why choose us
          </p>
          <h2
            className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.08] text-white sm:text-4xl md:text-5xl xl:text-6xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            A more trusted way to buy, source, and sell{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #B4802C 0%, #F8E07C 50%, #C9942A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              luxury watches.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#888C95] md:text-lg md:leading-8">
            JJ Connections is built around presentation, selection, and client
            confidence — making every step feel cleaner, more personal, and
            more professional.
          </p>
        </div>

        {/* ── Main layout: cards + center watch ── */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-8 xl:gap-12">

          {/* Left cards */}
          <div className="flex w-full flex-col gap-5 sm:flex-row lg:w-auto lg:flex-col lg:gap-6">
            {floatingCards.slice(0, 2).map((card, i) => (
              <ShowcaseCard
                key={card.index}
                card={card}
                visible={visible}
                delay={i * 150 + 100}
              />
            ))}
          </div>

          {/* Center watch */}
          <div
            className="relative flex-shrink-0 order-first lg:order-none"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.88)",
              transition: "opacity 1.1s ease, transform 1.1s ease",
            }}
          >
            {/* Glow behind watch */}
            <div
              className="glow-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "340px",
                height: "340px",
                background:
                  "radial-gradient(circle, rgba(180,128,44,0.30) 0%, rgba(180,128,44,0.06) 55%, transparent 75%)",
              }}
            />
            {/* Decorative thin ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(180,128,44,0.18)]"
              style={{ width: "380px", height: "380px" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(180,128,44,0.08)]"
              style={{ width: "460px", height: "460px" }}
            />

            <img
              src="/showcase/watch-center.png"
              alt="JJ Connections featured watch"
              className="center-watch-anim relative z-10 w-[260px] object-contain drop-shadow-[0_30px_90px_rgba(0,0,0,0.70)] sm:w-[300px] md:w-[340px] lg:w-[300px] xl:w-[360px]"
            />
          </div>

          {/* Right cards */}
          <div className="flex w-full flex-col gap-5 sm:flex-row lg:w-auto lg:flex-col lg:gap-6">
            {floatingCards.slice(2).map((card, i) => (
              <ShowcaseCard
                key={card.index}
                card={card}
                visible={visible}
                delay={i * 150 + 300}
              />
            ))}
          </div>
        </div>

        {/* ── CTA buttons ── */}
        <div
          className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s",
          }}
        >
          <a
            href="https://wa.me/10000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0A0A0A] sm:w-auto"
            style={{
              background:
                "linear-gradient(120deg, #B4802C 0%, #F8E07C 50%, #C9942A 100%)",
            }}
          >
            <span className="relative z-10">Contact on WhatsApp</span>
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(120deg, #C9942A 0%, #F8E07C 50%, #B4802C 100%)",
              }}
            />
          </a>

          <Link
            href="/catalogo"
            className="inline-flex w-full items-center justify-center rounded-full border border-[rgba(180,128,44,0.40)] bg-transparent px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#F8E07C] transition-all duration-300 hover:border-[rgba(248,224,124,0.70)] hover:bg-[rgba(180,128,44,0.10)] sm:w-auto"
          >
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Individual Card ── */
function ShowcaseCard({
  card,
  visible,
  delay,
}: {
  card: (typeof floatingCards)[0];
  visible: boolean;
  delay: number;
}) {
  return (
    <article
      className="group relative w-full overflow-hidden rounded-2xl border border-[rgba(180,128,44,0.14)] bg-[linear-gradient(160deg,#111418,#0D0F12)] p-5 transition-all duration-500 hover:border-[rgba(248,224,124,0.28)] hover:shadow-[0_0_40px_rgba(180,128,44,0.12)] sm:w-auto lg:w-[260px] xl:w-[290px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {/* subtle inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(180,128,44,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Watch image */}
      <div className="relative mb-5 overflow-hidden rounded-xl border border-[rgba(248,224,124,0.07)] bg-[linear-gradient(145deg,#1A1E23,#0D1013)]">
        <img
          src={card.image}
          alt={card.title}
          className="card-watch-anim mx-auto h-[130px] w-full object-contain p-4"
        />
      </div>

      {/* Index + dot */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#B4802C]">
          {card.index}
        </span>
        <span className="h-px flex-1 bg-[rgba(180,128,44,0.20)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#B4802C]" />
      </div>

      <h3 className="text-xl font-semibold leading-snug text-white xl:text-2xl">
        {card.title}
      </h3>
      <p className="mt-3 text-sm leading-[1.75] text-[#777C86]">{card.text}</p>
    </article>
  );
}
