import { initWebsocket } from '../actions/socketActions';
import * as actionTypes from '../actions/actionTypes';

function addMessaage({ state, type, text, mode }) {
  return {
    ...state,
    messages: [...state.messages, { type, text, mode }],
  };
}

function addSuccessMessage({ state, text, mode }) {
  return addMessaage({ state, type: 'success', text, mode });
}

function addErrorMessage({ state, text, mode }) {
  return addMessaage({ state, type: 'error', text, mode });
}

function addRedirect({ state, to }) {
  return {
    ...state,
    redirects: [...state.redirects, { to }],
  };
}

function messages(state = { messages: [], redirects: [] }, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      initWebsocket();
      return addRedirect({
        state: state,
        to: '/game',
      });
    case actionTypes.SHIFT_MESSAGE:
      return {
        ...state,
        messages: state.messages.slice(1),
      };
    case actionTypes.SHIFT_REDIRECT:
      return {
        ...state,
        redirects: state.redirects.slice(1),
      };
    default:
      return state;
  }
}

export default messages;
