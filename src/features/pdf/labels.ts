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
  mySelf: { vi: "Mục tiêu", en: "My Self" },
  awards: { vi: "Giải thưởng", en: "Awards" },
  contactUpper: { vi: "LIÊN HỆ", en: "CONTACT" },
  skillsUpper: { vi: "KỸ NĂNG", en: "SKILLS" },
  awardsUpper: { vi: "GIẢI THƯỞNG", en: "AWARDS" },
  educationUpper: { vi: "HỌC VẤN", en: "EDUCATION" },
  experienceUpper: { vi: "KINH NGHIỆM", en: "EXPERIENCE" },
  certificationUpper: { vi: "CHỨNG CHỈ", en: "CERTIFICATION" },
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

export function mySelfLabel(language: PdfLanguage): string {
  return LABELS.mySelf[language];
}
