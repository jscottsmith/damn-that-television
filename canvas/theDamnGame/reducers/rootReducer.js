import { combineReducers } from 'redux';
import player from './playerReducer';
import event from './eventReducer';
import score from './scoreReducer';

const rootReducer = combineReducers({ player, event, score });

export default rootReducer;
