// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Seed Assessment Questions (Original 35)
//
// Now tagged with life domain and assessment tier.
// These form the foundation pool — the Quick Quiz draws 12 from here,
// and the Deep Assessment uses all 35 plus ~25 additional questions.
//
// DESIGN PRINCIPLES (from prd.md §4.1):
//   - Situational & indirect — no direct self-report of values
//   - Input type variety — no two consecutive questions use the same format
//   - Lower lenses described warmly — no "lesser" framing
//   - No question has an obviously "right" or aspirational answer
//
// SECURITY NOTE:
//   This file contains ONLY client-visible question copy.
//   Scoring weights and lens dimension mappings are in weights.ts (server-only).
// ─────────────────────────────────────────────────────────────────────────────

import type { AssessmentQuestion } from "@loupe/types";

export const SEED_QUESTIONS: AssessmentQuestion[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 1 — How you navigate the everyday
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "q001",
    section: 1,
    domain: "work",
    tier: "both",
    questionText:
      "When you wake up with nothing planned for the day, your first instinct is to...",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Find something productive to do",
      labelMax: "See where the day takes me",
    },
    sectionTransition:
      "We\u2019re going to show you a series of everyday moments. There are no right answers \u2014 just notice what feels most like you.",
  },

  {
    id: "q002",
    section: 1,
    domain: "relationships",
    tier: "deep",
    questionText:
      "You\u2019re at a gathering where you don\u2019t know many people. You tend to...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label: "Find someone who looks like they need company and check in",
      },
      {
        value: "b",
        label:
          "Look for whoever seems most interesting or energetic in the room",
      },
      {
        value: "c",
        label: "Stay near people you came with and build from there",
      },
      {
        value: "d",
        label: "Observe the room for a while before deciding where to engage",
      },
    ],
  },

  {
    id: "q003",
    section: 1,
    domain: "relationships",
    tier: "both",
    questionText:
      "A friend asks for your honest opinion on a decision they\u2019ve already made. You...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Tell them what you really think \u2014 honesty matters more than comfort",
      },
      {
        value: "b",
        label:
          "Frame your thoughts gently \u2014 the relationship matters more than being right",
      },
    ],
  },

  {
    id: "q004",
    section: 1,
    domain: "meaning",
    tier: "deep",
    questionText:
      "How much do daily rituals and routines matter to your sense of wellbeing?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "They\u2019re barely on my radar",
      labelMax: "They\u2019re essential \u2014 I feel lost without them",
    },
  },

  {
    id: "q005",
    section: 1,
    domain: "work",
    tier: "both",
    questionText:
      "When a team project is going off track, your instinct is to...",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Step in and take charge \u2014 someone needs to" },
      {
        value: "b",
        label: "Suggest a clear process to get everyone aligned",
      },
      {
        value: "c",
        label: "Make sure everyone\u2019s voice is heard before deciding",
      },
      {
        value: "d",
        label:
          "Step back and look at the bigger picture of what\u2019s really going wrong",
      },
    ],
  },

  {
    id: "q006",
    section: 1,
    domain: "work",
    tier: "deep",
    questionText:
      "When you achieve something significant, what matters more to you?",
    inputType: "binary",
    options: [
      { value: "a", label: "The recognition and the success itself" },
      { value: "b", label: "Knowing you did it with integrity" },
    ],
  },

  {
    id: "q007",
    section: 1,
    domain: "conflict",
    tier: "deep",
    questionText:
      "Order these by how much they contribute to your sense of security:",
    inputType: "ranked",
    options: [
      { value: "resources", label: "Having enough money and resources" },
      {
        value: "people",
        label: "Being surrounded by people who care about me",
      },
      {
        value: "rules",
        label: "Knowing the rules and expectations",
      },
      {
        value: "capability",
        label: "Feeling capable of handling whatever comes",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 2 — What you reach for
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "q008",
    section: 2,
    domain: "meaning",
    tier: "both",
    questionText: "You have a free weekend. You\u2019re most drawn to...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label:
          "A competitive activity \u2014 sports, games, something with a clear winner",
      },
      {
        value: "b",
        label: "Time in nature or a quiet, restorative space",
      },
      {
        value: "c",
        label:
          "A community event \u2014 volunteering, a festival, something shared",
      },
      {
        value: "d",
        label:
          "Learning something new \u2014 a book, documentary, or deep conversation",
      },
    ],
    sectionTransition:
      "Now we\u2019d like to explore what draws your attention \u2014 the things you gravitate toward when nobody\u2019s watching.",
  },

  {
    id: "q009",
    section: 2,
    domain: "politics",
    tier: "both",
    questionText:
      "When you hear about someone breaking a rule, your first reaction is...",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Rules exist for good reason \u2014 they should be followed",
      labelMax: "It depends on the rule \u2014 some rules need breaking",
    },
  },

  {
    id: "q010",
    section: 2,
    domain: "work",
    tier: "deep",
    questionText:
      "Imagine you\u2019ve been offered two roles at the same salary:",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "One with a clear ladder, title progression, and metrics for success",
      },
      {
        value: "b",
        label:
          "One with creative freedom, flat structure, and room to shape the role",
      },
    ],
  },

  {
    id: "q011",
    section: 2,
    domain: "meaning",
    tier: "deep",
    questionText:
      "What\u2019s most likely to make you feel truly alive?",
    inputType: "multiple_choice",
    options: [
      { value: "a", label: "Pushing past a physical or mental limit" },
      { value: "b", label: "Creating something beautiful or meaningful" },
      {
        value: "c",
        label: "Feeling deeply connected to someone or a group",
      },
      {
        value: "d",
        label:
          "Having a moment of clarity about how everything fits together",
      },
    ],
  },

  {
    id: "q012",
    section: 2,
    domain: "politics",
    tier: "deep",
    questionText:
      "How comfortable are you with situations where there\u2019s no clear authority or leader?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Very uncomfortable \u2014 someone needs to be in charge",
      labelMax:
        "Very comfortable \u2014 I trust the group to self-organise",
    },
  },

  {
    id: "q013",
    section: 2,
    domain: "change",
    tier: "both",
    questionText:
      "When making an important decision, you trust...",
    inputType: "binary",
    options: [
      { value: "a", label: "Logic, evidence, and strategy" },
      { value: "b", label: "Intuition and how it feels in your body" },
    ],
  },

  {
    id: "q014",
    section: 2,
    domain: "meaning",
    tier: "deep",
    questionText:
      "How important is it to you that traditions are maintained, even when they seem outdated?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Not important \u2014 move on and adapt",
      labelMax:
        "Very important \u2014 traditions carry wisdom we shouldn\u2019t discard",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 3 — How you connect with others
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "q015",
    section: 3,
    domain: "relationships",
    tier: "deep",
    questionText:
      "When someone close to you is going through a hard time, you\u2019re more likely to...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label: "Offer practical solutions and help them make a plan",
      },
      {
        value: "b",
        label:
          "Just be present with them \u2014 listen and let them feel heard",
      },
    ],
    sectionTransition:
      "You\u2019ve told us about your inner world. Now let\u2019s look at how you relate to the people around you.",
  },

  {
    id: "q016",
    section: 3,
    domain: "conflict",
    tier: "both",
    questionText:
      "In a disagreement, how important is it that you \u2018win\u2019 the argument?",
    inputType: "slider",
    sliderConfig: {
      labelMin:
        "Not at all \u2014 I\u2019d rather find common ground",
      labelMax: "Very \u2014 I need to stand my ground",
    },
  },

  {
    id: "q017",
    section: 3,
    domain: "relationships",
    tier: "deep",
    questionText:
      "You notice a friend has started pulling away from your group. You...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label:
          "Reach out privately \u2014 loyalty means showing up even when it\u2019s hard",
      },
      {
        value: "b",
        label:
          "Give them space \u2014 people need room to figure things out",
      },
      {
        value: "c",
        label:
          "Bring it up directly \u2014 if something\u2019s wrong, let\u2019s address it",
      },
      {
        value: "d",
        label:
          "Mention it to others in the group \u2014 we should be looking out for each other",
      },
    ],
  },

  {
    id: "q018",
    section: 3,
    domain: "work",
    tier: "deep",
    questionText:
      "You\u2019re leading a group. A member is consistently underperforming. You...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Have a direct, honest conversation \u2014 clarity is kindness",
      },
      {
        value: "b",
        label:
          "Try to understand what\u2019s going on in their life first",
      },
    ],
  },

  {
    id: "q019",
    section: 3,
    domain: "work",
    tier: "deep",
    questionText:
      "How much do you value being seen as successful by others?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Very little \u2014 I define success for myself",
      labelMax:
        "A lot \u2014 others\u2019 recognition matters to me",
    },
  },

  {
    id: "q020",
    section: 3,
    domain: "relationships",
    tier: "deep",
    questionText:
      "At a family gathering, you\u2019re most likely to...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label:
          "Enjoy the familiar warmth \u2014 these rituals hold us together",
      },
      {
        value: "b",
        label:
          "Take charge of organising something \u2014 someone has to",
      },
      {
        value: "c",
        label: "Seek out the most interesting conversation in the room",
      },
      {
        value: "d",
        label: "Make sure the quieter people feel included",
      },
    ],
  },

  {
    id: "q021",
    section: 3,
    domain: "change",
    tier: "deep",
    questionText:
      "How do you feel about the idea that some conflicts can\u2019t be resolved \u2014 only held?",
    inputType: "slider",
    sliderConfig: {
      labelMin:
        "Disagree \u2014 every conflict has a solution if you\u2019re clever enough",
      labelMax:
        "Agree \u2014 some tensions are simply part of life",
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 4 — When the ground shifts
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "q022",
    section: 4,
    domain: "conflict",
    tier: "deep",
    questionText:
      "When facing a crisis, your first instinct is to...",
    inputType: "slider",
    sliderConfig: {
      labelMin:
        "Take decisive action \u2014 do something, anything",
      labelMax: "Slow down and think before acting",
    },
    sectionTransition:
      "Life doesn\u2019t always go smoothly. These next questions explore how you respond when things feel uncertain or difficult.",
  },

  {
    id: "q023",
    section: 4,
    domain: "conflict",
    tier: "both",
    questionText:
      "A close friend betrays your trust. Your gut reaction is closer to...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Anger \u2014 I want them to know they\u2019ve crossed a line",
      },
      {
        value: "b",
        label:
          "Hurt \u2014 I need time to process and grieve what was lost",
      },
    ],
  },

  {
    id: "q024",
    section: 4,
    domain: "politics",
    tier: "deep",
    questionText:
      "You discover that an institution you trusted has been acting unethically. You...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label:
          "Feel personally betrayed \u2014 I believed in the system",
      },
      {
        value: "b",
        label:
          "Want to fix it from the inside \u2014 systems can be reformed",
      },
      {
        value: "c",
        label:
          "Lose faith \u2014 this is why I don\u2019t trust institutions",
      },
      {
        value: "d",
        label:
          "See it as a symptom \u2014 we need a different kind of system entirely",
      },
    ],
  },

  {
    id: "q025",
    section: 4,
    domain: "conflict",
    tier: "deep",
    questionText:
      "When you feel physically unsafe, how much does that affect your ability to think clearly?",
    inputType: "slider",
    sliderConfig: {
      labelMin:
        "Barely \u2014 I can reason through almost anything",
      labelMax:
        "A lot \u2014 my body takes over and everything else fades",
    },
  },

  {
    id: "q026",
    section: 4,
    domain: "conflict",
    tier: "deep",
    questionText:
      "When you\u2019re under stress, you\u2019re more likely to...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Double down and push through \u2014 grit gets results",
      },
      {
        value: "b",
        label:
          "Seek connection \u2014 being around others helps me cope",
      },
    ],
  },

  {
    id: "q027",
    section: 4,
    domain: "conflict",
    tier: "deep",
    questionText:
      "Something you\u2019ve worked hard on fails publicly. Your first thought is...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label: "What can I learn from this to do better next time?",
      },
      {
        value: "b",
        label:
          "This is painful, but I know who I am regardless",
      },
      { value: "c", label: "I need my people around me right now" },
      {
        value: "d",
        label:
          "Someone needs to be held accountable for what went wrong",
      },
    ],
  },

  {
    id: "q028",
    section: 4,
    domain: "change",
    tier: "both",
    questionText:
      "A sudden change disrupts your plans. You feel...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Excited \u2014 change usually brings new opportunities",
      },
      {
        value: "b",
        label:
          "Anxious \u2014 I need to understand the new situation before I can relax",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 5 — What calls you forward
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  {
    id: "q029",
    section: 5,
    domain: "meaning",
    tier: "deep",
    questionText:
      "If you could make one lasting contribution to the world, it would be...",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label:
          "Protecting what\u2019s sacred \u2014 traditions, nature, community",
      },
      {
        value: "b",
        label: "Creating a system that\u2019s fair and works for everyone",
      },
      {
        value: "c",
        label:
          "Achieving something extraordinary that changes what\u2019s possible",
      },
      {
        value: "d",
        label:
          "Helping people see connections they\u2019re currently missing",
      },
    ],
    sectionTransition:
      "Finally, we want to understand what pulls you toward tomorrow \u2014 your sense of what matters beyond the day-to-day.",
  },

  {
    id: "q030",
    section: 5,
    domain: "politics",
    tier: "both",
    questionText:
      "How much do you believe there\u2019s a \u2018right way\u2019 to live?",
    inputType: "slider",
    sliderConfig: {
      labelMin:
        "No single right way \u2014 it all depends on context",
      labelMax:
        "Yes \u2014 some values and principles are universal",
    },
  },

  {
    id: "q031",
    section: 5,
    domain: "politics",
    tier: "deep",
    questionText:
      "When you think about the future of humanity, you feel more...",
    inputType: "binary",
    options: [
      {
        value: "a",
        label:
          "Hopeful \u2014 we\u2019re capable of incredible things when we work together",
      },
      {
        value: "b",
        label:
          "Pragmatic \u2014 progress requires individual drive and competition",
      },
    ],
  },

  {
    id: "q032",
    section: 5,
    domain: "meaning",
    tier: "both",
    questionText:
      "What brings you the deepest sense of meaning?",
    inputType: "multiple_choice",
    options: [
      {
        value: "a",
        label: "Physical connection to the natural world",
      },
      {
        value: "b",
        label: "The bonds I share with my closest people",
      },
      { value: "c", label: "Knowing I\u2019ve lived by my principles" },
      {
        value: "d",
        label:
          "Understanding how complex systems work and connect",
      },
    ],
  },

  {
    id: "q033",
    section: 5,
    domain: "relationships",
    tier: "both",
    questionText:
      "How much does the suffering of strangers on the other side of the world affect you personally?",
    inputType: "slider",
    sliderConfig: {
      labelMin: "Very little \u2014 I focus on what\u2019s close to me",
      labelMax: "Deeply \u2014 we\u2019re all connected",
    },
  },

  {
    id: "q034",
    section: 5,
    domain: "meaning",
    tier: "deep",
    questionText:
      "Order these by how much they resonate with your deepest self:",
    inputType: "ranked",
    options: [
      {
        value: "body_wisdom",
        label:
          "There\u2019s an intelligence in nature and the body that we\u2019ve forgotten",
      },
      {
        value: "bonds",
        label:
          "The bonds between people are what make life worth living",
      },
      {
        value: "excellence",
        label: "Lasting progress comes from individual excellence",
      },
      {
        value: "system",
        label:
          "The most important thing is getting the system right",
      },
    ],
  },

  {
    id: "q035",
    section: 5,
    domain: "change",
    tier: "deep",
    questionText:
      "If you had to choose, which matters more to you?",
    inputType: "binary",
    options: [
      {
        value: "a",
        label: "Freedom \u2014 the ability to chart your own path",
      },
      {
        value: "b",
        label:
          "Belonging \u2014 being deeply woven into something larger",
      },
    ],
  },
];
