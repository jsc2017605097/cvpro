import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PresetCardVisual } from "./PresetCardVisual";
import { getPresetCardVisual } from "@/data/preset-card-visuals";
import { getPresetById } from "@/data/presets";

describe("PresetCardVisual", () => {
  it("renders decorative band with aria-hidden", () => {
    const preset = getPresetById("dev-backend")!;
    const config = getPresetCardVisual("dev-backend");
    const { container } = render(
      <PresetCardVisual config={config} preset={preset} />
    );
    const band = container.querySelector('[aria-hidden="true"]');
    expect(band).toBeTruthy();
    expect(band?.className).toMatch(/h-28/);
  });

  it("renders hero + support icons for dev-backend", () => {
    const preset = getPresetById("dev-backend")!;
    const config = getPresetCardVisual("dev-backend");
    const { container } = render(
      <PresetCardVisual config={config} preset={preset} />
    );
    expect(container.querySelectorAll("svg").length).toBe(3);
  });

  it("shows role label from preset tags", () => {
    const preset = getPresetById("dev-frontend")!;
    const config = getPresetCardVisual("dev-frontend");
    render(<PresetCardVisual config={config} preset={preset} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("applies cream background for marketing-digital", () => {
    const preset = getPresetById("marketing-digital")!;
    const config = getPresetCardVisual("marketing-digital");
    const { container } = render(
      <PresetCardVisual config={config} preset={preset} />
    );
    const band = container.firstChild as HTMLElement;
    expect(band.className).toMatch(/color-canvas/);
  });
});
