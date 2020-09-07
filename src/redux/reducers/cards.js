import * as actionTypes from '../actions/actionTypes';

const initState = { cardtypes: [], armory: [], backpack: [] };

function ws(state = initState, action) {
  switch (action.type) {
    case actionTypes.CARD_TYPES_SUCCESS:
      return {
        ...state,
        cardtypes: action.response,
      };
    case actionTypes.CIVIL_CARD_SUCCESS:
      return {
        ...state,
        armory: action.response,
      };
    case actionTypes.PLAYER_CARD_SUCCESS:
      return {
        ...state,
        backpack: action.response,
      };
    default:
      return state;
  }
}

export default ws;
