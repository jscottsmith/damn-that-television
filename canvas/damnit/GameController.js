import { GameEvents } from './GameEvents';

const initialState = {
    lives: 3,
    hitPower: 3,
    maxHitPower: 3,
    shieldPower: 5,
    maxShieldPower: 5,
};

export default class GameController {
    constructor(gameInterface) {
        this.gameInterface = gameInterface;

        this.state = initialState;
    }

    subscribe(eventPublisher) {
        eventPublisher.subscribe(GameEvents.PLAYER_HIT, this.handlePlayerHit);
        eventPublisher.subscribe(GameEvents.SHIELD_HIT, this.handleShieldHit);
        eventPublisher.subscribe(
            GameEvents.RESET_PLAYER_STATE,
            this.handleResetPlayer,
        );
        this.eventPublisher = eventPublisher;
    }

    setState(nextState) {
        this.state = Object.assign({}, this.state, nextState);
    }

    handleShieldHit = () => {
        this.decrementShieldPower();
    };

    handlePlayerHit = () => {
        this.decrementLifePower();
    };

    handleResetPlayer = () => {
        this.setState({
            shieldPower: initialState.shieldPower,
            hitPower: initialState.hitPower,
        });
    };

    resetLevel() {
        // @TODO
    }

    resetGame() {
        // @TODO
    }

    decrementShieldPower() {
        const state = this.state;

        if (state.shieldPower > 1) {
            state.shieldPower = this.state.shieldPower - 1;
        } else if (state.shieldPower === 1) {
            state.shieldPower = this.state.shieldPower - 1;
            this.eventPublisher.publish(GameEvents.SHIELD_DOWN);
        }

        this.setState(state);
    }

    decrementLifePower() {
        const state = this.state;
        const hasPower = this.state.hitPower > 0;
        const hasLives = this.state.lives > 1;

        if (hasPower) {
            --state.hitPower;
            // lose hit power
        } else if (hasLives) {
            // reset power
            state.hitPower = state.maxPower;
            // decrease life
            --state.lives;

            this.eventPublisher.publish(GameEvents.PLAYER_DEAD);
        } else {
            --state.lives;

            this.eventPublisher.publish(GameEvents.PLAYER_DEAD);
            // @TODO trigger game over
        }

        this.setState(state);
    }
}
