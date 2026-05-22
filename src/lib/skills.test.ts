import { describe, it, expect } from "vitest";
import {
  flattenSkillsForWebDeveloper,
  normalizeSkills,
  normalizeToRatedSkills,
} from "./skills";

const STAGGER = [90, 85, 80, 75, 70, 65, 60, 55];

describe("normalizeToRatedSkills", () => {
  it("maps string[] to rated with default 70", () => {
    const out = normalizeToRatedSkills(["Java", "Docker"], "en");
    expect(out).toEqual([
      { name: "Java", level: 70 },
      { name: "Docker", level: 70 },
    ]);
  });

  it("staggers first 6 flat skills when using stagger mode", () => {
    const flat = ["A", "B", "C", "D", "E", "F"];
    const out = normalizeToRatedSkills(flat, "en", { stagger: true });
    expect(out.map((s) => s.level)).toEqual(STAGGER.slice(0, 6));
  });

  it("preserves SkillRated[] levels and caps at 8", () => {
    const rated = Array.from({ length: 10 }, (_, i) => ({
      name: `S${i}`,
      level: 50 + i,
    }));
    const out = normalizeToRatedSkills(rated, "en");
    expect(out).toHaveLength(8);
    expect(out[0].level).toBe(50);
  });

  it("flattens SkillGroup[] to rated default 70", () => {
    const out = normalizeToRatedSkills(
      [{ category: "Backend", items: ["Java", "Go"] }],
      "vi"
    );
    expect(out).toEqual([
      { name: "Java", level: 70 },
      { name: "Go", level: 70 },
    ]);
  });
});

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

  it("returns string array as-is capped", () => {
    const flat = [
      "Java",
      "Spring",
      "Docker",
      "K8s",
      "SQL",
      "Git",
      "Linux",
      "AWS",
      "Extra",
    ];
    expect(flattenSkillsForWebDeveloper(flat, 8)).toEqual([
      "Java",
      "Spring",
      "Docker",
      "K8s",
      "SQL",
      "Git",
      "Linux",
      "AWS",
    ]);
  });

  it("flattens SkillGroup[]", () => {
    const groups = [
      { category: "Backend", items: ["Java", "Spring"] },
      { category: "DevOps", items: ["Docker"] },
    ];
    expect(flattenSkillsForWebDeveloper(groups, 8)).toEqual([
      "Java",
      "Spring",
      "Docker",
    ]);
  });

  it("maps SkillRated[] to names only", () => {
    const rated = [
      { name: "Java", level: 90 },
      { name: "React", level: 80 },
    ];
    expect(flattenSkillsForWebDeveloper(rated, 8)).toEqual(["Java", "React"]);
  });

  it("returns empty for undefined skills flatten", () => {
    expect(flattenSkillsForWebDeveloper(undefined, 8)).toEqual([]);
  });

  it("fallback single group for unmatched flat list", () => {
    const out = normalizeSkills(["ObscureToolXYZ"], "vi");
    expect(out[0].category).toMatch(/Kỹ năng|Skills/);
  });
});
