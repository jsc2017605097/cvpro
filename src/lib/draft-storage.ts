import type { CVData } from "@/schemas/cv.schema";

const KEY = "cvpro-draft";

export interface WizardDraft {
  presetId: string;
  layoutId: string;
  language: "vi" | "en";
  cvData?: CVData;
  step: number;
}

export function saveDraft(draft: WizardDraft): void {
  localStorage.setItem(KEY, JSON.stringify(draft));
}

export function loadDraft(): WizardDraft | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as WizardDraft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  localStorage.removeItem(KEY);
}
