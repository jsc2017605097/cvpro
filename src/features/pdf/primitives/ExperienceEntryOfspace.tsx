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

export function ExperienceEntryOfspace({ item, tokens, isLast }: Props) {
  const companyLine = item.location
    ? `${item.company}, ${item.location}`
    : item.company;

  return (
    <View style={pdfStyles.ofspaceEntryBlock}>
      <Text style={pdfStyles.ofspaceExperienceCompany}>{companyLine}</Text>
      <View style={pdfStyles.ofspaceExperienceMetaRow}>
        <Text style={pdfStyles.ofspaceExperienceRole}>{item.role}</Text>
        <Text style={pdfStyles.ofspaceExperienceDate}>
          {formatExperienceDateRange(item)}
        </Text>
      </View>
      {item.highlights.slice(0, 3).map((h, j) => (
        <HighlightText
          key={j}
          text={`• ${h}`}
          tokens={tokens}
          style={pdfStyles.ofspaceBullet}
        />
      ))}
      {!isLast ? <View style={pdfStyles.ofspaceEntryDivider} /> : null}
    </View>
  );
}
