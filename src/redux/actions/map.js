
import * as actionTypes from './actionTypes'
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';


export const movePlayer = (newPosition) => ({
  type: actionTypes.MOVE_PLAYER,
  payload: {newPosition}
})
