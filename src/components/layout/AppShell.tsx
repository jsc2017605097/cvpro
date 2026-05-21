import { Link } from "react-router-dom";
import { Button } from "@/components/ui/design/Button";
import { PageContainer } from "@/components/layout/PageContainer";

export function AppShell({ children }: { children: React.ReactNode }) {
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
            <Link to="/" className="no-underline">
              <Button variant="primary" type="button">
                Bắt đầu
              </Button>
            </Link>
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
