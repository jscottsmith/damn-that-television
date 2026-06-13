/** Strip comments and normalize line endings. */
function stripComments(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter((line) => !line.startsWith('#'));
}

/** Lines of only `_` become spaces (blank rows survive editor trim-on-save). */
function normalizeLine(line: string): string {
  if (/^_+$/.test(line)) {
    return ' '.repeat(line.length);
  }
  return line;
}

/** Parse a single sprite from an ASCII art block. Spaces are transparent at render time. */
export function parseSprite(text: string): readonly string[] {
  const lines = stripComments(text);
  const trimmed = lines.join('\n').replace(/\n+$/, '');
  if (!trimmed) return [];

  return trimmed.split('\n').map(normalizeLine);
}

const STATE_MARKER = /^---\s*state:\s*(\S+)\s*---\s*$/im;

/** Parse a sprite sheet with named states, each containing one or more animation frames. */
export function parseSpriteSheet(
  text: string,
): Readonly<Record<string, readonly (readonly string[])[]>> {
  const parts = text.split(STATE_MARKER);
  const sheet: Record<string, readonly (readonly string[])[]> = {};

  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i]!.toLowerCase();
    const content = parts[i + 1] ?? '';
    const frames = parseAnimation(content);
    if (frames.length > 0) {
      sheet[name] = frames;
    }
  }

  if (Object.keys(sheet).length === 0) {
    const fallback = parseAnimation(text);
    if (fallback.length > 0) {
      sheet.default = fallback;
    }
  }

  return sheet;
}

/** Parse a multi-frame animation delimited by `--- frame ---` markers. */
export function parseAnimation(text: string): readonly (readonly string[])[] {
  const blocks = text
    .split(/^---\s*frame\s*---\s*$/im)
    .map((block) => block.replace(/^\n+/, '').replace(/\n+$/, ''))
    .filter((block) => block.trim().length > 0);

  if (blocks.length === 0) {
    const sprite = parseSprite(text);
    return sprite.length > 0 ? [sprite] : [];
  }

  return blocks.map(parseSprite).filter((sprite) => sprite.length > 0);
}
