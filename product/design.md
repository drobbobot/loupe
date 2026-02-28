# Design Direction — Loupe
_Prepared: 2026-02-25_
_Phase 4 of 5_

---

## 0. How to Read This Document

This document defines the design direction for Loupe — the visual identity, interaction principles, information architecture, and signature design moments that a designer will use to produce high-fidelity screens and a component system. It is directional, not prescriptive: it sets standards and constraints that protect the product's character while leaving space for great design decisions within them.

Reference documents: `product/prd.md`, `product/vision.md`

---

## 1. Design Philosophy

Design is not decoration here. It is an argument. Every visual and interaction decision should make the same point the content makes: *human worldviews are real, coherent, worth taking seriously, and genuinely beautiful in their variety.*

Three design principles govern everything:

**Warmth before sophistication.** The product serves people in pain — people whose relationships are fracturing, whose world feels incomprehensible. The design must feel like a considered, thoughtful presence, not a startup product competing for attention. Warmth comes before cleverness. A screen that comforts earns more trust than a screen that impresses.

**Depth on tap, never imposed.** Every screen has a surface and a depth. The surface delivers the essential thing immediately. The depth is available, clearly signposted, never forced. A user in a hurry and a user with two hours should both feel the product was made for them.

**The framework is beautiful — show it.** Spiral Dynamics is a genuinely elegant model. Eight lenses, each with its own colour, logic, and worldview, arranged along an expanding arc that moves from contraction to integration. The design should make this feel as visually alive as it is intellectually compelling. The spiral map, the colour system, the transitions between lenses — these are opportunities to give the framework a visual presence that no other SD product has ever attempted.

---

## 2. Design References

Study these before beginning visual design. Take specific lessons from each rather than using any as a direct template.

**Claude (Anthropic) — primary reference for baseline UI aesthetic.** Claude's visual language is the closest existing product to the register Loupe should inhabit. The specific elements to carry across: the warm serif / humanist sans-serif typographic pairing; the creamy off-white background system with warm grey midtones and near-black for text; the generous spacing and line height that makes content feel considered rather than crowded; and the overall sense that the product is intelligent without being cold. Claude's neutrals are warm throughout — no blue-shift anywhere in the palette. This is the foundation. Loupe then injects the lens colour system on top of this base — meaning the neutral environment does most of the work on most screens, and the lens colours land with full force when they appear. Study the Claude.ai interface in detail before producing any screen designs.

**Dimensional (app)** — The closest benchmark for the assessment experience specifically. Lesson: varied input formats, mobile-native tactility, and a result that feels like a moment. The tone is warm and curious without being soft. The visual quality is high without being cold.

**Are.na** — Lesson: calm, high-typographic intelligence, trusted by a thoughtful audience. The design earns credibility through restraint and confidence. Useful reference for the content-heavy screens (Lens Library, World Right Now).

**Linear (app)** — Lesson: considered micro-interactions and transitions that make the product feel crafted. The attention to the in-between states. Not the cold SaaS aesthetic — the quality of execution.

**Kinfolk (magazine)** — Lesson: how editorial type, white space, and restraint can make serious subject matter feel intimate. Reference for The World Right Now and the deeper reading layers of the Lens Library.

---

## 3. Visual Identity

### 3.1 The Name and Logo

**Loupe.** The wordmark should carry the precision and warmth of the instrument: a jeweller's loupe is both scientific and artisanal. It is held close to the eye. It sees what others miss. The logo direction should avoid generic "tech startup" forms and instead feel specific, crafted, and slightly unexpected.

Logo direction: explore a wordmark treatment (not an icon-first approach) in which the letterforms themselves carry optical or lens qualities — without being literal or illustrative. The double-arc of the letter "o" may offer something; the loop inherent in "loupe" may too. Brief the visual identity designer with: *precision instrument, warm, slightly unexpected, not clinical, not corporate.*

The logo should work in single colour, in white on all eight lens colours, and in the neutral palette.

### 3.2 The Lens Colour System

The eight lens colours are the product's most distinctive visual asset. They must be:

- **Recognisable** — immediately legible as distinct, even in peripheral vision
- **Beautiful individually** — each colour should be a genuinely good colour, not a garish primary
- **Harmonious together** — when all eight appear on the spiral map, they should feel like a considered palette, not a collision
- **Functional as backgrounds** — each colour must work as a screen background with sufficient contrast for dark text and white text
- **Coded to character** — the colour should feel like the lens it represents

Below are the canonical lens colours with design direction for refinement. The exact hex values are for a designer to determine through iteration; these are tonal descriptions.

| Lens | Canonical colour | Design direction |
|------|-----------------|-----------------|
| Beige | Warm sand / stone | Desaturated warmth. The colour of skin, earth, bare existence. Should feel ancient and neutral, not flat. |
| Purple | Deep violet / indigo | Rich, slightly warm. Tribal mystery. Should feel nocturnal and communal — not pink-purple, not cold blue-purple. |
| Red | Vital red / vermillion | Strong, vital, forward-moving. Not aggressive neon red — a red that commands, like fire or blood. Saturated but not strident. |
| Blue | Deep, confident blue | Institutional and structured. Navy-adjacent but not corporate navy — a blue with genuine depth. The colour of order and trust. |
| Orange | Warm amber / burnt orange | Achievement and energy. Not tech-startup orange — something richer and more earned. The colour of ambition that has been worked for. |
| Green | Natural, open green | Ecological and pluralistic. A green that feels like openness, not envy. Mid-tone, plant-like, generous. |
| Yellow | Clear, luminous yellow | Integrative and clear-sighted. Not a warning yellow or a neon yellow — a luminous, slightly warm yellow that feels like comprehension. The hardest to make work as a background; requires careful contrast testing. |
| Turquoise | Deep teal / ocean | Holistic and oceanic. The deepest, most complex colour in the palette. Should feel like it contains everything. |

**Neutral system:** The product's baseline UI uses Claude's warm neutral palette as its direct reference. Concretely: the background is a warm off-white (cream-tinged, not pure #FFFFFF), the primary text colour is a warm near-black (not pure #000000 — closer to a very dark warm grey), and the midtone system uses warm grey steps with no blue or cool shift. Borders and dividers are subtle warm greys. This palette feels like quality paper, not a screen. It is the environment the lens colours live in, so its warmth must be continuous with theirs. Any blue-shifted grey anywhere in the neutral system will make the lens colours look garish by contrast — avoid this absolutely. In practical terms: if a grey looks slightly purple, blue, or cool in isolation, it is wrong for this product.

**Theming in practice:** Post-assessment, the user's lens colour becomes their home environment. Implementation: the background tints toward the lens colour (at low saturation on content-heavy screens, at full saturation on statement screens like the result reveal and profile header). Accent elements (interactive highlights, progress indicators, tags) use the full lens colour. When browsing a different lens in the library, that lens's colour takes over for that screen, then returns to home colour on navigation back.

### 3.3 Typography

The type system must serve two modes: editorial (long-form content in the Library and World Right Now) and UI (labels, navigation, assessment questions, microcopy). These require different weights and sizes but must feel like the same voice.

**Overall direction: the Claude typographic register.** Claude's interface achieves something specific — it pairs a warm, humanist serif with a clean sans-serif in a way that reads as simultaneously intelligent and approachable. The serif brings editorial authority and human warmth; the sans-serif brings clarity and calm. Together they avoid both the clinical coldness of pure-sans tech products and the decorative softness of wellness brands. This is the register Loupe should occupy. The type system is a two-voice system: serif for editorial depth, sans for interface clarity.

**The serif voice** — Used for: lens profile headers and pull-quotes, World Right Now article display type and body text, result reveal text, Your Profile section headers. The serif should feel like a quality literary publication — not a newspaper, not an academic journal, something more intimate than either. Faces to evaluate:
- **Freight Text / Freight Display** (GarageFonts) — warm, deeply legible at text sizes, excellent companion display weight; proven in editorial contexts
- **Lyon Text** (Commercial Type) — quietly sophisticated, humanist warmth without fussiness; used by thoughtful editorial products
- **Tiempos Text / Tiempos Headline** (Klim Type Foundry) — New Zealand design quality; genuine warmth, works beautifully at display sizes

**The sans-serif voice** — Used for: navigation, labels, assessment questions and UI chrome, body text in the Relationships feature, microcopy, buttons. Should feel clean without coldness — humanist curves rather than geometric precision. Faces to evaluate:
- **Söhne** (Klim Type Foundry) — the most obvious candidate; warm, precise, excellent weight range, serious without stiffness; pairs naturally with Tiempos from the same foundry
- **Untitled Sans** (Klim Type Foundry) — slightly more neutral than Söhne but same foundry warmth; lower profile means less risk of "seen this before"
- **GT America** (Grilli Type) — warm, wide weight range, excellent on mobile

**Practical requirements regardless of choice:** Headlines are expressive and given generous size. Body text line height is never below 1.5 — the type must breathe. UI text is crisp and legible at 13–14px on mobile. Bold weights are used deliberately, not decoratively. Italic is available and used meaningfully (particularly in first-person lens portrait text). The type system should never require the reader to work.

### 3.4 Illustration and Imagery

Photography is not appropriate for most of this product's surfaces — the content is about inner experience and abstract worldviews, and photography risks making the lenses feel like stereotypes (stock photography of "a Blue person" would be absurd).

Direction: a custom illustration system using abstract, non-representational forms. Each lens should have a visual texture or motif that is consistent across its appearances — not literal (not "a ladder for Blue's hierarchy") but tonal and emotional. These motifs appear as backgrounds, decorative elements in the library profiles, and within the sharing cards.

The World Right Now pieces may use editorial illustration for specific pieces. When they do, illustration should be characterful and serious — not the generic "floating shapes" style common in tech content.

---

## 4. Information Architecture

### 4.1 Navigation Model

Loupe uses bottom navigation on mobile (the primary platform). Four persistent tabs:

| Tab | Icon concept | Content |
|-----|-------------|---------|
| **Home** | A loupe | Your Profile; entry point to the assessment for new users |
| **Lenses** | Spiral / helix | The Lens Library and spiral map |
| **Relationships** | Two intersecting circles | The Two-Lens Tool and Relationship Finder |
| **World** | Globe or horizon | The World Right Now |

Account and settings live in a persistent header element (avatar / initials top-right) rather than as a fifth tab, to keep the navigation focused on the product's four pillars.

The assessment is an onboarding flow, not a persistent navigation item. Once completed, it is accessible from the Home tab ("Retake" surface) but does not occupy primary navigation space.

### 4.2 Screen Hierarchy

**Level 1 — Four tab roots** (Home, Lenses, Relationships, World)
**Level 2 — Primary content surfaces** (individual lens profile, two-lens guide, world right now piece, Your Profile sections)
**Level 3 — Depth layers** (expanded sections within profiles, the technical depth layer in the library)
**Modal / flow** — Assessment (full-screen takeover flow), Relationship Finder (guided flow), Result Reveal (full-screen moment), social sharing (sheet)

Modal flows take over the full screen and have their own back/exit handling. They do not use the bottom navigation.

### 4.3 Entry States

The product has four distinct entry states that the design must handle:

**Pre-assessment, not logged in** — User is on the assessment flow or browsing the library in the neutral palette. Bottom navigation shows but Home is locked behind account creation. A persistent soft prompt surfaces at the bottom of content screens: "Take the assessment to personalise your experience."

**Post-assessment, free tier** — Full Home (Your Profile), library browsable with subscription prompt on restricted content, 2 World Right Now pieces accessible.

**3-week trial / Personal subscriber** — Full access. Lens Library is themed in their colour. All navigation tabs fully active.

**Trial expired, not subscribed** — Drops back to free tier with a clear, honest banner. No punitive messaging. "Your trial has ended — here's what you'll lose access to."

---

## 5. Signature Design Moments

These are the five screens or flows in the product that will define whether Loupe feels like a great product or just a functional one. They require disproportionate design attention.

### 5.1 The Result Reveal

The most important screen in the product. This is the moment when the user first sees their lens. Everything before it was the pitch; this is the payoff.

**Design requirements:**
- Full-screen takeover in the user's lens colour at high saturation
- The lens name appears first, alone, with generous space around it — nothing else on screen for approximately 1.5–2 seconds
- Then the evocative one-line description fades in beneath it
- Then a gesture (tap, scroll, or swipe) opens the full portrait
- The transition from the assessment's neutral palette into the full lens colour should feel like entering a room — not a screen change but an arrival
- Sound or haptic feedback on mobile should be considered (subtle, opt-in)
- The portrait screen itself scrolls down from the reveal — it is a continuous experience, not a navigation to a new page

This screen must be tested with real target users before launch. The success criterion is a genuine emotional response — recognition, surprise, or resonance.

### 5.2 The Interactive Spiral Map

The entry point to the Lens Library. The most visually ambitious element in the product.

**Design requirements:**
- A rendered helix/spiral that expands from bottom to top (small and contracted at Beige, expansive at Turquoise)
- Eight nodes positioned along the arc, each in its lens colour, each slightly different in size (reflecting the expansion of the spiral)
- The inward/outward character of the spiral is encoded in the node positioning relative to the arc's axis — inward-focused lenses (Beige, Red, Orange) cluster closer to the axis; outward-focused lenses (Purple, Blue, Green) extend further from it; Yellow and Turquoise are centred, transcending the polarity
- Me/We/Everybody zones are legible — perhaps as subtle background banding or arc segmentation
- The user's centre of gravity node is visually distinct — larger, animated (slow pulse or glow), labelled
- Tapping any node: the node expands, a card surfaces with the lens name and one-line description, with a clear CTA to open the full profile
- The map is animated on load — nodes appear in sequence along the arc, communicating the developmental journey rather than a static menu
- The map must work on mobile at full screen width; it should also work as a landscape element on tablet/desktop

### 5.3 The Lens Library Profile

The standard template for all eight lens profiles. The design must make deep written content feel like a product, not a document.

**Design requirements:**
- The full screen background shifts to the lens's colour on entry (the colour-theming behaviour)
- A large typographic header with the lens name and colour — this is a statement screen that earns authority before asking for reading
- Content is presented in clearly delineated sections with visual distinction between them — not a continuous scroll of paragraphs
- Each section has a surface (scannable, a few lines) and a depth trigger (expand for full content) — the expand interaction is tactile and rewarding, not a standard accordion
- "In the wild" examples use a card format — short, vivid, scannable horizontally
- "How to connect" uses a distinct visual treatment — perhaps a different background tone or typographic weight — to signal a shift from descriptive to prescriptive
- The depth layer (technical content) is visually separated and clearly flagged: "For those who want to go deeper" — entering it feels like a deliberate choice, not an accident

### 5.4 The Assessment Experience

The visual and interactive design of the 30–40 question assessment flow. Referenced against Dimensional.

**Design requirements:**
- Single question per screen (no scrolling through a list of questions)
- Each question screen has a consistent structure: progress indicator (top), question text (centre), input (below question), next/continue (bottom) — but the input type varies significantly screen to screen
- **Slider questions:** Full-width slider with two poles clearly labelled; the current position is visually tracked; snapping to extremes is slightly resisted to prevent lazy anchoring
- **Multiple choice:** Large tap targets, no radio buttons — options are distinct cards that highlight on selection; the selected state should feel satisfying
- **Binary / boolean:** Two large, full-width options taking up the main screen — perhaps with a swipe gesture between them; instant response feel
- **Ranked choice:** Drag-to-reorder with clear affordance; only used once or twice
- Section transitions: full-screen interstitial with the transition copy (e.g. "You've told us how you navigate uncertainty. Now a few questions about what drives you.") in the neutral palette — a breath between sections
- The overall palette of the assessment is the warm neutral (pre-reveal) — the lens colour world is what the result unlocks
- Progress: a persistent bar or dot indicator that is honest about position; animated forward movement on each question completion feels like progress, not a task

### 5.5 The Sharing Card

The visual artefact users share to social media. Drives installs.

**Design requirements:**
- Portrait format optimised for Instagram Stories; also works as a square for X/Twitter
- Background: the user's lens colour at full saturation — visually striking, immediately distinctive
- Content: a pull-quote from the user's profile (a specific, resonant sentence, not a generic label) + the Loupe wordmark
- The lens colour name does NOT appear prominently — the content speaks, not the category
- Below the quote: "Which lens do you see the world through?" as a subtle invitation
- Loupe logo + URL (loupe.app or equivalent) in a corner, small
- The card should look like something worth sharing aesthetically, not like a quiz result badge
- Users should be able to select from 2–3 quote options from their profile rather than a single auto-generated one — this makes the sharing feel personal and chosen

---

## 6. Core Screen Descriptions

Brief descriptions of every major screen for use as a brief to a designer or for wireframe development. Screens are described by their function and required elements; visual execution is for the designer to determine within the constraints above.

**Home — pre-assessment**
Neutral palette. A brief, confident statement of what Loupe does. A single primary CTA: "Find your lens." No navigation clutter. The Loupe wordmark at top. Possibly a subtle animated element in the background (the spiral, abstracted).

**Home — post-assessment (Your Profile)**
Lens-coloured header with the user's lens name and a brief personal statement. Below: three sections (How you show up, Your shadow, What's ahead) in card or panel format. A gentle entry point to the Lens Library for their specific lens. The overall feel: a personalised homepage that rewards return visits.

**Lens Library entry (Spiral Map)**
The spiral map full-screen. Their lens is highlighted. Me/We/Everybody zones visible. Scroll or swipe down to access a list view fallback.

**Individual lens profile**
Full lens colour background at header. Lens name in large type. Scannable sections with expand-for-depth interaction. "How to connect" section visually distinct. Depth layer behind a clear trigger.

**Navigating Relationships entry**
A clean interface for selecting two lenses — presented visually (perhaps as two lens nodes from the spiral, selectably) rather than as dropdown menus. The user's own lens is pre-selected. Secondary lens selection opens the library briefly for recognition.

**Two-lens guide**
The combination of the two selected lenses is visually prominent at the top — perhaps both lens colours shown as overlapping or adjacent fields. Content in sections below: dynamic summary, what each needs, where it breaks down, what connection looks like. Scenario selector (close relationship / working / civic) at top.

**World Right Now entry**
A curated editorial-style feed. Pieces are presented as cards with a clear headline, a 1–2 line lede, the primary lens tags, and a read-time indicator. Filtering by lens is accessible at the top. The feel is more considered editorial than social feed — Kinfolk, not Instagram.

**Individual World Right Now piece**
Long-form editorial. Generous line length on desktop, full-width on mobile. Pull-out quotes. Lens tags at the top and bottom. Related pieces below. The header includes the piece's primary lens in its colour — a subtle visual signature.

**Assessment (question screen)**
Single question, single input, clear progress. The specific layout varies by input type. Warm neutral palette. Consistent back navigation disabled once a section is submitted.

**Result reveal**
Full-screen lens colour. Lens name. One line. Pause. Then portrait unfolds below.

**Subscription / trial**
A clean, honest pricing screen. One tier (Personal), clear monthly/annual toggle. Trial offer prominent and honest: "3 weeks free, no credit card." What you get, in plain language. No dark patterns. Consistent with the product's character.

---

## 7. Motion and Micro-interaction Principles

Motion in Loupe should feel like a natural extension of the product's warmth — not flashy, not performative, but considered and satisfying.

**Transitions are directional.** Moving deeper into content (e.g. tapping a lens on the spiral map) transitions forward; backing out transitions back. The spatial model is consistent.

**The result reveal is the exception.** This is the one place where motion is expressive and has deliberate weight — the colour flooding the screen, the name appearing, the pause before the portrait. This moment earns theatrical motion. Everything else does not.

**Interaction responses are immediate.** Any interactive element (tap, selection, slider) responds within the frame — no perceptible latency in the UI response. Sliders feel physical. Card selections feel like pressing a real button.

**Content loads gracefully.** Skeleton loading states rather than spinner states. Partial content before full content. The product never shows an empty white screen.

**Expand / collapse is tactile.** The depth-layer expand in the Lens Library should feel like opening something physical — a slight spring in the animation, a clear open/closed state.

---

## 8. Tone and Voice in UI

The design includes language (labels, microcopy, prompts, empty states) and this language is as much a part of the design as the visual. These principles govern it.

**The primary register reference is Rob Bell's Robcast — specifically the Me/We/Everybody series.** Rob's voice is warm, plain-spoken, a little surprising, and intellectually serious without being academic. He starts with a specific human moment, not an abstraction. He trusts his audience. All Loupe copy should pass the test: does this sound like Rob Bell or does it sound like a SaaS product?

**Speak in the product's voice, not a UI manual.** Labels are not form-filler language. "Find your lens" not "Take assessment." "Where you are right now" not "Your current result." "See what's ahead" not "View growth path."

**Respect the user's intelligence.** No over-explaining. No hand-holding copy. A user who has come to this product through Wilber or the Robcast does not need to be told what a shadow is in a tooltip.

**The empty states are not dead ends.** When a user hasn't taken the assessment yet, the empty Home doesn't say "No data yet." It says something that creates curiosity and momentum.

**Error states maintain the product's warmth.** An error is handled with the same tone as everything else — clear, direct, a little human. No technical jargon, no passive voice.

**Anti-weaponisation language is essential throughout.** Rob's warning — "the moment this becomes a parlour game" — should shape onboarding, the pre-assessment screen, and the result reveal. The framing is always: use this on yourself first. Understanding, not categorising.

### 8.1 Preferred language and phrases

These words and phrases come directly from the Me/We/Everybody podcast series and should be used wherever natural throughout the product. They carry the right register without needing explanation.

**Framework framing:**
- "Your centre of gravity" — always use this instead of "your stage," "your type," or "your level"
- "Spaces within us" — all lenses exist in everyone; this is a centre of gravity, not a fixed label
- "Where you're coming from" — warm, human, non-clinical
- "The lens through which you see the world"
- "How we grow" — simple, hopeful, personal
- "Meet people where they're at"

**Growth and transition:**
- "The invitation to expand" — never prescriptive; growth is always an invitation
- "Transcend and include" — Yellow's defining phrase, but useful anywhere growth is discussed
- "You can't unsee the other stories" — for the WE→Everybody transition
- "Channel that energy into something larger" — for healthy transitions from any lens

**Shadow and difficulty:**
- "Brittle" — the key word for any lens that is rigid and defensive (especially Blue and Green)
- "Shrill and brittle and narrow while thinking it's better" — unhealthy Everybody/Green specifically
- "The laser beam needs focus — if it doesn't, it goes in every direction" — unhealthy Green shadow
- "Health and unhealth at every stage" — use to establish that no lens is good or bad

**Anti-weaponisation (use in onboarding, pre-assessment, result reveal):**
- "Use this on yourself first"
- "A way of understanding, not a way of placing people"
- "Human behaviour is very mysterious — until you see where it's coming from"

### 8.2 Microcopy examples

| Context | Use | Not |
|---------|-----|-----|
| Assessment CTA | "Find your lens" | "Take assessment" |
| Result reveal | "This is your lens right now." | "Your result is:" |
| Result subtext | "A centre of gravity, not a fixed label." | "Your personality type is:" |
| Pre-assessment | "Answer as you are, not as you'd like to be." | "Complete all questions honestly" |
| Library soft prompt | "Take the assessment to see where you sit on the spiral." | "Complete the assessment to unlock personalisation" |
| Trial end banner | "Your 3 weeks are up. Here's what changes if you don't subscribe." | "Your free trial has expired" |
| Retake cooldown | "You can retake in 47 days. Here's why we suggest waiting." | "Assessment locked" |
| Empty profile | "You haven't found your lens yet. That's where this starts." | "No data yet" |
| Growth section header | "What's opening up" | "Your growth path" |
| Shadow section header | "Where it gets hard" | "Your weaknesses" |

---

## 9. Accessibility

- Colour is never the only encoding of information — the lens colours are supplemented with names and icons wherever they appear without labels
- All interactive elements meet WCAG AA contrast requirements in both the neutral palette and each lens colour environment (the Yellow lens environment will require special care)
- Touch targets are minimum 44×44pt on mobile
- All transitions and animations have a reduced-motion alternative for users with vestibular sensitivities
- The assessment is fully navigable by keyboard and usable with a screen reader — all input types must have appropriate ARIA labels and keyboard equivalents

---

## 10. What This Design Is Not

As important as what it is:

- **Not a wellness app.** The warm, calm aesthetic of Calm or Headspace is adjacent but the wrong register. Loupe is intellectually serious. The design should communicate that serious ideas are being treated seriously — not medicated away.
- **Not a corporate SaaS product.** The clean, cold utility of Linear or Notion is a reference for execution quality only. The feel is warmer, more editorial, more personal.
- **Not a quiz or personality test brand.** 16Personalities and similar products use a visual language of colourful badges and type-label aesthetics. Loupe must visually distinguish itself from this category — the design communicates that this is a different kind of product.
- **Not a spiritual or new-age product.** The content touches on developmental spirituality but the design should be grounded and credible, not mystical. Purple should not look like a tarot card brand.

---

## 11. Design Deliverables Expected

From a designer working from this direction document, the expected outputs are:

1. Visual identity: wordmark, logo usage guidelines, colour system with hex values and usage rules
2. Type system: chosen typefaces, scale, usage rules for display / body / UI
3. Component library: buttons, cards, inputs (all assessment types), navigation, tags, section headers, depth triggers, empty states, error states
4. Key screen high-fidelity designs: all screens listed in Section 6, at mobile scale (375px width minimum), plus desktop variants for World Right Now and Lens Library
5. Spiral map design and animation specification
6. Result reveal sequence (storyboard + final screen design)
7. Sharing card template (portrait and square variants, all 8 lens colour versions)
8. Prototype of the assessment flow and result reveal for user testing

---

_End of Phase 4: Design Direction_
