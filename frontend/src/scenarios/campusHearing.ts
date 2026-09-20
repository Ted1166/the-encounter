import type { ScenarioPack } from "../types";

export const campusHearingPack: ScenarioPack = {
  id: "campus-hearing",
  title: "The Hearing",
  role: "administrator",
  tagline: "An email says you've been reported for an academic integrity violation. A hearing is in five days.",
  startNode: "email",
  sources: [
    "General patterns drawn from how student conduct and academic integrity processes are typically structured, as commonly published in university student handbooks.",
    "Specific procedures, timelines, and appeal rights vary significantly by institution. This pack teaches the shape of a conduct process, not your school's exact policy.",
    "Educational content, not legal or institutional advice. Check your own school's official conduct code for what actually applies to you.",
  ],
  takeaways: [
    "Ask for the specific policy and the specific complaint in writing if it isn't already clear what you're accused of.",
    "You're usually allowed an advisor or support person at the hearing — line one up early rather than the night before.",
    "Write a factual, dated timeline before the hearing and lean on it instead of improvising under pressure.",
    "Almost every conduct process has an appeal path. Ask what it is, even if you don't expect to need it.",
    "Ignoring a notice is usually treated as forfeiting your side of the story, not as the issue disappearing.",
  ],
  nodes: {
    email: {
      id: "email",
      kind: "document",
      eyebrow: "Inbox, 11:47pm",
      title: "NOTICE OF ALLEGED VIOLATION",
      body: [
        "You have been reported for an alleged violation of the Academic Integrity Policy.",
        "A hearing has been scheduled in five (5) days. You may bring an advisor or support person.",
      ],
      choices: [
        {
          id: "ignore-email",
          label: "Ignore it and hope it blows over",
          effect: { rights: -25, risk: 20 },
          next: "prep",
        },
        {
          id: "overexplain-reply",
          label: "Reply immediately at 1am, over-explaining everything in detail",
          effect: { rights: -10, risk: 10 },
          next: "prep",
        },
        {
          id: "request-policy",
          label: "Request a copy of the full complaint and the specific policy cited",
          effect: { rights: 20, risk: -10 },
          next: "prep",
          reveal: "Most student conduct processes require you to be told specifically what you're accused of and under which policy — ask for it in writing if it isn't already clear.",
        },
        {
          id: "line-up-advisor",
          label: "Ask if you can bring an advisor, and start lining one up",
          effect: { rights: 15, risk: -5 },
          next: "prep",
        },
      ],
    },

    prep: {
      id: "prep",
      kind: "moment",
      eyebrow: "The days before",
      title: "Preparing for the hearing",
      body: [
        "Five days felt like a lot until it didn't.",
      ],
      choices: [
        {
          id: "write-timeline",
          label: "Write a clear, factual, dated timeline of what actually happened",
          effect: { rights: 20, risk: -10 },
          next: "hearing",
        },
        {
          id: "emotional-appeal",
          label: "Prepare an emotional appeal instead of addressing the specific facts",
          effect: { rights: -10, risk: 10 },
          next: "hearing",
        },
        {
          id: "say-nothing-plan",
          label: "Decide you won't say anything at the hearing at all",
          effect: { rights: -15, risk: 15 },
          next: "hearing",
        },
        {
          id: "review-with-advisor",
          label: "Ask your advisor to review the evidence with you beforehand",
          effect: { rights: 15, risk: -5 },
          next: "hearing",
        },
      ],
    },

    hearing: {
      id: "hearing",
      kind: "moment",
      eyebrow: "In the hearing room",
      title: "The panel asks you to respond to the allegation",
      body: [
        "This is the part everything else was preparation for.",
      ],
      choices: [
        {
          id: "calm-refer",
          label: "Answer calmly and refer to your written timeline",
          effect: { rights: 20, risk: -10 },
          next: "ending-good",
        },
        {
          id: "get-defensive",
          label: "Get defensive and interrupt the panel",
          effect: { rights: -15, risk: 20 },
          next: "ending-bad",
        },
        {
          id: "say-little",
          label: "Say as little as possible and hope it's over quickly",
          effect: { rights: -5, risk: 5 },
          next: "ending-mixed",
        },
        {
          id: "ask-appeal",
          label: "Answer, then ask what happens next and how to appeal if needed",
          effect: { rights: 15, risk: 0 },
          next: "ending-good",
          reveal: "Nearly every conduct process has an appeal path — knowing what it is before you need it is worth the one extra question.",
        },
      ],
    },

    "ending-good": {
      id: "ending-good",
      kind: "ending",
      ending: "good",
      eyebrow: "Outcome",
      title: "You showed up prepared and asked the right questions",
      body: [
        "You knew exactly what you were accused of, brought support, and answered from a written record instead of memory under pressure. Whatever the panel decides, you gave your side a fair hearing on its own terms.",
      ],
    },

    "ending-mixed": {
      id: "ending-mixed",
      kind: "ending",
      ending: "mixed",
      eyebrow: "Outcome",
      title: "It's over, but your side barely got said",
      body: [
        "Saying little felt safer in the moment, but a hearing is exactly the place your side of the story is supposed to be heard — and it mostly wasn't.",
      ],
    },

    "ending-bad": {
      id: "ending-bad",
      kind: "ending",
      ending: "bad",
      eyebrow: "Outcome",
      title: "The hearing became about your conduct in the room",
      body: [
        "Getting defensive shifted the focus away from the facts of the case and onto how you handled the hearing itself — a second, avoidable problem stacked on top of the first.",
      ],
    },
  },
};
