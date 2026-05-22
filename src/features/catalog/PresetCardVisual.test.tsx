import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PresetCardVisual } from "./PresetCardVisual";
import { getPresetCardVisual } from "@/data/preset-card-visuals";

describe("PresetCardVisual", () => {
  it("renders decorative band with aria-hidden", () => {
    const config = getPresetCardVisual("dev-backend");
    const { container } = render(<PresetCardVisual config={config} />);
    const band = container.querySelector('[aria-hidden="true"]');
    expect(band).toBeTruthy();
    expect(band?.className).toMatch(/h-24/);
  });

  it("renders three icons for dev-backend", () => {
    const config = getPresetCardVisual("dev-backend");
    const { container } = render(<PresetCardVisual config={config} />);
    expect(container.querySelectorAll("svg").length).toBe(3);
  });

  it("applies cream background for marketing-digital", () => {
    const config = getPresetCardVisual("marketing-digital");
    const { container } = render(<PresetCardVisual config={config} />);
    const band = container.firstChild as HTMLElement;
    expect(band.className).toMatch(/color-canvas/);
  });
});
