import { describe, it, expect } from "vitest";
import { importCVFromText } from "./import-cv";

const valid = `{"meta":{"language":"vi","presetId":"dev-junior","layoutId":"modern-single"},"personal":{"fullName":"A"},"summary":"Dev","skills":["React"]}`;

describe("importCVFromText", () => {
  it("returns success for valid JSON", () => {
    const r = importCVFromText(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.personal.fullName).toBe("A");
  });

  it("returns field errors for invalid", () => {
    const r = importCVFromText('{"personal":{}}');
    expect(r.ok).toBe(false);
  });
});
