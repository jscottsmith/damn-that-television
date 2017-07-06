import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import {
    // ConnectedRouter,
    routerReducer,
    routerMiddleware,
} from 'react-router-redux';

import * as Reducers from './reducers/index.js';

export default history => {
    const PROD = process.env.NODE_ENV === 'production';

    const middleware = routerMiddleware(history);

    const enhancers = [];
    let composeEnhancers = compose;

    // apply Redux dev tools in development
    if (!PROD && typeof window !== 'undefined') {
        if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
    }

    // Combine reducers
    const reducers = combineReducers({
        ...Reducers,
        router: routerReducer,
    });

    // Create the redux store
    const store = createStore(
        reducers,
        // initialState,
        composeEnhancers(applyMiddleware(middleware), ...enhancers)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            const nextReducers = require('./reducers/index.js');
            const rootReducer = combineReducers({
                ...nextReducers,
                router: routerReducer,
            });

            store.replaceReducer(rootReducer);
        });
    }

    return store;
};
