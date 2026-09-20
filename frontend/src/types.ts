export interface Effect {
  rights: number;
  risk: number;
}

export interface Choice {
  id: string;
  label: string;
  effect: Effect;
  next: string;
  reveal?: string;
}

export interface Node {
  id: string;
  kind: "document" | "moment" | "ending";
  eyebrow: string;
  title: string;
  body: string[];
  choices?: Choice[];
  ending?: "good" | "mixed" | "bad";
}

export interface ScenarioPack {
  id: string;
  title: string;
  tagline: string;
  startNode: string;
  role: "landlord" | "officer" | "agent" | "employer" | "administrator";
  nodes: Record<string, Node>;
  sources: string[];
  takeaways: string[];
}
