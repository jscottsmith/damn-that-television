import dunceAscii from './sprites/dunce.ascii';
import explosionAscii from './sprites/explosion.ascii';
import followerAscii from './sprites/follower.ascii';
import playerAscii from './sprites/player.ascii';
import lifeAscii from './sprites/powerups/life.ascii';
import pillAscii from './sprites/powerups/pill.ascii';
import pizzaAscii from './sprites/powerups/pizza.ascii';
import shieldAscii from './sprites/powerups/shield.ascii';
import snekAscii from './sprites/snek.ascii';
import tvSmallAscii from './sprites/tv-small.ascii';
import tvAscii from './sprites/tv.ascii';
import { parseAnimation, parseSprite } from './parseAscii.js';
import type { EnemyMovementType } from '../core/config/levels.js';

export const PLAYER_SPRITE = parseSprite(playerAscii);

export const TV_SPRITE = parseSprite(tvAscii);

export const TV_SPRITE_SMALL = parseSprite(tvSmallAscii);

export const ENEMY_SPRITES = {
  DUNCE: parseSprite(dunceAscii),
  FOLLOWER: parseSprite(followerAscii),
  SNEK: parseSprite(snekAscii),
} as const satisfies Record<EnemyMovementType, readonly string[]>;

export type EnemySpriteMap = typeof ENEMY_SPRITES;

export const BULLET_CHAR = '|';

export const EXPLOSION_FRAMES = parseAnimation(explosionAscii);

export const POWERUP_SPRITES = {
  shield: parseSprite(shieldAscii),
  pizza: parseSprite(pizzaAscii),
  pill: parseSprite(pillAscii),
  life: parseSprite(lifeAscii),
} as const;

export type PowerUpType = keyof typeof POWERUP_SPRITES;

export function getSpriteSize(lines: readonly string[]): { w: number; h: number } {
  return {
    w: Math.max(...lines.map((line) => line.length)),
    h: lines.length,
  };
}

export const PLAYER_SIZE = getSpriteSize(PLAYER_SPRITE);
export const TV_SIZE = getSpriteSize(TV_SPRITE);

export function getEnemySize(type: EnemyMovementType): { w: number; h: number } {
  return getSpriteSize(ENEMY_SPRITES[type]);
}
