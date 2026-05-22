import { describe, it, expect } from "vitest";
import { clampCvDataForCompactTwoPdf, COMPACT_TWO_ONE_PAGE } from "./compact-two-one-page";
import { emptyCVData } from "@/schemas/cv.schema";

describe("clampCvDataForCompactTwoPdf", () => {
  it("limits experience jobs and bullets", () => {
    const data = emptyCVData({
      personal: { fullName: "Test" },
      experience: Array.from({ length: 5 }, (_, i) => ({
        company: `Co${i}`,
        role: "Dev",
        startDate: "2020-01",
        highlights: ["a", "b", "c", "d", "e"],
      })),
    });
    const out = clampCvDataForCompactTwoPdf(data);
    expect(out.experience).toHaveLength(COMPACT_TWO_ONE_PAGE.experienceMaxJobs);
    expect(out.experience![0].highlights).toHaveLength(
      COMPACT_TWO_ONE_PAGE.experienceMaxBullets
    );
  });

  it("keeps at most one education entry", () => {
    const data = emptyCVData({
      personal: { fullName: "Test" },
      education: [
        { school: "A", degree: "BS" },
        { school: "B", degree: "MS" },
      ],
    });
    const out = clampCvDataForCompactTwoPdf(data);
    expect(out.education).toHaveLength(1);
  });
});
