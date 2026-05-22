import type { ProfilePreset } from "@/types/preset";
import { emptyCVData } from "@/schemas/cv.schema";

interface BuildExportRuleInput {
  preset: ProfilePreset;
  layoutId: string;
  language: "vi" | "en";
}

function compactTwoLimitsBlock(language: "vi" | "en"): string {
  if (language === "vi") {
    return [
      "## Giới hạn layout Compact Two (~2 trang A4)",
      "",
      "- `personal.title`: bắt buộc, 1 dòng chức danh (vd: Backend Developer).",
      "- `personal`: điền email, phone, location; avatarUrl https nếu có ảnh.",
      "- `summary`: 80–120 từ, 4–6 câu; không lặp lại toàn bộ kinh nghiệm.",
      "- `skills`: DÙNG MẢNG NHÓM `[{ \"category\": \"...\", \"items\": [...] }]`, 5–7 nhóm, mỗi nhóm 3–6 kỹ năng, tổng ≤ 22.",
      "- `experience`: tối đa 4–5 công ty; mỗi job 4–5 bullet; mỗi bullet ≤ 2 dòng; đưa số liệu lên đầu; bọc tên công nghệ bằng `**` (vd: **Spring Boot**).",
      "- `projects`: tối đa 4; 3 dự án đầu có `description` (1 câu) + tối đa 2 `highlights`; dự án thứ 4 chỉ `name` + `techStack` (không highlights).",
      "- `education`: 1 mục; thêm `details` nếu có GPA/đồ án.",
      "- `certifications`: tối đa 4, format `Tên — Đơn vị (YYYY)`.",
      "- Không thêm section ngoài schema.",
    ].join("\n");
  }

  return [
    "## Compact Two layout limits (~2 A4 pages)",
    "",
    "- `personal.title`: required, one-line job title.",
    "- `personal`: include email, phone, location; https `avatarUrl` if photo.",
    "- `summary`: 80–120 words, 4–6 sentences.",
    "- `skills`: USE grouped array `[{ \"category\": \"...\", \"items\": [...] }]`, 5–7 groups, 3–6 skills each, ≤ 22 total.",
    "- `experience`: max 4–5 jobs, 4–5 bullets each; wrap tech names in `**`.",
    "- `projects`: max 4; first 3 with description + up to 2 highlights; 4th name + techStack only.",
    "- `education`: 1 entry with optional `details`.",
    "- `certifications`: max 4.",
    "- Do not add sections outside schema.",
  ].join("\n");
}

export function buildExportRule(input: BuildExportRuleInput): string {
  const { preset, layoutId, language } = input;
  const isVi = language === "vi";
  const sample = emptyCVData({
    meta: { language, presetId: preset.id, layoutId },
    personal: { fullName: isVi ? "[Họ tên]" : "[Full name]" },
  });

  if (layoutId === "compact-two") {
    sample.personal = {
      ...sample.personal,
      title: isVi ? "Backend Developer" : "Backend Developer",
      avatarUrl: isVi
        ? "https://example.com/anh-dai-dien.jpg"
        : "https://example.com/profile-photo.jpg",
    };
    sample.skills = [
      {
        category: isVi ? "Backend" : "Backend",
        items: ["Java", "Spring Boot", "Node.js"],
      },
      {
        category: isVi ? "Cơ sở dữ liệu" : "Databases",
        items: ["PostgreSQL", "MySQL", "Redis"],
      },
    ];
  }

  const avatarHint =
    layoutId === "compact-two"
      ? isVi
        ? "\n- Layout 2 cột: điền `personal.avatarUrl` bằng URL ảnh JPG/PNG công khai (https://)."
        : "\n- Two-column layout: set `personal.avatarUrl` to a public https image URL."
      : "";

  const sectionLines = preset.sections
    .map(
      (s) =>
        `- ${s.id}${s.required ? " (required)" : " (optional)"}: ${
          s.hint[language]
        }`
    )
    .join("\n");

  const hints = preset.promptHints.map((h) => `- ${h}`).join("\n");
  const skills = preset.skillKeywords.join(", ");

  const header = isVi
    ? `Bạn là chuyên gia viết CV. Tạo nội dung CV cho preset "${preset.title.vi}".`
    : `You are a professional CV writer. Create CV content for preset "${preset.title.en}".`;

  const outputRule = isVi
    ? `CHỈ TRẢ VỀ một khối JSON hợp lệ trong markdown \`\`\`json ... \`\`\`, không thêm giải thích.`
    : `ONLY return one valid JSON block in markdown \`\`\`json ... \`\`\`, no extra prose.`;

  return [
    header,
    "",
    isVi ? "## Ngữ cảnh preset" : "## Preset context",
    preset.shortDescription[language],
    "",
    isVi ? "## Section gợi ý" : "## Section guidance",
    sectionLines,
    "",
    isVi ? "## Gợi ý kỹ năng (tham khảo)" : "## Suggested skills",
    skills,
    "",
    isVi ? "## Quy tắc" : "## Rules",
    hints + avatarHint,
    layoutId === "compact-two" ? ["", compactTwoLimitsBlock(language)].join("\n") : "",
    outputRule,
    "",
    isVi
      ? "## JSON Schema mẫu (điền nội dung thật của user)"
      : "## Sample JSON (fill with user facts)",
    "```json",
    JSON.stringify(sample, null, 2),
    "```",
  ].join("\n");
}
