import { GameEvents } from './GameEvents';

export default class GameController {
    constructor(gameInterface) {
        this.gameInterface = gameInterface;

        this.state = {
            lives: 3,
            hitPower: 10,
            maxPower: 10,
        };
    }

    subscribe(eventPublisher) {
        eventPublisher.subscribe(GameEvents.PLAYER_HIT, this.handleHit);
        // eventPublisher.subscribe(GameEvents.UPDATE_SCORE, this.startLevel);
        this.eventPublisher = eventPublisher;
    }

    setState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
    }

    handleHit = () => {
        this.decrementPower();
    };

    resetLevel() {
        // @TODO
    }

    resetGame() {
        // @TODO
    }

    decrementPower() {
        const nextState = this.state;
        const hasPower = this.state.hitPower > 0;
        const hasLives = this.state.lives > 1;

        if (hasPower) {
            --this.state.hitPower;
            // lose hit power
        } else if (hasLives) {
            // reset power
            this.state.hitPower = this.state.maxPower;
            // decrease life
            --this.state.lives;

            this.eventPublisher.publish(GameEvents.PLAYER_DEAD);
        } else {
            --this.state.lives;
            // @TODO trigger game over
        }

        this.setState(nextState);
    }
}
