import { useMemo, useState } from "react";
import type { ProfilePreset } from "@/types/preset";
import { buildExportRule } from "@/lib/export-rule";
import { CodeWindowCard } from "@/components/ui/design/CodeWindowCard";
import { Button } from "@/components/ui/design/Button";

interface Props {
  preset: ProfilePreset;
  layoutId: string;
  language: "vi" | "en";
  onBack: () => void;
  onNext: () => void;
}

export function StepExport({
  preset,
  layoutId,
  language,
  onBack,
  onNext,
}: Props) {
  const [copied, setCopied] = useState(false);
  const rule = useMemo(
    () => buildExportRule({ preset, layoutId, language }),
    [preset, layoutId, language]
  );

  const copyRule = async () => {
    await navigator.clipboard.writeText(rule);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([rule], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cvpro-rule-${preset.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-[var(--rounded-lg)] bg-[var(--color-surface-dark)] p-[var(--spacing-lg)] text-[var(--color-on-dark)]">
        <p className="font-display text-lg">Hướng dẫn</p>
        <ol className="mt-4 list-decimal space-y-3 pl-4 text-sm text-[var(--color-on-dark-soft)]">
          <li>Copy rule bên phải</li>
          <li>Dán vào ChatGPT / Claude / Gemini</li>
          <li>Mô tả kinh nghiệm thật của bạn</li>
          <li>Quay lại import JSON ở bước sau</li>
        </ol>
      </aside>

      <div className="space-y-4">
        <CodeWindowCard label="Export rule" readOnly value={rule} rows={16} />
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            Quay lại
          </Button>
          <Button type="button" variant="secondary" onClick={copyRule}>
            {copied ? "Đã copy!" : "Copy rule"}
          </Button>
          <Button type="button" onClick={downloadTxt}>
            Tải .txt
          </Button>
          <Button type="button" onClick={onNext}>
            Tiếp — Import JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
