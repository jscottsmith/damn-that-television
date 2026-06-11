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
import { worldToScreenY } from '../core/coordinates.js';
import { getEnemyThemeColor } from '../core/config/enemies.js';
import {
  BULLET_CHAR,
  EXPLOSION_FRAMES,
  PLAYER_SPRITE,
  POWERUP_SPRITES,
  ENEMY_SPRITES,
} from './sprites.js';

function drawPlayfieldBackground(fb: FrameBuffer, theme: Theme): void {
  fb.fillRect(
    PLAYFIELD_X,
    PLAYFIELD_Y,
    PLAYFIELD_WIDTH,
    PLAYFIELD_HEIGHT,
    ' ',
    theme.playfieldStars,
    theme.playfieldBg,
  );
}

function drawBorder(fb: FrameBuffer, theme: Theme): void {
  const { border, borderAccent, background: bg } = theme;
  const lastX = VIEWPORT_WIDTH - 1;
  const lastY = VIEWPORT_HEIGHT - 1;
  const hudY = 35;

  fb.fill(' ', border, bg);

  for (let x = 0; x < VIEWPORT_WIDTH; x++) {
    const corner = x === 0 || x === lastX;

    fb.set(x, 0, { char: corner ? '█' : '▀', fg: border, bg, bold: true });
    fb.set(x, hudY, { char: '▂', fg: border, bg });
    fb.set(x, lastY, { char: corner ? '█' : '▄', fg: border, bg, bold: true });
  }

  for (let y = 1; y < lastY; y++) {
    if (y === hudY) continue;
    fb.set(0, y, { char: '▌', fg: border, bg, bold: true });
    fb.set(lastX, y, { char: '▐', fg: border, bg, bold: true });
  }

  fb.drawText(3, 0, ' DAMN TV ', borderAccent, bg, true);
  fb.drawText(VIEWPORT_WIDTH - 12, 0, ' TERMINAL ', borderAccent, bg, true);
}

function drawFinishMarkers(fb: FrameBuffer, world: World, theme: Theme): void {
  for (const cell of world.finishCells) {
    const screenY = worldToScreenY(cell.y, world.cameraY);
    if (screenY < 0 || screenY >= PLAYFIELD_HEIGHT) continue;

    fb.set(PLAYFIELD_X + cell.x, PLAYFIELD_Y + Math.floor(screenY), {
      char: '=',
      fg: theme.borderAccent,
      bg: theme.playfieldBg,
      bold: true,
    });
  }
}

function drawEntities(fb: FrameBuffer, world: World, theme: Theme, now: number): void {
  drawFinishMarkers(fb, world, theme);

  for (const enemy of world.enemies) {
    const screenY = worldToScreenY(enemy.y, world.cameraY);
    if (screenY + enemy.h < 0 || screenY > PLAYFIELD_HEIGHT) continue;

    fb.drawSprite(
      PLAYFIELD_X + Math.floor(enemy.x),
      PLAYFIELD_Y + Math.floor(screenY),
      ENEMY_SPRITES[enemy.movementType],
      getEnemyThemeColor(theme, enemy.movementType),
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
    const screenY = worldToScreenY(powerUp.y, world.cameraY);
    if (screenY + powerUp.h < 0 || screenY > PLAYFIELD_HEIGHT) continue;

    fb.drawSprite(
      PLAYFIELD_X + Math.floor(powerUp.x),
      PLAYFIELD_Y + Math.floor(screenY),
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
  const progress = String(Math.round(world.levelProgress * 100)).padStart(3, '0');
  const line1 = ` SCORE ${String(world.stats.score).padStart(8, '0')}   KILLS ${String(world.stats.kills).padStart(4, '0')}   LEVEL ${config.level}   ${progress}% `;
  const line2 = ` LIVES ${lives.padEnd(8, '·')}   HI ${String(world.stats.highScore).padStart(8, '0')}   ARROWS MOVE · SPACE SHOOT · P PAUSE `;

  fb.drawText(HUD_X, HUD_Y, line1, theme.hudAccent, theme.hudBg, true);
  fb.drawText(HUD_X, HUD_Y + 1, line2, theme.hudText, theme.hudBg);

  const status =
    world.phase === 'paused'
      ? 'PAUSED'
      : world.phase === 'levelcomplete'
        ? 'LEVEL COMPLETE!'
        : world.phase === 'gamecomplete'
          ? 'YOU WIN!'
          : world.player.dead
            ? ''
            : 'REACH THE FINISH LINE!';

  fb.drawText(HUD_X, HUD_Y + 2, status.padEnd(HUD_WIDTH - 2, ' '), theme.hudAccent, theme.hudBg, true);
}

function drawMenu(fb: FrameBuffer, theme: Theme): void {
  fb.drawTextCentered(10, 'DAMN TV!', theme.title, theme.background, true);
  fb.drawTextCentered(12, '(the Terminal Game)', theme.subtitle, theme.background);
  fb.drawTextCentered(16, 'Reach the finish line to survive.', theme.subtitle, theme.background);
  fb.drawTextCentered(18, 'Clear both levels to win the game.', theme.borderAccent, theme.background);
  fb.drawTextCentered(22, '↑ ↓ ← → MOVE    SPACE SHOOT', theme.hudText, theme.background);
  fb.drawTextCentered(24, 'PRESS ENTER TO START', theme.title, theme.background, true);
}

function drawGameOver(fb: FrameBuffer, world: World, theme: Theme): void {
  fb.drawTextCentered(14, 'GAME OVER', theme.danger, theme.background, true);
  fb.drawTextCentered(16, `SCORE: ${world.stats.score}`, theme.subtitle, theme.background);
  fb.drawTextCentered(18, `HIGH SCORE: ${world.stats.highScore}`, theme.title, theme.background);
  fb.drawTextCentered(22, 'PRESS ENTER TO RETRY', theme.title, theme.background, true);
}

function drawGameComplete(fb: FrameBuffer, world: World, theme: Theme): void {
  fb.drawTextCentered(12, 'GAME COMPLETE!', theme.title, theme.background, true);
  fb.drawTextCentered(14, 'You cleared every level.', theme.subtitle, theme.background);
  fb.drawTextCentered(16, `FINAL SCORE: ${world.stats.score}`, theme.subtitle, theme.background);
  fb.drawTextCentered(18, `HIGH SCORE: ${world.stats.highScore}`, theme.title, theme.background);
  fb.drawTextCentered(22, 'PRESS ENTER TO CONTINUE', theme.title, theme.background, true);
}

function drawPaused(fb: FrameBuffer, theme: Theme): void {
  fb.drawTextCentered(16, 'PAUSED', theme.title, theme.playfieldBg, true);
  fb.drawTextCentered(18, 'PRESS P TO RESUME', theme.subtitle, theme.playfieldBg);
}

export function renderWorld(fb: FrameBuffer, world: World, theme: Theme, now: number): void {
  drawBorder(fb, theme);
  drawPlayfieldBackground(fb, theme);

  if (world.phase === 'menu') {
    drawMenu(fb, theme);
    return;
  }

  if (world.phase === 'gamecomplete') {
    drawEntities(fb, world, theme, now);
    drawHud(fb, world, theme);
    drawGameComplete(fb, world, theme);
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
