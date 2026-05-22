import { z } from "zod";

const optionalUrl = z.string().url().optional().or(z.literal(""));

export const PersonalSchema = z.object({
  fullName: z.string().min(1),
  title: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: optionalUrl,
  github: optionalUrl,
  website: optionalUrl,
  avatarUrl: optionalUrl,
  twitter: z.string().max(200).optional().or(z.literal("")),
  facebook: optionalUrl,
});

export const ExperienceItemSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  highlights: z.array(z.string().min(1)).min(1),
});

export const EducationItemSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.array(z.string()).optional(),
});

export const AwardItemSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().optional(),
  date: z.string().optional(),
});
export type AwardItem = z.infer<typeof AwardItemSchema>;

export const ProjectItemSchema = z.object({
  name: z.string().min(1),
  link: optionalUrl,
  techStack: z.array(z.string()).optional(),
  description: z.string().min(1),
  highlights: z.array(z.string()).optional(),
});

export const SkillGroupSchema = z.object({
  category: z.string().min(1),
  items: z.array(z.string().min(1)).min(1).max(8),
});
export type SkillGroup = z.infer<typeof SkillGroupSchema>;

export const SkillRatedSchema = z.object({
  name: z.string().min(1),
  level: z.number().int().min(0).max(100),
});
export type SkillRated = z.infer<typeof SkillRatedSchema>;

export function isSkillRatedArray(
  skills: unknown
): skills is z.infer<typeof SkillRatedSchema>[] {
  if (!Array.isArray(skills) || skills.length === 0) return false;
  const first = skills[0];
  return (
    typeof first === "object" &&
    first !== null &&
    "name" in first &&
    "level" in first &&
    typeof (first as { level: unknown }).level === "number"
  );
}

function isSkillGroupArray(skills: unknown): skills is z.infer<typeof SkillGroupSchema>[] {
  return (
    Array.isArray(skills) &&
    skills.length > 0 &&
    typeof skills[0] === "object" &&
    skills[0] !== null &&
    "category" in skills[0] &&
    "items" in skills[0]
  );
}

const SkillsFieldSchema = z
  .union([
    z.array(SkillRatedSchema).max(12),
    z.array(z.string().min(1)).max(24),
    z.array(SkillGroupSchema).max(8),
  ])
  .optional()
  .superRefine((skills, ctx) => {
    if (!skills || !isSkillGroupArray(skills)) return;
    const total = skills.reduce((n, g) => n + g.items.length, 0);
    if (total > 24) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Total skill items must be ≤ 24",
      });
    }
  });

export const CVDataSchema = z.object({
  meta: z.object({
    language: z.enum(["vi", "en"]),
    presetId: z.string().min(1),
    layoutId: z.string().min(1),
  }),
  personal: PersonalSchema,
  summary: z.string().optional(),
  skills: SkillsFieldSchema,
  experience: z.array(ExperienceItemSchema).max(6).optional(),
  education: z.array(EducationItemSchema).optional(),
  projects: z.array(ProjectItemSchema).max(5).optional(),
  certifications: z.array(z.string()).optional(),
  awards: z.array(AwardItemSchema).max(4).optional(),
  languages: z.array(z.string()).optional(),
});

export type CVData = z.infer<typeof CVDataSchema>;
export type Personal = z.infer<typeof PersonalSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;

/** Mẫu JSON hợp lệ schema — dùng trong export rule (placeholder, không phải CV trống). */
export function emptyCVData(overrides?: Partial<CVData>): CVData {
  return {
    meta: {
      language: "vi",
      presetId: "template",
      layoutId: "modern-single",
    },
    personal: {
      fullName: "[Họ tên]",
    },
    ...overrides,
  };
}
