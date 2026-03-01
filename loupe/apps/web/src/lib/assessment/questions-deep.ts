// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Deep Assessment Additional Questions
//
// 25 scenario-based questions that extend the original 35.
// These are ONLY used in the Deep Assessment tier.
// Designed around the 6 life domains with emphasis on:
//   - Real-world scenarios (politics, workplace, relationships)
//   - Resistance-pattern questions (what irritates/unsettles you)
//   - Stress regression scenarios
//   - "What I'd actually do" framing
//
// DESIGN PRINCIPLES:
//   - Every question is a concrete scenario, not abstract self-assessment
//   - Each option is warmly framed — no "lesser" lens
//   - Resistance questions measure what someone pushes back against
//   - Political questions use tensions, not parties
//
// SECURITY NOTE:
//   This file contains ONLY client-visible question copy.
//   Scoring weights live in weights.ts (server-only).
// ─────────────────────────────────────────────────────────────────────────────

import type { AssessmentQuestion } from "@loupe/types";

export const DEEP_ADDITIONAL_QUESTIONS: AssessmentQuestion[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // WORK & AMBITION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d001",
    section: 6,
    domain: "work",
    tier: "deep",
    questionText:
      "Your team\u2019s been told there will be layoffs. Your first concern is:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Making sure I\u2019m seen as indispensable" },
      { value: "b", label: "That the process is handled fairly and transparently" },
      { value: "c", label: "How the people who are let go will be supported" },
      { value: "d", label: "Whether this is a symptom of a bigger structural problem" },
    ],
    sectionTransition:
      "Now we\u2019re going to get more specific. These scenarios are drawn from real life \u2014 work, relationships, the wider world. Go with your gut.",
  },

  {
    id: "d002",
    section: 6,
    domain: "work",
    tier: "deep",
    questionText:
      "A junior colleague presents an idea that you can see isn\u2019t going to work. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Let them try \u2014 that\u2019s how people learn" },
      { value: "b", label: "Gently steer them toward something more realistic" },
      { value: "c", label: "Tell them directly it won\u2019t work and explain why" },
      { value: "d", label: "Suggest they test it small-scale first to see what happens" },
    ],
  },

  {
    id: "d003",
    section: 6,
    domain: "work",
    tier: "deep",
    questionText:
      "You\u2019re in a meeting and someone takes credit for your work. In the moment, you:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Call it out right there \u2014 that\u2019s not okay" },
      { value: "b", label: "Note it, then address it privately afterward" },
      { value: "c", label: "Let it go \u2014 the work is what matters, not who gets credit" },
      { value: "d", label: "Feel frustrated but worry about causing a scene" },
    ],
  },

  {
    id: "d004",
    section: 6,
    domain: "work",
    tier: "deep",
    questionText:
      "Which of these workplace behaviours would frustrate you most in a colleague?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Endless meetings that could have been an email" },
      { value: "b", label: "Cutting corners to hit a deadline" },
      { value: "c", label: "Making decisions without consulting the people affected" },
      { value: "d", label: "Refusing to adapt when the old way clearly isn\u2019t working" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RELATIONSHIPS & INTIMACY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d005",
    section: 7,
    domain: "relationships",
    tier: "deep",
    questionText:
      "Your partner wants to spend the holidays with their family instead of yours. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Feel hurt \u2014 your family traditions matter deeply" },
      { value: "b", label: "Suggest alternating years \u2014 it\u2019s only fair" },
      { value: "c", label: "Go with their family willingly \u2014 their happiness matters more" },
      { value: "d", label: "Propose something new that honours both families" },
    ],
    sectionTransition:
      "Let\u2019s look at how you navigate the people closest to you \u2014 the relationships that actually test who you are.",
  },

  {
    id: "d006",
    section: 7,
    domain: "relationships",
    tier: "deep",
    questionText:
      "A close friend starts dating someone you think is bad for them. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Say something \u2014 real friends are honest, even when it\u2019s hard" },
      { value: "b", label: "Keep quiet \u2014 it\u2019s their life and their choice" },
      { value: "c", label: "Gently share your concern but make clear you\u2019ll support them either way" },
      { value: "d", label: "Talk to other friends about it first to see if you\u2019re overreacting" },
    ],
  },

  {
    id: "d007",
    section: 7,
    domain: "relationships",
    tier: "deep",
    questionText:
      "In your closest relationship, how do you handle it when you need space?",
    inputType: "binary",
    options: [
      { value: "a", label: "I say it directly \u2014 I need some time to myself" },
      { value: "b", label: "I find it hard to ask \u2014 I don\u2019t want them to feel rejected" },
    ],
  },

  {
    id: "d008",
    section: 7,
    domain: "relationships",
    tier: "deep",
    questionText:
      "Which of these would feel most like a betrayal in a friendship?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Sharing something I told them in confidence" },
      { value: "b", label: "Not showing up when I really needed them" },
      { value: "c", label: "Talking about me behind my back to mutual friends" },
      { value: "d", label: "Pretending to agree with me instead of being honest" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // POLITICS & SOCIETY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d009",
    section: 8,
    domain: "politics",
    tier: "deep",
    questionText:
      "A city is debating whether to ban cars from the downtown core to reduce emissions. Your first reaction:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "That\u2019s overreach \u2014 people should decide how they get around" },
      { value: "b", label: "If the data supports it, we should do it despite the pushback" },
      { value: "c", label: "The right direction, but the process needs to include everyone affected" },
      { value: "d", label: "We need to look at the whole system \u2014 transport, housing, jobs \u2014 not just one ban" },
    ],
    sectionTransition:
      "These next questions touch on the wider world \u2014 how you think about fairness, power, and how society should work. No political knowledge needed \u2014 just your honest instinct.",
  },

  {
    id: "d010",
    section: 8,
    domain: "politics",
    tier: "deep",
    questionText:
      "A school board votes to remove certain books from the library. Which response is closest to yours?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Some material isn\u2019t appropriate \u2014 there need to be standards" },
      { value: "b", label: "Censorship is always wrong \u2014 let people decide for themselves" },
      { value: "c", label: "The voices being silenced are usually the ones that need to be heard most" },
      { value: "d", label: "Both sides have a point \u2014 the question is who decides and how" },
    ],
  },

  {
    id: "d011",
    section: 8,
    domain: "politics",
    tier: "deep",
    questionText:
      "\u201CThe most important thing a government can do is stay out of people\u2019s way.\u201D How does that land?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Disagree \u2014 government should actively protect the vulnerable",
      labelMax: "Agree \u2014 freedom is the foundation of everything else",
    },
  },

  {
    id: "d012",
    section: 8,
    domain: "politics",
    tier: "deep",
    questionText:
      "A wealthy neighbourhood opposes a homeless shelter being built nearby. Your reaction:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "They have a right to protect their community as they see fit" },
      { value: "b", label: "Those people need somewhere to go \u2014 NIMBYism is selfish" },
      { value: "c", label: "The neighbourhood\u2019s concerns are valid but secondary to the greater good" },
      { value: "d", label: "The shelter isn\u2019t the real solution \u2014 we need to address why people are homeless" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONFLICT & STRESS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d013",
    section: 9,
    domain: "conflict",
    tier: "deep",
    questionText:
      "You discover your organisation has been quietly doing something unethical. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Report it immediately \u2014 right is right" },
      { value: "b", label: "Start looking for another job \u2014 I can\u2019t stay somewhere like this" },
      { value: "c", label: "Try to change it from within first" },
      { value: "d", label: "Raise it with trusted colleagues to build a coalition" },
    ],
    sectionTransition:
      "When things get difficult \u2014 when there\u2019s conflict, or the stakes are high \u2014 a different part of you shows up. Let\u2019s see what that looks like.",
  },

  {
    id: "d014",
    section: 9,
    domain: "conflict",
    tier: "deep",
    questionText:
      "Two people you care about are in a serious conflict with each other. They both want you on their side. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Pick the side that\u2019s right \u2014 fairness matters more than keeping everyone happy" },
      { value: "b", label: "Refuse to take sides \u2014 I\u2019m not getting in the middle of this" },
      { value: "c", label: "Try to mediate \u2014 help them see each other\u2019s perspective" },
      { value: "d", label: "Support both privately \u2014 they each need to feel heard" },
    ],
  },

  {
    id: "d015",
    section: 9,
    domain: "conflict",
    tier: "deep",
    questionText:
      "When you\u2019re at your most stressed, which of these are you most likely to do? Be honest.",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Snap at people and regret it later" },
      { value: "b", label: "Withdraw and go quiet \u2014 shut the world out" },
      { value: "c", label: "Overwork \u2014 bury myself in doing something productive" },
      { value: "d", label: "Seek reassurance \u2014 I need to know my people are still there" },
    ],
  },

  {
    id: "d016",
    section: 9,
    domain: "conflict",
    tier: "deep",
    questionText:
      "Which of these losses would affect you most deeply?",
    inputType: "ranked",
    options: [
      { value: "reputation", label: "Losing your reputation" },
      { value: "community", label: "Losing your community" },
      { value: "safety", label: "Losing your sense of physical safety" },
      { value: "framework", label: "Losing your framework for understanding the world" },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MEANING & PURPOSE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d017",
    section: 10,
    domain: "meaning",
    tier: "deep",
    questionText:
      "You\u2019re given a year off with all your expenses covered. You\u2019d most likely spend it:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Building something \u2014 a business, a project, something tangible" },
      { value: "b", label: "Deepening your closest relationships and community" },
      { value: "c", label: "Travelling and learning about different ways of life" },
      { value: "d", label: "Going inward \u2014 retreat, reflection, reconnecting with yourself" },
    ],
    sectionTransition:
      "What gives your life depth? These questions explore what calls to you beneath the surface of the everyday.",
  },

  {
    id: "d018",
    section: 10,
    domain: "meaning",
    tier: "deep",
    questionText:
      "When you think about death, what concerns you most?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Not having accomplished enough" },
      { value: "b", label: "Leaving the people I love" },
      { value: "c", label: "Whether I lived with integrity" },
      { value: "d", label: "It doesn\u2019t concern me much \u2014 it\u2019s part of the cycle" },
    ],
  },

  {
    id: "d019",
    section: 10,
    domain: "meaning",
    tier: "deep",
    questionText:
      "Which of these statements about suffering do you most agree with?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Suffering is mostly a problem to be solved \u2014 with the right systems, we can reduce it" },
      { value: "b", label: "Suffering has meaning \u2014 it teaches us things we can\u2019t learn any other way" },
      { value: "c", label: "Suffering is what connects us \u2014 shared pain creates the deepest bonds" },
      { value: "d", label: "Suffering is part of a larger pattern \u2014 it\u2019s not separate from the beauty" },
    ],
  },

  {
    id: "d020",
    section: 10,
    domain: "meaning",
    tier: "deep",
    questionText:
      "How much does it bother you when someone has a fundamentally different worldview from yours?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Not much \u2014 different perspectives are natural and interesting",
      labelMax: "A lot \u2014 some things aren\u2019t a matter of opinion",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CHANGE & UNCERTAINTY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "d021",
    section: 11,
    domain: "change",
    tier: "deep",
    questionText:
      "A major change is coming to your workplace and nobody has a clear plan yet. You:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Start making your own plan \u2014 waiting around is wasting time" },
      { value: "b", label: "Advocate for leadership to set clear expectations" },
      { value: "c", label: "Focus on how the team is feeling and whether people are being heard" },
      { value: "d", label: "Find the change genuinely interesting \u2014 it reveals things that were hidden" },
    ],
    sectionTransition:
      "Finally \u2014 how you relate to the unknown. Some people run toward change. Some resist it. Most of us do both, depending on the day.",
  },

  {
    id: "d022",
    section: 11,
    domain: "change",
    tier: "deep",
    questionText:
      "You\u2019re offered an opportunity that would mean leaving behind everything familiar. You:",
    inputType: "binary",
    options: [
      { value: "a", label: "Feel the pull \u2014 new frontiers are where growth happens" },
      { value: "b", label: "Hesitate \u2014 what I\u2019d be leaving behind matters too much" },
    ],
  },

  {
    id: "d023",
    section: 11,
    domain: "change",
    tier: "deep",
    questionText:
      "When you look at the state of the world right now, your dominant feeling is:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "We need to get back to the values that used to hold things together" },
      { value: "b", label: "We need better leadership and stronger institutions" },
      { value: "c", label: "We need more compassion and less competition" },
      { value: "d", label: "We\u2019re in a necessary transition \u2014 old systems breaking down to make room for new ones" },
    ],
  },

  {
    id: "d024",
    section: 11,
    domain: "change",
    tier: "deep",
    questionText:
      "How do you feel about uncertainty in your personal life?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "I need a plan \u2014 uncertainty feels like a problem to solve",
      labelMax: "I\u2019m comfortable with not knowing \u2014 life unfolds in its own time",
    },
  },

  {
    id: "d025",
    section: 11,
    domain: "change",
    tier: "deep",
    questionText:
      "A belief you\u2019ve held for years turns out to be wrong. Your honest reaction:",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Embarrassment \u2014 I should have known better" },
      { value: "b", label: "Curiosity \u2014 what else might I be wrong about?" },
      { value: "c", label: "Disorientation \u2014 if that\u2019s wrong, what else is?" },
      { value: "d", label: "Relief \u2014 the truth is always better than a comfortable fiction" },
    ],
  },
];
