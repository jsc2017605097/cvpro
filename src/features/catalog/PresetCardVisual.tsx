import { cn } from "@/lib/utils";
import type { PresetCardVisualConfig } from "@/data/preset-card-visuals";
import { PresetIcon } from "@/components/icons/PresetIcon";

const BAND_BG: Record<
  NonNullable<PresetCardVisualConfig["bandVariant"]>,
  string
> = {
  soft: "bg-[var(--color-surface-soft)]",
  card: "bg-[var(--color-surface-card)]",
  cream: "bg-[var(--color-canvas)]",
};

interface Props {
  config: PresetCardVisualConfig;
}

export function PresetCardVisual({ config }: Props) {
  const variant = config.bandVariant ?? "soft";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-24 items-center justify-center gap-3 border-b border-[var(--color-hairline)]",
        BAND_BG[variant]
      )}
    >
      {config.icons.map((icon, index) => (
        <PresetIcon
          key={`${icon}-${index}`}
          icon={icon}
          accent={config.accentIconIndex === index}
        />
      ))}
    </div>
  );
}
