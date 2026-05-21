import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { sectionLabel } from "../labels";
import { pdfColors, pdfStyles } from "../tokens";
import { PdfHeaderBlock } from "../primitives/PdfHeaderBlock";
import { SkillList } from "../primitives/SkillList";
import {
  PdfSummarySection,
  PdfExperienceSection,
  PdfEducationSection,
  PdfProjectsSection,
} from "../sections";

const sidebarLabel = {
  fontSize: 8,
  fontWeight: 700 as const,
  letterSpacing: 1,
  textTransform: "uppercase" as const,
  color: pdfColors.ink,
  marginBottom: 4,
  marginTop: 6,
};

function SidebarContact({ data }: { data: CVData }) {
  const { personal } = data;
  const lines = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
    personal.website,
  ].filter(Boolean) as string[];

  if (!lines.length) return null;

  return (
    <View style={pdfStyles.sidebarBlock}>
      {lines.map((line, i) => (
        <Text key={i} style={{ ...pdfStyles.mutedLine, marginBottom: 3 }}>
          {line}
        </Text>
      ))}
    </View>
  );
}

export function CompactTwoPdf({ data }: { data: CVData }) {
  const lang = data.meta.language;
  const sectionOpts = { showRule: false, plainSectionTitles: false };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeaderBlock data={data} contactInHeader={false} />
        <View style={{ ...pdfStyles.rule, marginBottom: 10 }} />
        <View style={pdfStyles.row}>
          <View style={pdfStyles.sidebar}>
            <Text style={sidebarLabel}>{sectionLabel("contact", lang)}</Text>
            <SidebarContact data={data} />
            {data.skills?.length ? (
              <View style={pdfStyles.sidebarBlock}>
                <Text style={sidebarLabel}>{sectionLabel("skills", lang)}</Text>
                <SkillList skills={data.skills} mode="bullets" />
              </View>
            ) : null}
            {data.languages?.length ? (
              <View style={pdfStyles.sidebarBlock}>
                <Text style={sidebarLabel}>{sectionLabel("languages", lang)}</Text>
                <Text style={pdfStyles.bodyText}>{data.languages.join(", ")}</Text>
              </View>
            ) : null}
            {data.certifications?.length ? (
              <View style={pdfStyles.sidebarBlock}>
                <Text style={sidebarLabel}>{sectionLabel("certifications", lang)}</Text>
                {data.certifications.map((c, i) => (
                  <Text key={i} style={pdfStyles.bullet}>
                    • {c}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
          <View style={pdfStyles.bodyCol}>
            <PdfSummarySection data={data} lang={lang} options={sectionOpts} />
            <PdfExperienceSection data={data} lang={lang} options={sectionOpts} />
            <PdfEducationSection data={data} lang={lang} options={sectionOpts} />
            <PdfProjectsSection data={data} lang={lang} options={sectionOpts} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
