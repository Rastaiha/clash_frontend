import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, username: null };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGOUT_REQUEST:
      return initState;

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        token: action.response.token,
      };

    default:
      return state;
  }
}

export default account;
