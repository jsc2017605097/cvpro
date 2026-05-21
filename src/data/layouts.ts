import type { LayoutTemplate } from "@/types/preset";

export const LAYOUTS: LayoutTemplate[] = [
  {
    id: "modern-single",
    name: { vi: "Modern — 1 cột", en: "Modern — Single column" },
    description: {
      vi: "Header nổi bật, phù hợp đa số ngành",
      en: "Clear header, works for most roles",
    },
  },
  {
    id: "compact-two",
    name: { vi: "Compact — 2 cột", en: "Compact — Two columns" },
    description: {
      vi: "Sidebar skills/contact, thân CV cho kinh nghiệm",
      en: "Sidebar for skills; body for experience",
    },
  },
  {
    id: "minimal-ats",
    name: { vi: "Minimal ATS", en: "Minimal ATS" },
    description: {
      vi: "Ít trang trí, thân thiện ATS quốc tế",
      en: "Minimal styling for ATS systems",
    },
  },
];

export function getLayoutById(id: string): LayoutTemplate | undefined {
  return LAYOUTS.find((l) => l.id === id);
}
