import * as actionTypes from './actionTypes';
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';

export const getMapData = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_MAP_DATA_REQUEST,
      actionTypes.GET_MAP_DATA_SUCCESS,
      actionTypes.GET_MAP_DATA_FAILURE,
    ],
    url: urls.GET_MAP_DATA,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const updatePlayer = ({ playerName, x, y }) => ({
  type: actionTypes.UPDATE_OTHER_PLAYERS,
  payload: { username: playerName, x, y },
});

export const movePlayer = ({ x, y }) => ({
  [CALL_API]: {
    types: [
      actionTypes.MOVE_REQUEST,
      actionTypes.MOVE_SUCCESS,
      actionTypes.MOVE_FAILURE,
    ],
    url: urls.MOVE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ x, y }),
    },
    payload: { newPosition: { x, y } },
  },
});

export const getPlayerStatus = () => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PLAYER_STATUS_REQUEST,
      actionTypes.GET_PLAYER_STATUS_SUCCESS,
      actionTypes.GET_PLAYER_STATUS_FAILURE,
    ],
    url: urls.GET_PLAYER_STATUS,
    fetchOptions: {
      method: 'GET',
    },
  },
});

export const getPlayers = ({ myUsername }) => ({
  [CALL_API]: {
    types: [
      actionTypes.GET_PLAYERS_REQUEST,
      actionTypes.GET_PLAYERS_SUCCESS,
      actionTypes.GET_PLAYERS_FAILURE,
    ],
    url: urls.GET_PLAYERS,
    fetchOptions: {
      method: 'GET',
    },
    payload: { myUsername },
  },
});
