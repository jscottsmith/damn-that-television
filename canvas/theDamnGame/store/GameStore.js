import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const hasWindow = typeof window === 'object';

let store = {};

if (hasWindow) {
    const isDev = process.env.NODE_ENV === 'development';

    const devTools =
        isDev &&
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__();

    store = createStore(rootReducer, devTools);
}

export default store;
