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

export function ProjectEntryOfspace({ item, index, tokens, isLast }: Props) {
  const compact = index >= 1;

  return (
    <View style={pdfStyles.ofspaceProjectBlock} wrap>
      <Text style={pdfStyles.ofspaceProjectName}>{item.name}</Text>
      {item.techStack?.length ? (
        <Text style={pdfStyles.ofspaceProjectTech}>
          {item.techStack.join(" · ")}
        </Text>
      ) : null}
      {!compact && item.description ? (
        <Text style={pdfStyles.ofspaceBodyText}>{item.description}</Text>
      ) : null}
      {!compact &&
        (item.highlights ?? []).slice(0, 2).map((h, j) => (
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
