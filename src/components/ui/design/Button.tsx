import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "secondary-on-dark";

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center px-5 text-sm font-medium transition-colors rounded-[var(--rounded-md)]",
        variant === "primary" &&
          "bg-[var(--color-primary)] text-[var(--color-on-primary)] active:bg-[var(--color-primary-active)] disabled:bg-[var(--color-primary-disabled)] disabled:text-[var(--color-muted)]",
        variant === "secondary" &&
          "bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline)] active:bg-[var(--color-surface-soft)]",
        variant === "secondary-on-dark" &&
          "bg-[var(--color-surface-dark-elevated)] text-[var(--color-on-dark)] border border-transparent active:opacity-90",
        className
      )}
      {...props}
    />
  );
}
