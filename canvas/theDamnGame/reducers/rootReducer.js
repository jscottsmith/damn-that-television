import { combineReducers } from 'redux';
import player from './playerReducer';
import event from './eventReducer';

const rootReducer = combineReducers({ player, event });

export default rootReducer;
