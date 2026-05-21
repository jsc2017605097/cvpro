import { useState } from "react";
import { Button } from "@/components/ui/design/Button";
import { FeatureCard } from "@/components/ui/design/FeatureCard";
import { BadgePill } from "@/components/ui/design/BadgePill";
import { TextInput } from "@/components/ui/design/TextInput";
import { CategoryTabs } from "@/components/ui/design/CategoryTabs";
import { CodeWindowCard } from "@/components/ui/design/CodeWindowCard";
import { PageContainer } from "@/components/layout/PageContainer";

export function HomePage() {
  const [filter, setFilter] = useState("all");

  return (
    <PageContainer className="py-[var(--spacing-section)]">
      <section className="max-w-2xl">
        <h1 className="font-display text-[48px] leading-[1.1] tracking-[-0.02em]">
          Tạo CV chuyên nghiệp với AI bạn đã có
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-body)]">
          Chọn mẫu theo vai trò, export rule cho ChatGPT / Claude / Gemini, import
          JSON — nhận PDF chuẩn layout.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Dùng mẫu CV</Button>
          <Button variant="secondary">Tìm hiểu thêm</Button>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <CategoryTabs
          aria-label="Lọc ngành"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "Tất cả" },
            { value: "it", label: "IT" },
            { value: "product", label: "Product" },
          ]}
        />
        <TextInput placeholder="Tìm kiếm (BA, PM, React…)" className="max-w-sm" />
      </section>

      <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard className="flex flex-col">
          <div className="mb-3 flex flex-wrap gap-2">
            <BadgePill>IT</BadgePill>
            <BadgePill variant="coral">Global</BadgePill>
          </div>
          <h2 className="font-display text-[22px]">CV Developer Junior</h2>
          <p className="mt-2 flex-1 text-sm text-[var(--color-body)]">
            0–2 năm KN: stack rõ, project và internship.
          </p>
          <Button className="mt-6 w-full">Dùng mẫu này</Button>
        </FeatureCard>
      </section>

      <section className="mt-16">
        <CodeWindowCard
          label="Ví dụ rule export (preview)"
          readOnly
          value={'{\n  "personal": { "fullName": "[Họ tên]" }\n}'}
          rows={6}
        />
      </section>
    </PageContainer>
  );
}
