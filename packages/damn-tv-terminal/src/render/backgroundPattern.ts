/** Muted checker of light/medium block shades (U+2591, U+2592). */
export const BG_BLOCKS = ["▚"] as const;

export function backgroundBlock(x: number, y: number): string {
  return BG_BLOCKS[(x + y) % BG_BLOCKS.length]!;
}
