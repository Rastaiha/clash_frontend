import { combineReducers } from 'redux';
import account from './account';
import map from './map';
import cards from './cards';
import messages from './messages';

const allReducers = combineReducers({ account, map, messages, cards });
export default allReducers;
