import type { EnemyMovementType } from '../core/config/levels.js';
import type { PowerUpType } from '../render/sprites.js';

export const ENEMY_SYMBOLS: Record<string, EnemyMovementType> = {
  D: 'DUNCE',
  F: 'FOLLOWER',
  S: 'SNEK',
};

export const POWERUP_SYMBOLS: Record<string, PowerUpType | 'random'> = {
  P: 'random',
  H: 'shield',
  Z: 'pizza',
  I: 'pill',
  L: 'life',
};

export const FINISH_SYMBOLS = new Set(['=']);
