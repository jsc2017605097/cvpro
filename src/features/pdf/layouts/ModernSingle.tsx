import { Document, Page, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { pdfStyles } from "../tokens";
import { PdfHeaderBlock } from "../primitives/PdfHeaderBlock";
import {
  PdfSummarySection,
  PdfSkillsSection,
  PdfExperienceSection,
  PdfEducationSection,
  PdfProjectsSection,
  PdfCertificationsSection,
} from "../sections";

export function ModernSinglePdf({ data }: { data: CVData }) {
  const lang = data.meta.language;
  const sectionOpts = { showRule: true, plainSectionTitles: false };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeaderBlock data={data} contactInHeader />
        <View style={pdfStyles.rule} />
        <PdfSummarySection data={data} lang={lang} options={sectionOpts} />
        <PdfSkillsSection data={data} lang={lang} options={{ ...sectionOpts, skillMode: "inline" }} />
        <PdfExperienceSection data={data} lang={lang} options={sectionOpts} />
        <PdfEducationSection data={data} lang={lang} options={sectionOpts} />
        <PdfProjectsSection data={data} lang={lang} options={sectionOpts} />
        <PdfCertificationsSection data={data} lang={lang} options={sectionOpts} />
      </Page>
    </Document>
  );
}
