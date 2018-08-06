import { Entity } from '@gush/candybar';
import getSightPolygon from './src/rays';
import Projector from './Projector';

export default class Vision extends Entity {
    constructor() {
        super();
        const w = this.toValue(window.innerWidth) * 1.1;
        const h = this.toValue(window.innerHeight) * 1.1;
        this.projector = new Projector({
            width: w / 20,
            x: w / 2,
            y: h - h * 0.6,
        });
        this.w = w;
        this.h = h;
        this.segments = [
            // Border
            { a: { x: 0, y: 0 }, b: { x: w, y: 0 } },
            { a: { x: w, y: 0 }, b: { x: w, y: h } },
            { a: { x: w, y: h }, b: { x: 0, y: h } },
            { a: { x: 0, y: h }, b: { x: 0, y: 0 } },
            // Polygon #1
            { a: { x: 100, y: 150 }, b: { x: 120, y: 50 } },
            { a: { x: 120, y: 50 }, b: { x: 200, y: 80 } },
            { a: { x: 200, y: 80 }, b: { x: 140, y: 210 } },
            { a: { x: 140, y: 210 }, b: { x: 100, y: 150 } },
            // Polygon #2
            { a: { x: 100, y: 200 }, b: { x: 120, y: 250 } },
            { a: { x: 120, y: 250 }, b: { x: 60, y: 300 } },
            { a: { x: 60, y: 300 }, b: { x: 100, y: 200 } },

            // Polygon #2
            { a: { x: 100, y: h - 200 }, b: { x: 120, y: h - 250 } },
            { a: { x: 120, y: h - 250 }, b: { x: 60, y: h - 300 } },
            { a: { x: 60, y: h - 300 }, b: { x: 100, y: h - 200 } },
            // Polygon #3
            { a: { x: 200, y: 260 }, b: { x: 220, y: 150 } },
            { a: { x: 220, y: 150 }, b: { x: 300, y: 200 } },
            { a: { x: 300, y: 200 }, b: { x: 350, y: 320 } },
            { a: { x: 350, y: 320 }, b: { x: 200, y: 260 } },
            // Polygon #4
            { a: { x: 540, y: 60 }, b: { x: 560, y: 40 } },
            { a: { x: 560, y: 40 }, b: { x: 570, y: 70 } },
            { a: { x: 570, y: 70 }, b: { x: 540, y: 60 } },
            // Polygon #5
            { a: { x: 650, y: 190 }, b: { x: 760, y: 170 } },
            { a: { x: 760, y: 170 }, b: { x: 740, y: 270 } },
            { a: { x: 740, y: 270 }, b: { x: 630, y: 290 } },
            { a: { x: 630, y: 290 }, b: { x: 650, y: 190 } },
            // Polygon #6
            { a: { x: 600, y: 95 }, b: { x: 780, y: 50 } },
            { a: { x: 780, y: 50 }, b: { x: 680, y: 150 } },
            { a: { x: 680, y: 150 }, b: { x: 600, y: 95 } },

            { a: { x: w - 600, y: h - 95 }, b: { x: w - 780, y: h - 50 } },
            { a: { x: w - 780, y: h - 50 }, b: { x: w - 680, y: h - 150 } },
            { a: { x: w - 680, y: h - 150 }, b: { x: w - 600, y: h - 95 } },

            { a: { x: w - 650, y: h - 190 }, b: { x: w - 760, y: h - 170 } },
            { a: { x: w - 760, y: h - 170 }, b: { x: w - 740, y: h - 270 } },
            { a: { x: w - 740, y: h - 270 }, b: { x: w - 630, y: h - 290 } },
            { a: { x: w - 630, y: h - 290 }, b: { x: w - 650, y: h - 190 } },
        ];
    }

    getGradient(ctx, center, norm) {
        const radius = Math.max(this.w, this.h);
        const rx = center.x;
        const ry = center.y;
        const gradient = ctx.createRadialGradient(rx, ry, radius, rx, ry, 0);
        const alpha = 0.8 * norm;
        gradient.addColorStop(1, `rgba(244, 200, 219, ${alpha})`);
        gradient.addColorStop(0, 'rgba(244, 200, 219, 0)');
        return gradient;
    }

    drawSegments(ctx) {
        const mouse = this.projector.source;
        const angle = this.projector.angle;
        const norm = this.projector.norm || 0;
        const spread = (Math.PI / 3) * (1 - norm) + 0.1;

        // Sight Polygons
        var polygon = getSightPolygon(
            mouse.x,
            mouse.y,
            this.segments,
            angle,
            spread,
        );
        // console.log(polygon);
        if (polygon.length) {
            drawPolygon(polygon, ctx, this.getGradient(ctx, mouse, norm));
        }

        this.segments.forEach((seg) => {
            ctx.strokeStyle = '#72dbde';
            ctx.beginPath();
            ctx.moveTo(seg.a.x, seg.a.y);
            ctx.lineTo(seg.b.x, seg.b.y);
            ctx.stroke();
        });
    }

    draw = ({ ctx, pointer: { position: Mouse } }) => {
        this.projector.draw({ ctx });
        this.drawSegments(ctx);
    };

    update = ({ pointer }) => {
        this.projector.update({ pointer });
    };
}

function drawPolygon(polygon, ctx, fillStyle) {
    ctx.fillStyle = fillStyle;

    ctx.beginPath();
    ctx.moveTo(polygon[0].x, polygon[0].y);
    for (var i = 1; i < polygon.length; i++) {
        var intersect = polygon[i];
        ctx.lineTo(intersect.x, intersect.y);
    }
    ctx.fill();

    // polygon.forEach((point) => {
    //     ctx.fillStyle = 'red';
    //     ctx.beginPath();
    //     ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    //     ctx.fill();
    // });
}
