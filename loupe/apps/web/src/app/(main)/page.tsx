// Home — pre-assessment entry point
// Design reference: design.md §6 "Home — pre-assessment"
//
// This is the placeholder landing screen. Replace with the full design once
// visual identity and type system are confirmed with a designer.
// The assessment CTA wording is from design.md §8: "Find your lens"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg text-center">
        {/* Wordmark — replace with SVG logo once identity is designed */}
        <h1 className="font-serif text-4xl font-medium tracking-tight text-warm-900 mb-6">
          Loupe
        </h1>

        <p className="text-warm-600 text-lg leading-relaxed mb-4">
          The people around you aren&apos;t irrational.
          <br />
          They&apos;re just seeing through a different lens.
        </p>

        <p className="text-warm-500 text-base leading-relaxed mb-12 max-w-prose mx-auto">
          Loupe uses Spiral Dynamics to help you understand your own worldview —
          and genuinely connect with people who see things differently.
        </p>

        {/* Primary CTA — wording from design.md §8 */}
        <a
          href="/assessment"
          className="inline-flex items-center justify-center rounded-full bg-warm-900 text-cream px-8 py-4 text-base font-medium transition-all hover:bg-warm-800 active:scale-[0.98]"
        >
          Find your lens
        </a>

        <p className="mt-6 text-warm-400 text-sm">
          Takes about 15 minutes. No account required to start.
        </p>
      </div>
    </main>
  );
}
