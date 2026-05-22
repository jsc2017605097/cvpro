import { describe, it, expect } from "vitest";
import { PRESETS } from "@/data/presets";
import { PRESET_CARD_VISUALS, getPresetCardVisual } from "./preset-card-visuals";
import { isIconKey } from "@/components/icons/preset-icon-keys";

describe("preset-card-visuals", () => {
  it("has exactly one entry per preset id", () => {
    const presetIds = PRESETS.map((p) => p.id).sort();
    const visualIds = Object.keys(PRESET_CARD_VISUALS).sort();
    expect(visualIds).toEqual(presetIds);
  });

  it("each entry has 2-4 valid icon keys", () => {
    for (const preset of PRESETS) {
      const config = PRESET_CARD_VISUALS[preset.id];
      expect(config.icons.length).toBeGreaterThanOrEqual(2);
      expect(config.icons.length).toBeLessThanOrEqual(4);
      for (const icon of config.icons) {
        expect(isIconKey(icon)).toBe(true);
      }
    }
  });

  it("no two presets share identical icon triple (uniqueness)", () => {
    const signatures = PRESETS.map((p) =>
      PRESET_CARD_VISUALS[p.id].icons.join(",")
    );
    const unique = new Set(signatures);
    expect(unique.size).toBe(PRESETS.length);
  });

  it("getPresetCardVisual returns mapped config", () => {
    const config = getPresetCardVisual("dev-frontend");
    expect(config.icons).toEqual(["component", "accessibility", "layout"]);
    expect(config.bandVariant).toBe("soft");
  });

  it("marketing-digital uses cream band", () => {
    expect(getPresetCardVisual("marketing-digital").bandVariant).toBe("cream");
  });
});
