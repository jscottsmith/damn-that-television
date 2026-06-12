import type { FrameBuffer } from './FrameBuffer.js';
import type { Theme } from './types.js';
import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH, PLAYFIELD_X, PLAYFIELD_Y } from './types.js';
import type { World } from '../core/World.js';
import type { Explosion } from '../core/types.js';
import {
  EXPLOSION_SHOCKWAVE_MAX_FRAMES,
  getExplosionShockwaveFrame,
} from '../core/entities/Explosion.js';
import { EXPLOSION_SIZE } from './sprites.js';

const SHOCKWAVE_SPEED = 0.75;
const SHOCKWAVE_RING_WIDTH_START = 2;
const SHOCKWAVE_RING_WIDTH_END = 0.35;

/** ~16 world units per noise cell → smooth blobs ~20–30 cells wide. */
const TERRAIN_SCALE = 1 / 16;

function hash(x: number, y: number): number {
  let n = (x * 374761393 + y * 668265263) >>> 0;
  n = ((n ^ (n >>> 13)) * 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function valueNoise(x: number, y: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = smoothstep(x - x0);
  const ty = smoothstep(y - y0);

  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);

  return lerp(lerp(a, b, tx), lerp(c, d, tx), ty);
}

function terrainNoise(worldX: number, worldY: number): number {
  const base = valueNoise(worldX * TERRAIN_SCALE, worldY * TERRAIN_SCALE);
  const detail = valueNoise(
    worldX * TERRAIN_SCALE * 2.5 + 47,
    worldY * TERRAIN_SCALE * 2.5 + 83,
  );
  const raw = base * 0.82 + detail * 0.18;
  // Stretch typical output into 0…1 so all three terrain tiers appear in large regions.
  return Math.max(0, Math.min(1, (raw - 0.1) / 0.7));
}

export function terrainColorAt(worldX: number, worldY: number, theme: Theme): number {
  const noise = terrainNoise(worldX, worldY);

  // Most cells stay at playfieldBg; only noise extremes shift by one palette step.
  if (noise < 0.22) return theme.terrainLow;
  if (noise > 0.78) return theme.terrainHigh;
  return theme.terrainMid;
}

export function drawTerrain(fb: FrameBuffer, world: World, theme: Theme): void {
  for (let localY = 0; localY < PLAYFIELD_HEIGHT; localY++) {
    const worldY = world.cameraY - localY;

    for (let localX = 0; localX < PLAYFIELD_WIDTH; localX++) {
      const bg = terrainColorAt(localX, worldY, theme);
      fb.set(PLAYFIELD_X + localX, PLAYFIELD_Y + localY, {
        char: ' ',
        fg: bg,
        bg,
      });
    }
  }
}

/** Patch bg only in an expanding ring (fixed color — one step above terrainHigh). */
export function applyCircularBgRing(
  fb: FrameBuffer,
  originX: number,
  originY: number,
  width: number,
  height: number,
  centerX: number,
  centerY: number,
  radius: number,
  ringWidth: number,
  color: number,
  cellAspectRatio: number,
): void {
  const yExtent = (radius + ringWidth) / cellAspectRatio;
  const minX = Math.max(0, Math.floor(centerX - radius - ringWidth));
  const maxX = Math.min(width - 1, Math.ceil(centerX + radius + ringWidth));
  const minY = Math.max(0, Math.floor(centerY - yExtent));
  const maxY = Math.min(height - 1, Math.ceil(centerY + yExtent));

  for (let localY = minY; localY <= maxY; localY++) {
    for (let localX = minX; localX <= maxX; localX++) {
      const dx = localX + 0.5 - centerX;
      const dy = localY + 0.5 - centerY;
      const dist = Math.hypot(dx, dy * cellAspectRatio);

      if (Math.abs(dist - radius) <= ringWidth) {
        fb.setBg(originX + localX, originY + localY, color);
      }
    }
  }
}

function shockwaveRingWidth(explosion: Explosion): number {
  const shockwaveFrame = getExplosionShockwaveFrame(explosion);
  const t = Math.min(1, shockwaveFrame / EXPLOSION_SHOCKWAVE_MAX_FRAMES);
  return lerp(SHOCKWAVE_RING_WIDTH_START, SHOCKWAVE_RING_WIDTH_END, t);
}

export function drawShockwaves(
  fb: FrameBuffer,
  world: World,
  theme: Theme,
  cellAspectRatio: number,
): void {
  for (const explosion of world.explosions) {
    if (explosion.dead) continue;

    const centerX = explosion.x + EXPLOSION_SIZE.w / 2;
    const centerY = explosion.y + EXPLOSION_SIZE.h / 2;
    const radius = getExplosionShockwaveFrame(explosion) * SHOCKWAVE_SPEED;

    applyCircularBgRing(
      fb,
      PLAYFIELD_X,
      PLAYFIELD_Y,
      PLAYFIELD_WIDTH,
      PLAYFIELD_HEIGHT,
      centerX,
      centerY,
      radius,
      shockwaveRingWidth(explosion),
      theme.terrainShock,
      cellAspectRatio,
    );
  }
}
