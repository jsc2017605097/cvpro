import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { sectionLabel, type PdfLanguage } from "./labels";
import { SectionTitle } from "./primitives/SectionTitle";
import { ExperienceBlock } from "./primitives/ExperienceBlock";
import { SkillList } from "./primitives/SkillList";
import { EducationBlock } from "./primitives/EducationBlock";
import { ProjectsBlock } from "./primitives/ProjectsBlock";
import { CertificationsBlock } from "./primitives/CertificationsBlock";
import { pdfStyles } from "./tokens";

interface Options {
  showRule?: boolean;
  plainSectionTitles?: boolean;
  skillMode?: "inline" | "bullets";
  dateOnRight?: boolean;
}

export function PdfSummarySection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.summary) return null;
  const { showRule = true, plainSectionTitles = false } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("summary", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <Text style={pdfStyles.bodyText}>{data.summary}</Text>
    </View>
  );
}

export function PdfSkillsSection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.skills?.length) return null;
  const { showRule = true, plainSectionTitles = false, skillMode = "inline" } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("skills", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <SkillList skills={data.skills} mode={skillMode} />
    </View>
  );
}

export function PdfExperienceSection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.experience?.length) return null;
  const { showRule = true, plainSectionTitles = false, dateOnRight = false } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("experience", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <ExperienceBlock items={data.experience} dateOnRight={dateOnRight} />
    </View>
  );
}

export function PdfEducationSection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.education?.length) return null;
  const { showRule = true, plainSectionTitles = false } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("education", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <EducationBlock items={data.education} />
    </View>
  );
}

export function PdfProjectsSection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.projects?.length) return null;
  const { showRule = true, plainSectionTitles = false } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("projects", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <ProjectsBlock items={data.projects} />
    </View>
  );
}

export function PdfCertificationsSection({
  data,
  lang,
  options = {},
}: {
  data: CVData;
  lang: PdfLanguage;
  options?: Options;
}) {
  if (!data.certifications?.length) return null;
  const { showRule = true, plainSectionTitles = false } = options;
  return (
    <View>
      <SectionTitle
        label={sectionLabel("certifications", lang)}
        showRule={showRule}
        plain={plainSectionTitles}
      />
      <CertificationsBlock items={data.certifications} />
    </View>
  );
}
