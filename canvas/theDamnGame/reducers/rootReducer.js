import { combineReducers } from 'redux';
import player from './playerReducer';
import event from './eventReducer';
import score from './scoreReducer';
import level from './levelReducer';

const rootReducer = combineReducers({ player, event, score, level });

export default rootReducer;
