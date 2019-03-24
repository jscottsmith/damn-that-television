const X_OFFSET = 10;
const Y_OFFSET = 10;
const IMAGE_WIDTH = 20;
const BAR_WIDTH = 200;
const BAR_HEIGHT = 6;

export default class GameInterface {
    constructor(gameController, gameAssets) {
        this.dpr = window.devicePixelRatio;
        this.gameController = gameController;
        this.gameAssets = gameAssets;
    }

    drawLives({ ctx }) {
        const { pizza } = this.gameAssets.images;
        const { lives } = this.gameController.state;

        let i = lives;

        while (i > 0) {
            const x = ((i - 1) * IMAGE_WIDTH + X_OFFSET) * this.dpr;
            const y = Y_OFFSET * this.dpr;
            ctx.fillStyle = 'slategray';
            ctx.drawImage(
                pizza,
                x,
                y,
                IMAGE_WIDTH * this.dpr,
                IMAGE_WIDTH * this.dpr,
            );
            i--;
        }
    }

    drawPowerImage({ ctx }) {
        // const { hitPower } = this.gameController.state;
        // if (!hitPower) return;

        const { life } = this.gameAssets.images;
        const x = X_OFFSET * this.dpr;
        const y = (Y_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const w = IMAGE_WIDTH * this.dpr;
        const h = IMAGE_WIDTH * this.dpr;
        ctx.drawImage(life, x, y, w, h);
    }

    drawPower({ ctx }) {
        const { hitPower, maxHitPower } = this.gameController.state;
        const fullW = BAR_WIDTH * this.dpr;
        const x = (X_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const y = (Y_OFFSET * 2 + IMAGE_WIDTH * 1.5) * this.dpr;
        const w = (hitPower / maxHitPower) * fullW;
        const h = BAR_HEIGHT * this.dpr;

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x, y, fullW, h);
    }

    drawShieldImage({ ctx }) {
        // const { shieldPower } = this.gameController.state;
        // if (!shieldPower) return;

        const { shield } = this.gameAssets.images;
        const x = X_OFFSET * this.dpr;
        const y = (Y_OFFSET * 3 + IMAGE_WIDTH * 2) * this.dpr;
        const w = IMAGE_WIDTH * this.dpr;
        const h = IMAGE_WIDTH * this.dpr;
        ctx.drawImage(shield, x, y, w, h);
    }

    drawShield({ ctx }) {
        const { shieldPower, maxShieldPower } = this.gameController.state;
        const fullW = BAR_WIDTH * this.dpr;
        const x = (X_OFFSET * 2 + IMAGE_WIDTH) * this.dpr;
        const y = (Y_OFFSET * 3 + IMAGE_WIDTH * 2.5) * this.dpr;
        const w = (shieldPower / maxShieldPower) * fullW;
        const h = BAR_HEIGHT * this.dpr;

        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(x, y, fullW, h);
    }

    draw = (context) => {
        this.drawLives(context);
        this.drawPowerImage(context);
        this.drawPower(context);
        this.drawShieldImage(context);
        this.drawShield(context);
    };
}
