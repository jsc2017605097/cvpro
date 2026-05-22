import { describe, it, expect } from "vitest";
import { countWords, truncateAtWordBoundary } from "./truncate-text";

describe("countWords", () => {
  it("counts whitespace-separated words", () => {
    expect(countWords("a b  c")).toBe(3);
  });
});

describe("truncateAtWordBoundary", () => {
  it("truncates at word boundary with ellipsis", () => {
    const long = "word ".repeat(200).trim();
    const out = truncateAtWordBoundary(long, 50);
    expect(out.length).toBeLessThanOrEqual(53);
    expect(out.endsWith("…")).toBe(true);
  });

  it("returns short text unchanged", () => {
    expect(truncateAtWordBoundary("hello", 100)).toBe("hello");
  });
});
