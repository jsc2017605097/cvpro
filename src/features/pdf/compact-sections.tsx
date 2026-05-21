import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { contactLines } from "./contact-lines";
import {
  sectionLabel,
  sidebarSummaryLabel,
  type PdfLanguage,
} from "./labels";
import { CertTimelineEntry } from "./primitives/CertTimelineEntry";
import { EducationTimelineEntry } from "./primitives/EducationTimelineEntry";
import { ExperienceTimelineEntry } from "./primitives/ExperienceTimelineEntry";
import { PdfSectionBar } from "./primitives/PdfSectionBar";
import { ProjectTimelineEntry } from "./primitives/ProjectTimelineEntry";
import { SidebarPanelSection } from "./primitives/SidebarPanelSection";
import { SkillList } from "./primitives/SkillList";
import { pdfStyles } from "./tokens";

function ContactLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Text key={i} style={{ ...pdfStyles.mutedLine, marginBottom: 3 }}>
          {line}
        </Text>
      ))}
    </>
  );
}

export function CompactSidebarContact({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const lines = contactLines(data.personal);
  if (!lines.length) return null;

  return (
    <SidebarPanelSection label={sectionLabel("contact", lang)} language={lang}>
      <ContactLines lines={lines} />
    </SidebarPanelSection>
  );
}

export function CompactSidebarSummary({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.summary) return null;

  return (
    <SidebarPanelSection label={sidebarSummaryLabel(lang)} language={lang}>
      <Text style={pdfStyles.bodyText}>{data.summary}</Text>
    </SidebarPanelSection>
  );
}

export function CompactSidebarSkills({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.skills?.length) return null;

  return (
    <SidebarPanelSection label={sectionLabel("skills", lang)} language={lang}>
      <SkillList skills={data.skills} mode="bullets" dense />
    </SidebarPanelSection>
  );
}

export function CompactSidebarLanguages({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.languages?.length) return null;

  return (
    <SidebarPanelSection label={sectionLabel("languages", lang)} language={lang}>
      <Text style={pdfStyles.bodyText}>{data.languages.join(", ")}</Text>
    </SidebarPanelSection>
  );
}

export function CompactBodyExperienceSection({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.experience?.length) return null;

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("experience", lang)} language={lang} />
      {data.experience.map((item, i) => (
        <ExperienceTimelineEntry
          key={`${item.company}-${i}`}
          item={item}
          language={lang}
          isLast={i === data.experience!.length - 1}
        />
      ))}
    </View>
  );
}

export function CompactBodyEducationSection({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.education?.length) return null;

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("education", lang)} language={lang} />
      {data.education.map((item, i) => (
        <EducationTimelineEntry
          key={`${item.school}-${i}`}
          item={item}
          isLast={i === data.education!.length - 1}
        />
      ))}
    </View>
  );
}

export function CompactBodyProjectsSection({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.projects?.length) return null;

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("projects", lang)} language={lang} />
      {data.projects.map((item, i) => (
        <ProjectTimelineEntry
          key={`${item.name}-${i}`}
          item={item}
          isLast={i === data.projects!.length - 1}
        />
      ))}
    </View>
  );
}

export function CompactBodyCertificationsSection({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.certifications?.length) return null;

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar
        label={sectionLabel("certifications", lang)}
        language={lang}
      />
      {data.certifications.map((cert, i) => (
        <CertTimelineEntry
          key={`${cert}-${i}`}
          label={cert}
          isLast={i === data.certifications!.length - 1}
        />
      ))}
    </View>
  );
}
