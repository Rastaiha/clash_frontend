const https = 'https://';
const wss = 'wss://';
const baseUrl = 'game.rastaiha.ir/';

export const ROOT = https + baseUrl;
// process.env.NODE_ENV === 'production'
//   ? 'https://game-api.rastaiha.ir/'
//   : 'http://127.0.0.1:8000/';

export const LOGIN = ROOT.concat('authenticate'); //TODO: fix url
export const LOGOUT = ROOT.concat('auth/logout/'); //TODO: fix url

export const REQUEST_FIGHT = ROOT.concat('api/player/fight');
export const PUT_CARD = ROOT.concat('api/player/fight');
export const MOVE = ROOT.concat('api/player/move/')

export const loginUrl= ROOT.concat('authenticate');
export const socketUrl= wss + baseUrl + 'websocket';
export const mapDataUrl= ROOT.concat('api/game/map');
export const moveUrl= ROOT.concat('api/player/move');
export const topicSubscribeUrl= '/topic/gathering';
export const sendMessageUrl= '/app/gathering';
export const notificationUrl= '/user/queue/notification';

export const wsQueueFightUrl = '/user/queue/fight';
export const teamUrl = '/user/queue/team';
export const cardUrl = ROOT.concat('/api/player/card');
export const cardTypeUrl = ROOT.concat('/api/armory/cardtype');
export const civilCardUrl = '/api/civilization/card';


export const pickup_Card = (cardId) => `${ROOT}api/armory/card/${cardId}/pickup`;
export const discard_Card = (cardId) => `${ROOT}api/armory/card/${cardId}/discard`;
export const SELL_CARD = (cardId) => `${ROOT}api/armory/card/${cardId}/sell`;
export const BUY_CARD = (cardId) => `${ROOT}api/armory/card/${cardId}/buy`;
