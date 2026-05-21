import type { LayoutTemplate } from "@/types/preset";

export const LAYOUTS: LayoutTemplate[] = [
  {
    id: "modern-single",
    name: { vi: "Modern — 1 cột", en: "Modern — Single column" },
    description: {
      vi: "Header nổi bật, rule ngang, section chữ hoa — trang trọng đa ngành",
      en: "Bold header, horizontal rule, uppercase sections — professional",
    },
    previewImage: "/thumbnails/layout-modern-single.svg",
  },
  {
    id: "compact-two",
    name: { vi: "Compact — 2 cột", en: "Compact — Two columns" },
    description: {
      vi: "Sidebar cream: liên hệ & kỹ năng; thân CV cho kinh nghiệm",
      en: "Cream sidebar for contact & skills; body for experience",
    },
    previewImage: "/thumbnails/layout-compact-two.svg",
  },
  {
    id: "minimal-ats",
    name: { vi: "Minimal ATS", en: "Minimal ATS" },
    description: {
      vi: "Phẳng, dates thẳng hàng — tối ưu ATS và portal tuyển dụng",
      en: "Flat layout with aligned dates — ATS-friendly",
    },
    previewImage: "/thumbnails/layout-minimal-ats.svg",
  },
];

export function getLayoutById(id: string): LayoutTemplate | undefined {
  return LAYOUTS.find((l) => l.id === id);
}
