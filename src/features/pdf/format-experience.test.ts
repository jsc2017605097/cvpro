import { describe, it, expect } from "vitest";
import { formatExperienceDateRange } from "./format-experience";

describe("formatExperienceDateRange", () => {
  it("shows Present when current", () => {
    expect(
      formatExperienceDateRange({
        company: "X",
        role: "Dev",
        startDate: "2022-01",
        endDate: "",
        current: true,
        location: "",
        highlights: ["Built APIs"],
      }),
    ).toBe("2022-01 – Present");
  });
});
