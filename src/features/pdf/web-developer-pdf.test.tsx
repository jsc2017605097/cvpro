import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, beforeAll } from "vitest";
import { Font, renderToBuffer } from "@react-pdf/renderer";
import { WebDeveloperPdf } from "./layouts/WebDeveloper";
import fixture from "./__fixtures__/web-developer-golden.json";
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

describe("WebDeveloperPdf", () => {
  it("renders web-developer layout", async () => {
    const data = CVDataSchema.parse(fixture);
    const buf = await renderToBuffer(<WebDeveloperPdf data={data} />);
    expect(buf.length).toBeGreaterThan(1000);
  });
});
