import { POWERUP_SPRITES, type PowerUpType } from '../../render/sprites.js';
import { getSpriteSize } from '../../render/sprites.js';
import type { PowerUp } from '../types.js';
import { createId } from '../types.js';

const POWERUP_TYPES = Object.keys(POWERUP_SPRITES) as PowerUpType[];

export function randomPowerUpType(): PowerUpType {
  return POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)]!;
}

export function createPowerUp(x: number, y: number, type: PowerUpType): PowerUp {
  const size = getSpriteSize(POWERUP_SPRITES[type]);
  return {
    id: createId(),
    dead: false,
    x,
    y,
    w: size.w,
    h: size.h,
    type,
  };
}

export function applyPowerUp(
  type: PowerUpType,
  player: import('../types.js').Player,
  now: number,
): void {
  switch (type) {
    case 'shield':
      player.shieldUntil = now + 8000;
      break;
    case 'pizza':
      player.invincibleUntil = now + 4000;
      break;
    case 'pill':
      player.fireCooldown = 0;
      break;
    case 'life':
      player.lives += 1;
      break;
  }
}
