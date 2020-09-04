export const ROOT =
  process.env.NODE_ENV === 'production'
    ? 'https://game-api.rastaiha.ir/'
    : 'http://127.0.0.1:8000/';

export const LOGIN = ROOT.concat('auth/token/obtain/'); //TODO: fix url
export const LOGOUT = ROOT.concat('auth/logout/'); //TODO: fix url
