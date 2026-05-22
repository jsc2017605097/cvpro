import { Document, Page, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { clampCvDataForCompactTwoPdf } from "@/lib/compact-two-one-page";
import {
  OfspaceHeader,
  OfspaceMainEducation,
  OfspaceMainExperience,
  OfspaceMainProjects,
  OfspaceMainSummary,
  OfspaceRailCertifications,
  OfspaceRailContact,
  OfspaceRailLanguages,
  OfspaceRailSkills,
} from "../ofspace-sections";
import { pdfColors, pdfStyles } from "../tokens";

export function CompactTwoPdf({ data }: { data: CVData }) {
  const capped = clampCvDataForCompactTwoPdf(data);
  const lang = capped.meta.language;

  return (
    <Document>
      <Page
        size="A4"
        style={[pdfStyles.page, { backgroundColor: pdfColors.ofspacePageBg }]}
      >
        <OfspaceHeader personal={capped.personal} />
        <View style={pdfStyles.ofspaceContentRow}>
          <View style={pdfStyles.ofspaceMainColumn}>
            <OfspaceMainSummary data={capped} lang={lang} />
            <OfspaceMainExperience data={capped} lang={lang} />
            <OfspaceMainEducation data={capped} lang={lang} />
            <OfspaceMainProjects data={capped} lang={lang} />
          </View>
          <View style={pdfStyles.ofspaceRailColumn}>
            <OfspaceRailContact data={capped} lang={lang} />
            <OfspaceRailSkills data={capped} lang={lang} />
            <OfspaceRailCertifications data={capped} lang={lang} />
            <OfspaceRailLanguages data={capped} lang={lang} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
