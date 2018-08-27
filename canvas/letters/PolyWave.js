import { Entity, Spring, utils } from '@gush/candybar';

const { getRandomInt, getRandomFloat } = utils;

class PolyWave extends Entity {
    constructor({ verts, color, elasticity, damping }) {
        super();
        this.verts = verts; // corners
        this.color = color;
        this.resolution = this.toValue(10);
        this.elasticity = elasticity;
        this.damping = damping;

        this.points = []; // spring points
        this.constructPolyWave();
        this.setAttractors();
    }

    constructPolyWave() {
        for (let i = 0; i < this.verts.length; i++) {
            const p1 = this.verts[i];
            const p2 = this.verts[i + 1];

            if (p1 && p2) {
                const [dx, dy] = p1.point.delta(p2.point);
                const distance = p1.point.distance(p2.point);
                const amount = distance / this.resolution;
                const pointAmt = Math.round(amount);

                const offX = dx / pointAmt;
                const offY = dy / pointAmt;

                if (p1.isSpring) {
                    for (let k = 1; k <= pointAmt; k++) {
                        // debugger;
                        const x = p1.point.x + offX * k;
                        const y = p1.point.y + offY * k;
                        const point = new Spring({
                            x,
                            y,
                            elasticity: this.elasticity,
                            damping: this.damping,
                            isFixed: k === 0 || k === pointAmt,
                        });
                        this.points.push(point);
                    }
                } else {
                    this.points.push(
                        new Spring({
                            x: p2.point.x,
                            y: p2.point.y,
                            isFixed: true,
                        }),
                    );
                }
            }
        }
    }

    setAttractors() {
        this.points.forEach((p, i) => {
            const isLast = i === this.points.length - 1;
            const isFirst = i === 0;
            if (isLast) {
                const prevPoint = this.points[i - 1];
                const nextPoint = this.points[0];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
            } else if (isFirst) {
                const prevPoint = this.points[this.points.length - 1];
                const nextPoint = this.points[i + 1];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
            } else {
                const prevPoint = this.points[i - 1];
                const nextPoint = this.points[i + 1];
                !p.isFixed && p.addAttractor(prevPoint);
                !p.isFixed && p.addAttractor(nextPoint);
            }
        });
    }

    draw = ({ ctx, bounds }) => {
        ctx.beginPath();

        this.points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });

        ctx.closePath();

        ctx.fillStyle = this.color;

        ctx.lineWidth = this.toValue(2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        console.log('d');

        ctx.fill();
    };

    update = (context) => {
        this.points.forEach((point) => {
            point.update(context);
        });
    };
}

export default PolyWave;
