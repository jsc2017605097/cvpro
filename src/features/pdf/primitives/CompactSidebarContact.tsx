import { Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { personalInfoLabel, type PdfLanguage } from "../labels";
import { pdfStyles } from "../tokens";
import { SidebarPanelSection } from "./SidebarPanelSection";

type RowDef = {
  key: keyof CVData["personal"];
  icon: string;
  labelVi: string;
  labelEn: string;
};

const ROWS: RowDef[] = [
  { key: "phone", icon: "☎", labelVi: "SĐT", labelEn: "Phone" },
  { key: "email", icon: "✉", labelVi: "Email", labelEn: "Email" },
  { key: "location", icon: "📍", labelVi: "Địa chỉ", labelEn: "Location" },
  { key: "linkedin", icon: "in", labelVi: "LinkedIn", labelEn: "LinkedIn" },
  { key: "github", icon: "⌘", labelVi: "GitHub", labelEn: "GitHub" },
  { key: "website", icon: "↗", labelVi: "Website", labelEn: "Website" },
];

export function CompactSidebarContact({
  data,
  lang,
}: {
  data: CVData;
  lang: PdfLanguage;
}) {
  const { personal } = data;
  const active = ROWS.filter((r) => {
    const v = personal[r.key];
    return typeof v === "string" && v.length > 0;
  });

  if (!active.length) return null;

  return (
    <SidebarPanelSection label={personalInfoLabel(lang)} language={lang}>
      {active.map((row) => {
        const value = personal[row.key] as string;
        const label = lang === "vi" ? row.labelVi : row.labelEn;
        return (
          <View key={row.key} style={pdfStyles.compactContactRow}>
            <Text style={pdfStyles.compactContactIcon}>{row.icon}</Text>
            <Text style={pdfStyles.compactContactLabel}>{label}</Text>
            <Text style={pdfStyles.compactContactValue}>{value}</Text>
          </View>
        );
      })}
    </SidebarPanelSection>
  );
}
