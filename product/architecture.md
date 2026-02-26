# Technical Architecture — Loupe MVP
_Prepared: 2026-02-25_
_Phase 5 of 5_

---

## 0. How to Read This Document

This document defines the technical architecture for the Loupe MVP. It is written to be actionable by a small founding engineering team (1–3 developers). Decisions are made at the level of stack choices, data models, system boundaries, and key engineering considerations. Implementation detail is left to the team.

Reference documents: `product/prd.md`, `product/design.md`

---

## 1. Architecture Philosophy

Three constraints shape every decision here:

**Small team, high quality.** The architecture must allow 1–3 developers to ship a polished, production-quality MVP without drowning in infrastructure. Managed services are preferred over self-hosted. Operational complexity is minimised. The team's time belongs in the product, not in DevOps.

**Content and interactivity in equal measure.** Loupe is simultaneously a content product (the Lens Library, World Right Now) and an interactive application (the assessment, the Two-Lens Tool, the spiral map). The architecture must serve both well — content needs SEO, fast delivery, and a great authoring experience; the interactive features need a reactive UI, real-time-feeling responses, and server-side security for the assessment.

**Secure by default, particularly for the assessment.** The scoring algorithm and its weights must never be exposed to the client. A determined user should not be able to game the assessment by inspecting network traffic. All scoring happens server-side and results are returned as opaque portraits, not raw scores.

---

## 2. System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Users (browser)                      │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   Next.js Application                    │
│            (Vercel — serverless, edge-ready)             │
│                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│   │  React UI    │  │  API Routes  │  │  Server      │  │
│   │  (frontend)  │  │  (backend)   │  │  Components  │  │
│   └──────────────┘  └──────┬───────┘  └──────────────┘  │
└──────────────────────────── │ ───────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
┌─────────▼──────┐  ┌─────────▼──────┐  ┌────────▼───────┐
│   Supabase     │  │    Sanity.io   │  │     Stripe     │
│  (PostgreSQL   │  │     (CMS)      │  │   (payments)   │
│   + Auth)      │  │                │  │                │
└────────────────┘  └────────────────┘  └────────────────┘
          │
┌─────────▼──────┐
│  Upstash Redis │
│   (caching)    │
└────────────────┘
```

**Request flow summary:** The browser talks exclusively to the Next.js application on Vercel. The Next.js app handles UI rendering (React Server Components + Client Components), API logic (Route Handlers), and orchestrates calls to Supabase (data), Sanity (content), Stripe (payments), and Redis (caching). No service is exposed directly to the browser.

---

## 3. Technology Stack

### 3.1 Frontend

**Framework: Next.js 14+ (App Router)**
The natural choice for a web-first product that needs both rich interactivity and content SEO. The App Router enables React Server Components (ideal for content-heavy pages like the Lens Library and World Right Now) alongside Client Components (assessment flow, spiral map, Two-Lens Tool). Single repository. Single deployment. TypeScript throughout.

**UI library: React + Tailwind CSS**
Tailwind for the design system implementation — the design direction's warm neutral palette and lens colour system translate cleanly into a Tailwind config with a custom colour scale. No component library at the UI primitive level — the design is distinctive enough that off-the-shelf components would need more customisation than building clean is worth.

**Animation: Framer Motion**
For the result reveal sequence, spiral map entry animation, assessment transitions, and expand/collapse interactions in the Lens Library. Framer Motion handles the complexity of the result reveal (colour flood, staggered content appearance) and provides the spring physics that make the spiral map feel tactile.

**Spiral map visualisation: D3.js (layout) + SVG (rendered by React)**
D3 handles the mathematical placement of the eight lens nodes along the helix arc. The SVG itself is rendered by React and animated by Framer Motion. This separation keeps the rendering fully in React's control while using D3's proven geometry utilities.

**State management: React Context + Zustand (where needed)**
React Context for global auth/subscription state. Zustand for assessment flow state (current question, responses, progress). No Redux — the complexity doesn't warrant it.

### 3.2 Backend

**API layer: Next.js Route Handlers**
Server-side API endpoints within the Next.js app. Handles: assessment submission and scoring, subscription status checks, content fetching with caching, social sharing card generation. Keeping this within Next.js avoids managing a separate API service for MVP.

**Assessment scoring: server-side Route Handler (not exposed to client)**
The assessment algorithm runs exclusively in a Route Handler. Client submits an array of opaque response objects; server returns a result portrait. The scoring weights, lens mappings, and anti-inflation logic are never in the client bundle. See Section 6.

**Social sharing card generation: @vercel/og (Satori)**
Server-side image generation using Vercel's OG image library, which renders React components to PNG on the server. Each sharing card is generated on-demand from the user's result data and lens colour, returned as a static PNG URL. Beautiful, performant, no client-side canvas required.

### 3.3 Database

**Primary: Supabase (PostgreSQL)**
Supabase provides managed PostgreSQL with a clean API, built-in Row Level Security, and Auth bundled in. For MVP, it handles user records, assessment results, subscription state, and any user-generated data. The Supabase client library works naturally within Next.js Route Handlers and Server Components.

Supabase is chosen over alternatives (PlanetScale, Neon) because it bundles auth, which reduces the services in play.

**Cache: Upstash Redis**
Serverless Redis for caching Sanity content queries (lens profiles, relationship guides, articles) to avoid hammering the CMS API on every request. Also used for rate limiting on the assessment submission endpoint. Upstash is serverless-native — no connection pool management, works cleanly in Vercel's serverless functions.

### 3.4 Content Management

**CMS: Sanity.io**
All editorial content lives in Sanity: the eight lens profiles, relationship guides, World Right Now articles, assessment question copy, and onboarding content. Sanity is chosen for:

- **Structured content schemas** — each lens profile has a defined schema (header, from-the-inside, healthy expression, shadow expression, etc.) that the editorial team fills rather than writing raw HTML
- **GROQ queries** — Sanity's query language is excellent for fetching exactly the content shape needed per feature, with fine-grained field selection
- **Real-time content updates** — articles in World Right Now can be published without a code deploy
- **Portable Text** — rich text that renders cleanly to any output format without being tied to HTML

The Sanity Studio is deployed alongside the main app (at `/studio`) in development and as a standalone deployment in production. The editorial team authors directly in Sanity Studio.

Content is fetched server-side in Next.js Server Components and cached in Redis with appropriate TTLs (lens profiles: 1 hour; articles: 10 minutes; assessment copy: 1 hour).

### 3.5 Authentication

**Auth: Supabase Auth**
Email/password and Google OAuth provided by Supabase Auth, integrated directly with the database via Row Level Security. Session management is handled by the `@supabase/ssr` package, which handles cookie-based sessions cleanly in the Next.js App Router environment.

The auth flow integrates with the onboarding sequence: the user completes the assessment without an account, sees their result, then creates an account. The assessment responses are stored temporarily in a short-lived server-side session; on account creation they are permanently saved to the user record.

### 3.6 Payments

**Stripe**
Stripe Checkout for the initial subscription flow (clean, fast, handles all edge cases including 3D Secure). Stripe Customer Portal for self-service subscription management (cancel, update payment method, view invoices). Stripe webhooks (received by a Route Handler) keep the database subscription state in sync.

The 3-week free trial is implemented as a Stripe trial period — no payment method required at the start of trial. At trial end, Stripe sends a webhook if the user has subscribed; otherwise their status drops to free tier.

### 3.7 Hosting and Infrastructure

**Application: Vercel**
Vercel is the natural deployment target for Next.js. Edge network, automatic scaling, preview deployments per pull request, built-in analytics. No infrastructure configuration required.

**Database and Auth: Supabase Cloud**
Managed PostgreSQL on Supabase's hosted platform. The free tier is sufficient for development; Pro tier at launch.

**CMS: Sanity Cloud**
Sanity's managed hosted service. No self-hosting.

**Email: Resend**
Transactional email (account confirmation, trial expiry notice, password reset) via Resend, which has a clean API and first-class Next.js support. Not used for marketing email at MVP.

### 3.8 Platform Strategy

**MVP: Web application (mobile-responsive)**
Loupe launches as a web application — fully mobile-responsive, designed and engineered to feel native on iPhone Safari. This is the correct starting point: it lets the team ship quickly, validate the product with real users, and iterate without the overhead of app store review cycles. There is no PWA end-state; the web app is the product.

**Phase 2: Native iOS via React Native / Expo**
Once the product is validated and generating revenue, the iOS App Store path is **React Native / Expo** — not a PWA. Key reasons:

- PWAs cannot be distributed through the App Store. On iPhone they are installed via Safari's "Add to Home Screen" only — no discoverability, no App Store listing, and Apple restricts push notifications and background sync.
- React Native / Expo allows the existing design system and API layer (Supabase, Sanity, Stripe) to be reused directly. The web and native apps share backend, content infrastructure, and TypeScript types.
- App Store distribution opens the product to the full iOS discovery surface and enables native capabilities (reliable push notifications, home screen presence, smoother haptic interactions in the assessment flow).

The monorepo structure is designed to accommodate this from the start (see Section 10). The `apps/web/` workspace ships at MVP; `apps/mobile/` is added in Phase 2 without restructuring the repository.

**No Android at MVP or Phase 2**
Android is a future consideration. React Native / Expo makes it trivial to extend to Android once the iOS app is stable, but it is not on the roadmap for the first two phases.

---

## 4. Data Models

The core database schema. All tables are in Supabase PostgreSQL with Row Level Security enabled.

### users
Extends Supabase's built-in `auth.users` with product-specific fields.

```
id                  uuid (FK → auth.users)
email               text
created_at          timestamptz
subscription_status text          -- 'free' | 'trial' | 'active' | 'cancelled'
trial_started_at    timestamptz
trial_ends_at       timestamptz
stripe_customer_id  text
```

### assessment_results
One record per completed assessment. Immutable after creation.

```
id                  uuid
user_id             uuid (FK → users)
completed_at        timestamptz
responses           jsonb         -- array of {question_id, response_value, input_type}
primary_lens        text          -- 'beige' | 'purple' | 'red' | 'blue' | 'orange' | 'green' | 'yellow' | 'turquoise'
secondary_lens      text
shadow_flags        jsonb         -- {tendencies: string[], triggers: string[]}
growth_orientation  text
confidence_level    text          -- 'high' | 'medium' | 'low' (internal, not shown to user)
inflation_flag      boolean       -- true if anti-inflation checks triggered
```

### subscriptions
Mirrors Stripe subscription state. Updated by webhooks.

```
id                      uuid
user_id                 uuid (FK → users)
stripe_subscription_id  text
stripe_price_id         text
status                  text          -- Stripe subscription statuses
current_period_start    timestamptz
current_period_end      timestamptz
cancel_at_period_end    boolean
created_at              timestamptz
updated_at              timestamptz
```

### lens_saves
User's saved/bookmarked lenses for quick reference.

```
id          uuid
user_id     uuid (FK → users)
lens_slug   text
saved_at    timestamptz
```

### relationship_saves
User's saved two-lens combination guides.

```
id              uuid
user_id         uuid (FK → users)
lens_a          text
lens_b          text
scenario        text   -- 'close' | 'work' | 'civic'
saved_at        timestamptz
```

Note: all editorial content (lens profiles, relationship guides, articles, assessment questions) lives in Sanity, not in the database. The database only holds user-generated and subscription data.

---

## 5. Content Schema (Sanity)

The Sanity schemas define the structure of all editorial content. Key schemas:

### lens
```
slug            string      -- 'beige', 'purple', etc.
colour_hex      string      -- primary colour for this lens
display_name    string      -- e.g. 'Beige', 'The Survival Lens'
tagline         string      -- one evocative sentence
group           string      -- 'me' | 'we' | 'everybody'
inward_outward  string      -- 'inward' | 'outward' | 'integrating'

// Content sections (all Portable Text)
from_the_inside         portableText
values_and_why          portableText
healthy_expression      portableText
shadow_expression       portableText
in_the_wild             array of {title, body}
how_to_connect          portableText
depth_layer             portableText

// SEO
meta_description        string
```

### relationship_guide
```
lens_a          reference → lens
lens_b          reference → lens
quality         string      -- 'full' | 'template'

// Content sections
dynamic_summary         portableText
lens_a_needs            portableText
lens_b_needs            portableText
friction_points         portableText
genuine_connection      portableText

// Scenario variants
scenario_close          portableText (optional override)
scenario_work           portableText (optional override)
scenario_civic          portableText (optional override)
```

### article (World Right Now)
```
title           string
slug            string
published_at    datetime
lenses          array of references → lens
read_time_mins  number
excerpt         string (max 160 chars)
body            portableText
related         array of references → article
```

### assessment_question
```
id              string      -- stable identifier used in responses
section         number      -- 1–5 (for grouping into sections)
question_text   string
input_type      string      -- 'slider' | 'multiple_choice' | 'binary' | 'ranked' | 'image'
options         array       -- for multiple_choice and binary
// Note: weights and lens mappings are NOT in Sanity.
// They live in server-side code only.
```

---

## 6. Assessment Engine

The assessment engine is the most security-sensitive component. The design must ensure the lens weights and scoring logic can never be reverse-engineered from client-side code or network traffic.

### Architecture

```
Client                          Server (Route Handler)
  │                                      │
  │  POST /api/assessment/submit         │
  │  { responses: [{id, value}, ...] }   │
  │ ────────────────────────────────────►│
  │                                      │  score(responses, WEIGHTS)
  │                                      │  inflate_check(responses)
  │                                      │  confidence_calc(scores)
  │                                      │  → result
  │                                      │
  │  { primary, secondary, shadow,       │
  │    growth, confidence }              │
  │◄──────────────────────────────────── │
```

- `WEIGHTS` is a server-side constant object, never imported by client code
- The client submits raw response values (slider position, selected option index, etc.)
- The server maps responses to lens dimension scores, applies weights, runs anti-inflation checks, and returns a `result` object containing only the portrait data needed to render the user's profile
- Raw scores per lens are computed server-side but never returned to the client — the client receives only the result portrait

### Scoring Model (outline)

Each question has an associated weight map in server-side code: a mapping from each possible response value to a partial score for one or more of the eight lens dimensions. The final score for each lens dimension is the sum of all weighted contributions across all questions.

Anti-inflation detection runs as a post-processing step:
- **Tension pair check:** certain question pairs test the same dimension from opposite directions. If a user claims the aspirational answer on both sides of a pair, the confidence level is downgraded.
- **Lower lens dismissal check:** questions that describe the healthy expression of Beige, Purple, and Red with genuine warmth. Rapid, high-certainty rejection of all three triggers an inflation flag.
- **Variance check:** very low variance across all lens scores (everything rated similarly) indicates either low engagement or a confused result — confidence is downgraded.

When `inflation_flag` is true, the result portrait includes a brief, non-shaming note: *"Your result captures your stated preferences. Bear in mind that the most useful results tend to surprise people a little — if yours felt entirely predictable, it may be worth sitting with whether you answered as you are or as you'd like to be."*

---

## 7. Key Flows

### 7.1 Assessment → Result → Account Creation

```
1. User arrives at /start (no auth required)
2. Onboarding screens rendered as static content
3. Assessment flow begins — responses stored in server-side session
   (Next.js cookies, short-lived, no database write yet)
4. User submits final section → POST /api/assessment/submit
5. Server scores responses, computes result, saves to DB if user_id exists,
   otherwise saves to temporary session
6. Result reveal screen rendered with result data from session
7. User prompted to create account ("Save your result")
8. On account creation: temporary session result written to assessment_results
   linked to new user_id
9. If user navigates away without creating account: result is lost
   (this is intentional — creates mild urgency without dark patterns)
```

### 7.2 Subscription and Trial

```
1. New user creates account → trial_started_at and trial_ends_at set in users table
   (trial_ends_at = trial_started_at + 21 days)
2. subscription_status = 'trial'
3. All Personal tier content unlocked for trial duration
4. At trial_ends_at: Supabase scheduled function sets status = 'free'
   if no active Stripe subscription exists
5. User subscribes: Stripe Checkout → webhook → subscriptions table updated
   → users.subscription_status = 'active'
6. Cancellation: Stripe Customer Portal → webhook → cancel_at_period_end = true
   → at period end → status = 'free'
```

### 7.3 Content Delivery

```
1. Request for /lenses/[slug] arrives at Next.js
2. Server Component checks Redis cache for lens:{slug}
3. Cache hit → render with cached content
4. Cache miss → fetch from Sanity via GROQ, cache in Redis (TTL: 1 hour), render
5. Post-assessment: Server Component also reads user's primary_lens from Supabase
   to determine colour theming and highlight state
6. Page rendered as HTML on server (SEO-friendly), hydrated on client for interactions
```

### 7.4 Sharing Card Generation

```
1. User taps "Share" on result screen
2. Client requests /api/share/card?userId={id}
3. Route Handler fetches user's primary_lens and selected quote from DB
4. @vercel/og renders sharing card React component to PNG
   (lens colour background, quote text, Loupe wordmark, CTA)
5. PNG returned as image response, URL cached by Vercel CDN
6. Client receives URL, opens native share sheet with image + link
```

---

## 8. Security Considerations

**Assessment integrity:** The scoring weights are server-side constants in a file that is never bundled for the client. The Route Handler that processes assessment submissions validates the structure of responses (correct question IDs, valid response ranges) before scoring. Rate limiting via Upstash Redis prevents bulk submission attacks.

**Row Level Security:** All Supabase tables have RLS enabled. Users can only read and write their own records. The assessment_results table is insert-only for users — records cannot be modified after creation (only a service-role key, never exposed to clients, can modify results).

**Subscription gating:** Content access is checked server-side in Server Components and API routes. The subscription status is read from the database on each server request — it is not stored in a client-accessible token that could be forged or manipulated.

**Environment variables:** All service credentials (Supabase service key, Stripe secret key, Sanity API token, Redis URL) are Vercel environment variables, never in the client bundle. The Sanity client used in Server Components uses the full API token; the client-side Sanity client (if used at all) uses a read-only public token for unauthenticated content only.

**Data minimisation:** Only the data needed to run the product is collected. Assessment responses are stored as opaque JSON (not linked to identifiable question text in the database). Users can delete their account and all associated data via the settings screen; a Route Handler handles this, including revoking the Stripe subscription and deleting all rows.

---

## 9. Performance Architecture

**Server Components for content:** The Lens Library, World Right Now feed, and Your Profile are rendered as React Server Components — HTML is generated on the server and streamed to the client, so first paint is fast even on slow connections. No client-side data fetching waterfalls on these surfaces.

**Edge caching via Vercel CDN:** Static and near-static content (lens profiles, articles) is cached at the Vercel edge. Cache invalidation is triggered on Sanity webhook when content is published or updated.

**Redis content cache:** Sanity GROQ queries are cached in Upstash Redis to avoid cold-start latency on serverless functions. TTLs are conservative (1 hour for lens profiles, 10 minutes for articles) to balance freshness with performance.

**Progressive enhancement for the spiral map:** The spiral map SVG is rendered server-side as a static representation. Interactivity (hover states, tap-to-preview, animation) is hydrated on the client. A user on a very slow connection gets a functional (if inert) map immediately.

**Image optimisation:** Next.js Image component with Vercel's built-in image optimisation for any photography used in World Right Now editorial pieces. Sharing card PNGs are served from Vercel's CDN after first generation.

---

## 10. Development Approach

### Repository Structure

A monorepo with two workspaces:

```
loupe/
├── apps/
│   ├── web/          — Next.js application (MVP)
│   ├── studio/       — Sanity Studio
│   └── mobile/       — React Native / Expo (Phase 2, iOS App Store)
├── packages/
│   ├── ui/           — Shared component library (design system)
│   └── types/        — Shared TypeScript types
└── package.json      — Workspace config (pnpm or Turborepo)
```

`apps/mobile/` is not built at MVP but the workspace slot is reserved. The shared `packages/` layer (types, potentially core logic) is designed from the start to be consumable by both Next.js and React Native, so the Phase 2 build does not require a repository restructure.

### Environments

| Environment | Purpose | Deployment |
|-------------|---------|------------|
| `development` | Local development | `localhost:3000` |
| `preview` | Per-PR preview | Vercel preview URLs |
| `staging` | Pre-release testing | Vercel staging domain |
| `production` | Live product | `loupe.app` |

Supabase has separate project instances for development/staging and production. Sanity uses datasets: `development` and `production`.

### Build to MVP: Suggested Phase Order

Given the interdependencies between features, the recommended build order is:

1. **Auth + subscription scaffolding** — Users, sessions, Stripe, trial logic. Everything else depends on knowing who the user is and what they have access to.
2. **Assessment engine** — The scoring algorithm, question schemas in Sanity, assessment flow UI. The result is the seed of everything else.
3. **Lens Library** — Sanity schemas, content entry, library UI, spiral map. Unblocks content authoring.
4. **Your Profile** — Draws on assessment result + lens library. Requires both to be working.
5. **Navigating Relationships** — Two-Lens Tool, Relationship Finder, guide content.
6. **World Right Now** — Article schema, editorial flow, feed UI. Can be built in parallel with Relationships.
7. **Sharing cards** — After the result reveal flow is stable.
8. **Polish and performance** — Animations, transitions, the result reveal moment, colour theming.

### Key Engineering Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Spiral map performance on low-end mobile | Medium | Server-rendered SVG base; progressive enhancement; performance budget tested early |
| Assessment scoring accuracy | High (important) | Beta test with 20+ users before launch; compare results against manual expert assessment for a sample |
| Colour theming complexity (8 environments) | Medium | Define the theming system in CSS custom properties early; test all 8 lens colours against WCAG AA contrast requirements |
| Sanity content entry volume | High (operational) | Prioritise content tooling; the 8 lens profiles and 8 relationship guides are the critical path — everything else can ship thinner |
| Stripe trial-to-subscription conversion | Low (technical) | Stripe handles this well; risk is product/UX not engineering |

---

## 11. Third-Party Service Summary

### Service Tiers by Stage

Infrastructure cost scales with usage. The stack is designed so that almost everything runs free until real traffic justifies an upgrade. The only unavoidable paid line item from day one is Vercel, which prohibits commercial use on the Hobby (free) plan.

| Service | Purpose | < 50 users | 50–500 users | 500+ users |
|---------|---------|------------|--------------|------------|
| Vercel | Hosting, CDN, deployments | Pro — ~AUD $32/mo | Pro — ~AUD $32/mo | Pro / Enterprise |
| Supabase | PostgreSQL, Auth | **Free tier** (500MB DB, 50K MAU) | Free → Pro ~AUD $38/mo | Pro |
| Sanity.io | CMS | **Free tier** (500K API req/mo) | Free → Growth ~AUD $23/mo/seat | Growth |
| Stripe | Payments, subscriptions | **No monthly fee** (2.9% + $0.30 per transaction) | Same | Same |
| Upstash | Redis caching | **Free tier** (10K commands/day) — or defer entirely | Pay-as-you-go ~AUD $1–5/mo | Pay-as-you-go |
| Resend | Transactional email | **Free tier** (3K emails/mo) | Free → Pro ~AUD $30/mo | Pro |
| @vercel/og | Sharing card generation | Included in Vercel | Included in Vercel | Included in Vercel |

### Estimated Monthly Cost by Stage

| Stage | Users | Approx. cost (AUD) | Notes |
|-------|-------|-------------------|-------|
| Early validation | < 50 | ~$32–40/mo | Vercel Pro only; everything else free |
| Growing | 50–500 | ~$90–130/mo | Supabase and Sanity upgrades triggered by usage |
| Scaling | 500–5,000 | ~$150–300/mo | All services on paid tiers |

### Deferral note on Redis

At under 50 users, Sanity's free tier handles direct queries without caching. Upstash Redis can be deferred entirely until traffic makes the Sanity request budget a concern — removing one service from the early stack. Add it when needed, not by default.

---

_End of Phase 5: Technical Architecture_

---

## Project Complete — All Five Phases Delivered

| Phase | Document | Status |
|-------|----------|--------|
| Phase 1 — Research | `research/spiral-dynamics-foundations.md`, `research/market-landscape.md`, `research/proto-personas.md` | ✓ Complete |
| Phase 2 — Product Vision | `product/vision.md` | ✓ Complete |
| Phase 3 — PRD for MVP | `product/prd.md` | ✓ Complete |
| Phase 4 — Design Direction | `product/design.md` | ✓ Complete |
| Phase 5 — Technical Architecture | `product/architecture.md` | ✓ Complete |
