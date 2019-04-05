import { combineReducers } from 'redux';
import player from './playerReducer';
import score from './scoreReducer';
import level from './levelReducer';

const rootReducer = combineReducers({ player, score, level });

export default rootReducer;
