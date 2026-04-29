"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimCounter({ to, suffix }: { to: number; suffix: string }) {
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
          const steps = 50;

          const id = setInterval(() => {
            i++;
            setVal(Math.round(to * (i / steps)));
            if (i >= steps) clearInterval(id);
          }, 1500 / steps);
        }
      },
      { threshold: 0.5 }
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

export default function AboutSection() {
  const { ref: sectionRef, visible } = useInView(0.06);

  const stats = [
    { num: 500, suffix: "+", label: "Watches Sold" },
    { num: 3, suffix: "+", label: "Years Experience" },
    { num: 100, suffix: "%", label: "Client Satisfaction" },
    { num: 200, suffix: "+", label: "QC Inspections Conducted" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-[#070809] py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,128,44,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(180,128,44,0.055) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-3xl"
        style={{
          background: "radial-gradient(circle, #B4802C, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-[-160px] hidden h-[520px] w-[520px] rounded-full border border-[rgba(180,128,44,0.08)] md:block"
      />

      <div className="container-luxury relative">
        <div
          className="mb-8 flex items-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(180,128,44,0.35)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#B4802C]">
            About Us
          </span>

          <div className="h-px flex-1 bg-gradient-to-r from-[rgba(180,128,44,0.55)] to-transparent" />
        </div>

        <h2
          className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl md:text-7xl xl:text-8xl"
          style={{
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.035em",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s ease 0.15s, transform 1s ease 0.15s",
          }}
        >
          Your trusted
          <br />
          partners
          <br />
          in <span className="text-[var(--gold)]">horology.</span>
        </h2>

        <div
          className="mt-16 grid grid-cols-2 gap-6 border-y border-[rgba(180,128,44,0.14)] py-8 sm:grid-cols-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex flex-col gap-1 px-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ease ${
                  0.45 + i * 0.1
                }s, transform 0.7s ease ${0.45 + i * 0.1}s`,
              }}
            >
              <span
                className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                style={{
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {visible ? (
                  <AnimCounter to={stat.num} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </span>

              <span className="text-[0.65rem] uppercase tracking-[0.24em] text-[#666C77]">
                {stat.label}
              </span>

              <div className="mt-2 flex gap-[2px]">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={j}
                    className="bg-[#B4802C]"
                    style={{
                      width: 1,
                      height: j % 2 === 0 ? 6 : 4,
                      opacity: j % 2 === 0 ? 0.4 : 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}