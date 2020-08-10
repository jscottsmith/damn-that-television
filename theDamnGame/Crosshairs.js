const crosshairStates = {
  IDLE: 'IDLE',
  FIRING: 'FIRING',
};

export default class Crosshairs {
  constructor(size) {
    this.size = size;
  }

  setup({ dpr }) {
    this.dpr = dpr;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.w = this.size;
    this.h = this.size;
    this.x = this.w / 2;
    this.y = this.h / 2;

    this.canvas.width = this.w;
    this.canvas.height = this.h;

    // Initial state
    this.drawState = crosshairStates.IDLE;

    // Draws the current state based on event
    this.drawStates = {
      [crosshairStates.IDLE]: this.drawIdle,
      [crosshairStates.FIRING]: this.drawFiring,
    };

    this.draw();
  }

  setState = (state) => {
    this.drawState = state;
    this.draw();
  };

  drawLines(color) {
    const { x, y, w, h } = this;

    const lineLength = w / 2; // size of lines, not size of whole thing
    const inner = w / 3; // inner size, space between lines and center

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2 * this.dpr;
    this.ctx.beginPath();
    this.ctx.moveTo(x - lineLength, y);
    this.ctx.lineTo(x - lineLength + inner, y);
    this.ctx.stroke();
    this.ctx.moveTo(x + lineLength - inner, y);
    this.ctx.lineTo(x + lineLength, y);
    this.ctx.stroke();
    this.ctx.moveTo(x, y - lineLength);
    this.ctx.lineTo(x, y - lineLength + inner);
    this.ctx.stroke();
    this.ctx.moveTo(x, y + lineLength);
    this.ctx.lineTo(x, y + lineLength - inner);
    this.ctx.stroke();
  }

  drawIdle = () => {
    this.drawLines('#5143a0');
  };

  drawFiring = () => {
    this.drawLines('red');
  };

  draw() {
    const drawState = this.drawStates[this.drawState];
    drawState();
  }
}
