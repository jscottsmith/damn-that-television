import gameStore from './store/gameStore.js';
import connect from './store/connect';

export default class Shield {
    constructor({ r, x, y }) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.r = r;
        this.w = r * 2;
        this.h = r * 2;

        // global coordinates. Not local coord to draw from
        this.x = 0;
        this.y = 0;
        this.cx = r;
        this.cy = r;
        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };

        this.pi2 = Math.PI * 2;
        this.opacity = 0.3;

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.dead = false;
        this.hit = false;

        this.setGradient1();
        this.setGradient2();
        this.subscribe();

        this.draw();
    }

    setGradient1() {
        this.gradient1 = this.ctx.createRadialGradient(
            this.cx,
            this.cy,
            this.r,
            this.cx,
            this.cy,
            0,
        );

        this.gradient1.addColorStop(0, 'rgba(100, 120, 218, 0.5');
        this.gradient1.addColorStop(0.2, 'rgba(30, 156, 215, 0.2');
        this.gradient1.addColorStop(1, 'rgba(204, 224, 244, 0.0');
    }

    setGradient2() {
        this.gradient2 = this.ctx.createRadialGradient(
            this.cx,
            this.cy,
            this.r,
            this.cx,
            this.cy,
            0,
        );

        this.gradient2.addColorStop(0, 'rgba(120, 218, 100, 0.5');
        this.gradient2.addColorStop(0.2, 'rgba(156, 215, 30, 0.2');
        this.gradient2.addColorStop(1, 'rgba(224, 244, 204, 0.0');
    }

    subscribe() {
        const selectShieldPower = (state) => state.player.shieldPower;
        connect(
            gameStore,
            selectShieldPower,
        )(this.handleShieldPowerChange);
    }

    handleShieldPowerChange = (shieldPower) => {
        if (shieldPower > 0) {
            this.handleHit();
        } else {
            this.handleShieldDown();
        }
    };

    handleHit = () => {
        this.hit = true;
        this.draw();
        setTimeout(() => {
            this.hit = false;
            this.draw();
        }, 200);
    };

    handleShieldDown = () => {
        this.dead = true;
        this.draw();
    };

    updatePosition(cx, cy) {
        this.x = cx - this.r;
        this.y = cy - this.r;
        this.cx = cx;
        this.cy = cy;
        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        };
    }

    drawCircle(color, r) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(r, r, r, 0, this.pi2, true);
        this.ctx.closePath();
        this.ctx.fill();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.w, this.h);

        if (this.dead) return;

        if (this.hit) {
            this.drawCircle(this.gradient2, this.r);
        } else {
            this.drawCircle(this.gradient1, this.r);
        }
    }
}
