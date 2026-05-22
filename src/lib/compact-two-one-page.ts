import type { CVData, ExperienceItem, ProjectItem } from "@/schemas/cv.schema";
import { truncateAtWordBoundary } from "./truncate-text";

/** Ngân sách render + export rule — layout compact-two (Ofspace) chỉ 1 trang A4. */
export const COMPACT_TWO_ONE_PAGE = {
  summaryMaxWords: 70,
  summaryMaxChars: 360,
  experienceMaxJobs: 3,
  experienceMaxBullets: 3,
  experienceBulletMaxChars: 130,
  projectsMax: 2,
  projectDescMaxChars: 85,
  projectHighlightsMax: 1,
  skillsMax: 5,
  certificationsMax: 2,
  languagesMax: 2,
  educationMax: 1,
} as const;

function compactTwoAntiRedundancyBlock(language: "vi" | "en"): string {
  if (language === "vi") {
    return [
      "## Nguyên tắc nội dung — đủ ý, ngắn gọn, KHÔNG LẶP (quan trọng)",
      "",
      "Mục tiêu: **đầy đủ thông tin recruiter cần** trong **1 trang A4**, không nhồi một ý vào nhiều chỗ.",
      "",
      "### Mỗi section chỉ làm MỘT việc",
      "| Section | Chỉ chứa | KHÔNG được chứa |",
      "|---------|----------|----------------|",
      "| `summary` | 1–2 câu định vị (vai trò, domain, năm KN) + 1 câu điểm mạnh khác biệt | Liệt kê stack dài, nhắc lại từng công ty, copy bullet kinh nghiệm |",
      "| `skills` | Tên kỹ năng + `level` | Câu văn, mô tả dự án, nhiệm vụ công việc |",
      "| `experience[].highlights` | Kết quả đo được / impact / nhiệm vụ **khác nhau** từng bullet | Cùng một ý viết 2–3 cách; lặp lại skill đã có trong `skills` |",
      "| `projects` | Dự án **không trùng** mô tả 100% với 1 job; 1 câu scope + 1 kết quả | Paraphrase lại toàn bộ job hiện tại; lặp bullet experience |",
      "| `education` / `certifications` | Fact ngắn | Kỹ năng, kinh nghiệm làm việc |",
      "",
      "### Quy tắc chống lặp (bắt buộc)",
      "1. **Một ý = một nơi duy nhất** — ví dụ \"Thành thạo Java, Spring Boot\" chỉ ở `skills`, KHÔNG lặp trong `summary` và 3 bullet.",
      "2. **Mỗi bullet experience khác nhau** — không hai bullet cùng nói \"tối ưu API\", \"xây microservices\" nếu đã gộp được một bullet.",
      "3. **Summary không phải mini-CV** — cấm \"Tại FPT em làm…, tại Viettel em làm…\" (để cho `experience`).",
      "4. **Tech stack** — tên framework ngắn trong bullet (`**Spring Boot**`); danh sách đầy đủ chỉ trong `skills` / `techStack` project.",
      "5. **Ưu tiên số liệu** — mỗi bullet nên có metric hoặc phạm vi (%, ms, user, request/ngày); tránh câu chung chung.",
      "6. **Cắt trùng trước khi trả JSON** — nếu project giống job hiện tại → bỏ project hoặc chỉ nêu góc khác (OSS, side product).",
      "",
      "### Ví dụ",
      "- ❌ Summary: \"Giỏi Java, Spring, Docker, K8s, PostgreSQL…\" (đã có trong skills)",
      "- ✅ Summary: \"Backend 5+ năm, banking & microservices; ownership API và release.\"",
      "- ❌ 3 bullet đều nói \"phát triển API backend bằng Java\"",
      "- ✅ Bullet 1: metric latency; Bullet 2: scale request; Bullet 3: CI/CD time",
      "",
      "### Checklist trước khi trả JSON",
      "- [ ] Không câu nào trong `summary` lặp ý với bullet đầu tiên",
      "- [ ] Không skill nào được mô tả bằng cả summary + bullet + project",
      "- [ ] Mỗi bullet ≤ 22 từ, không hai bullet cùng chủ đề",
      "- [ ] Tổng nội dung vừa giới hạn 1 trang (xem bảng số lượng bên dưới)",
    ].join("\n");
  }

  return [
    "## Content rules — complete but concise, NO repetition",
    "",
    "Goal: **everything a recruiter needs** on **one A4 page** — never say the same thing twice.",
    "",
    "### One job per section",
    "| Section | Only | Never |",
    "|---------|------|-------|",
    "| `summary` | Role, years, domain, one differentiator | Long stack lists, company-by-company history |",
    "| `skills` | Names + `level` | Prose, job duties |",
    "| `experience[].highlights` | Distinct outcomes per bullet | Rephrasing the same duty; repeating skills |",
    "| `projects` | Scope not identical to one job | Paraphrasing current job bullets |",
    "",
    "### Anti-redundancy (required)",
    "1. **One idea, one place** — e.g. Java/Spring only in `skills`, not again in summary + 3 bullets.",
    "2. **Unique bullets** — do not split one achievement into three similar lines.",
    "3. **Summary ≠ mini resume** — no per-company paragraphs (use `experience`).",
    "4. **Tech names** — bold in bullets; full list in `skills` / project `techStack`.",
    "5. **Prefer metrics** in bullets; avoid vague filler.",
    "6. **Drop duplicate projects** that mirror current job unless angle differs.",
    "",
    "### Before returning JSON",
    "- [ ] Summary does not repeat first bullet",
    "- [ ] No skill described in summary, bullets, and project",
    "- [ ] Each bullet ≤ 22 words, unique topic",
    "- [ ] Fits one-page limits below",
  ].join("\n");
}

export function compactTwoOnePageLimitsBlock(language: "vi" | "en"): string {
  const L = COMPACT_TWO_ONE_PAGE;
  const limitsVi = [
    "## Giới hạn layout Compact Two — BẮT BUỘC 1 TRANG A4",
    "",
    "Layout CHỈ đẹp khi **đúng 1 trang**. Quá dài → PDF cắt bớt / chữ đè nhau.",
    "",
    `- \`summary\`: **50–${L.summaryMaxWords} từ**, **≤3 câu** (~${L.summaryMaxChars} ký tự).`,
    `- \`experience\`: **${L.experienceMaxJobs}** công ty (mới nhất); **${L.experienceMaxBullets}** bullet/job; bullet ≤ **22 từ**; metric + \`**tech**\` đầu dòng.`,
    `- \`projects\`: ≤**${L.projectsMax}** (bỏ nếu trùng experience). #1: 1 câu \`description\` + **${L.projectHighlightsMax}** highlight; #2: chỉ \`name\` + \`techStack\`.`,
    `- \`education\`: **1** mục. \`skills\`: **${L.skillsMax}–6** \`[{ \"name\", \"level\": 40-100 }]\`. \`certifications\`: **${L.certificationsMax}**. \`languages\`: **${L.languagesMax}**.`,
    "- `personal.title` bắt buộc; đủ contact cho cột phải. Không `avatarUrl`. Không field ngoài schema.",
  ];
  const limitsEn = [
    "## Compact Two — MUST fit ONE A4 page",
    "",
    `- \`summary\`: **50–${L.summaryMaxWords} words**, ≤3 sentences.`,
    `- \`experience\`: **${L.experienceMaxJobs}** jobs; **${L.experienceMaxBullets}** bullets each; ≤22 words; metrics + \`**tech**\`.`,
    `- \`projects\`: ≤**${L.projectsMax}**. \`education\`: 1. \`skills\`: **${L.skillsMax}–6** with level.`,
    "- Required title + contact. No avatarUrl.",
  ];

  if (language === "vi") {
    return [...limitsVi, "", compactTwoAntiRedundancyBlock("vi")].join("\n");
  }
  return [...limitsEn, "", compactTwoAntiRedundancyBlock("en")].join("\n");
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
  const L = COMPACT_TWO_ONE_PAGE;
  return items.slice(0, L.experienceMaxJobs).map((job) => ({
    ...job,
    highlights: capHighlights(
      job.highlights,
      L.experienceMaxBullets,
      L.experienceBulletMaxChars
    ),
  }));
}

function capProjects(items: ProjectItem[]): ProjectItem[] {
  const L = COMPACT_TWO_ONE_PAGE;
  return items.slice(0, L.projectsMax).map((p, i) => {
    if (i === 0) {
      return {
        ...p,
        description: truncateAtWordBoundary(p.description, L.projectDescMaxChars),
        highlights: (p.highlights ?? []).slice(0, L.projectHighlightsMax),
      };
    }
    return {
      name: p.name,
      link: p.link,
      techStack: p.techStack,
      description: p.name,
      highlights: undefined,
    };
  });
}

/** Cắt nội dung trước khi render PDF compact-two để mục tiêu 1 trang A4. */
export function clampCvDataForCompactTwoPdf(data: CVData): CVData {
  const L = COMPACT_TWO_ONE_PAGE;
  return {
    ...data,
    summary: data.summary
      ? truncateAtWordBoundary(data.summary, L.summaryMaxChars)
      : undefined,
    experience: data.experience?.length
      ? capExperience(data.experience)
      : undefined,
    education: data.education?.slice(0, L.educationMax),
    projects: data.projects?.length ? capProjects(data.projects) : undefined,
    certifications: data.certifications?.slice(0, L.certificationsMax),
    languages: data.languages?.slice(0, L.languagesMax),
  };
}
