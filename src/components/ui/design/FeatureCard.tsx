import { cn } from "@/lib/utils";

export function FeatureCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--rounded-lg)] bg-[var(--color-surface-card)] p-[var(--spacing-xl)] text-[var(--color-ink)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
