import { describe, it, expect } from "vitest";
import { LAYOUTS, getLayoutById } from "./layouts";

describe("layouts", () => {
  it("loads 3 layouts", () => {
    expect(LAYOUTS.length).toBe(3);
  });

  it("finds modern-single", () => {
    expect(getLayoutById("modern-single")?.id).toBe("modern-single");
  });

  it("each layout has previewImage", () => {
    for (const layout of LAYOUTS) {
      expect(layout.previewImage).toMatch(/^\/thumbnails\/layout-.*\.(svg|png)$/);
    }
  });
});
