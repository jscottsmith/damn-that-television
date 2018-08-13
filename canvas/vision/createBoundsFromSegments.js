import { Bounds, Point } from '@gush/candybar';

export default function createBoundsFromSegments(segments) {
    // reduce to points
    const points = segments.reduce((acc, cur) => {
        acc.push(cur.p1);
        acc.push(cur.p2);
        return acc;
    }, []);

    // reduce to single min and max point
    const minP = points.reduce((acc, cur) => getMinFromPoints(acc, cur));
    const maxP = points.reduce((acc, cur) => getMaxFromPoints(acc, cur));

    const [width, height] = minP.delta(maxP);
    const bounds = new Bounds(minP.x, minP.y, width, height);

    return bounds;
}

function getMinFromPoints(p1, p2) {
    let x = Math.min(p1.x, p2.x);
    let y = Math.min(p1.y, p2.y);
    return new Point(x, y);
}

function getMaxFromPoints(p1, p2) {
    let x = Math.max(p1.x, p2.x);
    let y = Math.max(p1.y, p2.y);
    return new Point(x, y);
}
