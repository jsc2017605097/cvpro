import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, beforeAll } from "vitest";
import { Font, renderToBuffer } from "@react-pdf/renderer";
import { WebDeveloperPdf } from "./layouts/WebDeveloper";
import fixture from "./__fixtures__/web-developer-golden.json";
import fixtureCuong from "./__fixtures__/web-developer-cuong.json";
import { CVDataSchema } from "@/schemas/cv.schema";

const fontsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../../public/fonts"
);

beforeAll(() => {
  Font.register({
    family: "NotoSans",
    fonts: [
      { src: path.join(fontsDir, "NotoSans-Regular.ttf"), fontWeight: 400 },
      { src: path.join(fontsDir, "NotoSans-Bold.ttf"), fontWeight: 700 },
    ],
  });
});

function countPdfPages(buf: Buffer): number {
  const raw = buf.toString("latin1");
  return (raw.match(/\/Type\s*\/Page\b/g) ?? []).length;
}

describe("WebDeveloperPdf", () => {
  it("renders web-developer layout", async () => {
    const data = CVDataSchema.parse(fixture);
    const buf = await renderToBuffer(<WebDeveloperPdf data={data} />);
    expect(buf.length).toBeGreaterThan(1000);
  });

  it("renders exactly one page (no blank leading page)", async () => {
    const data = CVDataSchema.parse(fixture);
    const buf = await renderToBuffer(<WebDeveloperPdf data={data} />);
    expect(countPdfPages(buf)).toBe(1);
  });

  it("renders user import (Cuong) as single page", async () => {
    const data = CVDataSchema.parse(fixtureCuong);
    const buf = await renderToBuffer(<WebDeveloperPdf data={data} />);
    expect(countPdfPages(buf)).toBe(1);
  });

  it("Cuong without remote avatar is single page", async () => {
    const raw = { ...fixtureCuong, personal: { ...fixtureCuong.personal, avatarUrl: undefined } };
    const data = CVDataSchema.parse(raw);
    const buf = await renderToBuffer(<WebDeveloperPdf data={data} />);
    expect(countPdfPages(buf)).toBe(1);
  });
});
