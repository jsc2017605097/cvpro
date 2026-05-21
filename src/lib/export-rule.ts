import type { ProfilePreset } from "@/types/preset";
import { emptyCVData } from "@/schemas/cv.schema";

interface BuildExportRuleInput {
  preset: ProfilePreset;
  layoutId: string;
  language: "vi" | "en";
}

export function buildExportRule(input: BuildExportRuleInput): string {
  const { preset, layoutId, language } = input;
  const isVi = language === "vi";
  const sample = emptyCVData({
    meta: { language, presetId: preset.id, layoutId },
    personal: { fullName: isVi ? "[Họ tên]" : "[Full name]" },
  });

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
    hints,
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
