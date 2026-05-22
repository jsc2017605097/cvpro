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
    expect(rule).toContain("1 TRANG A4");
    expect(rule).toContain('"level"');
    expect(rule).toContain("40-100");
    expect(rule).toMatch(/\*\*3\*\* công ty/);
    expect(rule).toContain("KHÔNG LẶP");
    expect(rule).toContain("Mỗi section chỉ làm MỘT việc");
    expect(rule).toContain("Checklist trước khi trả JSON");
  });
});
