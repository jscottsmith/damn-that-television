import { actionTypes } from '../constants/actionTypes';

export const hitPlayer = {
    type: actionTypes.PLAYER_HIT,
};

export const hitShield = {
    type: actionTypes.PLAYER_SHIELD_HIT,
};

export const resetPlayerState = {
    type: actionTypes.RESET_PLAYER_STATE_AFTER_DEATH,
};

export const resetGameState = {
    type: actionTypes.RESET_GAME_STATE,
};
