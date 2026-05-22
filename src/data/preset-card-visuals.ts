import type { IconKey } from "@/components/icons/preset-icon-keys";

export type BandVariant = "soft" | "card" | "cream";
export type HeroTint = "primary" | "ink" | "muted";

export interface PresetCardVisualConfig {
  icons: IconKey[];
  bandVariant?: BandVariant;
  heroTint?: HeroTint;
}

export const PRESET_CARD_VISUALS: Record<string, PresetCardVisualConfig> = {
  "dev-intern": {
    icons: ["graduation", "code", "terminal"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "dev-junior": {
    icons: ["code", "terminal", "growth"],
    bandVariant: "soft",
    heroTint: "ink",
  },
  "dev-mid-senior": {
    icons: ["layers", "server", "chart"],
    bandVariant: "card",
    heroTint: "ink",
  },
  "dev-fullstack": {
    icons: ["layers", "api", "component"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "dev-frontend": {
    icons: ["component", "accessibility", "layout"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "dev-backend": {
    icons: ["server", "database", "api"],
    bandVariant: "card",
    heroTint: "ink",
  },
  "dev-devops": {
    icons: ["pipeline", "cloud", "shield"],
    bandVariant: "soft",
    heroTint: "muted",
  },
  "qa-engineer": {
    icons: ["bug", "checklist", "shield"],
    bandVariant: "cream",
    heroTint: "primary",
  },
  "ba-junior": {
    icons: ["diagram", "document", "users"],
    bandVariant: "soft",
    heroTint: "muted",
  },
  "ba-senior": {
    icons: ["diagram", "chart", "api"],
    bandVariant: "card",
    heroTint: "ink",
  },
  "pm-mid": {
    icons: ["roadmap", "chart", "users"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "pm-senior": {
    icons: ["roadmap", "chart", "growth"],
    bandVariant: "card",
    heroTint: "ink",
  },
  "po-scrum": {
    icons: ["backlog", "sprint", "users"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "marketing-digital": {
    icons: ["megaphone", "chart", "funnel"],
    bandVariant: "cream",
    heroTint: "primary",
  },
  "sales-b2b": {
    icons: ["handshake", "funnel", "chart"],
    bandVariant: "cream",
    heroTint: "ink",
  },
  "accountant": {
    icons: ["ledger", "calculator", "document"],
    bandVariant: "cream",
    heroTint: "muted",
  },
  "hr-recruiter": {
    icons: ["interview", "users", "document"],
    bandVariant: "cream",
    heroTint: "primary",
  },
  "career-switcher": {
    icons: ["pivot", "growth", "code"],
    bandVariant: "soft",
    heroTint: "primary",
  },
  "english-tech": {
    icons: ["globe", "document", "code"],
    bandVariant: "card",
    heroTint: "ink",
  },
};

export function getPresetCardVisual(presetId: string): PresetCardVisualConfig {
  return (
    PRESET_CARD_VISUALS[presetId] ?? {
      icons: ["document"],
      bandVariant: "soft",
      heroTint: "muted",
    }
  );
}
