import type { Explosion } from '../types.js';
import { createId } from '../types.js';

/** ~2s lifetime at 60fps (frame += dt * 12). Sprite uses first 3 visual frames. */
export const EXPLOSION_MAX_FRAMES = 24;

export function createExplosion(x: number, y: number): Explosion {
  return {
    id: createId(),
    dead: false,
    x,
    y,
    frame: 0,
    maxFrames: EXPLOSION_MAX_FRAMES,
  };
}

export function updateExplosion(explosion: Explosion, dt: number): void {
  explosion.frame += dt * 12;
  if (explosion.frame >= explosion.maxFrames) {
    explosion.dead = true;
  }
}
