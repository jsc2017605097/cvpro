import { describe, it, expect } from "vitest";
import { extractJsonFromText } from "./extract-json";

const sample = `\`\`\`json
{"meta":{"language":"vi","presetId":"dev-junior","layoutId":"modern-single"},"personal":{"fullName":"Nguyen Van A"}}
\`\`\``;

describe("extractJsonFromText", () => {
  it("extracts JSON from markdown fence", () => {
    const raw = extractJsonFromText(sample);
    expect(raw).toContain("Nguyen Van A");
  });

  it("extracts bare JSON object", () => {
    const raw = extractJsonFromText('{"personal":{"fullName":"X"}}');
    expect(JSON.parse(raw).personal.fullName).toBe("X");
  });
});
