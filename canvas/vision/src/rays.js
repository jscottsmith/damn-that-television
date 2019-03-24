// https://github.com/ncase/sight-and-light

// Find intersection of RAY & SEGMENT
function getIntersection(ray, segment) {
    // RAY in parametric: Point + Delta*T1
    const r_px = ray.a.x;
    const r_py = ray.a.y;
    const r_dx = ray.b.x - ray.a.x;
    const r_dy = ray.b.y - ray.a.y;
    // SEGMENT in parametric: Point + Delta*T2
    const s_px = segment.a.x;
    const s_py = segment.a.y;
    const s_dx = segment.b.x - segment.a.x;
    const s_dy = segment.b.y - segment.a.y;
    // Are they parallel? If so, no intersect
    const r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
    const s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);
    if (r_dx / r_mag == s_dx / s_mag && r_dy / r_mag == s_dy / s_mag) {
        // Unit vectors are the same.
        return null;
    }
    // SOLVE FOR T1 & T2
    // r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
    // ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
    // ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
    // ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
    const T2 =
        (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) /
        (s_dx * r_dy - s_dy * r_dx);
    const T1 = (s_px + s_dx * T2 - r_px) / r_dx;
    // Must be within parametic whatevers for RAY/SEGMENT
    if (T1 < 0) return null;
    if (T2 < 0 || T2 > 1) return null;
    // Return the POINT OF INTERSECTION
    return {
        x: r_px + r_dx * T1,
        y: r_py + r_dy * T1,
        param: T1,
    };
}

const within = (min, max, val) => val > min && val < max;

function wrap(min, max, value) {
    const maxLessMin = max - min;
    return ((((value - min) % maxLessMin) + maxLessMin) % maxLessMin) + min;
}

export default function getSightPolygon(
    sightX,
    sightY,
    segments,
    originAngle,
    spread,
) {
    // Reduce segments to points
    const points = segments.reduce((acc, cur) => [...acc, cur.a, cur.b], []);

    // Get all angles
    // Normalize based on PI and spread, so that all angles will be positive.
    // this makes it easy to determine if an angle is within a given range (spread)

    const pi = Math.PI;
    const normMin = pi;
    const norm = pi + spread;
    const normMax = pi + spread * 2;

    // get unique points
    const uniquePoints = ((points) => {
        const set = {};
        return points.filter((p) => {
            const key = `${p.x},${p.y}`;
            if (key in set) {
                return false;
            }
                set[key] = true;
                return true;

        });
    })(points);

    // include min and max so the entire range is illuminated
    const uniqueAngles = [normMin, normMax];

    uniquePoints.forEach((point) => {
        const angle = Math.atan2(point.y - sightY, point.x - sightX);
        // point.angle = angle;

        // first wrap it and adjust for the origin angle,
        // then add the normalization
        const normAngle = wrap(-pi, pi, angle - originAngle) + norm;

        if (within(normMin, normMax, normAngle)) {
            uniqueAngles.push(
                normAngle - 0.00001,
                normAngle,
                normAngle + 0.00001,
            );
        }
    });

    // RAYS IN ALL DIRECTIONS
    // inludes the sight origin since were using a focal point
    const sightOrigin = { x: sightX, y: sightY };

    const intersects = [];

    for (let j = 0; j < uniqueAngles.length; j++) {
        // removes the normalization based on origin, pi, and spread
        const angle = uniqueAngles[j] + originAngle - norm;
        // Calculate dx & dy from angle
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);
        // Ray from center of screen to mouse
        const ray = {
            a: { x: sightX, y: sightY },
            b: { x: sightX + dx, y: sightY + dy },
        };
        // Find CLOSEST intersection
        const closestIntersect = null;
        for (let i = 0; i < segments.length; i++) {
            const intersect = getIntersection(ray, segments[i]);
            if (!intersect) continue;
            if (!closestIntersect || intersect.param < closestIntersect.param) {
                closestIntersect = intersect;
            }
        }
        // Intersect angle
        if (!closestIntersect) continue;
        closestIntersect.angle = angle;
        // Add to list of intersects
        intersects.push(closestIntersect);
    }

    // Sort intersects by angle
    // Polygon is intersects, in order of angle
    const sorted = intersects.sort(function(a, b) {
        return a.angle - b.angle;
    });

    return [sightOrigin, ...sorted];
}
