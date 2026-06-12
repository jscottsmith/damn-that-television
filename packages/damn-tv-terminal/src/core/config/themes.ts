import type { Theme } from '../../render/types.js';

function terrainFromBase(playfieldBg: number) {
  const terrainHigh = Math.min(255, playfieldBg + 1);
  return {
    terrainLow: Math.max(0, playfieldBg - 1),
    terrainMid: playfieldBg,
    terrainHigh,
    terrainShock: Math.min(255, terrainHigh + 1),
  };
}

export const themes: Record<string, Theme> = {
  club: {
    name: 'club',
    background: 233,
    border: 201,
    borderAccent: 213,
    playfieldBg: 235,
    playfieldStars: 240,
    ...terrainFromBase(235),
    hudBg: 236,
    hudText: 252,
    hudAccent: 213,
    player: 51,
    playerBullet: 226,
    enemy: 203,
    enemyAccent: 199,
    powerUp: 82,
    explosion: 250,
    title: 213,
    subtitle: 252,
    danger: 196,
  },
  retro: {
    name: 'retro',
    background: 16,
    border: 46,
    borderAccent: 82,
    playfieldBg: 234,
    playfieldStars: 22,
    ...terrainFromBase(234),
    hudBg: 235,
    hudText: 46,
    hudAccent: 82,
    player: 46,
    playerBullet: 226,
    enemy: 196,
    enemyAccent: 160,
    powerUp: 51,
    explosion: 250,
    title: 46,
    subtitle: 250,
    danger: 196,
  },
  neon: {
    name: 'neon',
    background: 17,
    border: 45,
    borderAccent: 51,
    playfieldBg: 18,
    playfieldStars: 25,
    ...terrainFromBase(18),
    hudBg: 17,
    hudText: 51,
    hudAccent: 45,
    player: 51,
    playerBullet: 231,
    enemy: 201,
    enemyAccent: 213,
    powerUp: 46,
    explosion: 252,
    title: 45,
    subtitle: 255,
    danger: 203,
  },
};

export const THEME_NAMES = ['club', 'retro', 'neon'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export function getTheme(name?: string): Theme {
  return themes[name ?? 'club'] ?? themes.club!;
}

export const DEFAULT_THEME = 'club';
