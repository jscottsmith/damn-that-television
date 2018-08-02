import { Point } from '@gush/candybar';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// PointPhysics
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class PointPhysics extends Point {
    constructor({ x, y, mass, isFixed }) {
        super(x, y);
        this.vx = 0; // velocity x
        this.vy = 0; // velocity y
        this.fx = 0; // force x
        this.fy = 0; // force y
        this.mass = mass;
        this.isFixed = isFixed;

        const DPR = devicePixelRatio || 1;
        this.MOUSE_STRENGTH = 0.25; // 0 - 1
        this.MOUSE_RADIUS = 100 * DPR;
    }

    applyForce(x, y) {
        this.fx += x;
        this.fy += y;
    }

    applyForceFromMouse(pointer) {
        const distance = this.distance(pointer.position);

        if (distance < this.MOUSE_RADIUS) {
            const [dx, dy] = pointer.delta();
            const power =
                (1 - distance / this.MOUSE_RADIUS) * this.MOUSE_STRENGTH;

            this.applyForce(dx * power, dy * power);
        }
    }

    solveVelocity() {
        if (this.fx === 0 && this.fy === 0) return;

        // acceleration = force / mass;
        const ax = this.fx / this.mass;
        const ay = this.fy / this.mass;

        // velocity + acceleration
        this.vx += ax;
        this.vy += ay;

        this.x += this.vx;
        this.y += this.vy;

        // reset any applied forces
        this.fx = 0;
        this.fy = 0;
    }

    update = ({ pointer, tick }) => {
        if (this.isFixed) return;
        this.applyForceFromMouse(pointer);
        this.solveVelocity();
    };

    draw = ({ ctx }) => {
        const { x, y } = this;
        ctx.fillStyle = 'white';
        ctx.lineWidth = 5;
        ctx.fillRect(x - 2, y - 2, 4, 4);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
}

export default PointPhysics;
