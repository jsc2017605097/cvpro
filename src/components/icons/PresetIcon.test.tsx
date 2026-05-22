import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PresetIcon } from "./PresetIcon";
import { ICON_KEYS } from "./preset-icon-keys";

describe("PresetIcon", () => {
  it("renders svg for code", () => {
    const { container } = render(<PresetIcon icon="code" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies accent class when accent=true", () => {
    const { container } = render(<PresetIcon icon="server" accent />);
    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toMatch(/color-primary/);
  });

  it("renders every IconKey without throwing", () => {
    for (const key of ICON_KEYS) {
      const { container } = render(<PresetIcon icon={key} />);
      expect(container.querySelector("svg")).toBeTruthy();
    }
  });
});
