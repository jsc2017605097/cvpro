import { Document, Page, View } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { clampCvDataForWebDeveloperPdf } from "@/lib/web-developer-one-page";
import {
  WebDevFooterBar,
  WebDevLeftColumn,
  WebDevPageFrame,
  WebDevRightColumn,
} from "../web-developer-sections";
import { pdfStyles } from "../tokens";

export function WebDeveloperPdf({ data }: { data: CVData }) {
  const capped = clampCvDataForWebDeveloperPdf(data);
  const lang = capped.meta.language;

  return (
    <Document>
      <Page size="A4" style={pdfStyles.webDevPage}>
        <WebDevPageFrame>
          <View style={pdfStyles.webDevContentRow}>
            <WebDevLeftColumn data={capped} lang={lang} />
            <WebDevRightColumn data={capped} lang={lang} />
          </View>
          <WebDevFooterBar personal={capped.personal} />
        </WebDevPageFrame>
      </Page>
    </Document>
  );
}
