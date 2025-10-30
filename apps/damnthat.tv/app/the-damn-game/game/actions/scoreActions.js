import { actionTypes } from '../constants/actionTypes';

export const updateScore = (score, level) => ({
  type: actionTypes.ENEMY_KILLED,
  payload: { score, level },
});
