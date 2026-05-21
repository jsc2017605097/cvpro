import { Font } from "@react-pdf/renderer";

let registered = false;

function fontUrl(file: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${file}`;
  }
  return file;
}

/** Noto Sans TTF đầy đủ latin + tiếng Việt — thay Helvetica (không render đ, ệ, ư, …). */
export function registerPdfFonts(): void {
  if (registered) return;

  Font.register({
    family: "NotoSans",
    fonts: [
      { src: fontUrl("/fonts/NotoSans-Regular.ttf"), fontWeight: 400 },
      { src: fontUrl("/fonts/NotoSans-Bold.ttf"), fontWeight: 700 },
    ],
  });

  registered = true;
}
