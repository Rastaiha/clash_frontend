import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { socketUrl } from './urls';

export var wsClient = null;
export function initWebsocket() {
  const socket = () => new SockJS(socketUrl);
  const createdClient = new Client({
    webSocketFactory: socket,
    reconnectDelay: 0,
    connectHeaders: {
      login: {},
      passcode: localStorage.getItem('username'),
    },
    heartbeatIncoming: 5000,
    heartbeatOutgoing: 5000,
    debug: (text) => console.log(text),
    onConnect: (frame) => {
      console.log('shit: ' + frame);
      wsClient = createdClient;
    },
    onDisconnect: () => {},
    // onWebSocketClose,
  });
  createdClient.activate();
  // return () => createdClient.deactivate();
}

export function subscribeToWS(url, callback) {
  if (wsClient)
    wsClient.subscribe(url, (messageOutput) => {
      callback(JSON.parse(messageOutput.body));
    });
}
