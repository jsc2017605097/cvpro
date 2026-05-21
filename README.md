# CVPro

Webapp tạo CV chuyên nghiệp: chọn **profile preset** → **export rule** cho ChatGPT / Claude / Gemini → **import JSON** → xem trước → **tải PDF**.

Không tích hợp API AI trong MVP — bạn dùng công cụ AI bên ngoài.

## Yêu cầu

- Node.js ≥ 20.12 (khuyến nghị ≥ 20.19)
- npm

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở http://localhost:5173

## Luồng sử dụng

1. **Gallery** — Chọn mẫu CV theo vai trò (19 preset).
2. **Wizard bước 1** — Chọn layout PDF (`modern-single`, `compact-two`, `minimal-ats`) và ngôn ngữ rule (vi/en).
3. **Wizard bước 2** — Copy hoặc tải file `.txt` chứa export rule; dán vào AI và mô tả kinh nghiệm thật của bạn.
4. **Wizard bước 3** — Dán phản hồi JSON từ AI; app validate theo schema Zod.
5. **Wizard bước 4** — Xem trước tóm tắt và **Tải PDF**.

Draft wizard được lưu trong `localStorage` (key `cvpro-draft`).

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Xem bản build |
| `npm run lint` | ESLint |
| `npm test` | Vitest |

Trước khi merge: `npm run lint` → `npm test` → `npm run build`.

## Kiến trúc

- `src/schemas/` — Zod `CVData` (single source of truth)
- `src/data/presets/` — Profile preset JSON
- `src/lib/` — `extract-json`, `import-cv`, `export-rule`, `draft-storage`
- `src/features/catalog/` — Gallery
- `src/features/wizard/` — Wizard 4 bước
- `src/features/pdf/` — tokens, labels VI/EN, primitives, 3 layout PDF
- `public/fonts/` — Noto Sans TTF (tiếng Việt)
- `public/thumbnails/` — Preview layout trong wizard

## Layout PDF (Template Pro)

| Layout | Phong cách |
|--------|------------|
| `modern-single` | 1 cột, header + rule, section uppercase — trang trọng |
| `compact-two` | Sidebar cream (liên hệ, skills), thân CV — tech |
| `minimal-ats` | Phẳng, dates thẳng hàng — ATS |

Nhãn section theo `meta.language` (vi/en). Font PDF: **Noto Sans** (`public/fonts/`).

## QA PDF (manual)

- [ ] `modern-single`: tên lớn, rule dưới header, nhãn **Kinh nghiệm** (không "Experience")
- [ ] `compact-two`: sidebar `#f5f0e8` khác rõ `modern-single`
- [ ] `minimal-ats`: flat, không rule trang trí
- [ ] Ký tự Việt: ă â đ ê ô ơ ư / Ấ Đ Ệ
- [ ] CV mẫu junior đầy đủ ≤ 2 trang A4

## Deploy (Vercel)

```bash
npm run build
npx vercel --prod
```

Framework preset: Vite. Output: `dist`.

## Phase 2 (ngoài MVP)

- Export DOCX
- PDF preview iframe
- Validate theo `sections.required` từng preset
