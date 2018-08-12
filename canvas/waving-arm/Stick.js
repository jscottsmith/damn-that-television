import { Entity } from '@gush/candybar';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Stick
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class Stick extends Entity {
    constructor({ p1, p2 }) {
        super();
        this.p1 = p1;
        this.p2 = p2;
        this.restingDist = p1.distance(p2);
        this.iterations = Array(2).fill(null); // more solutions per frame, more accurate
    }

    solveLinks() {
        // verlet relax constraints solution
        // solve multiple time for accuracy
        const { restingDist, p1, p2, iterations } = this;

        iterations.forEach(() => {
            // console.log(restingDist);
            const currentDist = p1.distance(p2);
            const [diffX, diffY] = p2.delta(p1);

            // difference scalar
            const diff = restingDist - currentDist;
            const percent = diff / currentDist / 2;

            // translation for each axis
            // pushed 1/2 the required distance to match their resting distances.
            const translateX = diffX * percent;
            const translateY = diffY * percent;

            if (p1.isFixed) {
                p2.move(-translateX * 2, -translateY * 2);
                p2.applyForce(-translateX * 2, -translateY * 2);
            } else if (p2.isFixed) {
                p1.move(translateX * 2, translateY * 2);
                p1.applyForce(translateX * 2, translateY * 2);
            } else {
                p1.move(translateX, translateY);
                p1.applyForce(translateX * 2, translateY * 2);
                p2.move(-translateX, -translateY);
                p2.applyForce(-translateX * 2, -translateY * 2);
            }
        });
    }

    update = () => {
        if (this.p1.isFixed && this.p2.isFixed) return;
        this.solveLinks();
    };
}

export default Stick;
