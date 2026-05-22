import { useNavigate } from "react-router-dom";
import type { ProfilePreset } from "@/types/preset";
import { FeatureCard } from "@/components/ui/design/FeatureCard";
import { BadgePill } from "@/components/ui/design/BadgePill";
import { Button } from "@/components/ui/design/Button";
import { getPresetCardVisual } from "@/data/preset-card-visuals";
import { PresetCardVisual } from "./PresetCardVisual";

const CATEGORY_LABELS: Record<ProfilePreset["category"], string> = {
  it: "IT",
  product: "Product",
  business: "Kinh doanh",
  other: "Khác",
};

function cardTags(preset: ProfilePreset): string[] {
  const categoryLabel = CATEGORY_LABELS[preset.category].toLowerCase();
  return preset.tags
    .filter((tag) => tag.toLowerCase() !== categoryLabel)
    .slice(0, 2);
}

export function PresetCard({ preset }: { preset: ProfilePreset }) {
  const navigate = useNavigate();
  const extraTags = cardTags(preset);
  const visual = getPresetCardVisual(preset.id);

  return (
    <FeatureCard className="flex h-full flex-col overflow-hidden border border-transparent p-0 transition-colors hover:border-[var(--color-hairline)]">
      <PresetCardVisual config={visual} />
      <div className="flex flex-1 flex-col p-[var(--spacing-xl)]">
        <div className="mb-3 flex flex-wrap gap-2">
          <BadgePill>{CATEGORY_LABELS[preset.category]}</BadgePill>
          {preset.market === "global" && (
            <BadgePill variant="coral">Global</BadgePill>
          )}
          {extraTags.map((tag) => (
            <BadgePill key={tag}>{tag}</BadgePill>
          ))}
        </div>
        <h2 className="font-display text-[22px] text-[var(--color-ink)]">
          {preset.title.vi}
        </h2>
        <p className="mt-2 flex-1 text-sm text-[var(--color-body)]">
          {preset.shortDescription.vi}
        </p>
        <Button
          className="mt-6 w-full"
          onClick={() => navigate(`/wizard/${preset.id}`)}
        >
          Dùng mẫu này
        </Button>
      </div>
    </FeatureCard>
  );
}
