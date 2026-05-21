import { LAYOUTS } from "@/data/layouts";
import type { ProfilePreset } from "@/types/preset";
import type { WizardDraft } from "@/lib/draft-storage";
import { Button } from "@/components/ui/design/Button";
import { CategoryTabs } from "@/components/ui/design/CategoryTabs";
import { LayoutOptionCard } from "../components/LayoutOptionCard";

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {layouts.map((layout) => (
          <LayoutOptionCard
            key={layout.id}
            layout={layout}
            selected={draft.layoutId === layout.id}
            onSelect={() => onUpdate({ layoutId: layout.id })}
          />
        ))}
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-[var(--color-ink)]">
          Ngôn ngữ rule &amp; JSON
        </legend>
        <CategoryTabs
          aria-label="Ngôn ngữ"
          value={draft.language}
          onChange={(language) =>
            onUpdate({ language: language as "vi" | "en" })
          }
          options={[
            { value: "vi", label: "Tiếng Việt" },
            { value: "en", label: "English" },
          ]}
        />
      </fieldset>

      <Button type="button" onClick={onNext}>
        Tiếp — Export rule
      </Button>
    </div>
  );
}
