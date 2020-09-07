
import * as actionTypes from './actionTypes'
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
