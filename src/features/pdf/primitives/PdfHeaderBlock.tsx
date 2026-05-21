import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";

interface Props {
  data: CVData;
  contactInHeader?: boolean;
}

export function PdfHeaderBlock({ data, contactInHeader = true }: Props) {
  const { personal } = data;
  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <View>
      <Text style={pdfStyles.name}>{personal.fullName}</Text>
      {personal.title ? <Text style={pdfStyles.title}>{personal.title}</Text> : null}
      {contactInHeader && contact ? (
        <Text style={pdfStyles.contact}>{contact}</Text>
      ) : null}
    </View>
  );
}
