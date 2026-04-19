import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    number: "01",
    title: "Buy",
    text: "Discover a curated selection of authenticated luxury watches presented with clarity, confidence, and a more elevated buying experience.",
  },
  {
    number: "02",
    title: "Sell",
    text: "Unlock the value of your timepiece through expert guidance, fair evaluations, and a process designed to feel discreet and efficient.",
  },
  {
    number: "03",
    title: "Trade",
    text: "Refine or upgrade your collection with market-aware trade options that make your next move more seamless and strategic.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden border-b border-[rgba(180,128,44,0.10)] py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(180,128,44,0.12),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(248,224,124,0.05),transparent_18%)]" />

        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className={`about-particle absolute rounded-full ${i % 5 === 0 ? "about-particle-lg" : ""}`}
              style={{
                width: `${(i % 4) + 3}px`,
                height: `${(i % 4) + 3}px`,
                left: `${(i * 9 + 7) % 100}%`,
                top: `${(i * 13 + 11) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4.5 + (i % 5)}s`,
              }}
            />
          ))}
        </div>

        <div className="container-luxury relative">
          <p className="section-kicker mb-4">Services</p>

          <h1 className="max-w-5xl text-4xl font-semibold leading-[1.03] text-[var(--text)] md:text-6xl xl:text-7xl">
            Built for every stage of
            <br />
            your watch journey.
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Whether you are buying, selling, trading, restoring, or
            authenticating a luxury watch, JJ Connections is designed to make
            the experience feel more secure, more personal, and more refined.
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--gold-soft)]">
            <span>✔ Trusted process</span>
            <span>✔ Market-driven guidance</span>
            <span>✔ Private client experience</span>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxury">
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-[32px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(248,224,124,0.24)] hover:shadow-[0_24px_70px_rgba(180,128,44,0.08)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
                    {service.number}
                  </p>
                  <span className="h-2 w-2 rounded-full bg-[var(--gold)] opacity-70" />
                </div>

                <h2 className="text-3xl font-semibold text-[var(--text)]">
                  {service.title}
                </h2>

                <p className="mt-5 leading-8 text-[var(--muted)]">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-luxury">
          <div className="grid gap-8 xl:grid-cols-2">
            <article className="group relative overflow-hidden rounded-[34px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-0">
                <img
                  src="/img/service-polish.jpg"
                  alt="Watch polishing service"
                  className="h-full w-full object-cover opacity-[0.22] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-[0.28]"
                />
              </div>

              <div className="relative p-10 md:p-12">
                <p className="section-kicker mb-4">Polish</p>

                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl">
                  Restore brilliance
                  <br />
                  and presence.
                </h2>

                <p className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">
                  Over time, even outstanding watches can accumulate visible
                  signs of wear. Our polishing service is designed to improve
                  presentation, reduce imperfections, and help your timepiece
                  recover a more refined, factory-fresh appearance.
                </p>

                <p className="mt-5 max-w-2xl leading-8 text-[var(--muted)]">
                  Let JJ Connections help bring your watch back to life with a
                  finish that feels cleaner, brighter, and more worthy of the
                  piece on your wrist.
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-[34px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-0">
                <img
                  src="/img/service-authenticate.jpg"
                  alt="Watch authentication service"
                  className="h-full w-full object-cover opacity-[0.22] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-[0.28]"
                />
              </div>

              <div className="relative p-10 md:p-12">
                <p className="section-kicker mb-4">Authenticate</p>

                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl">
                  Confidence in a market
                  <br />
                  full of uncertainty.
                </h2>

                <p className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">
                  In the world of luxury watches, authenticity is everything.
                  Our authentication process is designed to protect your
                  investment, uncover hidden issues, and provide greater clarity
                  when buying, selling, or trading.
                </p>

                <p className="mt-5 max-w-2xl leading-8 text-[var(--muted)]">
                  With JJ Connections, you gain a more trustworthy process,
                  stronger transparency, and the peace of mind needed when real
                  value is at stake.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxury">
          <div className="relative overflow-hidden rounded-[38px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(135deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] p-12 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
            <div className="pointer-events-none absolute -top-20 right-[-60px] h-[300px] w-[300px] rounded-full bg-[rgba(248,224,124,0.08)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-[260px] w-[260px] rounded-full bg-[rgba(180,128,44,0.12)] blur-3xl" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="section-kicker mb-4">Private Consultation</p>

                <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl xl:text-6xl">
                  Let’s make your next move with confidence.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                  Whether you want to acquire, sell, trade, restore, or verify
                  a watch, our team is ready to guide you with clarity,
                  discretion, and personalized support.
                </p>

                <div className="mt-7 flex flex-wrap gap-6 text-sm text-[var(--gold-soft)]">
                  <span>✔ Private sourcing</span>
                  <span>✔ Discreet process</span>
                  <span>✔ Secure transactions</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href="https://wa.me/16892671285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button w-full text-center lg:w-auto"
                >
                  Start Conversation
                </a>

                <a
                  href="mailto:jjconnections@gmail.com"
                  className="outline-button w-full text-center lg:w-auto"
                >
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