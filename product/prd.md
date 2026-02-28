# Product Requirements Document — Loupe MVP
_Prepared: 2026-02-25_
_Phase 3 of 5_

---

## 0. How to Read This Document

This PRD translates the Phase 2 Vision into functional requirements for the Loupe MVP. It defines what we are building, for whom, and to what standard — precisely enough to design and build from, without over-specifying decisions that belong to design or engineering.

Reference documents: `product/vision.md`, `research/proto-personas.md`, `research/market-landscape.md`

---

## 1. MVP Scope

### What Is In MVP

Five features constitute the Loupe MVP. All five are required for launch — removing any one of them breaks the core user journey.

| Feature | Purpose |
|---------|---------|
| The Lens Assessment | Entry point; produces the result everything else personalises from |
| The Lens Library | Core reference content; eight lens profiles, the full framework |
| Your Profile | Personal lens portrait drawn from the assessment result |
| Navigating Relationships | Relational application; the primary use case for our largest audience |
| The World Right Now | Cultural framing; makes the framework feel urgently relevant |

Plus the essential infrastructure these features run on:

- Onboarding flow
- Account creation and authentication
- Subscription and payment (Personal tier only at launch)
- Basic account settings

### What Is Explicitly Not In MVP

The following features appear in the Vision's Tier 2 and Tier 3 lists. They are confirmed post-MVP. No scope creep.

- Organisations and Culture (team mapping, org diagnostics)
- The Practitioner Layer (coaching notes, client sharing, multi-profile management)
- Growth Pathway (structured learning journey)
- Shadow Work Module (dedicated shadow deep-dive as a separate feature — shadow content is present within the Lens Library and Your Profile)
- Assessment for Others
- Progress and Reflection journaling
- Community and cohorts
- API / practitioner integrations
- Professional subscription tier (exists in the business model but is not built for MVP)

---

## 2. Target Users for MVP

Two primary users drive MVP design decisions. Secondary users are acknowledged but do not drive the MVP.

**Primary — Jamie (Empathic Relationship Navigator)**
Arrived via podcast, hit a wall, came here to finally understand someone they love. Emotionally motivated. Has limited prior knowledge of the framework. Needs to feel understood before they can understand. Mobile likely.

**Primary — Marcus (Curious Self-Developer)**
Articulate, widely-read, came via Robcast or Wilber. Wants depth and intelligence without density. Will test our credibility in the first three minutes. Wants to go somewhere the podcast didn't take him.

**Secondary — Sofía (Coach)**
Will explore the product to evaluate it for professional use. Will look for depth, precision, and professional credibility. Her needs are partially met by MVP; the Practitioner Layer (post-MVP) is what fully serves her.

**Secondary — Priya (Leader)**
Likely discovers the product through someone like Sofía or Marcus. The World Right Now section is highly relevant to her. Team tools (post-MVP) are what fully serves her.

---

## 3. User Stories

### 3.1 Onboarding

- As a new user, I want to understand what Loupe is and what it does in under 60 seconds, so that I can decide whether to continue without feeling sold to.
- As a new user, I want to know that this is not a personality test and that no lens is presented as superior, so that I approach the assessment honestly rather than strategically.
- As a new user, I want to start the assessment with minimal friction, so that the entry point is the experience itself, not a sign-up gate.

### 3.2 The Lens Assessment

- As a user, I want to answer questions that feel like genuine reflection prompts rather than obvious multiple choice, so that I give honest answers rather than the answers I think I should give.
- As a user, I want the assessment to take approximately 15–20 minutes, so that it feels substantial enough to trust without feeling like a commitment I'll abandon.
- As a user, I want a clear, visible sense of where I am in the assessment and how far I have to go, so that I stay engaged and don't lose momentum or drop off mid-way.
- As a user, I want to respond to questions in varied ways — sliders, choices, images, yes/no — so that the assessment feels alive and I'm not just clicking the same button forty times.
- As a user, I want my result to feel like it was written about me specifically, not like a generic category dump, so that I have an immediate sense of recognition.
- As a user, I want to understand that my result is a current centre of gravity, not a fixed type, so that I don't feel labelled or capped.
- As a user, I want to see not just my primary lens but my secondary lens and shadow tendencies, so that the result has enough complexity to be credible.
- As a user, I want to be able to share my result in a way that feels interesting and invites curiosity, without feeling like I'm showing off a status label, so that sharing is genuine rather than performative.
- As a user, I want to be able to retake the assessment after a significant period or life change, so that the product reflects who I am now, not who I was at sign-up.

### 3.3 The Lens Library

- As a user, I want to read a vivid portrait of each lens written in first-person, so that I can genuinely feel what it's like to see the world from there.
- As a user, I want to understand both the healthy gifts and the shadow expressions of each lens, so that I can recognise real people — including myself — in the full picture.
- As a user, I want to be able to skim a lens profile quickly and choose to go deeper, so that I can explore efficiently and trust that depth is available when I want it.
- As a user, I want to see real-world examples in relationships, work, and culture for each lens, so that the framework maps onto my actual life, not just abstract theory.
- As a user, I want to see the eight lenses laid out visually and be able to interact with them, so that I understand how they fit together in the spiral and can grasp the alternating inward and outward character of each lens before reading them in depth.
- As a user, I want to understand the Me/We/Everybody grouping, so that I have an immediate orientation to where each lens sits in the developmental arc.
- As a user, I want to understand how to genuinely connect with someone operating from each lens, so that the library is practically useful, not just educational.

### 3.4 Your Profile

- As a user, I want my profile to feel personal and specific, not generic, so that I trust it enough to engage with it over time.
- As a user, I want to understand my shadow tendencies in plain language, so that I can actually recognise them when they're happening.
- As a user, I want to understand what my current lens means for how I tend to show up in relationships and under stress, so that the framework has immediate practical application.
- As a user, I want to understand what growth from my current position looks like, without it feeling like a judgement of where I am, so that I feel oriented rather than pushed.
- As a user, I want my profile to update if I retake the assessment, so that it reflects my actual development over time.

### 3.5 Navigating Relationships

- As a user, I want to select two lenses and get a guide to how they interact, so that I can understand a specific relationship I'm living in.
- As a user, I want to see the most common friction patterns between two lenses, so that I have language for what's been happening.
- As a user, I want to understand what each person in a given lens combination actually needs, so that I can stop interpreting their behaviour as bad faith.
- As a user, I want to see what genuine connection across a specific lens gap looks like, so that I have something to move toward, not just an explanation of what's wrong.
- As a user (Jamie), I want to find content specifically about parent/adult child combinations, close friendships, and romantic partnerships, so that the most painful relationship dynamics in my life are directly addressed.
- As a user, I want the content to acknowledge that both people in a dynamic have valid lenses, so that I don't use the framework as a weapon against the other person.

### 3.6 The World Right Now

- As a user, I want to read lens-grounded analysis of current events, so that the framework feels urgently relevant to my actual life and not just an abstract self-development tool.
- As a user, I want the cultural analysis to apply the framework even-handedly to all sides of contemporary debates, so that I trust it is genuinely analytical rather than politically motivated.
- As a user, I want new pieces added periodically, so that I have a reason to return to the product beyond the assessment I already took.

### 3.7 Subscriptions

- As a user, I want to try the full product free for 3 weeks before being asked to pay, so that I can experience its real value and make an informed decision rather than a leap of faith.
- As a user, I want to see what I get before I pay, so that I'm signing up based on genuine experience rather than a sales pitch.
- As a user, I want a clear, simple pricing page with no dark patterns, so that I trust the product's integrity.
- As a user, I want to be able to cancel at any time without friction, so that the subscription feels like a choice I renew rather than a trap.

---

## 4. Feature Specifications

---

### 4.1 The Lens Assessment

#### Purpose
To produce an accurate, trusted result that drives everything else in the product. The assessment is the engine — if users don't trust the result, the whole product loses credibility.

#### Design Reference: Dimensional
The app Dimensional is the closest existing benchmark for the assessment experience Loupe should achieve. Dimensional uses varied input formats, high visual quality, and a warm, curious tone to make an extended questionnaire feel genuinely engaging rather than like a form. The assessment design team should study it in detail. Key lessons to carry across: questions feel like they mean something; no two consecutive questions feel the same; the experience is mobile-native and tactile; the result feels like a moment worth sharing.

#### Format
A single-session questionnaire of approximately 30–40 items. Items are situational and indirect — they describe scenarios, choices, or reactions rather than asking users to self-report values directly (e.g. "How important is loyalty to you?" is the wrong format; it invites inflation).

Questions cycle through several lens dimensions and are not obviously grouped. Users should not be able to reverse-engineer the "correct" answer for any lens they aspire to.

The assessment is delivered in sections of 6–8 questions at a time with brief transition moments between sections. Each section should feel conversational and take approximately 2–3 minutes.

#### Input Variety
A core engagement requirement (see FLAG-10): no two consecutive questions should use the same input format. The assessment must use a mix of the following:

- **Sliders** — for gradient responses; e.g. "How much does this describe you?" on a continuous scale. Good for questions where the extremes are both revealing.
- **Multiple choice** — for scenario-based items where the user selects the response that resonates most; 3–4 options maximum, all written without an obvious "right" answer.
- **Binary / boolean** — for decisive, instinctive responses; presented as a swipe or a two-option tap. Good for establishing clear directional signals.
- **Ranked choice** — user orders a set of values or scenarios by personal resonance; used sparingly (once or twice) as they require more cognitive effort.
- **Image or scene selection** — optional and to be evaluated in design: user selects from two images representing different worldviews or emotional environments. Reduces language bias and can surface intuitive responses.

Each input type must be accessible by keyboard and screen reader.

#### Progress Design
Users must always know where they are. The progress indicator is persistent and honest — it shows real completion, not a fake accelerating bar. Between sections, a brief transition screen acknowledges the section just completed and orients to the next. These transitions are not loading screens — they are micro-moments of reflection ("You've told us how you relate to others. Now we want to understand what you value when things get hard."). They should be visually distinct from question screens.

#### Anti-Inflation Design Requirements
The assessment must embody FLAG-2 from the kanban board: friction by design.

- Include attention-check items that catch users who are answering aspirationally
- Include pairs of items that are in tension — if a user claims the high-growth answer on both, their result is flagged as potentially inflated and the profile includes a note
- Questions should name the healthy expression of lower lenses with genuine warmth — if a user dismisses these too quickly, the algorithm notes it
- The result should never feel like it could be gamed; this means no obvious "highest" answer should exist for most items

#### Result Structure
The assessment produces:

- **Primary lens** — the user's current centre of gravity (one of the eight lenses)
- **Secondary lens** — the adjacent or supporting lens that colours how the primary expresses (may be the lens being grown toward, or one being carried from below)
- **Shadow tendency flag** — the specific unhealthy expression patterns most characteristic of their primary lens under stress
- **Growth orientation** — a brief, non-prescriptive description of what the next lens sees that the current lens tends to miss
- **Confidence level** — an internal flag (not shown to user) indicating result certainty; low-confidence results trigger a note to the user that their profile captures a useful starting point rather than a definitive reading

The result is not a score out of 100. It is not a percentile. It is a portrait.

#### Result Delivery
The result is presented as a moment, not a data dump. The delivery screen reveals the primary lens name, its colour, and a single evocative sentence before any further content loads. Users should have a beat to sit with it before reading more. The next screen shows the full portrait. The design of this moment matters enormously — this is the product's first chance to earn deep trust.

#### Social Sharing
Sharing is opt-in, always. The product never prompts sharing before the user has had time to sit with their result. When sharing is offered, it must avoid the "personality type status badge" problem — the risk that sharing becomes a way of signalling developmental sophistication ("look, I'm Yellow") rather than an invitation to genuine curiosity.

Design direction for sharing:

- **Share a landscape, not a label.** The shareable card shows a visual representation of the user's full lens distribution — a spectrum or gradient — not just the primary lens name. The viewer sees texture and nuance, not a single category.
- **Lead with a line, not a type.** The card leads with a resonant phrase from the user's profile (e.g. *"I discovered I've been seeing the world through achievement — and what that costs me in relationships"*) rather than a lens colour name. Invites empathy over status comparison.
- **Frame as invitation.** The card ends with a question directed at the viewer: *"Which lens do you see the world through?"* with a link to take the assessment. The share is a doorway, not a declaration.
- **Lens colour as aesthetic.** The card is visually themed in the user's lens colour — beautiful enough to share for aesthetic reasons alone, which removes some of the self-promotional pressure.
- The social sharing mechanic warrants its own design exploration session. The above is directional, not final.

Supported share targets at launch: Instagram Stories, X (Twitter), and copy-to-clipboard for any other platform.

#### State
Assessment results are stored server-side. The algorithm and scoring are not exposed to the client. Users may retake after 90 days. Attempts to retake before 90 days show a note explaining the cooling-off period and why it exists.

---

### 4.2 The Lens Library

#### Purpose
The authoritative reference for all eight lenses — the content backbone of the entire product. Users will return here for specific lenses as they encounter people and situations in their lives. It must be deep enough to earn repeated visits and accessible enough to land on first read.

#### Structure
Eight lens profiles, presented within three groupings:

**Me** (Beige, Purple, Red) — survival, tribe, power; the first-person-singular developmental arc
**We** (Blue, Orange) — order, institution, achievement; the first-person-plural developmental arc
**Everybody** (Green, Yellow, Turquoise) — pluralism, integration, holism; the beyond-ego developmental arc

Each grouping has a brief contextual intro explaining what unites these lenses developmentally, written in the Wilber/*Trump* register: plain, grounded, culturally resonant.

#### Each Lens Profile Contains

**Header** — Lens name, 1–3 descriptor tags shown as subtext (see tag system below), and a single evocative sentence that lands the feel of the lens immediately. The tags are the fastest way to orient a new reader — they should feel like a click of recognition, not a clinical label.

**Lens tags** — Each lens has 1–3 short descriptor words displayed beneath its name throughout the product. These are informed by Rob and Trace Bell's register in the Me/We/Everybody podcast series — plain-spoken, emotionally accurate, non-academic. The canonical tags are:

| Lens | Tags |
|------|------|
| Beige | Survival · Instinct · Primal |
| Purple | Magic · Tribe · Ancestral |
| Red | Power · Impulse · Dominance |
| Blue | Order · Duty · Tradition |
| Orange | Achievement · Rational · Progress |
| Green | Pluralism · Empathy · Justice |
| Yellow | Integration · Systems · Fluidity |
| Turquoise | Holistic · Global · Flow |

**From the inside** — A first-person, present-tense portrait of what the world genuinely looks and feels like from this lens. Written with full empathy — the goal is that someone operating from this lens reads this and feels seen, not judged. 200–350 words. The test: would someone centred here feel understood or patronised? Rob Bell's framing: "human behaviour is very mysterious — until you see where it's coming from." This section is the answer to that.

**What this lens values and why** — The values of this lens, written without apology or condescension. These values make complete sense given the life conditions that produced them. 100–200 words. No lens's values are irrational — they are a completely coherent response to a particular set of life experiences. Write from that premise.

**Healthy expression** — What this lens looks like when it's functioning well. Specific, vivid, using real examples from relationships, leadership, civic life, and culture. 150–250 words. Draw on the "In the Wild" examples from `research/podcast-content-notes.md` — the anti-war rally, the recovering addict, the megachurch, the Roman Empire. Real examples, not abstractions.

**Shadow expression** — What this lens looks like when it's frightened, closed-down, or overextended. Written with the same compassion and specificity as the healthy expression. Not a warning label — a recognition tool. 150–250 words. Key word from Rob: "brittle" — use it or a close equivalent for any lens that becomes rigid and defensive. For Green specifically: "shrill and brittle and narrow while thinking it's better." The shadow is always a distortion of the lens's gift, not a separate character flaw.

**In the wild** — Rapid, recognisable examples of this lens in real-world contexts: 3–5 examples drawn from politics, popular culture, archetypes, relationship dynamics, and workplace behaviour. Format: short paragraph each, scannable. Refer to `research/podcast-content-notes.md` for the specific examples Rob and Trace use — these have been tested for resonance with a general audience and should be used as a starting point. Key examples to use:
- Beige: factory shutdown, survival crisis, the friend with three degrees who still has this space within them
- Purple: the young man who gets his girlfriend pregnant and says "my family just can't get a break"
- Red: Saddam Hussein in the city square; the 2006 anti-war rally (Red energy vs Green energy at the same event)
- Blue: drug addiction recovery and the 12 steps; hiring for loyalty vs hiring for merit
- Orange: the megachurch as Blue theology + Orange methodology; democracy as Orange thinking
- Green: the 1960s — feminism, civil rights, earth care, war protests; cancel culture as shadow
- Yellow: the pastor in conservative Texas who meets people where they are; finding yourself let down by both left and right

**How to connect** — Practical guidance for how to genuinely reach someone operating from this lens. Not manipulation tactics — genuine communication principles. What do they need to hear? What lands? What closes them down? 150–200 words. Source the specific communication principles from `research/podcast-content-notes.md` per-lens notes and the assessment design section.

**Depth layer** (collapsed by default) — More technical material for users who want it: the Graves/Beck theoretical grounding for this level, historical examples, connection to Wilber's framing, relationship to adjacent lenses. This is where terms like vMEME and First/Second Tier can appear, clearly flagged as deeper context.

**Content tone requirement across all sections:** All lens profile content must pass two tests from the PRD: (a) would this embarrass a serious SD practitioner? (b) would this bore or alienate a first-time Robcast listener? And a third test from the podcast: does it sound like something Rob Bell would say, or does it sound like a psychology textbook?

#### Colour Theming
Post-assessment, the Lens Library interface is themed in the colour palette of the user's centre of gravity lens. The background, accent colours, typographic highlights, and interactive elements take on the tones of that lens — creating a personalised, immersive environment that makes each user's library feel distinctly theirs. Users who have not yet completed the assessment see the library in a neutral palette. Users can switch to any lens's colour environment when viewing that lens's profile, returning to their home colour when they navigate away. This is a design and branding requirement, not a preference — it is one of the most visually distinctive choices in the product.

#### Visual Lens Map
The library entry point features an interactive visual map of all eight lenses arranged along the spiral arc. Key design requirements:

- The spiral shape reflects the actual model — not a linear list or a circle, but the characteristic expanding helix of Spiral Dynamics
- Each lens is represented as a node on the arc, coloured in its associated colour
- The inward/outward character of each lens is visually encoded — the alternating focus of the spiral (Beige inward, Purple outward, Red inward, Blue outward, Orange inward, Green outward, Yellow integrating) should be legible in the visual design, not just described in text
- Me/We/Everybody groupings are visible as distinct arcs or zones within the map
- Tapping or hovering any lens node reveals a brief glimpse (name + one-line description) before the user navigates to the full profile
- The user's centre of gravity is highlighted and visually distinct — their home position on the map
- The map is the primary navigation surface for the library; the list view is secondary

This visual map is a high-priority design challenge and a meaningful differentiator. No existing SD product has a well-designed interactive model visualisation. It should be treated as a signature element of the product.

#### Navigation
Users can browse all eight lenses freely without having completed the assessment. Post-assessment, their primary lens is highlighted and their secondary lens is flagged. The grouping (Me/We/Everybody) is always visible as orientation.

---

### 4.3 Your Profile

#### Purpose
The personal application of the assessment result — the place where the framework becomes specific to the user's actual life. This must feel personal enough to be trusted and specific enough to be useful.

#### Structure

**Centre of gravity** — Primary lens portrait, drawn from the library but written in second person ("You tend to…" rather than "People with this lens…"). Adapted from the library content but personalised in voice. Acknowledges the secondary lens and how it colours the primary.

**How you show up** — Three specific context panels:
- In relationships: how your lens tends to express itself with the people closest to you, what you're likely to over-value or under-value, what partners and friends may experience
- Under stress: your shadow tendencies in concrete behavioural terms — what you do, not just what you feel, when this lens contracts
- When growing: early signs that a user is beginning to integrate the next lens — what starts to open, what can feel disorienting

**Your shadow** — A dedicated section on the shadow tendencies flagged in the assessment result. Written in plain language without judgment. The goal is recognition, not shame. Includes: what triggers this shadow, what it looks like in behaviour, what helps.

**What's ahead** — A brief, non-prescriptive orientation to the next lens and what it sees that the current lens tends to miss. Clearly framed as descriptive, not prescriptive — the product is not telling the user to change.

**Your lens in the world** — A brief connection to The World Right Now: which current cultural dynamics resonate most strongly with this lens, which feel most threatening or incomprehensible, and what the framework offers as context.

#### Tone Requirements
The profile must not feel like a test result. It must feel like a thoughtful observation from someone who has paid genuine attention. Every section should balance honesty (including about limitations and shadows) with warmth. The profile is not a report card.

---

### 4.4 Navigating Relationships

#### Purpose
The feature that converts self-understanding into relational utility — the reason the product matters beyond individual introspection. For Jamie, this is the primary reason for using Loupe at all.

#### The Two-Lens Tool
Core mechanic: user selects two lenses (their own + another person's, or any two hypothetically) and receives a relational guide.

The guide contains:
- **Dynamic summary** — what typically happens when these two lenses are in relationship; the characteristic shape of their interactions
- **What Lens A needs from Lens B** — stated in terms the Lens B person can act on; not blame-assignment
- **What Lens B needs from Lens A** — symmetric
- **Where it typically breaks down** — the predictable friction points; what each person tends to interpret as bad faith, stupidity, or hostility when it is actually lens logic
- **What genuine connection looks like** — not just "avoid these friction points" but what the relationship can become when both people understand the dynamic

The Two-Lens Tool is available to all users. Pre-completion of the assessment is not required but the user's own lens is pre-filled if it exists.

#### Priority Combinations for MVP
These specific combinations must have full, authored content at launch — not generated from templates, but individually written:

| Combination | Persona relevance | Notes |
|-------------|-------------------|-------|
| Blue / Orange | Universal workplace dynamic | Very common friction |
| Orange / Green | Common in progressive workplaces and families | Political dimension |
| Blue / Green | Parent/adult child archetype; political fracture | Jamie's core case |
| Red / Blue | Authority conflicts; institutional dynamics | |
| Orange / Orange | Competitive dynamics; achievement burnout | |
| Green / Green | Consensus paralysis; progressive team dynamics | |
| Blue / Blue | Rule conflict; institutional stasis | |
| Purple / Blue | Multigenerational family dynamics | |

Additional combinations should have template-generated content at launch, clearly flagged as a lighter version, with a note that fuller content is in development.

#### Scenario Framing
Each combination guide includes three scenario framings that users can select:
- **In close relationship** (partner, family member, close friend)
- **In working relationship** (colleague, manager, report)
- **In civic life** (neighbour, community, political context)

The core content is the same; the scenario framing adjusts examples and language to the context.

#### Relationship Finder
An optional guided flow for users who are uncertain which lens best describes the other person in their relationship. User describes observable behaviour patterns; guided questions help them arrive at a hypothesis. Clearly framed as a hypothesis, not a diagnosis. This helps Jamie, who may not know which lens her father is — she just knows what keeps happening.

---

### 4.5 The World Right Now

#### Purpose
Makes Loupe feel urgently relevant to real life in 2026, not just a personal development exercise. Anchors the framework in the cultural moment. Earns coverage in non-self-development media. A reason to return.

#### Format
Long-form pieces of approximately 800–1,500 words each, written in the register of the Wilber/*Trump* book: grounded, analytical, plain-language, even-handed. Not hot takes. Not therapy content. Genuine lens-based analysis of cultural, political, and social dynamics.

Each piece:
- Opens with a specific phenomenon (a trend, an event, a cultural tension) rather than an abstraction
- Identifies which lenses are most centrally involved
- Explains the lens logic from the inside — why this makes complete sense from that lens's perspective
- Identifies what's missing in the typical discourse about this phenomenon
- Offers a framing that generates understanding rather than judgment

#### Launch Content (10 pieces minimum)
Topics to be fully drafted before launch. Suggested:

- Why political conversations keep failing (Blue vs. Green / Orange tension)
- The AI anxiety split (Orange embrace vs. Green / Yellow concern)
- Why institutions feel broken (the First Tier crisis)
- The wellness industry paradox (Orange commodifying Green)
- Faith deconstruction and the developmental arc (Blue to Green transitions)
- Why progressive spaces collapse into conflict (Green shadow)
- The return of authority (Blue response to Green dissolution)
- Generational worldview fracture (Boomer/Gen X/Millennial/Gen Z as lens archaeology)
- The culture war as a developmental problem, not a political one
- What the spiral says about where we go from here

#### Update Cadence
New pieces published monthly. Editorial calendar maintained by the Loupe team. Not user-contributed at MVP.

#### Filtering
Users can filter pieces by lens (to read all pieces most relevant to a specific lens they're trying to understand) or browse by recency. Pieces are tagged with primary and secondary lens relevance.

---

## 5. Onboarding

#### Philosophy
The onboarding sequence must earn trust before asking for anything. Users should understand what the product is, feel something genuine from the first interaction, and arrive at the assessment already predisposed to answer honestly.

#### Sequence

**1. Landing / Entry**
New users arrive at a brief, high-quality explanation of the product. Approximately 3 screens or equivalent scroll:
- What it is (the problem, in a sentence)
- What it does (the framework, without jargon)
- What will happen next (you'll answer some questions; we'll show you your lens; here's what that means)

No sign-up required to start. Users begin the assessment without creating an account. This is intentional — the assessment experience is the pitch. Account creation happens after the result is revealed.

**2. Assessment**
Delivered as described in Section 4.1. Progress indicator showing how far through the user is. No ability to go back once a section is submitted (to prevent gaming). Tone throughout is warm, curious, slightly playful — not clinical.

**3. Result Reveal**
The moment the primary lens is named. Full attention on this screen. The design of this screen is one of the highest-priority design challenges in the product.

**4. Account Creation**
After seeing the result, users are invited to create a free account to save their result. This is the conversion moment. Copy: "Save your result and start exploring." Not "Sign up now." Not paywall. The result is shown in full whether or not they create an account in this session — but it cannot be retrieved without an account.

**5. Paywall Gate**
The Lens Library and Navigating Relationships features require a Personal subscription. The World Right Now has two free pieces visible; remaining pieces are behind the subscription. Your Profile is fully accessible after account creation. This gives a meaningful free experience while creating clear value behind the subscription.

**6. Post-Onboarding**
First logged-in session surfaces: Your Profile fully, with entry points to Lens Library and Navigating Relationships. The World Right Now is surfaced as a secondary discovery. No tutorial overlay — the product should explain itself.

---

## 6. Authentication and Account

- Email/password authentication at launch
- Google OAuth as an alternative (reduces friction significantly for target audience)
- No data collected beyond what is needed for the product
- Assessment results stored server-side, associated with account
- Users can delete their account and all associated data at any time
- No email marketing without explicit opt-in (separate from account creation)

---

## 7. Subscription and Payment

- Payment via Stripe
- Personal tier only at MVP launch
- Monthly and annual billing options; annual at a discount (approx. 2 months free)
- **Free tier** (permanent, no time limit): assessment + full Your Profile + 2 World Right Now pieces. This is the baseline — always available, no credit card required.
- **3-week free trial** (full Personal tier): after account creation, users receive 3 weeks of full Personal tier access with no credit card required. At the end of the trial, they are invited to subscribe to continue. Clear, honest, no auto-charge. The trial is the full product — not a watered-down preview.
- **Personal tier**: full access to all MVP features, ongoing subscription after trial
- Cancellation via account settings, immediate, no dark patterns, no "are you sure?" friction loops
- Refund policy: full refund within 7 days of first charge if requested

---

## 8. Non-Functional Requirements

#### Engagement Design (FLAG-10)
This is a product constraint, not a UX preference. Every content screen must apply the following standards:
- Maximum readable content per screen before a natural break: 300 words for most contexts; 500 words for deep-dive layers
- Every long-form piece in The World Right Now must have pull-out quotes, section headers, and scannable structure — no wall-of-text
- The Lens Library profiles must be skimmable at speed and rewarding when read slowly
- Interactive moments (the Two-Lens Tool, result reveal, profile sections) must feel like discoveries, not form completions
- No loading state longer than 2 seconds before partial content appears

#### Performance
- Page load (initial): under 3 seconds on standard mobile connection
- Assessment question transitions: under 500ms
- No client-side scoring logic exposed

#### Platform
- Web application, fully responsive (mobile-first design)
- Tested on: Safari/iOS, Chrome/Android, Chrome/macOS, Safari/macOS
- Progressive Web App (PWA) capability for home screen installation — not a native app at launch

#### Accessibility
- WCAG AA compliance minimum
- Screen reader compatibility for all core flows
- Assessment navigable by keyboard

---

## 9. Content Requirements

The product lives or dies on content quality. These are the content assets required before launch.

| Asset | Quantity | Notes |
|-------|----------|-------|
| Assessment questions | 35–40 items | Plus 5–8 calibration/attention-check items |
| Assessment result portraits | 8 | One per primary lens; second-person, personalised voice |
| Shadow tendency descriptions | 8 | One per lens; plain language, compassionate |
| Growth orientation descriptions | 8 | One per lens; descriptive, not prescriptive |
| Lens Library full profiles | 8 | All sections as specified in 4.2 |
| Me/We/Everybody grouping intros | 3 | One per grouping |
| Relationship guides (full) | 8 | Priority combinations as specified in 4.4 |
| Relationship guides (template) | 20+ | Remaining combinations; lighter treatment |
| World Right Now pieces | 10 | Full launch library |
| Onboarding copy | — | Entry screens, result reveal, post-onboarding |
| UI microcopy | — | Throughout; tone consistency critical |

All content must pass a tone review against two standards: (a) would this embarrass a serious SD practitioner? (b) would this bore or alienate a first-time Robcast listener? Both must be no.

---

## 10. Resolved Decisions

All open questions from the initial PRD draft have been resolved. These decisions are now locked for the MVP design and engineering phases.

| # | Question | Decision |
|---|----------|----------|
| OQ-1 | Adaptive vs. static assessment? | **Static.** Same question set for all users. Good question design and input variety will compensate. Adaptive branching is a post-MVP enhancement. |
| OQ-2 | Can users access Lens Library before completing the assessment? | **Yes,** with a soft prompt to take the assessment first. Library is freely browsable. |
| OQ-3 | Free-tier access model? | **Confirmed as proposed.** Free tier: assessment + full Your Profile + 2 World Right Now pieces. Plus 3-week full trial on account creation. See Section 7. |
| OQ-4 | How is World Right Now content produced? | **AI-assisted first draft**, with rigorous human editorial review and final authoring. The Wilber register requires strong editorial control — volume is secondary to quality. |
| OQ-5 | Does Relationship Finder make MVP? | **Yes, in MVP** as a simpler flow. Core to Jamie's use case; cannot be deferred without weakening the relational proposition. |
| OQ-6 | Professional tier at MVP? | **Personal tier only at launch.** Professional tier to follow approximately 6 months post-launch, once the Practitioner Layer is built. |
| OQ-7 | Social sharing mechanic? | **Yes, in MVP.** Design direction specified in Section 4.1. Sharing must be opt-in, framed as invitation not status declaration, and visually distinctive. Full design exploration required before implementation. |
| OQ-8 | 90-day retake window? | **Confirmed at 90 days** as a starting point, with adjustment possible based on early user feedback. |

---

## 11. Success Criteria for MVP Launch

Before launch is declared ready, the following must be true:

- All 8 lens profiles are fully authored and tone-reviewed
- The assessment produces results that beta users describe as "surprisingly accurate" — not merely "plausible"
- The result reveal screen has been tested with at least 10 target users and produces a genuine emotional response
- At least 8 Navigating Relationships guides are fully authored (priority combinations)
- At least 10 World Right Now pieces are complete
- The paywall gate has been tested for conversion and does not produce drop-off before result reveal
- The product has been reviewed by at least one credentialed SD practitioner for theoretical accuracy
- Performance requirements in Section 8 are met on a standard mid-range mobile device

---

_End of Phase 3: PRD for MVP_
