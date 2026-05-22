import { StyleSheet } from "@react-pdf/renderer";

export const pdfColors = {
  ink: "#141413",
  body: "#3d3d3a",
  muted: "#6c6a64",
  hairline: "#e6dfd8",
  sidebarBg: "#f5f0e8",
  compactSidebarBg: "#E8EEF2",
  compactAccent: "#1F4E5F",
  compactOnAccent: "#FFFFFF",
  onInk: "#ffffff",
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

const PDF_PAGE_WIDTH_PT = 595.28;
const PDF_CONTENT_WIDTH_PT = PDF_PAGE_WIDTH_PT - pdfSpace.pagePadding * 2;

export const pdfLayout = {
  sidebarWidthPt: PDF_CONTENT_WIDTH_PT * 0.35,
  bodyWidthPt: PDF_CONTENT_WIDTH_PT * 0.65,
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
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  compactSidebar: {
    width: "35%",
    padding: 12,
    paddingTop: 0,
    marginRight: 10,
    flexGrow: 0,
  },
  compactBody: {
    width: "65%",
    flexGrow: 1,
  },
  compactProfileName: {
    fontSize: 20,
    fontWeight: 700,
    color: pdfColors.ink,
    lineHeight: 1.25,
    marginBottom: 4,
    textAlign: "center",
  },
  compactProfileTitle: {
    fontSize: pdfType.title,
    color: pdfColors.muted,
    lineHeight: 1.35,
    marginBottom: 8,
    textAlign: "center",
  },
  compactAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    objectFit: "cover",
    alignSelf: "center",
    marginBottom: 12,
  },
  compactAvatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: pdfColors.hairline,
    alignSelf: "center",
    marginBottom: 12,
  },
  compactSectionBar: {
    backgroundColor: pdfColors.compactAccent,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: 4,
  },
  compactSectionBarText: {
    fontSize: 8.5,
    fontWeight: 700,
    color: pdfColors.compactOnAccent,
    textTransform: "uppercase",
  },
  compactSectionBarTextEn: {
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  timelineSectionRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timelineTrack: {
    width: 12,
    alignItems: "center",
    marginRight: 8,
    paddingTop: 2,
  },
  timelineDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: pdfColors.ink,
  },
  timelineLine: {
    width: 1,
    flexGrow: 1,
    minHeight: 20,
    backgroundColor: pdfColors.hairline,
    marginTop: 3,
  },
  timelineBody: {
    flexGrow: 1,
    flexShrink: 1,
  },
  timelineHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 3,
  },
  timelineTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: pdfColors.ink,
    flexGrow: 1,
    maxWidth: "72%",
  },
  timelineDate: {
    fontSize: pdfType.small,
    color: pdfColors.muted,
    textAlign: "right",
  },
  roleLineEn: {
    fontSize: 10,
    fontWeight: 700,
    color: pdfColors.ink,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  sidebarSkillBullet: {
    marginLeft: pdfSpace.bulletIndent,
    marginBottom: 2,
    fontSize: 8,
    color: pdfColors.body,
    lineHeight: 1.3,
  },
  compactContactRow: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  compactContactIcon: {
    width: 14,
    fontSize: 8,
    color: pdfColors.muted,
  },
  compactContactLabel: {
    fontSize: 7.5,
    fontWeight: 600,
    color: pdfColors.muted,
    width: 42,
  },
  compactContactValue: {
    fontSize: 8.5,
    color: pdfColors.body,
    flexGrow: 1,
    flexShrink: 1,
  },
  compactSkillGroupLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: pdfColors.ink,
    textTransform: "uppercase",
    marginTop: 4,
    marginBottom: 2,
  },
  compactSkillGroupItems: {
    fontSize: 8,
    color: pdfColors.body,
    lineHeight: 1.35,
    marginBottom: 4,
  },
  compactExperienceCompany: {
    fontSize: 11,
    fontWeight: 700,
    color: pdfColors.ink,
    flexGrow: 1,
    maxWidth: "72%",
  },
  compactExperienceDate: {
    fontSize: pdfType.small,
    color: pdfColors.muted,
    textAlign: "right",
  },
  compactRoleCaps: {
    fontSize: 10,
    fontWeight: 700,
    color: pdfColors.ink,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  compactEntryDivider: {
    height: 1,
    backgroundColor: pdfColors.hairline,
    marginVertical: 6,
  },
  compactEntryBlock: {
    marginBottom: 8,
  },
});
