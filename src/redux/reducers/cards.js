import * as actionTypes from '../actions/actionTypes';

const initState = { cardtypes: [], armory: [], backpack: [] };

export default function cards(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_CARD_TYPES_SUCCESS:
      return {
        ...state,
        cardtypes: action.response,
      };
    case actionTypes.CIVIL_CARD_SUCCESS:
      return {
        ...state,
        armory: action.response,
      };
    case actionTypes.PLAYER_CARDS_SUCCESS:
      return {
        ...state,
        backpack: action.response,
      };
    default:
      return state;
  }
}
