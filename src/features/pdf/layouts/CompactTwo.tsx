import { Document, Page, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import {
  CompactBodyCertificationsSection,
  CompactBodyEducationSection,
  CompactBodyExperienceSection,
  CompactBodyProjectsSection,
  CompactSidebarContact,
  CompactSidebarLanguages,
  CompactSidebarSkills,
  CompactSidebarSummary,
} from "../compact-sections";
import { CompactSidebarProfile } from "../primitives/CompactSidebarProfile";
import { pdfColors, pdfLayout, pdfSpace, pdfStyles } from "../tokens";

export function CompactTwoPdf({ data }: { data: CVData }) {
  const lang = data.meta.language;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View
          fixed
          style={{
            left: pdfSpace.pagePadding,
            top: pdfSpace.pagePadding,
            width: pdfLayout.sidebarWidthPt,
            bottom: pdfSpace.pagePadding,
            backgroundColor: pdfColors.compactSidebarBg,
          }}
        />

        <View style={pdfStyles.contentRow}>
          <View style={pdfStyles.compactSidebar}>
            <CompactSidebarProfile personal={data.personal} />
            <CompactSidebarContact data={data} lang={lang} />
            <CompactSidebarSummary data={data} lang={lang} />
            <CompactSidebarSkills data={data} lang={lang} />
            <CompactSidebarLanguages data={data} lang={lang} />
          </View>

          <View style={pdfStyles.compactBody}>
            <CompactBodyExperienceSection data={data} lang={lang} />
            <CompactBodyEducationSection data={data} lang={lang} />
            <CompactBodyProjectsSection data={data} lang={lang} />
            <CompactBodyCertificationsSection data={data} lang={lang} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
