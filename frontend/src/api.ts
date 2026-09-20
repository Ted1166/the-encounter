const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8787";

export interface NodeStats {
  total: number;
  choices: Record<string, number>;
}

export async function recordChoice(scenario: string, nodeId: string, choiceId: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/choice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario, nodeId, choiceId }),
    });
  } catch {
    // offline or backend not deployed yet - the game still works, just without live stats
  }
}

export async function getNodeStats(scenario: string, nodeId: string): Promise<NodeStats | null> {
  try {
    const res = await fetch(`${API_BASE}/api/stats/${scenario}/${nodeId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
