import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

interface Props {
  label: string;
  isLast: boolean;
}

export function CertEntryCompact({ label, isLast }: Props) {
  return (
    <View style={pdfStyles.compactEntryBlock}>
      <Text style={pdfStyles.bodyText}>• {label}</Text>
      {!isLast ? <View style={pdfStyles.compactEntryDivider} /> : null}
    </View>
  );
}
