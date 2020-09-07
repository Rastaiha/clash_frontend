import * as actionTypes from './actionTypes';
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';

export const getmapData = () => ({
  [CALL_API]: {
    types: [
      actionTypes.MAP_DATA_REQUEST,
      actionTypes.MAP_DATA_SUCCESS,
      actionTypes.MAP_DATA_FAILURE,
    ],
    url: urls.mapDataUrl,
    fetchOptions: {
      method: 'POST',
      body: JSON.stringify(),
    },
  },
});

export const move = ({ x, y }) => ({
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
  },
});
