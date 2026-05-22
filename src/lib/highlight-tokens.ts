import type { CVData } from "@/schemas/cv.schema";
import type { SkillGroup } from "@/schemas/cv.schema";
import { isSkillRatedArray } from "@/schemas/cv.schema";

function isSkillGroupArray(
  skills: CVData["skills"]
): skills is SkillGroup[] {
  if (!Array.isArray(skills) || skills.length === 0) return false;
  const first = skills[0];
  return (
    typeof first === "object" &&
    first !== null &&
    "category" in first &&
    "items" in first
  );
}

export function collectHighlightTokens(data: CVData): string[] {
  const set = new Set<string>();

  if (data.skills?.length) {
    if (isSkillRatedArray(data.skills)) {
      for (const s of data.skills) set.add(s.name);
    } else if (isSkillGroupArray(data.skills)) {
      for (const g of data.skills) {
        for (const item of g.items) set.add(item);
      }
    } else {
      for (const s of data.skills) set.add(s);
    }
  }

  for (const job of data.experience ?? []) {
    for (const h of job.highlights) {
      const bold = h.match(/\*\*([^*]+)\*\*/g);
      if (bold) {
        for (const m of bold) set.add(m.replace(/\*\*/g, ""));
      }
    }
  }

  for (const p of data.projects ?? []) {
    for (const t of p.techStack ?? []) set.add(t);
    for (const h of p.highlights ?? []) {
      const bold = h.match(/\*\*([^*]+)\*\*/g);
      if (bold) {
        for (const m of bold) set.add(m.replace(/\*\*/g, ""));
      }
    }
  }

  return [...set].sort((a, b) => b.length - a.length);
}
