import Crosshairs from './Crosshairs.js';
import Player from './Player.js';
import Projectile from './Projectile.js';
import Enemy, { allEnemies } from './Enemy.js';
import Explosion from './Explosion.js';
import Particle from './Particle.js';
import { GameEvents } from './GameEvents.js';
import {
    getAngleRadians,
    movePointAtAngle,
    getRandomInt,
} from './gameUtils.js';

export default class LevelView {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.dpr = window.devicePixelRatio;

        // Game Instances
        this.crosshairs = new Crosshairs(50 * this.dpr);
        this.player = new Player(75 * this.dpr);

        // Game objects
        this.projectiles = [];
        this.enemies = [];
        this.explosions = [];
        this.particles = [];

        this.tick = 0;

        this.x = 0;
        this.y = 0;
    }

    subscribe(eventPublisher) {
        // subscribe to events
        this.crosshairs.subscribe(eventPublisher);
        this.player.subscribe(eventPublisher);

        eventPublisher.subscribe(GameEvents.MOUSE_DOWN, this.handleMouseDown);
        eventPublisher.subscribe(GameEvents.MOUSE_MOVE, this.handleMouseMove);
        eventPublisher.subscribe(GameEvents.PLAYER_DEAD, this.handleMouseMove);

        this.eventPublisher = eventPublisher;
    }

    handleMouseDown = () => {
        this.firePlayer();
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

    firePlayer() {
        const { x: x0, y: y0 } = this;
        const { cx: x1, cy: y1 } = this.player;

        const radian = getAngleRadians(x0, y0, x1, y1);
        const velocity = movePointAtAngle({ x: 0, y: 0 }, radian, 20);

        const p = new Projectile(10, x1, y1, velocity.x, velocity.y);

        this.projectiles.push(p);
    }

    createRandomEnemy() {
        const size = 40;
        const type = allEnemies[getRandomInt(0, allEnemies.length)];
        const x = getRandomInt(0, this.canvas.width);
        const y = size / 2 * -1; // adjust for dpr

        const e = new Enemy(size, type, x, y);

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
        const { canvas, w, h, x, y } = this.player;
        this.ctx.drawImage(canvas, x, y, w, h);
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

    updatePlayerPosition() {
        const { w, h } = this.player;
        this.player.updatePosition(this.x - w / 2, this.canvas.height - h);
    }

    updateProjectiles() {
        // update positions
        this.projectiles.forEach(p => p.update(this.gameBounds));
        // remove dead
        this.projectiles = this.projectiles.filter(p => !p.dead);
    }

    updateParticles() {
        // update positions
        this.particles.forEach(p => p.update(this.gameBounds));
        // remove dead
        this.particles = this.particles.filter(p => !p.dead);
    }

    updateExplosions() {
        // update positions
        this.explosions.forEach(e => e.update());
        // remove dead
        this.explosions = this.explosions.filter(p => !p.dead);
    }

    updateEnemies() {
        // update enemy positions, Player required for following
        this.enemies.forEach(e => e.update(this.gameBounds, this.player));
        // Meaty hit test, should use broad phase but should work with limited enemies
        this.enemies.forEach(enemy => {
            const p = this.projectiles;

            // check for hit against Player first
            const hitPlayer = enemy.hitTest(this.player);
            if (hitPlayer) {
                const x = enemy.x + enemy.w / 2;
                const y = enemy.y + enemy.h / 2;

                this.createExplosion(1, x, y);
                this.eventPublisher.publish(GameEvents.PLAYER_HIT);
                return (enemy.dead = true);
            }

            // hit projectile
            for (let i = 0; i < p.length; i++) {
                // test enemy against each projectile
                const isHit = enemy.hitTest(p[i]);
                if (isHit) {
                    // set dead and break the loop
                    enemy.dead = true;
                    p[i].dead = true;

                    const x = enemy.x + enemy.w / 2;
                    const y = enemy.y + enemy.h / 2;

                    this.createExplosion(1, x, y);
                    break;
                }
            }
        });
        // remove dead
        this.enemies = this.enemies.filter(e => !e.dead);
        this.particles = this.particles.filter(p => !p.dead);
    }

    /*----------------------------------------------------------*\
    |* Update Stack
    \*----------------------------------------------------------*/

    update() {
        this.updatePlayerPosition();
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
