import { StyleSheet } from "@react-pdf/renderer";

export const pdfColors = {
  ink: "#141413",
  body: "#3d3d3a",
  muted: "#6c6a64",
  hairline: "#e6dfd8",
  sidebarBg: "#f5f0e8",
};

export const pdfFontFamily = "NotoSans";

export const pdfType = {
  name: 22,
  title: 11,
  section: 9,
  body: 10,
  small: 8.5,
  atsName: 14,
  atsSection: 10,
};

export const pdfSpace = {
  pagePadding: 40,
  sectionGap: 14,
  itemGap: 8,
  bulletIndent: 10,
};

export const pdfStyles = StyleSheet.create({
  page: {
    padding: pdfSpace.pagePadding,
    fontSize: pdfType.body,
    fontFamily: pdfFontFamily,
    color: pdfColors.body,
    lineHeight: 1.45,
  },
  name: {
    fontSize: pdfType.name,
    color: pdfColors.ink,
    marginBottom: 8,
    fontWeight: 700,
    lineHeight: 1.3,
  },
  title: {
    fontSize: pdfType.title,
    color: pdfColors.muted,
    marginBottom: 6,
    lineHeight: 1.35,
  },
  headerBlock: {
    flexDirection: "column",
    marginBottom: 4,
  },
  contactLine: {
    fontSize: pdfType.small,
    color: pdfColors.muted,
    lineHeight: 1.35,
    marginBottom: 3,
  },
  headerRule: {
    height: 1,
    backgroundColor: pdfColors.hairline,
    marginTop: 6,
    marginBottom: 12,
  },
  contact: {
    fontSize: pdfType.small,
    color: pdfColors.muted,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: pdfType.section,
    color: pdfColors.ink,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: pdfSpace.sectionGap,
    marginBottom: 6,
  },
  sectionTitlePlain: {
    fontSize: pdfType.atsSection,
    color: pdfColors.ink,
    fontWeight: 700,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 4,
  },
  rule: {
    height: 1,
    backgroundColor: pdfColors.hairline,
    marginTop: 8,
    marginBottom: 12,
  },
  bullet: {
    marginLeft: pdfSpace.bulletIndent,
    marginBottom: 3,
    fontSize: pdfType.body,
  },
  bodyText: {
    fontSize: pdfType.body,
    color: pdfColors.body,
    marginBottom: 4,
  },
  mutedLine: {
    fontSize: pdfType.small,
    color: pdfColors.muted,
    marginBottom: 4,
  },
  roleLine: {
    fontSize: 11,
    color: pdfColors.ink,
    fontWeight: 700,
    marginBottom: 2,
  },
  row: { flexDirection: "row" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  sidebar: {
    width: "32%",
    padding: 12,
    backgroundColor: pdfColors.sidebarBg,
    marginRight: 12,
  },
  bodyCol: { width: "68%", flexGrow: 1 },
  sidebarBlock: { marginBottom: 10 },
});
