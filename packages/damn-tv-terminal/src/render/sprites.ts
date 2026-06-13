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
import { parseAnimation, parseSprite, parseSpriteSheet } from './parseAscii.js';
import type { EnemyMovementType } from '../core/config/levels.js';
import type { PlayerFacing, PlayerSpriteMode } from '../core/types.js';

export type { PlayerFacing, PlayerSpriteMode };

export const PLAYER_SPRITE_SHEET = parseSpriteSheet(playerAscii);

export const PLAYER_SHOOT_ANIM_MS = 150;
export const PLAYER_IDLE_ANIM_MS = 200;

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

function getSheetSize(sheet: typeof PLAYER_SPRITE_SHEET): { w: number; h: number } {
  let w = 0;
  let h = 0;

  for (const frames of Object.values(sheet)) {
    for (const frame of frames) {
      const size = getSpriteSize(frame);
      w = Math.max(w, size.w);
      h = Math.max(h, size.h);
    }
  }

  return { w, h };
}

export function getPlayerSpriteMode(
  player: { lastShot?: number; shieldUntil: number },
  now: number,
): PlayerSpriteMode {
  if (now < player.shieldUntil) return 'shield';
  if (player.lastShot !== undefined && now - player.lastShot < PLAYER_SHOOT_ANIM_MS) {
    return 'shoot';
  }
  return 'idle';
}

export function getPlayerSprite(
  mode: PlayerSpriteMode,
  facing: PlayerFacing,
  animFrame: number,
): readonly string[] {
  const key = `${mode}-${facing}`;
  const frames =
    PLAYER_SPRITE_SHEET[key] ??
    PLAYER_SPRITE_SHEET['idle-center'] ??
    PLAYER_SPRITE_SHEET.default ??
    [[' ']];
  return frames[animFrame % frames.length]!;
}

export const PLAYER_SIZE = getSheetSize(PLAYER_SPRITE_SHEET);
export const TV_SIZE = getSpriteSize(TV_SPRITE);
export const EXPLOSION_SIZE = getSpriteSize(EXPLOSION_FRAMES[0] ?? ['*']);

export function getEnemySize(type: EnemyMovementType): { w: number; h: number } {
  return getSpriteSize(ENEMY_SPRITES[type]);
}
