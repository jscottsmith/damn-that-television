import type { Theme } from './types.js';
import { FrameBuffer } from './FrameBuffer.js';
import {
  HUD_HEIGHT,
  HUD_WIDTH,
  HUD_X,
  HUD_Y,
  PLAYFIELD_HEIGHT,
  PLAYFIELD_WIDTH,
  PLAYFIELD_X,
  PLAYFIELD_Y,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './types.js';
import type { World } from '../core/World.js';
import {
  BULLET_CHAR,
  EXPLOSION_FRAMES,
  PLAYER_SPRITE,
  POWERUP_SPRITES,
  TV_SPRITE,
} from './sprites.js';

function drawPlayfieldBackground(fb: FrameBuffer, world: World, theme: Theme): void {
  fb.fillRect(
    PLAYFIELD_X,
    PLAYFIELD_Y,
    PLAYFIELD_WIDTH,
    PLAYFIELD_HEIGHT,
    ' ',
    theme.playfieldStars,
    theme.playfieldBg,
  );

  for (let y = 0; y < PLAYFIELD_HEIGHT; y++) {
    for (let x = 0; x < PLAYFIELD_WIDTH; x++) {
      const star =
        (Math.floor(x * 13 + y * 7 + world.scrollOffset * 2) % 53) === 0;
      if (star) {
        fb.set(PLAYFIELD_X + x, PLAYFIELD_Y + y, {
          char: '.',
          fg: theme.playfieldStars,
          bg: theme.playfieldBg,
        });
      }
    }
  }

  for (let x = 0; x < PLAYFIELD_WIDTH; x += 8) {
    const lane = Math.floor((x + world.scrollOffset * 4) / 8) % 3;
    const char = lane === 0 ? ':' : lane === 1 ? '|' : ':';
    fb.set(PLAYFIELD_X + x, PLAYFIELD_Y + PLAYFIELD_HEIGHT - 2, {
      char,
      fg: theme.borderAccent,
      bg: theme.playfieldBg,
    });
  }
}

function drawBorder(fb: FrameBuffer, theme: Theme): void {
  fb.fill(' ', theme.border, theme.background);

  for (let x = 0; x < VIEWPORT_WIDTH; x++) {
    fb.set(x, 0, { char: '═', fg: theme.border, bg: theme.background, bold: true });
    fb.set(x, 35, { char: '─', fg: theme.borderAccent, bg: theme.background });
    fb.set(x, VIEWPORT_HEIGHT - 1, {
      char: '═',
      fg: theme.border,
      bg: theme.background,
      bold: true,
    });
  }

  for (let y = 0; y < VIEWPORT_HEIGHT; y++) {
    fb.set(0, y, { char: '║', fg: theme.border, bg: theme.background, bold: true });
    fb.set(1, y, { char: '│', fg: theme.borderAccent, bg: theme.background });
    fb.set(VIEWPORT_WIDTH - 2, y, {
      char: '│',
      fg: theme.borderAccent,
      bg: theme.background,
    });
    fb.set(VIEWPORT_WIDTH - 1, y, {
      char: '║',
      fg: theme.border,
      bg: theme.background,
      bold: true,
    });
  }

  fb.drawText(3, 0, ' DAMN TV ', theme.borderAccent, theme.background, true);
  fb.drawText(VIEWPORT_WIDTH - 12, 0, ' TERMINAL ', theme.borderAccent, theme.background, true);
}

function drawEntities(fb: FrameBuffer, world: World, theme: Theme, now: number): void {
  for (const enemy of world.enemies) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(enemy.x),
      PLAYFIELD_Y + Math.floor(enemy.y),
      TV_SPRITE,
      theme.enemy,
      theme.playfieldBg,
    );
  }

  for (const projectile of world.projectiles) {
    fb.set(PLAYFIELD_X + Math.floor(projectile.x), PLAYFIELD_Y + Math.floor(projectile.y), {
      char: BULLET_CHAR,
      fg: theme.playerBullet,
      bg: theme.playfieldBg,
      bold: true,
    });
  }

  for (const powerUp of world.powerUps) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(powerUp.x),
      PLAYFIELD_Y + Math.floor(powerUp.y),
      POWERUP_SPRITES[powerUp.type],
      theme.powerUp,
      theme.playfieldBg,
    );
  }

  for (const explosion of world.explosions) {
    const frame = EXPLOSION_FRAMES[Math.min(
      Math.floor(explosion.frame),
      EXPLOSION_FRAMES.length - 1,
    )]!;
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(explosion.x),
      PLAYFIELD_Y + Math.floor(explosion.y),
      frame,
      theme.explosion,
      theme.playfieldBg,
    );
  }

  const blink = now < world.player.invincibleUntil && Math.floor(now / 150) % 2 === 0;
  const hasShield = now < world.player.shieldUntil;

  if (!blink) {
    fb.drawSprite(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y),
      PLAYER_SPRITE,
      hasShield ? theme.hudAccent : theme.player,
      theme.playfieldBg,
    );
  }

  if (hasShield) {
    fb.drawText(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y) - 1,
      'SHIELD',
      theme.hudAccent,
      theme.playfieldBg,
      true,
    );
  }
}

function drawHud(fb: FrameBuffer, world: World, theme: Theme): void {
  fb.fillRect(HUD_X, HUD_Y, HUD_WIDTH, HUD_HEIGHT, ' ', theme.hudText, theme.hudBg);

  const config = world.levelConfig;
  const lives = '♥'.repeat(Math.max(0, world.player.lives));
  const line1 = ` SCORE ${String(world.stats.score).padStart(8, '0')}   KILLS ${String(world.stats.kills).padStart(4, '0')}/${config.killsToAdvance === Infinity ? '∞' : config.killsToAdvance}   LEVEL ${config.level} `;
  const line2 = ` LIVES ${lives.padEnd(8, '·')}   HI ${String(world.stats.highScore).padStart(8, '0')}   ARROWS MOVE · SPACE SHOOT · P PAUSE `;

  fb.drawText(HUD_X, HUD_Y, line1, theme.hudAccent, theme.hudBg, true);
  fb.drawText(HUD_X, HUD_Y + 1, line2, theme.hudText, theme.hudBg);

  const status =
    world.phase === 'paused'
      ? 'PAUSED'
      : world.phase === 'levelcomplete'
        ? 'LEVEL COMPLETE!'
        : world.player.dead
          ? ''
          : 'KILL THE TVs! *';

  fb.drawText(HUD_X, HUD_Y + 2, status.padEnd(HUD_WIDTH - 2, ' '), theme.hudAccent, theme.hudBg, true);
}

function drawMenu(fb: FrameBuffer, theme: Theme): void {
  fb.drawTextCentered(10, 'DAMN TV!', theme.title, theme.background, true);
  fb.drawTextCentered(12, '(the Terminal Game)', theme.subtitle, theme.background);
  fb.drawTextCentered(16, 'Kill the TVs to survive.', theme.subtitle, theme.background);
  fb.drawTextCentered(18, '* You still cannot win a game with no end.', theme.borderAccent, theme.background);
  fb.drawTextCentered(22, '← → MOVE    SPACE SHOOT', theme.hudText, theme.background);
  fb.drawTextCentered(24, 'PRESS ENTER TO START', theme.title, theme.background, true);
}

function drawGameOver(fb: FrameBuffer, world: World, theme: Theme): void {
  fb.drawTextCentered(14, 'GAME OVER', theme.danger, theme.background, true);
  fb.drawTextCentered(16, `SCORE: ${world.stats.score}`, theme.subtitle, theme.background);
  fb.drawTextCentered(18, `HIGH SCORE: ${world.stats.highScore}`, theme.title, theme.background);
  fb.drawTextCentered(22, 'PRESS ENTER TO RETRY', theme.title, theme.background, true);
}

function drawPaused(fb: FrameBuffer, theme: Theme): void {
  fb.drawTextCentered(16, 'PAUSED', theme.title, theme.playfieldBg, true);
  fb.drawTextCentered(18, 'PRESS P TO RESUME', theme.subtitle, theme.playfieldBg);
}

export function renderWorld(fb: FrameBuffer, world: World, theme: Theme, now: number): void {
  drawBorder(fb, theme);
  drawPlayfieldBackground(fb, world, theme);

  if (world.phase === 'menu') {
    drawMenu(fb, theme);
    return;
  }

  drawEntities(fb, world, theme, now);
  drawHud(fb, world, theme);

  if (world.phase === 'paused') drawPaused(fb, theme);
  if (world.phase === 'gameover') drawGameOver(fb, world, theme);
  if (world.phase === 'levelcomplete') {
    fb.drawTextCentered(
      PLAYFIELD_Y + 14,
      `LEVEL ${world.levelConfig.level} COMPLETE! +${world.levelConfig.winBonus}`,
      theme.title,
      theme.playfieldBg,
      true,
    );
  }
}

export function createViewportBuffer(): FrameBuffer {
  return new FrameBuffer(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}
