import { Canvas } from '@gush/candybar';

import Crosshairs from './Crosshairs';
import Explosion from './Explosion';
import Notification from './Notification';
import Particle from './Particle';
import Player from './Player';
import Projectile from './Projectile';
import PowerUp from './PowerUp';
import Enemy, { EnemyMovementTypes, allEnemyMovements } from './Enemy';

import Events from './Events';
import SpatialGrid from './spatialGrid/SpatialGrid';

// Store and Actions
import gameStore from './store/gameStore';
import * as playerActions from './actions/playerActions';

// Constants
import gameEvents from './events/gameEvents';
import eventTypes from './constants/eventTypes';
import weaponTypes, { weaponPowerUps } from './constants/weaponTypes';

// Helpers
import { getAngleRadians, movePointAtAngle, getRandomInt } from './gameUtils';
import checkCollisionPairs from './utils/checkCollisionPairs';
import throttle from './utils/throttle';

export default class LevelView {
  canvas: any;
  config: any;
  assets: any;
  tick: number;
  x: number;
  y: number;
  player: Player;
  spatialGrid: SpatialGrid;
  crosshairs: Crosshairs;
  playerConfig: {
    ps: number;
    px: number;
    py: number;
    bottomOffset: number;
  };

  projectiles: any[];
  enemies: any[];
  explosions: any[];
  particles: any[];

  dpr: number;

  static init({ canvas, config, assets }) {
    const game = new LevelView({ canvas, config, assets });

    return new Canvas({
      canvas,
      hasPointer: true,
      pauseInBackground: true,
      entities: [game],
      dpr: 1,
    });
  }

  constructor({ assets, config, canvas }) {
    this.canvas = canvas;
    this.config = config;
    this.assets = assets;

    new Events(this.canvas);
  }

  setup = ({ bounds, dpr }) => {
    const ps = 80 * dpr;
    const px = (window.innerWidth / 2) * dpr;
    const py = window.innerHeight * dpr;
    const bottomOffset = 200 * dpr;

    this.playerConfig = {
      ps,
      px,
      py,
      bottomOffset,
    };

    // Game objects
    this.projectiles = [];
    this.enemies = [];
    this.explosions = [];
    this.particles = [];

    this.tick = 0;

    this.x = px;
    this.y = py / 2;

    // Game Instances
    this.crosshairs = new Crosshairs(50 * dpr);
    this.crosshairs.setup({ dpr });

    // spatial collision grid
    this.spatialGrid = new SpatialGrid(0, 0, bounds.w, bounds.h, 100 * dpr);

    this.createNewPlayer();
    this.subscribeToEvents();
  };

  resize = ({ bounds, dpr }) => {
    // new spatial collision grid
    const newSpatialGrid = new SpatialGrid(0, 0, bounds.w, bounds.h, 100 * dpr);

    // transfer existing entities
    this.spatialGrid.entities.forEach((entity) =>
      newSpatialGrid.addEntity(entity),
    );

    this.spatialGrid = newSpatialGrid;
  };

  /* ----------------------------------------------------------*\
    |* Subscriptions
    \*----------------------------------------------------------*/

  subscribeToEvents() {
    gameEvents.subscribe(
      eventTypes.POINTER_DOWN,
      throttle(this.handlePointerDown, 100),
    );
    gameEvents.subscribe(eventTypes.POINTER_UP, this.handlePointerUp);
  }

  handlePointerDown = () => {
    if (!this.player) return;

    this.createProjectile();
    this.player.setFiring();
  };

  handlePointerUp = () => {
    if (!this.player) return;
    this.player.setIdle();
  };

  /* ----------------------------------------------------------*\
    |* Level methods
    \*----------------------------------------------------------*/

  createProjectile() {
    if (!this.player) return;

    const { x: x0, y: y0 } = this;
    const { cx: x1, cy: y1 } = this.player;

    const radian = getAngleRadians(x0, y0, x1, y1);
    const image = this.assets.images.fist;
    const size = 50 * this.dpr;

    if (this.player.weapon === weaponTypes.SPRAY) {
      let i = 0;
      const amount = 3;
      const spread = Math.PI / 6;
      const rx = spread / amount;
      const startRad = radian - Math.floor(amount / 2) * rx;

      while (i < amount) {
        const curRad = startRad + i * rx;
        const { x: vx, y: vy } = movePointAtAngle({ x: 0, y: 0 }, curRad, 20);
        const projectile = new Projectile({
          image,
          size,
          x: x1,
          y: y1,
          vx: vx * this.dpr,
          vy: vy * this.dpr,
        });
        this.spatialGrid.addEntity(projectile);
        this.projectiles.push(projectile);
        i++;
      }
      return;
    }

    const { x: vx, y: vy } = movePointAtAngle({ x: 0, y: 0 }, radian, 20);

    const projectile = new Projectile({
      image,
      size,
      x: x1,
      y: y1,
      vx: vx * this.dpr,
      vy: vy * this.dpr,
    });
    this.spatialGrid.addEntity(projectile);
    this.projectiles.push(projectile);
  }

  killPlayer() {
    const { cx, cy } = this.player;
    this.createExplosion(2, cx, cy);
    this.player = null;

    if (gameStore.getState().player.lives > 0) {
      this.newPlayerTimer();
    }
  }

  newPlayerTimer() {
    const time = 2000;
    setTimeout(() => {
      this.createNewPlayer();
      gameStore.dispatch(playerActions.resetPlayerState);
    }, time);
  }

  createNewPlayer() {
    const { ps, px, py, bottomOffset } = this.playerConfig;
    this.player = new Player({
      config: this.config,
      assets: this.assets,
      size: ps,
      x: px,
      y: py - bottomOffset,
    });
    this.spatialGrid.addEntity(this.player);
  }

  createRandomEnemy({ bounds, dpr }) {
    // get a random type
    const type =
      allEnemyMovements[getRandomInt(0, allEnemyMovements.length - 1)];

    // config based on type
    const typeMap = {
      [EnemyMovementTypes.DUNCE]: {
        image: this.assets.images.bomb,
        size: 60 * dpr,
      },
      [EnemyMovementTypes.FOLLOWER]: {
        image: this.assets.images.tv,
        size: 70 * dpr,
      },
      [EnemyMovementTypes.SNEK]: {
        image: this.assets.images.pill,
        size: 50 * dpr,
      },
    };

    const { image, size } = typeMap[type];
    const x = getRandomInt(0, bounds.w);
    const y = (size / 2) * -1;

    const enemy = new Enemy({ image, size, type, x, y, dpr });

    this.enemies.push(enemy);
    this.spatialGrid.addEntity(enemy);
  }

  createWeaponPowerUp({ bounds, dpr }) {
    // get a random type
    const type = weaponPowerUps[getRandomInt(0, weaponPowerUps.length - 1)];
    const size = 60 * dpr;

    const x = getRandomInt(0, bounds.w);
    const y = (size / 2) * -1;
    const powerUp = new PowerUp({
      image: this.assets.images.handPeace,
      size,
      type,
      x,
      y,
      dpr,
    });
    this.enemies.push(powerUp);
    this.spatialGrid.addEntity(powerUp);
  }

  createExplosion = (power, x, y) => {
    const explosion = new Explosion({ power, x, y, dpr: this.dpr });

    this.explosions.push(explosion);

    const amount = getRandomInt(5, 15);
    const particles = new Array(amount)
      .fill(null)
      .map(() => new Particle({ x, y, dpr: this.dpr }));

    this.particles.push(...particles);
  };

  createNotification = (message, x, y, vx, vy) => {
    const notification = new Notification(message, x, y, vx, vy);
    this.explosions.push(notification);
  };

  /* ----------------------------------------------------------*\
    |* Draw methods
    \*----------------------------------------------------------*/

  drawProjectiles({ ctx }) {
    this.projectiles.forEach((p) => {
      const { canvas, w, h, x, y } = p;
      ctx.drawImage(canvas, x, y, w, h);
    });
  }

  drawEnemies({ ctx }) {
    this.enemies.forEach((p) => {
      const { canvas, w, h, x, y } = p;
      ctx.drawImage(canvas, x, y, w, h);
    });
  }

  drawParticles(context) {
    this.particles.forEach((p) => {
      p.draw(context);
    });
  }

  drawExplosions(context) {
    this.explosions.forEach((e) => {
      e.draw(context);
    });
  }

  drawCrosshairs({ ctx, pointer }) {
    const { canvas, w, h } = this.crosshairs;
    let { x, y } = pointer.position;
    x = x - w / 2;
    y = y - h / 2;

    ctx.drawImage(canvas, x, y, w, h);
  }

  drawPlayer({ ctx }) {
    if (!this.player) return;

    const { canvas: playerCanvas, w, h, x, y } = this.player;
    ctx.drawImage(playerCanvas, x, y, w, h);

    const { canvas: sCanvas, w: sw, h: sh, x: sx, y: sy } = this.player.shield;
    ctx.drawImage(sCanvas, sx, sy, sw, sh);
  }

  drawBackground({ ctx, bounds, pointer }) {
    const gradient = ctx.createLinearGradient(
      pointer.position.x,
      0,
      bounds.w / 2,
      bounds.h,
    );
    gradient.addColorStop(0, this.config.backgroundColors[0]);
    gradient.addColorStop(1, this.config.backgroundColors[1]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, bounds.w, bounds.h);
  }

  clear({ ctx, bounds }) {
    const { w, h } = bounds;
    ctx.clearRect(0, 0, w, h);
  }

  /* ----------------------------------------------------------*\
    |* Update methods
    \*----------------------------------------------------------*/

  enemyGenerator(context) {
    if (this.tick % 40 === 0) {
      this.createRandomEnemy(context);
    }
    if (this.tick % 1000 === 0) {
      this.createWeaponPowerUp(context);
    }
  }

  removeDeadInstances(key) {
    this[key] = this[key].filter((x) => !x.dead);
  }

  setMousePosition({
    pointer: {
      position: { x, y },
    },
    bounds,
  }) {
    if (x === null || y === null) {
      this.x = bounds.w / 2;
      this.y = bounds.h / 2;
      return;
    }
    this.x = x;
    this.y = y;
  }

  updatePlayer({ bounds }) {
    if (!this.player) return;

    const { w, dead } = this.player;

    if (dead) {
      this.killPlayer();
    } else {
      const x = this.x - w / 2;
      const y = bounds.h - this.playerConfig.bottomOffset;
      this.player.updatePosition(x, y);
    }
  }

  updateViewEntities(context) {
    this.projectiles.forEach((x) => x.update(context.bounds));
    this.particles.forEach((x) => x.update(context.bounds));
    this.explosions.forEach((x) => x.update(context));
    this.enemies.forEach((x) => x.update(context.bounds, this.player));
  }

  removeDead() {
    this.removeDeadInstances('projectiles');
    this.removeDeadInstances('particles');
    this.removeDeadInstances('explosions');
    this.removeDeadInstances('enemies');
  }

  update = (context) => {
    this.dpr = context.dpr;

    this.updatePlayer(context);
    this.updateViewEntities(context);

    this.enemyGenerator(context);
    this.setMousePosition(context);

    checkCollisionPairs({
      createExplosion: this.createExplosion,
      createNotification: this.createNotification,
      spatialGrid: this.spatialGrid,
      config: this.config,
    });

    this.spatialGrid.update(context);

    this.removeDead();
  };

  draw = (context) => {
    this.clear(context);
    this.drawBackground(context);
    this.drawProjectiles(context);
    this.drawPlayer(context);
    this.drawParticles(context);
    this.drawEnemies(context);
    this.drawExplosions(context);
    this.drawCrosshairs(context);
    this.spatialGrid.draw(context);
    this.tick++;
  };
}
