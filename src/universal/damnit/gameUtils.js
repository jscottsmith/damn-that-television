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
