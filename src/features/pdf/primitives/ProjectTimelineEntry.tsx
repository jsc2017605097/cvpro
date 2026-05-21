import { Text, View } from "@react-pdf/renderer";
import type { ProjectItem } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";
import { TimelineTrack } from "./TimelineTrack";

interface Props {
  item: ProjectItem;
  isLast: boolean;
}

export function ProjectTimelineEntry({ item, isLast }: Props) {
  return (
    <View style={pdfStyles.timelineSectionRow} wrap={false}>
      <TimelineTrack isLast={isLast} />
      <View style={pdfStyles.timelineBody}>
        <Text style={pdfStyles.timelineTitle}>{item.name}</Text>
        {item.techStack?.length ? (
          <Text style={pdfStyles.mutedLine}>{item.techStack.join(" · ")}</Text>
        ) : null}
        <Text style={pdfStyles.bodyText}>{item.description}</Text>
        {item.highlights?.map((h, j) => (
          <Text key={j} style={pdfStyles.bullet}>
            • {h}
          </Text>
        ))}
      </View>
    </View>
  );
}
