import { Text, View } from "@react-pdf/renderer";
import type { ProjectItem } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";
import { HighlightText } from "./HighlightText";

interface Props {
  item: ProjectItem;
  index: number;
  tokens: string[];
  isLast: boolean;
}

export function ProjectEntryCompact({ item, index, tokens, isLast }: Props) {
  const compact = index >= 3;

  return (
    <View style={pdfStyles.compactEntryBlock}>
      <Text style={pdfStyles.compactExperienceCompany}>{item.name}</Text>
      {item.techStack?.length ? (
        <Text style={pdfStyles.mutedLine}>{item.techStack.join(" · ")}</Text>
      ) : null}
      {!compact && item.description ? (
        <Text style={pdfStyles.bodyText}>{item.description}</Text>
      ) : null}
      {!compact &&
        (item.highlights ?? []).slice(0, 2).map((h, j) => (
          <HighlightText key={j} text={`• ${h}`} tokens={tokens} />
        ))}
      {!isLast ? <View style={pdfStyles.compactEntryDivider} /> : null}
    </View>
  );
}
