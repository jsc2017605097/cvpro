import { describe, it, expect } from "vitest";
import { LAYOUTS, getLayoutById } from "./layouts";

describe("layouts", () => {
  it("loads 4 layouts", () => {
    expect(LAYOUTS.length).toBe(4);
  });

  it("finds web-developer", () => {
    expect(getLayoutById("web-developer")?.previewImage).toBe(
      "/thumbnails/layout-web-developer.png"
    );
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
