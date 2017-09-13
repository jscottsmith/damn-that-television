import { clamp } from './gameUtils.js';

export default class Circle {
    constructor() {
        this.cx = 0;
        this.cy = 0;
        this.r = 0;
    }

    hitTest(a, b = this) {
        // https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
        // Find the closest point to the circle B within the Rect A
        const closestX = clamp(b.cx, a.x, a.x + a.w);
        const closestY = clamp(b.cy, a.y, a.y + a.h);

        // Calculate the distance between the circle's center and this closest point
        const distanceX = b.cx - closestX;
        const distanceY = b.cy - closestY;

        // If the distance is less than the circle's radius, an intersection occurs
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;

        return distanceSquared < b.r * b.r;
    }
}
