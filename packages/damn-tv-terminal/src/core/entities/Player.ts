import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH } from '../../render/types.js';
import { PLAYER_SIZE } from '../../render/sprites.js';
import type { DamnTvActions } from '../../game/actions.js';
import type { Player } from '../types.js';
import { createId } from '../types.js';

const PLAYER_SPEED = 30;
const FIRE_COOLDOWN_MS = 110;

export function createPlayer(lives = 3): Player {
  return {
    id: createId(),
    dead: false,
    x: PLAYFIELD_WIDTH / 2 - PLAYER_SIZE.w / 2,
    y: PLAYFIELD_HEIGHT - PLAYER_SIZE.h - 1,
    w: PLAYER_SIZE.w,
    h: PLAYER_SIZE.h,
    lives,
    invincibleUntil: 0,
    shieldUntil: 0,
    fireCooldown: 0,
  };
}

export function updatePlayer(player: Player, actions: DamnTvActions, dt: number, now: number): void {
  let dx = 0;
  let dy = 0;

  if (actions.moveLeft) dx -= 1;
  if (actions.moveRight) dx += 1;
  if (actions.moveUp) dy -= 1;
  if (actions.moveDown) dy += 1;

  if (dx !== 0 && dy !== 0) {
    const scale = 1 / Math.SQRT2;
    dx *= scale;
    dy *= scale;
  }

  player.x += dx * PLAYER_SPEED * dt;
  player.y += dy * PLAYER_SPEED * dt;

  player.x = Math.max(0, Math.min(PLAYFIELD_WIDTH - player.w, player.x));
  player.y = Math.max(0, Math.min(PLAYFIELD_HEIGHT - player.h, player.y));

  if (player.fireCooldown > 0) {
    player.fireCooldown -= dt * 1000;
  }

  if (actions.fire && player.fireCooldown <= 0) {
    player.fireCooldown = FIRE_COOLDOWN_MS;
    player.lastShot = now;
  }
}

export function playerWantsToShoot(player: Player, now: number): boolean {
  return player.lastShot === now;
}

export function damagePlayer(player: Player, now: number): boolean {
  if (now < player.invincibleUntil || now < player.shieldUntil) {
    return false;
  }

  player.lives -= 1;
  player.invincibleUntil = now + 2000;

  if (player.lives <= 0) {
    player.dead = true;
  }

  return true;
}
