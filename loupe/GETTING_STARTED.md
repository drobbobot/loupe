# Getting Started — Loupe

This is the monorepo scaffold for Loupe. The product docs that informed this structure live in `../` (the Spiral Dynamics folder).

## Before you write any code

You need accounts on each of these services. All have free tiers sufficient for early development.

| Service | Sign up | Notes |
|---------|---------|-------|
| **Vercel** | vercel.com | Connect your GitHub repo during setup |
| **Supabase** | supabase.com | Create a new project; copy URL + keys |
| **Sanity** | sanity.io | Create a new project; note the project ID |
| **Stripe** | stripe.com | Start in test mode; create a product with monthly + annual prices |
| **Resend** | resend.com | Free tier, add your sending domain |

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
cp .env.example apps/web/.env.local
# Fill in all values in apps/web/.env.local

# 3. Run the Supabase migration
# Either use the Supabase CLI:
npx supabase db push
# Or paste supabase/migrations/20260225_initial_schema.sql into the
# Supabase dashboard SQL editor

# 4. Start local development
pnpm dev
# → Next.js app: http://localhost:3000
# → Sanity Studio: http://localhost:3333
```

## Structure

```
loupe/
├── apps/
│   ├── web/          — Next.js 14 app (the product)
│   ├── studio/       — Sanity Studio (content editing)
│   └── mobile/       — React Native / Expo (Phase 2 — not yet built)
├── packages/
│   ├── types/        — Shared TypeScript types (LensSlug, AssessmentResult, etc.)
│   └── ui/           — Shared component library (design system primitives)
└── supabase/
    └── migrations/   — Database schema
```

## Build order

Follow the build order in `../product/architecture.md` §10:

1. Auth + subscription scaffolding ← start here
2. Assessment engine
3. Lens Library
4. Your Profile
5. Navigating Relationships
6. The World Right Now
7. Sharing cards
8. Polish and performance

## Typography

The scaffold uses **Lora** (serif) and **Plus Jakarta Sans** (sans-serif) as free placeholder fonts loaded from Google Fonts. The design direction specifies **Tiempos Text** and **Söhne** — swap these once licensed from Klim Type Foundry. The CSS variables are `--font-serif` and `--font-sans` in `globals.css`; Tailwind maps them via `tailwind.config.ts`.

## Reference docs

All product decisions are documented in `../product/`:
- `vision.md` — product vision, name, positioning
- `prd.md` — full feature requirements
- `design.md` — visual identity, colours, typography, signature moments
- `architecture.md` — this scaffold's technical decisions
