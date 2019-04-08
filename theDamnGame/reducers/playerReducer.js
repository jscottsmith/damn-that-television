import { actionTypes } from '../constants/actionTypes';
import weaponTypes from '../constants/weaponTypes';

const initialPlayerState = {
    lives: 3,
    hitPower: 3,
    maxHitPower: 3,
    shieldPower: 5,
    maxShieldPower: 5,
    weapon: weaponTypes.FIST,
};

export default function playerReducer(state = initialPlayerState, action) {
    switch (action.type) {
        case actionTypes.PLAYER_HIT: {
            return {
                ...state,
                hitPower: state.hitPower - 1,
                weapon: weaponTypes.FIST,
            };
        }

        case actionTypes.PLAYER_SHIELD_HIT: {
            return {
                ...state,
                shieldPower: state.shieldPower - 1,
            };
        }

        case actionTypes.WEAPON_POWER_UP: {
            return {
                ...state,
                weapon: action.weaponType,
            };
        }

        case actionTypes.RESET_PLAYER_STATE_AFTER_DEATH: {
            return {
                ...state,
                shieldPower: initialPlayerState.shieldPower,
                hitPower: initialPlayerState.hitPower,
                weapon: weaponTypes.FIST,
                lives: state.lives - 1,
            };
        }

        case actionTypes.RESET_GAME_STATE: {
            return initialPlayerState;
        }

        default:
            return state;
    }
}
