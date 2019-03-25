import { actionTypes } from '../constants/actionTypes';

const initialPlayerState = {
    lives: 3,
    hitPower: 3,
    maxHitPower: 3,
    shieldPower: 5,
    maxShieldPower: 5,
};

export default function playerReducer(state = initialPlayerState, action) {
    switch (action.type) {
        case actionTypes.PLAYER_HIT: {
            return { ...state, hitPower: state.hitPower - 1 };
        }

        case actionTypes.PLAYER_SHIELD_HIT: {
            return {
                ...state,
                shieldPower: state.shieldPower - 1,
            };
        }

        case actionTypes.RESET_PLAYER_STATE_AFTER_DEATH: {
            return {
                ...state,
                shieldPower: initialPlayerState.shieldPower,
                hitPower: initialPlayerState.hitPower,
                lives: state.lives - 1,
            };
        }

        default:
            return state;
    }
}
