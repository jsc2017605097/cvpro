import { Text, View } from "@react-pdf/renderer";
import type { ProjectItem } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

interface Props {
  items: ProjectItem[];
}

export function ProjectsBlock({ items }: Props) {
  return (
    <View>
      {items.map((p, i) => (
        <View key={`${p.name}-${i}`} style={{ marginBottom: 6 }}>
          <Text style={pdfStyles.roleLine}>{p.name}</Text>
          {p.techStack?.length ? (
            <Text style={pdfStyles.mutedLine}>{p.techStack.join(" · ")}</Text>
          ) : null}
          <Text style={pdfStyles.bodyText}>{p.description}</Text>
          {p.highlights?.map((h, j) => (
            <Text key={j} style={pdfStyles.bullet}>
              • {h}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
