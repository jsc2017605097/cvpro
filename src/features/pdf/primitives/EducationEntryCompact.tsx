import { Text, View } from "@react-pdf/renderer";
import type { EducationItem } from "@/schemas/cv.schema";
import { formatEducationDateRange } from "../format-experience";
import { pdfStyles } from "../tokens";
import { HighlightText } from "./HighlightText";

interface Props {
  item: EducationItem;
  tokens: string[];
  isLast: boolean;
}

export function EducationEntryCompact({ item, tokens, isLast }: Props) {
  const degreeLine = item.field
    ? `${item.degree} — ${item.field}`
    : item.degree;

  return (
    <View style={pdfStyles.compactEntryBlock}>
      <View style={pdfStyles.timelineHeaderRow} wrap={false}>
        <Text style={pdfStyles.compactExperienceCompany}>{item.school}</Text>
        <Text style={pdfStyles.compactExperienceDate}>
          {formatEducationDateRange(item)}
        </Text>
      </View>
      <Text style={pdfStyles.compactRoleCaps}>{degreeLine}</Text>
      {(item.details ?? []).map((d, j) => (
        <HighlightText key={j} text={`• ${d}`} tokens={tokens} />
      ))}
      {!isLast ? <View style={pdfStyles.compactEntryDivider} /> : null}
    </View>
  );
}
