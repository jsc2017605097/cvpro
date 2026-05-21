import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { sectionLabel } from "../labels";
import { pdfColors, pdfStyles, pdfType } from "../tokens";
import { ExperienceBlock } from "../primitives/ExperienceBlock";
import { EducationBlock } from "../primitives/EducationBlock";
import { ProjectsBlock } from "../primitives/ProjectsBlock";

const atsName = {
  fontSize: pdfType.atsName,
  color: pdfColors.ink,
  marginBottom: 4,
  fontWeight: 700 as const,
};

export function MinimalAtsPdf({ data }: { data: CVData }) {
  const lang = data.meta.language;
  const { personal } = data;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <Text style={atsName}>{personal.fullName}</Text>
        {personal.title ? (
          <Text style={pdfStyles.mutedLine}>{personal.title}</Text>
        ) : null}
        <Text style={pdfStyles.mutedLine}>
          {[personal.email, personal.phone, personal.location]
            .filter(Boolean)
            .join(" | ")}
        </Text>

        {data.summary ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("summary", lang)}
            </Text>
            <Text style={pdfStyles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {data.skills?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("skills", lang)}
            </Text>
            <Text style={pdfStyles.bodyText}>{data.skills.join(", ")}</Text>
          </View>
        ) : null}

        {data.experience?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("experience", lang)}
            </Text>
            <ExperienceBlock items={data.experience} dateOnRight />
          </View>
        ) : null}

        {data.education?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("education", lang)}
            </Text>
            <EducationBlock items={data.education} />
          </View>
        ) : null}

        {data.projects?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("projects", lang)}
            </Text>
            <ProjectsBlock items={data.projects} />
          </View>
        ) : null}

        {data.certifications?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={pdfStyles.sectionTitlePlain}>
              {sectionLabel("certifications", lang)}
            </Text>
            {data.certifications.map((c, i) => (
              <Text key={i} style={pdfStyles.bodyText}>
                - {c}
              </Text>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
