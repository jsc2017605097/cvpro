import { Text, View } from "@react-pdf/renderer";
import type { EducationItem } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

interface Props {
  items: EducationItem[];
}

export function EducationBlock({ items }: Props) {
  return (
    <View>
      {items.map((edu, i) => (
        <View key={`${edu.school}-${i}`} style={{ marginBottom: 6 }}>
          <Text style={pdfStyles.roleLine}>
            {edu.degree}
            {edu.field ? `, ${edu.field}` : ""} — {edu.school}
          </Text>
          {(edu.startDate || edu.endDate) && (
            <Text style={pdfStyles.mutedLine}>
              {edu.startDate}
              {edu.endDate ? ` – ${edu.endDate}` : ""}
            </Text>
          )}
          {edu.details?.map((d, j) => (
            <Text key={j} style={pdfStyles.bullet}>
              • {d}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
