import type { ProfilePreset } from "@/types/preset";
import { emptyCVData } from "@/schemas/cv.schema";
import { compactTwoOnePageLimitsBlock } from "./compact-two-one-page";
import { webDeveloperOnePageLimitsBlock } from "./web-developer-one-page";

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

  if (layoutId === "compact-two") {
    sample.personal = {
      ...sample.personal,
      title: isVi ? "Backend Developer" : "Backend Developer",
      email: "dev@example.com",
      phone: "0900000000",
      location: isVi ? "Hà Nội" : "Boston, MA",
    };
    sample.summary = isVi
      ? "Backend 5+ năm, domain banking & microservices; ownership thiết kế API và release production."
      : "Backend 5+ years in banking microservices; owns API design and production releases.";
    sample.skills = [
      { name: "Java", level: 90 },
      { name: "Spring Boot", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Docker", level: 75 },
      { name: "System Design", level: 70 },
    ];
    sample.experience = [
      {
        company: "Công ty A",
        role: "Senior Backend Developer",
        startDate: "2023-01",
        current: true,
        highlights: [
          "Giảm 40% latency API nhờ cache **Redis**.",
          "Thiết kế microservices ~2M request/ngày.",
          "CI/CD **GitLab** + **Kubernetes**, release ~20 phút.",
        ],
      },
      {
        company: "Công ty B",
        role: "Backend Developer",
        startDate: "2021-01",
        endDate: "2022-12",
        highlights: [
          "Xây ERP **Node.js** cho 10k+ user.",
          "API Gateway **APISIX**, JWT auth.",
        ],
      },
    ];
    sample.education = [
      {
        school: "Đại học X",
        degree: "Cử nhân CNTT",
        endDate: "2020",
      },
    ];
    sample.projects = [
      {
        name: "API Platform",
        techStack: ["Java", "Kafka"],
        description: "Gateway nội bộ, auth tập trung.",
        highlights: ["Giảm duplicate integration."],
      },
    ];
    sample.certifications = ["AWS Cloud Practitioner (2024)"];
    sample.languages = ["Tiếng Việt — Native", "English — Technical"];
  }

  if (layoutId === "web-developer") {
    sample.personal = {
      ...sample.personal,
      title: isVi ? "Web Developer" : "Web Developer",
      email: "j.smith@example.com",
      phone: "(000) 954-987-2679",
      location: isVi ? "134 Rightward Way" : "134 Rightward Way",
      website: "https://www.webb.com/mycv/",
      avatarUrl: "https://i.pravatar.cc/150?img=11",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "@johnsmith",
      facebook: "https://facebook.com/my.smith",
    };
    sample.summary = isVi
      ? "Web Developer 8+ năm UI/UX và eCommerce; tối ưu workflow và hiệu năng."
      : "Web Developer 8+ years in UI/UX and eCommerce; optimizes workflow and performance.";
    sample.skills = [
      "HTML/Java",
      "WordPress",
      "Project Scheduling",
      "Microsoft Project",
      "Dreamweaver",
      "Photoshop",
      "Communication",
    ];
    sample.experience = [
      {
        company: "Claredon Smith",
        role: "Web Developer",
        location: "Los Angeles, CA",
        startDate: "2015-01",
        current: true,
        highlights: [
          "Manage accounts worth $4.7M annual sales.",
          "Trained 3 new account managers.",
          "Increased volume 150% via customer service initiative.",
        ],
      },
      {
        company: "Didier Sachs",
        role: "Junior Developer",
        location: "Los Santos, CA",
        startDate: "2008-01",
        endDate: "2011-12",
        highlights: [
          "Networked with clients; revenue +47% in 5 months.",
          "Employee of the Month three times.",
        ],
      },
    ];
    sample.education = [
      {
        school: "University",
        degree: "Master of Computer Science",
        details: ["Graduated Summa Cum Laude.", "Student PM association."],
      },
      {
        school: "University",
        degree: "Bachelor of Computer Science",
        details: ["Managed conference for 50+ professionals."],
      },
    ];
    sample.certifications = [
      "PMP — Project Management Institute (2010-05)",
      "CAPM — Project Management Institute (2007-11)",
      "PRINCE2 Foundation (2014-04)",
    ];
    sample.awards = [
      { title: "Outstanding Achievement Award", issuer: "Claredon Smith", date: "2017" },
      { title: "Employee of the Month", issuer: "Didier Sachs", date: "December 2009" },
    ];
  }

  const avatarHint = "";

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
    layoutId === "compact-two"
      ? ["", compactTwoOnePageLimitsBlock(language)].join("\n")
      : layoutId === "web-developer"
        ? ["", webDeveloperOnePageLimitsBlock(language)].join("\n")
        : "",
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
