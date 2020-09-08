import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, username: null, deck: [] };

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
    case actionTypes.PLAYER_CARDS_SUCCESS:
      return {
        ...state,
        deck: action.payload.data,
      };

    default:
      return state;
  }
}

export default account;
