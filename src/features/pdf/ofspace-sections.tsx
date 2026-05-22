import { Text, View } from "@react-pdf/renderer";
import type { CVData, Personal } from "@/schemas/cv.schema";
import { collectHighlightTokens } from "@/lib/highlight-tokens";
import { COMPACT_TWO_ONE_PAGE } from "@/lib/compact-two-one-page";
import { normalizeToRatedSkills } from "@/lib/skills";
import { truncateAtWordBoundary } from "@/lib/truncate-text";
import {
  mySelfLabel,
  sectionLabel,
  type PdfLanguage,
} from "./labels";
import { EducationGridOfspace } from "./primitives/EducationGridOfspace";
import { ExperienceEntryOfspace } from "./primitives/ExperienceEntryOfspace";
import { OfspaceContactRow } from "./primitives/OfspaceContactRow";
import { OfspaceSectionTitle } from "./primitives/OfspaceSectionTitle";
import { ProjectEntryOfspace } from "./primitives/ProjectEntryOfspace";
import { SkillProgressBar } from "./primitives/SkillProgressBar";
import { pdfStyles } from "./tokens";

export function OfspaceHeader({ personal }: { personal: Personal }) {
  return (
    <View style={pdfStyles.ofspaceHeader}>
      <Text style={pdfStyles.ofspaceName}>{personal.fullName}</Text>
      {personal.title ? (
        <Text style={pdfStyles.ofspaceTitle}>{personal.title}</Text>
      ) : null}
    </View>
  );
}

export function OfspaceMainSummary({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  if (!data.summary) return null;
  const text = truncateAtWordBoundary(
    data.summary,
    COMPACT_TWO_ONE_PAGE.summaryMaxChars
  );
  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={mySelfLabel(lang)} />
      <Text style={pdfStyles.ofspaceBodyText}>{text}</Text>
    </View>
  );
}

export function OfspaceMainExperience({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const jobs = data.experience?.slice(0, COMPACT_TWO_ONE_PAGE.experienceMaxJobs) ?? [];
  if (!jobs.length) return null;
  const tokens = collectHighlightTokens(data);
  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={sectionLabel("experience", lang)} />
      {jobs.map((item, i) => (
        <ExperienceEntryOfspace
          key={`${item.company}-${i}`}
          item={item}
          tokens={tokens}
          isLast={i === jobs.length - 1}
        />
      ))}
    </View>
  );
}

export function OfspaceMainEducation({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const items = data.education ?? [];
  if (!items.length) return null;
  return (
    <View style={pdfStyles.ofspaceSectionBlock} wrap>
      <OfspaceSectionTitle title={sectionLabel("education", lang)} />
      <EducationGridOfspace items={items} />
    </View>
  );
}

export function OfspaceMainProjects({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const projects = data.projects?.slice(0, COMPACT_TWO_ONE_PAGE.projectsMax) ?? [];
  if (!projects.length) return null;
  const tokens = collectHighlightTokens(data);
  return (
    <View style={[pdfStyles.ofspaceSectionBlock, pdfStyles.ofspaceProjectsSection]}>
      <OfspaceSectionTitle title={sectionLabel("projects", lang)} />
      {projects.map((item, i) => (
        <ProjectEntryOfspace
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

export function OfspaceRailContact({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const p = data.personal;
  const web = p.website || p.linkedin || "";
  const hasContact = p.location || p.phone || p.email || web;
  if (!hasContact) return null;

  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={sectionLabel("contact", lang)} />
      <OfspaceContactRow icon="location" value={p.location ?? ""} />
      <OfspaceContactRow icon="phone" value={p.phone ?? ""} />
      <OfspaceContactRow icon="email" value={p.email ?? ""} />
      <OfspaceContactRow icon="web" value={web} />
    </View>
  );
}

export function OfspaceRailSkills({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const rated = normalizeToRatedSkills(data.skills, lang).slice(
    0,
    COMPACT_TWO_ONE_PAGE.skillsMax
  );
  if (!rated.length) return null;
  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={sectionLabel("skills", lang)} />
      {rated.map((skill) => (
        <SkillProgressBar key={skill.name} {...skill} />
      ))}
    </View>
  );
}

function parseCertLine(cert: string): { title: string; meta: string } {
  const m = cert.match(/^(.+?)\s*[—–-]\s*(.+)$/);
  if (m) return { title: m[1].trim(), meta: m[2].trim() };
  return { title: cert, meta: "" };
}

export function OfspaceRailCertifications({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const certs = data.certifications?.slice(0, COMPACT_TWO_ONE_PAGE.certificationsMax) ?? [];
  if (!certs.length) return null;
  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={sectionLabel("certifications", lang)} />
      {certs.map((cert, i) => {
        const { title, meta } = parseCertLine(cert);
        return (
          <View key={`${cert}-${i}`}>
            <Text style={pdfStyles.ofspaceCertTitle}>{title}</Text>
            {meta ? <Text style={pdfStyles.ofspaceCertMeta}>{meta}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

export function OfspaceRailLanguages({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const langs = data.languages?.slice(0, COMPACT_TWO_ONE_PAGE.languagesMax) ?? [];
  if (!langs.length) return null;
  return (
    <View style={pdfStyles.ofspaceSectionBlock}>
      <OfspaceSectionTitle title={sectionLabel("languages", lang)} />
      <Text style={pdfStyles.ofspaceLanguagesText}>{langs.join(", ")}</Text>
    </View>
  );
}
