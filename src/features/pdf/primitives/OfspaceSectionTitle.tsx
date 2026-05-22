import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

export function OfspaceSectionTitle({
  title,
  highlightWidth,
}: {
  title: string;
  highlightWidth?: number;
}) {
  const barW = highlightWidth ?? Math.min(title.length * 6.5, 100);
  return (
    <View style={pdfStyles.ofspaceSectionTitleWrap} wrap={false}>
      <Text style={pdfStyles.ofspaceSectionTitleText}>{title}</Text>
      <View
        style={[pdfStyles.ofspaceSectionHighlightBar, { width: barW }]}
      />
    </View>
  );
}
