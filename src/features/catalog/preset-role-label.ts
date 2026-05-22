import type { ProfilePreset } from "@/types/preset";

const CATEGORY_LABELS: Record<ProfilePreset["category"], string> = {
  it: "IT",
  product: "Product",
  business: "Kinh doanh",
  other: "Khác",
};

const SKIP_TAG = new Set(
  ["it", "product", "kinh doanh", "khác", "global", "business"].map((s) =>
    s.toLowerCase()
  )
);

/** Tag vai trò ngắn hiển thị trên band (Frontend, DevOps, …). */
export function presetRoleLabel(preset: ProfilePreset): string {
  const role = preset.tags.find((t) => !SKIP_TAG.has(t.toLowerCase()));
  return role ?? CATEGORY_LABELS[preset.category];
}
