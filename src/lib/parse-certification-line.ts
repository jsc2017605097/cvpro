export interface ParsedCertification {
  title: string;
  issuer?: string;
  date?: string;
}

const CERT_RE =
  /^(.+?)\s*[-—]\s*(.+?)(?:\s*\((\d{4}(?:-\d{2})?)\))?\s*$/;

export function parseCertificationLine(raw: string): ParsedCertification {
  const trimmed = raw.trim();
  const m = trimmed.match(CERT_RE);
  if (!m) return { title: trimmed };
  return {
    title: m[1].trim(),
    issuer: m[2].trim(),
    date: m[3]?.trim(),
  };
}
