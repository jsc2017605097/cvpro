import { describe, it, expect } from "vitest";
import { ICON_KEYS, isIconKey } from "./preset-icon-keys";

describe("preset-icon-keys", () => {
  it("exports at least 28 icon keys", () => {
    expect(ICON_KEYS.length).toBeGreaterThanOrEqual(28);
  });

  it("isIconKey narrows valid keys", () => {
    expect(isIconKey("code")).toBe(true);
    expect(isIconKey("not-a-key")).toBe(false);
  });

  it("includes keys used by preset card visuals spec", () => {
    const required = [
      "graduation",
      "code",
      "terminal",
      "layout",
      "component",
      "accessibility",
      "megaphone",
      "interview",
      "pivot",
    ] as const;
    for (const key of required) {
      expect(ICON_KEYS).toContain(key);
    }
  });
});
