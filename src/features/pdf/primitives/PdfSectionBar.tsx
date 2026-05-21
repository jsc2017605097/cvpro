import { Text, View } from "@react-pdf/renderer";
import type { PdfLanguage } from "../labels";
import { pdfStyles } from "../tokens";

interface Props {
  label: string;
  language: PdfLanguage;
}

export function PdfSectionBar({ label, language }: Props) {
  const textStyle =
    language === "en"
      ? {
          ...pdfStyles.compactSectionBarText,
          ...pdfStyles.compactSectionBarTextEn,
        }
      : pdfStyles.compactSectionBarText;

  return (
    <View style={pdfStyles.compactSectionBar} wrap={false}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}
