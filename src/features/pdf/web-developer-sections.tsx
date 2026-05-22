import type { ReactNode } from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import type {
  AwardItem,
  CVData,
  EducationItem,
  ExperienceItem,
  Personal,
} from "@/schemas/cv.schema";
import { flattenSkillsForWebDeveloper } from "@/lib/skills";
import { parseCertificationLine } from "@/lib/parse-certification-line";
import { collectHighlightTokens } from "@/lib/highlight-tokens";
import { formatExperienceDateRange } from "./format-experience";
import { HighlightText } from "./primitives/HighlightText";
import { sectionLabel, type PdfLanguage } from "./labels";
import { pdfColors, pdfStyles } from "./tokens";

const SECTION_ICONS: Record<string, string> = {
  contact: "☎",
  skills: "⚙",
  awards: "★",
  education: "🎓",
  experience: "💼",
  cert: "📜",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function WebDevSectionHeader({
  title,
  iconKey,
}: {
  title: string;
  iconKey: string;
}) {
  return (
    <View>
      <View style={pdfStyles.webDevSectionHeaderRow}>
        <Text style={pdfStyles.webDevSectionIcon}>
          {SECTION_ICONS[iconKey] ?? "•"}
        </Text>
        <Text style={pdfStyles.webDevSectionTitle}>{title}</Text>
      </View>
      <View style={pdfStyles.webDevHr} />
    </View>
  );
}

function WebDevProfileBlock({
  personal,
  summary,
}: {
  personal: Personal;
  summary?: string;
}) {
  return (
    <View>
      <Text style={pdfStyles.webDevName}>{personal.fullName}</Text>
      {personal.title ? (
        <Text style={pdfStyles.webDevTitle}>{personal.title}</Text>
      ) : null}
      {personal.avatarUrl ? (
        <Image src={personal.avatarUrl} style={pdfStyles.webDevAvatar} />
      ) : (
        <View style={pdfStyles.webDevAvatarPlaceholder}>
          <Text style={pdfStyles.webDevAvatarInitials}>
            {initials(personal.fullName)}
          </Text>
        </View>
      )}
      {summary ? <Text style={pdfStyles.webDevSummary}>{summary}</Text> : null}
    </View>
  );
}

function WebDevContactRows({ personal }: { personal: Personal }) {
  const rows: { icon: string; value: string }[] = [
    { icon: "⌂", value: personal.location ?? "" },
    { icon: "☎", value: personal.phone ?? "" },
    { icon: "✉", value: personal.email ?? "" },
    { icon: "🔗", value: personal.website ?? personal.github ?? "" },
  ].filter((r) => r.value.trim());

  return (
    <View style={{ marginBottom: 10 }}>
      {rows.map((row) => (
        <View key={row.icon + row.value} style={pdfStyles.webDevContactRow}>
          <Text style={pdfStyles.webDevContactIcon}>{row.icon}</Text>
          <View style={pdfStyles.webDevContactDivider} />
          <Text style={pdfStyles.webDevContactText}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
}

function WebDevSkillsTwoCol({ skills }: { skills: string[] }) {
  if (!skills.length) return null;
  const mid = Math.ceil(skills.length / 2);
  const left = skills.slice(0, mid);
  const right = skills.slice(mid);

  return (
    <View style={pdfStyles.webDevSkillRow}>
      <View style={pdfStyles.webDevSkillCol}>
        {left.map((s) => (
          <Text key={s} style={pdfStyles.webDevSkillItem}>
            {s}
          </Text>
        ))}
      </View>
      <View style={pdfStyles.webDevSkillCol}>
        {right.map((s) => (
          <Text key={s} style={pdfStyles.webDevSkillItem}>
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
}

function WebDevAwardList({ awards }: { awards: AwardItem[] }) {
  return (
    <View>
      {awards.map((a, i) => {
        const meta = [a.issuer, a.date].filter(Boolean).join(", ");
        return (
          <View key={i} style={{ marginBottom: 6 }}>
            <Text style={pdfStyles.webDevAwardTitle}>{a.title}</Text>
            {meta ? <Text style={pdfStyles.webDevAwardMeta}>{meta}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

function WebDevExperienceEntry({
  job,
  tokens,
}: {
  job: ExperienceItem;
  tokens: string[];
}) {
  const loc = job.location ? `, ${job.location}` : "";
  const dates = formatExperienceDateRange(job);
  return (
    <View style={pdfStyles.webDevTimelineBlock}>
      <Text style={pdfStyles.webDevTimelineEntryTitle}>{job.role}</Text>
      <Text style={pdfStyles.webDevTimelineEntrySub}>
        {job.company}
        {loc}, {dates}
      </Text>
      {job.highlights.map((h, i) => (
        <View key={i} style={pdfStyles.webDevTimelineBulletRow}>
          <View style={pdfStyles.webDevTimelineDot} />
          <HighlightText
            text={h}
            tokens={tokens}
            style={pdfStyles.webDevTimelineBullet}
          />
        </View>
      ))}
    </View>
  );
}

function WebDevEducationEntry({ item }: { item: EducationItem }) {
  const bullets =
    item.details?.length && item.details.length > 0
      ? item.details
      : [
          [item.school, item.field].filter(Boolean).join(" — "),
          item.endDate ?? item.startDate ?? "",
        ].filter(Boolean);

  return (
    <View style={pdfStyles.webDevTimelineBlock}>
      <Text style={pdfStyles.webDevTimelineEntryTitle}>{item.degree}</Text>
      {bullets.map((line, i) => (
        <View key={i} style={pdfStyles.webDevTimelineBulletRow}>
          <View style={pdfStyles.webDevTimelineDot} />
          <Text style={pdfStyles.webDevTimelineBullet}>{line}</Text>
        </View>
      ))}
    </View>
  );
}

function WebDevCertEntry({ raw }: { raw: string }) {
  const parsed = parseCertificationLine(raw);
  const meta = [parsed.issuer, parsed.date].filter(Boolean).join(" — ");
  return (
    <View style={pdfStyles.webDevTimelineBlock}>
      <Text style={pdfStyles.webDevTimelineEntryTitle}>{parsed.title}</Text>
      {meta ? <Text style={pdfStyles.webDevCertDate}>{meta}</Text> : null}
    </View>
  );
}

function shortenLink(value: string): string {
  return value
    .replace(/^https?:\/\/(www\.)?/i, "")
    .replace(/^@/, "")
    .slice(0, 28);
}

export function WebDevFooterBar({ personal }: { personal: Personal }) {
  const slots: { icon: string; label: string; value?: string }[] = [
    { icon: "in", label: "linkedin", value: personal.linkedin },
    { icon: "𝕏", label: "twitter", value: personal.twitter },
    { icon: "f", label: "facebook", value: personal.facebook },
    { icon: "✉", label: "email", value: personal.email },
  ].filter((s) => s.value?.trim());

  if (!slots.length) return null;

  return (
    <View style={pdfStyles.webDevFooterRow}>
      {slots.map((s) => (
        <View key={s.label} style={pdfStyles.webDevFooterSlot}>
          <Text style={pdfStyles.webDevFooterIcon}>{s.icon}</Text>
          <Text style={pdfStyles.webDevFooterText}>
            {shortenLink(s.value!)}
          </Text>
        </View>
      ))}
    </View>
  );
}

export function WebDevLeftColumn({ data, lang }: { data: CVData; lang: PdfLanguage }) {
  const skills = flattenSkillsForWebDeveloper(
    data.skills,
    8
  );

  return (
    <View style={pdfStyles.webDevLeftColumn}>
      <WebDevProfileBlock personal={data.personal} summary={data.summary} />
      <WebDevSectionHeader
        title={sectionLabel("contactUpper", lang)}
        iconKey="contact"
      />
      <WebDevContactRows personal={data.personal} />
      {skills.length > 0 ? (
        <>
          <WebDevSectionHeader
            title={sectionLabel("skillsUpper", lang)}
            iconKey="skills"
          />
          <WebDevSkillsTwoCol skills={skills} />
        </>
      ) : null}
      {data.awards?.length ? (
        <>
          <WebDevSectionHeader
            title={sectionLabel("awardsUpper", lang)}
            iconKey="awards"
          />
          <WebDevAwardList awards={data.awards} />
        </>
      ) : null}
    </View>
  );
}

export function WebDevRightColumn({ data, lang }: { data: CVData; lang: PdfLanguage }) {
  const tokens = collectHighlightTokens(data);

  return (
    <View style={pdfStyles.webDevRightColumn}>
      {data.education?.length ? (
        <>
          <WebDevSectionHeader
            title={sectionLabel("educationUpper", lang)}
            iconKey="education"
          />
          {data.education.map((e, i) => (
            <WebDevEducationEntry key={i} item={e} />
          ))}
        </>
      ) : null}
      {data.experience?.length ? (
        <>
          <WebDevSectionHeader
            title={sectionLabel("experienceUpper", lang)}
            iconKey="experience"
          />
          {data.experience.map((job, i) => (
            <WebDevExperienceEntry key={i} job={job} tokens={tokens} />
          ))}
        </>
      ) : null}
      {data.certifications?.length ? (
        <>
          <WebDevSectionHeader
            title={sectionLabel("certificationUpper", lang)}
            iconKey="cert"
          />
          {data.certifications.map((c, i) => (
            <WebDevCertEntry key={i} raw={c} />
          ))}
        </>
      ) : null}
    </View>
  );
}

export function WebDevPageFrame({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <View style={{ flexGrow: 1, backgroundColor: pdfColors.webDevBandBottom }}>
      <View style={pdfStyles.webDevBandTop} />
      <View style={pdfStyles.webDevInner}>{children}</View>
      <View style={pdfStyles.webDevBandBottom} />
    </View>
  );
}
