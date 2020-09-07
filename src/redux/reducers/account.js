import * as actionTypes from '../actions/actionTypes';

const initState = { token: null, username: null, deck: [] };

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.LOGOUT_REQUEST:
      return initState;

    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.response.token);
      localStorage.setItem('username', action.payload.username);
      return {
        ...state,
        username: action.payload.username,
        token: action.response.token,
      };
    case actionTypes.PLAYER_CARD_SUCCESS:
      return {
        ...state,
        deck: action.payload.data,
          
      };

    default:
      return state;
  }
}

export default account;
