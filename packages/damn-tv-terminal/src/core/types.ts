export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Entity {
  id: number;
  dead: boolean;
}

export interface Player extends Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  lives: number;
  invincibleUntil: number;
  shieldUntil: number;
  fireCooldown: number;
  lastShot?: number;
}

export interface Projectile extends Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  vy: number;
}

export interface Enemy extends Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  movementType: import('./config/levels.js').EnemyMovementType;
  sinePhase: number;
  hp: number;
}

export interface PowerUp extends Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  type: import('../render/sprites.js').PowerUpType;
  vy: number;
}

export interface Explosion extends Entity {
  x: number;
  y: number;
  frame: number;
  maxFrames: number;
}

export type GamePhase = 'menu' | 'playing' | 'paused' | 'gameover' | 'levelcomplete';

export interface GameStats {
  score: number;
  kills: number;
  levelIndex: number;
  highScore: number;
}

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

let nextId = 1;

export function createId(): number {
  return nextId++;
}

export function resetIds(): void {
  nextId = 1;
}
