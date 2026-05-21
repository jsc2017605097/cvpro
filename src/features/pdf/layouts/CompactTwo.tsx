import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { baseStyles } from "../styles";
import {
  PdfEducation,
  PdfExperience,
  PdfHeader,
  PdfProjects,
  PdfSkills,
  PdfSummary,
} from "../shared";

export function CompactTwoPdf({ data }: { data: CVData }) {
  const { personal } = data;
  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <PdfHeader data={data} />
        <View style={baseStyles.row}>
          <View style={baseStyles.sidebar}>
            {contact ? (
              <View style={{ marginBottom: 8 }}>
                <Text style={baseStyles.h2}>Contact</Text>
                <Text style={baseStyles.muted}>{contact}</Text>
              </View>
            ) : null}
            <PdfSkills data={data} />
            {data.languages?.length ? (
              <View>
                <Text style={baseStyles.h2}>Languages</Text>
                <Text>{data.languages.join(", ")}</Text>
              </View>
            ) : null}
          </View>
          <View style={baseStyles.bodyCol}>
            <PdfSummary data={data} />
            <PdfExperience data={data} />
            <PdfEducation data={data} />
            <PdfProjects data={data} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
