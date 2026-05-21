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

export const ProjectItemSchema = z.object({
  name: z.string().min(1),
  link: optionalUrl,
  techStack: z.array(z.string()).optional(),
  description: z.string().min(1),
  highlights: z.array(z.string()).optional(),
});

export const CVDataSchema = z.object({
  meta: z.object({
    language: z.enum(["vi", "en"]),
    presetId: z.string().min(1),
    layoutId: z.string().min(1),
  }),
  personal: PersonalSchema,
  summary: z.string().optional(),
  skills: z.array(z.string().min(1)).optional(),
  experience: z.array(ExperienceItemSchema).optional(),
  education: z.array(EducationItemSchema).optional(),
  projects: z.array(ProjectItemSchema).optional(),
  certifications: z.array(z.string()).optional(),
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
