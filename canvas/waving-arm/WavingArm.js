import { Entity } from '@gush/candybar';
import Arm from './Arm';
import Hand from './Hand';
import Hole from './Hole';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// WavingArm
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class WavingArm extends Entity {
    constructor({ position, width, height, color, force, isLeft, holeColor }) {
        super();

        this.resolution = this.toValue(window.innerHeight / 60);

        this.arm = new Arm({
            color,
            holeColor,
            width,
            height,
            position,
            force,
            resolution: this.resolution,
        });

        const i = this.arm.spine.length - 1;

        this.hand = new Hand({
            p1: this.arm.spine[i],
            p2: this.arm.spine[i - 1],
            isLeft,
            width: width * 3.2,
        });

        this.hole = new Hole({
            p1: this.arm.spine[0],
            p2: this.arm.spine[1],
            color: holeColor,
            width: width * 2,
            height: width / 2,
        });
    }

    draw = ({ ctx }) => {
        this.hole.draw({ ctx });
        this.arm.draw({ ctx });
        this.hand.draw({ ctx });
    };

    update = (context) => {
        this.arm.update(context);
        this.hand.update();
    };
}

export default WavingArm;
