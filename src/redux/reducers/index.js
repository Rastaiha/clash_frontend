import { combineReducers } from 'redux';
import account from './account';
import map from './map';

const allReducers = combineReducers({ account, map });
export default allReducers;
