import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

interface Props {
  data: CVData;
  contactInHeader?: boolean;
}

function contactLines(personal: CVData["personal"]): string[] {
  return [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website,
  ].filter(Boolean) as string[];
}

export function PdfHeaderBlock({ data, contactInHeader = true }: Props) {
  const { personal } = data;
  const lines = contactInHeader ? contactLines(personal) : [];

  return (
    <View style={pdfStyles.headerBlock}>
      <Text style={pdfStyles.name}>{personal.fullName}</Text>
      {personal.title ? (
        <Text style={pdfStyles.title}>{personal.title}</Text>
      ) : null}
      {lines.map((line, i) => (
        <Text key={i} style={pdfStyles.contactLine}>
          {line}
        </Text>
      ))}
    </View>
  );
}
