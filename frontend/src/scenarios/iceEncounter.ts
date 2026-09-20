import type { ScenarioPack } from "../types";

export const iceEncounterPack: ScenarioPack = {
  id: "ice-encounter",
  title: "The Knock",
  role: "agent",
  tagline: "There's a knock at the door, and someone says they're from immigration enforcement. What you say next matters, regardless of your situation.",
  startNode: "door",
  sources: [
    "General patterns reflect constitutional rights that apply in the United States to everyone present, regardless of immigration status, as commonly published by civil liberties and immigrant rights organizations (for example, the ACLU's widely distributed know-your-rights guidance).",
    "Immigration law and enforcement procedure are complex, high-stakes, and can change. This pack does not cover status-specific outcomes, forms, or defenses — only the general shape of the encounter itself.",
    "This is educational content only. It is not legal advice and does not create an attorney-client relationship. If you or someone you know is facing an actual immigration enforcement matter, contact an immigration attorney or a local immigrant legal defense organization as soon as possible.",
  ],
  takeaways: [
    "You generally do not have to open your door without a judicial warrant signed by a judge — an administrative warrant (such as a Form I-200) is not the same thing and does not grant that authority.",
    "You can ask to see any document clearly, and check whether it's signed by a judge, before deciding how to respond.",
    "You have the right to remain silent and the right to ask for a lawyer, regardless of immigration status.",
    "You don't have to sign anything you don't fully understand. It's generally safer to ask to speak with a lawyer before signing.",
    "Write down everything as soon as it's over: names, badge numbers, exact words used, and anything you signed.",
    "If this happens for real, contact an immigration attorney or a local immigrant legal defense organization as soon as possible.",
  ],
  nodes: {
    door: {
      id: "door",
      kind: "moment",
      eyebrow: "A knock, early morning",
      title: "Someone at the door says they're with immigration enforcement",
      body: [
        "Through the window, you can see there's more than one person. One of them says they need to come in.",
      ],
      choices: [
        {
          id: "open-immediately",
          label: "Open the door right away",
          effect: { rights: -20, risk: 10 },
          next: "warrant",
        },
        {
          id: "keep-closed-ask-warrant",
          label: "Keep the door closed and ask them to hold any warrant up to the window or slide it under the door",
          effect: { rights: 25, risk: -10 },
          next: "warrant",
          reveal: "You generally have the right to not open the door. A judicial warrant, signed by a judge, is required for agents to enter without your consent — an administrative warrant is not the same thing.",
        },
        {
          id: "ask-through-door",
          label: "Ask through the door what they want, without opening it",
          effect: { rights: 15, risk: -5 },
          next: "warrant",
        },
        {
          id: "stay-silent-inside",
          label: "Stay quiet and don't respond at all",
          effect: { rights: 0, risk: 5 },
          next: "warrant",
        },
      ],
    },

    warrant: {
      id: "warrant",
      kind: "moment",
      eyebrow: "A moment later",
      title: "They hold up a piece of paper",
      body: [
        "It's hard to tell from here what it actually is.",
      ],
      choices: [
        {
          id: "assume-must-comply",
          label: "Assume any paper means you have to open up",
          effect: { rights: -20, risk: 10 },
          next: "questions",
          reveal: "Not every document is a judicial warrant. It's fine to ask to see it clearly and check whether a judge signed it before deciding anything.",
        },
        {
          id: "ask-to-see-clearly",
          label: "Ask to see it clearly, and check whether it's signed by a judge",
          effect: { rights: 20, risk: -5 },
          next: "questions",
        },
        {
          id: "refuse-and-argue",
          label: "Refuse to look at anything and start arguing loudly",
          effect: { rights: -10, risk: 20 },
          next: "questions",
        },
      ],
    },

    questions: {
      id: "questions",
      kind: "moment",
      eyebrow: "Questions start",
      title: "\"Do you have identification? Where were you born?\"",
      body: [
        "The questions are coming quickly now.",
      ],
      choices: [
        {
          id: "answer-everything",
          label: "Answer every question in full",
          effect: { rights: -15, risk: 5 },
          next: "closing",
        },
        {
          id: "invoke-silence-lawyer",
          label: "Say calmly, \"I am going to remain silent, and I want to speak to a lawyer\"",
          effect: { rights: 25, risk: -10 },
          next: "closing",
        },
        {
          id: "show-rights-card",
          label: "Show a know-your-rights card, if you have one, without speaking further",
          effect: { rights: 20, risk: -10 },
          next: "closing",
          reveal: "A written rights card communicates the same thing as saying it aloud — some people find it easier to hand over than to say clearly under pressure.",
        },
        {
          id: "sign-to-end-it",
          label: "Sign whatever document they hand you, just to end the encounter faster",
          effect: { rights: -25, risk: 5 },
          next: "closing",
          reveal: "Signing something you don't fully understand can waive rights you didn't mean to give up. It's generally safer to ask for a lawyer before signing anything.",
        },
      ],
    },

    closing: {
      id: "closing",
      kind: "moment",
      eyebrow: "Afterward",
      title: "The encounter is ending, one way or another",
      body: [
        "Whatever just happened, it's happening fast, and it's easy to forget the details once the adrenaline fades.",
      ],
      choices: [
        {
          id: "write-it-down",
          label: "Write down everything immediately — names, badge numbers, exact words, anything signed",
          effect: { rights: 20, risk: -10 },
          next: "ending-good",
        },
        {
          id: "call-family-first",
          label: "Call a family member first, before writing anything down",
          effect: { rights: 0, risk: 0 },
          next: "ending-mixed",
        },
        {
          id: "say-nothing-after",
          label: "Say nothing to anyone and don't write anything down, hoping it resolves itself",
          effect: { rights: -20, risk: 15 },
          next: "ending-bad",
        },
      ],
    },

    "ending-good": {
      id: "ending-good",
      kind: "ending",
      ending: "good",
      eyebrow: "Outcome",
      title: "You held onto your rights, and you kept a record",
      body: [
        "Regardless of how the encounter itself went, you exercised well-established rights — the right to see a real warrant, the right to remain silent, the right not to sign something blind — and you documented it right away. If anything about this needs to go to an immigration attorney afterward, there's something concrete to bring them.",
      ],
    },

    "ending-mixed": {
      id: "ending-mixed",
      kind: "ending",
      ending: "mixed",
      eyebrow: "Outcome",
      title: "It's handled, but the details are already going soft",
      body: [
        "Reaching out to family first is a completely understandable instinct — but by the time the details get written down, some of them are usually already gone.",
      ],
    },

    "ending-bad": {
      id: "ending-bad",
      kind: "ending",
      ending: "bad",
      eyebrow: "Outcome",
      title: "Nothing was written down, and nothing was said",
      body: [
        "What happened is real either way — but without a record and without telling anyone, there's nothing left afterward for a lawyer, a family member, or anyone else to work with.",
      ],
    },
  },
};
