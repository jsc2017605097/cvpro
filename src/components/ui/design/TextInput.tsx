import { cn } from "@/lib/utils";

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[var(--rounded-md)] border border-[var(--color-hairline)] bg-[var(--color-canvas)] px-3.5 text-base text-[var(--color-ink)] outline-none transition-[border-color,box-shadow]",
        "placeholder:text-[var(--color-muted-soft)]",
        "focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(204,120,92,0.15)]",
        className
      )}
      {...props}
    />
  );
}
