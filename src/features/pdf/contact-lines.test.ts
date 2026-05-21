import { describe, it, expect } from "vitest";
import { contactLines } from "./contact-lines";

describe("contactLines", () => {
  it("returns only filled fields in order", () => {
    const lines = contactLines({
      fullName: "A",
      title: "B",
      email: "a@b.com",
      phone: "",
      location: "HN",
      linkedin: "",
      github: "",
      website: "",
    });
    expect(lines).toEqual(["a@b.com", "HN"]);
  });
});
