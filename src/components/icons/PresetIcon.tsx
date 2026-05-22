import { cn } from "@/lib/utils";
import type { IconKey } from "./preset-icon-keys";
import { isIconKey } from "./preset-icon-keys";
import { PRESET_ICON_GLYPHS } from "./preset-icon-glyphs";
import type { HeroTint } from "@/data/preset-card-visuals";

interface PresetIconProps {
  icon: IconKey;
  size?: "hero" | "sm";
  tint?: HeroTint;
  className?: string;
}

const TINT_CLASS: Record<HeroTint, string> = {
  primary: "text-[var(--color-primary)]",
  ink: "text-[var(--color-ink)]",
  muted: "text-[var(--color-muted)]",
};

const SIZE_CLASS = {
  hero: "h-11 w-11",
  sm: "h-5 w-5",
};

export function PresetIcon({
  icon,
  size = "sm",
  tint = "ink",
  className,
}: PresetIconProps) {
  if (!isIconKey(icon)) {
    if (import.meta.env.DEV) {
      console.warn(`PresetIcon: unknown key "${icon}"`);
    }
    return null;
  }
  const Glyph = PRESET_ICON_GLYPHS[icon];
  const dim = SIZE_CLASS[size];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        size === "hero" ? "h-14 w-14" : "h-6 w-6",
        TINT_CLASS[tint],
        className
      )}
    >
      {Glyph({ className: dim })}
    </span>
  );
}
