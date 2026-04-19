import { getWatchById } from "@/lib/api";
import WatchDetailClient from "@/components/WatchDetailClient";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WatchDetailPage({ params }: PageProps) {
  const { id } = await params;
  const watch = await getWatchById(id);

  if (!watch) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container-luxury flex flex-col items-center justify-center py-40 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">404</p>
          <h1 className="mb-4 text-4xl font-semibold" style={{ fontFamily: "'Georgia', serif" }}>
            Watch not found
          </h1>
          <p className="mb-8 text-[var(--muted)]">This timepiece may no longer be available.</p>
          <Link href="/catalogo" className="gold-button inline-flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 7H2M6 2L1 7l5 5" />
            </svg>
            Back to Catalog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return <WatchDetailClient watch={watch} />;
}
