import {
  EnemyMovementTypes,
  getLevelConfig,
  type EnemyMovementType,
  type LevelConfig,
} from './config/levels.js';
import { createEnemy, updateEnemy } from './entities/Enemy.js';
import { createExplosion, updateExplosion } from './entities/Explosion.js';
import {
  applyPowerUp,
  createPowerUp,
  randomPowerUpType,
  updatePowerUp,
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
} from './types.js';
import type { DamnTvActions } from '../game/actions.js';
import { PLAYFIELD_HEIGHT, PLAYFIELD_WIDTH } from '../render/types.js';
import { rectsOverlap, resetIds } from './types.js';

export class World {
  phase: GamePhase = 'menu';
  player: Player = createPlayer();
  projectiles: Projectile[] = [];
  enemies: Enemy[] = [];
  powerUps: PowerUp[] = [];
  explosions: Explosion[] = [];
  stats: GameStats = { score: 0, kills: 0, levelIndex: 0, highScore: 0 };
  scrollOffset = 0;
  spawnTimer = 0;
  frameTime = 0;
  levelCompleteTimer = 0;

  get levelConfig(): LevelConfig {
    return getLevelConfig(this.stats.levelIndex);
  }

  reset(): void {
    resetIds();
    this.player = createPlayer();
    this.projectiles = [];
    this.enemies = [];
    this.powerUps = [];
    this.explosions = [];
    this.stats.score = 0;
    this.stats.kills = 0;
    this.stats.levelIndex = 0;
    this.scrollOffset = 0;
    this.spawnTimer = 0;
    this.levelCompleteTimer = 0;
    this.phase = 'playing';
  }

  startGame(): void {
    this.reset();
  }

  private pickEnemyType(): EnemyMovementType {
    const weights = this.levelConfig.enemyWeights;
    const roll = Math.random();
    let cumulative = 0;

    for (const type of Object.values(EnemyMovementTypes)) {
      cumulative += weights[type];
      if (roll <= cumulative) return type;
    }

    return EnemyMovementTypes.DUNCE;
  }

  private spawnEnemy(): void {
    const type = this.pickEnemyType();
    const sideSpawn = Math.random() < 0.25;
    const x = sideSpawn
      ? Math.random() < 0.5
        ? 0
        : PLAYFIELD_WIDTH - 4
      : Math.random() * (PLAYFIELD_WIDTH - 4);
    const y = sideSpawn ? Math.random() * (PLAYFIELD_HEIGHT * 0.4) : -4;

    this.enemies.push(createEnemy(x, y, type));
  }

  update(actions: DamnTvActions, dt: number, now: number): void {
    this.frameTime = now;

    if (this.phase === 'menu') {
      if (actions.confirm || actions.fire) this.startGame();
      return;
    }

    if (this.phase === 'gameover') {
      if (actions.confirm || actions.fire) this.startGame();
      return;
    }

    if (this.phase === 'levelcomplete') {
      this.levelCompleteTimer -= dt * 1000;
      if (this.levelCompleteTimer <= 0 || actions.confirm || actions.fire) {
        this.stats.levelIndex += 1;
        this.spawnTimer = 0;
        this.phase = 'playing';
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
    this.scrollOffset += config.scrollSpeed * dt;

    updatePlayer(this.player, actions, dt, now);

    if (playerWantsToShoot(this.player, now)) {
      this.projectiles.push(createProjectile(this.player));
    }

    this.spawnTimer += dt * 1000;
    if (this.spawnTimer >= config.spawnIntervalMs) {
      this.spawnTimer = 0;
      this.spawnEnemy();
    }

    for (const enemy of this.enemies) {
      updateEnemy(
        enemy,
        dt,
        config.scrollSpeed,
        this.player.x,
        this.player.y,
        PLAYFIELD_WIDTH,
      );
    }

    for (const projectile of this.projectiles) {
      updateProjectile(projectile, dt);
    }

    for (const powerUp of this.powerUps) {
      updatePowerUp(powerUp, dt, config.scrollSpeed);
    }

    for (const explosion of this.explosions) {
      updateExplosion(explosion, dt);
    }

    this.handleCollisions(now);
    this.cleanup();

    if (this.player.dead) {
      this.phase = 'gameover';
      this.stats.highScore = Math.max(this.stats.highScore, this.stats.score);
    } else if (
      this.stats.kills >= config.killsToAdvance &&
      config.killsToAdvance !== Infinity
    ) {
      this.stats.score += config.winBonus;
      this.phase = 'levelcomplete';
      this.levelCompleteTimer = 3000;
    }
  }

  private handleCollisions(now: number): void {
    for (const projectile of this.projectiles) {
      if (projectile.dead) continue;

      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        if (rectsOverlap(projectile, enemy)) {
          projectile.dead = true;
          enemy.hp -= 1;
          if (enemy.hp <= 0) {
            enemy.dead = true;
            this.stats.kills += 1;
            this.stats.score += 100;
            this.explosions.push(createExplosion(enemy.x, enemy.y));
            if (Math.random() < 0.12) {
              this.powerUps.push(createPowerUp(enemy.x, enemy.y, randomPowerUpType()));
            }
          }
          break;
        }
      }
    }

    for (const powerUp of this.powerUps) {
      if (powerUp.dead || this.player.dead) continue;
      if (rectsOverlap(powerUp, this.player)) {
        powerUp.dead = true;
        applyPowerUp(powerUp.type, this.player, now);
        this.stats.score += 50;
      }
    }

    if (now >= this.player.invincibleUntil) {
      for (const enemy of this.enemies) {
        if (enemy.dead) continue;
        if (rectsOverlap(enemy, this.player)) {
          if (damagePlayer(this.player, now)) {
            this.explosions.push(createExplosion(this.player.x, this.player.y));
          }
          enemy.dead = true;
          this.explosions.push(createExplosion(enemy.x, enemy.y));
        }
      }
    }
  }

  private cleanup(): void {
    this.projectiles = this.projectiles.filter(
      (p) => !p.dead && p.y + p.h >= 0,
    );
    this.enemies = this.enemies.filter(
      (e) => !e.dead && e.y < PLAYFIELD_HEIGHT + 2,
    );
    this.powerUps = this.powerUps.filter(
      (p) => !p.dead && p.y < PLAYFIELD_HEIGHT + 2,
    );
    this.explosions = this.explosions.filter((e) => !e.dead);
  }
}
