import type { EducationItem, ExperienceItem } from "@/schemas/cv.schema";

export function formatDateRange(item: ExperienceItem): string {
  const end = item.endDate
    ? item.endDate
    : item.current
      ? "Present"
      : "";
  const range = end ? `${item.startDate} – ${end}` : item.startDate;
  return item.location ? `${range} · ${item.location}` : range;
}

export function formatExperienceDateRange(item: ExperienceItem): string {
  const end = item.endDate
    ? item.endDate
    : item.current
      ? "Present"
      : "";
  return end ? `${item.startDate} – ${end}` : item.startDate;
}

export function formatEducationDateRange(item: EducationItem): string {
  if (item.startDate && item.endDate) {
    return `${item.startDate} – ${item.endDate}`;
  }
  return item.endDate ?? item.startDate ?? "";
}
