import { Document, Page } from "@react-pdf/renderer";
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

export function ModernSinglePdf({ data }: { data: CVData }) {
  return (
    <Document>
      <Page size="A4" style={baseStyles.page}>
        <PdfHeader data={data} />
        <PdfSummary data={data} />
        <PdfSkills data={data} />
        <PdfExperience data={data} />
        <PdfEducation data={data} />
        <PdfProjects data={data} />
      </Page>
    </Document>
  );
}
