// ─────────────────────────────────────────────────────────────────────────────
// World Seed Data — Development fallback for "The World Right Now" articles
//
// Mirrors the Sanity article schema. Used when:
//   - Sanity hasn't been seeded yet (dev workflow)
//   - Sanity fetch fails (resilience)
//
// PRD §4.5 requires 10 launch pieces minimum, each 800–1,500 words,
// written in the Wilber/Trump register: grounded, analytical, plain-language.
// Each piece opens with a phenomenon, identifies lenses, explains logic,
// identifies missing discourse, and offers an understanding-generating frame.
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug } from "@loupe/types";

export interface SeedArticle {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  readTimeMins: number;
  lenses: Array<{ slug: LensSlug; displayName: string; colourHex: string }>;
  body: ArticleSection[];
  related: string[]; // slugs of related articles
}

export interface ArticleSection {
  type: "paragraph" | "heading" | "pullquote";
  text: string;
}

// Lens colour references for tagging
const LENS_REF: Record<LensSlug, { slug: LensSlug; displayName: string; colourHex: string }> = {
  beige: { slug: "beige", displayName: "Beige", colourHex: "#C4A882" },
  purple: { slug: "purple", displayName: "Purple", colourHex: "#6B4E9B" },
  red: { slug: "red", displayName: "Red", colourHex: "#C0392B" },
  blue: { slug: "blue", displayName: "Blue", colourHex: "#1E3A6E" },
  orange: { slug: "orange", displayName: "Orange", colourHex: "#C4622D" },
  green: { slug: "green", displayName: "Green", colourHex: "#3D7A52" },
  yellow: { slug: "yellow", displayName: "Yellow", colourHex: "#B89A28" },
  turquoise: { slug: "turquoise", displayName: "Turquoise", colourHex: "#1A6B7A" },
};

// ── 10 Launch Articles ──────────────────────────────────────────────────────

export const SEED_ARTICLES: SeedArticle[] = [
  // ── 1. Why political conversations keep failing ────────────────────────
  {
    slug: "why-political-conversations-keep-failing",
    title: "Why Political Conversations Keep Failing",
    publishedAt: "2026-02-20T09:00:00Z",
    excerpt: "Your uncle isn't stupid. Your colleague isn't evil. They're optimising for something fundamentally different — and neither of you can see it.",
    readTimeMins: 8,
    lenses: [LENS_REF.blue, LENS_REF.green, LENS_REF.orange],
    related: ["the-culture-war-as-a-developmental-problem", "the-return-of-authority"],
    body: [
      { type: "paragraph", text: "You've been in this conversation. You know exactly how it goes. Someone mentions a policy, a headline, a social issue — and within three exchanges the temperature in the room has changed completely. Not because anyone said anything outrageous. Because two people who are fundamentally seeing different realities just collided without realising it." },
      { type: "paragraph", text: "The standard explanation is that politics has become 'polarised' — that people are more extreme than they used to be. But that doesn't explain what's actually happening in these conversations. What's happening is much stranger and more interesting than polarisation." },
      { type: "heading", text: "Three lenses, three entirely different problems" },
      { type: "paragraph", text: "Watch a political argument carefully and you'll notice something. The participants aren't usually arguing about the same thing. They think they are — they're using the same words, pointing at the same events — but they're solving completely different problems." },
      { type: "paragraph", text: "A Blue lens sees a world that needs order, structure, and clear moral boundaries. When they look at a social issue, they're asking: what's the right thing to do? What are the rules? What happens to a society that abandons its principles? These aren't rhetorical questions. For Blue, a society without clear moral structure is genuinely dangerous." },
      { type: "paragraph", text: "An Orange lens sees a world of problems to be solved through strategy, evidence, and pragmatic thinking. When they look at the same issue, they're asking: what actually works? What does the data show? What's the cost-benefit analysis? For Orange, moral arguments that ignore practical outcomes are a luxury we can't afford." },
      { type: "paragraph", text: "A Green lens sees a world where voices are being silenced and systems are causing harm. When they look at the same issue, they're asking: who's being left out? Whose experience isn't being counted? What power dynamics are being reproduced? For Green, data-driven arguments that ignore lived experience are missing the whole point." },
      { type: "pullquote", text: "They're not arguing about the same thing. They're solving completely different problems using completely different criteria — and each one thinks the others are wilfully ignoring the obvious." },
      { type: "heading", text: "The invisible translation failure" },
      { type: "paragraph", text: "Here's what makes this so painful: each lens is internally coherent. Blue's concern for moral clarity is genuine and important. Orange's concern for practical effectiveness is genuine and important. Green's concern for inclusion is genuine and important. None of them is wrong about what matters. They're each seeing something real." },
      { type: "paragraph", text: "But they cannot hear each other, because each lens processes language differently. When Green says 'justice,' Blue hears an attack on the moral order. When Blue says 'tradition,' Green hears an excuse for oppression. When Orange says 'let's look at the numbers,' both Blue and Green feel dismissed — Blue because morality shouldn't be reduced to metrics, Green because data has been used to erase people." },
      { type: "paragraph", text: "The conversation doesn't fail because people are stupid or cruel. It fails because they are literally operating different meaning-making systems — and no one in the room knows it." },
      { type: "heading", text: "What the spiral makes visible" },
      { type: "paragraph", text: "Spiral Dynamics doesn't resolve political disagreements. It does something more useful: it makes the structure of the disagreement visible. Once you can see that Blue, Orange, and Green are solving different problems, you stop expecting them to agree. Instead, you can start asking a better question: what would it look like to honour all three concerns at once?" },
      { type: "paragraph", text: "That's not a compromise. It's a genuinely harder form of thinking. It requires holding multiple valid frames simultaneously — which is exactly what Yellow and Turquoise lenses begin to do. But you don't need to be Yellow to benefit from this insight. You just need to see what's actually happening in the conversation." },
      { type: "paragraph", text: "The next time a political conversation starts to heat up, try this: instead of formulating your response, ask yourself which problem the other person is trying to solve. Not which problem you think they should be solving. The one they're actually working on. It won't end the disagreement. But it might end the war." },
    ],
  },

  // ── 2. The AI anxiety split ────────────────────────────────────────────
  {
    slug: "the-ai-anxiety-split",
    title: "The AI Anxiety Split",
    publishedAt: "2026-02-15T09:00:00Z",
    excerpt: "Some people are thrilled about AI. Others are terrified. The split maps almost perfectly onto how they see the world.",
    readTimeMins: 7,
    lenses: [LENS_REF.orange, LENS_REF.green, LENS_REF.yellow],
    related: ["why-institutions-feel-broken", "where-the-spiral-says-we-go-from-here"],
    body: [
      { type: "paragraph", text: "Every few weeks, a new AI capability drops — and the internet splits cleanly in two. One half is exhilarated. The other half is alarmed. The exhilarated half thinks the alarmed half is being sentimental. The alarmed half thinks the exhilarated half is being reckless. Neither understands why the other can't see what seems obvious." },
      { type: "paragraph", text: "This isn't a personality difference or an information gap. It's a lens difference. And it maps with almost eerie precision." },
      { type: "heading", text: "The Orange embrace" },
      { type: "paragraph", text: "For the Orange lens, AI is the most exciting development in a generation. Orange sees the world as a field of problems to solve, systems to optimise, efficiencies to unlock. AI is the ultimate leverage tool — it amplifies exactly the kind of strategic, analytical capability that Orange values most." },
      { type: "paragraph", text: "Orange asks: what can this do? How fast can it move? What becomes possible that wasn't possible before? These questions are not shallow. They come from a genuine and historically validated faith in human ingenuity. The technological optimism of Orange has produced medicine, infrastructure, and communication systems that have improved billions of lives. When Orange gets excited about AI, it's because they recognise another chapter in that story." },
      { type: "pullquote", text: "The exhilarated group isn't reckless and the alarmed group isn't sentimental. They're each protecting something real — and what they're protecting is genuinely at stake." },
      { type: "heading", text: "The Green concern" },
      { type: "paragraph", text: "For the Green lens, the same technology triggers a completely different set of questions. Green sees the world through the frame of who gets hurt and whose voice gets erased. AI immediately raises questions about bias, displacement, consent, and concentration of power — and these questions are not distractions from the technology's potential. They are essential to understanding what the technology actually is." },
      { type: "paragraph", text: "Green asks: who built this? Whose data was taken? Who loses their livelihood? Whose creativity gets devalued? Green isn't anti-technology. Green is asking whether the people building the technology have considered anyone other than themselves. Given the actual history of tech development, this is not an unreasonable question." },
      { type: "heading", text: "The Yellow observation" },
      { type: "paragraph", text: "Yellow sees something neither Orange nor Green can see alone: that both are right, and that neither is complete. Orange's drive to build is real and valuable. Green's awareness of who gets harmed is real and valuable. The anxiety split isn't a problem to resolve by picking a side. It's a signal that we're collectively working through a developmental challenge that requires both perspectives — plus a systems view that can hold them together." },
      { type: "paragraph", text: "What Yellow notices is that the AI conversation keeps cycling through the same loop: enthusiasm, backlash, entrenchment, repeat. The cycle won't break as long as each side is only seeing through its own lens. It breaks when enough people can see all three concerns simultaneously: the genuine potential, the genuine risk, and the genuine complexity of managing both." },
      { type: "paragraph", text: "The AI anxiety split isn't about technology at all. It's about what we value — and what we're afraid of losing. Understanding that won't make the anxiety go away. But it will help us stop fighting each other and start building something that actually accounts for all of it." },
    ],
  },

  // ── 3. Why institutions feel broken ────────────────────────────────────
  {
    slug: "why-institutions-feel-broken",
    title: "Why Institutions Feel Broken",
    publishedAt: "2026-02-10T09:00:00Z",
    excerpt: "Across the political spectrum, trust in institutions has collapsed. This isn't a policy failure — it's a developmental crisis.",
    readTimeMins: 9,
    lenses: [LENS_REF.blue, LENS_REF.orange, LENS_REF.green],
    related: ["why-political-conversations-keep-failing", "the-return-of-authority"],
    body: [
      { type: "paragraph", text: "Something strange is happening to institutions. Left and right, young and old, wealthy and struggling — almost everyone agrees that the systems we built to organise collective life are failing. But they agree on almost nothing else. What the failure looks like, what caused it, and what should replace it changes completely depending on who you ask." },
      { type: "paragraph", text: "This isn't because people are cynical. It's because the institutional frameworks we rely on were designed by one set of lenses, are being operated by another, and are being judged by a third." },
      { type: "heading", text: "Blue built the architecture" },
      { type: "paragraph", text: "Most of our institutional infrastructure — legal systems, education, governance, religious bodies, professional standards — was designed through a Blue lens. Blue sees the world as a place that needs order, hierarchy, and moral clarity. Institutions are the physical expression of Blue's deepest value: that there is a right way to do things, and that structures should enforce it." },
      { type: "paragraph", text: "Blue institutions work when the people inside them share the same underlying worldview. They break when that shared worldview dissolves — which is precisely what has happened over the last sixty years as Orange and Green have expanded across the population." },
      { type: "heading", text: "Orange hollowed out the values" },
      { type: "paragraph", text: "Orange didn't destroy institutions. It repurposed them. Where Blue saw moral purpose, Orange saw operational leverage. Schools became credentialing systems. Hospitals became revenue centres. Government agencies became regulatory capture opportunities. Orange kept the institutional shell but replaced the animating spirit with efficiency metrics and growth targets." },
      { type: "pullquote", text: "Blue built institutions as moral architecture. Orange repurposed them as machines. Green declared them oppressive. And now we wonder why trust has collapsed." },
      { type: "paragraph", text: "This wasn't malicious. Orange genuinely believes that optimising outcomes is the highest form of service. But something essential was lost in the translation — the sense that an institution exists for something larger than its own performance metrics." },
      { type: "heading", text: "Green sees the harm" },
      { type: "paragraph", text: "Green arrived and saw what both Blue and Orange had missed: that these institutions, whatever their stated purpose, were causing real harm to real people. The justice system was producing injustice. Education was reproducing inequality. Healthcare was leaving millions behind. Green wasn't wrong about any of this." },
      { type: "paragraph", text: "But Green's response — to critique, deconstruct, and sometimes dismantle — created its own problem. Green is excellent at identifying what's broken and who's being hurt. It is much less equipped to build the replacement. Deconstruction without reconstruction leaves a vacuum." },
      { type: "heading", text: "The developmental crisis" },
      { type: "paragraph", text: "This is the First Tier crisis that Spiral Dynamics describes. Blue, Orange, and Green are all First Tier lenses — they can each see the world clearly through their own frame, but they cannot see the other frames as valid. Blue thinks Orange has no soul and Green has no backbone. Orange thinks Blue is antiquated and Green is impractical. Green thinks Blue is oppressive and Orange is predatory." },
      { type: "paragraph", text: "The institutional crisis is not a problem any single lens can solve, because each lens created part of the problem. Rebuilding institutional trust requires something harder than any of them can do alone: it requires integrating the genuine contribution of each lens while acknowledging the genuine limitation of each one." },
      { type: "paragraph", text: "That's Second Tier work. It doesn't look like going back to Blue order, or forward to Orange efficiency, or sideways to Green critique. It looks like building institutions that can hold all three simultaneously. We don't have many examples of what that looks like yet. But understanding why the current ones are broken is the first step." },
    ],
  },

  // ── 4. The wellness industry paradox ───────────────────────────────────
  {
    slug: "the-wellness-industry-paradox",
    title: "The Wellness Industry Paradox",
    publishedAt: "2026-02-05T09:00:00Z",
    excerpt: "The wellness industry promises Green values — wholeness, community, authenticity — while running on pure Orange mechanics.",
    readTimeMins: 7,
    lenses: [LENS_REF.orange, LENS_REF.green],
    related: ["why-progressive-spaces-collapse", "faith-deconstruction-and-the-developmental-arc"],
    body: [
      { type: "paragraph", text: "Open Instagram. Scroll past three posts. Chances are you'll find a wellness influencer teaching breathwork in a luxury resort, a supplement brand using the language of ancient healing to sell capsules at a 3,000% markup, or a meditation app promising spiritual awakening through a monthly subscription. Something about all of this feels slightly off — even if you can't put your finger on what." },
      { type: "paragraph", text: "The Spiral can put a finger on it precisely: the wellness industry is Green values being packaged and distributed through Orange mechanics. And that contradiction isn't a bug. It's the entire business model." },
      { type: "heading", text: "What Green genuinely offers" },
      { type: "paragraph", text: "The impulse behind wellness culture is real and important. Green sees what Blue and Orange tend to miss: that human beings are whole systems, not just economic actors or moral agents. Bodies matter. Emotions matter. Connection to nature, to community, to something larger than individual achievement — these are genuine human needs that modernity has systematically underserved." },
      { type: "paragraph", text: "When someone does yoga, practices mindfulness, or chooses organic food, they're often responding to a real signal: that the Orange world of optimisation and performance has left them depleted. Green's response — slow down, feel your body, reconnect — is genuinely wise." },
      { type: "pullquote", text: "The moment a spiritual practice gets a price tag and a marketing funnel, something essential about it changes — even if the practice itself is still valid." },
      { type: "heading", text: "What Orange does with it" },
      { type: "paragraph", text: "Orange is extraordinarily good at identifying unmet demand and building systems to meet it at scale. When Orange noticed millions of people craving wholeness, community, and meaning, it did what Orange always does: it built products. Wellness retreats became luxury experiences. Meditation became an app. Community became a membership tier." },
      { type: "paragraph", text: "This isn't cynical. Many of the people building these products genuinely believe in what they're offering. But the delivery mechanism — subscription models, influencer marketing, scarcity-based pricing, personal brand as distribution channel — is pure Orange. And that creates an inherent contradiction: the message is 'you are already whole,' but the business model requires you to feel incomplete enough to keep buying." },
      { type: "heading", text: "The paradox in practice" },
      { type: "paragraph", text: "You see this paradox everywhere. A trauma-healing workshop that costs more than most people earn in a week. An 'authentic community' that requires a credit card. A teacher of non-attachment with a seven-figure personal brand. The words say Green. The structure says Orange. And the people inside it can feel the dissonance even when they can't name it." },
      { type: "paragraph", text: "This matters because it erodes trust in the genuine insights that Green offers. When wellness becomes indistinguishable from marketing, people start to suspect that all of it is marketing — which leaves the real needs that drew them to wellness in the first place completely unmet." },
      { type: "heading", text: "Beyond the paradox" },
      { type: "paragraph", text: "The way through isn't to reject wellness or to reject commerce. It's to become honest about which lens is doing what. Orange delivery systems are not inherently bad — they're how things reach people at scale. Green values are not inherently naive — they're how things stay humane. The problem arises when we pretend one is the other." },
      { type: "paragraph", text: "A wellness offering that is honest about its commercial structure while genuinely serving the wholeness it promises would be something new. It would require Yellow's integrative capacity: the ability to hold both the Orange reality of how things get built and the Green truth of why they matter, without collapsing one into the other." },
    ],
  },

  // ── 5. Faith deconstruction and the developmental arc ──────────────────
  {
    slug: "faith-deconstruction-and-the-developmental-arc",
    title: "Faith Deconstruction and the Developmental Arc",
    publishedAt: "2026-01-30T09:00:00Z",
    excerpt: "Millions of people are leaving organised religion. The spiral suggests this isn't a crisis of faith — it's a developmental transition.",
    readTimeMins: 8,
    lenses: [LENS_REF.blue, LENS_REF.green],
    related: ["why-institutions-feel-broken", "the-return-of-authority"],
    body: [
      { type: "paragraph", text: "If you spend any time in online spaces where people discuss leaving religion, you'll notice a pattern. The stories share a structure: a sincere faith, a growing discomfort, a question that couldn't be answered, and then — often abruptly — the whole framework collapses. The person is left feeling both liberated and homeless." },
      { type: "paragraph", text: "The deconstruction movement has been described as everything from spiritual awakening to moral collapse, depending on who's doing the describing. Spiral Dynamics offers a less dramatic and more useful frame: most faith deconstruction is a Blue-to-Green transition, and it follows a pattern that is as old as the spiral itself." },
      { type: "heading", text: "What Blue provides — and what it costs" },
      { type: "paragraph", text: "Blue lens faith is not naive. It provides something genuine and substantial: a clear moral framework, a sense of belonging to something larger than yourself, a community bonded by shared values, and answers to the hardest existential questions. For many people, Blue faith is the most stable, meaningful structure they have ever experienced." },
      { type: "paragraph", text: "But Blue faith has a boundary condition: it works as long as the authority structure holds. The moment someone begins to see the authority as human rather than divine — as constructed rather than given — Blue's entire architecture starts to shift. This is not a failure of the person's character. It's a developmental threshold." },
      { type: "pullquote", text: "Deconstruction isn't the end of spiritual development. It's the beginning of a transition that Blue can't accommodate but Green can't yet complete." },
      { type: "heading", text: "The Green doorway" },
      { type: "paragraph", text: "Green provides the door out of Blue: it says that every voice matters, that authority should be questioned, that systems that harm should be named, that personal experience is valid even when it contradicts official doctrine. For someone whose Blue framework is cracking, Green's message is like oxygen." },
      { type: "paragraph", text: "This is why deconstruction spaces feel so alive and so necessary to the people in them. They're not just leaving something — they're arriving somewhere. Green gives them permission to trust their own experience, to name the harm they witnessed or suffered, and to stop performing a faith they no longer feel." },
      { type: "heading", text: "The incomplete transition" },
      { type: "paragraph", text: "But Green deconstruction has a gap. Green is excellent at dismantling structures that cause harm. It is much less equipped to build what comes after. Many people who deconstruct find themselves in a spiritual no-man's-land: they can't go back to Blue certainty, but Green hasn't given them a new container for the genuine needs — meaning, transcendence, community — that Blue was meeting." },
      { type: "paragraph", text: "This is why the post-deconstruction landscape is often marked by grief, confusion, and a strange kind of homelessness. The person has outgrown the old house but hasn't found a new one. Green's tools of critique and inclusion are necessary for the transition but insufficient for the rebuild." },
      { type: "heading", text: "What the spiral suggests" },
      { type: "paragraph", text: "Spiral Dynamics doesn't tell people to go back to Blue or to stay in Green. It suggests that the deconstruction journey is a genuine developmental arc — and that there is a further movement available. Yellow and Turquoise can hold what was valuable in Blue (structure, meaning, transcendence) without requiring Blue's authoritarian architecture. They can honour what Green sees (the harm, the exclusion, the need for honesty) without getting stuck in endless critique." },
      { type: "paragraph", text: "If you're in the middle of deconstruction, the spiral says: you're not broken. You're in transit. The disorientation you feel is what every developmental transition feels like from the inside. What you left behind was real. What you're moving toward is also real. And it's bigger than either one." },
    ],
  },

  // ── 6. Why progressive spaces collapse ─────────────────────────────────
  {
    slug: "why-progressive-spaces-collapse",
    title: "Why Progressive Spaces Collapse Into Conflict",
    publishedAt: "2026-01-25T09:00:00Z",
    excerpt: "The communities most committed to inclusion keep tearing themselves apart. The reason is structural, not moral.",
    readTimeMins: 7,
    lenses: [LENS_REF.green],
    related: ["the-wellness-industry-paradox", "the-culture-war-as-a-developmental-problem"],
    body: [
      { type: "paragraph", text: "You've seen this pattern. A progressive organisation, activist community, or social movement that is genuinely committed to justice and inclusion begins to fracture from within. Not because of external opposition, but because the people inside it start turning the tools of critique on each other. Call-outs escalate. Ideological purity becomes the metric. People who share 95% of the same values end up treating each other as enemies over the remaining 5%." },
      { type: "paragraph", text: "This is the Green shadow — and it's one of the most painful dynamics in contemporary culture, precisely because the people caught in it care so much." },
      { type: "heading", text: "The gift and the trap" },
      { type: "paragraph", text: "Green's core gift is the capacity to see who's being harmed by existing structures. This is not a minor insight. Green's critique of power, exclusion, and systemic harm has produced some of the most important moral progress in human history: civil rights, environmental protection, expanded recognition of human dignity." },
      { type: "paragraph", text: "But Green's gift becomes a trap when it turns inward. The same tool that brilliantly identifies harm in external systems can become a weapon when applied to the people closest to you. When every interaction is scanned for power dynamics, every phrase checked for ideological precision, and every person evaluated for their position on a moral hierarchy — the space becomes exhausting and eventually uninhabitable." },
      { type: "pullquote", text: "Green spaces collapse not because the people in them don't care enough, but because they care so much that the tools of critique consume the relationships the community depends on." },
      { type: "heading", text: "Consensus as crisis" },
      { type: "paragraph", text: "Green values consensus — every voice should matter, every perspective should be heard, no one should be silenced. This is a beautiful principle. In practice, it means that decision-making becomes agonisingly slow, because any single objection can stall the group. The people with the most emotional intensity end up holding disproportionate power, not because they're louder but because Green's own ethics prevent the group from overriding strong feelings." },
      { type: "paragraph", text: "Over time, this creates a paradox: the communities most committed to distributing power end up concentrating it in the hands of whoever can most effectively deploy the language of harm. The result looks nothing like the egalitarian ideal that brought the community together." },
      { type: "heading", text: "Why Green can't solve this alone" },
      { type: "paragraph", text: "This is the structural issue. Green's own values prevent it from recognising that its tools have limits. To acknowledge that critique can be overused, that not every power dynamic is oppressive, or that some hierarchy is functional — these feel, from inside Green, like betrayals of the core commitment. The suggestion that 'maybe we're doing too much' sounds like 'maybe we should do less about injustice,' which is intolerable." },
      { type: "paragraph", text: "Yellow offers a way through: the recognition that Green's values are genuine and important, AND that any single lens applied without integration will eventually produce its own pathology. Yellow can hold Green's compassion while also holding the structural clarity that Green needs but can't generate from within its own frame." },
      { type: "paragraph", text: "If you're in a progressive space that's tearing itself apart, the spiral offers this: the problem isn't that people care too much. It's that caring, by itself, isn't enough to build a functional community. Something else is needed — and it's not less compassion. It's more complexity." },
    ],
  },

  // ── 7. The return of authority ─────────────────────────────────────────
  {
    slug: "the-return-of-authority",
    title: "The Return of Authority",
    publishedAt: "2026-01-20T09:00:00Z",
    excerpt: "Across the world, people are reaching for strongmen and clear rules. This isn't regression — it's Blue responding to a genuine crisis.",
    readTimeMins: 8,
    lenses: [LENS_REF.blue, LENS_REF.red],
    related: ["why-political-conversations-keep-failing", "why-institutions-feel-broken"],
    body: [
      { type: "paragraph", text: "The pattern is unmistakable. From elections to cultural movements, millions of people are reaching for authority, structure, and clear moral boundaries. Commentators usually explain this as 'populism' or 'backlash,' which is technically accurate and almost completely uninformative. It doesn't explain why, or what these people are actually responding to." },
      { type: "paragraph", text: "Spiral Dynamics suggests an answer that is less flattering to anyone's political preferences and more useful: the return of authority is Blue's response to a world that has dissolved too much structure too fast." },
      { type: "heading", text: "What dissolved" },
      { type: "paragraph", text: "Over the last several decades, Orange's economic disruptions and Green's cultural critiques have, between them, dismantled many of the structures that Blue depends on. Traditional religious authority has declined. Community institutions have hollowed out. Shared moral narratives have fractured. Gender roles, family structures, professional expectations — all have been questioned, revised, or abandoned." },
      { type: "paragraph", text: "From Orange and Green's perspective, most of this dissolution is progress. Structures that limited people's freedom, enforced conformity, or excluded entire groups needed to be questioned. And they weren't wrong. Many of these structures were unjust." },
      { type: "paragraph", text: "But from Blue's perspective, something much more alarming happened: the moral ground itself shifted. Not one specific rule — all of the rules. Simultaneously. And no one asked." },
      { type: "pullquote", text: "The return of authority is not a rejection of progress. It's a cry for structure from people who feel the ground dissolving under their feet — and that feeling is not imaginary." },
      { type: "heading", text: "Why Blue reaches for strength" },
      { type: "paragraph", text: "When Blue feels the structures it depends on collapsing, it doesn't reach for nuance. It reaches for strength. A leader who says 'I will restore order' speaks directly to Blue's deepest need. It doesn't matter whether the leader can actually deliver. What matters is that someone is naming the problem Blue feels: that things have come apart and someone needs to put them back together." },
      { type: "paragraph", text: "This is why arguments about policy specifics don't land with Blue voters. They're not voting for a policy platform. They're voting for the restoration of a moral architecture that they experienced as stable and that they now experience as rubble." },
      { type: "heading", text: "The Red amplification" },
      { type: "paragraph", text: "Red adds fuel. Where Blue wants order restored, Red wants power exercised. Red is the lens of personal force — I will not be diminished, I will not be controlled, I will dominate my environment. When Blue's institutional structures have failed and Green's consensus processes feel weak, Red's direct approach becomes attractive: forget the systems, find someone strong, and let them act." },
      { type: "paragraph", text: "The volatile combination of Blue's need for moral order and Red's appetite for personal power is the signature political cocktail of the current moment. It's not new — the spiral has seen it before — but it's intensified by the speed at which Orange and Green have changed the landscape." },
      { type: "heading", text: "What understanding offers" },
      { type: "paragraph", text: "Understanding the Blue-Red dynamic doesn't mean endorsing it. It means seeing it clearly enough to respond effectively. Dismissing it as ignorance or regression ensures it will grow, because nothing accelerates Blue's siege mentality faster than being told its concerns don't matter." },
      { type: "paragraph", text: "A more useful response requires something difficult: acknowledging that Blue's need for structure is legitimate while also insisting that the structures we build must be better than the ones we lost. That's not a political position. It's a developmental one." },
    ],
  },

  // ── 8. Generational worldview fracture ─────────────────────────────────
  {
    slug: "generational-worldview-fracture",
    title: "The Generational Worldview Fracture",
    publishedAt: "2026-01-15T09:00:00Z",
    excerpt: "Boomers, Gen X, Millennials, Gen Z — each generation isn't just different in taste. They're operating from different positions on the spiral.",
    readTimeMins: 8,
    lenses: [LENS_REF.blue, LENS_REF.orange, LENS_REF.green, LENS_REF.yellow],
    related: ["why-political-conversations-keep-failing", "the-culture-war-as-a-developmental-problem"],
    body: [
      { type: "paragraph", text: "Every generation thinks the one after it has lost the plot. This is not new. What is new is the speed at which the developmental conditions are changing. The life conditions that shape which lens becomes dominant — economic stability, institutional trust, information environment, exposure to diversity — have shifted more dramatically in the last fifty years than in the previous five hundred." },
      { type: "paragraph", text: "The result is not a 'generation gap.' It's a generational worldview fracture — multiple developmental positions co-existing in the same family, workplace, and political system, with very little shared language between them." },
      { type: "heading", text: "A rough developmental map" },
      { type: "paragraph", text: "This is a generalisation, and generalisations always lose individuals. But the broad strokes are instructive. Many Boomers formed their worldview in the stability of Blue institutions and the optimism of early Orange — a world where rules made sense and hard work reliably led somewhere. Gen X came of age as those institutions began to hollow out, producing a pragmatic, slightly cynical Orange independence: trust systems less, trust yourself more." },
      { type: "paragraph", text: "Millennials grew up as Green's cultural revolution went mainstream: inclusion, sensitivity, the questioning of every inherited structure. Gen Z arrived in a world where Green's critique is ambient and Orange's promises of meritocratic reward feel hollow, creating a generation that is often navigating Green's values without Green's optimism." },
      { type: "pullquote", text: "When a Boomer says 'work hard and you'll be fine,' they're speaking from a world that made that true. When a Gen Z person rolls their eyes, they're living in a world that made it false. Neither is lying." },
      { type: "heading", text: "Why the conversation breaks" },
      { type: "paragraph", text: "A Boomer parent and a Gen Z child are not just 'different generations.' They may be operating from lenses that are two or three developmental positions apart. Blue's certainty and Green's critique are not close neighbours on the spiral — they are separated by the entirety of the Orange achievement arc. The parent and child are not disagreeing about a topic. They are operating different meaning-making systems." },
      { type: "paragraph", text: "This is why generational arguments feel so uniquely frustrating. It's not that one side is right and the other wrong. It's that they're processing reality through entirely different frameworks — and each framework is internally coherent within the life conditions that produced it." },
      { type: "heading", text: "What integration looks like" },
      { type: "paragraph", text: "The developmental fracture doesn't heal by picking a generation and declaring them correct. It heals — slowly, and only partially — when individuals begin to see that each generational worldview is a valid response to real conditions. That Blue's structures were genuinely stabilising. That Orange's ambition was genuinely productive. That Green's critique was genuinely necessary. And that none of them, alone, is sufficient." },
      { type: "paragraph", text: "The family dinner table is, in this sense, a microcosm of the whole spiral. If you can learn to hear what each generation is actually protecting — not what they're arguing about — you're doing Second Tier work without needing the vocabulary. And that's where change begins." },
    ],
  },

  // ── 9. The culture war as a developmental problem ──────────────────────
  {
    slug: "the-culture-war-as-a-developmental-problem",
    title: "The Culture War as a Developmental Problem",
    publishedAt: "2026-01-10T09:00:00Z",
    excerpt: "What if the culture war isn't about values at all — but about what happens when an entire society outgrows its framework at different speeds?",
    readTimeMins: 9,
    lenses: [LENS_REF.blue, LENS_REF.orange, LENS_REF.green, LENS_REF.yellow],
    related: ["why-political-conversations-keep-failing", "where-the-spiral-says-we-go-from-here"],
    body: [
      { type: "paragraph", text: "The culture war feels like a battle between two sides, each convinced the other is either naive or dangerous. But what if it's not a battle at all? What if it's the sound a society makes when its population is distributed across multiple developmental positions and its public discourse only has room for one?" },
      { type: "paragraph", text: "Spiral Dynamics suggests something both humbling and liberating: the culture war is not a moral crisis. It's a developmental one. And developmental crises don't resolve through victory. They resolve through integration." },
      { type: "heading", text: "The illusion of two sides" },
      { type: "paragraph", text: "The culture war is typically framed as a binary: progressive vs. conservative, left vs. right, tradition vs. change. But zoom in and the binary dissolves. The 'conservative' side contains Blue's moral traditionalism, Orange's economic libertarianism, and Red's power nationalism — three lenses that agree on very little except that they dislike Green. The 'progressive' side contains Green's social justice, Orange's techno-optimism, and scattered Yellow systems thinking — which agree on very little except that they dislike Blue." },
      { type: "paragraph", text: "Each 'side' is actually a coalition of different developmental positions held together by a shared opponent. This is why political coalitions feel so fragile and why electoral victories rarely feel like resolution. You can win an election without resolving the developmental tensions within your own coalition, let alone the ones between coalitions." },
      { type: "pullquote", text: "The culture war is the sound a society makes when its people are developing at different speeds and its institutions can only accommodate one speed at a time." },
      { type: "heading", text: "Why it escalates" },
      { type: "paragraph", text: "Every lens on the First Tier believes it is seeing reality clearly and that lenses below it are outdated and lenses above it are confused or dangerous. This is the defining limitation of First Tier consciousness: you can see through your lens, but you cannot see your lens." },
      { type: "paragraph", text: "This means every First Tier position experiences disagreement as a threat rather than a perspective. Blue doesn't see Green as a different developmental position — it sees Green as a moral failure. Green doesn't see Blue as a valid worldview — it sees Blue as an oppressive structure. Neither can see the other as a coherent response to genuine life conditions, because seeing that would require a vantage point that First Tier doesn't have." },
      { type: "heading", text: "The developmental response" },
      { type: "paragraph", text: "The culture war will not be won. It can only be outgrown — and 'outgrown' doesn't mean leaving Blue or Green behind. It means arriving at a position from which both can be seen, valued, and integrated." },
      { type: "paragraph", text: "This is Yellow's contribution. Not a political position, but a meta-position: the recognition that every lens on the spiral emerged in response to real human needs, that every lens carries genuine wisdom, and that every lens has predictable blind spots. From Yellow, the culture war stops being a battle and starts being a puzzle — a genuinely difficult puzzle about how to build social structures that honour multiple valid developmental positions simultaneously." },
      { type: "paragraph", text: "That puzzle won't be solved on social media. It probably won't be solved in electoral politics. It will be solved — if it's solved — in the small, patient spaces where people learn to see through more than one lens at a time. Which is what you're doing right now." },
    ],
  },

  // ── 10. Where the spiral says we go from here ──────────────────────────
  {
    slug: "where-the-spiral-says-we-go-from-here",
    title: "Where the Spiral Says We Go From Here",
    publishedAt: "2026-01-05T09:00:00Z",
    excerpt: "The spiral doesn't predict the future. But it does describe the conditions under which something new becomes possible.",
    readTimeMins: 9,
    lenses: [LENS_REF.yellow, LENS_REF.turquoise],
    related: ["the-culture-war-as-a-developmental-problem", "the-ai-anxiety-split"],
    body: [
      { type: "paragraph", text: "If you've read the other pieces in this series, you might feel a particular kind of exhaustion. Not the exhaustion of disagreement, but the exhaustion of seeing how many valid perspectives exist and how far apart they are. If so, you're feeling something real. You're feeling the developmental challenge of this moment." },
      { type: "paragraph", text: "The spiral doesn't promise a happy ending. It describes a pattern: that when the complexity of life conditions exceeds the capacity of the current dominant lens, pressure builds for a new lens to emerge. We are in one of those pressure periods now." },
      { type: "heading", text: "What's pushing" },
      { type: "paragraph", text: "The life conditions of the early 21st century are unlike anything the spiral has encountered before. Global interdependence at a scale that makes national boundaries semi-fictional. Information environments that expose every person to every other lens simultaneously. Ecological challenges that cannot be solved by any single nation, ideology, or economic system. Technology that is evolving faster than the institutions designed to govern it." },
      { type: "paragraph", text: "These are not Blue problems or Orange problems or Green problems. They are problems that require the simultaneous integration of all three — plus something new. The spiral calls that something new Yellow and Turquoise. But names matter less than the capacity they describe." },
      { type: "heading", text: "What Yellow sees" },
      { type: "paragraph", text: "Yellow is the first lens that can see all the other lenses without needing to pick one. It recognises that Blue's order, Orange's innovation, and Green's compassion are all genuine and necessary — and that the problems we face require all of them working together rather than competing for dominance." },
      { type: "pullquote", text: "The next step isn't a better ideology. It's the capacity to hold multiple valid perspectives simultaneously — and to build systems that can do the same." },
      { type: "paragraph", text: "Yellow doesn't replace the earlier lenses. It includes them. A Yellow leader can enforce structure (Blue), drive results (Orange), and centre human wellbeing (Green) — not by cycling between them but by holding all three as aspects of a single, complex reality. This is qualitatively different from what any First Tier lens can do." },
      { type: "heading", text: "What Turquoise intuits" },
      { type: "paragraph", text: "Turquoise goes further still: it sees the entire spiral as a living system. Not a hierarchy to climb, but an ecology to participate in. Where Yellow analyses and integrates, Turquoise feels and flows. It holds the paradox that everything is connected and that nothing can be fully grasped by the mind alone." },
      { type: "paragraph", text: "Turquoise is rare. It is not a destination. It is a horizon — a reminder that the developmental journey doesn't end and that the capacity for seeing is always expanding." },
      { type: "heading", text: "What this means in practice" },
      { type: "paragraph", text: "The spiral doesn't tell us what will happen. It tells us what becomes possible when enough people can hold enough complexity. It tells us that the culture war is not the end of the story. It tells us that the feeling of being stuck between worldviews is not a personal failure — it's a developmental threshold." },
      { type: "paragraph", text: "And it tells us something that is perhaps the most useful thing of all: that understanding comes before integration. You don't have to be Yellow to benefit from seeing the spiral. You just have to be willing to see the lens you're looking through, not just the world you see through it." },
      { type: "paragraph", text: "That's a beginning. And beginnings are what the spiral is made of." },
    ],
  },
];

// ── Public API ──────────────────────────────────────────────────────────────

export function getSeedArticles({
  lens,
  limit = 10,
}: {
  lens?: LensSlug;
  limit?: number;
} = {}): SeedArticle[] {
  let articles = SEED_ARTICLES;
  if (lens) {
    articles = articles.filter((a) =>
      a.lenses.some((l) => l.slug === lens)
    );
  }
  return articles.slice(0, limit);
}

export function getSeedArticle(slug: string): SeedArticle | undefined {
  return SEED_ARTICLES.find((a) => a.slug === slug);
}
