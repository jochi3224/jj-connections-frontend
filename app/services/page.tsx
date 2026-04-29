import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[rgba(180,128,44,0.10)] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(180,128,44,0.12),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(248,224,124,0.05),transparent_18%)]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="particle absolute rounded-full bg-[rgba(248,224,124,0.45)]"
              style={{
                width: `${(i % 4) + 2}px`,
                height: `${(i % 4) + 2}px`,
                left: `${(i * 9 + 7) % 100}%`,
                top: `${(i * 13 + 11) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4.5 + (i % 5)}s`,
                boxShadow: "0 0 6px rgba(248,224,124,0.2)",
              }}
            />
          ))}
        </div>

        <div className="container-luxury relative">
          <p className="section-kicker mb-4">Services</p>
          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] text-[var(--text)] md:text-6xl xl:text-7xl"
            style={{ fontFamily: "'Georgia', serif" }}>
            Built for every stage of
            <br />
            your watch journey.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Whether you are buying, selling, trading, restoring, or authenticating a
            luxury watch, JJ Connections is designed to make the experience feel more
            secure, more personal, and more refined.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--gold-soft)]">
            <span>✔ Trusted process</span>
            <span>✔ Market-driven guidance</span>
            <span>✔ Private client experience</span>
          </div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-14">
        <div className="container-luxury">
          <div className="grid gap-8">

            {/* ── AUTHENTICATION ── */}
            <ServiceCard
              kicker="Authentication"
              title={<>Confidence in a market<br />full of uncertainty.</>}
              image="/img/service-authenticate.jpg"
              body={[
                "In the world of luxury watches, authenticity is everything. Our authentication process is designed to protect your investment, uncover hidden issues, and provide greater clarity before you buy, sell, or trade.",
                "With JJ Connections, you gain a more trustworthy process, stronger transparency, and the peace of mind needed when real value is at stake.",
              ]}
            />

            {/* ── BUY / SELL / TRADE ── */}
            <article className="group relative overflow-hidden rounded-[34px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-0">
                <img src="/img/service-buy-sell-trade.jpg" alt="Buy sell trade luxury watches"
                  className="h-full w-full object-cover opacity-[0.22] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-[0.28]" />
              </div>

              <div className="relative p-10 md:p-12">
                <p className="section-kicker mb-4">Buy / Sell / Trade</p>
                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  A seamless way to buy,
                  <br />
                  sell, or trade luxury watches.
                </h2>
                <p className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">
                  Whether you are searching for your next timepiece, ready to unlock
                  the value of one you already own, or looking to trade into something
                  more significant, our process is built to feel discreet, efficient,
                  and premium from start to finish.
                </p>
                <p className="mt-5 max-w-2xl leading-8 text-[var(--muted)]">
                  JJ Connections combines curated sourcing, transparent guidance, and a
                  private client experience to make every step feel more secure, more
                  personal, and more elevated.
                </p>

                {/* ── 3 cards ── */}
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Buy",
                      num: "01",
                      text: "Discover curated luxury watches with confidence, clarity, and access to exceptional pieces.",
                    },
                    {
                      label: "Sell",
                      num: "02",
                      text: "Unlock the value of your watch through a more secure, transparent, and professional selling process.",
                    },
                    {
                      label: "Trade",
                      num: "03",
                      text: "Transition into your next watch with a smoother, market-aware trade experience designed for collectors.",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="group/card relative overflow-hidden rounded-[22px] border border-[rgba(180,128,44,0.18)] bg-[rgba(10,10,10,0.60)] p-6 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(248,224,124,0.35)] hover:bg-[rgba(180,128,44,0.06)]"
                    >
                      {/* Top accent line */}
                      <div className="absolute left-0 right-0 top-0 h-[1.5px] origin-left scale-x-0 bg-gradient-to-r from-[var(--gold)] to-transparent transition-transform duration-400 group-hover/card:scale-x-100" />

                      <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[var(--gold)] opacity-60">
                        {item.num}
                      </p>
                      <h3 className="mb-3 text-2xl font-semibold text-[var(--text)] transition-colors duration-200 group-hover/card:text-[var(--gold-soft)]"
                        style={{ fontFamily: "'Georgia', serif" }}>
                        {item.label}
                      </h3>
                      {/* Expanding divider */}
                      <div className="mb-3 h-px w-6 bg-gradient-to-r from-[var(--gold)] to-transparent opacity-40 transition-all duration-400 group-hover/card:w-full" />
                      <p className="text-sm leading-7 text-[var(--muted)]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* ── POLISH ── */}
            <ServiceCard
              kicker="Polish"
              title={<>Restore brilliance<br />and presence.</>}
              image="/img/service-polish.jpg"
              body={[
                "Over time, even outstanding watches can accumulate visible signs of wear. Our polishing service is designed to improve presentation, reduce imperfections, and help your timepiece recover a more refined, factory-fresh appearance.",
                "Let JJ Connections help bring your watch back to life with a finish that feels cleaner, brighter, and more worthy of the piece on your wrist.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="container-luxury">
          <div className="relative overflow-hidden rounded-[38px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(135deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] p-12 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-16">
            <div className="pointer-events-none absolute -top-20 right-[-60px] h-[300px] w-[300px] rounded-full bg-[rgba(248,224,124,0.08)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-[260px] w-[260px] rounded-full bg-[rgba(180,128,44,0.12)] blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="section-kicker mb-4">Private Consultation</p>
                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl xl:text-6xl"
                  style={{ fontFamily: "'Georgia', serif" }}>
                  Let's make your next move with confidence.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Whether you want to acquire, sell, trade, restore, or verify a watch,
                  our team is ready to guide you with clarity, discretion, and
                  personalized support.
                </p>
                <div className="mt-7 flex flex-wrap gap-6 text-sm text-[var(--gold-soft)]">
                  <span>✔ Private sourcing</span>
                  <span>✔ Discreet process</span>
                  <span>✔ Secure transactions</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <a href="https://wa.me/16892671285" target="_blank" rel="noopener noreferrer"
                  className="gold-button w-full text-center lg:w-auto">
                  Start Conversation
                </a>
                <a href="mailto:info@jjconnections.com"
                  className="outline-button w-full text-center lg:w-auto">
                  Email Us
                </a>
                <p className="mt-2 text-xs text-[var(--muted)] lg:text-right">
                  Response time usually under 24h
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

// ─── Reusable service card ────────────────────────────────────────────────────
function ServiceCard({
  kicker,
  title,
  image,
  body,
}: {
  kicker: string;
  title: React.ReactNode;
  image: string;
  body: string[];
}) {
  return (
    <article className="group relative overflow-hidden rounded-[34px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
      <div className="absolute inset-0">
        <img src={image} alt={kicker}
          className="h-full w-full object-cover opacity-[0.22] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-[0.28]" />
      </div>
      <div className="relative p-10 md:p-12">
        <p className="section-kicker mb-4">{kicker}</p>
        <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl"
          style={{ fontFamily: "'Georgia', serif" }}>
          {title}
        </h2>
        {body.map((p, i) => (
          <p key={i} className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">{p}</p>
        ))}
      </div>
    </article>
  );
}
