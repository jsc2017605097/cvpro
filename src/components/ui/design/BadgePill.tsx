import { cn } from "@/lib/utils";

type Variant = "pill" | "coral";

export function BadgePill({
  variant = "pill",
  className,
  children,
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--rounded-pill)] px-3 py-1 text-[13px] font-medium leading-tight",
        variant === "pill" &&
          "bg-[var(--color-surface-card)] text-[var(--color-ink)]",
        variant === "coral" &&
          "bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[12px] uppercase tracking-[0.1em]",
        className
      )}
    >
      {children}
    </span>
  );
}
