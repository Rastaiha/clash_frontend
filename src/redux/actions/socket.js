import * as actionTypes from '../actions/actionTypes';
import * as socketActionTypes from '../actions/socketActionTypes';
import { updateWhiteboard } from './whiteboard';
import { SEND_SOCKET } from '../middleware/socket/socket';

export function initializeSocket({ team_uuid, user_uuid }) {
  return (dispatch) => {
    const socket = new WebSocket(
      process.env.NODE_ENV === 'production'
        ? `wss://rastaiha.ir/ws/${team_uuid}/${user_uuid}/`
        : `wss://rastaiha.ir/ws/${team_uuid}/${user_uuid}/`
    );

    dispatch(socketConnectionInit(socket));

    socket.onopen = function () {
      dispatch(
        SendSocketMessageDispatcher({
          type: socketActionTypes.JOIN_TO_GROUP_ROOM,
        })
      );
      dispatch(socketConnectionSuccess());
    };

    socket.onerror = function (err) {
      dispatch(socketConnectionError(err));
    };

    socket.onmessage = function (event) {
      dispatch(socketMessage(JSON.parse(event.data)));
    };

    socket.onclose = function () {
      dispatch(socketConnectionClosed());
    };
  };
}

const socketConnectionInit = (socket) => ({
  type: actionTypes.SOCKET_CONNECTION_INIT,
  socket,
});

const socketConnectionSuccess = () => ({
  type: actionTypes.SOCKET_CONNECTION_SUCCESS,
});

const socketConnectionError = (err) => ({
  type: actionTypes.SOCKET_CONNECTION_ERROR,
  err,
});

export const closeSocketConnection = () => ({
  type: actionTypes.CLOSE_SOCKET_CONNECTION,
});

const socketConnectionClosed = () => ({
  type: actionTypes.SOCKET_CONNECTION_CLOSED,
});

const socketMessage = (data) => {
  switch (data.type) {
    case socketActionTypes.PASS_DRAWING_STATE:
      return updateWhiteboard(data.data);
    case socketActionTypes.JOIN_TO_GROUP_ROOM:
      return {
        [SEND_SOCKET]: {
          socketTypes: [
            'asdfasdfasdfasdfa',
            'asdfasdfasdfasdfa',
            'asdfasdfasdfasdfa',
          ],
          type: socketActionTypes.PASS_DRAWING_STATE,
          sendWhiteboard: true,
        },
      };
    default:
      return { type: 'salam' };
  }
};

const sendSocketMessage = (socket, message) => {
  socket.send(JSON.stringify(message));
};

export const SendSocketMessageDispatcher = ({ type, data }) => (
  dispatch,
  getStore
) => {
  sendSocketMessage(getStore().socket.socket, {
    type,
    data,
    token: 'get_token', // getStore().account.token
    time: new Date(),
  });
  return dispatch({
    type: actionTypes.SEND_SOCKET_MESSAGE,
  });
};
