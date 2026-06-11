import type { EnemyMovementType } from '../config/levels.js';
import { getEnemySize } from '../../render/sprites.js';
import type { Enemy } from '../types.js';
import { createId } from '../types.js';

export function createEnemy(
  x: number,
  y: number,
  movementType: EnemyMovementType,
): Enemy {
  const size = getEnemySize(movementType);
  return {
    id: createId(),
    dead: false,
    x,
    y,
    w: size.w,
    h: size.h,
    vx: 0,
    vy: 0,
    movementType,
    sinePhase: Math.random() * Math.PI * 2,
    hp: 1,
  };
}

export function updateEnemy(
  enemy: Enemy,
  dt: number,
  playerX: number,
  playfieldWidth: number,
): void {
  switch (enemy.movementType) {
    case 'DUNCE':
      break;
    case 'FOLLOWER': {
      const dx = playerX - enemy.x;
      enemy.x += Math.sign(dx) * Math.min(Math.abs(dx), 14 * dt);
      break;
    }
    case 'SNEK': {
      enemy.sinePhase += dt * 4;
      enemy.x += Math.sin(enemy.sinePhase) * 18 * dt;
      break;
    }
  }

  enemy.x = Math.max(0, Math.min(playfieldWidth - enemy.w, enemy.x));
}
