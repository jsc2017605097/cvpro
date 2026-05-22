import { cn } from "@/lib/utils";
import type { IconKey } from "./preset-icon-keys";
import { isIconKey } from "./preset-icon-keys";
import { PRESET_ICON_GLYPHS } from "./preset-icon-glyphs";

interface PresetIconProps {
  icon: IconKey;
  accent?: boolean;
  className?: string;
}

export function PresetIcon({ icon, accent = false, className }: PresetIconProps) {
  if (!isIconKey(icon)) {
    if (import.meta.env.DEV) {
      console.warn(`PresetIcon: unknown key "${icon}"`);
    }
    return null;
  }
  const Glyph = PRESET_ICON_GLYPHS[icon];
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center",
        accent
          ? "text-[var(--color-primary)]"
          : "text-[var(--color-ink)]",
        className
      )}
    >
      {Glyph({ className: "h-8 w-8" })}
    </span>
  );
}
