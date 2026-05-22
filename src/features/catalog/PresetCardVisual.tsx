import { cn } from "@/lib/utils";
import type { PresetCardVisualConfig } from "@/data/preset-card-visuals";
import type { ProfilePreset } from "@/types/preset";
import { PresetIcon } from "@/components/icons/PresetIcon";
import { presetRoleLabel } from "./preset-role-label";

const BAND_BG: Record<
  NonNullable<PresetCardVisualConfig["bandVariant"]>,
  string
> = {
  soft: "bg-[var(--color-surface-soft)]",
  card: "bg-[var(--color-surface-cream-strong)]",
  cream: "bg-[var(--color-canvas)]",
};

const CATEGORY_FRAME: Record<ProfilePreset["category"], string> = {
  it: "ring-[var(--color-primary)]/25 bg-[var(--color-primary)]/12",
  product: "ring-[var(--color-ink)]/12 bg-[var(--color-surface-card)]",
  business: "ring-[var(--color-primary)]/20 bg-[var(--color-primary)]/8",
  other: "ring-[var(--color-hairline)] bg-[var(--color-surface-soft)]",
};

const CATEGORY_ACCENT: Record<ProfilePreset["category"], string> = {
  it: "text-[var(--color-primary)]",
  product: "text-[var(--color-body-strong)]",
  business: "text-[var(--color-primary-active)]",
  other: "text-[var(--color-muted)]",
};

interface Props {
  config: PresetCardVisualConfig;
  preset: ProfilePreset;
}

export function PresetCardVisual({ config, preset }: Props) {
  const variant = config.bandVariant ?? "soft";
  const heroTint = config.heroTint ?? "primary";
  const [heroIcon, ...supportIcons] = config.icons;
  const roleLabel = presetRoleLabel(preset);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex h-28 items-center justify-between gap-3 overflow-hidden border-b border-[var(--color-hairline)] px-4",
        BAND_BG[variant]
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[var(--color-primary)] opacity-[0.07]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-4 h-20 w-20 rounded-full bg-[var(--color-ink)] opacity-[0.04]"
        aria-hidden
      />

      <div className="relative z-[1] flex items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-[var(--rounded-lg)] ring-1",
            CATEGORY_FRAME[preset.category]
          )}
        >
          <PresetIcon icon={heroIcon} size="hero" tint={heroTint} />
        </div>
        {supportIcons.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {supportIcons.map((icon, index) => (
              <PresetIcon
                key={`${icon}-${index}`}
                icon={icon}
                size="sm"
                tint="muted"
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-[1] flex min-w-0 flex-col items-end text-right">
        <span
          className={cn(
            "font-display text-[11px] font-semibold uppercase tracking-[0.14em]",
            CATEGORY_ACCENT[preset.category]
          )}
        >
          {roleLabel}
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.08em] text-[var(--color-muted)]">
          {preset.experienceLevel}
        </span>
      </div>
    </div>
  );
}
