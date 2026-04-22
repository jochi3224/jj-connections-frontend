import Link from "next/link";

export default function OwnersSection() {
  const owners = [
    {
      name: "JJ Gonzalez",
      role: "Founder",
      image: "/img/team-jj.jpg",
      note: "A seasoned mechanical engineer whose deep understanding of complex mechanisms drives our rigorous authentication and servicing standards.",
    },
    {
      name: "Dr. Del Rodriguez",
      role: "Co-Founder",
      image: "/img/team-del.jpg",
      note: "Oversees administrative and operational excellence, ensuring every transaction is handled with professionalism, care, and precision.",
    },
  ];

  return (
    <section className="py-24">
      <div className="container-luxury">
        <div className="mb-14 text-center">
          <p className="section-kicker mb-3">Our Team</p>
          <h2 className="section-title">Expertise behind every transaction</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[var(--muted)]">
            JJ Connections combines engineering precision, operational
            excellence, and genuine passion for horology.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {owners.map((owner) => (
            <article
              key={owner.name}
              className="group flex h-full flex-col rounded-[30px] border border-[rgba(180,128,44,0.16)] bg-[linear-gradient(180deg,rgba(18,18,18,0.96),rgba(11,12,14,0.96))] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(248,224,124,0.28)] hover:shadow-[0_24px_60px_rgba(180,128,44,0.08)]"
            >
              <div className="mb-6 overflow-hidden rounded-[24px] border border-[rgba(248,224,124,0.14)] bg-[rgba(255,255,255,0.03)]">
                <div className="aspect-[4/4.6] w-full">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col text-center">
                <h3 className="text-3xl font-semibold tracking-[0.03em] text-[var(--text)]">
                  {owner.name}
                </h3>

                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
                  {owner.role}
                </p>

                <p className="mx-auto mt-5 max-w-[320px] text-[15px] leading-8 text-[var(--muted)]">
                  {owner.note}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/#contact" className="outline-button">
            Connect With Us Today
          </Link>
        </div>
      </div>
    </section>
  );
}