import * as actionTypes from '../actions/actionTypes';

const initState = {
  map: {
    width: 30,
    height: 30,
    mapEntities: [
      {
        name: 'MOTEL',
        x: 10,
        y: 10,
      },
      {
        name: 'MOTEL',
        x: 2,
        y: 3,
      },
      {
        name: 'MOTEL',
        x: 20,
        y: 4,
      },
      {
        name: 'INSTITUTE',
        x: 15,
        y: 15,
      },
      {
        name: 'WALL',
        x: 16,
        y: 15,
      },
      {
        name: 'MOTEL',
        x: 17,
        y: 15,
      },
      {
        name: 'INSTITUTE',
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
  ],
  user: {
    username: 'myUser',
    x: 14,
    y: 15,
  },
};

function account(state = initState, action) {
  switch (action.type) {
    case actionTypes.MOVE_PLAYER:
      const updatedUser = {
        username: state.user.username,
        x: action.payload.newPosition.x,
        y: action.payload.newPosition.y,
      };
      return {
        ...state,
        user: updatedUser,
      };
    default:
      return state;
  }
}

export default account;
