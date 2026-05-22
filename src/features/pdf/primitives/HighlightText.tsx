import { Text } from "@react-pdf/renderer";
import { parseHighlightSegments } from "@/lib/parse-highlight-text";
import { pdfStyles } from "../tokens";

export function HighlightText({
  text,
  tokens = [],
  style,
}: {
  text: string;
  tokens?: string[];
  style?: typeof pdfStyles.bullet;
}) {
  const segments = parseHighlightSegments(text, tokens);
  const baseStyle = style ?? pdfStyles.bullet;

  return (
    <Text style={baseStyle}>
      {segments.map((seg, i) => (
        <Text
          key={i}
          style={seg.bold ? { fontWeight: 700 } : undefined}
        >
          {seg.text}
        </Text>
      ))}
    </Text>
  );
}
