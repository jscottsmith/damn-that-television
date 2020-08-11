import { Entity } from '@gush/candybar';

class Background extends Entity {
  drawBG({ ctx, bounds }) {
    ctx.clearRect(...bounds.params);
  }

  draw = (context) => {
    this.drawBG(context);
  };
}

export default Background;
