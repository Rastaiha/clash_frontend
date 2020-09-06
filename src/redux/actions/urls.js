export const ROOT = 'https://game.rastaiha.ir/';
// process.env.NODE_ENV === 'production'
//   ? 'https://game-api.rastaiha.ir/'
//   : 'http://127.0.0.1:8000/';

export const LOGIN = ROOT.concat('authenticate'); //TODO: fix url
export const LOGOUT = ROOT.concat('auth/logout/'); //TODO: fix url

export const REQUEST_FIGHT = ROOT.concat('api/player/fight');
export const PUT_CARD = ROOT.concat('api/player/fight');
export const BUY_CARD‌ = ROOT.concat('api/armory/cardtype/') // + {cardTypeID}/buy'
export const MOVE = ROOT.concat('api/player/move/')