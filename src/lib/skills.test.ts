import { describe, it, expect } from "vitest";
import { normalizeSkills } from "./skills";

describe("normalizeSkills", () => {
  it("passes through SkillGroup[] capped at 7 groups", () => {
    const groups = Array.from({ length: 10 }, (_, i) => ({
      category: `G${i}`,
      items: ["A"],
    }));
    const out = normalizeSkills(groups, "vi");
    expect(out.length).toBeLessThanOrEqual(7);
  });

  it("groups flat Java and PostgreSQL into categories", () => {
    const out = normalizeSkills(
      ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      "en"
    );
    expect(out.some((g) => g.items.includes("Java"))).toBe(true);
    expect(out.length).toBeGreaterThan(0);
  });

  it("returns empty for undefined", () => {
    expect(normalizeSkills(undefined, "vi")).toEqual([]);
  });

  it("fallback single group for unmatched flat list", () => {
    const out = normalizeSkills(["ObscureToolXYZ"], "vi");
    expect(out[0].category).toMatch(/Kỹ năng|Skills/);
  });
});
