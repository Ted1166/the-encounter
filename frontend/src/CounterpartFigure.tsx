import type { ScenarioPack } from "./types";

type Role = ScenarioPack["role"];
type Tier = "calm" | "alert" | "tense";

const browPaths: Record<Tier, string> = {
    calm: "M36 40 L47 36 M53 36 L64 40",
    alert: "M36 38 L47 38 M53 38 L64 38",
    tense: "M36 35 L47 41 M53 41 L64 35",
};

const tierLabels: Record<Tier, string> = {
    calm: "Calm",
    alert: "Alert",
    tense: "On edge",
};

function RoleBadge({ role }: { role: Role }) {
    switch (role) {
        case "officer":
            return (
                <polygon points="10,0 12.5,7 20,7 14,11.5 16,19 10,14.5 4,19 6,11.5 0,7 7.5,7" fill="currentColor" />
            );
        case "landlord":
            return (
                <g fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="10" r="5" />
                    <line x1="10.5" y1="13.5" x2="19" y2="19" />
                    <line x1="15" y1="15.5" x2="17" y2="13.5" />
                </g>
            );
        case "agent":
            return (
                <path
                    d="M10 0 L19 4 V11 C19 16 15 19 10 20 C5 19 1 16 1 11 V4 Z"
                    fill="currentColor"
                />
            );
        case "employer":
            return (
                <g fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="6" width="18" height="12" rx="2" />
                    <path d="M7 6V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
                </g>
            );
        case "administrator":
            return (
                <g fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="2" y="1" width="16" height="18" rx="1.5" />
                    <line x1="5.5" y1="6" x2="14.5" y2="6" />
                    <line x1="5.5" y1="10" x2="14.5" y2="10" />
                    <line x1="5.5" y1="14" x2="11" y2="14" />
                </g>
            );
    }
}

export function CounterpartFigure({ role, risk }: { role: Role; risk: number }) {
    const tier: Tier = risk >= 65 ? "tense" : risk >= 35 ? "alert" : "calm";

    return (
        <div className="counterpart">
            <svg viewBox="0 0 100 120" className={`counterpart-svg counterpart--${tier}`}>
                <rect x="4" y="4" width="92" height="112" rx="3" className="counterpart-frame" />
                <circle cx="50" cy="45" r="22" className="counterpart-shape" />
                <path d="M14 112 Q50 76 86 112 Z" className="counterpart-shape" />
                <path d={browPaths[tier]} className="counterpart-brow" />
                {tier === "tense" && (
                    <g className="tension-lines">
                        <line x1="22" y1="18" x2="14" y2="9" />
                        <line x1="78" y1="18" x2="86" y2="9" />
                    </g>
                )}
                <g className="counterpart-icon" transform="translate(72,90)">
                    <RoleBadge role={role} />
                </g>
            </svg>
            <div className="counterpart-caption">{tierLabels[tier]}</div>
        </div>
    );
}
