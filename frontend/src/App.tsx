import { useState } from "react";
import "./App.css";
import { evictionPack } from "./scenarios/eviction";
import { trafficStopPack } from "./scenarios/trafficStop";
import { applyChoice, currentNode, initState, type EngineState } from "./engine";
import { getNodeStats, recordChoice, type NodeStats } from "./api";
import type { Choice, ScenarioPack } from "./types";

const packs: ScenarioPack[] = [evictionPack, trafficStopPack];

type Phase = "hub" | "intro" | "prompt" | "reveal" | "ending";

function Gauge({ label, value, tone }: { label: string; value: number; tone: "safe" | "danger" }) {
  const angle = -90 + (value / 100) * 180;
  return (
    <div className="gauge">
      <svg viewBox="0 0 120 70" className="gauge-svg">
        <path d="M10 65 A50 50 0 0 1 110 65" className="gauge-track" />
        <line
          x1="60"
          y1="65"
          x2="60"
          y2="20"
          className={`gauge-needle gauge-needle--${tone}`}
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <circle cx="60" cy="65" r="4" className="gauge-pivot" />
      </svg>
      <div className="gauge-label">{label}</div>
      <div className="gauge-value">{Math.round(value)}</div>
    </div>
  );
}

function Meters({ state }: { state: EngineState }) {
  return (
    <div className="meters">
      <Gauge label="Rights Preserved" value={state.rights} tone="safe" />
      <Gauge label="Escalation Risk" value={state.risk} tone="danger" />
    </div>
  );
}

function StatsPanel({ loading, stats, chosenId }: { loading: boolean; stats: NodeStats | null; chosenId: string }) {
  if (loading) return <p className="stats-loading">Checking what other players chose here...</p>;
  if (!stats || stats.total === 0) return null;

  const rows = Object.entries(stats.choices).sort((a, b) => b[1] - a[1]);
  return (
    <div className="stats">
      <p className="stats-caption">{stats.total} other players have reached this moment</p>
      {rows.map(([choiceId, count]) => {
        const pct = Math.round((count / stats.total) * 100);
        return (
          <div key={choiceId} className={`stat-row ${choiceId === chosenId ? "stat-row--yours" : ""}`}>
            <div className="stat-bar" style={{ width: `${pct}%` }} />
            <span className="stat-pct">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [pack, setPack] = useState<ScenarioPack | null>(null);
  const [engineState, setEngineState] = useState<EngineState | null>(null);
  const [phase, setPhase] = useState<Phase>("hub");
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);
  const [lastStats, setLastStats] = useState<NodeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  function handleSelectPack(selected: ScenarioPack) {
    setPack(selected);
    setEngineState(initState(selected));
    setPhase("intro");
  }

  async function handleChoice(nodeId: string, choice: Choice) {
    if (!pack || !engineState) return;
    setLastChoice(choice);
    setEngineState(applyChoice(engineState, choice));
    setPhase("reveal");
    setLastStats(null);
    setStatsLoading(true);

    recordChoice(pack.id, nodeId, choice.id);
    const stats = await getNodeStats(pack.id, nodeId);
    setLastStats(stats);
    setStatsLoading(false);
  }

  function handleContinue() {
    if (!pack || !engineState) return;
    const node = currentNode(pack, engineState);
    setPhase(node.kind === "ending" ? "ending" : "prompt");
  }

  function handleRestart() {
    if (!pack) return;
    setEngineState(initState(pack));
    setPhase("intro");
    setLastChoice(null);
    setLastStats(null);
  }

  function handleBackToHub() {
    setPack(null);
    setEngineState(null);
    setPhase("hub");
    setLastChoice(null);
    setLastStats(null);
  }

  const node = pack && engineState ? currentNode(pack, engineState) : null;

  return (
    <div className="page">
      <div className="wrap">
        <div className="folder-tab">
          {phase === "hub" ? "THE ENCOUNTER" : phase === "ending" ? "CASE CLOSED" : pack!.title.toUpperCase()}
        </div>

        {phase === "hub" && (
          <div className="case-card intro">
            <p className="eyebrow">The Encounter</p>
            <h1>Pick your scenario</h1>
            <p className="tagline">Every choice moves two dials: how many of your rights you keep, and how much you escalate. Nothing here is scripted to a single outcome.</p>
            <div className="pack-grid">
              {packs.map((p) => (
                <button key={p.id} className="pack-card" onClick={() => handleSelectPack(p)}>
                  <span className="pack-card-title">{p.title}</span>
                  <span className="pack-card-tagline">{p.tagline}</span>
                </button>
              ))}
            </div>
            <p className="fine-print">Educational simulation — not legal advice. Sources shown at the end of each playthrough.</p>
          </div>
        )}

        {phase === "intro" && pack && (
          <div className="case-card intro">
            <p className="eyebrow">The Encounter</p>
            <h1>{pack.title}</h1>
            <p className="tagline">{pack.tagline}</p>
            <button className="btn btn-primary" onClick={() => setPhase("prompt")}>
              Begin
            </button>
            <p className="fine-print">Educational simulation — not legal advice. See sources at the end.</p>
          </div>
        )}

        {phase === "prompt" && pack && engineState && node && (
          <div className="case-card">
            <Meters state={engineState} />
            <p className="eyebrow">{node.eyebrow}</p>
            <div className={`document ${node.kind === "document" ? "document--official" : ""}`}>
              <h2>{node.title}</h2>
              {node.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="choices">
              {node.choices?.map((choice) => (
                <button
                  key={choice.id}
                  className="btn btn-choice"
                  onClick={() => handleChoice(node.id, choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "reveal" && engineState && lastChoice && (
          <div className="case-card">
            <Meters state={engineState} />
            <p className="eyebrow">You chose</p>
            <div className="document">
              <h2>{lastChoice.label}</h2>
              {lastChoice.reveal && <p className="reveal-note">{lastChoice.reveal}</p>}
            </div>
            <StatsPanel loading={statsLoading} stats={lastStats} chosenId={lastChoice.id} />
            <div className="choices">
              <button className="btn btn-primary" onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        )}

        {phase === "ending" && pack && engineState && node && (
          <div className={`case-card ending--${node.ending}`}>
            <p className="eyebrow">{node.eyebrow}</p>
            <div className="document">
              <h2>{node.title}</h2>
              {node.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Meters state={engineState} />
            <h3>What to actually remember</h3>
            <ul className="takeaways">
              {pack.takeaways.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <h3>Where this came from</h3>
            <ul className="sources">
              {pack.sources.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div className="choices">
              <button className="btn btn-primary" onClick={handleRestart}>
                Play again
              </button>
              <button className="btn btn-choice" onClick={handleBackToHub}>
                Choose another scenario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
