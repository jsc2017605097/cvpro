import { describe, it, expect } from "vitest";
import { collectHighlightTokens } from "./highlight-tokens";
import { emptyCVData } from "@/schemas/cv.schema";

describe("collectHighlightTokens", () => {
  it("collects flat skills and tech stacks", () => {
    const data = {
      ...emptyCVData(),
      skills: ["Java", "Docker"],
      experience: [
        {
          company: "Acme",
          role: "Dev",
          startDate: "2020",
          highlights: ["Used **Spring Boot**"],
        },
      ],
      projects: [
        {
          name: "P1",
          description: "d",
          techStack: ["PostgreSQL"],
        },
      ],
    };
    const tokens = collectHighlightTokens(data);
    expect(tokens).toContain("Java");
    expect(tokens).toContain("PostgreSQL");
    expect(tokens.some((t) => t.toLowerCase().includes("spring"))).toBe(true);
  });
});
