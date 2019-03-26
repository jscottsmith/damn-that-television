import { actionTypes } from '../constants/actionTypes';

export const updateScore = (score) => ({
    type: actionTypes.ENEMY_KILLED,
    payload: score,
});
