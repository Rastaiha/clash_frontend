
import * as actionTypes from './actionTypes'
import { CALL_API } from '../middleware/api/api';
import * as urls from './urls';


export const movePlayer = (newPosition) => ({
  type: actionTypes.MOVE_PLAYER,
  payload: {newPosition}
})

export const updatePlayer = (username, newPosition) => ({
  type: actionTypes.UPDATE_OTHER_PLAYERS,
  payload: {username, newPosition}
})
