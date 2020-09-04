import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const login = ({ username, password }) => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGIN_FAILURE,
    ],
    url: urls.LOGIN,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
  },
});

export const logout = () => ({
  [CALL_API]: {
    types: [
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.LOGOUT_FAILURE,
    ],
    url: urls.LOGOUT,
    fetchOptions: {
      method: 'GET',
    },
  },
});
