# The Encounter

An interactive branching simulator for high-stakes civic moments. Five packs so far:
- **The Notice** - a pay-or-quit eviction scenario.
- **The Stop** - a traffic stop, from the first request for your documents through a request to search your car.
- **The Shortfall** - a wage dispute, from a short paycheck through filing a labor complaint.
- **The Hearing** - a campus academic-integrity hearing, from the notice email through the hearing itself.
- **The Knock** - an ICE encounter, covering constitutional rights that apply regardless of immigration status.

You make the calls a real person has to make in real time. Two live dials (Rights Preserved / Escalation Risk) track the consequences as you go, a reactive illustration shows the other party growing calmer or more tense, and an optional voice-over reads each moment aloud. At the end you get a debrief, a numeric score, a takeaway checklist, and a look at what other players chose at each fork. Light and dark themes are both supported, toggleable in the top bar.

Built for LexHack 2026 - Access to Justice & Civic Tech track.

## Why this shape, not a chatbot

Most legal-tech hackathon entries are "ask an AI your legal question." This is a game: a fixed, vetted decision tree with real consequences and a live cross-player stats layer, so it's demonstrably not mocked — the aggregate numbers are real and grow as people actually play.

## Theme, voice-over, score, and the counterpart figure

- **Theme toggle** (top right, sun/moon icon): light and dark variants, both built from the same case-file design language rather than a generic dark-mode invert. Preference is saved in `localStorage`; it also respects system preference on first visit.
- **Voice-over toggle** (top right, speaker icon): reads each moment aloud using the browser's built-in `SpeechSynthesis` — no backend, no API cost, off by default so nothing plays unprompted.
- **Score**: shown on the ending screen, computed from final Rights Preserved, final Escalation Risk, and which ending you landed on (`computeScore` in `engine.ts`). It's a simple, transparent formula on purpose — the point is a comparable number across replays, not a hidden algorithm.
- **Counterpart figure**: a reactive silhouette illustration next to the meters, styled like a redacted photo in a case file. Its expression shifts across three tiers (calm / alert / tense) as Escalation Risk moves, and it carries a small role-specific badge icon (landlord, officer, employer, administrator, or agent) set per pack via the new `role` field on `ScenarioPack`.

## Important: how the legal content is sourced

There is no single authoritative public API for state-by-state tenant rights, wage law, campus conduct policy, or enforcement procedure, so every pack's content is **hand-written and vetted**, drawn from general patterns common across publicly available guidance — not generated live by an LLM and not scraped:
- Eviction: legal aid organizations and state consumer-protection agencies.
- Traffic stop and ICE encounter: the ACLU and similar civil liberties organizations, covering constitutional principles that apply regardless of citizenship or immigration status.
- Wage dispute: state labor agencies and worker rights organizations.
- Campus hearing: typical student conduct process structure as published in university handbooks.

Specifics vary by state, institution, and situation; each pack is deliberately written to teach the *shape* of the encounter rather than assert jurisdiction-specific rules as universal fact. The traffic stop and ICE encounter packs are explicitly flagged in their own sources as US-centric, and the ICE pack in particular repeats the "contact an immigration attorney" caveat given how high-stakes and fast-changing that area of law is. Every playthrough ends with:
- a sources note naming where the general pattern came from and stating the laws-vary caveat,
- an explicit "this is educational, not legal advice" statement,
- a plain-language takeaway checklist.

If you add more scenario packs, keep this discipline: write and vet the legal content by hand per pack, don't let a model free-generate legal claims, and disclose sourcing in the pack's `sources` array the same way.

## Project layout

```
the-encounter/
├── render.yaml                # Deploy blueprint: backend + frontend, auto-wired
├── frontend/                 # Vite + React + TypeScript (React Compiler)
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx             # Screen rendering, choice flow, theme + voice toggles, score
│   │   ├── App.css             # Case-file layout, gauges, counterpart figure, score badge
│   │   ├── index.css           # Reset + light/dark theme variables
│   │   ├── engine.ts           # Pure state machine: meters, path tracking, scoring
│   │   ├── api.ts              # Calls to the backend for live stats
│   │   ├── speech.ts           # Voice-over via the browser's SpeechSynthesis API
│   │   ├── CounterpartFigure.tsx  # Reactive silhouette illustration (pose driven by risk)
│   │   ├── types.ts
│   │   └── scenarios/
│   │       ├── eviction.ts       # "The Notice" pack's content and branches
│   │       ├── trafficStop.ts    # "The Stop" pack's content and branches
│   │       ├── wageDispute.ts    # "The Shortfall" pack's content and branches
│   │       ├── campusHearing.ts  # "The Hearing" pack's content and branches
│   │       └── iceEncounter.ts   # "The Knock" pack's content and branches
└── backend/                   # Minimal Express API for aggregate stats
    ├── server.js
    └── data/stats.json        # File-backed store - fine for a hackathon demo
```

## Running it locally

```
cd backend && npm install && npm start        # http://localhost:8787
cd frontend && npm install && npm run dev      # http://localhost:5173
```

## Deploying for submission

You need a real "working link." A `render.yaml` blueprint is included at the repo root and wires the two services together automatically — this was verified against Render's current blueprint syntax (`fromService.envVarKey: RENDER_EXTERNAL_URL`) before being written here, not guessed.

1. Push this repo to GitHub (public, since that's also a submission requirement).
2. In the Render dashboard: **New → Blueprint**, pick your repo. Render reads `render.yaml` and shows two services: `the-encounter-backend` (Node web service) and `the-encounter-frontend` (static site).
3. Click **Apply**. The backend deploys first; the frontend's `VITE_API_BASE` is populated automatically from the backend's live URL via the blueprint's `fromService` link — no manual env var copying.
4. Once both are live, open the frontend URL and play through both packs once to confirm `/api/choice` and `/api/stats/...` are reachable (check the browser Network tab if the stats panel doesn't appear after a choice).
5. Put the frontend URL and the repo link in your Devpost submission.

Two things worth knowing about the free tier before a live judging session:
- Render's free web services spin down after inactivity and take a few seconds to wake back up on the first request — if you're demoing live, hit the backend URL once a minute or two beforehand to warm it up.
- The backend's JSON-file store (`backend/data/stats.json`) resets whenever the free-tier instance restarts or redeploys, since there's no persistent disk on that plan. Fine for a hackathon demo; swap in a real database (Render Postgres, or any hosted DB) before relying on this past the event.

If you'd rather deploy manually instead of via Blueprint: backend to Render/Railway/Fly, frontend to Vercel/Netlify, with `VITE_API_BASE` set to the deployed backend's URL before building the frontend.

## Adding a new scenario pack

1. Add a new file under `frontend/src/scenarios/`, following the shape in `eviction.ts` — a start node, a graph of `document`/`moment` nodes with choices, and one or more `ending` nodes. Pick a `role` (`landlord` | `officer` | `agent` | `employer` | `administrator`) or add a new one and a matching icon case in `CounterpartFigure.tsx`.
2. Hand-write and vet the content per the sourcing discipline above.
3. Add it to the `packs` array near the top of `App.tsx` — it'll show up automatically on the scenario-picker screen.
4. Validate the graph before shipping it: a start node that exists, every choice's `next` pointing at a real node id, every node reachable from the start, and at least two distinct endings. (This project's history has a small validation script for exactly this — worth re-running after any content edit.)
