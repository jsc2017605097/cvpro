import { Text, View } from "@react-pdf/renderer";
import type { ExperienceItem } from "@/schemas/cv.schema";
import type { PdfLanguage } from "../labels";
import { formatExperienceDateRange } from "../format-experience";
import { pdfStyles } from "../tokens";
import { TimelineTrack } from "./TimelineTrack";

interface Props {
  item: ExperienceItem;
  language: PdfLanguage;
  isLast: boolean;
}

export function ExperienceTimelineEntry({ item, language, isLast }: Props) {
  const roleStyle = language === "en" ? pdfStyles.roleLineEn : pdfStyles.roleLine;

  return (
    <View style={pdfStyles.timelineSectionRow} wrap={false}>
      <TimelineTrack isLast={isLast} />
      <View style={pdfStyles.timelineBody}>
        <View style={pdfStyles.timelineHeaderRow}>
          <Text style={pdfStyles.timelineTitle}>{item.company}</Text>
          <Text style={pdfStyles.timelineDate}>
            {formatExperienceDateRange(item)}
          </Text>
        </View>
        <Text style={roleStyle}>{item.role}</Text>
        {item.location ? (
          <Text style={pdfStyles.mutedLine}>{item.location}</Text>
        ) : null}
        {item.highlights.map((h, j) => (
          <Text key={j} style={pdfStyles.bullet}>
            • {h}
          </Text>
        ))}
      </View>
    </View>
  );
}
