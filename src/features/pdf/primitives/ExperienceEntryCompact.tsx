import { Text, View } from "@react-pdf/renderer";
import type { ExperienceItem } from "@/schemas/cv.schema";
import { formatExperienceDateRange } from "../format-experience";
import { pdfStyles } from "../tokens";
import { HighlightText } from "./HighlightText";

interface Props {
  item: ExperienceItem;
  tokens: string[];
  isLast: boolean;
}

export function ExperienceEntryCompact({ item, tokens, isLast }: Props) {
  return (
    <View style={pdfStyles.compactEntryBlock}>
      <View style={pdfStyles.timelineHeaderRow} wrap={false}>
        <Text style={pdfStyles.compactExperienceCompany}>{item.company}</Text>
        <Text style={pdfStyles.compactExperienceDate}>
          {formatExperienceDateRange(item)}
        </Text>
      </View>
      <Text style={pdfStyles.compactRoleCaps}>{item.role}</Text>
      {item.location ? (
        <Text style={pdfStyles.mutedLine}>{item.location}</Text>
      ) : null}
      {item.highlights.map((h, j) => (
        <HighlightText key={j} text={`• ${h}`} tokens={tokens} />
      ))}
      {!isLast ? <View style={pdfStyles.compactEntryDivider} /> : null}
    </View>
  );
}
