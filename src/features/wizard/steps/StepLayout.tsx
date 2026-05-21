import { LAYOUTS } from "@/data/layouts";
import type { ProfilePreset } from "@/types/preset";
import type { WizardDraft } from "@/lib/draft-storage";
import { Button } from "@/components/ui/design/Button";
import { cn } from "@/lib/utils";

interface Props {
  draft: WizardDraft;
  preset: ProfilePreset;
  onUpdate: (patch: Partial<Pick<WizardDraft, "layoutId" | "language">>) => void;
  onNext: () => void;
}

export function StepLayout({ draft, preset, onUpdate, onNext }: Props) {
  const layouts = LAYOUTS.filter((l) =>
    preset.recommendedLayouts.includes(l.id)
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-[var(--color-body)]">
        Chọn bố cục PDF và ngôn ngữ nội dung CV / rule export.
      </p>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[var(--color-ink)]">
          Layout PDF
        </legend>
        {layouts.map((layout) => (
          <label
            key={layout.id}
            className={cn(
              "flex cursor-pointer gap-3 rounded-[var(--rounded-md)] border p-4 transition-colors",
              draft.layoutId === layout.id
                ? "border-[var(--color-primary)] bg-[var(--color-surface-soft)]"
                : "border-[var(--color-hairline)] bg-[var(--color-canvas)]"
            )}
          >
            <input
              type="radio"
              name="layout"
              value={layout.id}
              checked={draft.layoutId === layout.id}
              onChange={() => onUpdate({ layoutId: layout.id })}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-[var(--color-ink)]">
                {layout.name.vi}
              </span>
              <span className="mt-1 block text-sm text-[var(--color-body)]">
                {layout.description.vi}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--color-ink)]">
          Ngôn ngữ rule &amp; JSON
        </legend>
        <div className="flex gap-3">
          {(["vi", "en"] as const).map((lang) => (
            <label
              key={lang}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-[var(--rounded-md)] border px-4 py-2 text-sm",
                draft.language === lang
                  ? "border-[var(--color-primary)] bg-[var(--color-surface-soft)]"
                  : "border-[var(--color-hairline)]"
              )}
            >
              <input
                type="radio"
                name="language"
                checked={draft.language === lang}
                onChange={() => onUpdate({ language: lang })}
              />
              {lang === "vi" ? "Tiếng Việt" : "English"}
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="button" onClick={onNext}>
        Tiếp — Export rule
      </Button>
    </div>
  );
}
