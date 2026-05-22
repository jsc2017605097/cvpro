import { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import type { CVData } from "@/schemas/cv.schema";
import { clampCvDataForCompactTwoPdf } from "@/lib/compact-two-one-page";
import { clampCvDataForWebDeveloperPdf } from "@/lib/web-developer-one-page";
import { CvDocument } from "./CvDocument";

interface Props {
  cvData: CVData;
  layoutId: string;
}

export function CvPdfPreview({ cvData, layoutId }: Props) {
  const data = useMemo(() => {
    if (layoutId === "compact-two") {
      return clampCvDataForCompactTwoPdf(cvData);
    }
    if (layoutId === "web-developer") {
      return clampCvDataForWebDeveloperPdf(cvData);
    }
    return cvData;
  }, [cvData, layoutId]);

  return (
    <div className="overflow-hidden rounded-[var(--rounded-lg)] border border-[var(--color-hairline)] bg-[var(--color-surface-card)]">
      <p className="border-b border-[var(--color-hairline)] px-4 py-2 text-sm text-[var(--color-muted)]">
        Xem trước PDF — giống file sẽ tải
      </p>
      <PDFViewer width="100%" height={560} showToolbar={false} className="w-full border-0">
        <CvDocument data={data} layoutId={layoutId} />
      </PDFViewer>
    </div>
  );
}
