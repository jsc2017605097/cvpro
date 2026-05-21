import { StyleSheet } from "@react-pdf/renderer";

export const pdfColors = {
  ink: "#141413",
  body: "#3d3d3a",
  muted: "#6c6a64",
  hairline: "#e6dfd8",
};

export const baseStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "NotoSans",
    color: pdfColors.body,
  },
  h1: { fontSize: 18, marginBottom: 4, color: pdfColors.ink },
  h2: { fontSize: 12, marginTop: 12, marginBottom: 4, color: pdfColors.ink },
  muted: { color: pdfColors.muted, fontSize: 9 },
  bullet: { marginLeft: 8, marginBottom: 2 },
  sidebar: { width: "30%", paddingRight: 12 },
  bodyCol: { width: "70%" },
  row: { flexDirection: "row" },
});
