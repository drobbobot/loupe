// ─────────────────────────────────────────────────────────────────────────────
// Relationship Seed Data — Development fallback for relationship guides
//
// Mirrors the Sanity relationshipGuide schema. Used when:
//   - Sanity hasn't been seeded yet (dev workflow)
//   - Sanity fetch fails (resilience)
//
// Priority pairs (full authored quality):
//   Blue/Orange, Orange/Green, Blue/Green, Red/Blue,
//   Orange/Orange, Green/Green, Blue/Blue, Purple/Blue
//
// All other combinations use a template generator based on lens properties.
// ─────────────────────────────────────────────────────────────────────────────

import { LENS_COLORS, type LensSlug } from "@loupe/types";
import { getSeedLens, type LensProfile } from "./lens-data";

export interface RelationshipSeed {
  quality: "full" | "template";
  lensA: LensSlug;
  lensB: LensSlug;
  dynamicSummary: string;
  lensANeeds: string;
  lensBNeeds: string;
  frictionPoints: string;
  genuineConnection: string;
  scenarioClose: string;
  scenarioWork: string;
  scenarioCivic: string;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Canonical pair key — always alphabetical */
function pairKey(a: LensSlug, b: LensSlug): string {
  return [a, b].sort().join("-");
}

const LENS_DISPLAY: Record<LensSlug, string> = {
  beige: "Beige", purple: "Purple", red: "Red", blue: "Blue",
  orange: "Orange", green: "Green", yellow: "Yellow", turquoise: "Turquoise",
};

// ── Priority Pair Content ───────────────────────────────────────────────────

const PRIORITY_PAIRS: Record<string, RelationshipSeed> = {
  "blue-orange": {
    quality: "full",
    lensA: "blue",
    lensB: "orange",
    dynamicSummary:
      "This is one of the most common relationship dynamics in modern life. Blue brings structure, reliability, and a deep commitment to doing things correctly. Orange brings innovation, efficiency, and a relentless drive toward results. At their best, they build things that are both principled and effective. At their worst, Blue sees Orange as unprincipled and reckless, while Orange sees Blue as rigid and obstructive.",
    lensANeeds:
      "Blue needs Orange to recognise that discipline and process have real value — they aren't bureaucratic obstacles but the scaffolding that makes lasting success possible. Blue needs to feel that the rules matter, not as arbitrary constraints, but as accumulated wisdom that protects what Orange might overlook in the rush toward results.",
    lensBNeeds:
      "Orange needs Blue to make room for experimentation and iteration. Not every departure from standard practice is a betrayal of principle. Orange needs Blue to see that updating the rules based on evidence is not disloyalty to the system — it is the system working correctly.",
    frictionPoints:
      "The predictable breakdown happens when Blue interprets Orange's drive to optimise as a disregard for what matters, and Orange interprets Blue's adherence to process as a fear of progress. Blue feels disrespected when Orange shortcuts the agreed procedure. Orange feels suffocated when Blue insists on compliance over outcomes. Neither is acting in bad faith — they are operating from genuinely different definitions of 'the right thing to do.'",
    genuineConnection:
      "The relationship becomes powerful when both see what they cannot do alone. Blue's structure gives Orange's innovation a container — without it, Orange burns out chasing every opportunity. Orange's results-orientation gives Blue's principles a proving ground — without it, Blue's rules calcify into irrelevance. Together they build institutions that actually work: principled enough to be trustworthy, adaptive enough to survive.",
    scenarioClose:
      "In a close relationship, this dynamic often surfaces around planning vs. spontaneity. Blue wants the holiday organised in advance; Orange wants to optimise based on conditions. The key is recognising that Blue's planning creates safety, and Orange's flexibility creates discovery — and a good trip needs both.",
    scenarioWork:
      "At work, Blue often holds the compliance, quality assurance, or operations role while Orange drives strategy and growth. Friction peaks when Orange pushes a launch before Blue has signed off, or when Blue's review process stalls Orange's timeline. The resolution is shared ownership of both quality and speed.",
    scenarioCivic:
      "In civic life, this plays out as tradition-based governance versus data-driven policy. Blue wants to honour the institutions; Orange wants to reform them. The healthiest communities find a way to do both — changing what isn't working while preserving what holds people together.",
  },

  "green-orange": {
    quality: "full",
    lensA: "green",
    lensB: "orange",
    dynamicSummary:
      "Green and Orange share an intensity but aim it in opposite directions. Orange asks 'does it work?' Green asks 'is it fair?' Orange measures success in results; Green measures it in how people feel. This creates a dynamic tension that, when held well, produces outcomes that are both effective and humane.",
    lensANeeds:
      "Green needs Orange to slow down long enough to consider impact — not as a performance metric but as a genuine question about who benefits and who is harmed. Green needs to feel that the people in the system matter as much as the system's output.",
    lensBNeeds:
      "Orange needs Green to distinguish between genuine harm and discomfort with competition. Not every hierarchy is oppression; not every measurement is dehumanising. Orange needs Green to bring solutions, not only critiques — and to recognise that efficiency and care are not opposites.",
    frictionPoints:
      "The breakdown is almost always about pace and metrics. Orange wants to move fast and measure everything. Green wants to slow down and listen to everyone. Orange sees Green's consensus process as indecisive. Green sees Orange's efficiency as callous. The deeper issue is that each feels the other is dismissing what matters most.",
    genuineConnection:
      "When these two lenses genuinely meet, they create something neither can build alone: organisations that achieve extraordinary results while treating people with real dignity. Green humanises Orange's systems. Orange operationalises Green's ideals. The B-Corp movement, stakeholder capitalism, and human-centred design all live in this intersection.",
    scenarioClose:
      "In close relationships, this often surfaces as a conflict between achievement and presence. The Orange partner is always optimising — the schedule, the finances, the fitness routine. The Green partner wants to just be together, without a goal. The bridge is recognising that Orange's planning is a form of care, and Green's presence is a form of wealth.",
    scenarioWork:
      "At work, this is the growth team versus the culture team. Orange pushes for targets; Green pushes for wellbeing. The most effective organisations give both voices structural power rather than letting one always override the other.",
    scenarioCivic:
      "In civic life, this plays out in debates about economic growth versus social welfare. Both are legitimate needs. The best policy holds both — and this pair, working together, is uniquely equipped to design it.",
  },

  "blue-green": {
    quality: "full",
    lensA: "blue",
    lensB: "green",
    dynamicSummary:
      "Blue and Green both care deeply about doing right — but they define 'right' very differently. Blue locates it in principle, structure, and duty. Green locates it in empathy, inclusion, and feeling. Blue builds the container; Green fills it with warmth. The conflict arises when Blue's structure feels like oppression to Green, and Green's fluidity feels like chaos to Blue.",
    lensANeeds:
      "Blue needs Green to understand that not every structure is a power play. Some rules exist because generations of people discovered — often painfully — that without them, the vulnerable suffer most. Blue needs Green to honour what institutions protect, even while questioning how they work.",
    lensBNeeds:
      "Green needs Blue to see the people inside the system, not just the system itself. Rules that work perfectly on paper can devastate real lives when applied without compassion. Green needs Blue to hold principles firmly and humans gently — at the same time.",
    frictionPoints:
      "Blue judges Green for moral inconsistency: caring about fairness while refusing to enforce standards. Green judges Blue for moral rigidity: caring about rules while ignoring the harm they cause. The deeper tension is that Blue fears a world without structure, and Green fears a world without heart. Both fears are legitimate.",
    genuineConnection:
      "When these lenses meet, they create communities that are both structured and humane — schools with high standards and genuine pastoral care, justice systems that are firm and restorative, organisations where accountability and compassion reinforce each other. This is the relationship that builds civilisations that people actually want to live in.",
    scenarioClose:
      "In families, Blue provides predictability — the routines, the boundaries, the sense that someone is steering the ship. Green provides emotional safety — the listening, the permission to feel, the sense that every family member matters. Children thrive when both are present.",
    scenarioWork:
      "At work, Blue and Green often clash over policy: Blue wants clear rules applied consistently; Green wants case-by-case flexibility based on individual circumstances. The resolution is usually a framework that has both — clear principles with built-in compassion clauses.",
    scenarioCivic:
      "In civic life, this is the tension between law and justice. Blue maintains the legal system; Green demands that it serve everyone equally. The healthiest democracies hold this tension productively rather than resolving it.",
  },

  "blue-red": {
    quality: "full",
    lensA: "blue",
    lensB: "red",
    dynamicSummary:
      "Blue and Red are locked in one of the oldest human dynamics: the tension between individual will and collective order. Red says 'I will not be controlled.' Blue says 'there must be a right way.' Red is fire; Blue is the hearth that gives fire purpose. Without Blue, Red burns wildly. Without Red, Blue loses its vitality.",
    lensANeeds:
      "Blue needs Red to recognise that the rules are not the enemy — they are the reason Red still has a world stable enough to rebel in. Blue needs Red's energy and courage, but directed through a structure that doesn't destroy what others have built.",
    lensBNeeds:
      "Red needs Blue to stop trying to tame it and start trying to channel it. Red doesn't respect rules imposed from above — but it can respect a code it chooses to follow. Blue must earn Red's loyalty through integrity, not demand it through authority.",
    frictionPoints:
      "The breakdown is about control. Blue tries to contain Red through rules and consequences. Red resists with increasing force. Blue escalates the structure; Red escalates the defiance. Both feel justified. The cycle breaks when Blue leads through earned respect rather than positional authority, and Red channels its intensity toward something worth building.",
    genuineConnection:
      "When Red and Blue genuinely meet, they produce something remarkable: disciplined courage. The soldier who follows a code of honour. The entrepreneur who builds not just for profit but for legacy. The athlete who channels raw intensity through rigorous training. Red provides the fire; Blue provides the forge.",
    scenarioClose:
      "In close relationships, this often looks like the rule-setter and the rule-breaker. The Blue partner wants shared commitments honoured; the Red partner feels policed. The path forward is agreeing on a small number of non-negotiable commitments and leaving everything else flexible.",
    scenarioWork:
      "At work, this is the manager trying to maintain order and the maverick who ignores process. The best outcome is when Blue creates a structure with genuine autonomy zones — places where Red's initiative is not just tolerated but needed.",
    scenarioCivic:
      "In civic life, this is the perennial tension between authority and freedom. Every stable society needs both. The question is never whether to have rules or not, but which rules deserve Red's compliance — and that answer must be earned, not imposed.",
  },

  "orange-orange": {
    quality: "full",
    lensA: "orange",
    lensB: "orange",
    dynamicSummary:
      "Two Orange lenses together create extraordinary momentum. Both are driven, strategic, and outcomes-focused. They speak the same language of goals, metrics, and iteration. The upside is obvious: they can build things at remarkable speed. The downside is equally clear: neither is naturally inclined to pause, reflect, or ask whether the destination is worth the velocity.",
    lensANeeds:
      "Each Orange needs the other to be a genuine thinking partner, not just a competitor. Orange respects competence, so the relationship works when both feel stretched by the other's intelligence rather than threatened by it.",
    lensBNeeds:
      "The same — but this mirror can be uncomfortable. When both are optimising, neither is tending. The relationship needs deliberate, scheduled space for connection that has no agenda and no deliverable.",
    frictionPoints:
      "Competition is the obvious risk. Two Orange lenses can turn everything into a scoreboard — including the relationship itself. When both are running at full speed, exhaustion arrives before either will admit it. The deeper risk is emotional starvation: both assume feelings can be managed like any other input, and by the time they can't, the damage is real.",
    genuineConnection:
      "Two Orange lenses that learn to be vulnerable with each other create a relationship of extraordinary depth and capability. The shared language of strategy becomes a tool for navigating emotions, not just projects. They build a life together that is both ambitious and honest — once they stop performing achievement for each other.",
    scenarioClose:
      "Two achievement-oriented partners can build an impressive life but an empty home. The intervention is always the same: schedule unproductive time together and protect it the way you'd protect a client meeting.",
    scenarioWork:
      "Two Orange colleagues are a powerhouse — until they're competing for the same promotion. The key is structural clarity about roles and mutual investment in each other's advancement rather than zero-sum positioning.",
    scenarioCivic:
      "Two Orange civic actors push each other to think bigger and act faster. The risk is that efficiency becomes the only metric for public policy. The correction comes from inviting other lenses to the table.",
  },

  "green-green": {
    quality: "full",
    lensA: "green",
    lensB: "green",
    dynamicSummary:
      "Two Green lenses create immediate warmth and mutual recognition. Both value empathy, inclusion, and authenticity. They see each other clearly and make space naturally. The connection is often fast and deep. The challenge is that without an external lens, they can become a closed loop of mutual validation — agreeing beautifully while nothing changes.",
    lensANeeds:
      "Each Green needs the other to be honest, not just supportive. Green's deepest growth comes from hearing difficult truths delivered with genuine care. A Green-Green relationship that avoids all friction is a Green-Green relationship that avoids all growth.",
    lensBNeeds:
      "The same. Both need permission to be direct without it being interpreted as a lack of empathy. 'I love you and I disagree with you' must be a safe sentence.",
    frictionPoints:
      "The breakdown is almost always about indirect conflict. Neither wants to hurt the other, so neither says the hard thing. Resentment builds under a surface of niceness. Eventually it erupts — not as honest disagreement but as moral disappointment, which feels far more damaging. 'I'm not angry, I'm just hurt by who you're being' is Green shadow at its most potent.",
    genuineConnection:
      "Two Greens who learn to fight well — directly, cleanly, and with care — create one of the safest relationships possible. They understand each other's sensitivity because they share it. When they add courage to their compassion, the depth of connection is extraordinary.",
    scenarioClose:
      "A close Green-Green relationship is deeply nurturing but can become enmeshed. Each person needs to maintain their own opinions, friendships, and projects — not as a betrayal of togetherness but as a contribution to it.",
    scenarioWork:
      "Two Green colleagues create wonderful team culture but may struggle with deadlines, difficult feedback, and the willingness to let a good idea fail. The intervention is giving each other explicit permission to be decisive.",
    scenarioCivic:
      "Two Green civic actors share values but may disagree on tactics. The challenge is resolving internal disagreements quickly enough to take effective external action.",
  },

  "blue-blue": {
    quality: "full",
    lensA: "blue",
    lensB: "blue",
    dynamicSummary:
      "Two Blue lenses share a deep commitment to doing things the right way. They are reliable, principled, and loyal. There is an immediate mutual respect that comes from recognising someone else who takes their commitments seriously. The risk is that when they disagree about which rules are right, neither has the flexibility to bend — and a shared virtue becomes a shared weapon.",
    lensANeeds:
      "Each Blue needs the other to remember that loyalty to a shared principle is more important than being individually correct. The relationship works when both can say: 'I believe differently, but I trust your integrity.'",
    lensBNeeds:
      "The same. The deeper need is for graceful disagreement — a way to hold different convictions without either person feeling that the other has abandoned what matters.",
    frictionPoints:
      "Two Blues get into trouble when they disagree about the rules. Because both believe in absolute principles, a difference of conviction feels like a moral failure — not 'we see this differently' but 'one of us is wrong, and being wrong about this is serious.' The resulting standoff can be stubborn and cold.",
    genuineConnection:
      "Two Blues who learn that principles can be held without rigidity create an anchor point of stability for everyone around them. Their shared commitment to integrity becomes a foundation — not a fortress. They model what principled disagreement looks like, and that is rare and valuable.",
    scenarioClose:
      "A Blue-Blue partnership is built on shared commitments: the household runs, promises are kept, there is a deep reliability. The growth edge is allowing spontaneity and play, which both may undervalue as frivolous.",
    scenarioWork:
      "Two Blue colleagues maintain standards beautifully — but may resist necessary change by framing it as a lowering of those standards. The intervention is reminding each other that the purpose behind the rules matters more than the rules themselves.",
    scenarioCivic:
      "Two Blue civic actors are the backbone of institutional stability. Their danger is institutional conservatism — defending structures that no longer serve their original purpose.",
  },

  "blue-purple": {
    quality: "full",
    lensA: "blue",
    lensB: "purple",
    dynamicSummary:
      "Blue and Purple share a deep respect for tradition, but from different sources. Purple's tradition comes from belonging — the warmth of ritual, the bond of kinship, the unspoken knowing of a tight community. Blue's tradition comes from principle — the structure that protects, the rules that create fairness, the order that gives life meaning. They often look alike from the outside, but operate from very different centres.",
    lensANeeds:
      "Blue needs Purple to see that structure is not cold — it is a form of love. The rules Blue maintains exist to protect the community that Purple cherishes. Blue needs Purple to trust the institution as well as the family.",
    lensBNeeds:
      "Purple needs Blue to remember that belonging is not a rule — it is a feeling. You cannot legislate warmth. Purple needs Blue to value presence and relationship as much as process and principle.",
    frictionPoints:
      "The friction comes when Blue tries to formalise what Purple holds intuitively. Blue writes a policy; Purple wanted a conversation. Blue creates a process; Purple wanted a ritual. Both are trying to maintain something important, but Blue's approach can feel impersonal to Purple, and Purple's approach can feel arbitrary to Blue.",
    genuineConnection:
      "When these two lenses meet, they create communities with both warmth and stability — places where people belong and where the belonging is protected by structures that actually work. The church that is both doctrinally sound and genuinely caring. The family business that has both heart and governance.",
    scenarioClose:
      "In families, this often plays out between the member who holds the emotional centre (Purple) and the member who holds the practical structure (Blue). Both are essential. The family thrives when each appreciates what the other carries.",
    scenarioWork:
      "At work, Purple builds the culture; Blue builds the policies. The best organisations let both inform each other — culture that is supported by structure, structure that is warmed by culture.",
    scenarioCivic:
      "In civic life, this is the relationship between community and institution. Purple gathers people; Blue organises them. The healthiest societies honour both the neighbourhood and the courthouse.",
  },
};

// ── Template Generator ──────────────────────────────────────────────────────

function generateTemplate(a: LensProfile, b: LensProfile): RelationshipSeed {
  const aName = a.displayName;
  const bName = b.displayName;
  const isSameLens = a.slug === b.slug;

  const directionDesc = (lens: LensProfile): string => {
    if (lens.inwardOutward === "inward") return "inward-focused";
    if (lens.inwardOutward === "outward") return "outward-focused";
    return "integrative";
  };

  if (isSameLens) {
    return {
      quality: "template",
      lensA: a.slug,
      lensB: b.slug,
      dynamicSummary:
        `Two ${aName} lenses share a worldview so completely that they may forget it is a worldview and not simply reality. They understand each other intuitively — the same values, the same way of processing the world. The gift is immediate recognition. The risk is a shared blind spot that neither can see because both are standing in it.`,
      lensANeeds:
        `Each ${aName} needs the other to be more than a mirror. The relationship grows when both are willing to name what they see in themselves — including the shadow — and trust the other to receive it without defensiveness.`,
      lensBNeeds:
        `The same. A ${aName}-${aName} pair needs external input from other lenses to avoid becoming an echo chamber of shared assumptions. Seek out perspectives that challenge your shared certainties.`,
      frictionPoints:
        `The friction in a same-lens pairing is subtle: it is not conflict between different values but amplification of shared weaknesses. ${aName}'s characteristic shadow patterns are doubled. What one overlooks, the other overlooks too. Disagreements, when they come, feel like betrayal rather than difference — because 'we are supposed to see this the same way.'`,
      genuineConnection:
        `Two ${aName} lenses that bring honesty to their shared perspective create a partnership of extraordinary depth. They do not need to explain themselves — but they must be willing to challenge themselves, using the safety of mutual understanding to go further than either could alone.`,
      scenarioClose:
        `In a close relationship, two ${aName} lenses create a deeply aligned partnership. The growth edge is introducing the variety and challenge that your shared worldview might naturally avoid.`,
      scenarioWork:
        `At work, two ${aName} colleagues are natural allies. The risk is groupthink. Actively invite perspectives from other lenses into your shared projects and decisions.`,
      scenarioCivic:
        `In civic life, two ${aName} actors reinforce each other's convictions. Ensure those convictions remain responsive to the full complexity of the community you serve.`,
    };
  }

  // Cross-lens template
  const sameGroup = a.group === b.group;
  const sameDirection = a.inwardOutward === b.inwardOutward;

  let dynamicIntro: string;
  if (sameGroup && sameDirection) {
    dynamicIntro = `${aName} and ${bName} sit close together on the spiral and share the ${a.group === "me" ? "individual" : a.group === "we" ? "collective" : "universal"}-scale perspective. Both are ${directionDesc(a)}. Their similarities create fast rapport, but also the risk that they reinforce rather than challenge each other.`;
  } else if (sameGroup) {
    dynamicIntro = `${aName} and ${bName} share the ${a.group === "me" ? "individual" : a.group === "we" ? "collective" : "universal"} scale but face different directions — ${aName} is ${directionDesc(a)} while ${bName} is ${directionDesc(b)}. This creates a complementary tension: they are solving related problems from opposite angles.`;
  } else {
    dynamicIntro = `${aName} and ${bName} operate at different scales entirely. ${aName} sees the world through a ${a.group}-scale lens (${directionDesc(a)}), while ${bName} sees through a ${b.group}-scale lens (${directionDesc(b)}). This distance creates both difficulty and opportunity — they have much to teach each other.`;
  }

  return {
    quality: "template",
    lensA: a.slug,
    lensB: b.slug,
    dynamicSummary: dynamicIntro,
    lensANeeds:
      `${aName} needs ${bName} to understand what ${directionDesc(a)} processing looks like from the inside — not as a limitation to be corrected, but as a genuine way of engaging with the world. ${aName} connects best when their core values are acknowledged before being questioned.`,
    lensBNeeds:
      `${bName} needs ${aName} to extend the same recognition in return. ${bName}'s ${directionDesc(b)} orientation is not a rejection of ${aName}'s values but a different entry point into the same human needs for meaning, safety, and connection.`,
    frictionPoints:
      `The most common friction between ${aName} and ${bName} is not personal but structural: they are optimised for different things. ${aName}'s strengths can look like weaknesses through ${bName}'s lens, and vice versa. The key is recognising that each lens is solving a real problem — the question is which problem the current situation requires.`,
    genuineConnection:
      `When ${aName} and ${bName} stop trying to convert each other and start getting curious, they discover that each holds something the other genuinely needs. ${aName} expands ${bName}'s repertoire; ${bName} expands ${aName}'s. The relationship becomes richer than either worldview alone.`,
    scenarioClose:
      `In a close relationship, the ${aName}-${bName} dynamic requires patience and genuine curiosity. The moments of misunderstanding are not failures — they are invitations to see the world through a different lens. Name the difference when it arises, and treat it as information rather than injury.`,
    scenarioWork:
      `At work, ${aName} and ${bName} bring complementary strengths. The risk is that each undervalues the other's contribution because it looks different from their own. Make the invisible labour visible: name what each person adds to the shared work.`,
    scenarioCivic:
      `In civic life, the ${aName}-${bName} pairing represents the diversity of perspective that healthy communities require. Neither lens alone is sufficient. The work is creating spaces where both can contribute without either being dismissed.`,
  };
}

// ── Public API ───────────────────────────────────────────────────────────────

const ALL_SLUGS: LensSlug[] = [
  "beige", "purple", "red", "blue", "orange", "green", "yellow", "turquoise",
];

/**
 * Get a relationship guide for any two lenses.
 * Returns priority-authored content when available, otherwise template-generated.
 */
export function getRelationship(lensA: LensSlug, lensB: LensSlug): RelationshipSeed {
  const key = pairKey(lensA, lensB);

  // Check priority pairs first
  if (PRIORITY_PAIRS[key]) {
    return PRIORITY_PAIRS[key];
  }

  // Generate template
  const profileA = getSeedLens(lensA)!;
  const profileB = getSeedLens(lensB)!;
  const [sortedA, sortedB] = [lensA, lensB].sort() as [LensSlug, LensSlug];
  return generateTemplate(
    getSeedLens(sortedA)!,
    getSeedLens(sortedB)!,
  );
}

/**
 * Get all unique lens pair combinations (including same-lens pairs).
 * Returns 36 pairs: 28 cross-lens + 8 same-lens.
 */
export function getAllPairs(): Array<{ lensA: LensSlug; lensB: LensSlug; quality: "full" | "template" }> {
  const pairs: Array<{ lensA: LensSlug; lensB: LensSlug; quality: "full" | "template" }> = [];

  for (let i = 0; i < ALL_SLUGS.length; i++) {
    for (let j = i; j < ALL_SLUGS.length; j++) {
      const a = ALL_SLUGS[i];
      const b = ALL_SLUGS[j];
      const key = pairKey(a, b);
      pairs.push({
        lensA: a,
        lensB: b,
        quality: PRIORITY_PAIRS[key] ? "full" : "template",
      });
    }
  }

  return pairs;
}

/**
 * Get lens display info for the relationship UI.
 */
export function getLensDisplayInfo(slug: LensSlug) {
  return {
    slug,
    name: LENS_DISPLAY[slug],
    colors: LENS_COLORS[slug],
  };
}

export { LENS_DISPLAY, ALL_SLUGS };
