import { Text, View } from "@react-pdf/renderer";
import type { EducationItem } from "@/schemas/cv.schema";
import { formatEducationDateRange } from "../format-experience";
import { pdfStyles } from "../tokens";
import { TimelineTrack } from "./TimelineTrack";

interface Props {
  item: EducationItem;
  isLast: boolean;
}

export function EducationTimelineEntry({ item, isLast }: Props) {
  const date = formatEducationDateRange(item);

  return (
    <View style={pdfStyles.timelineSectionRow} wrap={false}>
      <TimelineTrack isLast={isLast} />
      <View style={pdfStyles.timelineBody}>
        <View style={pdfStyles.timelineHeaderRow}>
          <Text style={pdfStyles.timelineTitle}>{item.school}</Text>
          {date ? <Text style={pdfStyles.timelineDate}>{date}</Text> : null}
        </View>
        <Text style={pdfStyles.roleLine}>
          {item.degree}
          {item.field ? `, ${item.field}` : ""}
        </Text>
        {item.details?.map((d, j) => (
          <Text key={j} style={pdfStyles.bullet}>
            • {d}
          </Text>
        ))}
      </View>
    </View>
  );
}
