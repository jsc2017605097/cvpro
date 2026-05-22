import type { IconKey } from "@/components/icons/preset-icon-keys";

export type BandVariant = "soft" | "card" | "cream";

export interface PresetCardVisualConfig {
  icons: IconKey[];
  bandVariant?: BandVariant;
  accentIconIndex?: number;
}

export const PRESET_CARD_VISUALS: Record<string, PresetCardVisualConfig> = {
  "dev-intern": { icons: ["graduation", "code", "terminal"], bandVariant: "soft" },
  "dev-junior": { icons: ["code", "terminal", "growth"], bandVariant: "soft" },
  "dev-mid-senior": { icons: ["layers", "server", "chart"], bandVariant: "soft" },
  "dev-fullstack": { icons: ["layers", "api", "component"], bandVariant: "soft" },
  "dev-frontend": {
    icons: ["component", "accessibility", "layout"],
    bandVariant: "soft",
    accentIconIndex: 0,
  },
  "dev-backend": { icons: ["server", "database", "api"], bandVariant: "soft" },
  "dev-devops": { icons: ["pipeline", "cloud", "shield"], bandVariant: "soft" },
  "qa-engineer": { icons: ["bug", "checklist", "shield"], bandVariant: "soft" },
  "ba-junior": { icons: ["diagram", "document", "users"], bandVariant: "soft" },
  "ba-senior": { icons: ["diagram", "chart", "api"], bandVariant: "soft" },
  "pm-mid": { icons: ["roadmap", "chart", "users"], bandVariant: "soft" },
  "pm-senior": { icons: ["roadmap", "chart", "growth"], bandVariant: "card" },
  "po-scrum": { icons: ["backlog", "sprint", "users"], bandVariant: "soft" },
  "marketing-digital": {
    icons: ["megaphone", "chart", "funnel"],
    bandVariant: "cream",
    accentIconIndex: 0,
  },
  "sales-b2b": { icons: ["handshake", "funnel", "chart"], bandVariant: "cream" },
  "accountant": { icons: ["ledger", "calculator", "document"], bandVariant: "cream" },
  "hr-recruiter": { icons: ["interview", "users", "document"], bandVariant: "cream" },
  "career-switcher": { icons: ["pivot", "growth", "code"], bandVariant: "soft" },
  "english-tech": { icons: ["globe", "document", "code"], bandVariant: "soft" },
};

export function getPresetCardVisual(presetId: string): PresetCardVisualConfig {
  return (
    PRESET_CARD_VISUALS[presetId] ?? {
      icons: ["document"],
      bandVariant: "soft",
    }
  );
}
