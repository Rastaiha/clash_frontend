import * as actionTypes from '../actions/actionTypes';

const initState = {
  map: {
    width: 30,
    height: 30,
    mapEntities: [
      {
        id: 'entity1',
        name: 'MOTEL',
        width: 1,
        height: 1,
        x: 10,
        y: 10,
      },
      {
        id: 'entity2',
        name: 'MOTEL',
        width: 1,
        height: 1,
        x: 2,
        y: 3,
      },
      {
        id: 'entity3',
        name: 'MOTEL',
        width: 1,
        height: 1,
        x: 20,
        y: 4,
      },
      {
        id: 'entity4',
        name: 'INSTITUTE',
        width: 1,
        height: 1,
        x: 15,
        y: 15,
      },
      {
        id: 'entity5',
        name: 'WALL',
        width: 1,
        height: 1,
        x: 16,
        y: 15,
      },
      {
        id: 'entity6',
        name: 'MOTEL',
        width: 1,
        height: 1,
        x: 17,
        y: 15,
      },
      {
        id: 'entity7',
        name: 'INSTITUTE',
        width: 1,
        height: 1,
        x: 15,
        y: 14,
      },
    ],
  },
  players: [
    {
      username: 'player1',
      x: 12,
      y: 14,
    },
    {
      username: 'player2',
      x: 14,
      y: 17,
    },
    {
      username: 'player3',
      x: 18,
      y: 12,
    },
    {
      username: 'player4',
      x: 1,
      y: 1,
    },
    {
      username: 'player5',
      x: 16,
      y: 25,
    },
  ],
  user: {
    username: 'myUser',
    x: 13,
    y: 15,
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
          ...state.user,
          x: action.payload.newPosition.x,
          y: action.payload.newPosition.y,
        },
      };
    case actionTypes.UPDATE_OTHER_PLAYERS:
      const newPlayers = state.players.map((player) => {
        return player.username === action.payload.username
          ? {
              ...player,
              x: action.payload.newPosition.x,
              y: action.payload.newPosition.y,
            }
          : player;
      });
      return {
        ...state,
        players: newPlayers,
      };

    case actionTypes.MAP_DATA_SUCCESS:
      return {
        ...state,
        map: action.response,
      };
    default:
      return state;
  }
}

export default map;
