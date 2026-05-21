import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/PageContainer";

const navCtaClass = cn(
  "inline-flex h-10 items-center justify-center rounded-[var(--rounded-md)] px-5 text-sm font-medium no-underline transition-colors",
  "bg-[var(--color-primary)] text-[var(--color-on-primary)] active:bg-[var(--color-primary-active)]"
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)]">
      <header className="h-16 shrink-0 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]">
        <PageContainer className="flex h-full items-center justify-between">
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-[var(--color-ink)] no-underline"
          >
            CVPro
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-[var(--color-ink)] no-underline hover:text-[var(--color-primary)]"
            >
              Mẫu CV
            </Link>
            <button type="button" className={navCtaClass} onClick={() => navigate("/")}>
              Bắt đầu
            </button>
          </nav>
        </PageContainer>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-[var(--color-surface-dark)] py-16 text-[var(--color-on-dark-soft)]">
        <PageContainer>
          <p className="font-display text-lg text-[var(--color-on-dark)]">CVPro</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed">
            Tạo CV chuyên nghiệp với AI bạn đã có — export rule, import JSON, tải PDF.
          </p>
          <p className="mt-8 text-xs text-[var(--color-on-dark-soft)]">
            © {new Date().getFullYear()} CVPro
          </p>
        </PageContainer>
      </footer>
    </div>
  );
}
