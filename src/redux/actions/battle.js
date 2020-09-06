import * as actionTypes from './actionTypes';
import * as urls from './urls';
import { CALL_API } from '../middleware/api/api';

export const requestFight = ({ opponent }) => ({
  [CALL_API]: {
    types: [
      actionTypes.REQUEST_FIGHT_REQUEST,
      actionTypes.REQUEST_FIGHT_SUCCESS,
      actionTypes.REQUEST_FIGHT_FAILURE‌,
    ],
    url: urls.REQUEST_FIGHT,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ username: opponent }),
      dontContentType: false,
    },
  },
});

export const putCard = ({ card }) => ({
  [CALL_API]: {
    types: [
      actionTypes.PUT_CARD_REQUEST,
      actionTypes.PUT_CARD_SUCCESS,
      actionTypes.PUT_CARD_FAILURE‌,
    ],
    url: urls.PUT_CARD,
    fetchOptions: {
      method: 'PATCH',
      body: JSON.stringify({ card })
    },
  },
});

export const move = ({ x, y }) => ({
  [CALL_API]: {
    types: [
      actionTypes.MOVE_REQUEST,
      actionTypes.MOVE_SUCCESS,
      actionTypes.MOVE_FAILURE‌,
    ],
    url: urls.MOVE,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify({ x, y })
    },
  },
});
