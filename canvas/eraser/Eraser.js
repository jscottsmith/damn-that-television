import { Entity, Spring, utils, Point } from '@gush/candybar';
import { COLORS } from 'constants/app';
import loadImage from 'utils/loadImage';

const PATTERN_OK = '/static/pattern-ok.svg';

function loadAll(images) {
    const all = images.map((src) => loadImage(src));
    return Promise.all(all);
}

class Eraser {
    constructor({ setupCanvas }) {
        this.color = COLORS.softy;
        this.setupCanvas = setupCanvas;
        this.pattern = null;
        this.isDrawing = false;
    }

    createPattern(ctx, img, w, h) {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const context = canvas.getContext('2d');

        context.drawImage(img, 0, 0, w, h);

        return ctx.createPattern(canvas, 'repeat');
    }

    handleMousemove({ pointer: { position, lastPosition }, ctx, dpr }) {
        if (!position || !lastPosition || !this.pattern) return;

        const currentPoint = new Point(position.x, position.y);
        const dist = lastPosition.distance(currentPoint);
        const angle = lastPosition.angleRadians(currentPoint);
        const r = dpr * 50;
        const hs = r / 2;
        // ctx.globalCompositeOperation = 'source-over';

        for (var i = 0; i < dist; i += 5) {
            let x = lastPosition.x + Math.cos(angle) * i - 25;
            let y = lastPosition.y + Math.sin(angle) * i - 25;
            ctx.beginPath();
            ctx.arc(x + hs, y + hs, r, false, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = this.pattern;
            ctx.fill();
        }
    }

    setup = ({ canvas, dpr, ctx }) => {
        this.setupCanvas();
        loadImage(PATTERN_OK).then((image) => {
            const w = 300 * dpr;
            const h = 300 * dpr;
            this.pattern = this.createPattern(ctx, image, w, h);
        });
    };

    draw = (context) => {
        this.handleMousemove(context);
    };
}

export default Eraser;
