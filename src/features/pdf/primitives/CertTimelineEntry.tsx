import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";
import { TimelineTrack } from "./TimelineTrack";

interface Props {
  label: string;
  isLast: boolean;
}

export function CertTimelineEntry({ label, isLast }: Props) {
  return (
    <View style={pdfStyles.timelineSectionRow} wrap={false}>
      <TimelineTrack isLast={isLast} />
      <View style={pdfStyles.timelineBody}>
        <Text style={pdfStyles.timelineTitle}>{label}</Text>
      </View>
    </View>
  );
}
