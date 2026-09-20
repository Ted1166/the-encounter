import type { Choice, ScenarioPack } from "./types";

export interface EngineState {
  nodeId: string;
  rights: number;
  risk: number;
  path: { nodeId: string; choiceId: string }[];
}

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function initState(pack: ScenarioPack): EngineState {
  return { nodeId: pack.startNode, rights: 50, risk: 20, path: [] };
}

export function applyChoice(state: EngineState, choice: Choice): EngineState {
  return {
    nodeId: choice.next,
    rights: clamp(state.rights + choice.effect.rights),
    risk: clamp(state.risk + choice.effect.risk),
    path: [...state.path, { nodeId: state.nodeId, choiceId: choice.id }],
  };
}

export function currentNode(pack: ScenarioPack, state: EngineState) {
  return pack.nodes[state.nodeId];
}
