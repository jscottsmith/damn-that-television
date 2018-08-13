import pointGenerator from './pointGenerator';
import { Point } from '@gush/candybar';

export default function randomPositionOutsideBounds(bounds, itemBounds) {
    const randPt = pointGenerator(bounds);
    const [dx, dy] = randPt.delta(bounds.center);
    const axisHorizontal = dx <= dy;

    let x = randPt.x;
    let y = randPt.y;
    // debugger;
    if (axisHorizontal) {
        if (randPt.x <= bounds.center.x) {
            // left of center
            x = bounds.x - itemBounds.w;
        }
        if (randPt.x > bounds.center.x) {
            // right of center
            x = bounds.x + bounds.w;
        }
    } else {
        if (randPt.y <= bounds.center.x) {
            // above center
            y = bounds.y - itemBounds.h;
        }
        if (randPt.y > bounds.center.x) {
            // below center
            y = bounds.y + bounds.h;
        }
    }

    return new Point(x, y);
}
