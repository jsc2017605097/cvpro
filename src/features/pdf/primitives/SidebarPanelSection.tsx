import type { ReactNode } from "react";
import { View } from "@react-pdf/renderer";
import type { PdfLanguage } from "../labels";
import { PdfSectionBar } from "./PdfSectionBar";

interface Props {
  label: string;
  language: PdfLanguage;
  children: ReactNode;
}

export function SidebarPanelSection({ label, language, children }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <PdfSectionBar label={label} language={language} />
      {children}
    </View>
  );
}
