import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PresetCard } from "./PresetCard";
import { getPresetById } from "@/data/presets";

function renderCard(presetId: string) {
  const preset = getPresetById(presetId);
  if (!preset) throw new Error(`missing preset ${presetId}`);
  return render(
    <MemoryRouter>
      <PresetCard preset={preset} />
    </MemoryRouter>
  );
}

describe("PresetCard", () => {
  it("renders title, CTA, and visual band for dev-frontend", () => {
    renderCard("dev-frontend");
    expect(
      screen.getByRole("heading", { name: /Frontend Developer/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Dùng mẫu này/i })
    ).toBeInTheDocument();
    expect(document.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("renders hr-recruiter with cream band class", () => {
    const { container } = renderCard("hr-recruiter");
    expect(
      screen.getByRole("heading", { name: /Nhân sự|Tuyển dụng/i })
    ).toBeInTheDocument();
    const band = container.querySelector('[aria-hidden="true"]');
    expect(band?.className).toMatch(/color-canvas/);
  });
});
