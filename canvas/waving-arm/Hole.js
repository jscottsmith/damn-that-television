import { Entity } from '@gush/candybar';

//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Hole
//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Hole extends Entity {
    constructor({ p1, p2, width, height, color }) {
        super();
        this.width = width;
        this.height = height;
        this.color = color;
        this.p1 = p1;
        this.p2 = p2;

        this.ellipseParams = [
            this.p1.x,
            this.p1.y,
            this.width,
            this.height,
            0,
            Math.PI * 2,
            false,
        ];
    }

    draw = ({ ctx }) => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(...this.ellipseParams);
        ctx.closePath();
        ctx.fill();
    };

    update = (context) => {};
}

export default Hole;
