// ─────────────────────────────────────────────────────────────────────────────
// Main layout loading skeleton — shown while route segments load
// ─────────────────────────────────────────────────────────────────────────────

export default function MainLoading() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      {/* Title skeleton */}
      <div className="skeleton mb-3 h-8 w-48 rounded" />
      {/* Subtitle skeleton */}
      <div className="skeleton mb-8 h-4 w-72 rounded" />
      {/* Content blocks */}
      <div className="space-y-4">
        <div className="skeleton h-24 w-full rounded-xl" />
        <div className="skeleton h-24 w-full rounded-xl" />
        <div className="skeleton h-24 w-full rounded-xl" />
      </div>
    </main>
  );
}
