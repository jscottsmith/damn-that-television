import { Entity, Point } from '@gush/candybar';
import Arm from './Arm';
import Hand from './Hand';
import Hole from './Hole';

//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// WavingArm
//* ‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class WavingArm extends Entity {
  constructor(config) {
    super();
    this.color = config.color;
    this.force = config.force;
    this.isLeft = config.isLeft;
    this.holeColor = config.holeColor;
    this.getPosition = config.getPosition;
  }

  updateFade(canvas) {
    if (this.fade < 1) {
      this.fade += 0.1;
    } else {
      this.fade = 1;
    }
    canvas.style.opacity = this.fade;
  }

  setupArm = (context) => {
    const { color, force, isLeft, holeColor } = this;

    const resolution = this.toValue(window.innerHeight / 60);

    const { x, y, w, h } = this.getPosition(context);

    this.fade = 0;

    this.arm = new Arm({
      color,
      holeColor,
      width: w,
      height: h,
      position: new Point(x, y),
      force,
      resolution,
    });

    const i = this.arm.spine.length - 1;

    this.hand = new Hand({
      p1: this.arm.spine[i],
      p2: this.arm.spine[i - 1],
      isLeft,
      width: w * 3.2,
    });

    this.hole = new Hole({
      p1: this.arm.spine[0],
      p2: this.arm.spine[1],
      color: holeColor,
      width: w * 2,
      height: w / 2,
    });
  };

  setup = (context) => this.setupArm(context);

  resize = (context) => this.setupArm(context);

  draw = ({ ctx }) => {
    this.hole.draw({ ctx });
    this.arm.draw({ ctx });
    this.hand.draw({ ctx });
  };

  update = (context) => {
    this.updateFade(context.canvas);
    this.arm.update(context);
    this.hand.update();
  };
}

export default WavingArm;
