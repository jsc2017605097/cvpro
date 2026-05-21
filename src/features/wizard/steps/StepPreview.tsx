import { Link } from "react-router-dom";
import type { CVData } from "@/schemas/cv.schema";
import { getLayoutById } from "@/data/layouts";
import { DownloadButton } from "@/features/pdf/DownloadButton";
import { Button } from "@/components/ui/design/Button";
import { clearDraft } from "@/lib/draft-storage";

interface Props {
  cvData: CVData;
  layoutId: string;
  onBack: () => void;
}

export function StepPreview({ cvData, layoutId, onBack }: Props) {
  const layout = getLayoutById(layoutId);

  return (
    <div className="space-y-6">
      {layout && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <img
            src={layout.previewImage}
            alt=""
            className="w-full max-w-[200px] shrink-0 rounded-[var(--rounded-md)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)] object-cover object-top"
          />
          <div>
            <p className="text-sm font-medium text-[var(--color-ink)]">
              Layout: {layout.name.vi}
            </p>
            <p className="mt-1 text-sm text-[var(--color-body)]">
              {layout.description.vi}
            </p>
          </div>
        </div>
      )}

      <div className="rounded-[var(--rounded-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-6">
        <p className="text-sm text-[var(--color-muted)]">Xem trước nội dung</p>
        <h2 className="font-display mt-2 text-2xl text-[var(--color-ink)]">
          {cvData.personal.fullName}
        </h2>
        {cvData.personal.title && (
          <p className="mt-1 text-[var(--color-body)]">{cvData.personal.title}</p>
        )}
        {cvData.summary && (
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-body)]">
            {cvData.summary}
          </p>
        )}
        {cvData.skills && cvData.skills.length > 0 && (
          <p className="mt-4 text-sm text-[var(--color-body)]">
            <span className="font-medium text-[var(--color-ink)]">Kỹ năng: </span>
            {cvData.skills.join(" · ")}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <DownloadButton cvData={cvData} layoutId={layoutId} />
        <Button type="button" variant="secondary" onClick={onBack}>
          Quay lại import
        </Button>
        <Link
          to="/"
          className="text-sm text-[var(--color-body)] underline-offset-2 hover:text-[var(--color-primary)] hover:underline"
          onClick={() => clearDraft()}
        >
          Về danh sách mẫu
        </Link>
      </div>
    </div>
  );
}
