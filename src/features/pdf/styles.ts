import { StyleSheet } from "@react-pdf/renderer";
import {
  pdfColors,
  pdfStyles,
  pdfFontFamily,
  pdfType,
  pdfSpace,
} from "./tokens";

export { pdfColors, pdfStyles, pdfFontFamily, pdfType, pdfSpace };

/** @deprecated Use pdfStyles — kept for gradual migration */
export const baseStyles = StyleSheet.create({
  page: pdfStyles.page,
  h1: pdfStyles.name,
  h2: pdfStyles.sectionTitle,
  muted: pdfStyles.mutedLine,
  bullet: pdfStyles.bullet,
  sidebar: pdfStyles.sidebar,
  bodyCol: pdfStyles.bodyCol,
  row: pdfStyles.row,
});
