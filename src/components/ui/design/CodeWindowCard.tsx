import { cn } from "@/lib/utils";

interface CodeWindowCardProps {
  className?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  children?: React.ReactNode;
}

export function CodeWindowCard({
  className,
  label,
  value,
  onChange,
  readOnly = false,
  placeholder,
  rows = 12,
  children,
}: CodeWindowCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--rounded-lg)] bg-[var(--color-surface-dark)] p-[var(--spacing-lg)]",
        className
      )}
    >
      {label && (
        <p className="mb-3 text-sm font-medium text-[var(--color-on-dark-soft)]">
          {label}
        </p>
      )}
      {children ?? (
        <textarea
          readOnly={readOnly}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "font-code w-full resize-y overflow-x-auto rounded-[var(--rounded-md)] border-0 bg-[var(--color-surface-dark-soft)] p-4 text-sm leading-relaxed text-[var(--color-on-dark)] outline-none",
            "placeholder:text-[var(--color-on-dark-soft)]",
            "focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30"
          )}
        />
      )}
    </div>
  );
}
