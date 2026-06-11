import type { EnemyMovementType } from './levels.js';
import { ENEMY_SPRITES } from '../../render/sprites.js';
import type { Theme } from '../../render/types.js';

export interface EnemyDefinition {
  type: EnemyMovementType;
  sprite: readonly string[];
  themeKey?: keyof Theme;
}

export function getEnemyDefinitions(): Record<EnemyMovementType, EnemyDefinition> {
  return {
    DUNCE: { type: 'DUNCE', sprite: ENEMY_SPRITES.DUNCE },
    FOLLOWER: { type: 'FOLLOWER', sprite: ENEMY_SPRITES.FOLLOWER, themeKey: 'hudAccent' },
    SNEK: { type: 'SNEK', sprite: ENEMY_SPRITES.SNEK, themeKey: 'borderAccent' },
  };
}

export function getEnemySprite(type: EnemyMovementType): readonly string[] {
  return ENEMY_SPRITES[type];
}

export function getEnemyThemeColor(theme: Theme, type: EnemyMovementType): number {
  const def = getEnemyDefinitions()[type];
  const key = def.themeKey ?? 'enemy';
  return theme[key] as number;
}
