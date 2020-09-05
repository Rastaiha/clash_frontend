import { combineReducers } from 'redux';
import account from './account';
import map from './map';
import messages from './messages';

const allReducers = combineReducers({ account, map, messages });
export default allReducers;
