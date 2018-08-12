import { Point, Bounds, Segment } from '@gush/candybar';

export default class SceneBounds extends Bounds {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.segments = [
            new Segment(new Point(x, y), new Point(x + w, y)),
            new Segment(new Point(x + w, y), new Point(x + w, y + h)),
            new Segment(new Point(x + w, y + h), new Point(x, y + h)),
            new Segment(new Point(x, y + h), new Point(x, y)),
        ];
    }

    draw = ({ ctx }) => {
        ctx.beginPath();
        this.segments.forEach((seg, i) => {
            if (i === 0) {
                ctx.moveTo(...seg.p1.position);
                ctx.lineTo(...seg.p2.position);
            } else {
                ctx.lineTo(...seg.p2.position);
            }
        });
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    update = () => {};
}
