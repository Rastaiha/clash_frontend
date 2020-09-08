import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { SOCKET_URL } from './urls';

let wsClient = null;
export function initWebsocket({ username, subscriptions = [] }) {
  const state = JSON.parse(localStorage.getItem('rastaReactState'));
  if (!state) return;
  const socket = () => new SockJS(SOCKET_URL);
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
      subscriptions.forEach((subscription) => {
        wsClient.subscribe(subscription.url, (messageOutput) => {
          subscription.callback(JSON.parse(messageOutput.body));
        });
      });
    },
    onDisconnect: () => {
      setTimeout(initWebsocket({ username }), 1000);
    },
  });
  createdClient.activate();
}

export function closeWebsocket() {
  if (wsClient) {
    wsClient.deactivate();
    wsClient = null;
  }
}
