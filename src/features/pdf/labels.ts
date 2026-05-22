export type PdfLanguage = "vi" | "en";

const LABELS = {
  careerObjective: { vi: "Mục tiêu nghề nghiệp", en: "Career objective" },
  summary: { vi: "Tóm tắt", en: "Summary" },
  skills: { vi: "Kỹ năng", en: "Skills" },
  experience: { vi: "Kinh nghiệm", en: "Experience" },
  education: { vi: "Học vấn", en: "Education" },
  projects: { vi: "Dự án", en: "Projects" },
  contact: { vi: "Liên hệ", en: "Contact" },
  languages: { vi: "Ngôn ngữ", en: "Languages" },
  certifications: { vi: "Chứng chỉ", en: "Certifications" },
  personalInfo: { vi: "Thông tin cá nhân", en: "Personal information" },
} as const;

export type SectionKey = keyof typeof LABELS;

export function sectionLabel(key: SectionKey, language: PdfLanguage): string {
  return LABELS[key][language];
}

export function sidebarSummaryLabel(language: PdfLanguage): string {
  return LABELS.careerObjective[language];
}

export function personalInfoLabel(language: PdfLanguage): string {
  return LABELS.personalInfo[language];
}
