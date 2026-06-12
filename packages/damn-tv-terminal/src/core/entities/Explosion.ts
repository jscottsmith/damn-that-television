import type { Explosion } from '../types.js';
import { createId } from '../types.js';
import { EXPLOSION_FRAMES } from '../../render/sprites.js';

export const EXPLOSION_FRAME_RATE = 12;

/** Virtual frame count for shockwave expansion (sprite ends sooner). */
export const EXPLOSION_SHOCKWAVE_MAX_FRAMES = 24;

export function getExplosionShockwaveFrame(explosion: Explosion): number {
  if (explosion.maxFrames <= 0) return 0;
  return explosion.frame * (EXPLOSION_SHOCKWAVE_MAX_FRAMES / explosion.maxFrames);
}

export function createExplosion(x: number, y: number): Explosion {
  return {
    id: createId(),
    dead: false,
    x,
    y,
    frame: 0,
    maxFrames: EXPLOSION_FRAMES.length,
  };
}

export function updateExplosion(explosion: Explosion, dt: number): void {
  explosion.frame += dt * EXPLOSION_FRAME_RATE;
  if (explosion.frame >= explosion.maxFrames) {
    explosion.dead = true;
  }
}
