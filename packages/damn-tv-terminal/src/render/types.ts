export interface Cell {
  char: string;
  fg: number;
  bg: number;
  bold?: boolean;
}

export interface Theme {
  name: string;
  background: number;
  border: number;
  borderAccent: number;
  playfieldBg: number;
  playfieldStars: number;
  terrainLow: number;
  terrainMid: number;
  terrainHigh: number;
  terrainShock: number;
  hudBg: number;
  hudText: number;
  hudAccent: number;
  player: number;
  playerBullet: number;
  enemy: number;
  enemyAccent: number;
  powerUp: number;
  explosion: number;
  title: number;
  subtitle: number;
  danger: number;
}

export const ANSI = {
  reset: '\x1b[0m',
  hideCursor: '\x1b[?25l',
  showCursor: '\x1b[?25h',
  altScreenEnter: '\x1b[?1049h',
  altScreenExit: '\x1b[?1049l',
  home: '\x1b[H',
  clear: '\x1b[2J',
} as const;

export const VIEWPORT_WIDTH = 80;
export const VIEWPORT_HEIGHT = 40;
export const PLAYFIELD_X = 2;
export const PLAYFIELD_Y = 1;
export const PLAYFIELD_WIDTH = 76;
export const PLAYFIELD_HEIGHT = 34;
export const HUD_X = 2;
export const HUD_Y = 36;
export const HUD_WIDTH = 76;
export const HUD_HEIGHT = 4;

/** Default screen height ÷ width for one terminal cell (typical monospace). */
export const DEFAULT_CELL_ASPECT_RATIO = 2;
