import { actionTypes } from '../constants/actionTypes';

const initialState = {
    pointerDown: false,
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.POINTER_DOWN: {
            return { pointerDown: true };
        }

        case actionTypes.POINTER_UP: {
            return {
                pointerDown: false,
            };
        }

        default:
            return state;
    }
}
