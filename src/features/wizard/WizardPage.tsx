import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPresetById } from "@/data/presets";
import {
  loadDraft,
  saveDraft,
  clearDraft,
  type WizardDraft,
} from "@/lib/draft-storage";
import { StepLayout } from "./steps/StepLayout";
import { StepExport } from "./steps/StepExport";
import { StepImport } from "./steps/StepImport";
import { StepPreview } from "./steps/StepPreview";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/design/Button";

const STEP_LABELS = [
  "Chọn layout",
  "Export rule",
  "Import JSON",
  "Xem trước & PDF",
];

function freshDraft(presetId: string, preset: NonNullable<ReturnType<typeof getPresetById>>): WizardDraft {
  return {
    presetId,
    layoutId: preset.recommendedLayouts[0] ?? "modern-single",
    language: preset.defaultLanguage,
    step: 0,
  };
}

export function WizardPage() {
  const { presetId = "" } = useParams();
  const preset = getPresetById(presetId);
  const [draft, setDraft] = useState<WizardDraft | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);

  useEffect(() => {
    if (!preset) return;
    const existing = loadDraft();
    if (existing?.presetId === presetId && existing.step > 0) {
      setDraft(existing);
      setShowResumeBanner(true);
    } else {
      setDraft(freshDraft(presetId, preset));
      setShowResumeBanner(false);
    }
  }, [presetId, preset]);

  useEffect(() => {
    if (draft) saveDraft(draft);
  }, [draft]);

  if (!preset) return <Navigate to="/" replace />;
  if (!draft) return null;

  const setStep = (step: number) => setDraft({ ...draft, step });

  const handleStartFresh = () => {
    clearDraft();
    setDraft(freshDraft(presetId, preset));
    setShowResumeBanner(false);
  };

  return (
    <PageContainer className="py-[var(--spacing-section)]">
      <Link
        to="/"
        className="text-sm text-[var(--color-muted)] no-underline hover:text-[var(--color-primary)]"
      >
        ← Về danh sách mẫu
      </Link>

      <h1 className="font-display mt-4 text-[32px] tracking-tight text-[var(--color-ink)]">
        {preset.title.vi}
      </h1>

      {showResumeBanner && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-[var(--rounded-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-4">
          <p className="flex-1 text-sm text-[var(--color-body)]">
            Bạn có bản nháp chưa xong cho mẫu này.
          </p>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowResumeBanner(false)}
          >
            Tiếp tục nháp
          </Button>
          <Button type="button" variant="secondary" onClick={handleStartFresh}>
            Làm mới
          </Button>
        </div>
      )}

      <nav
        className="mt-6 flex flex-wrap gap-2 text-sm text-[var(--color-muted)]"
        aria-label="Tiến trình wizard"
      >
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={
              i === draft.step
                ? "rounded-[var(--rounded-md)] bg-[var(--color-surface-card)] px-3 py-1 font-medium text-[var(--color-ink)]"
                : "px-3 py-1"
            }
          >
            {i + 1}. {label}
          </span>
        ))}
      </nav>

      <div className="mx-auto mt-8 max-w-4xl space-y-6">
        {draft.step === 0 && (
          <StepLayout
            draft={draft}
            preset={preset}
            onUpdate={(patch) => setDraft({ ...draft, ...patch })}
            onNext={() => {
              setShowResumeBanner(false);
              setDraft({ ...draft, step: 1 });
            }}
          />
        )}
        {draft.step === 1 && (
          <StepExport
            preset={preset}
            layoutId={draft.layoutId}
            language={draft.language}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {draft.step === 2 && (
          <StepImport
            onBack={() => setStep(1)}
            onSuccess={(cvData) => setDraft({ ...draft, cvData, step: 3 })}
          />
        )}
        {draft.step === 3 && draft.cvData && (
          <StepPreview
            cvData={draft.cvData}
            layoutId={draft.layoutId}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </PageContainer>
  );
}
