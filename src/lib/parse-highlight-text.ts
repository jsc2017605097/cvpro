export type TextSegment = { text: string; bold?: boolean };

const BOLD_RE = /\*\*([^*]+)\*\*/g;

function parseMarkdownBold(text: string): TextSegment[] | null {
  if (!text.includes("**")) return null;

  const segments: TextSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  BOLD_RE.lastIndex = 0;
  while ((match = BOLD_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), bold: false });
  }

  return segments.length ? segments : null;
}

function parseTokenHighlights(text: string, tokens: string[]): TextSegment[] {
  const sorted = [...tokens]
    .filter((t) => t.length >= 3)
    .sort((a, b) => b.length - a.length);

  const segments: TextSegment[] = [];
  let i = 0;

  while (i < text.length) {
    let matched: string | undefined;

    for (const token of sorted) {
      const slice = text.slice(i, i + token.length);
      if (slice.toLowerCase() === token.toLowerCase()) {
        matched = slice;
        break;
      }
    }

    if (matched) {
      segments.push({ text: matched, bold: true });
      i += matched.length;
      continue;
    }

    const last = segments[segments.length - 1];
    const ch = text[i];
    if (last && !last.bold) {
      last.text += ch;
    } else {
      segments.push({ text: ch, bold: false });
    }
    i += 1;
  }

  return segments;
}

export function parseHighlightSegments(
  text: string,
  tokens: string[] = []
): TextSegment[] {
  const markdown = parseMarkdownBold(text);
  if (markdown) return markdown;

  if (tokens.length) return parseTokenHighlights(text, tokens);

  return [{ text, bold: false }];
}
