import { Link } from "react-router-dom";
import type { CVData } from "@/schemas/cv.schema";
import { getLayoutById } from "@/data/layouts";
import { COMPACT_TWO_ONE_PAGE } from "@/lib/compact-two-one-page";
import { WEB_DEVELOPER_ONE_PAGE } from "@/lib/web-developer-one-page";
import { countWords } from "@/lib/truncate-text";
import {
  flattenSkillsForWebDeveloper,
  normalizeToRatedSkills,
} from "@/lib/skills";
import { isSkillRatedArray } from "@/schemas/cv.schema";
import { CvPdfPreview } from "@/features/pdf/CvPdfPreview";
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
  const warnings: string[] = [];
  const L = COMPACT_TWO_ONE_PAGE;

  if (layoutId === "compact-two") {
    warnings.push(
      "Layout Compact (Ofspace) chỉ đẹp trên **1 trang A4** — PDF tự cắt nếu quá dài. Khi import, AI phải tuân rule: mỗi ý một section, không lặp summary/bullet/skills."
    );
    if (cvData.summary && countWords(cvData.summary) > L.summaryMaxWords) {
      warnings.push(
        `Mục tiêu nên ≤ ${L.summaryMaxWords} từ (tối đa 3 câu) để vừa 1 trang.`
      );
    }
    if (cvData.experience && cvData.experience.length > L.experienceMaxJobs) {
      warnings.push(
        `Nên tối đa ${L.experienceMaxJobs} công ty; mỗi job ≤ ${L.experienceMaxBullets} bullet.`
      );
    }
    for (const job of cvData.experience ?? []) {
      if (job.highlights.length > L.experienceMaxBullets) {
        warnings.push(
          `Công ty "${job.company}": tối đa ${L.experienceMaxBullets} bullet trên PDF.`
        );
        break;
      }
    }
    if (cvData.projects && cvData.projects.length > L.projectsMax) {
      warnings.push(`Nên tối đa ${L.projectsMax} dự án (hoặc bỏ projects).`);
    }
    if (cvData.education && cvData.education.length > L.educationMax) {
      warnings.push(`Chỉ hiển thị ${L.educationMax} mục học vấn trên PDF.`);
    }
    const skillCount = normalizeToRatedSkills(
      cvData.skills,
      cvData.meta.language
    ).length;
    if (skillCount > L.skillsMax) {
      warnings.push(`Chỉ hiển thị ${L.skillsMax} kỹ năng (skill bars) trên PDF.`);
    }
    if (cvData.certifications && cvData.certifications.length > L.certificationsMax) {
      warnings.push(`Chỉ hiển thị ${L.certificationsMax} chứng chỉ trên PDF.`);
    }
    const skillsFlat =
      Array.isArray(cvData.skills) &&
      cvData.skills.length > 0 &&
      typeof cvData.skills[0] === "string";
    if (skillsFlat) {
      warnings.push(
        "Kỹ năng dạng danh sách chữ — dùng [{ name, level }] cho thanh %."
      );
    }
    if (
      cvData.skills?.length &&
      !isSkillRatedArray(cvData.skills) &&
      normalizeToRatedSkills(cvData.skills, cvData.meta.language).every(
        (s) => s.level === 70
      )
    ) {
      warnings.push("Gợi ý: gửi skills kèm level (40–100).");
    }
  }

  if (layoutId === "web-developer") {
    const W = WEB_DEVELOPER_ONE_PAGE;
    warnings.push(
      "Layout Web Developer chỉ đẹp trên **1 trang A4** — PDF tự cắt nếu quá dài."
    );
    if (cvData.summary && countWords(cvData.summary) > W.summaryMaxWords) {
      warnings.push(`Mục tiêu nên ≤ ${W.summaryMaxWords} từ.`);
    }
    if (cvData.experience && cvData.experience.length > W.experienceMaxJobs) {
      warnings.push(`Nên tối đa ${W.experienceMaxJobs} công ty.`);
    }
    if (!cvData.personal.avatarUrl) {
      warnings.push("Nên có ảnh đại diện (`avatarUrl`) cho layout này.");
    }
    const skillCount = flattenSkillsForWebDeveloper(cvData.skills, W.skillsMax)
      .length;
    if (
      cvData.skills?.length &&
      skillCount >= W.skillsMax &&
      (cvData.skills as unknown[]).length > W.skillsMax
    ) {
      warnings.push(`Chỉ hiển thị ${W.skillsMax} kỹ năng trên PDF.`);
    }
    const hasFooter = [
      cvData.personal.linkedin,
      cvData.personal.twitter,
      cvData.personal.facebook,
      cvData.personal.email,
    ].some((v) => v?.trim());
    if (!hasFooter) {
      warnings.push("Footer: nên có ít nhất linkedin hoặc email.");
    }
  }

  return (
    <div className="space-y-6">
      {warnings.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
          {warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}
      {layout && (
        <p className="text-sm text-[var(--color-body)]">
          <span className="font-medium text-[var(--color-ink)]">{layout.name.vi}</span>
          {" — "}
          {layout.description.vi}
        </p>
      )}

      <CvPdfPreview cvData={cvData} layoutId={layoutId} />

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
