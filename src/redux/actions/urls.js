const https = 'https://';
const wss = 'wss://';
const baseUrl = 'game.rastaiha.ir/';

export const ROOT = https + baseUrl;
// process.env.NODE_ENV === 'production'
//   ? 'https://game-api.rastaiha.ir/'
//   : 'http://127.0.0.1:8000/';

export const LOGIN = ROOT.concat('authenticate'); //TODO: fix url
export const LOGOUT = ROOT.concat('auth/logout/'); //TODO: fix url

// fixme what is differnce between put_card and REQUEST_FIGHT
export const REQUEST_FIGHT = ROOT.concat('api/player/fight');
export const PUT_CARD = ROOT.concat('api/player/fight');
export const MOVE = ROOT.concat('api/player/move/');
export const GET_PLAYER_STATUS = ROOT.concat('api/player/status/');
export const GET_PLAYERS = ROOT.concat('api/game/');
export const GET_NOTIFICATIONS = ROOT.concat('api/notifications/');
export const GET_CIVILIZATIONS_DETAILS = ROOT.concat('api/civilization/');
export const GET_CIVILIZATIONS_CARDS = ROOT.concat('api/civilization/card');
export const FIGHT_WITH_CIVILIZATION = ROOT.concat('api/civilization/fight');
export const UPGRADE_CIVILIZATION = ROOT.concat('api/civilization/upgrade');
export const GET_PLAYER_CARDS = ROOT.concat('api/player/card');
export const GET_CARD_TYPES = ROOT.concat('api/armory/cardtype');
export const GET_ANSWER = ROOT.concat('file/download/answer/');
export const GET_QUESTION = ROOT.concat('file/download/question/');
export const UPLOAD_ANSWER = ROOT.concat('file/upload/answer/');
export const SOCKET_URL = https + baseUrl + 'websocket';
export const GET_MAP_DATA = ROOT.concat('api/game/map');

export const moveUrl = ROOT.concat('api/player/move');
export const topicSubscribeUrl = '/topic/gathering';
export const sendMessageUrl = '/app/gathering';
export const notificationUrl = '/user/queue/notification';

export const wsQueueFightUrl = '/user/queue/fight';
export const teamUrl = '/user/queue/map';

export const PICKUP_CARD = (cardId) =>
  `${ROOT}api/armory/card/${cardId}/pickup`;
export const UPGRADE_CARD = (cardId) =>
  `${ROOT}api/armory/card/${cardId}/pickup`;
export const DISCARD_CARD = (cardId) =>
  `${ROOT}api/armory/card/${cardId}/upgrade`;
export const SELL_CARD = (cardId) => `${ROOT}api/armory/card/${cardId}/sell`;
export const BUY_CARD = (cardId) => `${ROOT}api/armory/card/${cardId}/buy`;
