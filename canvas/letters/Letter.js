import { Point, Bounds, utils } from '@gush/candybar';

export default class Letter {
    constructor({ point, letter, radius }) {
        this.point = point;
        this.letter = letter.toUpperCase();
        this.radius = radius;
        this.width = radius * 2;
        this.height = radius * 2;
        this.center = new Point(radius, radius);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.rotation = utils.getRandomFloat(-Math.PI, Math.PI);
        // state for scene
        this.entered = false;
        this.dead = false;

        this.bounds = new Bounds(
            point.x - radius,
            point.y - radius,
            this.width,
            this.height,
        );

        this.drawLocal();
    }

    drawLocal = () => {
        const { ctx, radius } = this;

        ctx.fillStyle = 'black';
        // ctx.fillRect(0, 0, 100, 100);

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(this.rotation);

        // ctx.beginPath();
        // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowColor = '#665b85';
        ctx.shadowOffsetX = this.radius / 6;
        ctx.shadowOffsetY = this.radius / 6;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${radius * 1.3}px futura-pt `;
        ctx.fillStyle = '#72dbde';
        ctx.fillText(this.letter, 0, 0);

        ctx.restore();
    };

    update = (context) => {
        this.point.update();
        const [dx, dy] = this.point.delta();
        this.bounds.move(dx, dy);
    };

    draw = ({ ctx }) => {
        ctx.save();
        ctx.translate(-this.radius, -this.radius);
        ctx.drawImage(
            this.canvas,
            this.point.x,
            this.point.y,
            this.width,
            this.height,
        );
        ctx.restore();
    };
}
