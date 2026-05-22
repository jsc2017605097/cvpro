import { describe, it, expect } from "vitest";
import { parseCertificationLine } from "./parse-certification-line";

describe("parseCertificationLine", () => {
  it("parses title — issuer (date)", () => {
    expect(
      parseCertificationLine("PMP — Project Management Institute (2010-05)")
    ).toEqual({
      title: "PMP",
      issuer: "Project Management Institute",
      date: "2010-05",
    });
  });

  it("parses title — issuer without date", () => {
    expect(parseCertificationLine("CAPM — PMI")).toEqual({
      title: "CAPM",
      issuer: "PMI",
      date: undefined,
    });
  });

  it("falls back to whole string as title", () => {
    expect(parseCertificationLine("AWS Certified")).toEqual({
      title: "AWS Certified",
      issuer: undefined,
      date: undefined,
    });
  });
});
