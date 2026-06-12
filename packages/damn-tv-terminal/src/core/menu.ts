import { THEME_NAMES } from './config/themes.js';

export type MenuScreen = 'main' | 'theme';

export const MAIN_MENU_ITEMS = ['Play', 'Theme'] as const;

export const THEME_MENU_BACK = 'Back';

export function getThemeMenuItemCount(): number {
  return THEME_NAMES.length + 1;
}

export function getThemeMenuItem(index: number, activeTheme: string): string {
  if (index < THEME_NAMES.length) {
    const name = THEME_NAMES[index]!;
    const marker = name === activeTheme ? ' *' : '';
    return name.charAt(0).toUpperCase() + name.slice(1) + marker;
  }
  return THEME_MENU_BACK;
}

export function isThemeMenuBack(index: number): boolean {
  return index === THEME_NAMES.length;
}

export function clampMenuIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  return ((index % count) + count) % count;
}

export function stepMenuIndex(index: number, delta: number, count: number): number {
  return clampMenuIndex(index + delta, count);
}
