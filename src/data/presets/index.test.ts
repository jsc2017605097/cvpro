import { describe, it, expect } from "vitest";
import { PRESETS, getPresetById } from "./index";

describe("presets", () => {
  it("loads 19 presets", () => {
    expect(PRESETS.length).toBe(19);
  });

  it("finds dev-junior", () => {
    expect(getPresetById("dev-junior")?.slug).toBe("dev-junior");
  });

  it("has unique preset ids", () => {
    const ids = PRESETS.map((p) => p.id);
    expect(new Set(ids).size).toBe(19);
  });

  it("english-tech is global market with en default", () => {
    const preset = getPresetById("english-tech");
    expect(preset?.market).toBe("global");
    expect(preset?.defaultLanguage).toBe("en");
  });
});
