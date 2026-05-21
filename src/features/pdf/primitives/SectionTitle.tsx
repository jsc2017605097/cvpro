import { Text, View } from "@react-pdf/renderer";
import { pdfStyles } from "../tokens";

interface Props {
  label: string;
  showRule?: boolean;
  plain?: boolean;
}

export function SectionTitle({ label, showRule = true, plain = false }: Props) {
  return (
    <View wrap={false}>
      <Text style={plain ? pdfStyles.sectionTitlePlain : pdfStyles.sectionTitle}>
        {label}
      </Text>
      {showRule && !plain ? <View style={pdfStyles.rule} /> : null}
    </View>
  );
}
