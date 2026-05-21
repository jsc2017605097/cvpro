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
- `src/features/pdf/` — `@react-pdf/renderer` layouts

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
