import { Text, View } from "@react-pdf/renderer";
import type { SkillGroup } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

export function SkillGroupList({ groups }: { groups: SkillGroup[] }) {
  return (
    <View>
      {groups.map((group, i) => (
        <View key={`${group.category}-${i}`}>
          <Text style={pdfStyles.compactSkillGroupLabel}>{group.category}</Text>
          <Text style={pdfStyles.compactSkillGroupItems}>
            {group.items.join(", ")}
          </Text>
        </View>
      ))}
    </View>
  );
}
