// ─────────────────────────────────────────────────────────────────────────────
// World feed loading skeleton
// ─────────────────────────────────────────────────────────────────────────────

export default function WorldLoading() {
  return (
    <main className="pb-24">
      {/* Header skeleton */}
      <div className="px-6 pt-6 text-center">
        <div className="skeleton mx-auto mb-3 h-7 w-48 rounded" />
        <div className="skeleton mx-auto h-4 w-72 rounded" />
      </div>

      {/* Filter pills skeleton */}
      <div className="mt-5 px-6">
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="skeleton h-8 rounded-full"
              style={{ width: `${48 + Math.random() * 24}px` }}
            />
          ))}
        </div>
      </div>

      {/* Article cards skeleton */}
      <div className="mx-auto mt-6 max-w-lg px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-warm-200/40 py-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="skeleton h-5 w-16 rounded-full" />
              <div className="skeleton h-3 w-12 rounded" />
            </div>
            <div className="skeleton mb-2 h-6 w-4/5 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton mt-1 h-4 w-3/4 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
