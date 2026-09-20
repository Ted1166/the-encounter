import type { ScenarioPack } from "../types";

export const trafficStopPack: ScenarioPack = {
  id: "traffic-stop",
  title: "The Stop",
  tagline: "Red and blue lights in your mirror. What you say in the next two minutes shapes everything that follows.",
  startNode: "stop",
  sources: [
    "General patterns drawn from widely published know-your-rights guidance for traffic stops, including materials from the ACLU and similar civil liberties organizations.",
    "This pack is US-centric and reflects general constitutional principles (the right to remain silent, the right to decline a consent search). Specific state laws — including 'stop and identify' statutes and recording rights — vary and are not covered here.",
    "This is educational content, not legal advice. It does not prepare you for every situation, and officer conduct in the moment can vary from what the law technically allows.",
  ],
  takeaways: [
    "You're generally required to provide license, registration, and proof of insurance when asked.",
    "Beyond that, you can calmly say you're choosing to remain silent — you don't have to explain, argue, or answer further questions.",
    "You can decline to consent to a search out loud. Saying so preserves the objection even if the officer proceeds anyway — never physically resist or block, even if you believe it's unlawful. Courts are where an unlawful search gets challenged, not the roadside.",
    "You can ask, \"Am I being detained, or am I free to go?\" to try to clarify whether the stop has ended — though the officer isn't always required to answer directly.",
    "Keep your hands visible and narrate significant movements — like reaching for your registration — before you make them.",
    "As soon as it's over, write down everything you remember: time, location, badge number, exact words used. Memory fades fast.",
  ],
  nodes: {
    stop: {
      id: "stop",
      kind: "moment",
      eyebrow: "Red and blue lights, dusk",
      title: "\"License, registration, and proof of insurance, please.\"",
      body: [
        "The officer is standing at your window. Your hands are still on the wheel.",
      ],
      choices: [
        {
          id: "silent-freeze",
          label: "Stay frozen, hands on the wheel, say nothing at all",
          effect: { rights: -5, risk: 15 },
          next: "question",
        },
        {
          id: "hand-over",
          label: "Hand the documents over right away, no comment",
          effect: { rights: 10, risk: -5 },
          next: "question",
        },
        {
          id: "narrate",
          label: "Say \"I'm reaching for my registration in the glove box now\" before you move",
          effect: { rights: 20, risk: -15 },
          next: "question",
          reveal: "Narrating movements before you make them, especially near the glove box or your pockets, reduces the chance a routine motion is misread.",
        },
        {
          id: "ask-why",
          label: "Ask why you were stopped before doing anything else",
          effect: { rights: 5, risk: 5 },
          next: "question",
        },
      ],
    },

    question: {
      id: "question",
      kind: "moment",
      eyebrow: "A moment later",
      title: "\"Do you know why I pulled you over? Have you had anything to drink tonight?\"",
      body: [
        "The questions have moved past the stop itself.",
      ],
      choices: [
        {
          id: "overshare",
          label: "Answer everything honestly and explain the full story",
          effect: { rights: -15, risk: 10 },
          next: "search-request",
          reveal: "Anything you say can become part of the record. You don't have to fill a silence.",
        },
        {
          id: "invoke-silence",
          label: "Say \"I'm choosing to exercise my right to remain silent\" and offer nothing further",
          effect: { rights: 20, risk: -10 },
          next: "search-request",
        },
        {
          id: "argue",
          label: "Argue that the stop itself is unfair",
          effect: { rights: -15, risk: 20 },
          next: "search-request",
          reveal: "A traffic stop is rarely the place that argument gets won — and pressing it tends to raise the temperature rather than resolve anything.",
        },
        {
          id: "polite-decline",
          label: "Stay polite, but decline to answer beyond what's required",
          effect: { rights: 15, risk: -5 },
          next: "search-request",
        },
      ],
    },

    "search-request": {
      id: "search-request",
      kind: "moment",
      eyebrow: "The ask",
      title: "\"Mind if I take a look in your trunk?\"",
      body: [
        "There's a pause. The question is sitting there, waiting on an answer.",
      ],
      choices: [
        {
          id: "consent",
          label: "Say \"Sure, go ahead\"",
          effect: { rights: -20, risk: -5 },
          next: "outcome",
        },
        {
          id: "decline-verbally",
          label: "Say \"I do not consent to a search,\" without physically resisting if they proceed anyway",
          effect: { rights: 25, risk: -5 },
          next: "outcome",
          reveal: "You generally have the right to decline a consent search. Saying so out loud preserves that objection even if the officer searches anyway — the moment to fight it is in court, not at the roadside.",
        },
        {
          id: "block-trunk",
          label: "Physically stand in front of the trunk to stop them",
          effect: { rights: -10, risk: 30 },
          next: "ending-resisted",
          reveal: "Physically blocking or resisting, even over a legitimate objection, tends to create a new, separate problem on top of the original one.",
        },
        {
          id: "ask-detained",
          label: "Ask \"Am I being detained, or am I free to go?\"",
          effect: { rights: 15, risk: 0 },
          next: "outcome",
        },
      ],
    },

    outcome: {
      id: "outcome",
      kind: "moment",
      eyebrow: "Minutes later",
      title: "The stop is winding down",
      body: [
        "A ticket, a warning, or nothing at all — either way, it's almost over. What you do in the next few minutes decides whether tonight is recoverable information or just a bad memory.",
      ],
      choices: [
        {
          id: "write-down",
          label: "Write down everything you remember right away — time, badge number, exact words",
          effect: { rights: 20, risk: -10 },
          next: "ending-good",
        },
        {
          id: "forget-it",
          label: "Try to just put it behind you",
          effect: { rights: -10, risk: 5 },
          next: "ending-mixed",
        },
        {
          id: "vent-online",
          label: "Post about it online immediately, before writing anything down",
          effect: { rights: -5, risk: 10 },
          next: "ending-mixed",
        },
      ],
    },

    "ending-good": {
      id: "ending-good",
      kind: "ending",
      ending: "good",
      eyebrow: "Outcome",
      title: "You stayed composed, and you kept the record",
      body: [
        "You gave what was required, held the line on what wasn't, and wrote it all down while it was fresh. If anything about tonight needs to be raised later, you actually have something to raise it with.",
      ],
    },

    "ending-mixed": {
      id: "ending-mixed",
      kind: "ending",
      ending: "mixed",
      eyebrow: "Outcome",
      title: "It's over, but the details are already fading",
      body: [
        "Nothing went badly wrong tonight — but a week from now, the exact words and the order things happened in will be a lot harder to reconstruct than they are right now.",
      ],
    },

    "ending-resisted": {
      id: "ending-resisted",
      kind: "ending",
      ending: "bad",
      eyebrow: "Outcome",
      title: "A disagreement became a charge",
      body: [
        "What started as an objection to a search turned into an obstruction charge, because the objection became physical. The underlying question — whether the search itself was lawful — is exactly the kind of thing courts exist to sort out. This wasn't.",
      ],
    },
  },
};
