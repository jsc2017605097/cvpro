import { cn } from "@/lib/utils";
import type { LayoutTemplate } from "@/types/preset";

interface Props {
  layout: LayoutTemplate;
  selected: boolean;
  onSelect: () => void;
}

export function LayoutOptionCard({ layout, selected, onSelect }: Props) {
  return (
    <label
      className={cn(
        "flex cursor-pointer flex-col overflow-hidden rounded-[var(--rounded-lg)] border transition-colors",
        selected
          ? "border-[var(--color-primary)] bg-[var(--color-surface-soft)]"
          : "border-[var(--color-hairline)] bg-[var(--color-canvas)]"
      )}
    >
      <input
        type="radio"
        name="layout"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <img
        src={layout.previewImage}
        alt=""
        className="h-40 w-full border-b border-[var(--color-hairline)] bg-[var(--color-surface-card)] object-cover object-top"
      />
      <div className="p-4">
        <span className="font-medium text-[var(--color-ink)]">{layout.name.vi}</span>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-body)]">
          {layout.description.vi}
        </p>
      </div>
    </label>
  );
}
