import { worldRectToScreen, worldToScreenY } from './coordinates.js';
import type { LevelRuntimeConfig } from './config/levels.js';
import { createEnemy, updateEnemy } from './entities/Enemy.js';
import { createExplosion, updateExplosion } from './entities/Explosion.js';
import {
  applyPowerUp,
  createPowerUp,
  randomPowerUpType,
} from './entities/PowerUp.js';
import { createPlayer, damagePlayer, playerWantsToShoot, updatePlayer } from './entities/Player.js';
import { createProjectile, updateProjectile } from './entities/Projectile.js';
import type {
  Enemy,
  Explosion,
  GamePhase,
  GameStats,
  Player,
  PowerUp,
  Projectile,
  Rect,
} from './types.js';
import type { DamnTvActions } from '../game/actions.js';
import { getLevelByIndex, LEVEL_COUNT } from '../levels/levelCatalog.js';
import type { ParsedLevel } from '../levels/parseLevelTemplate.js';
import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH } from '../render/types.js';
import { rectsOverlap, resetIds } from './types.js';
import { THEME_NAMES } from './config/themes.js';
import type { MenuScreen } from './menu.js';
import {
  getThemeMenuItemCount,
  isThemeMenuBack,
  MAIN_MENU_ITEMS,
  QUIT_CONFIRM_ITEMS,
  stepMenuIndex,
} from './menu.js';

export class World {
  phase: GamePhase = 'menu';
  phaseBeforeQuit: GamePhase | null = null;
  menuScreen: MenuScreen = 'main';
  menuIndex = 0;
  quitConfirmIndex = 1;
  themeName = 'club';
  player: Player = createPlayer();
  projectiles: Projectile[] = [];
  enemies: Enemy[] = [];
  powerUps: PowerUp[] = [];
  explosions: Explosion[] = [];
  stats: GameStats = { score: 0, kills: 0, levelIndex: 0, highScore: 0 };
  cameraY = 0;
  parsedLevel: ParsedLevel | null = null;
  finishCells: { x: number; y: number }[] = [];
  frameTime = 0;
  levelCompleteTimer = 0;

  get levelConfig(): LevelRuntimeConfig {
    const level = this.parsedLevel ?? getLevelByIndex(0);
    return {
      level: this.stats.levelIndex + 1,
      scrollSpeed: level.scrollSpeed,
      winBonus: level.winBonus,
      height: level.height,
    };
  }

  get levelProgress(): number {
    const height = this.levelConfig.height;
    if (height <= 0) return 0;
    return Math.min(1, this.cameraY / height);
  }

  reset(): void {
    resetIds();
    this.stats.score = 0;
    this.stats.kills = 0;
    this.stats.levelIndex = 0;
    this.cameraY = 0;
    this.levelCompleteTimer = 0;
    this.loadLevel(0, { preservePlayer: false, preserveScore: false });
    this.phase = 'playing';
  }

  startGame(): void {
    this.reset();
  }

  returnToMainMenu(): void {
    this.menuScreen = 'main';
    this.menuIndex = 0;
    this.phaseBeforeQuit = null;
    this.quitConfirmIndex = 1;
    this.phase = 'menu';
  }

  private openQuitConfirm(): void {
    this.phaseBeforeQuit = this.phase;
    this.quitConfirmIndex = 1;
    this.phase = 'quitconfirm';
  }

  private cancelQuitConfirm(): void {
    const previous = this.phaseBeforeQuit;
    this.phaseBeforeQuit = null;
    if (previous) {
      this.phase = previous;
    }
  }

  private updateQuitConfirm(actions: DamnTvActions): void {
    const itemCount = QUIT_CONFIRM_ITEMS.length;

    if (actions.menuUp) {
      this.quitConfirmIndex = stepMenuIndex(this.quitConfirmIndex, -1, itemCount);
    }
    if (actions.menuDown) {
      this.quitConfirmIndex = stepMenuIndex(this.quitConfirmIndex, 1, itemCount);
    }

    if (actions.backToMenu) {
      this.cancelQuitConfirm();
      return;
    }

    if (!actions.confirm) return;

    if (this.quitConfirmIndex === 0) {
      this.returnToMainMenu();
    } else {
      this.cancelQuitConfirm();
    }
  }

  private updateMenu(actions: DamnTvActions): void {
    if (actions.backToMenu && this.menuScreen === 'theme') {
      this.menuScreen = 'main';
      this.menuIndex = 0;
      return;
    }

    const itemCount =
      this.menuScreen === 'main' ? MAIN_MENU_ITEMS.length : getThemeMenuItemCount();

    if (actions.menuUp) {
      this.menuIndex = stepMenuIndex(this.menuIndex, -1, itemCount);
    }
    if (actions.menuDown) {
      this.menuIndex = stepMenuIndex(this.menuIndex, 1, itemCount);
    }

    if (!actions.confirm) return;

    if (this.menuScreen === 'main') {
      if (this.menuIndex === 0) {
        this.startGame();
      } else {
        this.menuScreen = 'theme';
        const themeIndex = THEME_NAMES.indexOf(this.themeName as (typeof THEME_NAMES)[number]);
        this.menuIndex = themeIndex >= 0 ? themeIndex : 0;
      }
      return;
    }

    if (isThemeMenuBack(this.menuIndex)) {
      this.menuScreen = 'main';
      this.menuIndex = 0;
      return;
    }

    this.themeName = THEME_NAMES[this.menuIndex]!;
  }

  loadLevel(
    index: number,
    options: { preservePlayer?: boolean; preserveScore?: boolean } = {},
  ): void {
    const { preservePlayer = false, preserveScore = false } = options;
    const parsed = getLevelByIndex(index);
    const lives = preservePlayer ? this.player.lives : 3;

    this.parsedLevel = parsed;
    this.finishCells = parsed.finishCells;
    this.stats.levelIndex = index;
    this.cameraY = 0;
    this.levelCompleteTimer = 0;

    if (!preserveScore) {
      this.stats.score = 0;
      this.stats.kills = 0;
    }

    this.player = createPlayer(lives);
    this.projectiles = [];
    this.explosions = [];
    this.enemies = parsed.enemies.map((spawn) =>
      createEnemy(spawn.x, spawn.y, spawn.type),
    );
    this.powerUps = parsed.powerUps.map((spawn) =>
      createPowerUp(spawn.x, spawn.y, spawn.type),
    );
  }

  update(actions: DamnTvActions, dt: number, now: number): void {
    this.frameTime = now;

    if (this.phase === 'menu') {
      this.updateMenu(actions);
      return;
    }

    if (this.phase === 'quitconfirm') {
      this.updateQuitConfirm(actions);
      return;
    }

    if (actions.backToMenu) {
      this.openQuitConfirm();
      return;
    }

    if (this.phase === 'gameover') {
      if (actions.confirm) this.startGame();
      return;
    }

    if (this.phase === 'gamecomplete') {
      if (actions.confirm) {
        this.stats.highScore = Math.max(this.stats.highScore, this.stats.score);
        this.returnToMainMenu();
      }
      return;
    }

    if (this.phase === 'levelcomplete') {
      this.levelCompleteTimer -= dt * 1000;
      if (this.levelCompleteTimer <= 0 || actions.confirm) {
        const nextIndex = this.stats.levelIndex + 1;
        if (nextIndex >= LEVEL_COUNT) {
          this.stats.highScore = Math.max(this.stats.highScore, this.stats.score);
          this.phase = 'gamecomplete';
        } else {
          this.loadLevel(nextIndex, { preservePlayer: true, preserveScore: true });
          this.phase = 'playing';
        }
      }
      return;
    }

    if (this.phase === 'paused') {
      if (actions.pause || actions.confirm) this.phase = 'playing';
      return;
    }

    if (actions.pause) {
      this.phase = 'paused';
      return;
    }

    const config = this.levelConfig;
    this.cameraY += config.scrollSpeed * dt;

    updatePlayer(this.player, actions, dt, now);

    if (playerWantsToShoot(this.player, now)) {
      this.projectiles.push(createProjectile(this.player));
    }

    for (const enemy of this.enemies) {
      updateEnemy(enemy, dt, this.player.x, PLAYFIELD_WIDTH);
    }

    for (const projectile of this.projectiles) {
      updateProjectile(projectile, dt);
    }

    for (const explosion of this.explosions) {
      updateExplosion(explosion, dt);
    }

    this.handleCollisions(now);
    this.cleanup();

    if (this.player.dead) {
      this.phase = 'gameover';
      this.stats.highScore = Math.max(this.stats.highScore, this.stats.score);
    } else if (this.checkFinishCrossing()) {
      this.stats.score += config.winBonus;
      this.phase = 'levelcomplete';
      this.levelCompleteTimer = 3000;
    }
  }

  private checkFinishCrossing(): boolean {
    for (const cell of this.finishCells) {
      const screenY = worldToScreenY(cell.y, this.cameraY);
      if (screenY < -1 || screenY > PLAYFIELD_HEIGHT) continue;

      const finishRect: Rect = { x: cell.x, y: screenY, w: 1, h: 1 };
      if (rectsOverlap(this.player, finishRect)) {
        return true;
      }
    }
    return false;
  }

  private handleCollisions(now: number): void {
    for (const projectile of this.projectiles) {
      if (projectile.dead) continue;

      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        const screenEnemy = worldRectToScreen(enemy, this.cameraY);
        if (rectsOverlap(projectile, screenEnemy)) {
          projectile.dead = true;
          enemy.hp -= 1;
          if (enemy.hp <= 0) {
            enemy.dead = true;
            this.stats.kills += 1;
            this.stats.score += 100;
            this.explosions.push(createExplosion(enemy.x, screenEnemy.y));
            if (Math.random() < 0.12) {
              this.powerUps.push(
                createPowerUp(enemy.x, enemy.y, randomPowerUpType()),
              );
            }
          }
          break;
        }
      }
    }

    for (const powerUp of this.powerUps) {
      if (powerUp.dead || this.player.dead) continue;
      const screenPowerUp = worldRectToScreen(powerUp, this.cameraY);
      if (rectsOverlap(screenPowerUp, this.player)) {
        powerUp.dead = true;
        applyPowerUp(powerUp.type, this.player, now);
        this.stats.score += 50;
      }
    }

    if (now >= this.player.invincibleUntil) {
      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        const screenEnemy = worldRectToScreen(enemy, this.cameraY);
        if (rectsOverlap(screenEnemy, this.player)) {
          if (damagePlayer(this.player, now)) {
            this.explosions.push(createExplosion(this.player.x, this.player.y));
          }
          enemy.dead = true;
          this.explosions.push(createExplosion(enemy.x, screenEnemy.y));
        }
      }
    }
  }

  private cleanup(): void {
    const margin = 4;

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.dead && projectile.y + projectile.h >= 0,
    );

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.dead) return false;
      const screenY = worldToScreenY(enemy.y, this.cameraY);
      // Keep upcoming (above viewport) and on-screen; cull only after scrolling past bottom.
      return screenY <= PLAYFIELD_HEIGHT + margin;
    });

    this.powerUps = this.powerUps.filter((powerUp) => {
      if (powerUp.dead) return false;
      const screenY = worldToScreenY(powerUp.y, this.cameraY);
      return screenY <= PLAYFIELD_HEIGHT + margin;
    });

    this.explosions = this.explosions.filter((explosion) => !explosion.dead);
  }
}
