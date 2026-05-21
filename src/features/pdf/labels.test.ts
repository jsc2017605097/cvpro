import { describe, it, expect } from "vitest";
import { sectionLabel, sidebarSummaryLabel } from "./labels";

describe("sectionLabel", () => {
  it("returns Vietnamese labels", () => {
    expect(sectionLabel("experience", "vi")).toBe("Kinh nghiệm");
  });

  it("returns English labels", () => {
    expect(sectionLabel("summary", "en")).toBe("Summary");
  });

  it("returns sidebar career objective label", () => {
    expect(sidebarSummaryLabel("vi")).toBe("Mục tiêu nghề nghiệp");
  });
});
