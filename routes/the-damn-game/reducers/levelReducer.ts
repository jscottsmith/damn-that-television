import { actionTypes } from '../constants/actionTypes';

const initialState = {
  currentLevel: 0,
};

export default function levelReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NEXT_LEVEL: {
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
      };
    }

    default:
      return state;
  }
}
