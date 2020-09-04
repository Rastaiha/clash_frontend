import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, user: {} };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGOUT_REQUEST:
      return initState;
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.response.access,
      };
    default:
      return state;
  }
}

export default account;
