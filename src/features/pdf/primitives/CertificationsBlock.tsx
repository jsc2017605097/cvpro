import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

interface Props {
  items: string[];
}

export function CertificationsBlock({ items }: Props) {
  return (
    <View>
      {items.map((cert, i) => (
        <Text key={i} style={pdfStyles.bullet}>
          • {cert}
        </Text>
      ))}
    </View>
  );
}
