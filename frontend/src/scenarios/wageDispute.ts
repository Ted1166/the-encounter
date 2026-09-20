import type { ScenarioPack } from "../types";

export const wageDisputePack: ScenarioPack = {
  id: "wage-dispute",
  title: "The Shortfall",
  role: "employer",
  tagline: "Your paycheck came up short again. What you do about it from here decides whether that money comes back.",
  startNode: "paycheck",
  sources: [
    "General patterns drawn from widely published wage-and-hour guidance from state labor agencies and worker rights organizations.",
    "Specific overtime rules, filing deadlines, and complaint procedures vary by state and by job classification. This pack teaches the shape of a wage dispute, not your state's exact rules.",
    "Educational content, not legal advice. Contact your state labor department or a workers' rights legal aid clinic for your specific situation.",
  ],
  takeaways: [
    "Keep your own record of hours worked, separate from your employer's system, starting the moment something looks off.",
    "Ask for corrections and policies in writing — a verbal explanation is hard to reference later.",
    "Most states have a labor agency that handles wage complaints for free, without requiring a lawyer.",
    "A public confrontation can feel satisfying but tends to make a documented dispute look personal instead of factual.",
    "Retaliation for raising a good-faith wage concern is generally illegal in the US — if your hours or treatment change right after you speak up, that's worth mentioning to whoever you file with.",
  ],
  nodes: {
    paycheck: {
      id: "paycheck",
      kind: "document",
      eyebrow: "Payday, 9:02am",
      title: "YOUR PAY IS SHORT $340",
      body: [
        "Direct deposit hit this morning. Doing the math against your own hours, it's about eight hours of overtime missing — again.",
      ],
      choices: [
        {
          id: "let-it-slide",
          label: "Let it slide — don't want to make waves",
          effect: { rights: -20, risk: 10 },
          next: "confront",
        },
        {
          id: "ask-corrected",
          label: "Calmly ask your manager for a corrected pay stub",
          effect: { rights: 15, risk: -5 },
          next: "confront",
        },
        {
          id: "threaten-quit",
          label: "Immediately threaten to quit on the spot",
          effect: { rights: -10, risk: 20 },
          next: "confront",
        },
        {
          id: "start-tracking",
          label: "Start writing down your own hours worked, every day, from now on",
          effect: { rights: 20, risk: -10 },
          next: "confront",
        },
      ],
    },

    confront: {
      id: "confront",
      kind: "moment",
      eyebrow: "Later that day",
      title: "\"That's just how we round hours here — everyone deals with it.\"",
      body: [
        "Your manager doesn't seem worried about it.",
      ],
      choices: [
        {
          id: "accept-it",
          label: "Accept it and stop bringing it up",
          effect: { rights: -15, risk: 0 },
          next: "decision",
        },
        {
          id: "request-writing",
          label: "Ask for the rounding policy in writing and request a correction",
          effect: { rights: 20, risk: -5 },
          next: "decision",
          reveal: "Wage-and-hour rules generally require accurate payment for all hours actually worked. Asking for the policy in writing creates a paper trail either way.",
        },
        {
          id: "threaten-report",
          label: "Threaten to report them right there in the moment",
          effect: { rights: -5, risk: 20 },
          next: "decision",
        },
      ],
    },

    decision: {
      id: "decision",
      kind: "moment",
      eyebrow: "Two more paychecks later",
      title: "The math still doesn't add up",
      body: [
        "The shortfall hasn't been fixed, and it's starting to add up to real money.",
      ],
      choices: [
        {
          id: "file-complaint",
          label: "File a wage complaint with your state labor department",
          effect: { rights: 25, risk: -5 },
          next: "ending-good",
          reveal: "Most states have a labor agency that investigates wage complaints for free, without requiring you to hire a lawyer.",
        },
        {
          id: "legal-aid-letter",
          label: "Ask a workers' rights legal aid clinic to help draft a demand letter",
          effect: { rights: 20, risk: -5 },
          next: "ending-good",
        },
        {
          id: "quiet-job-search",
          label: "Say nothing and quietly start looking for a new job",
          effect: { rights: -10, risk: 5 },
          next: "ending-mixed",
        },
        {
          id: "public-confrontation",
          label: "Confront your boss publicly in front of coworkers",
          effect: { rights: -20, risk: 25 },
          next: "ending-bad",
          reveal: "It can feel satisfying in the moment, but it tends to make a documented, factual dispute look like a personal grievance instead — which rarely helps the actual claim.",
        },
      ],
    },

    "ending-good": {
      id: "ending-good",
      kind: "ending",
      ending: "good",
      eyebrow: "Outcome",
      title: "You built a record, and you used it",
      body: [
        "You tracked your own hours, asked for things in writing, and eventually took it to someone whose job is to sort exactly this out. Cases like this often end in back pay — not because employers volunteer it, but because there's finally a paper trail to point to.",
      ],
    },

    "ending-mixed": {
      id: "ending-mixed",
      kind: "ending",
      ending: "mixed",
      eyebrow: "Outcome",
      title: "You moved on, but the money didn't come with you",
      body: [
        "Leaving quietly avoided a confrontation, but it also means the shortfall becomes very hard to recover once you're gone and the trail goes cold.",
      ],
    },

    "ending-bad": {
      id: "ending-bad",
      kind: "ending",
      ending: "bad",
      eyebrow: "Outcome",
      title: "The dispute became a scene, not a case",
      body: [
        "What started as a legitimate pay discrepancy turned into a public argument. It's harder for anyone reviewing this later to see a documented wage claim underneath the confrontation.",
      ],
    },
  },
};
