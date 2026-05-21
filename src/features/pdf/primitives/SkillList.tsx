import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

interface Props {
  skills: string[];
  mode?: "inline" | "bullets";
}

export function SkillList({ skills, mode = "inline" }: Props) {
  if (mode === "inline") {
    return <Text style={pdfStyles.bodyText}>{skills.join(" · ")}</Text>;
  }

  return (
    <View>
      {skills.map((skill, i) => (
        <Text key={i} style={pdfStyles.bullet}>
          • {skill}
        </Text>
      ))}
    </View>
  );
}
