import { Canvas } from '@gush/candybar';
import Events from './Events';
import Crosshairs from './Crosshairs.js';
import Player from './Player.js';
import Projectile from './Projectile.js';
import Explosion from './Explosion.js';
import Particle from './Particle.js';
import Enemy, { EnemyMovementTypes, allEnemyMovements } from './Enemy.js';
import SpatialGrid from './spatialGrid/SpatialGrid.js';

// Store and Actions
import GameStore from './store/GameStore.js';
import * as playerActions from './actions/playerActions';
import * as scoreActions from './actions/scoreActions';
import connect from './store/connect.js';

// Helpers
import {
    getAngleRadians,
    movePointAtAngle,
    getRandomInt,
} from './gameUtils.js';

export default class LevelView {
    static init({ canvas, config, assets }) {
        const game = new LevelView({ canvas, config, assets });

        return new Canvas({
            canvas,
            hasPointer: true,
            pauseInBackground: true,
            entities: [game],
        });
    }

    constructor({ assets, config, canvas }) {
        this.canvas = canvas;
        this.config = config;
        this.assets = assets;

        new Events(this.canvas);
    }

    setup = ({ bounds, dpr }) => {
        this.gameBounds = bounds;

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

        // spatial collision grid
        this.spatialGrid = new SpatialGrid(0, 0, bounds.w, bounds.h, 100 * dpr);

        this.createNewPlayer();
        this.subscribeToStore();
    };

    resize = ({ bounds, dpr }) => {
        // new spatial collision grid
        const newSpatialGrid = new SpatialGrid(
            0,
            0,
            bounds.w,
            bounds.h,
            100 * dpr,
        );

        // transfer existing entities
        this.spatialGrid.entities.forEach((entity) =>
            newSpatialGrid.addEntity(entity),
        );

        this.spatialGrid = newSpatialGrid;
    };

    /* ----------------------------------------------------------*\
    |* Redux Subscriptions
    \*----------------------------------------------------------*/

    subscribeToStore() {
        const selectShieldPower = (state) => state.event.pointerDown;

        connect(
            GameStore,
            selectShieldPower,
        )(this.handlePointerDown);
    }

    handlePointerDown = (pointerDown) => {
        if (!this.player) return;

        if (pointerDown) {
            this.createProjectile();
            this.player.setFiring();
        } else {
            this.player.setIdle();
        }
    };

    /* ----------------------------------------------------------*\
    |* Level methods
    \*----------------------------------------------------------*/

    createProjectile() {
        if (!this.player) return;

        const { x: x0, y: y0 } = this;
        const { cx: x1, cy: y1 } = this.player;

        const radian = getAngleRadians(x0, y0, x1, y1);
        const { x: vx, y: vy } = movePointAtAngle({ x: 0, y: 0 }, radian, 20);
        const image = this.assets.images.fist;
        const size = 50;

        const projectile = new Projectile(image, size, x1, y1, vx, vy);
        this.spatialGrid.addEntity(projectile);
        this.projectiles.push(projectile);
    }

    killPlayer() {
        const { cx, cy } = this.player;
        this.createExplosion(2, cx, cy);
        this.player = null;

        if (GameStore.getState().player.lives > 0) {
            this.newPlayerTimer();
        }
    }

    newPlayerTimer() {
        const time = 2000;
        setTimeout(() => this.createNewPlayer(), time);
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
        GameStore.dispatch(playerActions.resetPlayerState);
    }

    createRandomEnemy(bounds) {
        // get a random type
        const type =
            allEnemyMovements[getRandomInt(0, allEnemyMovements.length - 1)];

        // config based on type
        const typeMap = {
            [EnemyMovementTypes.DUNCE]: {
                image: this.assets.images.bomb,
                size: 60,
            },
            [EnemyMovementTypes.FOLLOWER]: {
                image: this.assets.images.tv,
                size: 70,
            },
            [EnemyMovementTypes.SNEK]: {
                image: this.assets.images.pill,
                size: 50,
            },
        };

        const { image, size } = typeMap[type];
        const x = getRandomInt(0, bounds.w);
        const y = (size / 2) * -1; // adjust for dpr

        const enemy = new Enemy({ image, size, type, x, y });

        this.enemies.push(enemy);
        this.spatialGrid.addEntity(enemy);
    }

    createExplosion(power, x, y) {
        const explosion = new Explosion(power, x, y);

        this.explosions.push(explosion);

        const amount = getRandomInt(5, 15);
        const particles = new Array(amount)
            .fill(null)
            .map(() => new Particle(x, y));

        this.particles.push(...particles);
    }

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

    drawParticles({ ctx }) {
        this.particles.forEach((p) => {
            p.draw(ctx);
        });
    }

    drawExplosions({ ctx }) {
        this.explosions.forEach((e) => {
            e.draw(ctx);
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

        const {
            canvas: sCanvas,
            w: sw,
            h: sh,
            x: sx,
            y: sy,
        } = this.player.shield;
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

    enemyGenerator({ bounds }) {
        if (this.tick % 40 === 0) {
            this.createRandomEnemy(bounds);
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

    updateViewEntities() {
        this.projectiles.forEach((x) => x.update(this.gameBounds));
        this.particles.forEach((x) => x.update(this.gameBounds));
        this.explosions.forEach((x) => x.update());
        this.enemies.forEach((x) => x.update(this.gameBounds, this.player));
    }

    checkCollisionPairs() {
        const pairs = this.spatialGrid.queryForCollisionPairs();
        pairs.forEach(([a, b]) => {
            // player to enemy hits
            if (a instanceof Player && b instanceof Enemy) {
                this.createExplosion(0.5, b.x, b.y);
                if (a.shield.dead) {
                    GameStore.dispatch(playerActions.hitPlayer);
                } else {
                    GameStore.dispatch(playerActions.hitShield);
                }

                b.dead = true;
                return;
            }
            if (a instanceof Enemy && b instanceof Player) {
                this.createExplosion(0.5, a.x, a.y);
                if (b.shield.dead) {
                    GameStore.dispatch(playerActions.hitPlayer);
                } else {
                    GameStore.dispatch(playerActions.hitShield);
                }
                a.dead = true;
                return;
            }

            // projectile to enemy
            if (a instanceof Enemy && b instanceof Projectile) {
                this.createExplosion(1, a.x, a.y);
                GameStore.dispatch(
                    scoreActions.updateScore(100, this.config.level),
                );
                a.dead = true;
                b.dead = true;
                return;
            }
            if (a instanceof Projectile && b instanceof Enemy) {
                this.createExplosion(1, b.x, b.y);
                GameStore.dispatch(
                    scoreActions.updateScore(100, this.config.level),
                );
                a.dead = true;
                b.dead = true;
                return;
            }
        });
    }

    removeDead() {
        this.removeDeadInstances('projectiles');
        this.removeDeadInstances('particles');
        this.removeDeadInstances('explosions');
        this.removeDeadInstances('enemies');
    }

    update = (context) => {
        this.updatePlayer(context);
        this.updateViewEntities(context);

        this.enemyGenerator(context);
        this.setMousePosition(context);

        this.checkCollisionPairs(context);
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
