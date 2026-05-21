import { useState } from "react";
import type { CVData } from "@/schemas/cv.schema";
import { importCVFromText } from "@/lib/import-cv";
import { CodeWindowCard } from "@/components/ui/design/CodeWindowCard";
import { Button } from "@/components/ui/design/Button";

interface Props {
  onBack: () => void;
  onSuccess: (cvData: CVData) => void;
}

export function StepImport({ onBack, onSuccess }: Props) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);

  const handleImport = () => {
    const result = importCVFromText(text);
    if (result.ok) {
      setMessage(null);
      setFieldErrors([]);
      onSuccess(result.data);
      return;
    }
    setMessage(result.message);
    setFieldErrors(result.fieldErrors ?? []);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--color-body)]">
        Dán toàn bộ phản hồi từ AI (có khối ```json hoặc object JSON thuần).
      </p>
      <CodeWindowCard
        label="Paste JSON từ AI"
        value={text}
        onChange={setText}
        placeholder='{"meta":{...},"personal":{"fullName":"..."},...}'
        rows={14}
      />
      {message && (
        <p className="text-sm text-[var(--color-error)]">{message}</p>
      )}
      {fieldErrors.length > 0 && (
        <ul className="max-h-40 overflow-y-auto text-sm text-[var(--color-error)]">
          {fieldErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Quay lại
        </Button>
        <Button type="button" onClick={handleImport}>
          Import &amp; xem trước
        </Button>
      </div>
    </div>
  );
}
