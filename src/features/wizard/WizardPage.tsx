import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPresetById } from "@/data/presets";
import { loadDraft, saveDraft, type WizardDraft } from "@/lib/draft-storage";
import { StepLayout } from "./steps/StepLayout";
import { StepExport } from "./steps/StepExport";
import { StepImport } from "./steps/StepImport";
import { StepPreview } from "./steps/StepPreview";
import { PageContainer } from "@/components/layout/PageContainer";

const STEP_LABELS = [
  "Chọn layout",
  "Export rule",
  "Import JSON",
  "Xem trước & PDF",
];

export function WizardPage() {
  const { presetId = "" } = useParams();
  const preset = getPresetById(presetId);
  const [draft, setDraft] = useState<WizardDraft | null>(null);

  useEffect(() => {
    if (!preset) return;
    const existing = loadDraft();
    if (existing?.presetId === presetId) {
      setDraft(existing);
    } else {
      setDraft({
        presetId,
        layoutId: preset.recommendedLayouts[0] ?? "modern-single",
        language: preset.defaultLanguage,
        step: 0,
      });
    }
  }, [presetId, preset]);

  useEffect(() => {
    if (draft) saveDraft(draft);
  }, [draft]);

  if (!preset) return <Navigate to="/" replace />;
  if (!draft) return null;

  const setStep = (step: number) => setDraft({ ...draft, step });

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

      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        {draft.step === 0 && (
          <StepLayout
            draft={draft}
            preset={preset}
            onUpdate={(patch) => setDraft({ ...draft, ...patch })}
            onNext={() => setDraft({ ...draft, step: 1 })}
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
