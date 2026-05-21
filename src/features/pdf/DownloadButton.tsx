import { PDFDownloadLink } from "@react-pdf/renderer";
import { CvDocument } from "./CvDocument";
import type { CVData } from "@/schemas/cv.schema";
import { cn } from "@/lib/utils";

interface Props {
  cvData: CVData;
  layoutId: string;
  className?: string;
}

export function DownloadButton({ cvData, layoutId, className }: Props) {
  const fileName = `cv-${cvData.personal.fullName.replace(/\s+/g, "-").toLowerCase()}.pdf`;

  return (
    <PDFDownloadLink
      document={<CvDocument data={cvData} layoutId={layoutId} />}
      fileName={fileName}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[var(--rounded-md)] px-5 text-sm font-medium no-underline transition-colors",
        "bg-[var(--color-primary)] text-[var(--color-on-primary)] active:bg-[var(--color-primary-active)]",
        className
      )}
    >
      {({ loading }) => (loading ? "Đang tạo PDF..." : "Tải PDF")}
    </PDFDownloadLink>
  );
}
