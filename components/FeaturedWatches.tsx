import WatchCard from "./WatchCard";
import { Watch } from "@/lib/api";

type FeaturedWatchesProps = {
  watches: Watch[];
};

export default function FeaturedWatches({ watches }: FeaturedWatchesProps) {
  return (
    <section className="py-20">
      <div className="container-luxury">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker mb-3">Featured</p>
            <h2 className="section-title">Selected watches</h2>
          </div>
          <p className="max-w-xl text-[var(--muted)]">
            A refined edit of standout pieces chosen for their design, reputation,
            and enduring collector appeal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {watches.map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}