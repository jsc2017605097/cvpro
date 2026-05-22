import { describe, it, expect } from "vitest";
import type { SkillGroup, SkillRated } from "./cv.schema";
import { CVDataSchema, emptyCVData } from "./cv.schema";

describe("CVDataSchema", () => {
  it("accepts minimal valid CV", () => {
    const result = CVDataSchema.safeParse(emptyCVData());
    expect(result.success).toBe(true);
  });

  it("rejects missing personal.fullName", () => {
    const bad = { ...emptyCVData(), personal: { email: "a@b.com" } };
    const result = CVDataSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("rejects empty presetId in meta", () => {
    const bad = {
      ...emptyCVData(),
      meta: { ...emptyCVData().meta, presetId: "" },
    };
    const result = CVDataSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("accepts CV with experience and skills", () => {
    const data = {
      ...emptyCVData(),
      personal: { fullName: "Nguyen Van A", email: "a@example.com" },
      summary: "Full-stack developer",
      skills: ["TypeScript", "React"],
      experience: [
        {
          company: "Acme",
          role: "Developer",
          startDate: "2022-01",
          highlights: ["Built feature X"],
        },
      ],
    };
    const result = CVDataSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("accepts optional personal.avatarUrl", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: {
        fullName: "Test",
        avatarUrl: "https://example.com/photo.jpg",
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid avatarUrl", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test", avatarUrl: "not-a-url" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const bad = {
      ...emptyCVData(),
      personal: { fullName: "Test", email: "not-an-email" },
    };
    const result = CVDataSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("accepts skills as SkillGroup[]", () => {
    const groups: SkillGroup[] = [
      { category: "Backend", items: ["Java", "Spring Boot"] },
    ];
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      skills: groups,
    });
    expect(result.success).toBe(true);
  });

  it("rejects SkillGroup with empty items", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      skills: [{ category: "Backend", items: [] }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects flat skills array over 24 items", () => {
    const skills = Array.from({ length: 25 }, (_, i) => `Skill ${i + 1}`);
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      skills,
    });
    expect(result.success).toBe(false);
  });

  it("accepts skills as SkillRated[]", () => {
    const skills: SkillRated[] = [
      { name: "Java", level: 90 },
      { name: "Spring Boot", level: 85 },
    ];
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      skills,
    });
    expect(result.success).toBe(true);
  });

  it("rejects SkillRated with level > 100", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      skills: [{ name: "Java", level: 101 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects SkillRated with level < 0", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      skills: [{ name: "Java", level: -1 }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts awards array", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Guy Hawkins" },
      awards: [
        { title: "Employee of the Month", issuer: "Acme", date: "2017" },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects award without title", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      awards: [{ title: "" }],
    });
    expect(result.success).toBe(false);
  });

  it("accepts personal twitter and facebook", () => {
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: {
        fullName: "Test",
        twitter: "@johnsmith",
        facebook: "https://facebook.com/my.smith",
      },
    });
    expect(result.success).toBe(true);
  });

  it("rejects awards over 4 items", () => {
    const awards = Array.from({ length: 5 }, (_, i) => ({
      title: `Award ${i}`,
    }));
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      awards,
    });
    expect(result.success).toBe(false);
  });

  it("rejects rated skills array over 12 items", () => {
    const skills = Array.from({ length: 13 }, (_, i) => ({
      name: `Skill${i}`,
      level: 70,
    }));
    const result = CVDataSchema.safeParse({
      ...emptyCVData(),
      personal: { fullName: "Test" },
      skills,
    });
    expect(result.success).toBe(false);
  });
});
