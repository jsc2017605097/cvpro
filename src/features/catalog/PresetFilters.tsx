import { CategoryTabs } from "@/components/ui/design/CategoryTabs";
import { TextInput } from "@/components/ui/design/TextInput";

export interface GalleryFilters {
  category: string;
  market: string;
  q: string;
}

interface PresetFiltersProps {
  filters: GalleryFilters;
  onChange: (next: GalleryFilters) => void;
}

export function PresetFilters({ filters, onChange }: PresetFiltersProps) {
  return (
    <div className="space-y-4">
      <CategoryTabs
        aria-label="Lọc ngành"
        value={filters.category}
        onChange={(category) => onChange({ ...filters, category })}
        options={[
          { value: "all", label: "Tất cả" },
          { value: "it", label: "IT" },
          { value: "product", label: "Product" },
          { value: "business", label: "Kinh doanh" },
          { value: "other", label: "Khác" },
        ]}
      />
      <CategoryTabs
        aria-label="Lọc thị trường"
        value={filters.market}
        onChange={(market) => onChange({ ...filters, market })}
        options={[
          { value: "all", label: "Mọi thị trường" },
          { value: "vn", label: "Việt Nam" },
          { value: "global", label: "Global" },
        ]}
      />
      <TextInput
        placeholder="Tìm kiếm (BA, PM, React…)"
        className="max-w-sm"
        value={filters.q}
        onChange={(e) => onChange({ ...filters, q: e.target.value })}
      />
    </div>
  );
}
