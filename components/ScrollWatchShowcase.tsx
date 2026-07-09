"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
      className="relative overflow-hidden bg-[#080A0C] py-20 sm:py-24 md:py-28"
    >
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 18%, rgba(180,128,44,0.14) 0%, transparent 70%), radial-gradient(ellipse 36% 26% at 18% 84%, rgba(248,224,124,0.06) 0%, transparent 60%), radial-gradient(ellipse 34% 22% at 82% 24%, rgba(180,128,44,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.15),rgba(8,10,12,0.0)_18%,rgba(8,10,12,0.0)_82%,rgba(8,10,12,0.25))]" />

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#F8E07C] opacity-0"
            style={{
              left: `${(i * 11 + 7) % 100}%`,
              top: `${(i * 17 + 9) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animation: `floatDust ${5.5 + (i % 4)}s ease-in-out ${i * 0.24}s infinite alternate`,
              boxShadow: "0 0 12px rgba(248,224,124,0.28)",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatDust {
          0%   { opacity: 0; transform: translateY(0px) scale(0.85); }
          35%  { opacity: 0.20; }
          100% { opacity: 0.08; transform: translateY(-20px) scale(1.08); }
        }
        @keyframes watchFloat {
          0%, 100% { transform: translateY(0px) rotate(-0.8deg); }
          50% { transform: translateY(-10px) rotate(0.8deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.42; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.72; transform: translate(-50%, -50%) scale(1.06); }
        }
        @keyframes ringRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .center-watch-anim {
          animation: watchFloat 7s ease-in-out infinite;
        }
        .glow-ring {
          animation: glowPulse 4.2s ease-in-out infinite;
        }
        .orbit-ring {
          animation: ringRotate 28s linear infinite;
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div
          className="mb-14 text-center md:mb-16"
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
            className="mx-auto max-w-4xl text-3xl font-semibold leading-[1.08] text-white sm:text-4xl md:text-5xl xl:text-6xl"
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
            confidence  making every step feel cleaner, more personal, and
            more professional.
          </p>
        </div>

        {/* Main centered watch */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(26px) scale(0.96)",
            transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
          }}
        >
          {/* Glow core */}
          <div
            className="glow-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: "clamp(220px, 52vw, 420px)",
              height: "clamp(220px, 52vw, 420px)",
              background:
                "radial-gradient(circle, rgba(180,128,44,0.28) 0%, rgba(180,128,44,0.10) 48%, transparent 72%)",
            }}
          />

          {/* Rotating fine ring */}
          <div
            aria-hidden
            className="orbit-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[rgba(180,128,44,0.16)]"
            style={{
              width: "clamp(260px, 62vw, 500px)",
              height: "clamp(260px, 62vw, 500px)",
            }}
          />

          {/* Static outer ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-[rgba(180,128,44,0.08)]"
            style={{
              width: "clamp(310px, 74vw, 620px)",
              height: "clamp(310px, 74vw, 620px)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Decorative particles around watch */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#B4802C]"
                style={{
                  width: i % 3 === 0 ? 5 : 3,
                  height: i % 3 === 0 ? 5 : 3,
                  left: `${18 + ((i * 13) % 64)}%`,
                  top: `${20 + ((i * 11) % 58)}%`,
                  opacity: i % 3 === 0 ? 0.42 : 0.22,
                  boxShadow: "0 0 10px rgba(248,224,124,0.24)",
                }}
              />
            ))}
          </div>

          {/* Watch */}
          <div className="relative z-10 flex justify-center">
            <img
              src="/showcase/watch-center.png"
              alt="JJ Connections featured watch"
              className="center-watch-anim w-[350px] object-contain drop-shadow-[0_26px_80px_rgba(0,0,0,0.72)] sm:w-[360px] md:w-[400px] lg:w-[600px]"
            />
          </div>

          {/* Bottom text block */}
          <div 
            className="relative z-10 mt-10 max-w-3xl text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 1s ease 0.25s, transform 1s ease 0.25s",
            }}
          >
            <h3
              className="text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Centered on trust, presentation, and discretion.
            </h3>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/16892671285"
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
        </div>
      </div>
    </section>
  );
}