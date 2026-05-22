import { describe, it, expect } from "vitest";
import { parseHighlightSegments } from "./parse-highlight-text";

describe("parseHighlightSegments", () => {
  it("parses markdown bold", () => {
    const segs = parseHighlightSegments("Used **Java** here", []);
    expect(segs).toEqual([
      { text: "Used ", bold: false },
      { text: "Java", bold: true },
      { text: " here", bold: false },
    ]);
  });

  it("matches tokens when no markdown", () => {
    const segs = parseHighlightSegments("Built with Spring Boot", [
      "Spring Boot",
      "Java",
    ]);
    expect(segs.some((s) => s.bold && s.text === "Spring Boot")).toBe(true);
  });
});
