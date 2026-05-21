export type Market = "vn" | "global" | "both";
export type ExperienceLevel =
  | "intern"
  | "junior"
  | "mid"
  | "senior"
  | "lead";

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface SectionConfig {
  id: string;
  required: boolean;
  maxItems?: number;
  hint: LocalizedText;
}

export interface ProfilePreset {
  id: string;
  slug: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  tags: string[];
  market: Market;
  category: "it" | "product" | "business" | "other";
  defaultLanguage: "vi" | "en";
  experienceLevel: ExperienceLevel;
  recommendedLayouts: string[];
  sections: SectionConfig[];
  promptHints: string[];
  skillKeywords: string[];
}

export interface LayoutTemplate {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  previewImage: string;
}
