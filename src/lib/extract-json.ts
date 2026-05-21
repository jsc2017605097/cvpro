export function extractJsonFromText(input: string): string {
  const fenced = input.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Không tìm thấy JSON trong văn bản import.");
  }
  return input.slice(start, end + 1);
}
