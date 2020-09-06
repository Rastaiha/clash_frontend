import * as actionTypes from './actionTypes'

export const movePlayer = (newPosition) => ({
    type: actionTypes.MOVE_PLAYER,
    payload: {newPosition}
})