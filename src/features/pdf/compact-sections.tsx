import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { collectHighlightTokens } from "@/lib/highlight-tokens";
import { normalizeSkills } from "@/lib/skills";
import { truncateAtWordBoundary } from "@/lib/truncate-text";
import {
  sectionLabel,
  sidebarSummaryLabel,
  type PdfLanguage,
} from "./labels";
import { CertEntryCompact } from "./primitives/CertEntryCompact";
import { EducationEntryCompact } from "./primitives/EducationEntryCompact";
import { ExperienceEntryCompact } from "./primitives/ExperienceEntryCompact";
import { PdfSectionBar } from "./primitives/PdfSectionBar";
import { ProjectEntryCompact } from "./primitives/ProjectEntryCompact";
import { SidebarPanelSection } from "./primitives/SidebarPanelSection";
import { SkillGroupList } from "./primitives/SkillGroupList";
import { pdfStyles } from "./tokens";

export function CompactSidebarSummary({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.summary) return null;
  const text = truncateAtWordBoundary(data.summary, 700);

  return (
    <SidebarPanelSection label={sidebarSummaryLabel(lang)} language={lang}>
      <Text style={pdfStyles.bodyText}>{text}</Text>
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
  const groups = normalizeSkills(data.skills, lang);
  if (!groups.length) return null;

  return (
    <SidebarPanelSection label={sectionLabel("skills", lang)} language={lang}>
      <SkillGroupList groups={groups} />
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
  const tokens = collectHighlightTokens(data);

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("experience", lang)} language={lang} />
      {data.experience.map((item, i) => (
        <ExperienceEntryCompact
          key={`${item.company}-${i}`}
          item={item}
          tokens={tokens}
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
  const tokens = collectHighlightTokens(data);

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("education", lang)} language={lang} />
      {data.education.map((item, i) => (
        <EducationEntryCompact
          key={`${item.school}-${i}`}
          item={item}
          tokens={tokens}
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
  const projects = data.projects?.slice(0, 4) ?? [];
  if (!projects.length) return null;
  const tokens = collectHighlightTokens(data);

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar label={sectionLabel("projects", lang)} language={lang} />
      {projects.map((item, i) => (
        <ProjectEntryCompact
          key={`${item.name}-${i}`}
          item={item}
          index={i}
          tokens={tokens}
          isLast={i === projects.length - 1}
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
  const certs = data.certifications?.slice(0, 4) ?? [];
  if (!certs.length) return null;

  return (
    <View style={{ marginBottom: 8 }}>
      <PdfSectionBar
        label={sectionLabel("certifications", lang)}
        language={lang}
      />
      {certs.map((cert, i) => (
        <CertEntryCompact
          key={`${cert}-${i}`}
          label={cert}
          isLast={i === certs.length - 1}
        />
      ))}
    </View>
  );
}

export { CompactSidebarContact } from "./primitives/CompactSidebarContact";
