export const ICON_KEYS = [
  "code",
  "terminal",
  "layers",
  "layout",
  "component",
  "server",
  "database",
  "api",
  "pipeline",
  "cloud",
  "bug",
  "checklist",
  "diagram",
  "document",
  "chart",
  "roadmap",
  "users",
  "backlog",
  "sprint",
  "megaphone",
  "funnel",
  "ledger",
  "calculator",
  "handshake",
  "interview",
  "globe",
  "graduation",
  "pivot",
  "growth",
  "shield",
  "accessibility",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

export function isIconKey(value: string): value is IconKey {
  return (ICON_KEYS as readonly string[]).includes(value);
}
