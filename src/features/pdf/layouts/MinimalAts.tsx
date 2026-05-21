import { Document, Page, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { baseStyles } from "../styles";

const atsText = { fontSize: 10, marginBottom: 2 };

export function MinimalAtsPdf({ data }: { data: CVData }) {
  const { personal } = data;

  return (
    <Document>
      <Page size="A4" style={{ ...baseStyles.page, fontSize: 10 }}>
        <Text style={{ fontSize: 14, marginBottom: 6 }}>{personal.fullName}</Text>
        {personal.title ? <Text style={atsText}>{personal.title}</Text> : null}
        {data.summary ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, marginBottom: 4 }}>SUMMARY</Text>
            <Text style={atsText}>{data.summary}</Text>
          </View>
        ) : null}
        {data.skills?.length ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, marginBottom: 4 }}>SKILLS</Text>
            <Text style={atsText}>{data.skills.join(", ")}</Text>
          </View>
        ) : null}
        {data.experience?.map((exp, i) => (
          <View key={i} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, marginBottom: 4 }}>EXPERIENCE</Text>
            <Text style={atsText}>
              {exp.role} | {exp.company} | {exp.startDate}
              {exp.endDate ? `-${exp.endDate}` : ""}
            </Text>
            {exp.highlights.map((h, j) => (
              <Text key={j} style={atsText}>
                - {h}
              </Text>
            ))}
          </View>
        ))}
        {data.education?.map((edu, i) => (
          <View key={i} style={{ marginTop: 8 }}>
            <Text style={{ fontSize: 11, marginBottom: 4 }}>EDUCATION</Text>
            <Text style={atsText}>
              {edu.degree} — {edu.school}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
