import { Link } from "react-router-dom";
import type { ProfilePreset } from "@/types/preset";
import { FeatureCard } from "@/components/ui/design/FeatureCard";
import { BadgePill } from "@/components/ui/design/BadgePill";
import { Button } from "@/components/ui/design/Button";

const CATEGORY_LABELS: Record<ProfilePreset["category"], string> = {
  it: "IT",
  product: "Product",
  business: "Kinh doanh",
  other: "Khác",
};

export function PresetCard({ preset }: { preset: ProfilePreset }) {
  return (
    <FeatureCard className="flex h-full flex-col">
      <div className="mb-3 flex flex-wrap gap-2">
        <BadgePill>{CATEGORY_LABELS[preset.category]}</BadgePill>
        {preset.market === "global" && (
          <BadgePill variant="coral">Global</BadgePill>
        )}
        {preset.tags.slice(0, 2).map((tag) => (
          <BadgePill key={tag}>{tag}</BadgePill>
        ))}
      </div>
      <h2 className="font-display text-[22px] text-[var(--color-ink)]">
        {preset.title.vi}
      </h2>
      <p className="mt-2 flex-1 text-sm text-[var(--color-body)]">
        {preset.shortDescription.vi}
      </p>
      <Link to={`/wizard/${preset.id}`} className="mt-6 block">
        <Button className="w-full">Dùng mẫu này</Button>
      </Link>
    </FeatureCard>
  );
}
