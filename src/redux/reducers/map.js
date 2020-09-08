import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initState = {
  map: {
    width: 300,
    height: 300,
    mapEntities: [],
  },
  players: [],
  user: {
    username: 'myUser',
    x: 10,
    y: 10,
  },
};

function map(state = initState, action) {
  switch (action.type) {
    case actionTypes.MOVE_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          x: action.payload.newPosition.x,
          y: action.payload.newPosition.y,
        },
      };
    case actionTypes.MOVE_FAILURE:
      return {
        ...state,
        user: {
          ...state.user, // TODO: fix connectino lose
          // x: action.payload.newPosition.x,
          // y: action.payload.newPosition.y,
        },
      };
    case actionTypes.UPDATE_OTHER_PLAYERS:
      return {
        ...state,
        players: state.players.map((player) => {
          return player.username.toUpperCase() ===
            action.payload.username.toUpperCase()
            ? {
                ...player,
                x: action.payload.x,
                y: action.payload.y,
              }
            : player;
        }),
      };

    case actionTypes.GET_MAP_DATA_SUCCESS:
      return {
        ...state,
        map: {
          ...action.response,
          mapEntities: action.response.mapEntities.map((entity) => ({
            width: 1,
            height: 1,
            ...entity,
          })),
        },
      };
    case actionTypes.GET_PLAYERS_SUCCESS:
      return {
        ...state,
        players: action.response
          .filter(
            (player) =>
              player.playerName.toUpperCase() !==
              action.payload.myUsername.toUpperCase()
          )
          .map((player) => ({
            ...player,
            username: player.playerName,
          })),
        user: action.response
          .filter(
            (player) =>
              player.playerName.toUpperCase() ===
              action.payload.myUsername.toUpperCase()
          )
          .map((player) => ({
            ...player,
            username: player.playerName,
          }))[0],
      };
    default:
      return state;
  }
}

export default map;
