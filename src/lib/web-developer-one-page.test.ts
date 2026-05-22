import { describe, it, expect } from "vitest";
import {
  clampCvDataForWebDeveloperPdf,
  WEB_DEVELOPER_ONE_PAGE,
} from "./web-developer-one-page";
import { emptyCVData } from "@/schemas/cv.schema";

describe("clampCvDataForWebDeveloperPdf", () => {
  it("limits experience jobs and bullets", () => {
    const data = emptyCVData({
      personal: { fullName: "Test" },
      experience: Array.from({ length: 5 }, (_, i) => ({
        company: `Co${i}`,
        role: "Dev",
        startDate: "2020-01",
        highlights: ["a", "b", "c", "d"],
      })),
    });
    const out = clampCvDataForWebDeveloperPdf(data);
    expect(out.experience).toHaveLength(WEB_DEVELOPER_ONE_PAGE.experienceMaxJobs);
    expect(out.experience![0].highlights).toHaveLength(
      WEB_DEVELOPER_ONE_PAGE.experienceMaxBullets
    );
  });

  it("keeps at most two education entries and caps details", () => {
    const data = emptyCVData({
      personal: { fullName: "Test" },
      education: [
        { school: "A", degree: "BS", details: ["d1", "d2", "d3", "d4"] },
        { school: "B", degree: "MS" },
        { school: "C", degree: "PhD" },
      ],
    });
    const out = clampCvDataForWebDeveloperPdf(data);
    expect(out.education).toHaveLength(WEB_DEVELOPER_ONE_PAGE.educationMax);
    expect(out.education![0].details).toHaveLength(
      WEB_DEVELOPER_ONE_PAGE.educationDetailsMax
    );
  });

  it("caps awards and certifications", () => {
    const data = emptyCVData({
      personal: { fullName: "Test" },
      awards: Array.from({ length: 5 }, (_, i) => ({ title: `A${i}` })),
      certifications: ["c1", "c2", "c3", "c4"],
    });
    const out = clampCvDataForWebDeveloperPdf(data);
    expect(out.awards).toHaveLength(WEB_DEVELOPER_ONE_PAGE.awardsMax);
    expect(out.certifications).toHaveLength(
      WEB_DEVELOPER_ONE_PAGE.certificationsMax
    );
  });
});
