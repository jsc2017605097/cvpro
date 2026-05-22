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

  it("includes compact-two page limits in Vietnamese", () => {
    const preset = getPresetById("dev-mid-senior")!;
    const rule = buildExportRule({
      preset,
      layoutId: "compact-two",
      language: "vi",
    });
    expect(rule).toContain("Giới hạn layout Compact Two");
    expect(rule).toContain('"category"');
    expect(rule).toContain("80–120");
  });
});
