import { View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

export function TimelineTrack({ isLast }: { isLast: boolean }) {
  return (
    <View style={pdfStyles.timelineTrack}>
      <View style={pdfStyles.timelineDot} />
      {!isLast ? <View style={pdfStyles.timelineLine} /> : null}
    </View>
  );
}
