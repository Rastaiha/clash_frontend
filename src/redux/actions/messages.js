import * as actionTypes from './actionTypes';

export const shift = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.SHIFT_MESSAGE,
    });
  }, 6000);
};

export const fastShift = () => ({
  type: actionTypes.SHIFT_MESSAGE,
});

export const shiftRedirect = () => ({
  type: actionTypes.SHIFT_REDIRECT,
});
