import { describe, it, expect } from "vitest";
import { getPresetById } from "@/data/presets";
import { presetRoleLabel } from "./preset-role-label";

describe("presetRoleLabel", () => {
  it("returns Frontend for dev-frontend", () => {
    const preset = getPresetById("dev-frontend")!;
    expect(presetRoleLabel(preset)).toBe("Frontend");
  });

  it("returns Intern for dev-intern", () => {
    const preset = getPresetById("dev-intern")!;
    expect(presetRoleLabel(preset)).toBe("Intern");
  });
});
