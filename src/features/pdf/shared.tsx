import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { baseStyles, pdfColors } from "./styles";

export function PdfHeader({ data }: { data: CVData }) {
  const { personal } = data;
  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.github,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <View>
      <Text style={baseStyles.h1}>{personal.fullName}</Text>
      {personal.title ? (
        <Text style={baseStyles.muted}>{personal.title}</Text>
      ) : null}
      {contact ? <Text style={baseStyles.muted}>{contact}</Text> : null}
    </View>
  );
}

export function PdfSummary({ data }: { data: CVData }) {
  if (!data.summary) return null;
  return (
    <View>
      <Text style={baseStyles.h2}>Summary</Text>
      <Text>{data.summary}</Text>
    </View>
  );
}

export function PdfSkills({ data }: { data: CVData }) {
  if (!data.skills?.length) return null;
  return (
    <View>
      <Text style={baseStyles.h2}>Skills</Text>
      <Text>{data.skills.join(" · ")}</Text>
    </View>
  );
}

export function PdfExperience({ data }: { data: CVData }) {
  if (!data.experience?.length) return null;
  return (
    <View>
      <Text style={baseStyles.h2}>Experience</Text>
      {data.experience.map((exp, i) => (
        <View key={`${exp.company}-${i}`} style={{ marginBottom: 6 }}>
          <Text style={{ color: pdfColors.ink, fontSize: 11 }}>
            {exp.role} — {exp.company}
          </Text>
          <Text style={baseStyles.muted}>
            {exp.startDate}
            {exp.endDate ? ` – ${exp.endDate}` : exp.current ? " – Present" : ""}
            {exp.location ? ` · ${exp.location}` : ""}
          </Text>
          {exp.highlights.map((h, j) => (
            <Text key={j} style={baseStyles.bullet}>
              • {h}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfEducation({ data }: { data: CVData }) {
  if (!data.education?.length) return null;
  return (
    <View>
      <Text style={baseStyles.h2}>Education</Text>
      {data.education.map((edu, i) => (
        <View key={`${edu.school}-${i}`} style={{ marginBottom: 4 }}>
          <Text>
            {edu.degree}
            {edu.field ? `, ${edu.field}` : ""} — {edu.school}
          </Text>
          {(edu.startDate || edu.endDate) && (
            <Text style={baseStyles.muted}>
              {edu.startDate}
              {edu.endDate ? ` – ${edu.endDate}` : ""}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}

export function PdfProjects({ data }: { data: CVData }) {
  if (!data.projects?.length) return null;
  return (
    <View>
      <Text style={baseStyles.h2}>Projects</Text>
      {data.projects.map((p, i) => (
        <View key={`${p.name}-${i}`} style={{ marginBottom: 4 }}>
          <Text style={{ fontSize: 11 }}>{p.name}</Text>
          <Text>{p.description}</Text>
          {p.highlights?.map((h, j) => (
            <Text key={j} style={baseStyles.bullet}>
              • {h}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
