export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getAngleDeg(x0, y0, x1, y1) {
    // degrees = atan2(deltaY, deltaX) * (180 / PI)
    const y = y1 - y0;
    const x = x1 - x0;
    return Math.atan2(y, x) * (180 / Math.PI);
}

export function getAngleRadians(x0, y0, x1, y1) {
    // radians = atan2(deltaY, deltaX)
    const y = y1 - y0;
    const x = x1 - x0;
    return Math.atan2(y, x);
}

export function movePointAtAngle(point, radian, distance) {
    return {
        x: point.x - Math.cos(radian) * distance,
        y: point.y - Math.sin(radian) * distance,
    };
}

export function clamp(number, min, max) {
    return Math.max(min, Math.min(number, max));
}

export function aabb2DIntersection(a, b) {
    if (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.h + a.y > b.y
    ) {
        return true;
    }
    return false;
}

export function circleRectIntersection(a, b) {
    // this.cx = 0;
    // this.cy = 0;
    // this.r = 0;
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
