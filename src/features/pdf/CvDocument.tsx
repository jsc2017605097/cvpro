import type { CVData } from "@/schemas/cv.schema";
import { registerPdfFonts } from "./register-fonts";
import { ModernSinglePdf } from "./layouts/ModernSingle";
import { CompactTwoPdf } from "./layouts/CompactTwo";
import { MinimalAtsPdf } from "./layouts/MinimalAts";

registerPdfFonts();

interface Props {
  data: CVData;
  layoutId: string;
}

export function CvDocument({ data, layoutId }: Props) {
  switch (layoutId) {
    case "compact-two":
      return <CompactTwoPdf data={data} />;
    case "minimal-ats":
      return <MinimalAtsPdf data={data} />;
    default:
      return <ModernSinglePdf data={data} />;
  }
}
