// ─────────────────────────────────────────────────────────────────────────────
// Lens library loading skeleton
// ─────────────────────────────────────────────────────────────────────────────

export default function LensesLoading() {
  return (
    <main className="px-6 py-8">
      {/* Toggle skeleton */}
      <div className="mx-auto mb-6 flex justify-center">
        <div className="skeleton h-10 w-48 rounded-full" />
      </div>
      {/* Heading skeleton */}
      <div className="mx-auto mb-2 flex justify-center">
        <div className="skeleton h-7 w-32 rounded" />
      </div>
      <div className="mx-auto mb-8 flex justify-center">
        <div className="skeleton h-4 w-56 rounded" />
      </div>
      {/* Lens cards skeleton */}
      <div className="mx-auto max-w-lg space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-16 w-full rounded-xl" />
        ))}
      </div>
    </main>
  );
}
