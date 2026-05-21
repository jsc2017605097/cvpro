export type PdfLanguage = "vi" | "en";

const LABELS = {
  summary: { vi: "Tóm tắt", en: "Summary" },
  skills: { vi: "Kỹ năng", en: "Skills" },
  experience: { vi: "Kinh nghiệm", en: "Experience" },
  education: { vi: "Học vấn", en: "Education" },
  projects: { vi: "Dự án", en: "Projects" },
  contact: { vi: "Liên hệ", en: "Contact" },
  languages: { vi: "Ngôn ngữ", en: "Languages" },
  certifications: { vi: "Chứng chỉ", en: "Certifications" },
} as const;

export type SectionKey = keyof typeof LABELS;

export function sectionLabel(key: SectionKey, language: PdfLanguage): string {
  return LABELS[key][language];
}
