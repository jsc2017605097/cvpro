import { useMemo, useState } from "react";
import { PRESETS } from "@/data/presets";
import type { ProfilePreset } from "@/types/preset";
import { PresetGalleryHero } from "./PresetGalleryHero";
import { PresetFilters, type GalleryFilters } from "./PresetFilters";
import { PresetCard } from "./PresetCard";

function matchesMarket(preset: ProfilePreset, market: string): boolean {
  if (market === "all") return true;
  if (market === "vn") return preset.market === "vn" || preset.market === "both";
  if (market === "global")
    return preset.market === "global" || preset.market === "both";
  return true;
}

function matchesSearch(preset: ProfilePreset, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    preset.title.vi,
    preset.title.en,
    preset.shortDescription.vi,
    ...preset.tags,
    ...preset.skillKeywords,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export function PresetGallery() {
  const [filters, setFilters] = useState<GalleryFilters>({
    category: "all",
    market: "all",
    q: "",
  });

  const filtered = useMemo(
    () =>
      PRESETS.filter((p) => {
        if (filters.category !== "all" && p.category !== filters.category) {
          return false;
        }
        if (!matchesMarket(p, filters.market)) return false;
        return matchesSearch(p, filters.q);
      }),
    [filters]
  );

  return (
    <>
      <PresetGalleryHero />
      <PresetFilters filters={filters} onChange={setFilters} />
      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--color-muted)]">
          Không có mẫu phù hợp bộ lọc. Thử đổi ngành, thị trường hoặc từ khóa tìm
          kiếm.
        </p>
      ) : (
        <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((preset) => (
            <PresetCard key={preset.id} preset={preset} />
          ))}
        </section>
      )}
    </>
  );
}
