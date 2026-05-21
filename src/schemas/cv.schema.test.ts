import { describe, it, expect } from "vitest";
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
});
