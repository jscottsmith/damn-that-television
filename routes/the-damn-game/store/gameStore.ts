import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

const hasWindow = typeof window === 'object';
const isDev = process.env.NODE_ENV === 'development';

const devTools =
  hasWindow &&
  isDev &&
  // @ts-expect-error
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  // @ts-expect-error
  window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

export default store;
