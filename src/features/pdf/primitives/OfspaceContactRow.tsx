import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

/** Chữ ASCII — Noto Sans PDF không render glyph đặc biệt (⌖ ☎ ◉). */
const ICON_LETTER: Record<string, string> = {
  location: "L",
  phone: "P",
  email: "E",
  web: "W",
};

export function OfspaceContactRow({
  icon,
  value,
}: {
  icon: "location" | "phone" | "email" | "web";
  value: string;
}) {
  if (!value.trim()) return null;
  return (
    <View style={pdfStyles.ofspaceContactRow} wrap={false}>
      <View style={pdfStyles.ofspaceContactIconCircle}>
        <Text style={pdfStyles.ofspaceContactIconLetter}>
          {ICON_LETTER[icon]}
        </Text>
      </View>
      <Text style={pdfStyles.ofspaceContactValue}>{value}</Text>
    </View>
  );
}
