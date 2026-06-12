import { DEFAULT_CELL_ASPECT_RATIO } from './types.js';
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
import { drawShockwaves, drawTerrain } from './terrain.js';
import {
  BULLET_CHAR,
  EXPLOSION_FRAMES,
  PLAYER_SPRITE,
  POWERUP_SPRITES,
  ENEMY_SPRITES,
} from './sprites.js';
import {
  centerDialogInRect,
  drawDialogWindow,
  measureDialogWindow,
  type DialogMenuItem,
  type DialogWindowContent,
} from './dialogWindow.js';
import {
  getThemeMenuItem,
  getThemeMenuItemCount,
  MAIN_MENU_ITEMS,
  QUIT_CONFIRM_ITEMS,
} from '../core/menu.js';

const MENU_FOOTER = '↑↓ SELECT   ENTER';
const PLAYFIELD_BOUNDS = {
  x: PLAYFIELD_X,
  y: PLAYFIELD_Y,
  w: PLAYFIELD_WIDTH,
  h: PLAYFIELD_HEIGHT,
};

function drawDialogOverlay(
  fb: FrameBuffer,
  theme: Theme,
  content: DialogWindowContent,
): void {
  const size = measureDialogWindow(content);
  const rect = centerDialogInRect(PLAYFIELD_BOUNDS, size);
  drawDialogWindow(fb, rect, theme, content);
}

function drawMainMenu(fb: FrameBuffer, world: World, theme: Theme): void {
  const menuItems: DialogMenuItem[] = MAIN_MENU_ITEMS.map((label, index) => ({
    label,
    selected: index === world.menuIndex,
  }));

  drawDialogOverlay(fb, theme, {
    title: 'DAMN TV',
    bodyLines: [
      '(the Terminal Game)',
      'Reach the finish line to survive.',
      'Clear both levels to win the game.',
    ],
    menuItems,
    footer: MENU_FOOTER,
  });
}

function drawThemeMenu(fb: FrameBuffer, world: World, theme: Theme): void {
  const count = getThemeMenuItemCount();
  const menuItems: DialogMenuItem[] = Array.from({ length: count }, (_, index) => ({
    label: getThemeMenuItem(index, world.themeName),
    selected: index === world.menuIndex,
  }));

  drawDialogOverlay(fb, theme, {
    title: 'THEME',
    menuItems,
    footer: MENU_FOOTER,
  });
}

function drawMenu(fb: FrameBuffer, world: World, theme: Theme): void {
  if (world.menuScreen === 'theme') {
    drawThemeMenu(fb, world, theme);
  } else {
    drawMainMenu(fb, world, theme);
  }
}

function drawGameOver(fb: FrameBuffer, world: World, theme: Theme): void {
  drawDialogOverlay(fb, theme, {
    title: 'GAME OVER',
    bodyLines: [
      `SCORE: ${world.stats.score}`,
      `HIGH SCORE: ${world.stats.highScore}`,
    ],
    footer: 'ENTER TO RETRY   ESC/Q TO QUIT',
  });
}

function drawGameComplete(fb: FrameBuffer, world: World, theme: Theme): void {
  drawDialogOverlay(fb, theme, {
    title: 'GAME COMPLETE',
    bodyLines: [
      'You cleared every level.',
      `FINAL SCORE: ${world.stats.score}`,
      `HIGH SCORE: ${world.stats.highScore}`,
    ],
    footer: 'ENTER TO CONTINUE   ESC/Q TO QUIT',
  });
}

function drawLevelComplete(fb: FrameBuffer, world: World, theme: Theme): void {
  const config = world.levelConfig;
  drawDialogOverlay(fb, theme, {
    title: `LEVEL ${config.level} COMPLETE`,
    bodyLines: [`+${config.winBonus} POINTS`],
    footer: 'ENTER TO CONTINUE   ESC/Q TO QUIT',
  });
}

function drawPaused(fb: FrameBuffer, theme: Theme): void {
  drawDialogOverlay(fb, theme, {
    title: 'PAUSED',
    footer: 'P OR ENTER TO RESUME   ESC/Q TO QUIT',
  });
}

function drawQuitConfirm(fb: FrameBuffer, world: World, theme: Theme): void {
  const menuItems: DialogMenuItem[] = QUIT_CONFIRM_ITEMS.map((label, index) => ({
    label,
    selected: index === world.quitConfirmIndex,
    accent: index === 0,
  }));

  drawDialogOverlay(fb, theme, {
    title: 'QUIT TO MENU?',
    bodyLines: ['Your progress will be lost.'],
    menuItems,
    footer: '↑↓ SELECT   ENTER   ESC TO CANCEL',
  });
}

function drawPhaseOverlay(
  fb: FrameBuffer,
  world: World,
  theme: Theme,
): void {
  switch (world.phaseBeforeQuit) {
    case 'paused':
      drawPaused(fb, theme);
      break;
    case 'gameover':
      drawGameOver(fb, world, theme);
      break;
    case 'levelcomplete':
      drawLevelComplete(fb, world, theme);
      break;
    case 'gamecomplete':
      drawGameComplete(fb, world, theme);
      break;
    default:
      break;
  }
}

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

    fb.setFg(PLAYFIELD_X + cell.x, PLAYFIELD_Y + Math.floor(screenY), {
      char: '=',
      fg: theme.borderAccent,
      bold: true,
    });
  }
}

function drawEntities(fb: FrameBuffer, world: World, theme: Theme, now: number): void {
  drawFinishMarkers(fb, world, theme);

  for (const enemy of world.enemies) {
    const screenY = worldToScreenY(enemy.y, world.cameraY);
    if (screenY + enemy.h < 0 || screenY > PLAYFIELD_HEIGHT) continue;

    fb.drawSpriteFg(
      PLAYFIELD_X + Math.floor(enemy.x),
      PLAYFIELD_Y + Math.floor(screenY),
      ENEMY_SPRITES[enemy.movementType],
      getEnemyThemeColor(theme, enemy.movementType),
    );
  }

  for (const projectile of world.projectiles) {
    fb.setFg(PLAYFIELD_X + Math.floor(projectile.x), PLAYFIELD_Y + Math.floor(projectile.y), {
      char: BULLET_CHAR,
      fg: theme.playerBullet,
      bold: true,
    });
  }

  for (const powerUp of world.powerUps) {
    const screenY = worldToScreenY(powerUp.y, world.cameraY);
    if (screenY + powerUp.h < 0 || screenY > PLAYFIELD_HEIGHT) continue;

    fb.drawSpriteFg(
      PLAYFIELD_X + Math.floor(powerUp.x),
      PLAYFIELD_Y + Math.floor(screenY),
      POWERUP_SPRITES[powerUp.type],
      theme.powerUp,
    );
  }

  for (const explosion of world.explosions) {
    const frame = EXPLOSION_FRAMES[Math.min(
      Math.floor(explosion.frame),
      EXPLOSION_FRAMES.length - 1,
    )]!;
    fb.drawSpriteFg(
      PLAYFIELD_X + Math.floor(explosion.x),
      PLAYFIELD_Y + Math.floor(explosion.y),
      frame,
      theme.explosion,
    );
  }

  const blink = now < world.player.invincibleUntil && Math.floor(now / 150) % 2 === 0;
  const hasShield = now < world.player.shieldUntil;

  if (!blink) {
    fb.drawSpriteFg(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y),
      PLAYER_SPRITE,
      hasShield ? theme.hudAccent : theme.player,
    );
  }

  if (hasShield) {
    fb.drawTextFg(
      PLAYFIELD_X + Math.floor(world.player.x),
      PLAYFIELD_Y + Math.floor(world.player.y) - 1,
      'SHIELD',
      theme.hudAccent,
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
    world.phase === 'playing' && !world.player.dead
      ? 'REACH THE FINISH LINE!'
      : '';

  fb.drawText(HUD_X, HUD_Y + 2, status.padEnd(HUD_WIDTH - 2, ' '), theme.hudAccent, theme.hudBg, true);
}

function drawPlayfield(fb: FrameBuffer, world: World, theme: Theme, cellAspectRatio: number): void {
  drawTerrain(fb, world, theme);
  drawShockwaves(fb, world, theme, cellAspectRatio);
}

export function renderWorld(
  fb: FrameBuffer,
  world: World,
  theme: Theme,
  now: number,
  cellAspectRatio = DEFAULT_CELL_ASPECT_RATIO,
): void {
  drawBorder(fb, theme);

  if (world.phase === 'menu') {
    drawPlayfieldBackground(fb, theme);
    drawMenu(fb, world, theme);
    return;
  }

  drawPlayfield(fb, world, theme, cellAspectRatio);

  if (world.phase === 'quitconfirm') {
    drawEntities(fb, world, theme, now);
    drawHud(fb, world, theme);
    drawPhaseOverlay(fb, world, theme);
    drawQuitConfirm(fb, world, theme);
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
  if (world.phase === 'levelcomplete') drawLevelComplete(fb, world, theme);
}

export function createViewportBuffer(): FrameBuffer {
  return new FrameBuffer(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}
