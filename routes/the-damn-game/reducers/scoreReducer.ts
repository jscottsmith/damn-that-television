import { actionTypes } from '../constants/actionTypes';

const initialState = {
  kills: 0,
  points: 0,
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ENEMY_KILLED: {
      const { score } = action.payload;

      return {
        ...state,
        kills: state.kills + 1,
        points: state.points + score,
      };
    }

    case actionTypes.RESET_GAME_STATE: {
      return initialState;
    }

    default:
      return state;
  }
}
