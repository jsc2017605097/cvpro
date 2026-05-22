import type { CVData, SkillGroup, SkillRated } from "@/schemas/cv.schema";
import { isSkillRatedArray } from "@/schemas/cv.schema";

const MAX_GROUPS = 7;
const MAX_ITEMS_PER_GROUP = 6;
const MAX_RATED = 8;
const STAGGER_LEVELS = [90, 85, 80, 75, 70, 65, 60, 55];

type Lang = "vi" | "en";

const CATEGORY_LABELS: Record<string, { vi: string; en: string }> = {
  languages: { vi: "Ngôn ngữ lập trình", en: "Languages" },
  backend: { vi: "Backend", en: "Backend" },
  frontend: { vi: "Frontend", en: "Frontend" },
  databases: { vi: "Cơ sở dữ liệu", en: "Databases" },
  devops: { vi: "DevOps & Cloud", en: "DevOps & Cloud" },
  api: { vi: "API & Auth", en: "API & Auth" },
  tools: { vi: "Công cụ", en: "Tools" },
  other: { vi: "Khác", en: "Other" },
};

const KEYWORD_RULES: { key: keyof typeof CATEGORY_LABELS; patterns: RegExp[] }[] =
  [
    {
      key: "languages",
      patterns: [
        /\bjava\b/i,
        /\bpython\b/i,
        /\btypescript\b/i,
        /\bjavascript\b/i,
        /\bgo\b/i,
        /\brust\b/i,
        /\bc\+\+/i,
        /\bc#/i,
        /\bphp\b/i,
        /\bruby\b/i,
        /\bkotlin\b/i,
        /\bswift\b/i,
      ],
    },
    {
      key: "backend",
      patterns: [
        /\bspring\b/i,
        /\bnode\.?js\b/i,
        /\bexpress\b/i,
        /\bnestjs\b/i,
        /\bdjango\b/i,
        /\bflask\b/i,
        /\b\.net\b/i,
        /\bsequelize\b/i,
        /\bhibernate\b/i,
      ],
    },
    {
      key: "frontend",
      patterns: [
        /\bvue\b/i,
        /\breact\b/i,
        /\bangular\b/i,
        /\bsvelte\b/i,
        /\bnext\.?js\b/i,
        /\bvuetify\b/i,
      ],
    },
    {
      key: "databases",
      patterns: [
        /\bpostgres/i,
        /\bmysql\b/i,
        /\bmongo/i,
        /\bredis\b/i,
        /\bsqlite\b/i,
        /\boracle\b/i,
      ],
    },
    {
      key: "devops",
      patterns: [
        /\bdocker\b/i,
        /\bkubernetes\b/i,
        /\bk8s\b/i,
        /\baws\b/i,
        /\bazure\b/i,
        /\bgcp\b/i,
        /\bci\/?cd\b/i,
        /\bjenkins\b/i,
        /\bnginx\b/i,
        /\blinux\b/i,
        /\bterraform\b/i,
      ],
    },
    {
      key: "api",
      patterns: [
        /\brest\b/i,
        /\bgraphql\b/i,
        /\bjwt\b/i,
        /\boauth\b/i,
        /\bapisix\b/i,
        /\bgrpc\b/i,
        /\bmicroservice/i,
      ],
    },
    {
      key: "tools",
      patterns: [/\bgit\b/i, /\bgithub actions\b/i, /\bjira\b/i, /\bfigma\b/i],
    },
  ];

function isSkillGroupArray(
  skills: CVData["skills"]
): skills is SkillGroup[] {
  if (!Array.isArray(skills) || skills.length === 0) return false;
  const first = skills[0];
  return (
    typeof first === "object" &&
    first !== null &&
    "category" in first &&
    "items" in first
  );
}

function labelFor(key: keyof typeof CATEGORY_LABELS, lang: Lang): string {
  return CATEGORY_LABELS[key][lang];
}

function classifySkill(skill: string): keyof typeof CATEGORY_LABELS {
  for (const rule of KEYWORD_RULES) {
    if (rule.patterns.some((p) => p.test(skill))) return rule.key;
  }
  return "other";
}

function capGroups(groups: SkillGroup[]): SkillGroup[] {
  return groups.slice(0, MAX_GROUPS).map((g) => ({
    category: g.category,
    items: g.items.slice(0, MAX_ITEMS_PER_GROUP),
  }));
}

function groupSkillsHeuristic(flat: string[], lang: Lang): SkillGroup[] {
  const buckets = new Map<keyof typeof CATEGORY_LABELS, string[]>();

  for (const skill of flat) {
    const key = classifySkill(skill);
    const list = buckets.get(key) ?? [];
    if (!list.includes(skill)) list.push(skill);
    buckets.set(key, list);
  }

  const order: (keyof typeof CATEGORY_LABELS)[] = [
    "languages",
    "backend",
    "frontend",
    "databases",
    "devops",
    "api",
    "tools",
    "other",
  ];

  const groups: SkillGroup[] = [];
  for (const key of order) {
    const items = buckets.get(key);
    if (!items?.length) continue;
    groups.push({
      category: labelFor(key, lang),
      items,
    });
  }

  return capGroups(groups);
}

export function normalizeToRatedSkills(
  skills: CVData["skills"],
  _lang: Lang,
  options?: { stagger?: boolean }
): SkillRated[] {
  if (!skills?.length) return [];

  if (isSkillRatedArray(skills)) {
    return skills.slice(0, MAX_RATED);
  }

  let flat: string[] = [];
  if (isSkillGroupArray(skills)) {
    for (const g of skills) flat.push(...g.items);
  } else {
    flat = skills as string[];
  }

  const unique = [...new Set(flat.map((s) => s.trim()).filter(Boolean))];
  return unique.slice(0, MAX_RATED).map((name, i) => ({
    name,
    level: options?.stagger ? (STAGGER_LEVELS[i] ?? 70) : 70,
  }));
}

export function normalizeSkills(
  skills: CVData["skills"],
  lang: Lang
): SkillGroup[] {
  if (!skills?.length) return [];

  if (isSkillGroupArray(skills)) {
    return capGroups(skills);
  }

  const flat = skills as string[];
  const grouped = groupSkillsHeuristic(flat, lang);
  if (grouped.length === 1) {
    const only = grouped[0];
    const otherLabel = labelFor("other", lang);
    if (only.category === otherLabel) {
      return [
        {
          category: lang === "vi" ? "Kỹ năng" : "Skills",
          items: flat.slice(0, 20),
        },
      ];
    }
  }

  return grouped.length > 0
    ? grouped
    : [
        {
          category: lang === "vi" ? "Kỹ năng" : "Skills",
          items: flat.slice(0, 20),
        },
      ];
}

export function flattenSkillsForWebDeveloper(
  skills: CVData["skills"],
  max = 8
): string[] {
  if (!skills?.length) return [];
  if (isSkillRatedArray(skills)) {
    return skills
      .map((s) => s.name.trim())
      .filter(Boolean)
      .slice(0, max);
  }
  if (isSkillGroupArray(skills)) {
    const flat: string[] = [];
    for (const g of skills) flat.push(...g.items);
    return [...new Set(flat.map((s) => s.trim()).filter(Boolean))].slice(0, max);
  }
  return (skills as string[])
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

export function formatSkillsPreview(skills: CVData["skills"]): string {
  if (!skills?.length) return "";
  if (isSkillRatedArray(skills)) {
    return skills.map((s) => `${s.name} (${s.level}%)`).join(" · ");
  }
  if (isSkillGroupArray(skills)) {
    return skills
      .map((g) => `${g.category}: ${g.items.join(", ")}`)
      .join(" · ");
  }
  return (skills as string[]).join(" · ");
}
