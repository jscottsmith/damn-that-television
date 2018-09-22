import { Entity, Spring, utils } from '@gush/candybar';

const { getRandomInt, getRandomFloat } = utils;

function circleInOut(t) {
    return (
        ((t *= 2) <= 1
            ? 1 - Math.sqrt(1 - t * t)
            : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
    );
}

function circleOut(t) {
    return Math.sqrt(1 - --t * t);
}

export function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

class Pyramid extends Entity {
    constructor({ color, setupCanvas }) {
        super();
        this.color = color;
        this.setupCanvas = setupCanvas;
        this.t = 0;
        this.u = 0;
        this.x = 0;
    }

    setup = (context) => {
        // const position = setupCanvas(context);
    };

    drawBaseLayer({ bounds, ctx }) {
        const height = bounds.h / 2;
        const width = height;
        const x1 = bounds.w / 2;
        const y1 = bounds.h - height;
        const x2 = bounds.w / 2 + width;
        const y2 = bounds.h;
        const x3 = bounds.w / 2 - width;
        const y3 = bounds.h;

        const x4 = x3 + this.x * width * 2;
        const x5 = x3 + this.z * width * 2;

        ctx.fillStyle = this.color;
        // ctx.lineWidth = 100;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#f7e7b3';
        // ctx.lineWidth = 100;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x5, y2);
        ctx.lineTo(x4, y3);
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();
        // ctx.fillRect(x1, y1, 1000, 500);
    }

    updateTime() {
        this.t += 0.005;

        if (this.t >= 1) {
            this.t = 1;
            this.u += 0.005;
            if (this.u >= 1) {
                this.t = 0;
                this.u = 0;
            }
        }
    }

    draw = (context) => {
        this.drawBaseLayer(context);
    };

    update = () => {
        this.updateTime();
        this.x = cubicInOut(this.t);
        this.z = cubicInOut(this.u);
    };
}

export default Pyramid;
