import Crosshairs from './Crosshairs.js';
import Player from './Player.js';
import Projectile from './Projectile.js';
import Enemy, { EnemyTypes, allEnemies } from './Enemy.js';
import Explosion from './Explosion.js';
import Particle from './Particle.js';
import { GameEvents } from './GameEvents.js';
import {
    getAngleRadians,
    movePointAtAngle,
    getRandomInt,
} from './gameUtils.js';

export default class LevelView {
    constructor(canvas, ctx, gameController, gameAssets) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameController = gameController;
        this.gameAssets = gameAssets;
        this.dpr = window.devicePixelRatio;

        // Game Instances
        this.crosshairs = new Crosshairs(50 * this.dpr);

        const ps = 75 * this.dpr;
        const px = (window.innerWidth / 2 - ps / 2) * this.dpr;
        const py = (window.innerHeight - 200) * this.dpr;

        this.playerConfig = {
            ps,
            px,
            py,
        };

        this.player = new Player(this.gameAssets, ps, px, py);

        // Game objects
        this.projectiles = [];
        this.enemies = [];
        this.explosions = [];
        this.particles = [];

        this.tick = 0;

        this.x = px;
        this.y = py / 2;
    }

    subscribe(eventPublisher) {
        // subscribe to events
        this.crosshairs.subscribe(eventPublisher);
        this.player.subscribe(eventPublisher);

        eventPublisher.subscribe(GameEvents.MOUSE_DOWN, this.handleMouseDown);
        eventPublisher.subscribe(GameEvents.MOUSE_MOVE, this.handleMouseMove);

        this.eventPublisher = eventPublisher;
    }

    handleMouseDown = () => {
        this.fireProjectile();
    };

    handleMouseMove = (topic, mouse) => {
        this.updateMouse(mouse);
    };

    handleMouseMove = (topic, mouse) => {
        this.updateMouse(mouse);
    };

    /*----------------------------------------------------------*\
    |* Level methods
    \*----------------------------------------------------------*/

    updateMouse({ x, y }) {
        this.x = x;
        this.y = y;
    }

    fireProjectile() {
        if (!this.player) return;

        const { x: x0, y: y0 } = this;
        const { cx: x1, cy: y1 } = this.player;

        const radian = getAngleRadians(x0, y0, x1, y1);
        const { x: vx, y: vy } = movePointAtAngle({ x: 0, y: 0 }, radian, 20);
        const image = this.gameAssets.images.fist;
        const size = 50 * this.dpr;

        const p = new Projectile(image, size, x1, y1, vx, vy);

        this.projectiles.push(p);
    }

    killPlayer() {
        const { cx, cy } = this.player;
        this.createExplosion(2, cx, cy);
        this.player = null;

        if (this.gameController.state.lives > 0) {
            this.newPlayerTimer();
        }
    }

    newPlayerTimer() {
        const time = 2000;
        setTimeout(() => this.createNewPlayer(), time);
    }

    createNewPlayer() {
        const { ps, px, py } = this.playerConfig;
        this.player = new Player(this.gameAssets, ps, px, py);
        this.eventPublisher.publish(GameEvents.RESET_PLAYER_STATE);
        this.player.subscribe(this.eventPublisher);
    }

    createRandomEnemy() {
        // get a random type
        const type = allEnemies[getRandomInt(0, allEnemies.length - 1)];

        // config based on type
        const typeMap = {
            [EnemyTypes.DUNCE]: {
                image: this.gameAssets.images.bomb,
                size: 60 * this.dpr,
            },
            [EnemyTypes.FOLLOWER]: {
                image: this.gameAssets.images.tv,
                size: 70 * this.dpr,
            },
            [EnemyTypes.SNEK]: {
                image: this.gameAssets.images.pill,
                size: 50 * this.dpr,
            },
        };

        const { image, size } = typeMap[type];
        const x = getRandomInt(0, this.canvas.width);
        const y = size / 2 * -1; // adjust for dpr

        const e = new Enemy(image, size, type, x, y);

        this.enemies.push(e);
    }

    createExplosion(power, x, y) {
        const explosion = new Explosion(power, x, y);

        this.explosions.push(explosion);

        const amount = getRandomInt(5, 15);
        const nullParticles = new Array(amount).fill(new Particle(x, y));
        const particles = nullParticles.map(() => new Particle(x, y));

        this.particles = [...particles, ...this.particles];
    }

    /*----------------------------------------------------------*\
    |* Draw methods
    \*----------------------------------------------------------*/

    drawProjectiles() {
        this.projectiles.forEach(p => {
            const { canvas, w, h, x, y } = p;
            this.ctx.drawImage(canvas, x, y, w, h);
        });
    }

    drawEnemies() {
        this.enemies.forEach(p => {
            const { canvas, w, h, x, y } = p;
            this.ctx.drawImage(canvas, x, y, w, h);
        });
    }

    drawParticles() {
        this.particles.forEach(p => {
            p.draw(this.ctx);
        });
    }

    drawExplosions() {
        this.explosions.forEach(e => {
            e.draw(this.ctx);
        });
    }

    drawCrosshairs() {
        const { canvas, w, h } = this.crosshairs;
        let { x, y } = this;
        x = x - w / 2;
        y = y - h / 2;

        this.ctx.drawImage(canvas, x, y, w, h);
    }

    drawPlayer() {
        if (!this.player) return;

        const { canvas, w, h, x, y } = this.player;
        this.ctx.drawImage(canvas, x, y, w, h);

        const {
            canvas: sCanvas,
            w: sw,
            h: sh,
            x: sx,
            y: sy,
        } = this.player.shield;
        this.ctx.drawImage(sCanvas, sx, sy, sw, sh);
    }

    clear() {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }

    /*----------------------------------------------------------*\
    |* Draw Stack
    \*----------------------------------------------------------*/

    draw() {
        this.clear();
        this.drawCrosshairs();
        this.drawPlayer();
        this.drawProjectiles();
        this.drawParticles();
        this.drawExplosions();
        this.drawEnemies();
    }

    /*----------------------------------------------------------*\
    |* Update methods
    \*----------------------------------------------------------*/

    enemyGenerator() {
        if (this.tick % 20 === 0) {
            this.createRandomEnemy();
        }
    }

    removeDeadInstances(items, key) {
        this[key] = items.filter(x => !x.dead);
    }

    updatePlayer() {
        if (!this.player) return;

        const { w, h, dead } = this.player;

        if (dead) {
            this.killPlayer();
        } else {
            this.player.updatePosition(this.x - w / 2, this.playerConfig.py);
        }
    }

    updateProjectiles() {
        // update positions
        this.projectiles.forEach(x => x.update(this.gameBounds));
        this.removeDeadInstances(this.projectiles, 'projectiles');
    }

    updateParticles() {
        // update positions
        this.particles.forEach(x => x.update(this.gameBounds));
        this.removeDeadInstances(this.particles, 'particles');
    }

    updateExplosions() {
        // update positions
        this.explosions.forEach(x => x.update());
        this.removeDeadInstances(this.explosions, 'explosions');
    }

    updateEnemies() {
        // update enemy positions, Player required for following
        this.enemies.forEach(x => x.update(this.gameBounds, this.player));

        // Meaty hit test for now -- should use broad/narrow phase
        this.enemies.forEach(enemy => {
            this.hitTestEnemy(enemy);
        });
        // remove dead
        this.removeDeadInstances(this.enemies, 'enemies');
        this.removeDeadInstances(this.particles, 'particles');
    }

    /*----------------------------------------------------------*\
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

            this.eventPublisher.publish(GameEvents.SHIELD_HIT);
            return (enemy.dead = true);
        }

        // check for hit against Player
        const hitPlayer = this.player && enemy.hitTest(this.player);
        if (hitPlayer) {
            const x = enemy.x + enemy.w / 2;
            const y = enemy.y + enemy.h / 2;

            this.createExplosion(1, x, y);
            this.eventPublisher.publish(GameEvents.PLAYER_HIT);
            return (enemy.dead = true);
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
                break;
            }
        }
    }

    /*----------------------------------------------------------*\
    |* Update Stack
    \*----------------------------------------------------------*/

    update() {
        this.updatePlayer();
        this.updateProjectiles();
        this.updateEnemies();
        this.updateParticles();
        this.updateExplosions();
        this.enemyGenerator();
    }

    run() {
        this.draw();
        this.update();
        this.tick++;
    }
}
