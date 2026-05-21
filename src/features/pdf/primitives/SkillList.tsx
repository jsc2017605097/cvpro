import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

interface Props {
  skills: string[];
  mode?: "inline" | "bullets";
  dense?: boolean;
}

export function SkillList({ skills, mode = "inline", dense = false }: Props) {
  if (mode === "inline") {
    return <Text style={pdfStyles.bodyText}>{skills.join(" · ")}</Text>;
  }

  const bulletStyle = dense ? pdfStyles.sidebarSkillBullet : pdfStyles.bullet;

  return (
    <View>
      {skills.map((skill, i) => (
        <Text key={i} style={bulletStyle}>
          • {skill}
        </Text>
      ))}
    </View>
  );
}
