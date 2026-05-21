import { describe, it, expect } from "vitest";
import { buildExportRule } from "./export-rule";
import { getPresetById } from "@/data/presets";

describe("buildExportRule", () => {
  it("includes preset id and schema instruction", () => {
    const preset = getPresetById("dev-junior")!;
    const rule = buildExportRule({
      preset,
      layoutId: "modern-single",
      language: "vi",
    });
    expect(rule).toContain("dev-junior");
    expect(rule).toContain("CHỈ TRẢ VỀ");
    expect(rule).toContain('"fullName"');
  });
});
