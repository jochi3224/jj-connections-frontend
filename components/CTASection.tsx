export default function CTASection() {
  return (
    <section className="py-28" id="contact">
      <div className="container-luxury">
        <div className="relative overflow-hidden rounded-[36px] border border-[rgba(180,128,44,0.18)] bg-[linear-gradient(135deg,rgba(18,18,18,0.96),rgba(11,12,14,0.98))] p-12 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">

          {/* Glow premium */}
          <div className="pointer-events-none absolute -top-20 right-[-60px] h-[300px] w-[300px] rounded-full bg-[rgba(248,224,124,0.08)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-60px] left-[-60px] h-[260px] w-[260px] rounded-full bg-[rgba(180,128,44,0.12)] blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            
            {/* TEXTO */}
            <div>
              <p className="section-kicker mb-4">
                PRIVATE CONSULTATION
              </p>

              <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-[var(--text)] md:text-5xl xl:text-6xl">
                Your next timepiece is one message away.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Whether you are looking to acquire a rare reference, sell a high-value piece,
                or upgrade your collection, our team provides direct access, expert insight,
                and a seamless, discreet experience tailored to you.
              </p>

              {/* confianza */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-[var(--gold-soft)]">
                <span>✔ Private sourcing</span>
                <span>✔ Verified timepieces</span>
                <span>✔ Worldwide clients</span>
              </div>
            </div>

            {/* BOTONES */}
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

              {/* micro copy */}
              <p className="mt-2 text-xs text-[var(--muted)] lg:text-right">
                Response time usually under 24h • Discreet & secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}