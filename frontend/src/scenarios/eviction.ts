import type { ScenarioPack } from "../types";

export const evictionPack: ScenarioPack = {
  id: "eviction",
  title: "The Notice",
  role: "landlord",
  tagline: "A pay-or-quit notice just showed up on your door. What you do in the next ten minutes matters more than you'd think.",
  startNode: "notice",
  sources: [
    "General patterns drawn from publicly available tenant-rights guidance published by legal aid organizations and state consumer-protection agencies.",
    "Specifics — cure periods, notice periods, court procedure — vary significantly by state and locality. This tool teaches the shape of the process, not your local rules.",
    "This is educational content, not legal advice. Before acting on a real notice, contact a local legal aid organization or tenant rights clinic.",
  ],
  takeaways: [
    "Never ignore a notice or a court summons, even if you're planning to move anyway.",
    "Get everything in writing. Keep dated copies of payments, texts, and letters.",
    "A landlord generally cannot change your locks or remove your belongings without a court order — this is often called an illegal 'self-help' eviction.",
    "Serious unaddressed repair problems (no heat, mold, broken locks) can sometimes factor into your case. Ask a legal aid attorney whether it applies to you.",
    "Contact a free local legal aid or tenant hotline as early as possible. The earlier you reach out, the more options you still have.",
  ],
  nodes: {
    notice: {
      id: "notice",
      kind: "document",
      eyebrow: "Taped to your door, 6:40pm",
      title: "PAY RENT OR QUIT",
      body: [
        "You are hereby notified that you are in default for non-payment of rent in the amount of $1,450.00.",
        "You have THREE (3) DAYS from service of this notice to pay the amount due in full, or to vacate and surrender the premises.",
        "Failure to comply may result in legal proceedings to recover possession.",
      ],
      choices: [
        {
          id: "pay-cash",
          label: "Pay it tonight, in cash, no receipt",
          effect: { rights: -15, risk: 10 },
          next: "lockout",
        },
        {
          id: "pay-documented",
          label: "Pay it, but demand a dated, signed receipt",
          effect: { rights: 15, risk: -5 },
          next: "lockout",
        },
        {
          id: "ignore",
          label: "Ignore it — probably nothing",
          effect: { rights: -20, risk: 25 },
          next: "summons",
        },
        {
          id: "hotline",
          label: "Call a free tenant rights hotline before doing anything",
          effect: { rights: 20, risk: -15 },
          next: "hotline-call",
        },
      ],
    },

    "hotline-call": {
      id: "hotline-call",
      kind: "moment",
      eyebrow: "Phone call, 7:15pm",
      title: "\"Don't pay in cash without a receipt, and don't assume the clock started when you think it did.\"",
      body: [
        "The volunteer on the line walks you through it: confirm exactly when the notice counts as delivered, put any payment or dispute in writing, and keep copies of everything from tonight forward.",
        "She also flags something you hadn't thought about — if anything in the unit has been broken for a while and unaddressed, that history might matter later.",
      ],
      choices: [
        {
          id: "write-letter",
          label: "Write a dated letter tonight confirming your side of events",
          effect: { rights: 10, risk: -5 },
          next: "court",
        },
      ],
    },

    lockout: {
      id: "lockout",
      kind: "moment",
      eyebrow: "The next afternoon",
      title: "Your key doesn't work anymore",
      body: [
        "The locks have been changed. Your things are still inside. There's no notice on the door, no paperwork — just a lock that used to be yours.",
      ],
      choices: [
        {
          id: "assume-fault",
          label: "Assume you did something wrong and find a hotel",
          effect: { rights: -20, risk: 15 },
          next: "court",
        },
        {
          id: "call-police",
          label: "Call the non-emergency police line and document everything",
          effect: { rights: 20, risk: -10 },
          reveal: "In most states, a landlord changing your locks without a court order is illegal — often called a 'self-help' eviction, regardless of what the notice said.",
          next: "court",
        },
        {
          id: "break-in",
          label: "Force the door open to get your things",
          effect: { rights: -10, risk: 25 },
          reveal: "Even when you're in the right about the lockout, this can turn into a trespassing complaint against you — it muddies a case that was otherwise clearly in your favor.",
          next: "court",
        },
      ],
    },

    summons: {
      id: "summons",
      kind: "document",
      eyebrow: "Posted on your door, 9 days later",
      title: "SUMMONS AND COMPLAINT — UNLAWFUL DETAINER",
      body: [
        "You are named as Defendant in an action to recover possession of the premises.",
        "You must file a written response with the court within FIVE (5) DAYS or a default judgment may be entered against you without further notice.",
        "Hearing date set: 10 days from service.",
      ],
      choices: [
        {
          id: "throw-away",
          label: "Set it aside — you'll deal with it eventually",
          effect: { rights: -30, risk: 30 },
          next: "ending-default",
        },
        {
          id: "unprepared-hearing",
          label: "Plan to show up on the hearing date, no response filed",
          effect: { rights: -5, risk: 10 },
          next: "court",
        },
        {
          id: "legal-aid-summons",
          label: "Call a legal aid clinic today to help file a response",
          effect: { rights: 20, risk: -10 },
          next: "court",
        },
      ],
    },

    court: {
      id: "court",
      kind: "moment",
      eyebrow: "Days before the hearing",
      title: "You're preparing your side of the story",
      body: [
        "Whatever brought you here, there's still a case to make. What you bring — and don't bring — to this stage tends to decide how it ends.",
      ],
      choices: [
        {
          id: "organize-docs",
          label: "Organize every receipt, text, and letter you have",
          effect: { rights: 20, risk: -10 },
          next: "ending-good",
        },
        {
          id: "raise-habitability",
          label: "Raise the unresolved repair issues as part of your case",
          effect: { rights: 15, risk: -5 },
          reveal: "A unit's condition can sometimes be legally relevant to a case like this — it's worth asking a legal aid attorney whether it applies to you specifically.",
          next: "ending-good",
        },
        {
          id: "say-nothing",
          label: "Say as little as possible and hope it goes fine",
          effect: { rights: -10, risk: 15 },
          next: "ending-mixed",
        },
        {
          id: "no-show",
          label: "Skip the hearing — it feels pointless now",
          effect: { rights: -25, risk: 25 },
          next: "ending-default",
        },
      ],
    },

    "ending-good": {
      id: "ending-good",
      kind: "ending",
      ending: "good",
      eyebrow: "Outcome",
      title: "You showed up prepared",
      body: [
        "You responded, documented everything, and got help early enough for it to matter. Cases like this often end in a dismissal, a payment plan, or a reversed lockout — not because the system is generous, but because you gave it something to work with.",
      ],
    },

    "ending-mixed": {
      id: "ending-mixed",
      kind: "ending",
      ending: "mixed",
      eyebrow: "Outcome",
      title: "You made it through, but on worse terms than you had to",
      body: [
        "You didn't lose everything — but you gave up leverage you didn't know you had. A little more documentation, a little earlier, and this could have gone differently.",
      ],
    },

    "ending-default": {
      id: "ending-default",
      kind: "ending",
      ending: "bad",
      eyebrow: "Outcome",
      title: "Default judgment entered against you",
      body: [
        "Because no response was filed and no one appeared, the court ruled without ever hearing your side. This is one of the most common — and most avoidable — ways eviction cases are lost: not on the facts, but on a missed deadline.",
      ],
    },
  },
};
