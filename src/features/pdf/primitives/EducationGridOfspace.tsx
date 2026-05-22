import { Text, View } from "@react-pdf/renderer";
import type { EducationItem } from "@/schemas/cv.schema";
import { formatEducationDateRange } from "../format-experience";
import { pdfStyles } from "../tokens";

export function EducationGridOfspace({ items }: { items: EducationItem[] }) {
  const item = items[0];
  if (!item) return null;

  const degreeLine = item.field
    ? `${item.degree} — ${item.field}`
    : item.degree;
  const meta = [item.school, formatEducationDateRange(item)]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={pdfStyles.ofspaceEducationWrap}>
      <Text style={pdfStyles.ofspaceEducationDegree}>{degreeLine}</Text>
      <Text style={pdfStyles.ofspaceEducationMeta}>{meta}</Text>
    </View>
  );
}
