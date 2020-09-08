import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { socketUrl } from './urls';

export var wsClient = null;
export function initWebsocket({ username }) {
  const state = JSON.parse(localStorage.getItem('rastaReactState'));
  if (!state) return;
  const socket = () => new SockJS(socketUrl);
  const createdClient = new Client({
    webSocketFactory: socket,
    reconnectDelay: 0,
    connectHeaders: {
      login: {},
      passcode: username,
    },
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000,
    debug: (text) => console.log(text),
    onConnect: (frame) => {
      wsClient = createdClient;
    },
    onDisconnect: () => {},
    onWebSocketClose: () => {},
  });
  createdClient.activate();
}

export function closeWebsocket() {
  wsClient.deactivate();
}

export function subscribeToWS(url, callback) {
  if (!wsClient) setTimeout(() => subscribeToWS(url, callback), 1500);
  else {
    wsClient.subscribe(url, (messageOutput) => {
      callback(JSON.parse(messageOutput.body));
    });
  }
}
