export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0B0C0E]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,128,44,0.14),transparent_65%)]" />
      <div className="absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(248,224,124,0.10),transparent_60%)] blur-3xl animate-pulse" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border border-[rgba(180,128,44,0.16)]" />
          <div className="absolute inset-0 rounded-full border-t-2 border-[var(--gold)] animate-spin" />
          <div className="absolute inset-[10px] rounded-full border border-[rgba(248,224,124,0.10)]" />
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-[var(--gold)]">
            JJ CONNECTIONS
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Preparing your experience
          </p>
        </div>
      </div>
    </div>
  );
}