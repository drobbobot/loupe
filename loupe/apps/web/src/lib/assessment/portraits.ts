// ─────────────────────────────────────────────────────────────────────────────
// Loupe — Lens Portrait Data
//
// ██████████████████████████████████████████████████████████████████████████████
// ██  SERVER-SIDE ONLY — NEVER import this file from client components.     ██
// ██████████████████████████████████████████████████████████████████████████████
//
// Each lens has:
//   - shadowFlags: specific behavioural patterns when contracted/stressed
//   - growthOrientation: what the "next" lens offers (descriptive, not prescriptive)
//
// Deep assessment adds:
//   - DOMAIN_NARRATIVES: how each lens shows up in each life domain
//   - STRESS_NARRATIVES: what regression to this lens looks like
//
// Tone guidance (prd.md §3, design.md §2):
//   - Second person, compassionate
//   - "Lenses, not levels" — no hierarchy implied
//   - Shadow descriptions are honest but never shaming
//   - Growth orientation is descriptive, not prescriptive ("sees X" not "should X")
// ─────────────────────────────────────────────────────────────────────────────

import type { LensSlug, LifeDomain } from "@loupe/types";

export interface LensPortrait {
  shadowFlags: {
    tendencies: string[];
    triggers: string[];
  };
  growthOrientation: string;
}

export const PORTRAITS: Record<LensSlug, LensPortrait> = {
  beige: {
    shadowFlags: {
      tendencies: [
        "Withdrawing from the world when overwhelmed, shutting down rather than reaching out",
        "Focusing so heavily on physical comfort and safety that relationships and growth fall away",
        "Difficulty trusting that the ground beneath you is stable enough to take risks",
      ],
      triggers: [
        "Feeling physically unsafe or unwell",
        "Environments that feel chaotic, unpredictable, or too fast-paced",
        "Having basic needs (sleep, food, shelter, rest) go unmet for too long",
      ],
    },
    growthOrientation:
      "Purple sees something you sometimes miss: that safety isn\u2019t only found in self-sufficiency \u2014 it\u2019s also found in belonging. The people around you can be part of the ground you stand on, not just bystanders to your survival.",
  },

  purple: {
    shadowFlags: {
      tendencies: [
        "Holding so tightly to your group that outsiders feel unwelcome or even threatening",
        "Deferring to tradition or authority figures when your own instincts say otherwise",
        "Feeling lost or unmoored when separated from the people and rituals that define you",
      ],
      triggers: [
        "Rejection or exclusion from your inner circle",
        "Having cherished traditions or group norms challenged",
        "Feeling like you have to navigate something entirely alone",
      ],
    },
    growthOrientation:
      "Red sees something you sometimes miss: that your own voice matters as much as the group\u2019s. Loyalty doesn\u2019t require losing yourself \u2014 the people who truly love you want to hear what you actually think, not what keeps the peace.",
  },

  red: {
    shadowFlags: {
      tendencies: [
        "Dominating conversations and decisions, leaving little room for others to contribute",
        "Interpreting normal boundaries as personal challenges or power plays",
        "Acting on impulse and dealing with the fallout later, treating speed as a virtue even when it costs you",
      ],
      triggers: [
        "Feeling controlled, constrained, or told what to do",
        "Perceived disrespect or being ignored",
        "Environments that reward compliance over initiative",
      ],
    },
    growthOrientation:
      "Blue sees something you sometimes miss: that structure isn\u2019t a cage \u2014 it\u2019s a container. Some of your boldest energy gets wasted on battles that don\u2019t need fighting. The right framework can actually amplify your power rather than limit it.",
  },

  blue: {
    shadowFlags: {
      tendencies: [
        "Rigidity \u2014 doubling down on the rules even when the situation clearly calls for an exception",
        "Judging others harshly for not meeting your standards, even when those standards were never theirs",
        "Shouldering duty to the point of martyrdom, then resenting those who seem to live more freely",
      ],
      triggers: [
        "Moral ambiguity or situations with no clear right answer",
        "People who don\u2019t follow through on commitments or seem to lack discipline",
        "Feeling that the institutions you believe in are failing or corrupt",
      ],
    },
    growthOrientation:
      "Orange sees something you sometimes miss: that the rules you\u2019ve built your life around were made by people \u2014 and people can improve them. Innovation isn\u2019t disloyalty. Sometimes the most principled thing you can do is question a principle.",
  },

  orange: {
    shadowFlags: {
      tendencies: [
        "Reducing people and experiences to metrics \u2014 optimising life until the meaning drains out",
        "Moving so fast toward the next goal that you miss what\u2019s already here",
        "Treating vulnerability as weakness and connection as distraction from achievement",
      ],
      triggers: [
        "Failure, especially public failure",
        "Feeling inefficient, stuck, or unproductive",
        "Environments that don\u2019t recognise or reward competence",
      ],
    },
    growthOrientation:
      "Green sees something you sometimes miss: that not everything worth doing shows up on a scoreboard. The relationships you\u2019ve been calling \u2018networking\u2019 might actually be the point, not the means. Slowing down isn\u2019t losing \u2014 it\u2019s listening.",
  },

  green: {
    shadowFlags: {
      tendencies: [
        "Valuing inclusion so highly that you struggle to make decisions or hold anyone accountable",
        "Judging others for being judgmental \u2014 enforcing openness with the same rigidity you critique",
        "Avoiding conflict until resentment builds, then expressing it as moral disappointment rather than honest frustration",
      ],
      triggers: [
        "Perceived hierarchy, exclusion, or unfairness",
        "People who seem indifferent to how their actions affect others",
        "Being asked to choose efficiency over empathy",
      ],
    },
    growthOrientation:
      "Yellow sees something you sometimes miss: that holding space for every perspective doesn\u2019t mean all perspectives carry equal weight in every situation. Integration isn\u2019t about erasing difference \u2014 it\u2019s about understanding what each lens actually does well, and using that understanding to act.",
  },

  yellow: {
    shadowFlags: {
      tendencies: [
        "Analysing from a distance instead of participating \u2014 becoming the observer who never commits",
        "Feeling quietly superior to people who haven\u2019t \u2018seen the whole picture\u2019",
        "Valuing autonomy so much that you struggle with genuine interdependence",
      ],
      triggers: [
        "Being forced into a single framework or ideology",
        "People who insist their lens is the only valid one",
        "Environments that demand loyalty to a group position over independent thinking",
      ],
    },
    growthOrientation:
      "Turquoise sees something you sometimes miss: that understanding the system isn\u2019t the same as being part of it. Your maps of the world are elegant, but at some point the map has to dissolve into the territory. Connection isn\u2019t a concept to be integrated \u2014 it\u2019s an experience to be lived.",
  },

  turquoise: {
    shadowFlags: {
      tendencies: [
        "Spiritual bypassing \u2014 using holistic language to avoid the messy, human work of direct confrontation",
        "Feeling so attuned to the big picture that everyday practical details seem beneath your attention",
        "A quiet detachment that others experience as inaccessibility, even when you feel deeply connected",
      ],
      triggers: [
        "Environments that are aggressively materialistic or reductive",
        "People who dismiss intuitive or non-rational knowing",
        "Being asked to reduce complex, living systems to simple metrics or categories",
      ],
    },
    growthOrientation:
      "The spiral doesn\u2019t end. Turquoise holds the widest lens available right now, but its growth edge is re-engaging with the particular \u2014 finding the universal in the mundane, bringing holistic awareness into the smallest interactions, and resisting the temptation to float above it all.",
  },
};

// ── Domain Narratives (Deep Assessment) ──────────────────────────────────────
// How each lens shows up in each of the 6 life domains.
// Written in second person, warm, Rob Bell register.

export const DOMAIN_NARRATIVES: Record<LensSlug, Record<LifeDomain, string>> = {
  beige: {
    work: "At work, your body is your compass. You know when an environment feels wrong before you can explain why. You do your best work when your physical needs are met \u2014 when you\u2019ve slept, when you feel safe, when the pace lets you breathe. When those basics are off, everything else crumbles.",
    relationships: "In your closest relationships, you show love through physical presence. You\u2019re the person who notices when someone hasn\u2019t eaten, who makes sure the house is warm. Your care is tangible \u2014 not in words but in the way you hold the space people inhabit.",
    politics: "Politics can feel distant and abstract to you. The debates that fire other people up often feel disconnected from what actually matters \u2014 whether people have what they need to survive and feel safe. Your political instincts start with the body: food, shelter, safety.",
    conflict: "Under pressure, you go into survival mode. Your body takes the wheel. This isn\u2019t weakness \u2014 it\u2019s an ancient intelligence. But it can make it hard to think clearly when the stakes are high, and others may read your withdrawal as disengagement when really you\u2019re overwhelmed.",
    meaning: "Meaning, for you, lives in the physical world. In the feeling of sun on skin, in a body that works, in the simple fact of being alive. You don\u2019t need a grand philosophy \u2014 the ground beneath your feet is philosophy enough.",
    change: "Change feels like a threat to the stability you\u2019ve built. You need to know the ground is solid before you can move. This makes you cautious, which others may mistake for resistance \u2014 but you know something they sometimes forget: you can\u2019t build anything on shaky foundations.",
  },

  purple: {
    work: "At work, you\u2019re the one who holds the culture together. You remember birthdays, keep traditions alive, and notice when the team\u2019s energy shifts. You work best in environments where loyalty is valued and people look out for each other \u2014 not just as colleagues, but as something closer to family.",
    relationships: "Your relationships are the centre of your world. You love through ritual, through showing up, through the small repeated acts that say \u2018you belong to me and I belong to you.\u2019 Losing a connection doesn\u2019t just hurt \u2014 it feels like losing part of yourself.",
    politics: "Politically, your instincts are tribal in the best sense of the word. You care about your community \u2014 the people you can see and touch and know. Abstract policy debates matter less to you than whether the people around you are being taken care of.",
    conflict: "When conflict arises, your first instinct is to circle the wagons. You reach for your people. The pain of being alone in a fight is worse than the fight itself. You\u2019d rather face trouble together than face it right.",
    meaning: "The deepest meaning in your life comes from belonging. Not in a sentimental way \u2014 in the bone-deep way of knowing there are people in the world who would come for you. The rituals, the traditions, the shared stories \u2014 these aren\u2019t decoration. They\u2019re the infrastructure of your soul.",
    change: "Change feels threatening when it disrupts the bonds and traditions that anchor you. You don\u2019t resist change because you\u2019re closed-minded \u2014 you resist it because you know what it costs to rebuild what gets torn down. You carry the memory of what was, and that\u2019s a gift the world needs.",
  },

  red: {
    work: "At work, you\u2019re a force. You see what needs to happen and you make it happen. Bureaucracy drives you crazy. Meetings that should be decisions feel like a waste of your energy. You\u2019re at your best when you have autonomy, speed, and something real at stake.",
    relationships: "In relationships, you\u2019re intense. You love hard, you fight hard, and you don\u2019t do well with people who can\u2019t match your energy. You show love through action \u2014 through showing up when it matters, through defending the people you care about, through being unapologetically yourself.",
    politics: "Politically, you trust strength. You\u2019re drawn to leaders who say what they mean and do what they say. You have little patience for political games or hollow consensus. If something is broken, fix it. If someone is in the way, say so.",
    conflict: "You don\u2019t avoid conflict \u2014 you run toward it. When things go wrong, you take action. Sometimes that action is brilliant. Sometimes it\u2019s impulsive. But you\u2019d rather make a mistake moving forward than make no mistake standing still.",
    meaning: "Meaning comes from testing yourself. From knowing you can handle what life throws at you. From the adrenaline of doing something that scares you. Your life is a series of moments where you proved you were strong enough, brave enough, alive enough.",
    change: "Change doesn\u2019t scare you \u2014 it excites you. You see every disruption as an opportunity to seize. While others are still figuring out what happened, you\u2019re already moving. The unknown isn\u2019t a problem \u2014 it\u2019s a playground.",
  },

  blue: {
    work: "At work, you\u2019re the backbone. You care about doing things right, following through, and maintaining standards. You\u2019re the person others trust because you actually deliver on your word. Environments without clear expectations or accountability feel chaotic to you.",
    relationships: "You show love through commitment. Through keeping your promises, through being the person people can count on. Loyalty isn\u2019t a nice idea to you \u2014 it\u2019s a practice, a discipline, something you do even when it\u2019s hard. Especially when it\u2019s hard.",
    politics: "You believe in institutions. Not blindly \u2014 but because you understand that without shared rules and structures, society falls apart. You get frustrated when people tear things down without thinking about what they\u2019re building to replace them.",
    conflict: "Under pressure, you reach for structure. You want clear expectations, fair processes, and someone to take responsibility. The chaos that comes with unresolved conflict feels deeply wrong to you \u2014 not just emotionally, but morally.",
    meaning: "Meaning comes from living with integrity. From knowing that your life stands for something. From the quiet satisfaction of having done the right thing when no one was watching. Your principles aren\u2019t abstract \u2014 they\u2019re the architecture of your days.",
    change: "Change feels threatening when it comes without order. You\u2019re not opposed to change \u2014 you\u2019re opposed to reckless change. You want to know the plan, the reasoning, the principles that guide the transition. Thoughtful change you can get behind. Chaos, never.",
  },

  orange: {
    work: "Work is where you come alive. You love the game \u2014 the strategy, the competition, the satisfaction of a problem well-solved. You\u2019re driven by results and frustrated by anything that slows you down. Your ambition isn\u2019t greed \u2014 it\u2019s a deep belief that you can make things better.",
    relationships: "In relationships, you bring energy, vision, and a relentless desire to improve things. But your achievement drive can bleed into your closest bonds \u2014 optimising the relationship, solving your partner\u2019s problems when they just want you to listen, treating connection as another project to get right.",
    politics: "Politically, you\u2019re pragmatic. You care about what works. Ideology bores you \u2014 data excites you. You believe in meritocracy, innovation, and the power of smart people to solve problems. You get frustrated when politics rewards loyalty over competence.",
    conflict: "When conflict comes, you analyse. Your first instinct is to understand the problem and find a solution. You can sometimes rush past the emotional dimension of conflict \u2014 not because you don\u2019t feel it, but because your mind is already three steps ahead looking for the fix.",
    meaning: "Meaning comes from achievement. Not the shallow kind \u2014 the kind where you know you pushed past what you thought was possible. Where you built something that wasn\u2019t there before. The scorecard isn\u2019t vanity \u2014 it\u2019s evidence that your time here mattered.",
    change: "You don\u2019t just tolerate change \u2014 you drive it. But only when you can see the opportunity. Purposeless disruption frustrates you almost as much as stagnation. You want change you can direct, measure, and improve upon.",
  },

  green: {
    work: "At work, you\u2019re the one asking who\u2019s been left out of the conversation. You care about culture, inclusion, and whether people feel valued \u2014 not just productive. You work best in environments where hierarchy is flat and everyone\u2019s contribution is genuinely welcomed.",
    relationships: "Your relationships are defined by depth. You don\u2019t want surface-level connection \u2014 you want the real thing. Vulnerability, honesty, mutual care. You\u2019re drawn to people who can sit with emotion rather than rush past it.",
    politics: "Politically, you lead with empathy. You notice who\u2019s being harmed, whose voice isn\u2019t being heard, whose pain is being dismissed. You believe that any system that works for some but not others isn\u2019t actually working. Justice isn\u2019t a policy position to you \u2014 it\u2019s a felt obligation.",
    conflict: "Conflict is hard for you \u2014 not because you\u2019re weak, but because you feel it so deeply. You\u2019d rather find common ground than fight. But when someone you care about is being hurt, or when injustice is clear, a fierce protectiveness emerges that surprises even you.",
    meaning: "Meaning lives in connection. In the moments where someone feels truly seen. In the work of building something more just, more inclusive, more human. Your deepest conviction is that we belong to each other \u2014 and most of the world\u2019s problems come from forgetting that.",
    change: "You welcome change that brings more people in. But change that tramples over people in the name of progress feels like violence to you. You\u2019re not anti-change \u2014 you\u2019re anti-damage. You want transformation that includes everyone.",
  },

  yellow: {
    work: "At work, you\u2019re the one who sees how all the pieces fit together. You can hold multiple frameworks in your head simultaneously and find the approach that fits the actual situation, not the one the playbook prescribed. You get bored in environments that reward following rules over solving problems.",
    relationships: "In relationships, you bring curiosity and genuine respect for how differently people see the world. But your analytical nature can create distance \u2014 you sometimes observe the relationship rather than being fully in it. The people closest to you may wish you\u2019d stop understanding and just feel.",
    politics: "Politically, you frustrate both sides. You can see the validity in positions that others find contradictory. You understand why someone is Blue and why someone else is Green, and you find the simplistic framing of most political debate almost physically painful. You want systems that actually work, not systems that feel righteous.",
    conflict: "In conflict, you step back and look at the system. You see the patterns that created the conflict, the perspectives each person is bringing, and usually three or four possible paths through. This makes you an extraordinary mediator \u2014 and sometimes a frustrating one, because people in pain want solidarity, not analysis.",
    meaning: "Meaning comes from understanding. From the moment when a complex system suddenly makes sense. From the feeling of holding apparent contradictions and seeing they\u2019re not contradictions at all. Your deepest drive is to see clearly \u2014 and to help others see.",
    change: "You\u2019re genuinely fascinated by change. You see it as information \u2014 a signal about what a system actually needs. You don\u2019t resist change or chase it; you read it. This gives you a rare kind of calm in uncertain times.",
  },

  turquoise: {
    work: "At work, you\u2019re drawn to purposes larger than profit. You see organisations as living systems, not machines. You\u2019re most engaged when the work connects to something bigger \u2014 ecological, humanitarian, evolutionary. Environments driven purely by metrics feel like they\u2019re missing the point.",
    relationships: "Your relationships have a quality of depth that can be hard to explain. You feel connected to people not just emotionally but almost spiritually. You sense what others are feeling before they say it. This is a gift that can also be a burden \u2014 you absorb more than most people realise.",
    politics: "Politically, you see the whole spiral. You understand why each lens exists and what it\u2019s responding to. This gives you compassion for positions you disagree with, but it can also make you feel like an outsider in every political conversation \u2014 connected to all of it, at home in none of it.",
    conflict: "Under pressure, you tend to zoom out. Way out. You see the conflict as part of a larger pattern, which gives you perspective but can frustrate people who need you to engage with the particular, messy, human details. Your challenge is to bring your expansive awareness into the room, not above it.",
    meaning: "Meaning, for you, is everywhere. In the interconnection of all things. In the feeling of being part of something vast and intelligent that you can sense but can\u2019t quite name. You don\u2019t need meaning to be proven \u2014 you experience it directly.",
    change: "You see change as the natural rhythm of living systems. Nothing stays fixed. Everything is in process. This gives you a rare equanimity \u2014 but it can also make you seem detached from the urgency that others feel. Your edge is learning to honour both the eternal view and the urgent one.",
  },
};

// ── Stress Regression Narratives ─────────────────────────────────────────────
// What it looks like when someone regresses to this lens under stress.
// Used when the Deep Assessment detects a significant gap between
// centre of gravity and conflict-domain dominant lens.

export const STRESS_NARRATIVES: Record<LensSlug, string> = {
  beige:
    "Under real pressure, you tend to go into survival mode. Your body takes over \u2014 fight, flight, or freeze. The sophisticated frameworks you normally use get sidelined in favour of a more primal question: am I safe? This isn\u2019t regression in a bad sense \u2014 it\u2019s your deepest protective intelligence. But it can surprise the people around you who are used to seeing you at your best.",

  purple:
    "When things fall apart, you reach for your people. The independence and analytical clarity you usually bring gives way to a deep need for belonging and reassurance. You want to know your tribe is intact. You might seek comfort in familiar rituals or routines that feel like home. This is your anchor \u2014 just notice when the anchor becomes a cage.",

  red:
    "Under pressure, a fiercer version of you shows up. You get direct, decisive, even aggressive. The patience and nuance you normally bring gets compressed into action \u2014 someone needs to take charge, and it\u2019s going to be you. This can be exactly what a crisis needs. But it can also damage relationships when the crisis passes and people remember how you made them feel.",

  blue:
    "When you\u2019re stressed, you tighten the rules. The flexibility you normally allow yourself contracts into a rigid need for structure, protocol, and clear right-and-wrong answers. You reach for the framework \u2014 any framework \u2014 that will make the uncertainty feel manageable. This creates stability, but it can make you brittle when the situation doesn\u2019t fit the playbook.",

  orange:
    "Under stress, you go into problem-solving overdrive. Emotions get compartmentalised, relationships get deprioritised, and your entire focus narrows to \u2018fix the thing.\u2019 You work harder, think faster, and push through. This is effective in the short term, but it can leave the people around you feeling like problems to be solved rather than people to be with.",

  green:
    "When things get hard, you dissolve into the group. Your individual clarity gives way to a need for consensus, for everyone to be okay, for harmony at any cost. You may struggle to make tough decisions because someone will be hurt. This is your compassion under pressure \u2014 just notice when compassion becomes paralysis.",

  yellow:
    "Under pressure, you retreat into your head. You analyse the situation from every angle, map the system, consider the perspectives \u2014 but you stop participating emotionally. Others may experience you as detached or cold when really you\u2019re trying to understand. The gap between your thinking and your feeling widens, and that gap is exactly where connection lives.",

  turquoise:
    "When stressed, you may float above the situation entirely. The holistic perspective that normally serves you becomes a way of avoiding the messy, particular, human reality of what\u2019s happening. You know everything is connected, but in the moment of crisis, people need you here \u2014 not in the cosmos.",
};
