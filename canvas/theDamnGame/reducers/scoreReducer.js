import { actionTypes } from '../constants/actionTypes';

const initialPlayerState = {
    kills: 0,
    points: 0,
};

export default function playerReducer(state = initialPlayerState, action) {
    switch (action.type) {
        case actionTypes.ENEMY_KILLED: {
            return {
                kills: state.kills + 1,
                points: state.points + action.payload,
            };
        }
        default:
            return state;
    }
}
