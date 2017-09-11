export default class Box {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
    }

    hitTest(a, b = this) {
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
}
