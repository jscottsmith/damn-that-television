import type { Player, Projectile } from '../types.js';
import { createId } from '../types.js';

export function createProjectile(player: Player): Projectile {
  return {
    id: createId(),
    dead: false,
    x: player.x + player.w / 2 - 0.5,
    y: player.y - 1,
    w: 1,
    h: 1,
    vy: -18,
  };
}

export function updateProjectile(projectile: Projectile, dt: number): void {
  projectile.y += projectile.vy * dt;
}
