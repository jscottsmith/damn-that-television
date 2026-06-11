import type { Explosion } from '../types.js';
import { createId } from '../types.js';

export function createExplosion(x: number, y: number): Explosion {
  return {
    id: createId(),
    dead: false,
    x,
    y,
    frame: 0,
    maxFrames: 3,
  };
}

export function updateExplosion(explosion: Explosion, dt: number): void {
  explosion.frame += dt * 12;
  if (explosion.frame >= explosion.maxFrames) {
    explosion.dead = true;
  }
}
