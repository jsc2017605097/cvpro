import { CVDataSchema, type CVData } from "@/schemas/cv.schema";
import { extractJsonFromText } from "./extract-json";

export type ImportResult =
  | { ok: true; data: CVData }
  | { ok: false; message: string; fieldErrors?: string[] };

export function importCVFromText(text: string): ImportResult {
  try {
    const raw = extractJsonFromText(text);
    const parsed = JSON.parse(raw) as unknown;
    const result = CVDataSchema.safeParse(parsed);
    if (!result.success) {
      const fieldErrors = result.error.issues.map(
        (i) => `${i.path.join(".")}: ${i.message}`
      );
      return {
        ok: false,
        message: "Dữ liệu import không khớp schema CV.",
        fieldErrors,
      };
    }
    return { ok: true, data: result.data };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Import thất bại.";
    return { ok: false, message: msg };
  }
}
