import { Text, View } from "@react-pdf/renderer";
import type { ExperienceItem } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

interface Props {
  items: ExperienceItem[];
  dateOnRight?: boolean;
}

function formatDateRange(item: ExperienceItem): string {
  const end = item.endDate
    ? item.endDate
    : item.current
      ? "Present"
      : "";
  const range = end ? `${item.startDate} – ${end}` : item.startDate;
  return item.location ? `${range} · ${item.location}` : range;
}

export function ExperienceBlock({ items, dateOnRight = false }: Props) {
  return (
    <View>
      {items.map((exp, i) => (
        <View key={`${exp.company}-${i}`} style={{ marginBottom: 8 }}>
          {dateOnRight ? (
            <View style={pdfStyles.rowBetween}>
              <Text style={{ ...pdfStyles.roleLine, flexGrow: 1, maxWidth: "72%" }}>
                {exp.role} — {exp.company}
              </Text>
              <Text style={pdfStyles.mutedLine}>{formatDateRange(exp)}</Text>
            </View>
          ) : (
            <>
              <Text style={pdfStyles.roleLine}>
                {exp.role} — {exp.company}
              </Text>
              <Text style={pdfStyles.mutedLine}>{formatDateRange(exp)}</Text>
            </>
          )}
          {exp.highlights.map((h, j) => (
            <Text key={j} style={pdfStyles.bullet}>
              • {h}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
