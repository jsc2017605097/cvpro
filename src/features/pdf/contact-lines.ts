import type { CVData } from "@/schemas/cv.schema";

export function contactLines(personal: CVData["personal"]): string[] {
  return [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website,
  ].filter(Boolean) as string[];
}
