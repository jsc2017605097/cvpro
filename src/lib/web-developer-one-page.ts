import type {
  CVData,
  EducationItem,
  ExperienceItem,
} from "@/schemas/cv.schema";
import { truncateAtWordBoundary } from "./truncate-text";

export const WEB_DEVELOPER_ONE_PAGE = {
  summaryMaxWords: 55,
  summaryMaxChars: 320,
  experienceMaxJobs: 3,
  experienceMaxBullets: 3,
  experienceBulletMaxChars: 120,
  educationMax: 2,
  educationDetailsMax: 3,
  educationDetailMaxChars: 90,
  skillsMax: 8,
  awardsMax: 3,
  certificationsMax: 3,
} as const;

function webDeveloperAntiRedundancyBlock(language: "vi" | "en"): string {
  if (language === "vi") {
    return [
      "## Nguyên tắc — 1 trang, không lặp",
      "- `summary`: định vị ngắn, không liệt kê hết stack.",
      "- `skills`: danh sách tên (string[]), không mô tả công việc.",
      "- Mỗi bullet experience khác nhau; dùng `**tech**` trong bullet.",
      "- Không gửi `projects` / `languages` cho layout này.",
    ].join("\n");
  }
  return [
    "## One page — no repetition",
    "- Short summary; skills as names only (string[]).",
    "- Unique experience bullets with `**tech**`.",
    "- Omit `projects` and `languages` for this layout.",
  ].join("\n");
}

export function webDeveloperOnePageLimitsBlock(language: "vi" | "en"): string {
  const L = WEB_DEVELOPER_ONE_PAGE;
  const limitsVi = [
    "## Giới hạn layout Web Developer — BẮT BUỘC 1 TRANG A4",
    "",
    `- \`summary\`: ≤**${L.summaryMaxWords} từ** (~${L.summaryMaxChars} ký tự).`,
    `- \`experience\`: **${L.experienceMaxJobs}** job; **${L.experienceMaxBullets}** bullet/job.`,
    `- \`education\`: **${L.educationMax}** mục; ≤**${L.educationDetailsMax}** detail/mục.`,
    `- \`skills\`: **${L.skillsMax}** tên (string[]).`,
    `- \`awards\`: ≤**${L.awardsMax}**. \`certifications\`: ≤**${L.certificationsMax}**.`,
    "- `personal.title` + contact; **nên có** `avatarUrl`. Footer: linkedin, twitter, facebook, email.",
    "- Không `projects` / `languages`.",
  ];
  const limitsEn = [
    "## Web Developer layout — MUST fit ONE A4 page",
    "",
    `- \`summary\`: ≤**${L.summaryMaxWords} words**.`,
    `- \`experience\`: **${L.experienceMaxJobs}** jobs, **${L.experienceMaxBullets}** bullets each.`,
    `- \`education\`: **${L.educationMax}** entries. \`skills\`: **${L.skillsMax}** strings.`,
    `- \`awards\`: ≤**${L.awardsMax}**. \`certifications\`: ≤**${L.certificationsMax}**.`,
    "- Include `avatarUrl` when possible. Footer social fields optional.",
    "- No `projects` / `languages`.",
  ];

  if (language === "vi") {
    return [...limitsVi, "", webDeveloperAntiRedundancyBlock("vi")].join("\n");
  }
  return [...limitsEn, "", webDeveloperAntiRedundancyBlock("en")].join("\n");
}

function capHighlights(
  highlights: string[],
  maxItems: number,
  maxChars: number
): string[] {
  return highlights
    .slice(0, maxItems)
    .map((h) => truncateAtWordBoundary(h, maxChars));
}

function capExperience(items: ExperienceItem[]): ExperienceItem[] {
  const L = WEB_DEVELOPER_ONE_PAGE;
  return items.slice(0, L.experienceMaxJobs).map((job) => ({
    ...job,
    highlights: capHighlights(
      job.highlights,
      L.experienceMaxBullets,
      L.experienceBulletMaxChars
    ),
  }));
}

function capEducation(items: EducationItem[]): EducationItem[] {
  const L = WEB_DEVELOPER_ONE_PAGE;
  return items.slice(0, L.educationMax).map((entry) => ({
    ...entry,
    details: entry.details
      ?.slice(0, L.educationDetailsMax)
      .map((d) => truncateAtWordBoundary(d, L.educationDetailMaxChars)),
  }));
}

export function clampCvDataForWebDeveloperPdf(data: CVData): CVData {
  const L = WEB_DEVELOPER_ONE_PAGE;
  return {
    ...data,
    summary: data.summary
      ? truncateAtWordBoundary(data.summary, L.summaryMaxChars)
      : undefined,
    experience: data.experience?.length
      ? capExperience(data.experience)
      : undefined,
    education: data.education?.length ? capEducation(data.education) : undefined,
    awards: data.awards?.slice(0, L.awardsMax),
    certifications: data.certifications?.slice(0, L.certificationsMax),
  };
}
