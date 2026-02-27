// ─────────────────────────────────────────────────────────────────────────────
// Lens Seed Data — Development fallback for lens profiles
//
// Mirrors the Sanity lens schema exactly. Used when:
//   - Sanity hasn't been seeded yet (dev workflow)
//   - Sanity fetch fails (resilience)
//
// This is the FULL lens library content for all 8 lenses. In production,
// Sanity is the source of truth and this file is unused.
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug } from "@loupe/types";

export interface LensProfile {
  slug: LensSlug;
  order: number;
  colourHex: string;
  displayName: string;
  tagline: string;
  group: "me" | "we" | "everybody";
  inwardOutward: "inward" | "outward" | "integrating";
  fromTheInside: string;
  valuesAndWhy: string;
  healthyExpression: string;
  shadowExpression: string;
  inTheWild: Array<{ title: string; body: string }>;
  howToConnect: string;
  depthLayer: string;
  metaDescription: string;
}

export const SEED_LENSES: LensProfile[] = [
  // ── 1. BEIGE ─────────────────────────────────────────────────────────────
  {
    slug: "beige",
    order: 1,
    colourHex: "#C4A882",
    displayName: "Beige",
    tagline: "The ground beneath everything else.",
    group: "me",
    inwardOutward: "inward",
    fromTheInside:
      "I am tuned to what is immediate. The room temperature, the tightness in my chest, whether the floor feels solid. Before I can think about anything else, my body needs to know it is safe. When that safety is present I can move freely. When it is absent I become very still or very fast \u2014 whichever keeps me intact.\n\nI don\u2019t theorise about survival; I live it at the nerve-ending level. Hunger, sleep, warmth, belonging to a physical place. These are not low-order concerns to me \u2014 they are the entire operating system. Everything more complex is built on top of whether these basics are met.\n\nI notice what others miss: a shift in the air, an animal\u2019s body language, who in the room is tense. My intelligence lives in my senses and my instincts. I trust what my body knows before I trust what anyone tells me.\n\nWhen the world becomes too loud or too fast, I return to the simplest version of what works. I strip away. I go quiet. I find ground.",
    valuesAndWhy:
      "Physical safety. Enough food, warmth, and rest. Sensory awareness over abstraction. Presence in the body. Immediacy. The wisdom of instinct. These are not primitive impulses \u2014 they are the root system that every other value grows from.",
    healthyExpression:
      "A person in healthy Beige expression has extraordinary sensory intelligence. They notice micro-shifts in environments and people that others overlook entirely. They are grounded, physically present, and calm in emergencies because their nervous system is attuned to real signals rather than imagined ones.\n\nYou see healthy Beige in the wilderness guide who reads weather from cloud texture, in the trauma therapist who understands that safety must be felt in the body before words can help, in anyone who knows that the first step in any crisis is to breathe.",
    shadowExpression:
      "When Beige contracts, everything becomes threat. The nervous system locks into fight-or-flight and stays there. Trust dissolves. The world shrinks to a perimeter around the body and nothing outside that perimeter matters.\n\nIn shadow, Beige can appear as hoarding, hyper-vigilance, or collapse. The person may withdraw from relationships because connection feels like exposure. They may reject help because dependence feels dangerous. The tragedy of shadow Beige is that the survival intelligence that should protect becomes the thing that isolates.",
    inTheWild: [
      {
        title: "Emergency first responders",
        body: "Paramedics in the first sixty seconds of arriving at a scene are operating from pure Beige intelligence \u2014 reading vital signs, managing physical safety, prioritising the body above all else.",
      },
      {
        title: "Newborn care",
        body: "A parent learning to read a baby\u2019s cries \u2014 hungry, tired, cold, pain \u2014 is operating in the Beige register. The entire world reduces to this small body\u2019s needs.",
      },
      {
        title: "Wilderness survival",
        body: "Anyone who has been genuinely lost in nature knows the moment when theory drops away and instinct takes over. What matters is water, warmth, and shelter. Nothing else exists.",
      },
      {
        title: "Post-disaster communities",
        body: "In the immediate aftermath of earthquakes or hurricanes, communities self-organise around Beige priorities: who needs medical help, where is clean water, which buildings are safe to shelter in.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Beige, start with the body. Don\u2019t begin with ideas \u2014 begin with physical comfort. Is the temperature okay? Is there food? Is the space safe? Match their pace. Speak simply and calmly. Don\u2019t flood them with options. Reduce the world to manageable size. Show through action, not words, that you are not a threat. Trust is built through repeated, predictable physical safety.",
    depthLayer:
      "In Clare Graves\u2019 original research, Beige represents the A-N existential level \u2014 the automatic, survival-based system from which all subsequent complexity emerges. Beck and Cowan colour-coded it Beige to evoke earth, sand, and the prehistoric landscape.\n\nBeige is not a \"stage to get past.\" It is the ever-present foundation. Under sufficient stress, any person returns to Beige processing. Understanding this is clinically crucial: trauma responses, addiction, and extreme poverty all involve the Beige system becoming dominant.\n\nIn Wilber\u2019s integral framework, Beige maps approximately to the archaic level. It is pre-egoic \u2014 the self has not yet differentiated from the environment.",
    metaDescription:
      "Explore the Beige lens in Spiral Dynamics \u2014 the survival instinct, sensory intelligence, and the ground beneath everything else.",
  },

  // ── 2. PURPLE ────────────────────────────────────────────────────────────
  {
    slug: "purple",
    order: 2,
    colourHex: "#6B4E9B",
    displayName: "Purple",
    tagline: "We belong to each other and to the land.",
    group: "me",
    inwardOutward: "outward",
    fromTheInside:
      "I live inside a web of belonging. My family, my community, the ancestors who came before, the land that holds us \u2014 these are not abstract concepts to me. They are the living fabric of who I am. I do not experience myself as a separate individual first. I experience myself as part of something.\n\nRituals matter to me. The way we mark a birthday, a season, a loss \u2014 these patterns hold the group together. They say: you are not alone, you have never been alone, and what came before you has meaning.\n\nI trust what has been proven over time more than what is new. Elders carry wisdom in their stories. Tradition is not stagnation \u2014 it is a living thread connecting past to present to future.\n\nWhen I am at my best, I create warmth that makes people feel they have come home. When I am frightened, I draw the circle tight and guard against anything unfamiliar.",
    valuesAndWhy:
      "Belonging. Kinship. Ritual and tradition. Ancestral wisdom. The sacredness of place. Loyalty to the group. Rhythms and cycles. These are not naive sentimentality \u2014 they are the social intelligence that has kept human communities intact for millennia.",
    healthyExpression:
      "Healthy Purple creates the warmth of genuine belonging. It builds cultures where people feel held \u2014 family traditions, team rituals, community celebrations. A workplace with healthy Purple expression has onboarding rituals that make new people feel welcome, not just informed.\n\nYou see it in the grandmother who holds the family story, the coach whose pre-game ritual settles a nervous team, the neighbourhood that still gathers on the solstice. Healthy Purple understands that humans need to belong before they can grow.",
    shadowExpression:
      "When Purple contracts, belonging becomes tribalism. The circle that once held people in begins to keep people out. \"Us\" requires a \"them.\" Superstition replaces wisdom. Fear of outsiders replaces curiosity.\n\nIn shadow, Purple can manifest as groupthink, cult dynamics, or the kind of family loyalty that covers for harm. Questioning the group feels like betrayal. Leaving feels like death. The warmth that should nurture becomes the pressure that suffocates.",
    inTheWild: [
      {
        title: "Family holiday traditions",
        body: "The specific way your family celebrates a holiday \u2014 the dishes, the seating, the songs \u2014 is Purple intelligence maintaining belonging across generations.",
      },
      {
        title: "Sports fan culture",
        body: "Jersey-wearing, chant-singing, ritual-following fandom is Purple in modern dress. The team becomes the tribe. The stadium becomes sacred ground.",
      },
      {
        title: "Indigenous land stewardship",
        body: "Cultures that maintain deep reciprocal relationships with specific landscapes are expressing Purple\u2019s understanding that belonging extends beyond the human community.",
      },
      {
        title: "Company culture rituals",
        body: "The all-hands meeting format, the Slack emoji reactions, the way birthdays are celebrated \u2014 these are a company\u2019s Purple layer, often invisible until someone breaks the pattern.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Purple, honour what they belong to. Ask about their family, their traditions, their community. Don\u2019t rush to challenge their loyalties \u2014 those loyalties are load-bearing. Share your own belonging stories. Participate in their rituals sincerely. Build trust through repeated presence, not impressive credentials. Remember: for Purple, relationship comes before information.",
    depthLayer:
      "Graves designated this the B-O level \u2014 the tribalistic-animistic system where safety is found through group membership and where the mysterious forces of the world are managed through ritual and tradition.\n\nPurple represents the first major leap from individual survival to collective consciousness. It is the lens through which human societies first organised beyond the family unit.\n\nIn integral theory, this approximates the magic-animistic level. It is pre-conventional \u2014 order is maintained through custom and taboo rather than explicit rules. Modern expressions include all forms of in-group loyalty, brand tribalism, and the deep human need for ritual marking of life transitions.",
    metaDescription:
      "Explore the Purple lens in Spiral Dynamics \u2014 belonging, kinship, ritual, and the sacred bonds that hold communities together.",
  },

  // ── 3. RED ───────────────────────────────────────────────────────────────
  {
    slug: "red",
    order: 3,
    colourHex: "#C0392B",
    displayName: "Red",
    tagline: "I will not be controlled. I will not disappear.",
    group: "me",
    inwardOutward: "inward",
    fromTheInside:
      "I feel things at full volume. Joy, rage, desire, ambition \u2014 none of them arrive quietly. I don\u2019t want to manage my intensity; I want to use it. The world responds to force, to confidence, to someone who is willing to act while others hesitate.\n\nI refuse to be invisible. I have been told to sit down, be quiet, wait my turn, and every time I hear that, something in me burns hotter. I am not reckless \u2014 I am alive. I take what I need because nobody is coming to hand it to me.\n\nRespect matters more to me than almost anything. Not the polite kind \u2014 the kind you earn by being someone who cannot be ignored. I know who I am, and I will not bend that knowledge to make others comfortable.\n\nWhen I am at my best, I am the spark that starts things, the courage that breaks through, the voice that says what everyone is thinking. When I am at my worst, I burn what I love because I cannot tolerate feeling powerless.",
    valuesAndWhy:
      "Personal power. Respect. Courage. Immediacy. Dominance over circumstances. Self-expression without apology. The right to exist at full intensity. These are not toxic impulses \u2014 they are the engine of individuation, the force that breaks a person free from any system that would diminish them.",
    healthyExpression:
      "Healthy Red is extraordinary to witness. It is the entrepreneur who starts the company everyone said was impossible. The activist who stands in front of the bulldozer. The teenager who finally says no to a controlling parent. The artist who makes unapologetic, visceral work.\n\nHealthy Red has boundaries like a force field. It protects the vulnerable because it refuses to watch powerlessness in others. It is generous with its strength once it knows its strength is not threatened.",
    shadowExpression:
      "When Red contracts, power becomes domination. The intensity that should fuel creation turns to destruction. Relationships become transactions: what can you do for me, and what happens if you refuse?\n\nShadow Red bullies because it cannot tolerate vulnerability. It exploits because it cannot imagine being exploited again. It rages because beneath the rage is a wound it will not let anyone see. The tragedy of shadow Red is that the person who most needs connection has made connection feel like weakness.",
    inTheWild: [
      {
        title: "Startup founders",
        body: "The \"move fast and break things\" energy of early-stage startups is Red in business dress \u2014 pure will, personal risk, refusal to accept limitations.",
      },
      {
        title: "Protest movements",
        body: "The initial spark of any protest \u2014 someone refusing to accept what others have normalised \u2014 is Red energy. It breaks the silence before the organisation can form.",
      },
      {
        title: "Competitive athletics",
        body: "Elite athletes channel Red into disciplined intensity. The moment before a race, a match, a fight \u2014 that concentrated power is Red at its most refined.",
      },
      {
        title: "Toddlers",
        body: "The two-year-old who screams \"NO\" is discovering Red for the first time \u2014 the revolutionary realisation that they are a separate self with their own will.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Red, show respect immediately. Don\u2019t lecture, don\u2019t patronise, don\u2019t try to be clever. Be direct. Say what you mean. Acknowledge their strength before you ask them to consider anything else. Never corner them \u2014 Red under pressure escalates. Give them choices, not orders. If you can be genuinely useful to their goals, say so plainly.",
    depthLayer:
      "Graves designated this the C-P level \u2014 the egocentric-exploitative system where the individual first emerges from the group and asserts autonomous power. It corresponds to the \"power gods\" stage in historical terms.\n\nRed is the first truly self-aware lens. The individual discovers \"I exist separately\" and immediately tests the limits of that existence. This is developmentally necessary \u2014 without Red, there is no differentiation from the group.\n\nIn integral theory, Red approximates the power/magic-mythic level. It is pre-conventional in that it has not yet internalised rules, but it has moved beyond Purple\u2019s group-embeddedness. Every healthy adult has access to Red energy; the question is whether it is integrated or repressed.",
    metaDescription:
      "Explore the Red lens in Spiral Dynamics \u2014 personal power, courage, intensity, and the force that refuses to be diminished.",
  },

  // ── 4. BLUE ──────────────────────────────────────────────────────────────
  {
    slug: "blue",
    order: 4,
    colourHex: "#1E3A6E",
    displayName: "Blue",
    tagline: "There is a right way to do this, and it matters.",
    group: "we",
    inwardOutward: "outward",
    fromTheInside:
      "I find deep comfort in knowing there is an order to things. Not a rigid, joyless order \u2014 a meaningful one. Rules that exist because they protect something. Structures that work because generations have refined them. A sense that my life has purpose beyond what I can see.\n\nI am disciplined because discipline is how I participate in something larger than myself. I keep my word because integrity is not optional. I respect authority when authority has been earned through service and wisdom, not just power.\n\nI believe in delayed gratification. The right thing is often the hard thing, and I am willing to do the hard thing. Sacrifice is meaningful to me \u2014 not as suffering, but as contribution. I give up some of what I want so that the whole can function.\n\nWhen I am at my best, I am the backbone \u2014 reliable, principled, steady. When I am frightened, I grip the rules too tightly and forget that the rules were always in service of something alive.",
    valuesAndWhy:
      "Order. Purpose. Duty. Integrity. Sacrifice for the greater good. Respect for authority that has been earned. Discipline as a path to meaning. Right and wrong as real categories, not just opinions. These are not rigid dogma \u2014 they are the architecture that makes civilisation possible.",
    healthyExpression:
      "Healthy Blue is the teacher who holds high standards because they genuinely believe in every student\u2019s potential. The judge who applies the law with fairness, not spite. The parent who provides structure that children can push against safely.\n\nYou see healthy Blue in institutions that actually serve their stated purpose: the hospital that runs like clockwork, the religious community that genuinely cares for its members, the military unit whose discipline saves lives in the field. Healthy Blue creates containers that protect.",
    shadowExpression:
      "When Blue contracts, order becomes control. The rules that should serve life begin to crush it. Deviation is punished not because it causes harm, but because it threatens the structure\u2019s authority.\n\nShadow Blue is the bureaucracy that has forgotten its purpose. The religious institution that polices belief instead of nurturing faith. The parent who demands obedience to rules that no longer make sense. In shadow, Blue produces shame, rigidity, and a guilt that serves no growth \u2014 only compliance.",
    inTheWild: [
      {
        title: "Legal systems",
        body: "The idea that everyone is subject to the same rules, regardless of power or status, is Blue\u2019s defining contribution to civilisation. The courtroom is Blue\u2019s cathedral.",
      },
      {
        title: "Organised religion",
        body: "At its best, religious community provides meaning, moral structure, and a sense of participation in something eternal. The weekly gathering, the shared text, the moral code \u2014 all Blue architecture.",
      },
      {
        title: "Quality assurance",
        body: "The QA engineer who finds the edge case everyone else missed is channelling Blue\u2019s conviction that things should work correctly, not just approximately.",
      },
      {
        title: "Constitutional democracies",
        body: "The peaceful transfer of power after an election is Blue\u2019s finest hour \u2014 the rules are bigger than any individual\u2019s desire to hold power.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Blue, show that you take things seriously. Be punctual. Keep your commitments. Don\u2019t dismiss their sense of right and wrong even if it differs from yours. Acknowledge the value of the structures they maintain. If you want them to consider change, frame it as improvement to the system, not destruction of it. Never mock their principles \u2014 those principles are their identity.",
    depthLayer:
      "Graves designated this the D-Q level \u2014 the absolutistic-saintly system where the individual subordinates themselves to a higher order or purpose. Historically, this corresponds to the great civilisational structures: organised religion, codified law, the nation-state.\n\nBlue represents the first \"we\" lens \u2014 the individual voluntarily limits personal freedom for the sake of collective order. This is a genuine cognitive and moral achievement, not a regression from Red\u2019s individualism.\n\nIn integral theory, Blue maps to the mythic-membership level (conventional morality). The person can take the perspective of the group and hold values that transcend personal benefit. Blue is the backbone of every functioning institution.",
    metaDescription:
      "Explore the Blue lens in Spiral Dynamics \u2014 order, purpose, integrity, and the structures that hold civilisation together.",
  },

  // ── 5. ORANGE ────────────────────────────────────────────────────────────
  {
    slug: "orange",
    order: 5,
    colourHex: "#C4622D",
    displayName: "Orange",
    tagline: "The world is full of leverage if you know where to look.",
    group: "we",
    inwardOutward: "inward",
    fromTheInside:
      "I see opportunity everywhere. Not because I\u2019m reckless, but because I\u2019ve learned to read systems \u2014 to see the gears turning behind the surface of things and to understand which levers actually move outcomes.\n\nI am driven by the question: what works? Not what should work in theory. Not what worked for my parents. What actually produces results, right now, measurably? I test, I iterate, I optimise. Failure doesn\u2019t scare me \u2014 staying stuck does.\n\nI want to excel. Not to dominate others (that\u2019s Red), but to reach my own potential. I believe talent and effort should determine outcomes, not birth or tradition. Give me a fair playing field and I will outwork, outthink, and outlast.\n\nWhen I am at my best, I am the person who makes things happen \u2014 efficiently, strategically, and with a clarity that others find liberating. When I lose my way, I reduce everything to metrics and forget that not everything worth pursuing can be measured.",
    valuesAndWhy:
      "Achievement. Strategy. Measurable progress. Autonomy. Merit. Innovation. Rational inquiry. Efficiency. These are not cold or soulless \u2014 they are the values that built modern medicine, democratic institutions, scientific method, and individual rights.",
    healthyExpression:
      "Healthy Orange is the scientist who follows the evidence wherever it leads, even when it overturns their own hypothesis. The entrepreneur who builds something genuinely useful, not just profitable. The athlete who competes fiercely but shakes hands sincerely.\n\nYou see it in evidence-based medicine, in well-designed products, in the engineer who solves the problem that saves a thousand hours. Healthy Orange lifts everyone by proving what is possible through disciplined effort and clear thinking.",
    shadowExpression:
      "When Orange contracts, success becomes the only measure of a person\u2019s worth. Everything is optimised, including relationships. People become resources. The natural world becomes raw material. Short-term gains override long-term consequences.\n\nShadow Orange produces burnout, environmental destruction, and a hollow feeling that no achievement ever fills. It creates cultures where admitting uncertainty is weakness, where rest is laziness, and where the question \"but is it meaningful?\" gets dismissed as soft.",
    inTheWild: [
      {
        title: "Silicon Valley culture",
        body: "The venture-backed startup ecosystem is Orange distilled: meritocratic ideals, rapid iteration, data-driven decisions, and the belief that the right idea can change everything.",
      },
      {
        title: "Scientific method",
        body: "Hypothesis, experiment, evidence, revision. The entire architecture of modern science is Orange\u2019s gift to humanity \u2014 the insistence that what is true must be testable.",
      },
      {
        title: "Self-improvement culture",
        body: "Morning routines, productivity systems, biohacking, performance coaching. The drive to optimise the self is Orange applied inward.",
      },
      {
        title: "Democratic capitalism",
        body: "The idea that free markets and individual rights, properly regulated, produce the best outcomes for the most people is Orange\u2019s core political thesis.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Orange, bring evidence. Don\u2019t argue from authority or tradition \u2014 argue from results. Respect their time. Be concise. If you want them to value something intangible, frame it in terms of outcomes: \"This approach produces better team retention,\" not \"This feels more human.\" Once trust is established, Orange is surprisingly open to deeper questions \u2014 they just need to arrive there through their own logic.",
    depthLayer:
      "Graves designated this the E-R level \u2014 the multiplistic-achievist system where the individual re-emerges from Blue\u2019s conformity armed with strategic thinking and scientific rationality.\n\nOrange is the engine of modernity. The Enlightenment, the Industrial Revolution, the Scientific Revolution, democratic governance \u2014 all are Orange achievements. It represents the re-assertion of individual agency, but now guided by reason rather than Red\u2019s raw power.\n\nIn integral theory, Orange maps to the rational-achievement level. It is the first post-conventional stage \u2014 the person can critically examine the rules they were taught and ask \"do these actually work?\" This is a genuine cognitive advance with enormous practical consequences.",
    metaDescription:
      "Explore the Orange lens in Spiral Dynamics \u2014 achievement, strategy, innovation, and the drive to discover what actually works.",
  },

  // ── 6. GREEN ─────────────────────────────────────────────────────────────
  {
    slug: "green",
    order: 6,
    colourHex: "#3D7A52",
    displayName: "Green",
    tagline: "Every voice deserves a seat at the table.",
    group: "everybody",
    inwardOutward: "outward",
    fromTheInside:
      "I feel the web of connection between people, and it physically pains me when that web is torn. Inequality, exclusion, environmental destruction \u2014 these are not abstract policy issues to me. I feel them. And I believe that if more people could feel them, the world would be fundamentally different.\n\nI value every person\u2019s perspective because I understand that truth is richer when seen from multiple angles. Consensus matters to me \u2014 not because I can\u2019t make decisions, but because decisions that leave people out are decisions that fail.\n\nI distrust hierarchies that concentrate power. I\u2019ve seen how Orange\u2019s meritocracy can mask privilege, how Blue\u2019s order can enforce injustice. I want a flatter world where the quiet voice matters as much as the loud one.\n\nWhen I am at my best, I create spaces where people can be fully themselves and still belong. When I lose my way, I become so focused on inclusion that I cannot act, and my compassion becomes a form of control.",
    valuesAndWhy:
      "Equality. Empathy. Community. Environmental stewardship. Authenticity. Pluralism. Consensus. Inner life. These are not naive idealism \u2014 they are the recognition that systems designed only for efficiency produce suffering, and that human wellbeing requires being seen, heard, and valued.",
    healthyExpression:
      "Healthy Green is the manager who knows every team member\u2019s name and what matters to them. The facilitator who draws out the quiet voice in the room. The company that measures its impact on communities, not just shareholders.\n\nYou see it in restorative justice programmes, in collaborative leadership models, in environmental movements that connect ecological health to human wellbeing. Healthy Green makes space for complexity without collapsing into paralysis.",
    shadowExpression:
      "When Green contracts, inclusion becomes conformity to Green values. Tolerance extends to everyone except those who disagree. The desire for consensus paralyses decision-making. Feelings become the arbiter of truth.\n\nShadow Green produces virtue signalling, call-out culture, and a particular kind of moral certainty that sees hierarchy in everything and domination in every disagreement. It can infantilise the people it claims to protect and silence the voices it claims to amplify \u2014 if those voices say the wrong things.",
    inTheWild: [
      {
        title: "Social justice movements",
        body: "The broadening of \"who counts\" \u2014 from civil rights to gender equality to disability rights \u2014 is Green\u2019s defining project. Each expansion says: you, too, deserve a seat.",
      },
      {
        title: "B-Corp and stakeholder capitalism",
        body: "Companies that measure their impact on all stakeholders, not just shareholders, are trying to embed Green values into Orange structures.",
      },
      {
        title: "Therapy culture",
        body: "The normalisation of talking about feelings, setting boundaries, and doing inner work is a Green achievement. The idea that emotional health is real health.",
      },
      {
        title: "Community gardens",
        body: "The community garden combines Green\u2019s values perfectly: environmental connection, shared labour, local community, and a rejection of purely transactional food systems.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Green, lead with authenticity. Drop the performance and speak from genuine feeling. Acknowledge the impact of systems on people. Listen without rushing to solve. Ask how they feel, not just what they think. Honour their sensitivity as strength, not weakness. If you need to challenge them, do it from care, not from dismissal. Never reduce their concerns to \"being too emotional.\"",
    depthLayer:
      "Graves designated this the F-S level \u2014 the relativistic-personalistic system where the individual, having achieved Orange\u2019s material success, turns inward to ask \"but am I happy? Are we okay?\"\n\nGreen marks the beginning of the \"everybody\" tier. For the first time, the lens extends beyond the immediate group (Purple), the rule system (Blue), or the competitive arena (Orange) to encompass all people and all of nature.\n\nIn integral theory, Green maps to the pluralistic level. It deconstructs the hidden power dynamics in every system and insists on including marginalised perspectives. This is genuinely important work \u2014 but Green\u2019s limitation is that deconstruction alone cannot rebuild. That task falls to Yellow.",
    metaDescription:
      "Explore the Green lens in Spiral Dynamics \u2014 empathy, equality, community, and the belief that every voice deserves to be heard.",
  },

  // ── 7. YELLOW ────────────────────────────────────────────────────────────
  {
    slug: "yellow",
    order: 7,
    colourHex: "#B89A28",
    displayName: "Yellow",
    tagline: "Everything connects. Let me show you how.",
    group: "everybody",
    inwardOutward: "integrating",
    fromTheInside:
      "I see systems within systems. Not as an intellectual exercise, but as the way reality actually works \u2014 layers of complexity that interpenetrate, each valid at its own level, each incomplete without the others.\n\nI can hold contradictions without needing to resolve them. I understand why Blue needs order and why Green needs to question it. I see why Red\u2019s power is necessary and why it must be contained. None of these are wrong \u2014 they are partial, and the partiality is the point.\n\nI value competence wherever I find it. Not credentials, not status, not moral purity \u2014 competence. I want the person who actually knows how to fix the problem in the room, regardless of their ideology or their title.\n\nWhen I am at my best, I am the integrator \u2014 the person who sees across boundaries and builds bridges between worldviews that believe they are enemies. When I lose my way, I become detached, arrogant in my bird\u2019s-eye view, and dismissive of the very real pain that each lens carries.",
    valuesAndWhy:
      "Systems thinking. Integration without erasure. Functionality. Flexibility. Natural hierarchies of competence. The ability to use any tool without being owned by it. Curiosity about how things actually work, not how they should work. These represent a genuine expansion of cognitive complexity \u2014 the capacity to think about thinking itself.",
    healthyExpression:
      "Healthy Yellow is the consultant who walks into a dysfunctional organisation and sees simultaneously what each faction is protecting and what the system actually needs. The mediator who helps two sides see that they are solving different problems, not the same one.\n\nYou see it in effective systems designers, in writers who illuminate rather than argue, in leaders who match their style to what each situation actually requires rather than applying one approach to everything.",
    shadowExpression:
      "When Yellow contracts, integration becomes detachment. The bird\u2019s-eye view becomes a way to avoid the messy, emotional, ground-level reality of being human. Intellectual understanding substitutes for genuine relationship.\n\nShadow Yellow produces brilliant analysts who cannot connect. It creates a subtle superiority \u2014 \"I see what you can\u2019t see\" \u2014 that is all the more dangerous because it often happens to be true. The warmth that Yellow needs to learn often comes from the very lenses (Purple, Green) that Yellow is tempted to view as \"less complex.\"",
    inTheWild: [
      {
        title: "Systems design",
        body: "The architect who designs a building that works for the disabled visitor, the busy parent, and the elderly resident simultaneously is thinking in Yellow \u2014 holding multiple need-sets without collapsing them.",
      },
      {
        title: "Effective philanthropy",
        body: "The move from \"give money to feel good\" (Green) to \"study what actually produces outcomes and fund that\" (Yellow) represents the integration of Green\u2019s compassion with Orange\u2019s rigour.",
      },
      {
        title: "Integral medicine",
        body: "Practitioners who combine evidence-based medicine with awareness of the patient\u2019s psychological, social, and spiritual context are operating from a Yellow integration.",
      },
      {
        title: "Constitutional design",
        body: "The framers of well-designed constitutions are doing Yellow work: creating systems that balance power, protect minorities, and adapt to conditions the designers cannot foresee.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Yellow, bring your best thinking. Don\u2019t oversimplify. Show that you understand complexity. But also be real \u2014 Yellow respects authenticity and quickly spots performance. Ask questions that reveal systems, not questions that demand allegiance. If you disagree, explain the perspective you\u2019re holding and ask what they see from theirs. Yellow craves genuine intellectual partnership.",
    depthLayer:
      "Graves designated this the G-T level \u2014 the systemic-integrative system and the first of the \"second tier.\" The fundamental shift at Yellow is that the person can now see all previous levels as valid systems rather than as stages to transcend.\n\nThis is Graves\u2019 most significant theoretical contribution: the leap from first tier (where each level thinks it has the right answer) to second tier (where the person can operate flexibly across all levels). Beck and Cowan called this the \"momentous leap.\"\n\nIn Wilber\u2019s framework, Yellow maps to the integral or vision-logic level. It is the first structure that can genuinely integrate rather than merely include or transcend. Yellow\u2019s challenge is to remain embodied and compassionate while holding this expanded cognitive capacity.",
    metaDescription:
      "Explore the Yellow lens in Spiral Dynamics \u2014 systems thinking, integration, and the capacity to see how everything connects.",
  },

  // ── 8. TURQUOISE ─────────────────────────────────────────────────────────
  {
    slug: "turquoise",
    order: 8,
    colourHex: "#1A6B7A",
    displayName: "Turquoise",
    tagline: "The river does not push. It finds the way.",
    group: "everybody",
    inwardOutward: "integrating",
    fromTheInside:
      "I experience the world as a single living process. Not metaphorically \u2014 literally. The boundary between myself and the ecosystem, between my thoughts and the field of awareness they arise in, between the personal and the planetary \u2014 these distinctions are useful but not ultimately real.\n\nI do not need to fix everything. I have learned that some problems are not problems but rather tensions that hold systems in creative balance. My task is often to be present with what is, rather than to push for what should be.\n\nI hold paradox easily. Life contains death. Order contains chaos. The individual is the collective. These are not contradictions to be resolved but complementarities to be inhabited.\n\nWhen I am at my best, I bring a quality of presence that allows others to relax into their own depth. When I lose my way, I dissolve into abstraction and lose my capacity to act in the concrete, imperfect, here-and-now world.",
    valuesAndWhy:
      "Holism. Presence. The interpenetration of all things. Ecological intelligence. Surrender to processes larger than the self. Intuitive knowing alongside rational understanding. Compassion that does not need a reason. These are not spiritual escapism \u2014 they are what arises naturally when the mind becomes quiet enough to perceive the whole.",
    healthyExpression:
      "Healthy Turquoise is rare and quiet. You see it in the leader who makes the room settle just by entering it. The ecologist who perceives the forest as a single organism. The elder who has stopped performing wisdom and simply embodies it.\n\nHealthy Turquoise integrates all previous lenses without rejecting any. It has Beige\u2019s sensory awareness, Purple\u2019s belonging, Red\u2019s aliveness, Blue\u2019s integrity, Orange\u2019s clarity, Green\u2019s compassion, and Yellow\u2019s systems intelligence \u2014 held without effort.",
    shadowExpression:
      "When Turquoise contracts, holism becomes dissociation. \"Everything is connected\" becomes an excuse to avoid the specific, the local, the personal. Presence becomes passivity. Equanimity becomes indifference.\n\nShadow Turquoise can produce a spiritual bypassing that is all the more convincing because it comes wrapped in genuine insight. The person may have touched something real and then used that touch to avoid the unglamorous work of being human \u2014 paying taxes, showing up for difficult conversations, cleaning the kitchen.",
    inTheWild: [
      {
        title: "Deep ecology",
        body: "The recognition that humans are not separate from nature but expressions of it \u2014 that the health of the biosphere is not an environmental issue but an existential one \u2014 is Turquoise perception.",
      },
      {
        title: "Contemplative traditions",
        body: "The mature expressions of meditation, prayer, and contemplative practice across all traditions point toward Turquoise awareness: the direct experience of interconnection.",
      },
      {
        title: "Complex systems science",
        body: "The study of emergence, self-organisation, and adaptive systems is the scientific face of Turquoise \u2014 the recognition that wholes are not reducible to parts.",
      },
      {
        title: "Hospice and end-of-life care",
        body: "The capacity to be fully present with someone who is dying, without trying to fix or flee, requires a Turquoise quality of acceptance and wholeness.",
      },
    ],
    howToConnect:
      "To connect with someone operating from Turquoise, slow down. Way down. Don\u2019t fill silence. Don\u2019t perform insight. Be present. If you have a genuine question, ask it simply. If you have nothing to say, say nothing. Turquoise responds to the quality of your presence more than the content of your words. Be real. Be quiet. Be here.",
    depthLayer:
      "Graves designated this the H-U level \u2014 the holistic-global system. Research data at this level was limited in Graves\u2019 lifetime, and he acknowledged that our understanding of it remains incomplete.\n\nTurquoise represents the integration of Yellow\u2019s cognitive complexity with a felt, embodied sense of wholeness that Yellow tends to hold only intellectually. Where Yellow sees systems, Turquoise experiences them.\n\nIn Wilber\u2019s framework, Turquoise maps to the early transpersonal levels. It is the first structure where the self-sense genuinely extends beyond the individual organism. This is not a regression to Purple\u2019s pre-individual fusion, but a post-individual integration that includes and transcends the personal self.\n\nA caution: Turquoise is frequently romanticised. In reality, it includes all the mundane challenges of being human. A person at Turquoise still has bad days, still loses their keys, and still needs to do the dishes.",
    metaDescription:
      "Explore the Turquoise lens in Spiral Dynamics \u2014 holism, presence, and the direct experience that everything is connected.",
  },
];

// Group introduction texts for Me / We / Everybody sections
export const GROUP_INTROS: Record<
  "me" | "we" | "everybody",
  { title: string; description: string }
> = {
  me: {
    title: "Me",
    description:
      "Survival, belonging, and power. The first three lenses trace the arc of the individual discovering itself \u2014 from raw instinct through tribal membership to personal will.",
  },
  we: {
    title: "We",
    description:
      "Order and achievement. These lenses build the structures that allow individuals to cooperate at scale \u2014 first through shared rules, then through strategic competition.",
  },
  everybody: {
    title: "Everybody",
    description:
      "Pluralism, integration, and holism. The final lenses extend the circle of concern beyond any single group to include all people, all of nature, and eventually all of reality.",
  },
};

/**
 * Get a single lens profile from seed data.
 */
export function getSeedLens(slug: string): LensProfile | undefined {
  return SEED_LENSES.find((l) => l.slug === slug);
}

/**
 * Get all seed lenses in spiral order.
 */
export function getAllSeedLenses(): LensProfile[] {
  return SEED_LENSES;
}
