import { actionTypes } from '../constants/actionTypes';

const initialState = {
    pointerDown: false,
    arrowLeftDown: false,
    arrowRightDown: false,
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.POINTER_DOWN: {
            return { ...state, pointerDown: true };
        }
        case actionTypes.POINTER_UP: {
            return { ...state, pointerDown: false };
        }
        case actionTypes.ARROW_LEFT_DOWN: {
            return { ...state, arrowLeftDown: true };
        }
        case actionTypes.ARROW_LEFT_UP: {
            return { ...state, arrowLeftDown: false };
        }
        case actionTypes.ARROW_RIGHT_DOWN: {
            return { ...state, arrowRightDown: true };
        }
        case actionTypes.ARROW_RIGHT_UP: {
            return { ...state, arrowRightDown: false };
        }

        default:
            return state;
    }
}
