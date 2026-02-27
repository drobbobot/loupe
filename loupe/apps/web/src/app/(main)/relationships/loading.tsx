// ─────────────────────────────────────────────────────────────────────────────
// Relationships page loading skeleton
// ─────────────────────────────────────────────────────────────────────────────

export default function RelationshipsLoading() {
  return (
    <main className="px-6 py-8">
      {/* Header skeleton */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="skeleton mx-auto mb-3 h-7 w-56 rounded" />
        <div className="skeleton mx-auto mb-8 h-4 w-72 rounded" />
      </div>

      {/* Your lens skeleton */}
      <div className="mx-auto mb-6 max-w-2xl">
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>

      {/* Lens grid skeleton */}
      <div className="mx-auto max-w-2xl">
        <div className="skeleton mb-4 h-4 w-32 rounded" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
