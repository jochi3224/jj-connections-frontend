import Link from "next/link";
import { Watch } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

type WatchCardProps = {
  watch: Watch;
};

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function normalizeImageUrl(url?: string | null) {
  if (!url || url.trim() === "") return "/images/placeholder-watch.jpg";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${STRAPI_BASE_URL}${url}`;
  }

  return `${STRAPI_BASE_URL}/${url}`;
}

export default function WatchCard({ watch }: WatchCardProps) {
  const image = normalizeImageUrl(watch.imagen_url);

  const braceletMaterial =
    (watch as any).BraceletMaterial ||
    (watch as any).braceletMaterial ||
    (watch as any).bracelet_material ||
    (watch as any).braceletmaterial ||
    "N/A";

  return (
    <article className="luxury-card overflow-hidden">
      <div className="aspect-[4/4.5] overflow-hidden border-b border-[rgba(180,128,44,0.15)] bg-[linear-gradient(145deg,#20242a,#101215)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={watch.nombre || "Luxury Watch"}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder-watch.jpg";
          }}
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
            {watch.marca || "Luxury Watch"}
          </span>

          <span className="rounded-full border border-[rgba(248,224,124,0.18)] px-3 py-1 text-xs text-[var(--muted)]">
            {watch.condicion || "Available"}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-[var(--text)]">
            {watch.nombre}
          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Ref. {watch.referencia || "N/A"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm text-[var(--muted)]">
          <p>
            <span className="text-[var(--gold-soft)]">Model:</span>{" "}
            {watch.modelo || "N/A"}
          </p>

          <p>
            <span className="text-[var(--gold-soft)]">Bracelet Material:</span>{" "}
            {braceletMaterial}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 pt-2">
          <div>
            <p className="text-sm text-[var(--muted)]">Price</p>
            <p className="text-lg font-semibold text-[var(--gold-soft)]">
              {formatPrice(watch.precio, watch.moneda)}
            </p>
          </div>

          <Link
            href={`/reloj/${watch.id}`}
            className="rounded-full border border-[rgba(248,224,124,0.28)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)]"
          >
            View Watch
          </Link>
        </div>
      </div>
    </article>
  );
}