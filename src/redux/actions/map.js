
import * as actionTypes from './actionTypes'
import {mapDataUrl, defaultUrl, fight} from './urls';

export const movePlayer = (newPosition) => ({
  type: actionTypes.MOVE_PLAYER,
  payload: {newPosition}
})

// fixme
export async function getMapDate() {
  // const res = await axios.get(mapDataUrl, {
  //   headers: {
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   }
  // });
      
  // if (res.status === 200)
  //   return { ...res.data };
}
