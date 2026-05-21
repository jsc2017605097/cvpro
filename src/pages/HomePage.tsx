import { PageContainer } from "@/components/layout/PageContainer";
import { PresetGallery } from "@/features/catalog/PresetGallery";

export function HomePage() {
  return (
    <PageContainer className="pb-[var(--spacing-section)]">
      <PresetGallery />
    </PageContainer>
  );
}
