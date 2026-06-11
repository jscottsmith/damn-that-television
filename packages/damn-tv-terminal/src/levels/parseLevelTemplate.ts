import type { EnemyMovementType } from '../core/config/levels.js';
import { randomPowerUpType } from '../core/entities/PowerUp.js';
import type { PowerUpType } from '../render/sprites.js';
import {
  ENEMY_SYMBOLS,
  FINISH_SYMBOLS,
  POWERUP_SYMBOLS,
} from './symbols.js';

export interface ParsedLevel {
  width: number;
  height: number;
  scrollSpeed: number;
  winBonus: number;
  enemies: { x: number; y: number; type: EnemyMovementType }[];
  powerUps: { x: number; y: number; type: PowerUpType }[];
  finishCells: { x: number; y: number }[];
}

const SECTION_HEADER = /^---\s*(\w+)\s*---\s*$/i;

function stripComments(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter((line) => !line.startsWith('#'));
}

function parseMetadata(lines: string[]): Omit<ParsedLevel, 'height' | 'enemies' | 'powerUps' | 'finishCells'> {
  let width = 76;
  let scrollSpeed = 1.4;
  let winBonus = 360;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('---')) break;

    const [key, rawValue] = trimmed.split(':').map((part) => part.trim());
    const value = rawValue ?? '';

    switch (key) {
      case 'width':
        width = Number(value);
        break;
      case 'scrollSpeed':
        scrollSpeed = Number(value);
        break;
      case 'winBonus':
        winBonus = Number(value);
        break;
    }
  }

  return { width, scrollSpeed, winBonus };
}

function splitSections(lines: string[]): Map<string, string[]> {
  const sections = new Map<string, string[]>();
  let current: string | null = null;

  for (const line of lines) {
    const match = line.match(SECTION_HEADER);
    if (match) {
      current = match[1]!.toLowerCase();
      sections.set(current, []);
      continue;
    }

    if (current) {
      sections.get(current)!.push(line);
    }
  }

  return sections;
}

function normalizeRow(line: string, width: number): string {
  const trimmed = line.replace(/\r$/, '');
  if (!trimmed || /^_+$/.test(trimmed)) {
    return '.'.repeat(width);
  }

  if (trimmed.length < width) {
    return trimmed.padEnd(width, '.');
  }

  return trimmed.slice(0, width);
}

function parseLayerRows(rawRows: string[], width: number): string[] {
  return rawRows.map((row) => normalizeRow(row, width));
}

function resolvePowerUpType(symbol: string): PowerUpType {
  const mapped = POWERUP_SYMBOLS[symbol];
  if (!mapped || mapped === 'random') {
    return randomPowerUpType();
  }
  return mapped as PowerUpType;
}

function templateRowToWorldY(rowIndex: number, height: number): number {
  // Templates read top-to-bottom like the playfield: finish at top, start at bottom.
  return height - 1 - rowIndex;
}

function collectFromLayer(
  rows: string[],
  width: number,
  height: number,
  layer: 'enemies' | 'powerups' | 'finish',
): Pick<ParsedLevel, 'enemies' | 'powerUps' | 'finishCells'> {
  const enemies: ParsedLevel['enemies'] = [];
  const powerUps: ParsedLevel['powerUps'] = [];
  const finishCells: ParsedLevel['finishCells'] = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]!;
    const worldY = templateRowToWorldY(rowIndex, height);

    for (let x = 0; x < width; x++) {
      const char = row[x] ?? '.';
      if (char === '.' || char === ' ') continue;

      if (layer === 'enemies') {
        const type = ENEMY_SYMBOLS[char];
        if (type) enemies.push({ x, y: worldY, type });
      } else if (layer === 'powerups') {
        if (POWERUP_SYMBOLS[char]) {
          powerUps.push({ x, y: worldY, type: resolvePowerUpType(char) });
        }
      } else if (layer === 'finish' && FINISH_SYMBOLS.has(char)) {
        finishCells.push({ x, y: worldY });
      }
    }
  }

  return { enemies, powerUps, finishCells };
}

export function parseLevelTemplate(text: string): ParsedLevel {
  const lines = stripComments(text);
  const metadata = parseMetadata(lines);
  const sections = splitSections(lines);

  const enemyRows = parseLayerRows(sections.get('enemies') ?? [], metadata.width);
  const powerUpRows = parseLayerRows(sections.get('powerups') ?? [], metadata.width);
  const finishRows = parseLayerRows(sections.get('finish') ?? [], metadata.width);

  const height = Math.max(enemyRows.length, powerUpRows.length, finishRows.length, 1);

  while (enemyRows.length < height) enemyRows.push('.'.repeat(metadata.width));
  while (powerUpRows.length < height) powerUpRows.push('.'.repeat(metadata.width));
  while (finishRows.length < height) finishRows.push('.'.repeat(metadata.width));

  const enemyData = collectFromLayer(enemyRows, metadata.width, height, 'enemies');
  const powerUpData = collectFromLayer(powerUpRows, metadata.width, height, 'powerups');
  const finishData = collectFromLayer(finishRows, metadata.width, height, 'finish');

  if (finishData.finishCells.length === 0) {
    throw new Error('Level template must include at least one finish marker (=)');
  }

  return {
    ...metadata,
    height,
    enemies: enemyData.enemies,
    powerUps: powerUpData.powerUps,
    finishCells: finishData.finishCells,
  };
}
