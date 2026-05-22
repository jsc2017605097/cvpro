import { Text, View } from "@react-pdf/renderer";
import type { SkillRated } from "@/schemas/cv.schema";
import { pdfColors, pdfLayout, pdfStyles } from "../tokens";

export function SkillProgressBar({ name, level }: SkillRated) {
  const trackW = pdfLayout.ofspaceSkillBarWidthPt;
  const fillW = (Math.max(0, Math.min(100, level)) / 100) * trackW;
  return (
    <View style={pdfStyles.ofspaceSkillRow}>
      <Text style={pdfStyles.ofspaceSkillName}>{name}</Text>
      <View
        style={{
          width: trackW,
          height: 5,
          backgroundColor: pdfColors.ofspaceBarTrack,
          marginTop: 4,
        }}
      >
        <View
          style={{
            width: fillW,
            height: 5,
            backgroundColor: pdfColors.ofspaceGold,
          }}
        />
      </View>
    </View>
  );
}
