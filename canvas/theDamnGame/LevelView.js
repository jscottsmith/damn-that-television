import Crosshairs from './Crosshairs.js';
import Player from './Player.js';
import Projectile from './Projectile.js';
import Enemy, { EnemyMovementTypes, allEnemyMovements } from './Enemy.js';
import Explosion from './Explosion.js';
import Particle from './Particle.js';
import GameStore from './store/GameStore.js';
import * as playerActions from './actions/playerActions';
import * as scoreActions from './actions/scoreActions';
import {
    getAngleRadians,
    movePointAtAngle,
    getRandomInt,
} from './gameUtils.js';
import connect from './store/connect.js';

export default class LevelView {
    constructor({ assets, config }) {
        this.config = config;
        this.assets = assets;
        this.dpr = window.devicePixelRatio;

        // Game Instances
        this.crosshairs = new Crosshairs(50 * this.dpr);

        const ps = 80 * this.dpr;
        const px = (window.innerWidth / 2) * this.dpr;
        const py = window.innerHeight * this.dpr;
        const bottomOffset = 200 * this.dpr;

        this.playerConfig = {
            ps,
            px,
            py,
            bottomOffset,
        };

        this.player = new Player({
            config: this.config,
            assets: this.assets,
            size: ps,
            x: px,
            y: py - bottomOffset,
        });

        // Game objects
        this.projectiles = [];
        this.enemies = [];
        this.explosions = [];
        this.particles = [];

        this.tick = 0;

        this.x = px;
        this.y = py / 2;

        this.subscribeToStore();
    }

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
            this.fireProjectile();
            this.player.setFiring();
        } else {
            this.player.setIdle();
        }
    };

    /* ----------------------------------------------------------*\
    |* Level methods
    \*----------------------------------------------------------*/

    fireProjectile() {
        if (!this.player) return;

        const { x: x0, y: y0 } = this;
        const { cx: x1, cy: y1 } = this.player;

        const radian = getAngleRadians(x0, y0, x1, y1);
        const { x: vx, y: vy } = movePointAtAngle({ x: 0, y: 0 }, radian, 20);
        const image = this.assets.images.fist;
        const size = 50;

        const p = new Projectile(image, size, x1, y1, vx, vy);

        this.projectiles.push(p);
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
    }

    createExplosion(power, x, y) {
        const explosion = new Explosion(power, x, y);

        this.explosions.push(explosion);

        const amount = getRandomInt(5, 15);
        const nullParticles = new Array(amount).fill(new Particle(x, y));
        const particles = nullParticles.map(() => new Particle(x, y));

        this.particles = [...particles, ...this.particles];
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

    removeDeadInstances(items, key) {
        this[key] = items.filter((x) => !x.dead);
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

    updateProjectiles() {
        // update positions
        this.projectiles.forEach((x) => x.update(this.gameBounds));
        this.removeDeadInstances(this.projectiles, 'projectiles');
    }

    updateParticles() {
        // update positions
        this.particles.forEach((x) => x.update(this.gameBounds));
        this.removeDeadInstances(this.particles, 'particles');
    }

    updateExplosions() {
        // update positions
        this.explosions.forEach((x) => x.update());
        this.removeDeadInstances(this.explosions, 'explosions');
    }

    updateEnemies() {
        // update enemy positions, Player required for following
        this.enemies.forEach((x) => x.update(this.gameBounds, this.player));

        // Meaty hit test for now -- should use broad/narrow phase
        this.enemies.forEach((enemy) => {
            this.hitTestEnemy(enemy);
        });
        // remove dead
        this.removeDeadInstances(this.enemies, 'enemies');
        this.removeDeadInstances(this.particles, 'particles');
    }

    /* ----------------------------------------------------------*\
    |* Hit Tests
    \*----------------------------------------------------------*/

    hitTestEnemy(enemy) {
        const projectile = this.projectiles;

        // hit shield
        const hitShield =
            this.player &&
            !this.player.shield.dead &&
            this.player.shield.hitTest(enemy);
        if (hitShield) {
            const x = enemy.x + enemy.w / 2;
            const y = enemy.y + enemy.h / 2;

            this.createExplosion(0.5, x, y);

            GameStore.dispatch(playerActions.hitShield);
            enemy.dead = true;
            return enemy.dead;
        }

        // check for hit against Player
        const hitPlayer = this.player && enemy.hitTest(this.player);
        if (hitPlayer) {
            const x = enemy.x + enemy.w / 2;
            const y = enemy.y + enemy.h / 2;

            this.createExplosion(1, x, y);
            GameStore.dispatch(playerActions.hitPlayer);
            enemy.dead = true;
            return enemy.dead;
        }

        // hit projectile with for loop to break
        for (let i = 0; i < projectile.length; i++) {
            // test enemy against each projectile
            const isHit = enemy.hitTest(projectile[i]);
            if (isHit) {
                // set dead and break the loop
                enemy.dead = true;
                projectile[i].dead = true;

                const x = enemy.x + enemy.w / 2;
                const y = enemy.y + enemy.h / 2;

                this.createExplosion(1, x, y);
                GameStore.dispatch(
                    scoreActions.updateScore(100, this.config.level),
                );
                break;
            }
        }

        return enemy.dead;
    }

    update = (context) => {
        this.updatePlayer(context);
        this.updateProjectiles(context);
        this.updateEnemies(context);
        this.updateParticles(context);
        this.updateExplosions(context);
        this.enemyGenerator(context);
        this.setMousePosition(context);
    };

    draw = (context) => {
        this.clear(context);
        this.drawBackground(context);
        this.drawProjectiles(context);
        this.drawPlayer(context);
        this.drawParticles(context);
        this.drawExplosions(context);
        this.drawEnemies(context);
        this.drawCrosshairs(context);
        this.tick++;
    };
}
