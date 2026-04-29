"use client";

import Link from "next/link";
import { Watch } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

type FeaturedCarouselProps = {
  watches: Watch[];
};

export default function FeaturedCarousel({
  watches,
}: FeaturedCarouselProps) {
  const featured = [...watches]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  const canLoop = featured.length >= 5;

  return (
    <section className="py-24">
      <div className="container-luxury">
        <div className="mb-10">
          <p className="section-kicker mb-3">Featured watches</p>
          <h2 className="section-title">New Arrivals</h2>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
Recently added pieces from our collection.          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          loop={canLoop}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: Math.min(2, featured.length || 1) },
            1200: { slidesPerView: Math.min(4, featured.length || 1) },
          }}
        >
          {featured.map((watch) => {
            const image =
              watch.galeria && watch.galeria.length > 0 && watch.galeria[0].url
                ? watch.galeria[0].url
                : watch.imagen_url && watch.imagen_url.trim() !== ""
                ? watch.imagen_url
                : "/images/placeholder-watch.jpg";

            return (
              <SwiperSlide key={watch.documentId || watch.id}>
                <article className="overflow-hidden rounded-[24px] border border-[rgba(180,128,44,0.22)] bg-[rgba(17,17,17,0.92)]">
                  <div className="aspect-[4/4.4] overflow-hidden bg-[linear-gradient(145deg,#20242a,#101215)]">
                    <img
                      src={image}
                      alt={watch.nombre}
                      className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-[var(--muted)]">{watch.nombre}</p>
                    <p className="mt-2 text-2xl font-semibold text-[var(--text)]">
                      {formatPrice(watch.precio, watch.moneda)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link
                        href={`/reloj/${watch.documentId || watch.id}`}
                        className="inline-flex rounded-full border border-[rgba(248,224,124,0.28)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
                      >
                        View Watch
                      </Link>

                      <a
                        href={`https://wa.me/16892671285?text=${encodeURIComponent(
                          `Hello, I'm interested in this watch:\n\n${watch.nombre}\nReference: ${watch.referencia || "N/A"}\nPrice: ${formatPrice(watch.precio, watch.moneda)}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-black transition hover:bg-[var(--gold-soft)]"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
