import { cn } from "@/lib/utils";

export interface TabOption {
  value: string;
  label: string;
}

interface CategoryTabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  "aria-label"?: string;
}

export function CategoryTabs({
  options,
  value,
  onChange,
  className,
  "aria-label": ariaLabel = "Bộ lọc",
}: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-[var(--rounded-md)] px-3.5 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-[var(--color-surface-card)] text-[var(--color-ink)]"
                : "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
