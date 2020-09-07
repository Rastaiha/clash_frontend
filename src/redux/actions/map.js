
import * as actionTypes from './actionTypes'
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';


export const movePlayer = (newPosition) => ({
  type: actionTypes.MOVE_PLAYER,
  payload: {newPosition}
})


export const getCardTypes = () => ({
  [CALL_API]: {
    types: [
      actionTypes.MAPDATA_REQUEST,
      actionTypes.MAPDATA_SUCCESS,
      actionTypes.MOVE_FAILURE,
    ],
    url: urls.cardUrl,
    fetchOptions: {
      method: 'GET',
      body: JSON.stringify(),
    },
  },
});