import { actionTypes } from '../constants/actionTypes';

const initialState = {
    kills: 0,
    points: 0,
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ENEMY_KILLED: {
            return {
                kills: state.kills + 1,
                points: state.points + action.payload,
            };
        }
        case actionTypes.RESET_GAME_STATE: {
            return initialState;
        }
        default:
            return state;
    }
}
